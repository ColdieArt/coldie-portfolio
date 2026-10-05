// ============================================================
// Releases database — the searchable timeline of Coldie's digital releases,
// 2018 → today. Rendered at /archive.
//
// SOURCES
//   • 'sheet:editions' — Coldie's tracking sheet, "Editions" tab
//   • 'sheet:1of1s'    — same sheet, "1/1s" tab (rougher; mostly undated)
//   • 'superrare'      — every 1/1 Coldie created on SuperRare, imported into
//                        superrare.json by `node scripts/import-superrare.mjs`
//   • 'opensea'        — read straight off an OpenSea collection page
//   • 'rare'           — R.A.R.E. Art Labs (rareart.io/artist/coldie), original ERC-20 art tokens
//   • 'site'           — landmark works already documented in works.ts
//   https://docs.google.com/spreadsheets/d/15eo7roRXvw80IFG2726LxaNdWyPxTeVH39zmI_8m1fQ
//   https://superrare.com/coldie
//
// CONVENTIONS
//   • date: ISO 'YYYY-MM-DD', or 'YYYY-MM' / 'YYYY' when only partly known,
//     or null when unknown (shown in the "Date to confirm" group).
//   • Sub-tokens of one drop (tiers, variants, layers) live in `variants`
//     under the parent release rather than as separate timeline entries.
//   • `confirm: true` flags anything inferred or incomplete in the sheet.
//   • SuperRare tokens are generated from superrare.json (re-run the import
//     script to refresh); per-token extras go in SR_EXTRAS.
//   • To add a release: append an object below — the page, filters, year
//     rail and stats all derive from this array.
// ============================================================

import superrare from './superrare.json' with { type: 'json' };

export type ReleaseKind = '1/1' | 'edition' | 'generative' | 'wearable' | 'programmable' | 'tbc';
export type ReleaseSource = 'sheet:editions' | 'sheet:1of1s' | 'superrare' | 'opensea' | 'rare' | 'site';

export type ReleaseVariant = {
  title: string;
  kind?: ReleaseKind;
  supply?: number | null;
  date?: string;
  tokenId?: string;
  url?: string;
};

export type Release = {
  id: string;
  title: string;
  date: string | null;
  kind: ReleaseKind;
  /** raw "Gen / Ed" marker from the sheet when it adds nuance (gen+, ed+) */
  kindNote?: string;
  supply: number | null;
  series?: string;
  platform: string;
  chain: string;
  url?: string;
  /** secondary links (Nifty Gateway page, Deca, auction lot…) */
  links?: { label: string; url: string }[];
  contract?: string;
  tokenId?: string;
  /** sheet's "Twitter Sales Bot" column */
  salesBot?: boolean;
  variants?: ReleaseVariant[];
  notes?: string;
  /** links to /work/<slug> when the piece has a detail page */
  slug?: string;
  badge?: string;
  /** thumbnail override for scripts/fetch-thumbnails.mjs: a /public path or image URL */
  thumbSrc?: string;
  /** token to take the thumbnail from when the release has no single tokenId */
  thumbToken?: string;
  /** animated original (video/GIF URL) when it can't be discovered from SuperRare or OpenSea */
  animation?: string;
  /** skip scripts/fetch-market.mjs — the listing page isn't Coldie-only, so its prices would mislead */
  noMarket?: boolean;
  confirm?: boolean;
  /** kept in the data but left off the site (remove the flag to show it again) */
  hidden?: boolean;
  /** the tokens no longer exist (e.g. unsold R.A.R.E. editions burned in 2019) — shown with a BURNED stamp */
  burned?: boolean;
  /** a related release to point to, e.g. a later re-release of the same artwork */
  related?: { id: string; label: string };
  /** written description, for works with no marketplace page to read one from */
  description?: string;
  source: ReleaseSource;
};

const RARE_ARWEAVE = 'https://arweave.net/DLwcEja10vWjRuAqDf4Gwvo_IeJMFytxNo_4FOCJknM'; // R.A.R.E. Art Labs archive
const rareArt = (contract: string) => `https://www.rareart.io/artwork/${contract}`;
const VOXELS = '0xa58b5224e2FD94020cb2837231B2B0E4247301A6';
const NG_BUFFETT = '0xa81E0193f30bbd6E83366a88b4570e8766Ca2131';
const NG_ASSANGE = '0xe750D24Cb2fEB19B0cd4AF45427E6066a293d836';
const ASYNC_MASTERS = '0xb6dae651468e9593e4581705a09c10a76ac1e0c8'; // Async Art masters/layers
const ENERGY_SYSTEM = '0x4b152608c9f53ee95936e403879294525b0f5382';
const PASCAL = '0xf2168a4be7696a0266653d3a9610b2140e31c884'; // Transient Labs
const TECH_EPOCHALYPSE = '0xea030bb4da83c7b470f6d6109880116459509553';
const GANDINSKY = '0xd2eca00493ea1218a7ad20009ac0a4602839ca2b'; // GANdinsky 3D collection
const NG_BAUHAUS = '0xe9662B4E55b5feEF13ca7067f319562142BD1681';
const osItem = (contract: string, tokenId: string, chain = 'ethereum') =>
  `https://opensea.io/item/${chain}/${contract.toLowerCase()}/${tokenId}`;

