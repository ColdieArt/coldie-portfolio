# Coldie — Website Content & Copy

Prepared as a content spec for the site build. Everything below is final copy unless marked `[CONFIRM]` or `[TO ADD]`. Placeholders are things only Coldie can supply or verify — fill these before publishing, since several are provenance claims that should be exact.

Artist: Ryan "Coldie" Colditz
Based: Sacramento, CA

---

## 0. Positioning thesis (for the builder — not for display)

The strategic job of this site is to convert two audiences at once: a strong existing web3/NFT following, and traditional art collectors who don't yet know the work. The insight that makes this possible:

**Coldie is not a crypto artist reaching toward fine art. He is a fine artist working in a 170-year-old medium (stereoscopy) who happened to extend it onto the newest substrate first.**

The through-line that unifies everything: *an artist who has spent his life capturing depth, and who keeps trusting that technology will catch up to let people finally see it — and keeps being right.* He shot stereoscopic concert photos in 2009 believing future hardware would render them in digital 3D (confirmed in VR, 2021). He minted on-chain in 2018 believing the world would value it (confirmed by the market and by artists like Shepard Fairey following). Vision rewarded twice. That is the story; everything else is evidence.

Tone rules for all display copy:
- Lead with the medium and the lineage; let the blockchain arrive as *provenance*, not as the pitch.
- Avoid the words "NFT" and "crypto" in headline/hero positions — use "minted on-chain," "blockchain," "permanent provenance." (The web3 audience still reads it loud and clear; the traditional collector hears an artist, not a trend.)
- Understated confidence. Restraint and curation are themselves signals to serious collectors.
- Photography quality is paramount — large, calm, museum-grade images, fewer works shown bigger.

---

## 1. Site narrative spine (section order)

A single scroll designed so most of it serves both audiences, with two targeted reassurance moments.

1. **Hero** — the thesis in one line (serves both)
2. **Provenance** strip — Christie's · Sotheby's · Bonhams · Eterno · Gazelli (anchors traditional collectors)
3. **The work — three pillars** — stereoscopic · kinetic · participatory (serves both)
4. **Story, woven throughout** — interview-clip highlights beside the relevant works (serves both)
5. **Pioneer, on-chain** — the 2018 origin story (anchors web3 collectors, reframed as prestige)
6. **Acquire / inquire** — editions, sizes, gallery contact (serves both)

---

## 2. Hero

**SELECTED — use this:**
Headline — *Art with depth.*
Subhead — *Stereoscopic and kinetic portraits: a 170-year-old way of seeing, minted on-chain for the first time.*

**Treatment (locked):** depth-layered parallax — scroll + mouse-tilt on desktop, device-tilt on mobile. Subtle and slow; artwork stays sharp; honors reduced-motion. First hero piece: *The Day We've All Been Waiting For*, exported as 3 transparent PNG layers (near: astronaut + HODL billboard · mid: skyline · far: moon + stars).

*Alternates considered (not used, kept for reference):*
- *Depth. Perception. Decentralization.* / *Stereoscopic prints, kinetic sculpture, and on-chain editions by Coldie.*
- *I make portraits that move.* / *In the gallery, in your hands, and on the blockchain where I started.*

---

## 3. Provenance strip

Displayed label: simply **Provenance**. Flat, no parallax. True sales and exhibitions only — the SFMOMA jury credit is *recognition*, not provenance, so it lives in the credentials line (§12), not here, to avoid implying an institutional relationship with SFMOMA. Each name links to its receipt.

> Christie's · Sotheby's · Bonhams · Eterno Gallery, Lisbon · Gazelli Art House, London · first on-chain stereoscopic work (2018)

