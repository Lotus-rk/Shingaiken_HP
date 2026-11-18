// サイト内リンクは必ず withBase() を通す（試験公開でサブパスに置いたときも壊れないように）。
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** 絶対 URL（canonical・OGP・JSON-LD 用） */
export function absoluteUrl(path: string, site: URL | undefined): string {
  return new URL(withBase(path), site).href;
}
