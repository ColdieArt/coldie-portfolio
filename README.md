# coldie3d.com

Artist website for **Coldie (Ryan Colditz)** — a stereoscopic-3D and kinetic artist.
Built with [Astro](https://astro.build): static, server-rendered, semantic HTML that
ships ~zero JavaScript by default, with small vanilla-JS "islands" for the four
signature interactions. Fast, crawlable, deep-linkable, accessible.

All copy and provenance come from `coldie-website-content.md` (the source of truth).

---

## Quick start

```bash
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # static build to ./dist
npm run preview  # preview the production build
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages,
GitHub Pages, S3+CloudFront). No server runtime required.

---

## What's here

**Narrative spine (single-scroll home page), top to bottom:**

1. **Hero** — depth-layered parallax (scroll + mouse-tilt / device-tilt). `Hero.astro`
2. **Provenance strip** — flat, typographic, links to receipts. `ProvenanceStrip.astro`
3. **Three pillars** — each interaction mirrors its medium. `Pillar.astro`
   - Stereoscopic → scroll/tilt parallax
   - Kinetic → drag-to-rearrange (opt-in "try it")
   - Participatory → build-your-own collage
4. **Story** woven clips + **documentary** intermission. `Story.astro`, `Documentary.astro`
5. **Pioneer** — *The Day We've All Been Waiting For* with the anaglyph 3D toggle + on-chain receipt. `Pioneer.astro`
6. **Acquire / inquire** — two ownership paths + calm form. `Acquire.astro`, `InquireForm.astro`

**Three reusable, prop-driven interactive components** (`src/components/`):

| Component | What it does | Used by |
|---|---|---|
| `DepthParallax.astro` | N layered images, eased; responds to scroll + pointer + device tilt; reduced-motion aware | Hero, stereoscopic pillar, parallax work pages |
| `DragRearrange.astro` | Draggable portrait pieces over a backboard; snap/reposition; keyboard-nudge; opt-in mode | Kinetic pillar, Filthy Fiat, work pages |
| `CollageBuilder.astro` | Swap/cycle portrait parts to customize; "surprise me" | Participatory pillar & work page |

The 2018 piece's 3D moment is **not** an interactive toggle: it shows a pre-made
red/cyan **anaglyph image** (static) with the caption "Grab your red/blue 3D
glasses." Set `anaglyphImage` / `anaglyphAlt` on the work in `src/data/works.ts`.

**Collection hub** at [`/collection`](src/pages/collection.astro): a curated (not
exhaustive) hub for the tokenized works, in titled rows — Landmark & auction works
(with provenance badges), Decentral Eyes, Filthy Fiat, Collaborations, Landscapes.
Each card has a **Collect** action (Coldie's own Transient Labs contract, primary)
and a **View on [marketplace]** secondary link. Reached from the stereoscopic
pillar's "view all", the Acquire "collect on-chain" card, and nav/footer. Rows and
membership are driven by `collectionRow` on each work in `src/data/works.ts`.

**Current Series** band at the top of the home page
([CurrentSeries.astro](src/components/CurrentSeries.astro)) — the active body of
work, featured first. Configured via `currentSeries` in `src/data/site.ts` (name,
blurb, which `seriesKey` feeds it, links). Change that one object to switch the
featured series.

**Releases database** at [`/releases`](src/pages/releases.astro) — a searchable,
server-rendered (crawlable) index of on-chain releases with **search**, **series /
status / chain filters**, an **available-only** toggle, and **sortable columns**
(title, year, available, floor, status). Data lives in
[`src/data/releases.ts`](src/data/releases.ts) — see "Releases database" below for
the spreadsheet import format.

Every artwork has its own **deep-linkable page** at `/work/<slug>` with wall-text
caption, provenance, edition/size, on-chain receipt (where relevant), and a single
**Inquire**. Pillar galleries live at `/stereoscopic`, `/kinetic`, `/participatory`;
editions at `/editions`; bio/CV at `/about`.

---

## Where to drop in real assets

Everything currently uses **clearly-labeled placeholders**. Replace these:

### 1. Depth-layered art (for parallax + anaglyph)
Export each featured piece as **3 transparent PNGs** (far → near) and replace the SVGs:

- `public/works/the-day/{far,mid,near}.svg` → real PNGs (near: astronaut + HODL billboard · mid: skyline · far: moon + stars)
- `public/works/decentral-eyes/{far,mid,near}.svg` → real PNGs

Then point the `layers[].src` paths in `src/data/works.ts` at the new files
(and tune each layer's `depth` value, 0 = far, 1 = near).

### 1b. The 2018 anaglyph image
The Pioneer section and the 2018 work page show a **static red/cyan anaglyph**.
Replace `public/works/the-day/anaglyph.svg` with the real anaglyph **JPEG**
(e.g. `anaglyph.jpg`) and update `anaglyphImage` on the `the-day-...` work in
`src/data/works.ts`. The "Grab your red/blue 3D glasses" caption is fixed in the
markup ([Pioneer.astro](src/components/Pioneer.astro), [work/[slug].astro](src/pages/work/[slug].astro)).

### 2. Flat artwork images
Curated/gallery thumbnails use `public/works/placeholder/{portrait,landscape}.svg`.
Drop museum-grade images into `public/works/…` and set each work's `image` +
`imageAlt` in `src/data/works.ts`.

### 3. Video
- Interview clips → `public/clips/`, then set `src`/`poster`/`captions` on the
  `<StoryClip>` entries in `src/components/Story.astro`. Add `.vtt` caption tracks
  (clips play muted, so captions matter).
- The 10-min documentary → set `src`/`poster`/`captions` on `<Documentary>` in
  `src/pages/index.astro`.

### 4. Open Graph image
`public/og/default.svg` is a placeholder. **Export a 1200×630 PNG** (some social
platforms don't render SVG OG images) and update the default in
`src/layouts/BaseLayout.astro`. Per-work OG currently uses the work's own image.

### 4b. Collection collect/marketplace URLs
Every Collection card's **Collect** (Transient Labs) and **View on [marketplace]**
(SuperRare/OpenSea) link is a `TODO` placeholder in `src/data/works.ts`
(`collectUrl`, `marketplace.url`). Paste the real per-work URLs there; the card's
`offers` JSON-LD and the live links populate automatically (placeholders render
dimmed and emit no fake `offers`). Also set the Transient Labs fallback profile URL
in [CollectionCard.astro](src/components/CollectionCard.astro).

### 4c. Releases database (import the spreadsheet)
`/releases` is driven by [`src/data/releases.ts`](src/data/releases.ts) — currently
seeded with placeholder availability/floor figures. To load the real data, export
the studio sheet to CSV with this exact header row, then hand it over (or paste it
in) and it maps 1:1 onto the `Release` type:

```
title, series, year, chain, platform, editionSize, available, status, floor, currency, url, slug, badge
```

- `series` — e.g. Filthy Fiat, Decentral Eyes, Landscapes, Landmark, Collaborations
- `status` — `available` | `sold out` | `reserved` | `secondary only`
- `floor` — number (or blank for unknown → shows "—"); `currency` e.g. ETH/USD/BTC
- `available` / `editionSize` — pieces left / total minted (use 1 for 1/1s)
- `slug` — matching `/work/<slug>` page if one exists (links the title)

Floor/availability are static (updated by re-importing the sheet). If you later want
live floor prices, this is where a marketplace API would plug in.

### 5. The inquiry form endpoint
`src/components/InquireForm.astro` posts to a placeholder Formspree URL. Replace
`action="https://formspree.io/f/your-form-id"` with your real endpoint (Formspree,
Basin, etc.) so inquiries reach the artist **and** Eterno Gallery, Lisbon. Until
configured, the form falls back to a normal POST; a `mailto:` link is always shown.

### 6. Facts to confirm / links to add
Search the codebase for these markers and fill them in:

- `[TO ADD]` / `[TO CONFIRM]` / `[CONFIRM]` — mostly in `src/data/site.ts`
  (provenance receipt URLs), `src/data/works.ts` (on-chain & marketplace URLs,
  the Decentral Eyes subject, real kinetic-work titles), and `site.ts` contacts.
- Provenance receipt links: Christie's lot, Sotheby's *MaxStealth*, Bonhams *CryptOGs*,
  Eterno + Gazelli gallery pages.
- On-chain record URL for the 2018 work (`works.ts` → `onchain.url`).

---

## SEO & AI discoverability

- **Semantic, server-rendered HTML** — no content is hidden behind JS; interactive
  effects only enhance. Deep-linkable URLs for every work.
- **JSON-LD (schema.org)** on every page: `Person`/`VisualArtist`, `VisualArtwork`
  (creator, dateCreated, artMedium, artform, provenance), `WebSite`, `BreadcrumbList`.
  Generators in `src/data/jsonld.ts`.
- **Answer-first copy** — bios and captions open with a self-contained, citable fact.
- **`public/robots.txt`** explicitly allows major AI crawlers (GPTBot, OAI-SearchBot,
  ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, …).
- **`public/llms.txt`** — plain-text map of key pages + core facts for language models.
- **`sitemap-index.xml` / `sitemap-*.xml`** generated at build via `@astrojs/sitemap`.
- Set the canonical domain in `astro.config.mjs` (`site`) if it ever changes.

All factual text (names, dates, institutions) is live, selectable HTML — never baked
into images. Provide real `alt` text when you swap in images.

---

## Visual system (punk-rock × gallery)

Gallery-grade bones, punk skin — the design tokens live in
[src/styles/global.css](src/styles/global.css):

- **Type:** brutal condensed **Anton** (uppercase) for big headlines; DIY
  typewriter **Special Elite** for eyebrows, UI labels, buttons; refined serif
  for editorial ledes/quotes (the contrast is what keeps it collector-ready).
  Both web fonts load in [BaseLayout.astro](src/layouts/BaseLayout.astro) with
  hard system fallbacks — swap or self-host there.
- **Palette:** dark field + brass (`--gold`, collector luxury) + a red/cyan
  **anaglyph** accent pair (`--red` / `--cyan`, punk energy, on-theme with the 3D work).
- **Texture:** a subtle film-grain wash (`body::after`, SVG noise) and screenprint
  hard-shadow buttons. Tune grain via the `opacity` on `body::after`.

## Accessibility & performance

- Honors `prefers-reduced-motion`: parallax/anaglyph/collage transitions stop, the
  artwork stays static (global off-ramp in `src/styles/global.css`, plus per-component).
- Every pointer interaction has a touch translation; drag pieces are keyboard-nudgeable.
- Skip link, focus-visible outlines, semantic headings, captioned video.
- Images lazy-load; CSS is inlined where small; no heavy 3D/WebGL engine.
- No `localStorage`/`sessionStorage` anywhere.

---

## Project structure

```
src/
  components/   # sections + the 4 signature interactive islands + chrome
  data/         # site.ts (facts/provenance/pillars), works.ts (artworks), jsonld.ts
  layouts/      # BaseLayout.astro (SEO, OG, JSON-LD)
  pages/        # index, [pillar], work/[slug], editions, about, 404
  styles/       # global.css (design system)
public/
  works/        # placeholder layered SVGs + image placeholders (swap for real assets)
  clips/        # (empty) interview clips + documentary
  robots.txt, llms.txt, favicon.svg, og/
astro.config.mjs   # site URL + sitemap
```

To **add a new artwork**: append an entry to `src/data/works.ts`. A work page,
gallery entry, sitemap URL, and JSON-LD are generated automatically. Set
`featured: true` to make it a pillar's hero, or `curated: true` for the small set.