Receipts to link — always to the **specific work / lot / exhibition page, never an institution homepage**:
- Christie's → *Warren Buffett – Filthy Fiat* (lot): https://onlineonly.christies.com.cn/s/first-open-post-war-contemporary-art/coldie-b-1982-286/245196
- Sotheby's → *3D Light Painting 03*, *Inside the World of MaxStealth* (Sept 14, 2022): https://www.sothebys.com/en/buy/auction/2022/inside-the-world-of-maxstealth-a-timeless-collection/3d-light-painting-03
- Gazelli Art House → *Front Row 3D* (exhibition): https://gazelliarthouse.com/exhibitions/156-front-row-3d-stereoscopic-concert-photography-coldie/
- Bonhams → *Proof of Work – Genesis*, *Bonhams & SuperRare: CryptOGs — The Pioneers of NFT Art*: `[INSERT direct lot/work URL]`
- Eterno Gallery, Lisbon → the specific work/exhibition page: `[INSERT direct URL]`
- First on-chain stereoscopic work, 2018 → *The Day We've All Been Waiting For* (on-chain record / marketplace): `[INSERT direct URL]`

Use descriptive anchor text and structured-data `sameAs`/`subjectOf` on each link (see the update prompt for AI-search details).

---

## 4. Short artist statement (lineage-placing)

> I work in depth — the space just in front of and just behind the flat surface, where the eye is fooled into believing an image is no longer flat. For more than fifteen years I've pursued that illusion across mediums: stereoscopic and lenticular prints, anaglyph 3D, kinetic sculpture, photography, and on-chain editions. My portraits are built by recombining many source images into one, the way a person is built from many influences. The tools change — a hand-built 3D camera, a lenticular press, a blockchain, a VR headset — but the work is always the same: take something flat, and give it dimension.

---

## 5. The three pillars (overview copy)

**Stereoscopic & lenticular work** — Portraits and landscapes that hold real depth: lenticular prints that shift as you move, anaglyph works seen through 3D glasses, and digital editions. Belongs to the long history of perceptual and Op art — the act of seeing as the subject.

**Kinetic magnetic portraits** — Physical, hand-arranged 3D portraits the viewer can rearrange. In the lineage of kinetic art (Calder, Tinguely, Cruz-Diez). The first of these sold at Christie's; current work is at Eterno Gallery, Lisbon.

**Participatory work** — A 3D collage machine at Eterno Gallery that invites the public to build and customize a portrait, completing the work themselves. In the tradition of participatory / relational art.

**Design (locked):**

Each pillar gets an on-screen interaction that mirrors its physical medium — the site moves the way each body of work actually behaves:
- Stereoscopic & lenticular → scroll + tilt parallax (depth-shift)
- Kinetic magnetic portraits → drag to rearrange (the magnet echo)
- Participatory → build-your-own collage (web echo of the Elon machine)

Repeating template, the same for all three (coherence) while the interaction differs (distinctiveness):
1. Quiet eyebrow naming the lineage + a one-line framing.
2. One large featured piece with its signature interaction. Featured: stereoscopic = a Decentral Eyes portrait; kinetic = *Warren Buffett – Filthy Fiat*; participatory = the Elon collage machine.
3. A small *curated* set beneath — a few works shown large, never a dense grid.
4. A calm "view all" into that pillar's deeper gallery.

Every individual work is its own deep-linkable page: wall-text caption, provenance, edition/size, and a single understated "inquire."

Principles: artwork always sharp and central (the interaction frames, never competes); restraint wins (fewer works shown larger, museum-grade images, quiet around each piece).

Kinetic decision (locked): drag-to-rearrange is an optional "try it" mode; default to a still, dignified presentation for the $30k+ sculpture — the playful version is a choice (spectacle with an escape hatch).

---

## 6. Pioneer, on-chain — origin story

**First person (about / story section):**

> On May 7, 2018, I minted *The Day We've All Been Waiting For*, the first stereoscopic artwork recorded on a blockchain. There was no market for it — that was the point. I made it to prove that this new way of owning and sharing digital art was real, and that it was the future. I believed that if artists tested the technology early, names like Shepard Fairey and Banksy would eventually follow. Fairey has.

**Third person (press / gallery / wall text):**

> Years before any collector market existed, Coldie minted *The Day We've All Been Waiting For* (May 7, 2018), the first stereoscopic artwork recorded on a blockchain. Tokenized on Ethereum through R.A.R.E. Art Labs, it was made not to sell but to prove a thesis: that peer-to-peer ownership of digital art was real, and that it pointed to the future of the digital economy. That conviction helped lay groundwork for a movement later embraced by artists including Shepard Fairey.

`[NOTE]` Mint date is May 7, 2018 (now incorporated above).

