// ============================================================
// Decentral Eyes — your words for /series/decentral-eyes.
//
// Source of truth: the Google Doc "Decentral Eyes page copy" — text is copied
// from there verbatim. Anything still null
// shows on the page as a dashed "copy slot" describing what to write, and the
// page stays hidden from search engines until `ready` is true.
//
// Paragraphs: one string per paragraph in the array.
// ============================================================

export const decentralEyesCopy = {
  /** flip to true when the copy is in — removes noindex and adds the page to the sitemap */
  ready: false,

  /** One factual sentence, 25–40 words. The line Google and AI tools quote. */
  lead: "Decentral Eyes is a portrait series featuring some of the most important people of the blockchain movement. Started in 2018 and minted on the Ethereum Blockchain. Each image is created by using 10+ images to create a decentralized portrait and a variety of 3D and stereoscopic effects." as string | null,

  /** "About the series" — 2–3 paragraphs, 150–250 words total. */
  intro: [
    "The series started with Vitalik Buterin, the co-inventor of Ethereum, which is the blockchain this series lives on. The whole series is a thoughtful selection of certain people I want to make a memory of for the time and place when they are created. As an artist creating blockchain-themed art, I keyed in on memorable moments that I wanted to be able to look back on and remember.",
    "Choosing people to feature was ver particular. There are a lot of people in the web3 / crypto space that were memorable, but sometimes shady and just not good people. I chose not to feature them because I didnt want to give them any more visibility or notoriety. The people I did choose were very important to the progress of the decentralized revolution. Along the way I did choose some people very much against crypto; Warren Buffett for example. He was just too funny and out of touch like an old grandpa. By creating portraits of Buffett, it also became a good conversation starter when people would recognize his face and ask why I chose to feature him.",
    "As the years have gone by, I have experimented with a variety of animation and 3D styles. I enjoy experimenting with how visual identity can be displayed. I have used stereoscopic 3D, parallax animation, VR/AR, 3D Objects, and kinetic 3D collage to create this series.",
  ] as string[] | null,

  /** "How a portrait is made" — 1–2 paragraphs, 80–150 words. */
  technique: [
    "Each portrait usually consists of 10 or more sourced images around the internet. Images are processed with textures and overlays and are combined often with stereoscopic 3D or other depth based layout methods.",
    "My first portrait of Vitalik Buterin uses anaglyph red/blue glasses. The next phase of portraits leveraged depth with parallax 3D animation. Getting back to my roots of physical art, later works were developed using magnets and 3D spacers to create kinetic 3D collage that allows the viewer to re-compose the art.",
    "The structure of the series is flexible and inside the visual vernacular, exploring visual methods in the physical and digital realm has kept this series exciting to create and cohesive when looking back at where it has developed from.",
  ] as string[] | null,

  /** One or two sentences per era, shown above that era's works. */
  eras: {
    genesis: "Stereoscopic anaglyph red/blue glasses works, 3D wigglegram GIF, and static images were the primary style of my first Decentral Eye portraits." as string | null, // 2018–2019
    motion: "Focusing on new methods including 3D parallax animation and VR/AR 3D Object created more immersive works and the first volumetric portrait design." as string | null, // 2020–2026 (incl. later 1/1 portraits)
    generative: "Inviting collectors to get involved in the portrait creation, and using generative algorithms to create dynamic and cohesive themed bodies of work." as string | null, // 2021–2023
    kinetic: "Using the methods developed over the years for the Decentral Eyes series, I wanted to create a new method of inviting the viewer to participate in the collage creation. Guided by the mantra “touch the art,” I developed the Kinetic 3d Collage Machine that make collage customizable and participatory." as string | null, // 2025–today
  },

  /** Answer each in 2–4 sentences. Questions are phrased the way people ask search and AI. */
  faq: [
    { q: 'What is Decentral Eyes?', a: null as string | null },
    { q: 'Why does Coldie portray figures from crypto and tech?', a: null as string | null },
    { q: 'How do you see the 3D effect in a Decentral Eyes portrait?', a: null as string | null },
    { q: 'What was the Decentral Eyes collaboration with Snoop Dogg?', a: null as string | null },
  ],

  /** Optional: exhibitions, press and auctions. Add as many as you like. */
  press: [] as { title: string; source: string; year: number; url?: string }[],
};
