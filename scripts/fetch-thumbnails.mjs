// Builds a still-frame thumbnail for every release in src/data/releases.ts.
//
//   node scripts/fetch-thumbnails.mjs           # only missing thumbnails
//   node scripts/fetch-thumbnails.mjs --force   # rebuild all
//
// Source image, in order of preference:
//   1. release.thumbSrc            — explicit override (local /public path or URL)
//   2. SuperRare token             — the poster image SuperRare serves (stills for video works)
//   3. on-chain metadata           — tokenURI()/uri() → metadata.image (needs a token id;
//                                    collections on Coldie-only contracts fall back to token #1)
// No source → no thumbnail (OpenSea's og:image is a generated stats card, not the art).
// Output: public/releases/thumbs/<id>.webp (480px wide; GIFs use their first frame)
// and src/data/thumbs.json mapping release id → public path, plus
// src/data/thumb-sizes.json (id → [width, height]) so pages can show each work
// at its own aspect ratio without layout shift.

import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import sharp from 'sharp';
import { releases } from '../src/data/releases.ts';
import superrare from '../src/data/superrare.json' with { type: 'json' };

const FORCE = process.argv.includes('--force');
const ROOT = new URL('../', import.meta.url);
const OUT_DIR = new URL('public/releases/thumbs/', ROOT);
const MANIFEST = new URL('src/data/thumbs.json', ROOT);
const RPC = {
  Ethereum: 'https://ethereum-rpc.publicnode.com',
  Polygon: 'https://polygon-bor-rpc.publicnode.com',
};
// Multi-artist contracts: never guess a token id here — it could be someone else's work.
const SHARED = new Set(
  [
    '0x495f947276749ce646f68ac8c248420045cb7b5e', // OpenSea shared storefront
    '0x4d232cd85294acd53ec03f4a57f57888c9ea1946', // Ash Metamorphosis
    '0x2963ba471e265e5f51cafafca78310fe87f8e6d1', // MakersPlace
    '0x7c688630370a2900960f5ffd7573d2f66f179733', // Decentraland
    '0xa58b5224e2fd94020cb2837231b2b0e4247301a6', // Cryptovoxels
    '0x6d4530149e5b4483d2f7e60449c02570531a0751', // Series 1 Genesis
  ].map((a) => a.toLowerCase())
);
const UA = { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36' };

const srImage = new Map(superrare.tokens.map((t) => [`${t.contract.toLowerCase()}:${t.tokenId}`, t.image]));

const IPFS_GATEWAYS = ['https://ipfs.io/ipfs/', 'https://dweb.link/ipfs/', 'https://gateway.pinata.cloud/ipfs/', 'https://w3s.link/ipfs/'];

/** Candidate HTTP URLs for a media/metadata URI — every gateway for IPFS content. */
function candidates(u) {
  if (/^(Qm[1-9A-Za-z]{44}|bafy[a-z2-7]+)/.test(u)) u = `ipfs://${u}`;
  const cid = u.match(/^ipfs:\/\/(?:ipfs\/)?(.+)$/)?.[1] ?? u.match(/^https?:\/\/[^/]+\/ipfs\/(.+)$/)?.[1];
  if (cid) return [...(u.startsWith('http') ? [u] : []), ...IPFS_GATEWAYS.map((g) => g + cid)];
  return [u.replace(/^ar:\/\//, 'https://arweave.net/')];
}

async function getAny(uri, ms) {
  let err;
  for (const u of candidates(uri)) {
    try {
      return await get(u, ms);
    } catch (e) {
      err = e;
    }
  }
  throw err;
}

async function get(url, ms = 60000) {
  const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(ms), redirect: 'follow' });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}

async function ethCall(chain, to, data) {
  const res = await fetch(RPC[chain] ?? RPC.Ethereum, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_call', params: [{ to, data }, 'latest'] }),
    signal: AbortSignal.timeout(20000),
  });
  const { result } = await res.json();
  if (!result || result === '0x') return null;
  const hex = result.slice(2);
  const len = parseInt(hex.slice(64, 128), 16);
  return Buffer.from(hex.slice(128, 128 + len * 2), 'hex').toString('utf8');
}

