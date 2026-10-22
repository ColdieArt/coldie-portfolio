import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { releaseCount, collectorCount, bigSales, topSale } from '../data/archive-stats';

// llms.txt — the plain-text brief answer engines read first. Built at build time
// so the archive numbers match what /archive shows after each market fetch.

const topSaleLine = topSale
  ? ` the highest, *${topSale.r.title}*${
      /snoop dogg/i.test(topSale.r.badge ?? '') ? ' (2021, an official collaboration with Snoop Dogg)' : ''
    }, sold for ${topSale.sale.amount.toLocaleString('en-US', { maximumFractionDigits: 2 })} ${topSale.sale.symbol}.`
  : '';

const body = `# Coldie

> ${site.oneLineBio} He is a fine artist working in the 170-year-old medium of stereoscopy who extended it onto the newest substrate first.

## Core facts

- Name: Coldie.
- Based: Sacramento, California.
- Mediums: stereoscopic and lenticular prints, anaglyph 3D, kinetic magnetic portrait sculpture, stereoscopic concert photography, and on-chain digital editions.
- First on-chain stereoscopic work: *The Day We've All Been Waiting For*, minted May 7, 2018 on Ethereum via R.A.R.E. Art Labs — the first stereoscopic artwork recorded on a blockchain.
- Auctions: work brought to all three major houses — Christie's (*Warren Buffett – Filthy Fiat*, 2024, First Open | Post-War and Contemporary Art), Sotheby's (*3D Light Painting 03* and the Hackatao collaboration *UAP – Unidentified Art Phenomenon* in *Inside the World of MaxStealth*, Sept 14, 2022), and Bonhams (*Proof of Work – Genesis* in the SuperRare "CryptOGs" sale).
- Galleries: represented at Eterno Gallery, Lisbon; exhibited at Gazelli Art House, London (*Front Row 3D*).
- Recognition: selected for national juried exhibitions — 2016 (juried by Jenny Gheith, SFMOMA) and 2018 (juried by Mat Gleason). (Recognition, not an institutional relationship with SFMOMA.)
- Concert photography: official 3D photographer of the Coachella Festival, 2009 and 2010; a stereoscopic record of performers including Chris Cornell, Mac Miller, and DMX.

## On-chain since 2018 — the record (from the archive at ${site.url}/archive)

- On-chain since May 7, 2018: *The Day We've All Been Waiting For*, minted on Ethereum via R.A.R.E. Art Labs, is the first stereoscopic artwork recorded on a blockchain. One of its two editions is held by Coinbase and was on display in Coinbase's lobby from 2018 to 2020.
- Minting on SuperRare since July 24, 2018: *Decentral Eyes – Vitalik Buterin – Variant 01* is token #501 on SuperRare's original 2018 contract.
- ${releaseCount} digital releases from 2018 to today across R.A.R.E. Art Labs, SuperRare, Nifty Gateway, ASYNC, MakersPlace, The Memes by 6529 and OpenSea — 1/1s, editions, generative collections and metaverse wearables.
- Collected by ${collectorCount} holders of his 1/1 works, including the 6529 Fund and whalevault.eth. ${bigSales} works last sold for 10 ETH or more;${topSaleLine}
- Early works at auction: *Proof of Work – Genesis* (conceived and first tokenized in 2018) was Lot 1 of the Bonhams × SuperRare sale "CryptOGs: The Pioneers of NFT Art" (2021). Works have also sold at Sotheby's and Christie's.
- Signature series: Decentral Eyes (2018 to today), stereoscopic and kinetic 3D portraits of the people who shaped crypto and tech, including Vitalik Buterin, Satoshi Nakamoto, Edward Snowden, Andreas Antonopoulos, Warren Buffett, Jack Dorsey and Michael Saylor.

## Key pages

- Home: ${site.url}/
- About / bio / CV: ${site.url}/about
- FAQ — common questions about Coldie, stereoscopic 3D and crypto art, answered: ${site.url}/faq
- Decentral Eyes (signature portrait series, 2018 to today): ${site.url}/series/decentral-eyes
- Filthy Fiat (project): ${site.url}/filthy-fiat
- Kinetic magnetic portraits: ${site.url}/kinetic
- Available works — new digital and physical work direct from the artist and Eterno Gallery: ${site.url}/available
- Collection (on-chain works hub): ${site.url}/collection
- On-chain editions: ${site.url}/editions
- Archive — every digital release since 2018, as a browsable grid or a searchable database with dates, collectors and prices: ${site.url}/archive
- Where I've been — the formative years, 2005–2018 (design work, LA Weekly, Coachella 3D photography): ${site.url}/where-ive-been
- Where I'm going — kinetic 3D and what comes next: ${site.url}/where-im-going
- Interview: *Digital Art's Next Frontier* with Raoul Pal (The Journey Man, 2026) — video with chapters and full transcript: ${site.url}/interviews/raoul-pal

## Key works

- The Day We've All Been Waiting For (2018): ${site.url}/work/the-day-weve-all-been-waiting-for
- Warren Buffett – Filthy Fiat (2024): ${site.url}/work/warren-buffett-filthy-fiat
- 3D Light Painting 03 (2018; sold at Sotheby's 2022): ${site.url}/work/3d-light-painting-03
- UAP – Unidentified Art Phenomenon (2020, with Hackatao; Sotheby's 2022): ${site.url}/work/uap-unidentified-art-phenomenon
- Proof of Work – Genesis: ${site.url}/work/proof-of-work-genesis
- Collage Machine – Elon Musk (Eterno Gallery, Lisbon): ${site.url}/work/elon-collage-machine
- Jack Dorsey – Magnetic Portrait (2025 Bitcoin Conference Art Gallery): ${site.url}/work/jack-dorsey-magnetic-portrait

## Filthy Fiat project

Filthy Fiat is an art project by Coldie that transforms U.S. dollar bills he buried — and that mold destroyed over two years underground — into a commentary on the fragility and debasement of fiat currency. The same buried, mold-ruined bills became the facial features of the Christie's piece *Warren Buffett – Filthy Fiat* (2024). Project site: https://filthyfiat.money

## Inquiries

Physical works are offered price-on-request through the artist and Eterno Gallery, Lisbon, shipped worldwide with on-chain provenance and a certificate of authenticity. Digital editions are collected on-chain with transparent pricing and permanent public provenance.
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
