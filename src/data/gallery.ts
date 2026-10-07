// One record per work for the art-first homepage (/v2): the stage, the index grid
// and the full-screen viewer all read from this. Mirrors the shaping in
// pages/archive.astro so prices, collectors and descriptions stay in step.
import thumbsJson from './thumbs.json';
import thumbsLgJson from './thumbs-lg.json';
import sizesJson from './thumb-sizes.json';
import mediaJson from './media.json';
import marketJson from './market.json';
import { works } from './works';
import { sortedReleases, releaseYear, formatReleaseDate, KIND_LABEL, type Release } from './releases';

type Price = { amount: number; symbol: string; usd: number | null };
type Owner = { address: string; name: string | null; username: string | null; ens: string | null; artist: boolean };
type Market = {
  owner?: Owner | null;
  description: string | null;
  lastSale: (Price & { date?: string | null }) | null;
  listing: (Price & { kind: 'buy' | 'floor' | 'reserve' | 'auction' }) | null;
};

const thumbs: Record<string, string> = thumbsJson;
const thumbsLg: Record<string, string | null> = thumbsLgJson;
const sizes = sizesJson as Record<string, [number, number]>;
const media = mediaJson as Record<string, { src: string; type: 'video' | 'gif' } | null>;
const market = marketJson.releases as Record<string, Market>;
const captions = new Map(works.map((w) => [w.slug, w.caption]));

const fmtEth = (p: Price) =>
  `${p.amount.toLocaleString('en-US', { maximumFractionDigits: p.amount < 1 ? 4 : 2 })} ${p.symbol}`;
const shortAddr = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;
const ownerLabel = (o: Owner) => o.ens ?? (o.name && !o.name.startsWith('0x') ? o.name : shortAddr(o.address));
const ownerUrl = (r: Release, o: Owner) =>
  r.source === 'superrare' && o.username ? `https://superrare.com/${o.username}` : `https://opensea.io/${o.address}`;
const marketName = (url: string) =>
  url.includes('superrare.com') ? 'SuperRare'
  : url.includes('opensea.io') ? 'OpenSea'
  : url.includes('deca.art') ? 'Deca'
  : url.includes('rareart.io') ? 'R.A.R.E. Art Labs'
  : url.includes('niftygateway.com') ? 'Nifty Gateway'
  : new URL(url).hostname.replace(/^www\./, '');
const clip = (t: string, n = 900) => (t.length > n ? `${t.slice(0, n).replace(/\s+\S*$/, '')}…` : t);

/** What a collector can do right now, in plain words. */
const CTA = { buy: 'Buy now', floor: 'Collect from', reserve: 'Reserve', auction: 'Live auction' } as const;

export type GalleryItem = ReturnType<typeof toItem>;

function toItem(r: Release) {
  const mk = market[r.id];
  const o = mk?.owner;
  const [w, h] = sizes[r.id] ?? [480, 480];
  const desc = r.description ?? mk?.description ?? (r.slug ? captions.get(r.slug) : undefined) ?? null;
  return {
    id: r.id,
    title: r.title,
    year: releaseYear(r),
    date: formatReleaseDate(r.date),
    sortDate: r.date ?? '0000',
    img: thumbs[r.id] ?? null,
    lg: thumbsLg[r.id] ?? null,
    ar: Math.round((w / h) * 1000) / 1000,
    media: media[r.id] ?? null,
    kind: r.kind,
    kindLabel: `${KIND_LABEL[r.kind]}${r.supply != null && r.kind !== '1/1' ? ` of ${r.supply.toLocaleString('en-US')}` : ''}`,
    series: r.series && r.series !== 'Landmark' ? r.series : null,
    platform: r.platform,
    chain: r.chain,
    badge: r.badge ?? null,
    url: r.url ?? null,
    market: r.url ? marketName(r.url) : null,
    page: r.slug ? `/work/${r.slug}` : null,
    owner: o && !o.artist ? { label: ownerLabel(o), href: ownerUrl(r, o) } : null,
    /** Coldie still holds the token (so a listing is his own primary sale) */
    artistOwned: !!o?.artist,
    sale: mk?.lastSale ? `${fmtEth(mk.lastSale)}${mk.lastSale.date ? ` · ${formatReleaseDate(mk.lastSale.date)}` : ''}` : null,
    listing: mk?.listing
      ? {
          kind: mk.listing.kind,
          cta: CTA[mk.listing.kind],
          price: fmtEth(mk.listing),
          usd: mk.listing.usd ? `≈ $${mk.listing.usd.toLocaleString('en-US')}` : null,
        }
      : null,
    price: mk?.listing?.amount ?? null,
    burned: !!r.burned,
    desc: desc ? clip(desc) : null,
  };
}

/**
 * Left out of the homepage grid only — they stay in the archive.
 * Plain strings match titles case-insensitively by substring; regexes for anything finer.
 */
const HOME_EXCLUDE: (string | RegExp)[] = [
  'energy system',
  'energetic body',
  'perspective shift — burn',
  'proof of stake - variant 01',
  'proof of stake - variant 02',
  'ubaraja',
  'decentraland wearables',
  'now is the best time',
  'everything connected',
  /^ETH SF 2018 [2-5]\/5$/i, // keep 1/5
  /^ETH Singapore(?!.*3D Poster)/i, // keep only the 3D Poster
  'mystic bufficorn',
  'free energy',
  'human nature',
  /^GANdinsky.*variant/i,
];
const excluded = (title: string) =>
  HOME_EXCLUDE.some((x) => (typeof x === 'string' ? title.toLowerCase().includes(x) : x.test(title)));

/** Every work with an image, oldest first (the timeline opens in 2018). Used by the archive grid. */
export const allGalleryItems = sortedReleases
  .filter((r) => thumbs[r.id])
  .map(toItem)
  .sort((a, b) => a.sortDate.localeCompare(b.sortDate));

/** The homepage selection: everything except HOME_EXCLUDE. */
export const galleryItems = allGalleryItems.filter((g) => !excluded(g.title));

/** The stage: hand-picked works, shown in this order (release ids from releases.ts). */
const STAGE_PICKS = [
  'en-marcha',
  'tech-epochalypse',
  'sr-b932a7-43335', // Sands of Time
  'sr-b932a7-37869', // Proof of Stake - Genesis
];

export const stageItems = STAGE_PICKS.map((id) => galleryItems.find((g) => g.id === id)).filter((g): g is GalleryItem => !!g);

/** Years, series and the for-sale count for a set of items. */
export const galleryMeta = (items: GalleryItem[]) => ({
  years: [...new Set(items.map((g) => g.year).filter((y): y is number => y != null))],
  series: [...new Set(items.map((g) => g.series).filter((s): s is string => !!s))].sort(),
  forSale: items.filter((g) => g.listing).length,
});
