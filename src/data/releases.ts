// ============================================================
// Releases database — searchable index of on-chain releases.
//
// SEEDED FROM COLDIE'S TRACKING SHEET (Google Sheet, "Artwork" tab) plus the
// known auction/landmark works. Fields the sheet did not contain are left blank
// or marked [CONFIRM]:
//   • floor       — the sheet has no prices. Live floor needs the OpenSea API
//                   (x-api-key); until then these stay null → shown as "—".
//   • available   — the sheet tracks mint/workflow status ("done", "ticket
//                   opened"), not units left, so availability is "tbc" where unknown.
//   • year/series — inferred where safe, otherwise [CONFIRM].
//
// `url` points to whatever the sheet had for that row (Deca / OpenSea / contract).
// ============================================================

export type ReleaseStatus = 'available' | 'sold out' | 'reserved' | 'secondary only' | 'tbc';

export type Release = {
  title: string;
  series: string;
  year: number | null;
  chain: string;
  platform: string;
  editionSize: number | null;
  available: number | null;
  status: ReleaseStatus;
  floor: number | null;
  currency: string;
  url?: string;
  /** on-chain contract address (from the sheet), if known */
  contract?: string;
  slug?: string;
  badge?: string;
};

export const releases: Release[] = [
  // ── Landmark / auction works (known-real) ──
  {
    title: "The Day We've All Been Waiting For",
    series: 'Landmark',
    year: 2018,
    chain: 'Ethereum',
    platform: 'R.A.R.E. Art Labs',
    editionSize: 1,
    available: 0,
    status: 'secondary only',
    floor: null,
    currency: 'ETH',
    slug: 'the-day-weve-all-been-waiting-for',
    badge: 'Historic first · 2018',
  },
  {
    title: '3D Light Painting 03',
    series: 'Landmark',
    year: 2022,
    chain: 'Ethereum',
    platform: "Sotheby's",
    editionSize: 1,
    available: 0,
    status: 'secondary only',
    floor: null,
    currency: 'ETH',
    slug: '3d-light-painting-03',
    badge: "Sotheby's",
  },
  {
    title: 'Proof of Work — Genesis',
    series: 'Landmark',
    year: 2021,
    chain: 'Ethereum',
    platform: 'SuperRare',
    editionSize: 1,
    available: 0,
    status: 'secondary only',
    floor: null,
    currency: 'ETH',
    slug: 'proof-of-work-genesis',
    badge: 'Bonhams',
  },
  {
    title: 'UAP — Unidentified Art Phenomenon',
    series: 'Collaborations',
    year: 2022,
    chain: 'Ethereum',
    platform: 'SuperRare',
    editionSize: 1,
    available: 0,
    status: 'secondary only',
    floor: null,
    currency: 'ETH',
    slug: 'uap-unidentified-art-phenomenon',
    badge: 'with Hackatao',
  },

  // ── From the tracking sheet ──
  {
    title: 'Choose Your Own Adventure', // ASYNC Art programmable master
    series: 'Landscapes',
    year: null, // [CONFIRM]
    chain: 'Ethereum',
    platform: 'Async Art',
    editionSize: 1,
    available: null,
    status: 'tbc',
    floor: null,
    currency: 'ETH',
    url: 'https://opensea.io/collection/async-art?search[stringTraits][0][name]=Artist&search[stringTraits][0][values][0]=Coldie',
    slug: 'choose-your-own-adventure',
    badge: 'Async programmable',
  },
  {
    title: 'GANdinsky',
    series: 'Editions', // [CONFIRM]
    year: null, // [CONFIRM]
    chain: 'Ethereum',
    platform: 'Deca',
    editionSize: null, // [CONFIRM]
    available: null,
    status: 'tbc',
    floor: null,
    currency: 'ETH',
    url: 'https://deca.art/collection/gandinsky-3d',
  },
  {
    title: 'PixelChain', // [CONFIRM] exact title(s)
    series: 'Editions', // [CONFIRM]
    year: null, // [CONFIRM]
    chain: 'Ethereum',
    platform: 'PixelChain',
    editionSize: null,
    available: null,
    status: 'tbc',
    floor: null,
    currency: 'ETH',
    contract: '0x9e1f3e8db4d1119894624632499eaed1e56d2b1d',
  },
  {
    title: 'Pascal Gauthier — CoinDesk Most Influential 2023',
    series: 'Portraits', // [CONFIRM] (Decentral Eyes?)
    year: 2023,
    chain: 'Ethereum',
    platform: 'tbc', // [CONFIRM]
    editionSize: null,
    available: null,
    status: 'tbc',
    floor: null,
    currency: 'ETH',
  },
  {
    title: 'SuperRare (shared contract)', // [CONFIRM] split into individual works?
    series: 'Editions',
    year: null,
    chain: 'Ethereum',
    platform: 'SuperRare',
    editionSize: 168, // "Supply 168" from the sheet
    available: null,
    status: 'tbc',
    floor: null,
    currency: 'ETH',
  },
];

export const releaseSeries = [...new Set(releases.map((r) => r.series))].sort();
export const releaseChains = [...new Set(releases.map((r) => r.chain))].sort();
export const releaseStatuses: ReleaseStatus[] = [
  'available',
  'reserved',
  'secondary only',
  'sold out',
  'tbc',
];