const allReleases: Release[] = [
  // ─────────────────────────── 2018 ───────────────────────────
  {
    id: 'the-day',
    title: "The Day We've All Been Waiting For",
    date: '2018-05-07',
    kind: 'edition',
    supply: 2, // on-chain supply per R.A.R.E. Art Labs
    series: 'Landmark',
    platform: 'R.A.R.E. Art Labs',
    chain: 'Ethereum',
    url: rareArt('0xac293c5c2eca9c623c156d120e53b2a3650c173f'),
    contract: '0xac293c5c2eca9c623c156d120e53b2a3650c173f',
    slug: 'the-day-weve-all-been-waiting-for',
    badge: 'First stereoscopic artwork on a blockchain',
    thumbSrc: '/works/the-day/the-day.jpg',
    notes: 'Edition of 2. One is held by Coinbase and was on display in its lobby from 2018 to 2020.',
    source: 'site',
  },
  {
    id: 'rare-proof-of-work-2018',
    title: 'Proof of Work',
    date: '2018-09-26',
    kind: 'edition',
    supply: 10,
    series: 'Proof of Work',
    platform: 'R.A.R.E. Art Labs',
    chain: 'Ethereum',
    burned: true,
    badge: 'Burned · unsold edition of 10',
    thumbSrc: '/releases/thumbs/sr-b932a7-25441.webp',
    related: { id: 'sr-b932a7-25441', label: 'Proof of Work – Genesis (2021, Bonhams)' },
    description:
      'The original Proof of Work: the animated artwork that draws parallels between computers mining proof-of-work cryptocurrency and gold miners panning the rivers of the California gold rush, where Coldie grew up. ' +
      'It was tokenized on R.A.R.E. Art Labs on September 26, 2018 as an ERC-20 edition of 10. The edition went unsold for over a year, and on October 30, 2019, when ERC-721 had become the standard for NFTs, Coldie burned all his unsold tokens. ' +
      'He re-minted the work in its original size as a 1/1 on June 16, 2021: Proof of Work – Genesis, which became Lot 1 of the Bonhams & SuperRare sale “CryptOGs: The Pioneers of NFT Art”.',
    source: 'rare',
  },
  {
    id: 'rare-lost-vitalik-2018',
    title: 'The Lost Vitalik',
    date: '2018-05-09',
    kind: 'edition',
    supply: 25,
    series: 'Decentral Eyes',
    platform: 'R.A.R.E. Art Labs',
    chain: 'Ethereum',
    burned: true,
    badge: 'Burned · unsold edition of 25',
    thumbSrc: '/releases/thumbs/sr-b932a7-12380.webp',
    related: { id: 'sr-b932a7-12380', label: 'The Lost Vitalik – Decentral Eyes Genesis (2020)' },
    description:
      'The original Lost Vitalik: a true stereoscopic 3D portrait of Vitalik Buterin, made to be seen in depth through red/blue glasses, and the artwork Coldie calls the genesis of the Decentral Eyes series. ' +
      'It was minted on R.A.R.E. Art Labs on May 9, 2018, two days after The Day We’ve All Been Waiting For, as an ERC-20 edition of 25. The crypto art space was so new that no one bought it, and on October 30, 2019, when ERC-721 NFTs had become the standard, Coldie burned his unsold R.A.R.E. tokens, rewarding early collectors with scarcity. ' +
      'The artwork stayed in his archive until 2020, when he released it as a 1/1 on SuperRare: The Lost Vitalik – Decentral Eyes Genesis.',
    source: 'rare',
  },
  {
    id: 'rare-pyramid-on-mars',
    title: 'Pyramid on Mars',
    date: '2018-07-17',
    kind: '1/1',
    supply: 1,
    platform: 'R.A.R.E. Art Labs',
    chain: 'Ethereum',
    url: rareArt('0x5ef7935e4a431e9a517e12490c5c0563f19c72cc'),
    contract: '0x5ef7935e4a431e9a517e12490c5c0563f19c72cc',
    thumbSrc: `${RARE_ARWEAVE}/previews/0x5ef7935e4a431e9a517e12490c5c0563f19c72cc.jpg`,
    animation: `${RARE_ARWEAVE}/0x5ef7935e4a431e9a517e12490c5c0563f19c72cc.mp4`,
    notes: 'Original ERC-20 artwork token on R.A.R.E. Art Labs.',
    source: 'rare',
  },
  {
    id: 'rare-sol-puerto-rico',
    title: 'SOL - Puerto Rico',
    date: '2018-07-17',
    kind: 'edition',
    supply: 2,
    platform: 'R.A.R.E. Art Labs',
    chain: 'Ethereum',
    url: rareArt('0x8288af85c44e5d5752510418ec6003eafa13488d'),
    contract: '0x8288af85c44e5d5752510418ec6003eafa13488d',
    thumbSrc: `${RARE_ARWEAVE}/previews/0x8288af85c44e5d5752510418ec6003eafa13488d.jpg`,
    animation: `${RARE_ARWEAVE}/0x8288af85c44e5d5752510418ec6003eafa13488d.mp4`,
    notes: 'Original ERC-20 artwork token on R.A.R.E. Art Labs.',
    source: 'rare',
  },
  {
    id: 'rare-underground-energy',
    title: 'Underground Energy',
    date: '2018-07-17',
    kind: '1/1',
    supply: 1,
    platform: 'R.A.R.E. Art Labs',
    chain: 'Ethereum',
    url: rareArt('0xa9f3d184caf0fc3b26d35e2a8d87625c129b668f'),
    contract: '0xa9f3d184caf0fc3b26d35e2a8d87625c129b668f',
    thumbSrc: `${RARE_ARWEAVE}/previews/0xa9f3d184caf0fc3b26d35e2a8d87625c129b668f.jpg`,
    animation: `${RARE_ARWEAVE}/0xa9f3d184caf0fc3b26d35e2a8d87625c129b668f.mp4`,
    notes: 'Original ERC-20 artwork token on R.A.R.E. Art Labs.',
    source: 'rare',
  },

  // ─────────────────────────── 2019 ───────────────────────────
  {
    id: 'voxels-3d-glasses',
    title: 'Cryptovoxels 3D Glasses Wearables',
    date: '2019-12-01',
    kind: 'wearable',
    supply: 55,
    series: 'Wearables',
    platform: 'Cryptovoxels',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/cryptovoxel-wearables?traits=[{%22traitType%22:%22author%22,%22values%22:[%22Coldie%22]}]',
    contract: VOXELS,
    salesBot: true,
    notes: 'Release date taken from the earliest dated piece (Gold, Dec 1 2019).',
    variants: [
      { title: '3D Glasses — Gold', kind: 'wearable', supply: 21, date: '2019-12-01', tokenId: '507', url: osItem(VOXELS, '507') },
      { title: '3D Glasses — Silver', kind: 'wearable', supply: 21, date: '2019-12-11', tokenId: '660', url: osItem(VOXELS, '660') },
      { title: '3D Glasses — Gangnam', kind: '1/1', supply: 1, date: '2019-12-11', tokenId: '661', url: osItem(VOXELS, '661') },
      { title: '3D Glasses — Hipster Pink', kind: 'wearable', supply: 10, date: '2019-12-11', tokenId: '658', url: osItem(VOXELS, '658') },
      { title: 'Gold 3D Overhead Glasses', kind: 'wearable', supply: null, date: '2019-12-11', tokenId: '659', url: osItem(VOXELS, '659') },
    ],
    source: 'sheet:editions',
  },

  {
    id: 'gandinsky-3d-1',
    title: 'GANdinsky 3D - Image with Arrow 1/1',
    date: '2019-09-23',
    kind: '1/1',
    supply: 1,
    series: 'GANdinsky',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: osItem(GANDINSKY, '1'),
    contract: GANDINSKY,
    tokenId: '1',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0xd2eca00493ea1218a7ad20009ac0a4602839ca2b/c121ae8571aa9e3a9bd986d09a26ec/aec121ae8571aa9e3a9bd986d09a26ec.webp',
    source: 'opensea',
  },
  {
    id: 'gandinsky-3d-2',
    title: 'GANdinsky 3D - Green and Red 1/1',
    date: '2019-09-30',
    kind: '1/1',
    supply: 1,
    series: 'GANdinsky',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: osItem(GANDINSKY, '2'),
    contract: GANDINSKY,
    tokenId: '2',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0xd2eca00493ea1218a7ad20009ac0a4602839ca2b/9abd594975b524eac05f4dc4bed6f597.webp',
    source: 'opensea',
  },
  {
    id: 'gandinsky-3d-3',
    title: 'GANdinsky 3D - Deepened Impulse 1/1',
    date: '2019-10-31',
    kind: '1/1',
    supply: 1,
    series: 'GANdinsky',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: osItem(GANDINSKY, '3'),
    contract: GANDINSKY,
    tokenId: '3',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0xd2eca00493ea1218a7ad20009ac0a4602839ca2b/526a97a23c6105e7ed003bb8acaa72d2.webp',
    source: 'opensea',
  },

  {
    id: 'rare-ethereum-split-cut',
    title: 'Ethereum Split-Cut Shirt & Artwork Combo - 001',
    date: '2019-06-19',
    kind: 'edition',
    supply: 2,
    platform: 'R.A.R.E. Art Labs',
    chain: 'Ethereum',
    url: rareArt('0x46a9193f4b332c959b15d4034fe9527b796a87f5'),
    contract: '0x46a9193f4b332c959b15d4034fe9527b796a87f5',
    badge: 'Physical shirt + artwork',
    thumbSrc: `${RARE_ARWEAVE}/previews/0x46a9193f4b332c959b15d4034fe9527b796a87f5.jpg`,
    notes: 'Original ERC-20 artwork token on R.A.R.E. Art Labs.',
    source: 'rare',
  },
  {
    id: 'rare-bitcoin-split-cut',
    title: 'Bitcoin Split-Cut Shirt & Artwork Combo - 001',
    date: '2019-06-24',
    kind: '1/1',
    supply: 1,
    platform: 'R.A.R.E. Art Labs',
    chain: 'Ethereum',
    url: rareArt('0x520d9d5d61c70f577933d508db08b8c4f70f4160'),
    contract: '0x520d9d5d61c70f577933d508db08b8c4f70f4160',
    badge: 'Physical shirt + artwork',
    thumbSrc: `${RARE_ARWEAVE}/previews/0x520d9d5d61c70f577933d508db08b8c4f70f4160.jpg`,
    notes: 'Original ERC-20 artwork token on R.A.R.E. Art Labs.',
    source: 'rare',
  },

  // ─────────────────────────── 2020 ───────────────────────────
  {
    id: 'voxels-get-out',
    title: 'GET OUT — 3D Glasses',
    date: '2020-03-04',
    kind: 'wearable',
    supply: null,
    series: 'Wearables',
    platform: 'Cryptovoxels',
    chain: 'Ethereum',
    url: osItem(VOXELS, '1330'),
    contract: VOXELS,
    tokenId: '1330',
    source: 'sheet:editions',
  },
  {
    id: 'assange-decentral-eyes',
    title: 'Julian Assange — Decentral Eyes',
    date: '2020-04-16',
    kind: 'edition',
    supply: 16,
    series: 'Decentral Eyes',
    platform: 'Nifty Gateway',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/julian-assange-decentral-eyes-by-coldie',
    contract: NG_ASSANGE,
    salesBot: true,
    variants: [
      { title: 'Base', kind: 'edition', supply: 10, tokenId: '400010001', url: osItem(NG_ASSANGE, '400010001') },
      { title: 'Silver', kind: 'edition', supply: 5, tokenId: '400020001', url: osItem(NG_ASSANGE, '400020001') },
      { title: 'Gold', kind: '1/1', supply: 1, tokenId: '400030001', url: osItem(NG_ASSANGE, '400030001') },
    ],
    source: 'sheet:editions',
  },
  {
    id: 'choose-your-own-adventure',
    title: 'Choose Your Own Adventure',
    date: '2020-08-09',
    kind: 'programmable',
    supply: 1,
    series: 'Landscapes',
    platform: 'ASYNC',
    chain: 'Ethereum',
    url: osItem(ASYNC_MASTERS, '392'),
    contract: ASYNC_MASTERS,
    tokenId: '392',
    slug: 'choose-your-own-adventure',
    badge: 'Async programmable master + layers',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0xb6dae651468e9593e4581705a09c10a76ac1e0c8/142322a0d2403bee729a928a31808fcf.png',
    variants: [
      { title: 'Master', kind: '1/1', supply: 1, tokenId: '392', url: osItem(ASYNC_MASTERS, '392') },
      ...['Psyche', 'Mountains', 'Large Moon', 'Small Moon', 'Ground', 'Bridge', 'Structure', 'Billboard', 'Outlier'].map(
        (t) => ({ title: `Layer — ${t}`, kind: 'programmable' as const })
      ),
    ],
    source: 'sheet:1of1s',
  },
  {
    id: 'pixelchain',
    title: 'PixelChain',
    date: '2020-04-21',
    kind: '1/1',
    supply: 3,
    platform: 'PixelChain',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/pixelchain?searchQuery=coldie',
    contract: '0x9e1f3e8db4d1119894624632499eaed1e56d2b1d',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0x9e1f3e8db4d1119894624632499eaed1e56d2b1d/4d0555fa7b5cfb2c6b24172e7b265379.png',
    notes: 'Pixel art stored fully on-chain.',
    variants: [
      { title: 'COLDIE 1', kind: '1/1', supply: 1, date: '2020-04-21', tokenId: '1380', url: osItem('0xbc0e164ee423b7800e355b012c06446e28b1a29d', '1380') },
      { title: 'Coldie 2', kind: '1/1', supply: 1, date: '2020-04-27', tokenId: '1691', url: osItem('0xbc0e164ee423b7800e355b012c06446e28b1a29d', '1691') },
      { title: 'Coldie 3', kind: '1/1', supply: 1, date: '2020-12-16', tokenId: '74', url: osItem('0x9e1f3e8db4d1119894624632499eaed1e56d2b1d', '74') },
    ],
    source: 'sheet:1of1s',
  },
  {
    id: 'buffett-decentral-eyes',
    title: 'Warren Buffett — Decentral Eyes',
    date: '2020-09-23',
    kind: 'edition',
    supply: 44,
    series: 'Decentral Eyes',
    platform: 'Nifty Gateway',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/coldie-warren-buffett-decentral-eyes',
    contract: NG_BUFFETT,
    variants: [
      {
        title: 'Variant 03',
        kind: '1/1',
        supply: 1,
        tokenId: '6100010001',
        url: osItem(NG_BUFFETT, '6100010001'),
      },
      { title: 'Variant 04', kind: '1/1', supply: 1, tokenId: '6100020001', url: osItem(NG_BUFFETT, '6100020001') },
      { title: 'Variant 05', kind: 'edition', supply: 21, tokenId: '6100030001', url: osItem(NG_BUFFETT, '6100030001') },
      { title: 'Variant 06', kind: 'edition', supply: 21, tokenId: '6100040001', url: osItem(NG_BUFFETT, '6100040001') },
    ],
    source: 'sheet:editions',
  },

  // ─────────────────────────── 2021 ───────────────────────────
  {
    id: 'trust-your-intuition',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0x6d4530149e5b4483d2f7e60449c02570531a0751/f106407dfa68deb7c512768702475976.png?w=500',
    title: 'Trust Your Intuition',
    date: '2021-02-19',
    kind: 'edition',
    supply: 500,
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/series-1-genesis-series?traits=[{%22traitType%22:%22artist%20name%22,%22values%22:[%22Coldie%22]}]',
    contract: '0x6d4530149e5B4483d2F7E60449C02570531A0751',
    tokenId: '91',
    salesBot: true,
    notes: 'Part of a "Series 1 — Genesis Series" multi-artist collection.',
    source: 'sheet:editions',
  },
  {
    id: 'decentral-eyes-vr-og-collage',
    title: 'Decentral Eyes VR — OG Collage — Variant 01',
    date: '2021-08-06',
    kind: 'edition',
    supply: null,
    series: 'Decentral Eyes',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/item/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/94435268091181442854915346807983969869322842222577424154642597574593476558944',
    contract: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
    source: 'sheet:editions',
  },
  {
    id: 'undead-bauhaus',
    title: 'Undead — Coldie x Bauhaus',
    date: '2021-08-09',
    kind: 'edition',
    supply: 32,
    series: 'Collaborations',
    platform: 'Nifty Gateway',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/undead-by-coldie-x-bauhaus',
    contract: NG_BAUHAUS,
    tokenId: '1500010002',
    salesBot: true,
    variants: [
      { title: 'Bauhaus 1/1', kind: '1/1', supply: 1, tokenId: '1500030001', url: osItem(NG_BAUHAUS, '1500030001') },
      { title: 'Bauhaus 3D Anaglyph', kind: 'edition', supply: 21, tokenId: '1500010001', url: osItem(NG_BAUHAUS, '1500010001') },
      { title: 'Bauhaus Short Animation', kind: 'edition', supply: 10, tokenId: '1500020001', url: osItem(NG_BAUHAUS, '1500020001') },
    ],
    source: 'sheet:editions',
  },
  {
    id: 'decentraland-wearables',
    thumbSrc: 'https://i2c.seadn.io/polygon/0x7c688630370a2900960f5ffd7573d2f66f179733/75c75c1a9fe1857f322dd067d4a6a0/0875c75c1a9fe1857f322dd067d4a6a0.png?w=500',
    title: 'Decentraland Wearables',
    date: '2021-08-15',
    kind: 'wearable',
    supply: 109,
    series: 'Wearables',
    platform: 'Decentraland',
    chain: 'Polygon',
    url: 'https://opensea.io/collection/decentraland-polygon-wearables?searchQuery=coldie',
    contract: '0x7c688630370A2900960f5FFd7573d2F66f179733',
    salesBot: true,
    source: 'sheet:editions',
  },
  {
    id: 'decentraleyes-mashup',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0xc143bbfcdbdbed6d454803804752a064a622c1f3/b82361a6164babec554d9648f4dd160d.png?w=1000',
    title: 'DecentralEyes Mashup',
    date: '2021-12-17',
    kind: 'generative',
    supply: 523,
    series: 'Decentral Eyes',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/decentraleyesmashup-by-coldie',
    contract: '0xc143bbfcDBdBEd6d454803804752a064A622C1F3',
    salesBot: true,
    notes: 'Sheet note: "1000 = 1/1".',
    source: 'sheet:editions',
  },

  // ─────────────────────────── 2022 ───────────────────────────
  {
    id: 'filthy-fiat',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0xd1a7f3aa6d015ee0014384dadefa14d768cb2c14/93326c7088ee2fa4a31eee5163415b/0293326c7088ee2fa4a31eee5163415b.webp?w=500',
    title: 'Filthy Fiat',
    date: '2022-03-01',
    kind: 'generative',
    supply: 300,
    series: 'Filthy Fiat',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/filthyfiat-curated',
    source: 'sheet:editions',
  },
  {
    id: 'ash2-life',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0x4d232cd85294acd53ec03f4a57f57888c9ea1946/5040defdd28976231968253a8fdbfd40.png?w=500',
    title: 'Ash2 — Life Is Good / Life Is Hard',
    date: '2022-04-02',
    kind: 'edition',
    supply: 243,
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/ashmetamorphosis?traits=[{%22traitType%22:%22Creator%22,%22values%22:[%22Coldie%22]}]',
    contract: '0x4D232CD85294Acd53Ec03F4A57F57888c9Ea1946',
    notes: 'Part of the Ash Metamorphosis collection.',
    source: 'sheet:editions',
  },
  {
    id: 'swaps',
    title: 'Swaps',
    date: '2022-04-20',
    kind: 'edition',
    supply: 40,
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/swaps-by-coldie',
    contract: '0xcD327D27f64b9BD998C7FDE6Bf279ad542750826',
    salesBot: true,
    source: 'sheet:editions',
  },
  {
    id: 'fake-news',
    title: 'Fake News',
    date: '2022-06-18',
    kind: 'edition',
    supply: 55,
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/fake-news-by-coldie',
    contract: '0x246Dd026D3f8923013C73D9fC5c79dbA4a0D7793',
    salesBot: true,
    source: 'sheet:editions',
  },
  {
    id: 'trompepe',
    title: 'Trompepe',
    date: '2022-07-28',
    kind: 'edition',
    supply: null,
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/item/ethereum/0x4c03bcad293fb0562d26faa7d90a0cb3ea74c919/4703605804406566907235904826712670206595426577060870115580303229942781956241',
    contract: '0x4C03BCAD293fb0562D26FAa7D90A0cb3Ea74c919',
    source: 'sheet:editions',
  },
  {
    id: 'deyes-ascended',
    title: 'Deyes Ascended',
    date: '2022-08-04',
    kind: 'generative',
    kindNote: 'gen+',
    supply: 20,
    series: 'Decentral Eyes',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/deyes-ascended-collection-coldie',
    contract: '0x4118de6b2007403f2570c3C8B86A8427244E9BA5',
    salesBot: true,
    source: 'sheet:editions',
  },
  {
    id: 'get-weird',
    thumbSrc: 'https://i2.seadn.io/ethereum/0xd78afb925a21f87fa0e35abae2aead3f70ced96b/798aef8914be8e7b3e66779718e29b2b.mp4?frame-time=1&w=500',
    title: 'Get Weird',
    date: '2022-08-22',
    kind: 'edition',
    supply: 19,
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/get-weird-by-coldie',
    contract: '0xD78AFb925a21f87Fa0E35AbAE2aEad3F70Ced96B',
    salesBot: true,
    source: 'sheet:editions',
  },
  {
    id: 'chronicles-2019',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0x2963ba471e265e5f51cafafca78310fe87f8e6d1/243fd770e9f075718d4411e2e65a4a/32243fd770e9f075718d4411e2e65a4a.jpeg?w=500',
    title: 'Chronicles 2019 — Into the Great Wide Open',
    date: '2022-10-19',
    kind: 'edition',
    supply: 5,
    platform: 'MakersPlace',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/makersplace?traits=[{%22traitType%22:%22Creator%22,%22values%22:[%22Coldie%22]}]',
    contract: '0x2963bA471e265e5F51cAfaFca78310FE87F8E6D1',
    salesBot: true,
    source: 'sheet:editions',
  },
  {
    id: 'market-psychology',
    title: 'Market PsycholOGy',
    date: '2022-11-10',
    kind: 'generative',
    supply: 1000,
    platform: 'ASYNC',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/market-psychology-v2',
    contract: '0x147835D1e3d84C9313E51DEFd172c55a3600F439', // "market psycholOGy by Coldie" (MKTOG)
    salesBot: true,
    notes: 'Generative release of 1,000 on ASYNC.',
    source: 'sheet:editions',
  },
  {
    id: 'alotta-money',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0x2d820afb710681580a55ca8077b57fba6dd9fd72/81c899195cca1d29ee08e523557720a0.png?w=500',
    title: 'Alotta Money',
    date: '2022-12-08',
    kind: 'edition',
    supply: 100,
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/artifex-coldie',
    contract: '0x2D820AfB710681580A55cA8077B57FBa6dD9Fd72',
    salesBot: true,
    source: 'sheet:editions',
  },
  {
    id: 'deyes-assembled',
    title: 'Deyes Assembled',
    date: '2022-12-30',
    kind: 'generative',
    kindNote: 'gen+',
    supply: 22,
    series: 'Decentral Eyes',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/deyes-assembled-collection',
    contract: '0xb4683204F6d349Faf1b4A6A480e253a7c6a6Af5d',
    salesBot: false,
    source: 'sheet:editions',
  },

  // ─────────────────────────── 2023 ───────────────────────────
  {
    id: 'talking-heads',
    title: 'Talking Heads',
    date: '2023-01-11',
    kind: 'generative',
    supply: 250,
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/talking-heads-coldie',
    contract: '0x2b11103909347DB2DE07889777909d51E5B5259c',
    salesBot: true,
    source: 'sheet:editions',
  },
  {
    id: 'uae-first-immersion',
    title: 'UAE First Immersion (Perspective Shift)',
    date: '2023-03-04',
    kind: 'edition',
    supply: 268,
    series: 'Perspective Shift',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/uae-first-immersion-airdrop-coldie',
    contract: '0x8dE7b53b343d0cDdBD10835BbbAB3F0fcdC382A4',
    salesBot: true,
    notes: 'Airdrop.',
    source: 'sheet:editions',
  },
  {
    id: 'perspective-shift-burn',
    thumbSrc: 'https://i2.seadn.io/ethereum/0x3d6807e8549f880cd42055bc6343837040036955/263cb64eb40f7f48c190010385a4ece9.mp4?frame-time=1&w=500',
    title: 'Perspective Shift — Burn',
    date: '2023-03-24',
    kind: 'edition',
    kindNote: 'ed+',
    supply: 8,
    series: 'Perspective Shift',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/perspective-shift-by-coldie-burn',
    contract: '0x3D6807e8549f880Cd42055bC6343837040036955',
    salesBot: true,
    source: 'sheet:editions',
  },
  {
    id: 'async-energy-systems',
    title: 'Energy System',
    date: '2023-04-25',
    kind: 'edition',
    supply: 355,
    series: 'Async',
    platform: 'ASYNC',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/energy-system',
    contract: ENERGY_SYSTEM,
    thumbSrc: 'https://i2c.seadn.io/ethereum/0x4b152608c9f53ee95936e403879294525b0f5382/ff5702ef53d710afc9e5a9af8e0cedde.png',
    notes: 'Expansion pack for Async’s Forever Supper collaboration.',
    variants: [
      { title: 'Fear is Your Illusion', kind: 'edition', supply: 71, tokenId: '1', url: osItem(ENERGY_SYSTEM, '1') },
      { title: 'The Portal', kind: 'edition', supply: 71, tokenId: '2', url: osItem(ENERGY_SYSTEM, '2') },
      { title: "Metatron's Sun", kind: 'edition', supply: 71, tokenId: '3', url: osItem(ENERGY_SYSTEM, '3') },
      { title: "Metatron's Moon", kind: 'edition', supply: 71, tokenId: '4', url: osItem(ENERGY_SYSTEM, '4') },
      { title: 'Reality Matrix', kind: 'edition', supply: 71, tokenId: '5', url: osItem(ENERGY_SYSTEM, '5') },
    ],
    source: 'sheet:editions',
  },
  {
    id: 'async-energetic-body',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0x355fabfef6389e42774e39b291a7a8e37d4f8b84/236bd2a02cd9fcbf981d86a728d314ab.png?w=1000',
    title: 'Energetic Body',
    date: '2023-05-25',
    kind: 'edition',
    supply: null,
    series: 'Async',
    platform: 'ASYNC',
    chain: 'Ethereum',
    url: 'https://opensea.io/item/ethereum/0x355fabfef6389e42774e39b291a7a8e37d4f8b84/1',
    contract: '0x355fabfef6389e42774e39b291a7a8e37d4f8b84',
    tokenId: '1',
    source: 'sheet:editions',
  },
  {
    id: 'click-create-flow-state',
    title: 'Click Create — Flow State',
    date: '2023-06-01',
    kind: 'edition',
    supply: null,
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/item/ethereum/0x300e7a5fb0ab08af367d5fb3915930791bb08c2b/16',
    contract: '0x300e7A5fb0Ab08aF367d5fb3915930791bB08C2B',
    tokenId: '16',
    source: 'sheet:editions',
  },
  {
    id: 'deyes-legends',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0x76250e9269e3df7d5bdc6af42582a1b54bf5d24e/bb2ddb42d9d0971aa7a46a27718ecb75.jpeg?w=500',
    title: 'DEyes Legends',
    date: '2023-08-08',
    kind: 'generative',
    supply: 114,
    series: 'Decentral Eyes',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/coldie',
    contract: '0x76250e9269e3Df7D5Bdc6Af42582a1b54BF5d24E',
    salesBot: true,
    source: 'sheet:editions',
  },
  {
    id: 'noble-gallery-degen-santa',
    title: 'Degen Santa — Noble Gallery',
    date: '2023-12-06',
    kind: 'edition',
    supply: null,
    platform: 'Noble Gallery',
    chain: 'Ethereum',
    url: 'https://opensea.io/item/ethereum/0x7e9b9ba1a3b4873279857056279cef6a4fcdf340/107',
    contract: '0x7e9b9bA1A3B4873279857056279Cef6A4FCDf340',
    tokenId: '107',
    source: 'sheet:editions',
  },

  {
    id: 'pascal-gauthier-coindesk',
    title: 'Pascal Gauthier - Decentral Eyes',
    date: '2023-12-03',
    kind: '1/1',
    supply: 1,
    series: 'Decentral Eyes',
    platform: 'Transient Labs',
    chain: 'Ethereum',
    url: osItem(PASCAL, '1'),
    links: [{ label: 'Transient', url: 'https://www.transient.xyz/nfts/ethereum/0xf2168a4be7696a0266653d3a9610b2140e31c884/1' }],
    contract: PASCAL,
    tokenId: '1',
    badge: 'CoinDesk Most Influential 2023',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0xf2168a4be7696a0266653d3a9610b2140e31c884/c10326e8607eab5d3cfff6a856d84a2e.jpeg',
    source: 'sheet:1of1s',
  },

  // ─────────────────────────── 2024 ───────────────────────────
  {
    id: 'decentral-eyes-editions',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0xac910384afe354bdb85f008896960936e5d30790/25c019eca75aa912373850077bef3d1d.jpeg?w=1000',
    title: 'Coldie Decentral Eyes Editions',
    date: '2024-07-03',
    kind: 'edition',
    supply: null,
    series: 'Decentral Eyes',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/coldie-decentral-eyes-editions',
    source: 'sheet:editions',
  },
  {
    id: 'fake-rares-filthy-pepe',
    title: 'Filthy Pepe — Fake Rares',
    date: '2024-10-25',
    kind: 'edition',
    supply: null,
    series: 'Fake Rares',
    platform: 'Fake Rares',
    chain: 'Ethereum',
    url: 'https://opensea.io/item/ethereum/0xe70659b717112ac4e14284d0db2f5d5703df8e43/348',
    contract: '0xe70659b717112AC4e14284d0db2f5d5703dF8e43',
    tokenId: '348',
    source: 'sheet:editions',
  },

  // ─────────────────────────── 2025 ───────────────────────────
  {
    id: 'sin-king-ship',
    title: 'SIN.KING.SHIP',
    date: '2025-03-14',
    kind: 'edition',
    supply: 305,
    series: 'Filthy Fiat',
    platform: 'The Memes by 6529',
    chain: 'Ethereum',
    url: osItem('0x33fd426905f149f8376e227d0c9d3340aad17af1', '342'),
    links: [{ label: '6529', url: 'https://seize.io/the-memes/342' }],
    contract: '0x33fd426905f149f8376e227d0c9d3340aad17af1',
    tokenId: '342',
    badge: 'The Memes by 6529 · Card #342',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0x33fd426905f149f8376e227d0c9d3340aad17af1/f4da51eb23cd4398910e86e8f9a1d7/5df4da51eb23cd4398910e86e8f9a1d7.gif',
    notes: 'An early release of the Filthy Fiat series.',
    source: 'opensea',
  },
  {
    id: 'tech-epochalypse',
    title: 'Tech Epochalypse - Decentral Eyes',
    date: '2025-11-21',
    kind: '1/1',
    supply: 27,
    series: 'Decentral Eyes',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/tech-epochalypse-decentral-eyes',
    contract: TECH_EPOCHALYPSE,
    badge: 'Kinetic 3D portraits of five tech overlords',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0xea030bb4da83c7b470f6d6109880116459509553/c20a807f4f699b260bf43be7082075/77c20a807f4f699b260bf43be7082075.png',
    notes: 'Collection launched Nov 21, 2025; individual pieces minted Mar–Aug 2026.',
    variants: [
      { title: 'Jensen Huang #1', kind: '1/1', supply: 1, date: '2026-03-30', tokenId: '1', url: osItem(TECH_EPOCHALYPSE, '1') },
      { title: 'Jeff Bezos #1', kind: '1/1', supply: 1, date: '2026-03-30', tokenId: '2', url: osItem(TECH_EPOCHALYPSE, '2') },
      { title: 'Sam Altman #1', kind: '1/1', supply: 1, date: '2026-03-30', tokenId: '3', url: osItem(TECH_EPOCHALYPSE, '3') },
      { title: 'Mark Zuckerberg #1', kind: '1/1', supply: 1, date: '2026-03-30', tokenId: '4', url: osItem(TECH_EPOCHALYPSE, '4') },
      { title: 'Elon Musk #1', kind: '1/1', supply: 1, date: '2026-03-30', tokenId: '5', url: osItem(TECH_EPOCHALYPSE, '5') },
      { title: 'Jensen Huang #2', kind: '1/1', supply: 1, date: '2026-04-07', tokenId: '6', url: osItem(TECH_EPOCHALYPSE, '6') },
      { title: 'Jeff Bezos #2', kind: '1/1', supply: 1, date: '2026-04-07', tokenId: '7', url: osItem(TECH_EPOCHALYPSE, '7') },
      { title: 'Sam Altman #2', kind: '1/1', supply: 1, date: '2026-04-07', tokenId: '8', url: osItem(TECH_EPOCHALYPSE, '8') },
      { title: 'Mark Zuckerberg #2', kind: '1/1', supply: 1, date: '2026-04-07', tokenId: '9', url: osItem(TECH_EPOCHALYPSE, '9') },
      { title: 'Elon Musk #2', kind: '1/1', supply: 1, date: '2026-04-07', tokenId: '10', url: osItem(TECH_EPOCHALYPSE, '10') },
      { title: 'Elon Musk #3', kind: '1/1', supply: 1, date: '2026-05-19', tokenId: '11', url: osItem(TECH_EPOCHALYPSE, '11') },
      { title: 'Mark Zuckerberg #3', kind: '1/1', supply: 1, date: '2026-05-19', tokenId: '12', url: osItem(TECH_EPOCHALYPSE, '12') },
      { title: 'Sam Altman #3', kind: '1/1', supply: 1, date: '2026-05-19', tokenId: '13', url: osItem(TECH_EPOCHALYPSE, '13') },
      { title: 'Jeff Bezos #3', kind: '1/1', supply: 1, date: '2026-05-19', tokenId: '14', url: osItem(TECH_EPOCHALYPSE, '14') },
      { title: 'Jensen Huang #3', kind: '1/1', supply: 1, date: '2026-05-19', tokenId: '15', url: osItem(TECH_EPOCHALYPSE, '15') },
      { title: 'Elon Musk #4', kind: '1/1', supply: 1, date: '2026-05-19', tokenId: '16', url: osItem(TECH_EPOCHALYPSE, '16') },
      { title: 'Mark Zuckerberg #4', kind: '1/1', supply: 1, date: '2026-05-19', tokenId: '17', url: osItem(TECH_EPOCHALYPSE, '17') },
      { title: 'Elon Musk #5', kind: '1/1', supply: 1, date: '2026-05-19', tokenId: '18', url: osItem(TECH_EPOCHALYPSE, '18') },
      { title: 'Elon Musk #6', kind: '1/1', supply: 1, date: '2026-05-19', tokenId: '19', url: osItem(TECH_EPOCHALYPSE, '19') },
      { title: 'Mark Zuckerberg #6', kind: '1/1', supply: 1, date: '2026-05-19', tokenId: '20', url: osItem(TECH_EPOCHALYPSE, '20') },
      { title: 'Sam Altman #6', kind: '1/1', supply: 1, date: '2026-05-19', tokenId: '21', url: osItem(TECH_EPOCHALYPSE, '21') },
      { title: 'Jeff Bezos #6', kind: '1/1', supply: 1, date: '2026-05-19', tokenId: '22', url: osItem(TECH_EPOCHALYPSE, '22') },
      { title: 'Jensen Huang #6', kind: '1/1', supply: 1, date: '2026-05-19', tokenId: '23', url: osItem(TECH_EPOCHALYPSE, '23') },
      { title: 'Jensen Huang #5', kind: '1/1', supply: 1, date: '2026-08-18', tokenId: '24', url: osItem(TECH_EPOCHALYPSE, '24') },
      { title: 'Mark Zuckerberg #5', kind: '1/1', supply: 1, date: '2026-08-18', tokenId: '25', url: osItem(TECH_EPOCHALYPSE, '25') },
      { title: 'Jeff Bezos #5', kind: '1/1', supply: 1, date: '2026-08-18', tokenId: '26', url: osItem(TECH_EPOCHALYPSE, '26') },
      { title: 'Sam Altman #5', kind: '1/1', supply: 1, date: '2026-08-18', tokenId: '27', url: osItem(TECH_EPOCHALYPSE, '27') },
    ],
    source: 'opensea',
  },

  // ─────────────────────────── 2026 ───────────────────────────
  {
    id: 'tech-epochalypse-moments',
    title: 'Tech Epochalypse Moments - Decentral Eyes',
    date: '2026-02-17',
    kind: 'edition',
    kindNote: '1/1/250',
    supply: 250,
    series: 'Decentral Eyes',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/tech-epochalypse-moments-decentral-eyes',
    contract: '0x0d1edb24225cd549b70a94ccf10a3754513c8c49',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0x0d1edb24225cd549b70a94ccf10a3754513c8c49/a9fed6382a428fa2efe1023a7d3341/54a9fed6382a428fa2efe1023a7d3341.jpeg',
    notes: '250 unique still-frame moments from the Tech Epochalypse kinetic portraits — 50 each of Musk, Zuckerberg, Altman, Bezos and Huang.',
    source: 'opensea',
  },
  {
    id: 'not-one-satoshi',
    title: 'Michael Saylor - Not One Satoshi - Decentral Eyes',
    date: '2026-08-21',
    kind: 'edition',
    supply: 211,
    series: 'Decentral Eyes',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/collection/michael-salyor-not-one-satoshi-decentral-eyes',
    contract: '0x383788c0a5a6f4cc8f1bcd3993742db6b3332850',
    thumbSrc: 'https://raw2.seadn.io/ethereum/0x383788c0a5a6f4cc8f1bcd3993742db6b3332850/06b36a7c553928618caee0c44122f7/3806b36a7c553928618caee0c44122f7.gif',
    source: 'opensea',
  },
  {
    id: 'en-marcha',
    title: 'En Marcha',
    date: '2026-09-11',
    kind: '1/1',
    supply: 1,
    series: 'Collaborations',
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: osItem('0x034220c41322ff03db1c643da2ce991440a29bdd', '1'),
    contract: '0x034220c41322ff03db1c643da2ce991440a29bdd',
    tokenId: '1',
    badge: 'Digital Encounters · 8NAP × Superchief',
    thumbSrc: 'https://i2c.seadn.io/ethereum/0x034220c41322ff03db1c643da2ce991440a29bdd/5b303187a5090927727a54898ffefd/7b5b303187a5090927727a54898ffefd.jpeg',
    source: 'opensea',
  },

  // ─────────────────────── Date to confirm ───────────────────────
  {
    id: 'nft-magazine',
    hidden: true, // undated; hidden at Coldie's request until the details are in
    title: 'NFT Magazine',
    date: null,
    kind: 'edition',
    supply: 700,
    platform: 'OpenSea',
    chain: 'Ethereum',
    url: 'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/49597200392958280165177755798765298064312831948909620000388784437249020265148',
    contract: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
    salesBot: true,
    confirm: true,
    source: 'sheet:editions',
  },
];

