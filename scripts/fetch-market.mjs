// Snapshot of description, last sale and current listing for every release,
// written to src/data/market.json and shown in the /releases columns.
//
//   node scripts/fetch-market.mjs
//
// • SuperRare 1/1s — superrare.com's own profile endpoint (same one the import uses).
// • Everything else — the release's OpenSea listing page, which embeds its data
//   as urql rehydration JSON:
//     item page        → that token's description, last sale, current listing
//     collection page  → collection description; floor (or, for a trait-filtered
//                        view of a shared collection, the cheapest Coldie listing);
//                        most recent sale among the items the page embeds
// For 1/1s it also records the current owner (collector) and resolves their primary
// ENS name on-chain via the ENS ReverseRecords contract (forward-verified names only).
// Prices and owners are a point-in-time snapshot; re-run to refresh.
// Runs weekly in .github/workflows/update-market.yml. A release whose fetch fails keeps
// its previous entry; if too many fail (blocked/outage) the run exits non-zero and
// writes nothing, so a bad week never blanks the page.

import { readFile, writeFile } from 'node:fs/promises';
import { releases } from '../src/data/releases.ts';

const OUT = new URL('../src/data/market.json', import.meta.url);
const UA = { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** { amount, symbol, usd } from a SuperRare or OpenSea price object; WETH reads as ETH. */
function price(amount, symbol, usd) {
  if (!(amount > 0)) return null;
  return {
    amount: Number(amount.toPrecision(6)),
    symbol: symbol === 'WETH' ? 'ETH' : symbol,
    usd: usd ? Math.round(usd) : null,
  };
}

// ── SuperRare ────────────────────────────────────────────────

async function superrareMarket() {
  const byToken = new Map();
  for (let cursor = 0; ; cursor += 50) {
    const res = await fetch('https://superrare.com/api/trpc/profile.getCreations?batch=1', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...UA },
      body: JSON.stringify({
        0: {
          json: {
            creatorUsername: 'coldie', orderBy: 'DATE_MINTED_DESC', take: 50, searchQuery: '',
            filterBy: 'isApprovedCreator:=true', showAvailableOnly: false, includeMintProgress: false,
            chainId: 1, cursor, direction: 'forward',
          },
        },
      }),
    });
    const { artworks, hasNextPage } = (await res.json())[0].result.data.json;
    for (const a of artworks) byToken.set(`${a.contractAddress.toLowerCase()}:${a.tokenId}`, a);
    if (!hasNextPage || artworks.length < 50) break;
  }
  return byToken;
}

const srPrice = (p) => !p ? null :
  price(Number(p.cryptoAmount) / 10 ** (p.currency?.decimals ?? 18), p.currency?.symbol ?? 'ETH', p.usdAmount);

/** Coldie's own wallets — shown as "Artist collection" rather than a collector. */
const ARTIST_WALLETS = new Set([
  '0xd0c877b474cd51959931a7f70d7a6c60f50cdae7', // coldie.eth
  '0x7d72cb94b93ac5413364d25b3293a364879b31b1', // coldievault
]);

function fromSuperRare(a) {
  const sale = srPrice(a.insights?.mostRecentSale?.price);
  const listing = a.state?.listings?.map((l) => srPrice(l.price)).find(Boolean);
  const auction = a.state?.auctions?.find((x) => x.state !== 'ENDED');
  const auctionPrice = srPrice(auction?.currentBid?.price ?? auction?.reserveBidPrice ?? auction?.minimumBid);
  return {
    owner: a.owner?.defaultAddress
      ? { address: a.owner.defaultAddress.toLowerCase(), name: a.owner.fullName || a.owner.username || null, username: a.owner.username || null }
      : null,
    description: a.metadata?.description?.trim() || null,
    lastSale: sale,
    listing: listing
      ? { kind: 'buy', ...listing }
      : auctionPrice
        ? { kind: auction.state === 'RUNNING' ? 'auction' : 'reserve', ...auctionPrice }
        : null,
  };
}

