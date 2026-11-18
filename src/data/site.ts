// 会の基本情報。サイト全体（ヘッダー・フッター・JSON-LD・OGP）はここを参照する。
// 会の情報が変わったら、このファイルだけを直す。

/** 本番の公開 URL。独自ドメインを取ったらここを書き換える。
 *  ビルド先の URL がこれと違うとき（試験公開など）は、検索エンジンに載せない設定になる。 */
export const productionUrl = 'https://shingaiken.github.io/';

export const site = {
  name: '新しい外国語実践研究会',
  shortName: '新外研',
  /** 正式名称（略称） */
  fullName: '新しい外国語実践研究会（新外研）',
  tagline: '小学校外国語教育の実践研究',
  /** トップの <title> */
  homeTitle: '新しい外国語実践研究会（新外研）｜小学校外国語教育の実践研究',
  /** トップの meta description（120字前後） */
  description:
    '新しい外国語実践研究会（新外研）は、小学校の外国語授業を中心に、教室での実践と研究をつなぎながら授業づくりを探究し、その成果を広く共有する研究会です。公開授業研究会やオンライン検討会を開いています。',
  foundingDate: '2026-02',
  foundedLabel: '2026年2月',
  office: {
    postalCode: '158-0081',
    region: '東京都',
    locality: '世田谷区',
    street: '深沢4-10-1',
    note: '英語研究室内',
    /** 表示用の 1 行 */
    label: '〒158-0081 東京都世田谷区深沢4-10-1 英語研究室内',
  },
  /** JSON-LD 用の実アドレス。画面には emailDisplay を出す */
  email: 'shingaiken.english@gmail.com',
  emailDisplay: 'shingaiken.english (a) gmail.com',
  sns: {
    instagram: 'https://www.instagram.com/shingaiken.english/',
    x: 'https://x.com/shingaiken',
    /** Peatix のグループ URL は未確認。分かったら入れる（空なら表示しない） */
    peatix: '',
  },
  /** ロゴ画像（public/ からのパス）。未入手のため仮のもの */
  logo: '/logo.png',
  /** 既定の OGP 画像（public/ からのパス） */
  ogImage: '/og-default.png',
} as const;

/** メインメニュー */
export const mainNav = [
  { href: '/', label: 'ホーム' },
  { href: '/about/', label: '新外研について' },
  { href: '/events/', label: '研究会' },
  { href: '/history/', label: '沿革' },
  // お問い合わせ先は全ページのフッター（id="contact"）にあるので、今のページのフッターへ移る
  { href: '#contact', label: 'お問い合わせ' },
] as const;

/** フッターメニュー */
export const footerNav = [
  { href: '/about/', label: '新外研について' },
  { href: '/events/', label: '研究会' },
  { href: '/history/', label: '沿革' },
  { href: '/bylaws/', label: '会則' },
  { href: '/officers/', label: '役員' },
] as const;

/** 研究会の種別（content の kind）と表示ラベル・色 */
export const eventKinds = {
  seminar: { label: 'セミナー', className: 'kind-seminar' },
  'open-lesson': { label: '公開授業', className: 'kind-open-lesson' },
  student: { label: '学生企画', className: 'kind-student' },
  review: { label: '授業検討', className: 'kind-review' },
} as const;

export const eventFormats = {
  online: 'オンライン',
  onsite: '対面',
  hybrid: '対面＋オンライン',
} as const;
