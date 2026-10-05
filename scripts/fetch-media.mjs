// Finds the animated original (video or GIF) for each release and writes
// src/data/media.json → { [releaseId]: { src, type: 'video' | 'gif' } }.
// Pages show the still thumbnail and only load `src` when a viewer clicks play.
//
//   node scripts/fetch-media.mjs           # only releases not yet in media.json
//   node scripts/fetch-media.mjs --force   # re-check everything
//
// Sources: SuperRare's videoUri / animated imageUri (superrare.json); otherwise the
// OpenSea item page's animationUrl (or GIF imageUrl); for collections, the first
// animated item on the collection page. Static images are skipped — the thumbnail
// already shows them.

import { readFile, writeFile } from 'node:fs/promises';
import { releases } from '../src/data/releases.ts';
import superrare from '../src/data/superrare.json' with { type: 'json' };

const FORCE = process.argv.includes('--force');
const OUT = new URL('../src/data/media.json', import.meta.url);
const UA = { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const srToken = new Map(superrare.tokens.map((t) => [`${t.contract.toLowerCase()}:${t.tokenId}`, t]));
const toHttp = (u) => u?.replace(/^ipfs:\/\/(ipfs\/)?/, 'https://ipfs.io/ipfs/').replace(/^ar:\/\//, 'https://arweave.net/');

/** 'video' | 'gif' | null from the URL's real content type (1-byte range request). */
async function animatedType(url) {
  if (!url) return null;
  if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) return 'video';
  if (/\.gif(\?|$)/i.test(url)) return 'gif';
  try {
    const res = await fetch(url, { headers: { ...UA, range: 'bytes=0-0' }, signal: AbortSignal.timeout(30000) });
    const type = res.headers.get('content-type') ?? '';
    await res.body?.cancel();
    if (type.startsWith('video/')) return 'video';
    if (type === 'image/gif') return 'gif';
  } catch {}
  return null;
}

const MARKER = '(window[Symbol.for("urql_transport")] ??= []).push(';
async function openseaItems(url) {
  const html = await (await fetch(url, { headers: UA, signal: AbortSignal.timeout(45000) })).text();
  const out = [];
  const walk = (o) => {
    if (!o || typeof o !== 'object') return;
    if (o.__typename === 'Item' && (o.animationUrl || o.imageUrl)) out.push(o);
    Object.values(o).forEach(walk);
  };
  for (let i = 0; (i = html.indexOf(MARKER, i)) !== -1; ) {
    const start = i + MARKER.length;
    const end = html.indexOf(')</script>', start);
    try { walk(JSON.parse(html.slice(start, end))); } catch {}
    i = end;
  }
  return out;
}

async function fromItem(item) {
  for (const src of [item.animationUrl, item.imageUrl].map(toHttp)) {
    const type = await animatedType(src);
    if (type) return { src, type };
  }
  return null;
}

async function mediaFor(r) {
  const sr = r.contract && r.tokenId && srToken.get(`${r.contract.toLowerCase()}:${r.tokenId}`);
  if (sr) {
    if (sr.video) return { src: sr.video, type: 'video' };
    const type = await animatedType(sr.image);
    return type ? { src: sr.image, type } : null;
  }
  if (!r.url?.includes('opensea.io')) return null;
  const url = r.url.replace(/\/assets\/(ethereum|matic)\//, '/item/$1/');
  const items = await openseaItems(url);
  if (url.includes('/item/')) return items[0] ? fromItem(items[0]) : null;
  for (const item of items.slice(0, 6)) {
    const m = await fromItem(item);
    if (m) return m;
  }
  return null;
}

let media = {};
try { media = JSON.parse(await readFile(OUT, 'utf8')); } catch {}
const checked = new Set(Object.keys(media));
let found = 0;
const failed = [];
for (const r of releases) {
  if (!FORCE && checked.has(r.id)) continue;
  try {
    const m = await mediaFor(r);
    media[r.id] = m; // null = checked, nothing animated
    if (m) found++;
    process.stdout.write(m ? '▶' : '.');
    if (!r.source.startsWith('superrare')) await sleep(600);
  } catch (e) {
    failed.push(`${r.id}: ${e.message}`);
    process.stdout.write('x');
  }
}
const sorted = Object.fromEntries(Object.entries(media).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(OUT, JSON.stringify(sorted, null, 2) + '\n');
const total = Object.values(sorted).filter(Boolean).length;
console.log(`\n${total} animated (${found} new) of ${releases.length} releases → src/data/media.json`);
if (failed.length) console.log('Failed:\n  ' + failed.join('\n  '));