async function metadataImage(chain, contract, tokenId) {
  const id = BigInt(tokenId).toString(16).padStart(64, '0');
  let uri = (await ethCall(chain, contract, '0xc87b56dd' + id)) ?? (await ethCall(chain, contract, '0x0e89341c' + id));
  if (!uri) return null;
  uri = uri.replace('{id}', id);
  let meta;
  if (uri.startsWith('data:')) {
    const [head, body] = uri.split(',', 2);
    meta = JSON.parse(head.includes('base64') ? Buffer.from(body, 'base64').toString() : decodeURIComponent(body));
  } else {
    meta = await (await getAny(uri, 30000)).json();
  }
  return meta.image ?? meta.image_url ?? meta.imageUrl ?? null;
}

/** contract + token id for the release, from its fields, listing URL, or first variant. */
function tokenRef(r) {
  const fromUrl = r.url?.match(/\/(?:item|assets)\/(?:ethereum|matic|polygon)\/(0x[0-9a-fA-F]{40})\/(\d+)/);
  const contract = r.contract ?? fromUrl?.[1];
  if (!contract) return null;
  const tokenId = r.thumbToken ?? r.tokenId ?? fromUrl?.[2] ?? r.variants?.find((v) => v.tokenId)?.tokenId;
  if (tokenId) return { contract, tokenId };
  return SHARED.has(contract.toLowerCase()) ? null : { contract, tokenId: '1', guessed: true };
}

async function sourceFor(r) {
  if (r.thumbSrc) return r.thumbSrc;
  const ref = tokenRef(r);
  if (ref) {
    const sr = srImage.get(`${ref.contract.toLowerCase()}:${ref.tokenId}`);
    if (sr) return sr;
    // collections guessed at token #1 may start at #0
    const ids = ref.guessed ? ['1', '0'] : [ref.tokenId];
    for (const id of ids) {
      try {
        const img = await metadataImage(r.chain, ref.contract, id);
        if (img) return img;
      } catch {}
    }
  }
  return null;
}

async function load(src) {
  if (src.startsWith('/')) return readFile(new URL('public' + src, ROOT));
  if (src.startsWith('data:')) {
    const [head, body] = src.split(',', 2);
    return head.includes('base64') ? Buffer.from(body, 'base64') : Buffer.from(decodeURIComponent(body));
  }
  let err;
  for (const u of candidates(src)) {
    try {
      const res = await get(u);
      const type = res.headers.get('content-type') ?? '';
      if (type.startsWith('video/')) throw new Error(`video, not a still: ${u}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      err = e;
    }
  }
  throw err;
}

/** First frame of an animation — unless it's a fade-in with far less detail than later frames. */
async function stillFrame(buf) {
  const { pages = 1 } = await sharp(buf, { limitInputPixels: false }).metadata();
  if (pages < 2) return 0;
  const detail = async (page) => {
    const { channels } = await sharp(buf, { page, pages: 1, limitInputPixels: false }).stats();
    return channels.slice(0, 3).reduce((n, c) => n + c.stdev, 0);
  };
  const samples = [0, 0.25, 0.5, 0.75].map((f) => Math.floor(f * pages));
  const scores = await Promise.all(samples.map(detail));
  const best = scores.indexOf(Math.max(...scores));
  return scores[0] < 0.6 * scores[best] ? samples[best] : 0;
}

const exists = (u) => access(u).then(() => true, () => false);
let manifest = {};
try { manifest = JSON.parse(await readFile(MANIFEST, 'utf8')); } catch {}
await mkdir(OUT_DIR, { recursive: true });

const missing = [];
const queue = releases.slice();
async function worker() {
  for (let r; (r = queue.shift()); ) {
    const file = new URL(`${r.id}.webp`, OUT_DIR);
    if (!FORCE && manifest[r.id] && (await exists(file))) continue;
    try {
      const src = await sourceFor(r);
      if (!src) throw new Error('no source image');
      const buf = await load(src);
      await sharp(buf, { page: await stillFrame(buf), pages: 1, limitInputPixels: false })
        .resize({ width: 480, height: 480, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 74 })
        .toFile(file.pathname);
      manifest[r.id] = `/releases/thumbs/${r.id}.webp`;
      process.stdout.write('.');
    } catch (e) {
      delete manifest[r.id];
      missing.push(`${r.id}: ${e.message}`);
      process.stdout.write('x');
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');

const sizes = {};
for (const id of Object.keys(sorted)) {
  const { width, height } = await sharp(new URL(`${id}.webp`, OUT_DIR).pathname).metadata();
  sizes[id] = [width, height];
}
await writeFile(new URL('src/data/thumb-sizes.json', ROOT), JSON.stringify(sizes) + '\n');
console.log(`\n${Object.keys(sorted).length}/${releases.length} thumbnails`);
if (missing.length) console.log('Missing:\n  ' + missing.join('\n  '));
