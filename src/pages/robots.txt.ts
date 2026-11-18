import type { APIRoute } from 'astro';
import { productionUrl } from '../data/site';
import { absoluteUrl } from '../lib/url';

// 本番以外（試験公開など）は検索エンジンに載せない
export const GET: APIRoute = ({ site }) => {
  const isProduction = absoluteUrl('/', site) === productionUrl;
  const body = isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap-index.xml', site)}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