// ── SuperRare 1/1s ────────────────────────────────────────────

const BONHAMS_POW =
  'https://www.bonhams.com/auction/27285/lot/1/coldie-b-1982-proof-of-work-genesis-conceived-2018-minted-june-16-2021/';

/** Site-only context for specific SuperRare tokens, keyed `contract:tokenId` (lowercase). */
const SR_EXTRAS: Record<string, Partial<Release>> = {
  '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0:25441': {
    slug: 'proof-of-work-genesis',
    badge: 'Bonhams',
    links: [{ label: 'Bonhams lot', url: BONHAMS_POW }],
    notes: 'Conceived 2018, minted June 16, 2021.',
    related: { id: 'rare-proof-of-work-2018', label: 'The burned 2018 original on R.A.R.E. Art Labs' },
  },
  '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0:9343': {
    series: 'Collaborations',
    slug: 'uap-unidentified-art-phenomenon',
    badge: "with Hackatao · Sotheby's",
  },
  '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0:12380': {
    related: { id: 'rare-lost-vitalik-2018', label: 'The burned 2018 original on R.A.R.E. Art Labs' },
  },
  '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0:30778': {
    badge: 'Official collaboration with Snoop Dogg',
    notes: 'Artwork and lyrics by Coldie; music performed and recorded by Snoop Dogg.',
  },
  '0x41a322b28d0ff354040e2cbc676f0320d8c8850d:1007': {
    slug: '3d-light-painting-03',
    badge: "Sotheby's",
  },
};

