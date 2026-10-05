import type { PillarKey } from './site';

export type DepthLayer = {
  src: string;
  /** 0 = far (moves least), 1 = near (moves most). Drives parallax & anaglyph offset. */
  depth: number;
  alt: string;
};

export type Provenance = {
  label: string;
  href?: string;
  /** Full descriptive accessible label, e.g. "Warren Buffett – Filthy Fiat at Christie's". */
  ariaLabel?: string;
  /** True when href is a placeholder awaiting the real direct URL. */
  todo?: boolean;
};

export type OnChain = {
  minted: string; // human date, e.g. "May 7, 2018"
  platform: string; // e.g. "R.A.R.E. Art Labs"
  chain: string; // e.g. "Ethereum"
  url?: string; // [TO ADD] on-chain record / marketplace
};

export type Interaction = 'parallax' | 'anaglyph' | 'drag' | 'collage' | 'none';

export type Work = {
  slug: string;
  title: string;
  year: number | string;
  pillar: PillarKey;
  /** schema.org artMedium */
  medium: string;
  /** schema.org artform */
  artform: string;
  dimensions?: string;
  edition?: string;
  /** Answer-first caption: first sentence must stand alone as a citable fact. */
  caption: string;
  provenance?: Provenance[];
  onchain?: OnChain;
  /** Layered art for parallax/anaglyph. far → near order. */
  layers?: DepthLayer[];
  /** A pre-made red/cyan anaglyph image (already 3D). Shown static with a caption. */
  anaglyphImage?: string;
  anaglyphAlt?: string;
  /** Artist audio — the story behind the piece. `src` empty = player shows "coming soon". */
  audio?: { src?: string; title?: string; caption?: string };
  /** Video artwork (mp4). Shown as the primary media on the work page. */
  video?: { src: string; poster?: string };
  /** Vertical (9:16) gallery/usage clip. `src` empty → "coming soon" placeholder. */
  verticalVideo?: { src?: string; poster?: string; caption?: string };
  /** Image set shown as a billboard slider on the work page (takes precedence over the interaction). */
  gallery?: { src: string; alt: string }[];
  /** Single flat image (galleries, non-layered works). */
  image?: string;
  imageAlt?: string;
  /** Placeholder content: the page still renders, but is noindexed and left out of the sitemap. */
  draft?: boolean;
  /** Shown as the pillar's large featured piece. */
  featured?: boolean;
  /** Shown in the pillar's small curated set on the home page. */
  curated?: boolean;
  interaction?: Interaction;
  /** Physical works are inquire-only; editions link to marketplace. */
  ownership: 'physical' | 'edition' | 'both';
  marketplaceUrl?: string;
  /** Membership in a named project/series (e.g. Filthy Fiat). */
  series?: 'filthy-fiat';

  // ── Collection hub (/collection) ──
  /** Which titled row this work appears under on the Collection hub. */
  collectionRow?: 'early' | 'landmark' | 'decentral-eyes' | 'filthy-fiat' | 'collaboration' | 'landscape';
  /** Short provenance badge, e.g. "Sotheby's", "Bonhams", "Historic first · 2018". */
  badge?: string;
  /** Primary action — Coldie's own artist contract on Transient Labs. */
  collectUrl?: string;
  /** Secondary action — a marketplace listing. */
  marketplace?: { name: string; url: string };
};