// ── OpenSea ──────────────────────────────────────────────────

const MARKER = '(window[Symbol.for("urql_transport")] ??= []).push(';
function urqlBlocks(html) {
  const out = [];
  for (let i = 0; (i = html.indexOf(MARKER, i)) !== -1; ) {
    const start = i + MARKER.length;
    const end = html.indexOf(')</script>', start);
    try { out.push(JSON.parse(html.slice(start, end))); } catch {}
    i = end;
  }
  return out;
}
function* walk(o) {
  if (o && typeof o === 'object') {
    yield o;
    for (const v of Object.values(o)) yield* walk(v);
  }
}
const osPrice = (p) => (p ? price(p.token?.unit, p.token?.symbol, p.usd) : null);

async function openseaPage(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(45000) });
    if (res.ok) return [...walk(urqlBlocks(await res.text()))];
    if (res.status !== 429) throw new Error(`${res.status} ${url}`);
    await sleep(5000 * (attempt + 1));
  }
  throw new Error(`rate limited ${url}`);
}

async function fromOpenSeaItem(url) {
  const nodes = await openseaPage(url);
  const item = nodes.find((o) => o.__typename === 'Item' && 'lastSale' in o);
  if (!item) throw new Error('no item data');
  const listing = osPrice(item.bestListing?.pricePerItem);
  const sale = osPrice(item.lastSale);
  return {
    owner: item.owner?.address
      ? { address: item.owner.address.toLowerCase(), name: item.owner.displayName || null, username: null }
      : null,
    description: item.description?.trim() || null,
    lastSale: sale && { ...sale, date: item.lastSaleAt?.slice(0, 10) ?? null },
    listing: listing && { kind: 'buy', ...listing },
  };
}

async function fromOpenSeaCollection(url) {
  const slug = new URL(url).pathname.split('/')[2];
  const filtered = /[?&](traits|search)/.test(url);
  const nodes = await openseaPage(url);
  const coll = nodes.find((o) => o.__typename === 'Collection' && o.slug === slug && 'floorPrice' in o);
  const described = nodes.find((o) => o.__typename === 'Collection' && o.slug === slug && o.description);
  const items = nodes.filter((o) => o.__typename === 'Item' && 'lastSale' in o);

  const listings = items.map((i) => osPrice(i.bestListing?.pricePerItem)).filter(Boolean);
  const cheapest = listings.sort((a, b) => a.amount - b.amount)[0];
  const floor = !filtered ? osPrice(coll?.floorPrice?.pricePerItem) : null;
  const recent = items
    .filter((i) => i.lastSaleAt && osPrice(i.lastSale))
    .sort((a, b) => b.lastSaleAt.localeCompare(a.lastSaleAt))[0];

  // A trait-filtered view of a shared collection: describe Coldie's piece, not the collection.
  const description = filtered
    ? items.find((i) => i.description?.trim())?.description
    : described?.description;
  return {
    description: description?.trim() || null,
    lastSale: recent ? { ...osPrice(recent.lastSale), date: recent.lastSaleAt.slice(0, 10) } : null,
    listing: (floor ?? cheapest) ? { kind: 'floor', ...(floor ?? cheapest) } : null,
  };
}

