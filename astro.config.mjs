// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 公開先の URL。GitHub Actions のデプロイでは SITE_URL / BASE_PATH を渡す。
// 手元では本番の URL（src/data/site.ts の productionUrl と同じ）を使う。
const site = process.env.SITE_URL ?? 'https://shingaiken.github.io';
const base = process.env.BASE_PATH ?? '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  vite: {
    build: {
      // フォントの小さな分割ファイルを CSS に埋め込まない（埋め込むと CSS が 600KB 近くになり、表示が遅れる）
      assetsInlineLimit: (filePath) => (/\.(woff2?|ttf|otf)$/.test(filePath) ? false : undefined),
    },
  },
});