export const works: Work[] = [
  // ───────────────────────── Pioneer / Hero ─────────────────────────
  {
    slug: 'the-day-weve-all-been-waiting-for',
    title: "The Day We've All Been Waiting For",
    year: 2018,
    pillar: 'stereoscopic',
    medium: 'Anaglyph stereoscopic 3D',
    artform: 'Stereoscopic landscape',
    caption:
      'The Day We’ve All Been Waiting For (2018) is the first stereoscopic artwork ever minted on a blockchain. An astronaut ascends toward the moon beneath a billboard reading HODL — hold on for dear life — above photographs the artist took of Los Angeles and San Francisco, the two cities that shaped his twenties and thirties. A portrait of belief in a future not yet arrived.',
    provenance: [
      { label: 'Minted May 7, 2018 · R.A.R.E. Art Labs · Ethereum' },
      { label: 'First stereoscopic artwork recorded on a blockchain' },
      { label: 'Edition of 2 · one held by Coinbase, on display in its lobby 2018–2020' },
    ],
    onchain: {
      minted: 'May 7, 2018',
      platform: 'R.A.R.E. Art Labs',
      chain: 'Ethereum',
      // TODO: insert direct on-chain record / marketplace URL for the 2018 work
      url: '',
    },
    image: '/works/the-day/the-day.jpg',
    anaglyphImage: '/works/the-day/the-day.jpg',
    anaglyphAlt:
      "The Day We've All Been Waiting For — a red/cyan anaglyph of an astronaut ascending toward the moon beneath a HODL billboard over a city skyline. View through red/blue 3D glasses.",
    layers: [
      { src: '/works/the-day/far.svg', depth: 0.0, alt: 'Moon and a field of stars' },
      { src: '/works/the-day/mid.svg', depth: 0.45, alt: 'City skyline at night' },
      {
        src: '/works/the-day/near.svg',
        depth: 1.0,
        alt: 'An astronaut ascending beside a billboard reading HODL',
      },
    ],
    imageAlt:
      'The Day We’ve All Been Waiting For — an astronaut ascends toward the moon beneath a HODL billboard, over a night skyline.',
    interaction: 'anaglyph',
    featured: false,
    ownership: 'edition',
    edition: 'Edition of 2',
    collectionRow: 'landmark',
    badge: 'Historic first · 2018',
    // TODO: insert Coldie's Transient Labs (artist contract) collect URL for this work
    collectUrl: '',
    // TODO: insert SuperRare/OpenSea listing URL for this work
    marketplace: { name: 'SuperRare', url: '' },
  },

  // ───────────────────────── Stereoscopic ─────────────────────────
  {
    slug: '3d-light-painting-03',
    title: '3D Light Painting 03',
    year: 2018,
    pillar: 'stereoscopic',
    medium: 'Stereoscopic 3D, on-chain edition',
    artform: 'Stereoscopic work',
    caption:
      '3D Light Painting 03 was included by Sotheby’s in Inside the World of MaxStealth, the first single-owner NFT auction held live in its salesroom, alongside Beeple, XCOPY, and Pak (September 14, 2022).',
    provenance: [
      {
        label: "Sotheby's — Inside the World of MaxStealth (Sept 14, 2022)",
        href: 'https://www.sothebys.com/en/buy/auction/2022/inside-the-world-of-maxstealth-a-timeless-collection/3d-light-painting-03',
        ariaLabel: "3D Light Painting 03 at Sotheby's, Inside the World of MaxStealth",
      },
    ],
    image: '/works/3d-light-painting-03/hero.jpg',
    imageAlt: '3D Light Painting 03 — stereoscopic 3D light painting by Coldie with Bucket T (2018)',
    interaction: 'none',
    curated: true,
    ownership: 'edition',
    edition: '1/1',
    collectionRow: 'landmark',
    badge: "Sotheby's",
    collectUrl: '', // TODO: Transient Labs collect URL
    marketplace: { name: 'SuperRare', url: '' }, // TODO: listing URL
  },
  {
    slug: 'uap-unidentified-art-phenomenon',
    title: 'UAP — Unidentified Art Phenomenon',
    year: 2020,
    pillar: 'stereoscopic',
    medium: 'Stereoscopic 3D, on-chain edition',
    artform: 'Collaborative stereoscopic work',
    caption:
      'UAP — Unidentified Art Phenomenon is a 3D collaboration between Coldie and Hackatao, included in Sotheby’s Inside the World of MaxStealth (2022).',
    provenance: [
      {
        label: "Sotheby's — Inside the World of MaxStealth (2022)",
        // TODO: insert direct Sotheby's lot URL for UAP – Unidentified Art Phenomenon
        href: 'https://www.sothebys.com/en/buy/auction/2022/inside-the-world-of-maxstealth-a-timeless-collection',
        ariaLabel: "UAP – Unidentified Art Phenomenon at Sotheby's, Inside the World of MaxStealth",
        todo: true,
      },
      { label: 'With Hackatao' },
    ],
    image: '/works/uap-unidentified-art-phenomenon/hero.jpg',
    imageAlt: 'UAP — Unidentified Art Phenomenon, 3D collaboration by Coldie and Hackatao (2020)',
    interaction: 'none',
    curated: true,
    ownership: 'edition',
    edition: '1/1',
    collectionRow: 'collaboration',
    badge: "Sotheby's · with Hackatao",
    collectUrl: '', // TODO: Transient Labs collect URL
    marketplace: { name: 'SuperRare', url: '' }, // TODO: listing URL
  },
  {
    slug: 'proof-of-work-genesis',
    title: 'Proof of Work — Genesis',
    year: 2021,
    pillar: 'stereoscopic',
    medium: 'Stereoscopic 3D, on-chain edition',
    artform: 'Stereoscopic work',
    caption:
      'Proof of Work — Genesis was featured by Bonhams in its SuperRare "CryptOGs" sale, honoring the early artists of the space.',
    provenance: [
      {
        label: 'Bonhams — Bonhams & SuperRare: CryptOGs',
        href: 'https://www.bonhams.com/auction/27285/lot/1/coldie-b-1982-proof-of-work-genesis-conceived-2018-minted-june-16-2021/',
        ariaLabel: 'Proof of Work – Genesis at Bonhams, Bonhams & SuperRare: CryptOGs',
      },
    ],
    image: '/works/proof-of-work-genesis/hero.jpg',
    imageAlt: 'Proof of Work — Genesis by Coldie: a miner panning for gold, an allegory of crypto mining (2021)',
    interaction: 'none',
    curated: true,
    ownership: 'edition',
    edition: '1/1',
    collectionRow: 'landmark',
    badge: 'Bonhams',
    collectUrl: '', // TODO: Transient Labs collect URL
    marketplace: { name: 'SuperRare', url: '' }, // TODO: listing URL
  },

  // ───────────────────────── Kinetic ─────────────────────────
  {
    slug: 'warren-buffett-filthy-fiat',
    title: 'Warren Buffett — Filthy Fiat',
    year: 2024,
    pillar: 'kinetic',
    medium:
      'Double-sided magnetic moveable portrait pieces, magnetic 3D depth spacers, and mixed media on Dibond',
    artform: 'Kinetic magnetic portrait sculpture',
    dimensions: '33 × 21 × 6¼ in. (83.8 × 53.3 × 15.9 cm)',
    edition: 'Unique, paired with a recursive digital edition inscribed on Bitcoin',
    caption:
      'Warren Buffett — Filthy Fiat (2024) was the debut of Coldie’s portraiture as physical 3D sculpture, and the first of his kinetic magnetic portraits to sell at Christie’s. Its features are built from real US dollar bills the artist buried underground for two years, unearthed mottled with mold — fragile, debased currency reassembled into the face of one of capitalism’s most famous investors. The collector is invited to rearrange the magnetic pieces; every change is recorded on-chain, so the work keeps living after it is sold.',
    provenance: [
      {
        label: "Christie's — First Open | Post-War and Contemporary Art (2024)",
        href: 'https://onlineonly.christies.com.cn/s/first-open-post-war-contemporary-art/coldie-b-1982-286/245196',
        ariaLabel: "Warren Buffett – Filthy Fiat at Christie's, First Open | Post-War and Contemporary Art",
      },
      {
        label: 'Part of the Filthy Fiat project',
        href: 'https://filthyfiat.money',
        ariaLabel: 'The Filthy Fiat project',
      },
    ],
    image: '/works/warren-buffett/01.jpg',
    imageAlt: "Warren Buffett — Filthy Fiat (2024), a portrait built from mold-ruined US dollar bills, sold at Christie's",
    interaction: 'drag',
    featured: true,
    ownership: 'physical',
    series: 'filthy-fiat',
    // TODO: add the vertical gallery clip (someone rearranging the magnetic portrait)
    verticalVideo: { src: '', caption: 'Rearranging the magnetic portrait — in the gallery.' },
    gallery: [1, 2, 3, 4].map((n) => ({
      src: `/works/warren-buffett/${String(n).padStart(2, '0')}.jpg`,
      alt: `Warren Buffett – Filthy Fiat (2024) by Coldie — view ${n}, sold at Christie's`,
    })),
  },
  {
    slug: 'jack-dorsey-magnetic-portrait',
    title: 'Jack Dorsey — Magnetic Portrait',
    year: 2026,
    pillar: 'kinetic',
    medium: 'Magnetic, rearrangeable portrait pieces; lenticular/stereoscopic 3D',
    artform: 'Kinetic magnetic portrait',
    dimensions: '~61 × 91 × 13 cm',
    caption:
      'A magnetic, rearrangeable portrait in lenticular/stereoscopic 3D — the collector reconfigures the composition. On view and available at Eterno Gallery, Lisbon.',
    provenance: [
      {
        label: 'Eterno Gallery, Lisbon',
        href: 'https://eternogallery.com/products/jack-dorsey-magnetic-portrait',
        ariaLabel: 'Jack Dorsey Magnetic Portrait at Eterno Gallery, Lisbon',
      },
    ],
    image: '/works/eterno/jack-dorsey.jpg',
    imageAlt: 'Coldie — Jack Dorsey magnetic rearrangeable portrait at Eterno Gallery',
    interaction: 'drag',
    ownership: 'physical',
  },
  {
    slug: '32-touchscreen-interactive',
    title: '32" Touchscreen Interactive',
    year: 2026,
    pillar: 'kinetic',
    medium: 'Interactive touchscreen artwork — screen with integrated computer',
    artform: 'Interactive installation',
    caption:
      'Touch the art: an interactive touchscreen piece — one screen with an integrated computer and the work within — that invites the visitor to engage the work directly. On view at Eterno Gallery, Lisbon.',
    provenance: [
      {
        label: 'Eterno Gallery, Lisbon',
        href: 'https://eternogallery.com/products/32-touchscreen-interactive-piece',
        ariaLabel: '32-inch Touchscreen Interactive Piece at Eterno Gallery, Lisbon',
      },
    ],
    image: '/works/eterno/touchscreen.jpg',
    imageAlt: 'Coldie — 32-inch touchscreen interactive artwork at Eterno Gallery',
    interaction: 'none',
    ownership: 'physical',
    // TODO: add the vertical clip of a visitor using the touchscreen at Eterno Gallery
    verticalVideo: { src: '', caption: 'A visitor using the touchscreen at Eterno Gallery, Lisbon.' },
  },

  // ───────────────────── Landscapes (stereoscopic 3D, on-chain) ─────────────────────
  {
    slug: 'trust-your-intuition',
    title: 'Trust Your Intuition', // [CONFIRM] year & details
    year: 2021,
    pillar: 'stereoscopic',
    medium: 'Stereoscopic 3D landscape, on-chain edition',
    artform: 'Stereoscopic landscape',
    caption:
      'Trust Your Intuition is a stereoscopic 3D landscape — depth captured in a flat frame, released on-chain.',
    image: '/works/trust-your-intuition/hero.jpg',
    imageAlt: 'Trust Your Intuition — stereoscopic 3D artwork by Coldie (2021)',
    interaction: 'none',
    ownership: 'edition',
    edition: 'Edition', // [CONFIRM]
    collectionRow: 'landscape',
    collectUrl: '', // TODO: Transient Labs collect URL
    marketplace: { name: 'OpenSea', url: '' }, // TODO: listing URL
    video: { src: '/works/trust-your-intuition/trust-your-intuition.mp4' },
    audio: {
      // TODO: add the audio clip URL (Coldie narrating the story behind the piece)
      src: '',
      title: 'The story behind Trust Your Intuition',
      caption: 'Coldie tells the story behind the piece.',
    },
  },
  {
    slug: 'choose-your-own-adventure',
    title: 'Choose Your Own Adventure',
    year: 2020,
    pillar: 'stereoscopic',
    medium: 'Stereoscopic 3D landscape, on-chain edition',
    artform: 'Stereoscopic landscape',
    caption:
      'Choose Your Own Adventure is a stereoscopic 3D landscape that holds real depth — a way of seeing 170 years old, released on-chain.',
    image: '/works/choose-your-own-adventure/hero.jpg',
    imageAlt: 'Choose Your Own Adventure — programmable stereoscopic 3D landscape by Coldie on ASYNC (2020)',
    interaction: 'none',
    ownership: 'edition',
    edition: 'Edition', // [CONFIRM]
    collectionRow: 'landscape',
    collectUrl: '', // TODO: Transient Labs collect URL
    marketplace: { name: 'OpenSea', url: '' }, // TODO: listing URL
  },

  // ───────── Foundations — early anaglyph 3D on canvas (2010–2018), physical ─────────
  // TODO: replace titles, years, and images with the real early works (Coldie to supply).
  {
    slug: 'foundations-anaglyph-canvas-2010',
    draft: true, // placeholder — hidden from search until the real title and image are in
    title: 'Anaglyph 3D Landscape on Canvas', // [TO ADD] real title
    year: 2010,
    pillar: 'stereoscopic',
    medium: 'Anaglyph 3D on canvas, viewed with red/cyan 3D glasses',
    artform: 'Stereoscopic painting',
    caption:
      'An early anaglyph 3D landscape on canvas — the start of the timeline, depth built into a flat surface and seen through red/cyan 3D glasses.',
    image: '/works/placeholder/landscape.svg',
    imageAlt: 'Early anaglyph 3D landscape on canvas, 2010 (placeholder image)',
    interaction: 'none',
    ownership: 'physical',
    collectionRow: 'early',
    badge: 'Canvas · 2010',
  },
  {
    slug: 'foundations-anaglyph-canvas-2016',
    draft: true, // placeholder — hidden from search until the real title and image are in
    title: 'Anaglyph 3D Landscape on Canvas', // [TO ADD] real title
    year: 2016,
    pillar: 'stereoscopic',
    medium: 'Anaglyph 3D on canvas, viewed with red/cyan 3D glasses',
    artform: 'Stereoscopic painting',
    caption:
      'An anaglyph 3D landscape on canvas selected for a national juried exhibition in 2016 (juried by Jenny Gheith, SFMOMA) — shown with 3D glasses on display.',
    provenance: [{ label: 'National juried exhibition, 2016 — juried by Jenny Gheith, SFMOMA' }],
    image: '/works/placeholder/landscape.svg',
    imageAlt: 'Anaglyph 3D landscape on canvas, 2016 (placeholder image)',
    interaction: 'none',
    ownership: 'physical',
    collectionRow: 'early',
    badge: 'SFMOMA-juried · 2016',
  },
  {
    slug: 'foundations-anaglyph-canvas-2018',
    draft: true, // placeholder — hidden from search until the real title and image are in
    title: 'Anaglyph 3D Landscape on Canvas', // [TO ADD] real title
    year: 2018,
    pillar: 'stereoscopic',
    medium: 'Anaglyph 3D on canvas, viewed with red/cyan 3D glasses',
    artform: 'Stereoscopic painting',
    caption:
      'An anaglyph 3D landscape on canvas selected for a national juried exhibition in 2018 (juried by LA critic and curator Mat Gleason) — shown with 3D glasses on display.',
    provenance: [{ label: 'National juried exhibition, 2018 — juried by Mat Gleason' }],
    image: '/works/placeholder/landscape.svg',
    imageAlt: 'Anaglyph 3D landscape on canvas, 2018 (placeholder image)',
    interaction: 'none',
    ownership: 'physical',
    collectionRow: 'early',
    badge: 'Juried · 2018',
  },

  // ───────────────────────── Participatory ─────────────────────────
  {
    slug: 'elon-collage-machine',
    title: 'Collage Machine — Elon Musk',
    year: 2024,
    pillar: 'participatory',
    medium: 'Interactive 3D collage installation',
    artform: 'Participatory installation',
    caption:
      'A 3D collage machine at Eterno Gallery, Lisbon that invites the public to build and customize a portrait — here, of Elon Musk — completing the artwork themselves. The act of making becomes part of the work.',
    provenance: [
      {
        label: 'Eterno Gallery, Lisbon',
        // TODO: insert direct Eterno Gallery exhibition/work URL
        href: 'https://eternogallery.com/',
        ariaLabel: 'The collage machine at Eterno Gallery, Lisbon',
        todo: true,
      },
    ],
    image: '/works/placeholder/portrait.svg',
    imageAlt: 'Participatory 3D collage machine at Eterno Gallery (placeholder image)',
    interaction: 'collage',
    featured: true,
    ownership: 'physical',
  },
];

