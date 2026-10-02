import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical production URL. Change here if the domain changes.
export const SITE = 'https://coldie3d.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // Editorial site — weekly is honest for a portfolio.
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
