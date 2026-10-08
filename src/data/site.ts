// Global site facts. Single source of truth for SEO, JSON-LD, and copy that
// repeats across pages. Keep factual claims here exact — engines cite them.

export const site = {
  name: 'Coldie',
  domain: 'coldie3d.com',
  url: 'https://coldie3d.com',
  tagline: 'Art with depth.',
  subhead:
    'Stereoscopic and kinetic portraits: a 170-year-old way of seeing, minted on-chain for the first time.',
  // Answer-first, fact-dense — written to be lifted whole by an answer engine.
  oneLineBio:
    'Coldie is a stereoscopic-3D and kinetic artist based in Sacramento, California, who minted the first stereoscopic artwork on a blockchain on May 7, 2018.',
  location: 'Sacramento, California',
  // Official store (Shopify)
  storeUrl: 'https://coldie3d.myshopify.com',
  // Routing target for inquiries. Replace with the real inbox before launch.
  inquiryEmail: 'coldieart@gmail.com',
  galleryEmail: 'info@eternogallery.com', // [TO CONFIRM] Eterno Gallery contact
  social: {
    instagram: 'https://instagram.com/coldie3dart',
    x: 'https://x.com/Coldie',
  },
  // Artist profiles on the platforms where the work was minted and is collected.
  // Listed as sameAs so search and AI engines connect them to the same artist.
  profiles: {
    superrare: 'https://superrare.com/coldie',
    opensea: 'https://opensea.io/Coldie',
    rareArtLabs: 'https://www.rareart.io/artist/coldie',
  },
} as const;

