import { getCollection, type CollectionEntry } from 'astro:content';
import { eventFormats, eventKinds } from '../data/site';

export type EventEntry = CollectionEntry<'events'>;

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'] as const;
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

/** Date を日本時間の各要素に分ける（ビルド環境のタイムゾーンに依存しない） */
export function jstParts(d: Date) {
  const j = new Date(d.getTime() + JST_OFFSET_MS);
  return {
    year: j.getUTCFullYear(),
    month: j.getUTCMonth() + 1,
    day: j.getUTCDate(),
    weekday: WEEKDAYS[j.getUTCDay()],
    hour: j.getUTCHours(),
    minute: j.getUTCMinutes(),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

/** 2026-11-07T10:00:00+09:00 */
export function toJstIso(d: Date): string {
  const p = jstParts(d);
  return `${p.year}-${pad(p.month)}-${pad(p.day)}T${pad(p.hour)}:${pad(p.minute)}:00+09:00`;
}

/** 2026年11月7日（土） */
export function formatDateJa(d: Date): string {
  const p = jstParts(d);
  return `${p.year}年${p.month}月${p.day}日（${p.weekday}）`;
}

/** 2026.11.07 */
export function formatDateDot(d: Date): string {
  const p = jstParts(d);
  return `${p.year}.${pad(p.month)}.${pad(p.day)}`;
}

/** 10:00 */
export function formatTime(d: Date): string {
  const p = jstParts(d);
  return `${pad(p.hour)}:${pad(p.minute)}`;
}

/** 2026年11月7日（土）10:00–12:00。時刻が 0:00 のものは日付のみとみなす */
export function formatDateTimeRange(start: Date, end?: Date): string {
  const s = jstParts(start);
  const hasTime = s.hour !== 0 || s.minute !== 0;
  let out = formatDateJa(start);
  if (hasTime) out += ` ${formatTime(start)}`;
  if (end) {
    const e = jstParts(end);
    const sameDay = e.year === s.year && e.month === s.month && e.day === s.day;
    out += sameDay ? `–${formatTime(end)}` : `〜${formatDateJa(end)} ${formatTime(end)}`;
  }
  return out;
}

export function formatFee(fee: EventEntry['data']['fee']): string | undefined {
  if (!fee) return undefined;
  if (fee.general === 0 && !fee.student) return '無料';
  const yen = (n: number) => (n === 0 ? '無料' : `${n.toLocaleString('ja-JP')}円`);
  return fee.student !== undefined ? `一般 ${yen(fee.general)}／学生 ${yen(fee.student)}` : yen(fee.general);
}

export const kindOf = (e: EventEntry) => eventKinds[e.data.kind];
export const formatLabel = (e: EventEntry) => eventFormats[e.data.format];

/** ファイル名（= URL）の決まり：YYYY-MM-DD-英小文字・数字・ハイフン */
const EVENT_ID = /^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * 研究会をすべて読み込む。ファイル名の形が違うものがあればビルドを止める
 * （そのままにすると、そのページだけ黙って公開されないため）。
 */
export async function getAllEvents(): Promise<EventEntry[]> {
  const all = await getCollection('events');
  const bad = all.filter((e) => !EVENT_ID.test(e.id) || !e.id.startsWith(toJstIso(e.data.start).slice(0, 10)));
  if (bad.length > 0) {
    throw new Error(
      `研究会のファイル名が決まりと違います：${bad.map((e) => `${e.id}.md`).join('、')}。` +
        '「開催日（YYYY-MM-DD、月・日は 2 けた）-半角英小文字・数字・ハイフン.md」にし、先頭の日付を start の日付と同じにしてください（例 2026-11-07-meaningful-repetition.md）。',
    );
  }
  return all;
}

/** 研究会ページの URL（サイト内パス） */
export const eventPath = (e: EventEntry) => `/events/${e.id}/`;

/**
 * 研究会を「これから」と「過去」に分ける。基準はビルドした時刻。
 * 静的サイトは日付が過ぎても自動では切り替わらないので、GitHub Actions で毎日再ビルドしている。
 * 終了時刻（なければ開始日の 23:59 JST）を過ぎたものを過去とする。
 */
export async function getEvents(now: Date = new Date()) {
  const all = await getAllEvents();
  const endOf = (e: EventEntry) => {
    if (e.data.end) return e.data.end;
    const p = jstParts(e.data.start);
    return new Date(Date.UTC(p.year, p.month - 1, p.day, 23, 59, 59) - JST_OFFSET_MS);
  };
  const byStartAsc = (a: EventEntry, b: EventEntry) => a.data.start.getTime() - b.data.start.getTime();
  const upcoming = all.filter((e) => endOf(e) >= now).sort(byStartAsc);
  const past = all.filter((e) => endOf(e) < now).sort((a, b) => byStartAsc(b, a));
  /** 新しい順の全件 */
  const latest = [...all].sort((a, b) => byStartAsc(b, a));
  return { all, upcoming, past, latest, next: upcoming[0] };
}
