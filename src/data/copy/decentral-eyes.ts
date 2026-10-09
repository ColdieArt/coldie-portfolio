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
  ready: true,

  /** One factual sentence, 25–40 words. The line Google and AI tools quote. */
  lead: "Decentral Eyes is a portrait series featuring some of the most important people of the blockchain movement. Started in 2018 and minted on the Ethereum Blockchain. Each image is created by using 10+ images to create a decentralized portrait and a variety of 3D and stereoscopic effects." as string | null,

  /** "About the series" — 2–3 paragraphs, 150–250 words total. */
  intro: [
    "The series started with Vitalik Buterin, the co-inventor of Ethereum, which is the blockchain this series lives on. The whole series is a thoughtful selection of certain people I want to make a memory of for the time and place when they are created. As an artist creating blockchain-themed art, I keyed in on memorable moments that I wanted to be able to look back on and remember.",
    "Choosing people to feature was very particular. There are a lot of people in the web3 / crypto space that were memorable, but sometimes shady and just not good people. I chose not to feature them because I didn't want to give them any more visibility or notoriety. The people I did choose were very important to the progress of the decentralized revolution. Along the way I did choose some people very much against crypto; Warren Buffett for example. He was just too funny and out of touch like an old grandpa. By creating portraits of Buffett, it also became a good conversation starter when people would recognize his face and ask why I chose to feature him.",
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
    kinetic: "Using the methods developed over the years for the Decentral Eyes series, I wanted to create a new method of inviting the viewer to participate in the collage creation. Guided by the mantra “touch the art,” I developed the Kinetic 3D Collage Machine that makes collage customizable and participatory." as string | null, // 2025–today
  },

  /** Answer each in 2–4 sentences. Questions are phrased the way people ask search and AI. */
  faq: [
    {
      q: 'What is Decentral Eyes?',
      a: "Decentral Eyes is a portrait series by artist Coldie which began in 2018. Focused on the faces of the emerging decentralization and blockchain movement, key figures were created in Coldie's signature decentralized portrait style. This leans into the ethos of decentralization, where many pieces come together to create a new portrait. Using a variety of visual methods including stereoscopic with 3D glasses and animated 3D parallax, each work takes a unique look at the time and place in blockchain history." as string | null,
    },
    {
      q: 'Why does Coldie portray figures from crypto and tech?',
      a: "Coldie portrays figures from crypto and tech because he learned about Bitcoin and decentralization in 2017 and wanted to help spread the word about the technology. Over time he developed artwork that was later classified as 'crypto art,' themed around the blockchain industry. He believed it was the future and wanted to lend his artistic sense to the growing revolution." as string | null,
    },
    {
      q: 'How do you see the 3D effect in a Decentral Eyes portrait?',
      a: "Coldie creates art in a variety of 3D styles. His deep study of stereoscopic art has led to works featuring anaglyph 3D (blue/red lens 3D glasses), lenticular 3D, and parallax animation to give viewers many ways to experience his art with depth." as string | null,
    },
    {
      q: 'What was the Decentral Eyes collaboration with Snoop Dogg?',
      a: "My collaboration with Snoop Dogg was not on my bingo card. When we first spoke, it was in the middle of the NFT mayhem. I told him that if I was going to do a collaboration, we had to work together to make something special — I would make the visuals and he would do the music. As life and circumstance would have it, due to family circumstances Snoop was unable to write the lyrics for the piece. I was asked if I could write them. Having grown up with Snoop's music, I knew his lyric rhyming style and cadence. The timing was wild: I had just come back from NFT NYC and caught what my doctor called “double COVID” — I was so sick I took NyQuil, and while on it I wrote the lyrics. Snoop recorded my lyrics bar for bar. The highest honor. Combined with my visuals, this work has become one of the wildest experiences of my creative career." as string | null,
    },
  ],

  /** Optional: exhibitions, press and auctions. Add as many as you like. */
  press: [
    { title: 'Bitcoin Conference', source: 'San Francisco, CA', year: 2019 },
    { title: 'Christie’s', source: 'New York, NY', year: 2024 },
    { title: 'Bitcoin Conference', source: 'Las Vegas, NV', year: 2025 },
    { title: 'Paintboxed Exhibition', source: 'Basel, Switzerland', year: 2025 },
    { title: 'Museum Francisco Carolinum', source: 'Linz, Austria', year: 2025 },
    { title: 'Eterno Gallery', source: 'Lisbon, Portugal', year: 2026 },
  ] as { title: string; source: string; year: number; url?: string }[],
};
