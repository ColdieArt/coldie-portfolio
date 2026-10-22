// YouTube videos embedded on the site. Single source for the embed titles and the
// VideoObject JSON-LD (see videoLd in jsonld.ts). Upload dates and lengths are
// copied from each video's YouTube page — keep them exact; engines cite them.

export type Video = {
  id: string;
  title: string;
  /** Channel / show the video comes from. */
  source: string;
  desc: string;
  /** ISO 8601 upload date from YouTube. */
  uploadDate: string;
  durationSec: number;
  start?: number;
  /** Watch page at /interviews/{slug}; needs a transcript in data/transcripts/{slug}.md. */
  slug?: string;
  /** Watch-page <title> when "{title}: interview with {host}" doesn't fit. */
  pageTitle?: string;
};

export const videos = {
  raoulPal: {
    id: 'Q8cO3HhYGr4',
    slug: 'raoul-pal',
    title: 'Digital Art’s Next Frontier',
    source: 'Raoul Pal · The Journey Man',
    desc: 'A deep dive into the evolution of digital art: from early stereoscopic experiments and the birth of on-chain art to work blending AI, physical installations, touchscreens, and blockchain-native ownership.',
    uploadDate: '2026-05-14T08:30:06-07:00',
    durationSec: 4231,
  },
  goldRush: {
    id: 'WRO4jSxHdOA',
    title: 'Coldie and the NFT Gold Rush',
    source: 'Studio visit · Northern California',
    desc: 'Coldie minted his first work on-chain via SuperRare in 2018 and became one of the most prolific digital artists in the space, with mixed-media portraits of figures including Edward Snowden, Vitalik Buterin, and John McAfee.',
    uploadDate: '2021-08-09T08:31:30-07:00',
    durationSec: 307,
  },
  originStories: {
    id: 'q0f95uetlxw',
    slug: 'origin-stories-59',
    pageTitle: 'NFT Origin Stories #59: 24 Hours of Art',
    title: 'Origin Stories #59',
    source: 'NFT Origin Stories',
    desc: 'Coldie traces his obsession with depth: his first stereoscopic gel transfer, early on-chain experiments, the Genesis piece, and the light-painting and portrait series that followed.',
    uploadDate: '2022-03-15T07:48:57-07:00',
    durationSec: 6240,
  },
  techEpochalypse: {
    id: 'yVyx-bMoBJQ',
    title: 'Tech Epochalypse',
    source: 'NFT Drop Spotlight',
    desc: 'A close look at Coldie’s Tech Epochalypse collection and the ideas behind it.',
    uploadDate: '2026-02-17T10:43:03-08:00',
    durationSec: 871,
  },
  firstInterview: {
    id: 'kMIMr8Ro9So',
    title: 'Coldie — first interview (2011)',
    source: 'RAW: Sacramento “Unearthed”',
    desc: 'The 3D concert photographer and stereoscopic fine artist is interviewed about his surreal anaglyph art series, featuring Front Row 3D: Photography from the Coachella Music Festival and works later tokenized as digital works.',
    uploadDate: '2011-05-16T16:24:39-07:00',
    durationSec: 171,
  },
  filthyFiat: {
    id: 'Eti8Lp3nVGQ',
    title: 'Filthy Fiat — Between Two Bills (behind the scenes)',
    source: 'Coldie',
    desc: 'Behind the scenes as Coldie cracks apart the mold-ruined Filthy Fiat bills, uncovering nature-generative art that speaks to the fragility and impermanence of fiat currency.',
    uploadDate: '2024-12-04T14:51:07-08:00',
    durationSec: 143,
  },
} satisfies Record<string, Video>;

/** The homepage "In Coldie's Words" interviews, in display order. */
export const interviews: Video[] = [videos.raoulPal, videos.goldRush, videos.originStories, videos.techEpochalypse];
