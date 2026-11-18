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
});