export function bySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}

export function byPillar(pillar: PillarKey): Work[] {
  return works.filter((w) => w.pillar === pillar);
}

export function featuredFor(pillar: PillarKey): Work | undefined {
  return works.find((w) => w.pillar === pillar && w.featured);
}

/** All featured works for a pillar, in data order (a pillar may feature several). */
export function featuredAllFor(pillar: PillarKey): Work[] {
  return works.filter((w) => w.pillar === pillar && w.featured);
}

export function curatedFor(pillar: PillarKey): Work[] {
  return works.filter((w) => w.pillar === pillar && w.curated);
}

export function bySeries(series: NonNullable<Work['series']>): Work[] {
  return works.filter((w) => w.series === series);
}

// ── Collection hub ──
export type CollectionRow = NonNullable<Work['collectionRow']>;

/** Titled rows for /collection, in display order. Landmarks lead. */
export const collectionRows: { key: CollectionRow; title: string; blurb: string }[] = [
  {
    key: 'early',
    title: 'Foundations — on canvas (2010–2018)',
    blurb:
      'Where the timeline begins: anaglyph 3D landscapes on canvas, seen through red/cyan glasses — years before the work moved on-chain.',
  },
  {
    key: 'landmark',
    title: 'Landmark & auction works',
    blurb: 'The pieces the major houses chose — each a verifiable first or sale.',
  },
  {
    key: 'decentral-eyes',
    title: 'Decentral Eyes',
    blurb: 'The signature blockchain-portrait series, built by recombining many images into one.',
  },
  {
    key: 'filthy-fiat',
    title: 'Filthy Fiat',
    blurb: 'Buried, mold-ruined currency reworked into art on the fragility of fiat.',
  },
  {
    key: 'collaboration',
    title: 'Collaborations',
    blurb: 'Works made with fellow artists.',
  },
  {
    key: 'landscape',
    title: 'Landscapes',
    blurb: 'Stereoscopic 3D landscapes — depth held in a flat frame.',
  },
];

export function collectionFor(row: CollectionRow): Work[] {
  return works.filter((w) => w.collectionRow === row);
}

/** Every work that appears anywhere on the Collection hub. */
export const collectionWorks = works.filter((w) => w.collectionRow);

export const heroWork = bySlug('the-day-weve-all-been-waiting-for')!;
export const filthyFiatWorks = bySeries('filthy-fiat');