`[NOTE]` Phrasing on "before NFTs existed": 2018 sits right on the boundary (the ERC-721 standard was being drafted that year), so use a bulletproof framing instead — "years before the 2021 NFT boom," "before any collector market existed," or the technical flex "minted as ERC-20 tokens, before ERC-721 became the standard." Lead with *nobody was buying yet*; that signals conviction, not opportunism, and is unassailable.

**Design (locked):**
- Deliberate callback: this work also opens the site as the hero. The hero *shows* it (moving); this section *explains* it — true 3D, the receipt, the story. Seeing it up top and understanding it here is an arc, not a repeat.
- Signature interaction: an anaglyph "3D mode" toggle that switches the piece into real red/cyan anaglyph (Coldie's physical medium, delivered on screen). Default off; prompt reads "grab your red/blue glasses."
- On-chain receipt line beneath the work: minted May 7, 2018 · R.A.R.E. Art Labs · Ethereum · view on-chain. Verifiable provenance — the same move as the auction names in the provenance strip.
- Carries the origin story (§6 copy), the Shepard Fairey payoff, and the work's symbolism (astronaut → moon, HODL billboard, LA/SF photos = his twenties and thirties).

---

## 7. Featured work caption — *The Day We've All Been Waiting For* (2018)

> *The Day We've All Been Waiting For* (2018). Anaglyph stereoscopic landscape. An astronaut ascends toward the moon beneath a billboard reading HODL — *hold on for dear life* — above photographs the artist took of Los Angeles and San Francisco, the two cities that shaped his twenties and thirties. A portrait of belief in a future not yet arrived, and the first stereoscopic artwork ever minted on-chain — May 7, 2018.

---

## 8. Front Row 3D — concert photography (2009–2018)

This section carries the emotional weight. Give it room.

**First person:**

> From 2009 to 2018 I photographed live music in stereoscopic 3D with a camera I built myself — rock and hip-hop, front row, in real depth. I was the official 3D photographer of Coachella in 2009 and 2010. I had one mantra the whole time: someday these photos will be seen in full color digital 3D. Virtual reality didn't exist for the public yet, but I trusted the hardware would come, and I knew I just had to shoot them correctly. In 2021 I loaded the work into a VR headset for the first time, saw it the way I always imagined, and broke down crying. I'd shot them right. Some of the musicians I captured — Chris Cornell, Mac Miller, DMX — are no longer with us, which makes these among the only times they'll ever be seen again in true dimensional space.

**Third person (press / gallery):**

> For nearly a decade, Coldie (Ryan Colditz) photographed live music in stereoscopic 3D using a camera of his own construction, serving as the official 3D photographer of the Coachella Festival in 2009 and 2010. He shot believing a technology that did not yet exist would one day render the images in full dimensional color — and in 2021, viewing the archive in VR for the first time, that conviction was confirmed. The series, exhibited as *Front Row 3D* at Gazelli Art House, London, now stands as a rare dimensional record of performers including Chris Cornell, Mac Miller, and DMX.

**Assets for this section:**
- The 10-minute mini-documentary about this project — feature it prominently, not buried. It's the strongest single piece of storytelling + emotional proof.
- Coachella website archive (provenance that the gallery was featured on coachella.com):
  - 2009 3D gallery: https://web.archive.org/web/20091012095134/http://www.coachella.com/gallery/20093d
  - 2010 3D gallery: https://web.archive.org/web/20100914213515/http://coachella.com/gallery/20103d

**Design (locked):**
- A large **"billboard" image slider** titled **Coachella 2010 3D Concert Photography**, featuring Coldie's own 3D concert shots (Them Crooked Vultures, Julian Casablancas, MGMT, She & Him, Perry Farrell, Edward Sharpe, Hot Chip, plus crowd shots). Images are **self-hosted** (downloaded into the build, never hot-linked from archive.org). Accessible carousel (arrows + dots + keyboard + swipe); auto-advance pauses under reduced-motion; descriptive per-image alt text.
- The 2009 and 2010 archived Coachella gallery links are featured **prominently** (clear buttons, not a footnote), framed as provenance ("featured on coachella.com, 2009–2010").

---

## 9. Kinetic magnetic portraits

**Overview copy:**

> Hand-fabricated 3D portraits on printed, routed steel Dibond, with facial features held by magnets so the collector can rearrange the composition — kinetic art you can touch and change. Each rearrangement is recorded on the blockchain, making the work an ongoing, "living" collaboration between artist and owner. The first of these, *Warren Buffett – Filthy Fiat* (2024) — the debut of Coldie's portraiture as physical 3D sculpture — sold at Christie's, in the *First Open | Post-War and Contemporary Art* sale. Current work is on view at Eterno Gallery, Lisbon.

**Featured work caption — *Warren Buffett – Filthy Fiat* (2024):**

> *Warren Buffett – Filthy Fiat* (2024). Double-sided magnetic moveable portrait pieces, magnetic 3D depth spacers, and mixed media on Dibond; 33 × 21 × 6¼ in. (83.8 × 53.3 × 15.9 cm). The portrait's features are built from real US dollar bills the artist buried underground for two years, unearthed mottled with mold — fragile, debased currency reassembled into the face of one of capitalism's most famous investors. The collector is invited to rearrange the magnetic pieces; every change is recorded on-chain, so the work keeps living after it is sold. Paired with a recursive digital edition inscribed on Bitcoin. The first of Coldie's portraits realized as physical 3D sculpture. Part of the Filthy Fiat series (filthyfiat.money).

`[CONFIRM, optional]` Christie's sale date and hammer price, if you want them displayed — they are not on the lot page.

---

## 10. Participatory collage machine (Eterno Gallery, Lisbon)

> A 3D collage machine that invites the public to build and customize a portrait — here, of Elon Musk — completing the artwork themselves. The act of making becomes part of the work.

**Assets:** footage of the public interacting with the machine at Eterno — strong proof of institutional presence and a natural pairing with a web-based interactive version (see builder notes).

## 10A. Filthy Fiat — featured project

A major current project; feature it as its own section. Deep-dive site to link out to: **https://filthyfiat.art** (confirm canonical domain — `filthyfiat.money` also exists).

**The story:** In 2020, in a wildfire-prone mountain town, Coldie buried a survival box that included 200 one-dollar bills. Two years later he dug it up to find the cash had become a solid brick of mold — unspendable. He turned the mold-ravaged bills into Filthy Fiat: each a unique artifact made by mold, moisture, and time, used as a visual motif for the fragility and debasement of fiat currency. Those same buried bills became the facial features of the Christie's *Warren Buffett – Filthy Fiat* — a "duality of values" between durable steel and fragile money.

**Caption / wall text:**
> Filthy Fiat (2020– ). U.S. dollar bills the artist buried for two years and recovered ruined by mold, moisture, and time — each a unique artifact of decay — reworked into a meditation on the fragility and debasement of fiat currency. The series supplies the source material for the *Warren Buffett – Filthy Fiat* portrait.

**Design / placement:** a featured-project block — short framing (the buried-box story, the fiat-debasement concept) + a curated set of Filthy Fiat works + a prominent "Explore the Filthy Fiat project" link to filthyfiat.art. Sits near the kinetic pillar (they share *Warren Buffett – Filthy Fiat*) or as its own moment between the pillars and the pioneer section. Calm, gallery-grade; the kinetic piece can use drag-to-rearrange.

**AI search / SEO:** its own deep-linkable URL (e.g. /filthy-fiat); a `CreativeWork`/series JSON-LD block with `sameAs: https://filthyfiat.art`; an answer-first opening sentence; outbound link with descriptive anchor text.

---

## 10B. The Collection — on-chain works hub

A curated hub for the tokenized digital works, on its own deep-linkable page (e.g. `/collection`). Curated, **not exhaustive** — the same gallery-grade restraint as the rest of the site, so it reads as a serious *collection*, not a marketplace. Header label: **Collection** (not "NFTs"). Reached from the stereoscopic pillar's "view all" and the Acquire "collect on-chain" path; an optional compact teaser may appear on the homepage.

**Layout:** titled project rows; within each, work cards = image, title, year, edition, an optional provenance badge ("Sotheby's," "Bonhams," "Historic first · 2018"), and one action. Lead with Landmark works so institutional names land before any marketplace.

**Project rows (in order):**
1. **Landmark / auction works** — *The Day We've All Been Waiting For* (2018), *3D Light Painting 03* (Sotheby's), *Proof of Work – Genesis* (Bonhams). With provenance badges. Positions for traditional collectors.
2. **Decentral Eyes** — the signature blockchain-portrait series; most recognizable to both audiences.
3. **Filthy Fiat** — current; ties to the Christie's piece (links to §10A and filthyfiat.art).
4. **Collaborations** — works with respected artists, e.g. Hackatao (*UAP – Unidentified Art Phenomenon*).
5. **Landscapes** — stereoscopic 3D landscapes, e.g. *Trust Your Intuition*, *Choose Your Own Adventure*.

