// Social / AI preview images (Open Graph + Twitter): 1200×630 PNGs in public/og/.
//
//   node scripts/build-og.mjs
//
// SVG previews are ignored by X, Facebook, LinkedIn, iMessage, Slack and most AI
// answer engines, so every page gets a raster image:
//   og/default.png              branded fallback (red/cyan 3D-glasses mark)
//   og/archive.png              collage of landmark works
//   og/decentral-eyes.png       series page
//   og/work/<slug>.png          each work page with a real image
// Pages pick these up through the `ogImage` prop on BaseLayout.

import { mkdir, readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { works } from '../src/data/works.ts';
import thumbs from '../src/data/thumbs.json' with { type: 'json' };

const ROOT = new URL('../', import.meta.url);
const PUB = new URL('public/', ROOT);
const W = 1200;
const H = 630;
const BG = '#0b0b0b';
const INK = '#ece9e2';
const MUTE = '#8a867f';
const RED = '#ff1f2d';
const CYAN = '#00d2e6';
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** naive word wrap for SVG text */
function wrap(text, maxChars, maxLines) {
  const lines = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > maxChars && line) {
      lines.push(line);
      line = word;
    } else line = (line + ' ' + word).trim();
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…';
  }
  return lines;
}
// 3D-glasses mark — blue (cyan) lens on the left, red on the right.
const mark = (x, y, s) =>
  `<rect x="${x}" y="${y}" width="${s / 2}" height="${s}" fill="${CYAN}"/><rect x="${x + s / 2}" y="${y}" width="${s / 2}" height="${s}" fill="${RED}"/>`;

/** Text column on the left: brand, title, sub-line. */
function textSvg({ title, sub, width = 560, titleSize = 54 }) {
  const lines = wrap(title, Math.floor(width / (titleSize * 0.52)), 4);
  const top = 185;
  const t = lines
    .map((l, i) => `<text x="70" y="${top + i * titleSize * 1.12}" font-family="${FONT}" font-size="${titleSize}" font-weight="700" fill="${INK}">${esc(l)}</text>`)
    .join('');
  const subY = top + lines.length * titleSize * 1.12 + 26;
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    ${mark(70, 64, 40)}
    <text x="126" y="96" font-family="${FONT}" font-size="30" font-weight="800" letter-spacing="6" fill="${INK}">COLDIE</text>
    ${t}
    ${sub ? wrap(sub, 46, 2).map((l, i) => `<text x="70" y="${subY + i * 34}" font-family="${FONT}" font-size="26" fill="${MUTE}">${esc(l)}</text>`).join('') : ''}
    <text x="70" y="${H - 52}" font-family="${FONT}" font-size="22" letter-spacing="3" fill="${MUTE}">COLDIE3D.COM</text>
  </svg>`;
}

const publicFile = (p) => readFile(new URL(p.replace(/^\//, ''), PUB));

/** Artwork contained in the right-hand area, text on the left. */
async function workCard(out, art, title, sub) {
  const box = { w: 520, h: 530 };
  const img = await sharp(art, { pages: 1, limitInputPixels: false })
    .resize({ width: box.w, height: box.h, fit: 'inside', withoutEnlargement: false })
    .toBuffer({ resolveWithObject: true });
  const left = W - 50 - img.info.width;
  const top = Math.round((H - img.info.height) / 2);
  await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
    .composite([
      { input: Buffer.from(textSvg({ title, sub, width: left - 110 })), left: 0, top: 0 },
      { input: img.data, left, top },
    ])
    .png({ compressionLevel: 9 })
    .toFile(new URL(out, PUB).pathname);
}

await mkdir(new URL('og/work/', PUB), { recursive: true });

// Default, branded
await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
  .composite([
    {
      input: Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
        ${mark(70, 70, 120)}
        <text x="70" y="330" font-family="${FONT}" font-size="132" font-weight="800" letter-spacing="10" fill="${INK}">COLDIE</text>
        <text x="74" y="400" font-family="${FONT}" font-size="34" fill="${INK}">Stereoscopic 3D artist · on-chain since 2018</text>
        <text x="74" y="452" font-family="${FONT}" font-size="26" fill="${MUTE}">First stereoscopic artwork on a blockchain, May 7, 2018</text>
        <text x="74" y="${H - 56}" font-family="${FONT}" font-size="22" letter-spacing="3" fill="${MUTE}">COLDIE3D.COM</text>
      </svg>`),
      left: 0,
      top: 0,
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(new URL('og/default.png', PUB).pathname);

// Archive: a strip of landmark works
const strip = ['the-day', 'sr-41a322-501', 'sr-b932a7-30778', 'sr-b932a7-25441', 'sr-b932a7-9343', 'sin-king-ship'];
const tiles = [];
const tile = 168;
for (const [i, id] of strip.entries()) {
  if (!thumbs[id]) continue;
  const b = await sharp(await publicFile(thumbs[id])).resize(tile, tile, { fit: 'contain', background: BG }).toBuffer();
  tiles.push({ input: b, left: 70 + i * (tile + 12), top: 360 });
}
await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
  .composite([
    {
      input: Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
        ${mark(70, 64, 40)}
        <text x="126" y="96" font-family="${FONT}" font-size="30" font-weight="800" letter-spacing="6" fill="${INK}">COLDIE</text>
        <text x="70" y="200" font-family="${FONT}" font-size="64" font-weight="800" fill="${INK}">The complete NFT archive</text>
        <text x="70" y="262" font-family="${FONT}" font-size="30" fill="${MUTE}">On-chain since May 7, 2018 · every release, collector and sale</text>
        <text x="70" y="${H - 40}" font-family="${FONT}" font-size="22" letter-spacing="3" fill="${MUTE}">COLDIE3D.COM/ARCHIVE</text>
      </svg>`),
      left: 0,
      top: 0,
    },
    ...tiles,
  ])
  .png({ compressionLevel: 9 })
  .toFile(new URL('og/archive.png', PUB).pathname);

// Decentral Eyes series page
await workCard(
  'og/decentral-eyes.png',
  await publicFile(thumbs['sr-b932a7-30778']),
  'Decentral Eyes',
  'Stereoscopic 3D portrait series of crypto’s defining figures, 2018 to today'
);

// Work pages with a real (non-placeholder) image
let n = 0;
for (const w of works) {
  const src = w.image ?? w.layers?.at(-1)?.src;
  if (!src || src.includes('/placeholder/') || src.endsWith('.svg')) continue;
  await workCard(`og/work/${w.slug}.png`, await publicFile(src), w.title, [w.year, w.medium].filter(Boolean).join(' · '));
  n++;
}
console.log(`og: default, archive, decentral-eyes + ${n} work images → public/og/`);
