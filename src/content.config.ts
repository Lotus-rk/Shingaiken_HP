// 研究会データの決まり（スキーマ）。必須項目が欠けている・書き方が違うとビルドが止まり、公開されない。
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 日時は「'2026-11-07T10:00:00+09:00'」の形の文字列だけを受け付ける。
 * ' ' で囲まない日時は YAML が先に日時として読み、+09:00 の有無が分からなくなるため、文字列のまま確かめる。
 * +09:00 がない日時は世界標準時として読まれ 9 時間ずれるので、ここで止める。
 */
const JST_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?\+09:00$/;
const DATETIME_HELP = "日時は '2026-11-07T10:00:00+09:00' の形（最後に +09:00、全体を ' ' で囲む）で書いてください";
const jstDateTime = z
  .string({ error: DATETIME_HELP })
  .regex(JST_DATETIME, DATETIME_HELP)
  .transform((s) => new Date(s))
  .pipe(z.date({ error: '存在しない日時です（月・日・時刻を確かめてください）' }));

const events = defineCollection({
  // ファイル名がそのまま URL になる：src/content/events/2026-11-07-meaningful-repetition.md → /events/2026-11-07-meaningful-repetition/
  // 「_」で始まるファイル（ひな形）以外はすべて読み込み、名前の形が違うものは src/lib/events.ts の点検でビルドを止める。
  loader: glob({ pattern: '**/[!_]*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z
      .object({
        /** 研究会の名称 */
        title: z.string().min(1),
        /** 副題（任意） */
        subtitle: z.string().optional(),
        /** 沿革のページに出す短い名称（任意。なければ title） */
        shortTitle: z.string().min(1).optional(),
        /** 開始日時。必ず +09:00 を付け、' ' で囲む（例 '2026-11-07T10:00:00+09:00'） */
        start: jstDateTime,
        /** 終了日時（任意）。書き方は start と同じ */
        end: jstDateTime.optional(),
        /** 開催形式 */
        format: z.enum(['online', 'onsite', 'hybrid']),
        /** 種別（一覧の色付きラベル） */
        kind: z.enum(['seminar', 'open-lesson', 'student', 'review']),
        /** 会場名（オンラインなら Zoom など） */
        venue: z.string().min(1),
        /** 会場の住所（対面・ハイブリッドでは必須） */
        venueAddress: z.string().optional(),
        /** 参加費（円）。無料なら 0 */
        fee: z.object({ general: z.number().int().min(0), student: z.number().int().min(0).optional() }).optional(),
        /** 申込先（Peatix の URL） */
        apply: z.url({ protocol: /^https?$/ }).optional(),
        /** 登壇者・指導講評など */
        speakers: z
          .array(z.object({ name: z.string(), affiliation: z.string().optional(), role: z.string().optional() }))
          .default([]),
        /** 検索結果と SNS 共有で表示する説明（120字程度） */
        summary: z.string().min(20).max(200),
        /** 写真。alt（説明）と掲載許諾（consent: true）がないものは載せられない */
        images: z
          .array(z.object({ src: image(), alt: z.string().min(1), consent: z.literal(true) }))
          .default([]),
      })
      .refine((d) => !d.end || d.end >= d.start, { message: 'end は start より後にしてください', path: ['end'] })
      .refine((d) => d.format === 'online' || !!d.venueAddress, {
        message: '対面・ハイブリッドの研究会には venueAddress（会場の住所）が必要です',
        path: ['venueAddress'],
      }),
});

export const collections = { events };