**Per-work action — primary vs secondary:**
- **Primary (live):** "Collect" → Coldie's own contract on **Transient Labs** (artist-owned contract — itself a provenance/credibility signal worth noting).
- **Secondary:** "View on [marketplace]" → **SuperRare** or **OpenSea** listing.

**Curation rule:** omit one-offs and experiments; fewer works shown larger. The hub is the "view all / collect" destination from the stereoscopic pillar and the on-chain path in Acquire.

**AI search / SEO:** hub page = `CollectionPage` JSON-LD; each work = `VisualArtwork` (`creator`, `dateCreated`, `artMedium`, edition) with `offers` (primary/secondary URL) and `isPartOf` its series/project. Descriptive anchor text on every marketplace link (work + venue); `rel="noopener"`, no `nofollow`. Titles/years/editions as live text, never in images.

## 11. Interview-clip highlights (storytelling system)

Coldie's voice is a major asset. Don't post full episodes. Cut 30–90 second highlight clips, each built around one idea, and place each clip *next to the work it's about* (not in a separate press page) so it acts as living wall text. Caption all clips (most viewers watch muted; captions also help discovery).

Suggested themes / clip spine:
- Origin — how the obsession with depth started
- Why stereoscopy — the medium and its history
- Why blockchain — the 2018 mint and the bet on the future
- The kinetic work — physical, rearrangeable portraits
- The collage machine — inviting the public to finish the work
- The VR moment — the 2021 mantra-come-true (pair with the concert photography)

