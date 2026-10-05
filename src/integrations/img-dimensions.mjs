// After build: give every local <img> without width/height its intrinsic size, so the
// browser reserves space before it loads (no layout shift — a Core Web Vitals signal).
// Safe because global.css sets `img { height: auto }`; component CSS still controls size.
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import sharp from 'sharp';

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

export default function imgDimensions() {
  return {
    name: 'img-dimensions',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const sizes = new Map();
        const sizeOf = async (src) => {
          if (!sizes.has(src)) {
            sizes.set(src, sharp(join(root, decodeURI(src)), { pages: 1 }).metadata().then((m) => (m.width ? m : null)).catch(() => null));
          }
          return sizes.get(src);
        };
        let n = 0;
        for await (const file of htmlFiles(root)) {
          const html = await readFile(file, 'utf8');
          const tags = [...html.matchAll(/<img\b[^>]*>/g)].filter(([t]) => !/\swidth=/.test(t));
          if (!tags.length) continue;
          let out = html;
          for (const [tag] of tags) {
            const src = tag.match(/\ssrc="(\/[^"?#]+)"/)?.[1];
            if (!src || src.startsWith('//')) continue;
            const m = await sizeOf(src);
            if (!m) continue;
            out = out.replace(tag, tag.replace(/^<img\b/, `<img width="${m.width}" height="${m.height}"`));
            n++;
          }
          if (out !== html) await writeFile(file, out);
        }
        logger.info(`added width/height to ${n} images`);
      },
    },
  };
}