/** Shown as the contract link's tooltip. */
export const CONTRACT_LABEL: Record<string, string> = {
  '0x41a322b28d0ff354040e2cbc676f0320d8c8850d': 'SuperRare original (v1) contract',
  '0x892a1e9856ae529b94aaa683fc558ee107d35258': "Coldie's own SuperRare contract",
  '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0': 'SuperRare v2 shared contract',
};

/** Series from the title's naming pattern, most specific first. */
const SR_SERIES: [RegExp, string][] = [
  [/decentral eyes|deyes/i, 'Decentral Eyes'],
  [/proof of (work|stake|tokens)/i, 'Proof of Work'],
  [/gandinsky/i, 'GANdinsky'],
  [/choose your own adventure/i, 'Choose Your Own Adventure'],
  [/light painting/i, '3D Light Painting'],
  [/mind control series/i, 'Mind Control'],
  [/human nature series/i, 'Human Nature'],
  [/convergence series/i, 'Convergence'],
  [/nft nyc 2020/i, 'NFT NYC 2020'],
  [/eth sf 2018/i, 'ETHSanFrancisco 2018'],
  [/eth singapore/i, 'ETHSingapore 2018'],
  [/the day we've all been waiting for/i, "The Day We've All Been Waiting For"],
];

/** SuperRare tokens left out of the timeline, keyed `contract:tokenId` (lowercase). */
const SR_EXCLUDE = new Set([
  '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0:7599', // Found Coldie's Respect
  '0x892a1e9856ae529b94aaa683fc558ee107d35258:1', // Coldie Logo
]);

const srReleases: Release[] = superrare.tokens
  .filter((t) => !SR_EXCLUDE.has(`${t.contract.toLowerCase()}:${t.tokenId}`))
  .map((t) => {
  const key = `${t.contract.toLowerCase()}:${t.tokenId}`;
  return {
    id: `sr-${t.contract.slice(2, 8).toLowerCase()}-${t.tokenId}`,
    title: t.title,
    date: t.date,
    kind: '1/1',
    supply: 1,
    series: SR_SERIES.find(([re]) => re.test(t.title))?.[1],
    platform: 'SuperRare',
    chain: 'Ethereum',
    url: `https://superrare.com/artwork/eth/${t.contract.toLowerCase()}/${t.tokenId}`,
    contract: t.contract,
    tokenId: t.tokenId,
    source: 'superrare',
    ...SR_EXTRAS[key],
  } satisfies Release;
});
allReleases.push(...srReleases);

/** Every release shown on the site (entries flagged `hidden` are left out). */
export const releases: Release[] = allReleases.filter((r) => !r.hidden);

// ── Derived helpers ───────────────────────────────────────────

export const releaseYear = (r: Pick<Release, 'date'>): number | null =>
  r.date ? Number(r.date.slice(0, 4)) : null;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** 'Dec 17, 2021' · 'Dec 2021' · '2021' · 'Date tbc' */
export function formatReleaseDate(date: string | null | undefined): string {
  if (!date) return 'Date tbc';
  const [y, m, d] = date.split('-');
  if (!m) return y;
  const mon = MONTHS[Number(m) - 1];
  return d ? `${mon} ${Number(d)}, ${y}` : `${mon} ${y}`;
}

export const KIND_LABEL: Record<ReleaseKind, string> = {
  '1/1': '1/1',
  edition: 'Edition',
  generative: 'Generative',
  wearable: 'Wearable',
  programmable: 'Programmable',
  tbc: 'Type tbc',
};

/** chronological, oldest first; partial dates sort to the start of their period, undated last */
export const sortedReleases = releases
  .slice()
  .sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999'));

const uniq = (xs: (string | undefined)[]) => [...new Set(xs.filter(Boolean) as string[])].sort();
export const releasePlatforms = uniq(releases.map((r) => r.platform));
export const releaseChains = uniq(releases.map((r) => r.chain));
export const releaseSeries = uniq(releases.map((r) => r.series));
export const releaseKinds = (Object.keys(KIND_LABEL) as ReleaseKind[]).filter((k) =>
  releases.some((r) => r.kind === k)
);