**Design (locked):**
- Repeating unit: a pull-quote paired with a short clip, placed beside the work it's about (living wall text). The pull-quote is the actual spoken line from the clip, so quote and clip reinforce each other. Captioned, plays muted. The still behind gets only a whisper of depth; the video stays flat and crisp.
- The 10-minute mini-documentary gets its own full-width "intermission" moment — a genuine centerpiece, likely near the concert-photography pillar or just before the pioneer section.
- Clips: 30–90s, one idea each, cut to the single strongest beat (a collector watches 45 seconds, not 45 minutes). Theme spine as listed above.

---

## 12. Credentials / CV line (understated)

> Work selected for national juried exhibitions: 2016, juried by Jenny Gheith, Assistant Curator of Painting and Sculpture, SFMOMA (now Curator and Interim Head of Painting and Sculpture); 2018, juried by LA critic and curator Mat Gleason. Exhibited at Gazelli Art House, London. First stereoscopic artwork minted on-chain (2018). Work brought to auction at all three major houses — Christie's, Sotheby's, and Bonhams. Represented at Eterno Gallery, Lisbon.

**Story beat — the auction arc** (each time, the houses chose the 3D work):

*First person:*
> My work has come to auction at all three major houses, and each time it was the 3D they chose. Sotheby's included my stereoscopic work in *Inside the World of MaxStealth* — the first single-owner NFT auction ever held live in their salesroom — alongside Beeple, XCOPY, and Pak. Bonhams featured *Proof of Work – Genesis* in their "CryptOGs" sale, honoring the early artists of the space. And in 2024, Christie's sold *Warren Buffett – Filthy Fiat*, the first time my portraiture became a physical 3D sculpture. From a screen to magnet-and-steel on a wall — the same obsession with depth, recognized by the houses that define the canon.