// Provenance strip — true sales & exhibitions only (SFMOMA credit lives in the
// CV line, not here, to avoid implying an institutional relationship). §3.
//
// Each name links DIRECTLY to the specific work, lot, or exhibition — never an
// institution's homepage. The strip *shows* the short label ("Christie's"); the
// link carries the full descriptive `aria`/title for screen readers and AI search
// ("Warren Buffett – Filthy Fiat at Christie's"). External links open in a new
// tab with rel="noopener" — and deliberately NO nofollow: these are authoritative
// corroborating sources we want the site associated with.
export const provenance: {
  label: string;
  href: string;
  /** Full descriptive accessible label / title attribute. */
  aria: string;
  note?: string;
  /** Medium / art type(s) sold through this institution. */
  type?: string;
  /** True when href is a placeholder awaiting the real direct URL. */
  todo?: boolean;
  /** Image of the work shown on its provenance card (a /public path), with alt text. */
  image?: string;
  imageAlt?: string;
  /** Sale or show, and when — e.g. "First Open | Post-War and Contemporary Art · Dec 2024". */
  event?: string;
  /** One or two sentences on why it matters. Facts only — engines cite this. */
  desc?: string;
}[] = [
  {
    label: "Christie's",
    href: 'https://onlineonly.christies.com.cn/s/first-open-post-war-contemporary-art/coldie-b-1982-286/245196',
    aria: "Warren Buffett – Filthy Fiat at Christie's, First Open | Post-War and Contemporary Art",
    note: 'Warren Buffett – Filthy Fiat',
    type: '3D Kinetic Magnetic Portrait / Digital',
    image: '/works/warren-buffett/01.jpg',
    imageAlt: "Warren Buffett – Filthy Fiat (2024) by Coldie, a kinetic magnetic portrait sold at Christie's",
    event: 'First Open | Post-War and Contemporary Art · Dec 2024',
    desc: "The debut of Coldie's portraits as physical 3D sculpture, built from dollar bills he buried for two years. Offered with its 1/1 recursive Ordinal on Bitcoin.",
  },
  {
    label: "Sotheby's",
    href: 'https://www.sothebys.com/en/buy/auction/2022/inside-the-world-of-maxstealth-a-timeless-collection/3d-light-painting-03',
    aria: "3D Light Painting 03 at Sotheby's, Inside the World of MaxStealth (Sept 14, 2022)",
    note: '3D Light Painting 03',
    type: 'Digital',
    image: '/works/3d-light-painting-03/hero.jpg',
    imageAlt: "3D Light Painting 03 (2018) by Coldie with Bucket T, sold at Sotheby's",
    event: 'Inside the World of MaxStealth · Sept 14, 2022',
    desc: "Included in the first single-owner NFT auction held live in Sotheby's salesroom, alongside Beeple, XCOPY and Pak. UAP, Coldie's 3D collaboration with Hackatao, was in the same sale.",
  },
  {
    label: 'Bonhams',
    href: 'https://www.bonhams.com/auction/27285/lot/1/coldie-b-1982-proof-of-work-genesis-conceived-2018-minted-june-16-2021/',
    aria: 'Proof of Work – Genesis at Bonhams, Bonhams & SuperRare: CryptOGs',
    note: 'Proof of Work – Genesis',
    type: 'Digital',
    image: '/works/proof-of-work-genesis/hero.jpg',
    imageAlt: 'Proof of Work – Genesis by Coldie, Lot 1 at Bonhams',
    event: 'CryptOGs: The Pioneers of NFT Art · Lot 1 · 2021',
    desc: 'Conceived and first tokenized in 2018, it opened the Bonhams × SuperRare sale honoring the earliest artists of the NFT space.',
  },
  {
    label: '2025 Bitcoin Conference Art Gallery',
    href: '/work/jack-dorsey-magnetic-portrait',
    aria: 'Jack Dorsey Magnetic Portrait at the 2025 Bitcoin Conference Art Gallery',
    note: 'Jack Dorsey Magnetic Portrait',
    type: '3D Kinetic Magnetic Portrait',
    image: '/works/eterno/jack-dorsey.jpg',
    imageAlt: 'Jack Dorsey Magnetic Portrait by Coldie, shown at the 2025 Bitcoin Conference Art Gallery',
    event: 'Bitcoin Conference Art Gallery · 2025',
    desc: 'A magnetic, rearrangeable portrait in stereoscopic 3D. The collector reconfigures the composition by hand.',
  },
  {
    label: 'Eterno Gallery, Lisbon',
    // TODO: insert direct Eterno Gallery exhibition/work URL
    href: 'https://eternogallery.com/',
    aria: 'Unpermissioned Self at Eterno Gallery, Lisbon',
    note: 'Unpermissioned Self',
    type: '3D Kinetic Magnetic Portrait / Prints / Digital',
    image: '/works/eterno-prints/01.jpg',
    imageAlt: 'Tech Epochalypse: Overlord Mashup giclée print by Coldie, on view at Eterno Gallery, Lisbon',
    event: 'On view now',
    desc: 'Kinetic magnetic portraits, signed Tech Epochalypse giclée prints and an interactive touchscreen piece, on view and available through the gallery.',
    todo: true,
  },
  {
    label: 'Gazelli Art House, London',
    href: 'https://gazelliarthouse.com/exhibitions/156-front-row-3d-stereoscopic-concert-photography-coldie/',
    aria: 'Front Row 3D at Gazelli Art House, London',
    note: 'Front Row 3D Concert Photography',
    type: 'Stereoscopic 3D Lenticular, VR, Digital',
    image: '/images/front-row-3d/coachella-2010/coachella-2010-them-crooked-vultures.jpg',
    imageAlt: 'Them Crooked Vultures at Coachella 2010, stereoscopic 3D photograph by Coldie from Front Row 3D',
    event: 'Front Row 3D',
    desc: 'Stereoscopic concert photography from his years as the official 3D photographer of Coachella (2009 and 2010), shown as lenticular, VR and digital works.',
  },
];

