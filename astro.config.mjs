import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical production URL. Change here if the domain changes.
export const SITE = 'https://coldie3d.com';

// Pages built but still awaiting copy — also rendered with noindex. Remove once ready.
const DRAFT_PAGES = ['/series/decentral-eyes'];

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // Draft pages (copy not written yet) stay out until their copy file sets ready: true.
      filter: (page) => !DRAFT_PAGES.some((path) => new URL(page).pathname.replace(/\/$/, '') === path),
      // Editorial site — weekly is honest for a portfolio.
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