*Third person (press / gallery):*
> Coldie's work has appeared at all three major auction houses. In 2022, Sotheby's included his stereoscopic art in *Inside the World of MaxStealth*, the first single-owner NFT auction held live in its salesroom, alongside Beeple, XCOPY, Pak, and Hackatao — the last a collaborator on the 3D work *UAP – Unidentified Art Phenomenon*. In 2021, Bonhams featured *Proof of Work – Genesis* in its SuperRare "CryptOGs" sale. In 2024, Christie's offered *Warren Buffett – Filthy Fiat*, the debut of his portraiture as physical 3D sculpture.

Detail worth keeping: the 2016 and 2018 juried pieces were anaglyph 3D landscapes on canvas, shown *with 3D glasses on display* — the traditional art world engaging the actual medium on its own terms, and proof the fine-art credibility predates the crypto work.

`[CONFIRM]` Mat Gleason is spelled with one "t."

---

## 13. Acquire / inquire

Displayed near the end. Flat, still, unambiguous — the calm landing after the spectacle. No motion here; clarity over cleverness.

**Design (locked):**
- Two ownership paths, shown side by side and plainly:
  - **Own the physical work** — lenticular prints and kinetic sculptures. "Price on request" (fine-art convention — don't list numbers publicly). Inquire → routes to the artist and Eterno Gallery. Ships worldwide with on-chain provenance and a certificate of authenticity.
  - **Collect on-chain** — digital editions with transparent on-chain pricing and permanent, public provenance. "View editions" → marketplace.
- A calm inquiry form: name, email, work of interest, message → goes to the artist and Eterno Gallery, Lisbon.
- Reframe for traditional collectors: at this point in the page, the blockchain reads as a *provenance feature* (verifiable authenticity), not a crypto gimmick.

## 14. Notes for the site builder (Claude Code)

Visual/interaction ideas matched to Coldie's physical techniques. Most need the art **pre-separated into depth layers** (foreground / midground / background as transparent PNGs) — make this a standing asset requirement.

Priority effects:
- **Tilt / mouse parallax (digital lenticular)** — layers respond to cursor position and, on mobile, device tilt. The truest digital echo of lenticular, which also changes with viewing angle. Strongest single signature effect.
- **Layer explosion & reassembly** — a portrait separates into its source layers on scroll, then snaps back together. Thematically perfect for the Decentral Eyes "recombination" concept; unique to Coldie.
- **Anaglyph 3D toggle** — a "grab your red/blue glasses" button that flips a piece into true anaglyph mode. Authentic to the physical medium.
- **Web collage machine** — a draggable digital echo of the physical Elon collage machine at Eterno; ties physical and digital together.

**Parallax placement (current plan, refined section by section):**
- Hero — LOCKED: scroll + tilt parallax on a depth-layered work (see §2). The signature moment.
- Provenance strip — flat, no parallax (instant, serious).
- Three pillars — each pillar's interaction mirrors its medium (see §5): stereoscopic = parallax, kinetic = drag-to-rearrange, participatory = build-your-own. Artwork stays crisp and central.
- Story / clips — a whisper of depth behind each clip; the video stays flat.
- Pioneer (*The Day We've All Been Waiting For*) — strongest parallax; home of the anaglyph 3D toggle.
- Acquire / inquire — flat and calm.

Secondary effects: scroll-flipped lenticular video; pop-up-book layer lift with shadows; wigglegram social posts; z-space fly-through of a series; focus-pull on scroll.

Design constraints:
- Museum-grade photography, generous whitespace, fewer works shown larger. Curate over volume.
- No localStorage/sessionStorage in any embedded artifact.
- Serif for editorial/statement moments; clean and restrained throughout.

---

## 15. Open items to confirm before publishing

- [x] Mint date confirmed: May 7, 2018
- [x] 2016 juror confirmed: Jenny Gheith, SFMOMA — `[optional: add the exhibition/venue name if you want it on the CV]`
- [x] Christie's piece confirmed: *Warren Buffett – Filthy Fiat* (2024), First Open | Post-War and Contemporary Art — `[optional: add sale date and hammer price if you want them shown]`
- [x] Coachella Wayback snapshot URLs added (2009 + 2010 3D galleries)
- [x] Hero selected: *Art with depth.*
- [x] Sotheby's confirmed: *3D Light Painting 03* + Hackatao collab *UAP* in *Inside the World of MaxStealth* (Sotheby's, Sept 14, 2022)
- [ ] Press/quote list for the provenance strip