export const pillars = {
  stereoscopic: {
    slug: 'stereoscopic',
    concept: 'Fool the Eye',
    title: 'Stereoscopic & Parallax Animation',
    eyebrow: 'Perceptual & Op art — the act of seeing as the subject',
    framing:
      'Portraits and landscapes that hold real depth: lenticular prints that shift as you move, anaglyph works seen through 3D glasses, and digital editions.',
    statement:
      'For a brief instant the brain reads the depth as real: the eye is fooled, and something deeper resonates. I build that moment on purpose — and I encode meaning inside it, both personal and ephemeral. Each piece is a puzzle of meanings and feelings encoded in 3D.',
    interaction: 'parallax',
  },
  kinetic: {
    slug: 'kinetic',
    concept: 'Touch the Art',
    title: 'Kinetic magnetic portraits',
    eyebrow: 'Kinetic 3D Collage',
    framing:
      'Physical, hand-arranged 3D portraits the viewer can rearrange. The first sold at Christie’s; current work is at Eterno Gallery, Lisbon.',
    interaction: 'drag',
  },
  participatory: {
    slug: 'participatory',
    concept: 'Touch the Art',
    title: 'Participatory work',
    eyebrow: 'In the tradition of participatory & relational art',
    framing:
      'A 3D collage machine at Eterno Gallery that invites the public to build and customize a portrait — completing the work themselves.',
    interaction: 'collage',
  },
} as const;

export type PillarKey = keyof typeof pillars;

// Pillar keys that get a standalone gallery page at /{slug}. The others
// (stereoscopic, participatory) live on the homepage / collection only.
export const PILLAR_PAGES: PillarKey[] = ['kinetic'];

// Current series — the active bodies of work, featured at the top of the homepage,
// in display order (first = top). Each block either pulls works via `seriesKey`
// or shows explicit `images`. Edit/reorder this list as the focus changes.
type CurrentSeriesBlock = {
  name: string;
  blurb: string;
  /** pull cards from works with this series tag */
  seriesKey?: 'filthy-fiat';
  /** explicit image cards (when works aren't catalogued yet) */
  images?: { src: string; alt: string }[];
  /** render `images` as an auto-cycling billboard instead of a card grid */
  billboard?: boolean;
  /** primary call to action */
  primary?: { label: string; href: string; external?: boolean };
  /** optional secondary link */
  secondary?: { label: string; href: string };
  /** Eterno items as compact preview-image + description rows, each linking out.
   *  An item with `prints` shows a small rotating billboard as its preview. */
  eternoItems?: {
    title: string;
    desc: string;
    href: string;
    image?: string;
    alt?: string;
    prints?: { src: string; alt: string }[];
  }[];
};

// The 42 Tech Epochalypse: Overlord Mashup prints, pulled from Eterno's product page.
const eternoPrints = Array.from({ length: 42 }, (_, k) => {
  const nn = String(k + 1).padStart(2, '0');
  return {
    src: `/works/eterno-prints/${nn}.jpg`,
    alt: `Tech Epochalypse: Overlord Mashup by Coldie — print ${k + 1} of 42, at Eterno Gallery`,
  };
});

export const currentSeriesList: CurrentSeriesBlock[] = [
  {
    name: 'Kinetic 3D Collage',
    blurb:
      'Hand-fabricated 3D collage and magnetic portraits — on view and available now at Eterno Gallery, Lisbon.',
    secondary: { label: 'About the kinetic work', href: '/kinetic' },
    eternoItems: [
      {
        title: 'Tech Epochalypse: Overlord Mashup',
        desc: 'A series of 1/1 giclée prints by Coldie — signed, on Canson Arches BFK Rives paper, 2026.',
        href: 'https://eternogallery.com/products/tech-epochalypse-overlord-mashup?Type=1',
        prints: eternoPrints,
      },
      {
        title: 'Jack Dorsey Magnetic Portrait',
        desc: 'A magnetic, rearrangeable portrait in lenticular/stereoscopic 3D — the collector reconfigures the composition. 2026.',
        href: 'https://eternogallery.com/products/jack-dorsey-magnetic-portrait',
        image: '/works/eterno/jack-dorsey.jpg',
        alt: 'Coldie — Jack Dorsey magnetic rearrangeable portrait at Eterno Gallery',
      },
      {
        title: '32" Touchscreen Interactive Piece',
        desc: 'An interactive touchscreen artwork — one screen with integrated computer and the work within. 2026.',
        href: 'https://eternogallery.com/products/32-touchscreen-interactive-piece',
        image: '/works/eterno/touchscreen.jpg',
        alt: 'Coldie — 32-inch touchscreen interactive artwork at Eterno Gallery',
      },
    ],
  },
];
