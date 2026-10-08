import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import imgDimensions from './src/integrations/img-dimensions.mjs';
import { works } from './src/data/works.ts';
import market from './src/data/market.json' with { type: 'json' };

// Canonical production URL. Change here if the domain changes.
export const SITE = 'https://coldie3d.com';

// Pages built but still awaiting copy — also rendered with noindex. Remove once ready.
const DRAFT_PAGES = ['/series/decentral-eyes', '/404', '/v3', ...works.filter((w) => w.draft).map((w) => `/work/${w.slug}`)];

// Image entries for the sitemap (Google Images): each work page's hero.
const abs = (p) => new URL(p, SITE).href;
const PAGE_IMAGES = Object.fromEntries(
  works
    .filter((w) => w.image && !w.image.includes('/placeholder/'))
    .map((w) => [`/work/${w.slug}`, [{ url: abs(w.image), caption: w.imageAlt ?? w.title }]])
);
PAGE_IMAGES['/archive'] = [{ url: abs('/og/archive.png'), caption: 'Coldie — the complete NFT archive, 2018 to today' }];

const pathOf = (url) => new URL(url).pathname.replace(/(.)\/$/, '$1');

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  integrations: [
    imgDimensions(),
    sitemap({
      // Draft pages (copy not written yet) stay out until their copy file sets ready: true.
      filter: (page) => !DRAFT_PAGES.includes(pathOf(page)),
      // Editorial site — weekly is honest for a portfolio.
      changefreq: 'weekly',
      priority: 0.7,
      // One URL per page: match the canonical (no trailing slash), add images and lastmod.
      serialize(item) {
        const path = pathOf(item.url);
        item.url = abs(path);
        if (PAGE_IMAGES[path]) item.img = PAGE_IMAGES[path];
        if (path === '/archive' && market.fetchedAt) item.lastmod = new Date(market.fetchedAt).toISOString();
        if (path === '/' || path === '/archive') item.priority = 1;
        return item;
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