/** OpenSea URL for this release: item page when it is one token, else its collection page. */
function openseaUrl(r) {
  if (!r.url?.includes('opensea.io')) return null;
  return r.url.replace(/\/assets\/(ethereum|matic)\//, '/item/$1/');
}

// ── Run ──────────────────────────────────────────────────────

const MAX_FAILURE_RATE = 0.4;
let previous = {};
try { previous = JSON.parse(await readFile(OUT, 'utf8')).releases ?? {}; } catch {}

const out = {};
const failed = [];
let attempted = 0;

let sr = null;
try {
  sr = await superrareMarket();
} catch (e) {
  failed.push(`superrare: ${e.message}`);
}

for (const r of releases) {
  if (r.noMarket) continue;
  const key = r.contract && r.tokenId && `${r.contract.toLowerCase()}:${r.tokenId}`;
  const url = openseaUrl(r);
  if (r.source !== 'superrare' && !url) continue;
  attempted++;
  try {
    if (r.source === 'superrare') {
      if (!sr?.has(key)) throw new Error('not in SuperRare response');
      out[r.id] = fromSuperRare(sr.get(key));
      continue;
    }
    out[r.id] = url.includes('/item/') ? await fromOpenSeaItem(url) : await fromOpenSeaCollection(url);
    process.stdout.write('.');
    await sleep(800);
  } catch (e) {
    failed.push(`${r.id}: ${e.message}`);
    if (previous[r.id]) out[r.id] = previous[r.id]; // keep last known values
    process.stdout.write('x');
  }
}

const failureRate = failed.length / Math.max(attempted, 1);
if (failureRate > MAX_FAILURE_RATE) {
  console.error(`\n${failed.length}/${attempted} fetches failed — not writing market.json.`);
  console.error('  ' + failed.slice(0, 15).join('\n  '));
  process.exit(1);
}

// Owners only matter for 1/1s.
for (const r of releases) {
  const m = out[r.id];
  if (m && !(r.kind === '1/1' && (r.supply ?? 1) === 1)) delete m.owner;
}

// ── ENS (reverse records, batched) ───────────────────────────
const REVERSE_RECORDS = '0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C';
async function ensNames(addresses) {
  const enc = (n) => n.toString(16).padStart(64, '0');
  const data =
    '0xcbf8b66c' + enc(32) + enc(addresses.length) + addresses.map((a) => a.slice(2).padStart(64, '0')).join('');
  const res = await fetch('https://ethereum-rpc.publicnode.com', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_call', params: [{ to: REVERSE_RECORDS, data }, 'latest'] }),
  });
  const { result } = await res.json();
  const h = result.slice(2);
  const word = (i) => Number(BigInt('0x' + h.slice(i * 64, i * 64 + 64)));
  const base = word(0) / 32;
  return Array.from({ length: word(base) }, (_, k) => {
    const off = word(base + 1 + k) / 32 + base + 1;
    return Buffer.from(h.slice((off + 1) * 64, (off + 1) * 64 + word(off) * 2), 'hex').toString() || null;
  });
}
const owners = [...new Set(Object.values(out).map((m) => m.owner?.address).filter(Boolean))];
const ens = new Map();
for (let i = 0; i < owners.length; i += 50) {
  const batch = owners.slice(i, i + 50);
  try {
    (await ensNames(batch)).forEach((name, k) => name && ens.set(batch[k], name));
  } catch (e) {
    failed.push(`ens: ${e.message}`);
  }
}
const previousEns = new Map(
  Object.values(previous).flatMap((m) => (m.owner?.ens ? [[m.owner.address, m.owner.ens]] : []))
);
const ensFailed = failed.some((f) => f.startsWith('ens:'));
for (const m of Object.values(out)) {
  if (!m.owner) continue;
  m.owner.ens = ens.get(m.owner.address) ?? (ensFailed ? previousEns.get(m.owner.address) : null) ?? null;
  m.owner.artist = ARTIST_WALLETS.has(m.owner.address);
}

await writeFile(
  OUT,
  JSON.stringify({ fetchedAt: new Date().toISOString().slice(0, 10), releases: out }, null, 2) + '\n'
);
const n = (f) => Object.values(out).filter(f).length;
console.log(
  `\n${Object.keys(out).length} releases · ${n((m) => m.description)} descriptions · ` +
    `${n((m) => m.lastSale)} last sales · ${n((m) => m.listing)} listed · ` +
    `${n((m) => m.owner)} 1/1 owners (${n((m) => m.owner?.ens)} with ENS)`
);
if (failed.length) console.log('Failed:\n  ' + failed.join('\n  '));
