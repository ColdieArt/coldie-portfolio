// Pulls every artwork Coldie created on SuperRare and writes src/data/superrare.json,
// which src/data/releases.ts merges into the /archive timeline.
//
//   node scripts/import-superrare.mjs
//
// Uses the same endpoint superrare.com/coldie calls to page through "Created".
// Tokens on generative / collection contracts (Talking Heads, Market PsycholOGy…)
// are summarised under `collections` instead of listed one by one — those drops are
// already individual entries in releases.ts.

import { writeFile } from 'node:fs/promises';

const USERNAME = 'coldie';
const ENDPOINT = 'https://superrare.com/api/trpc/profile.getCreations?batch=1';
const PAGE = 50;
const OUT = new URL('../src/data/superrare.json', import.meta.url);

// SuperRare shared 1/1 contracts + the artist's own sovereign contracts → listed per token.
// Anything else with many tokens is treated as a collection.
const COLLECTION_MIN_TOKENS = 10;

async function page(cursor) {
  const body = {
    0: {
      json: {
        creatorUsername: USERNAME,
        orderBy: 'DATE_MINTED_DESC',
        take: PAGE,
        searchQuery: '',
        filterBy: 'isApprovedCreator:=true',
        showAvailableOnly: false,
        includeMintProgress: false,
        chainId: 1,
        cursor,
        direction: 'forward',
      },
    },
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'user-agent': 'Mozilla/5.0' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`SuperRare ${res.status} at cursor ${cursor}`);
  const [{ result }] = await res.json();
  return result.data.json;
}

const artworks = [];
for (let cursor = 0; ; cursor += PAGE) {
  const { artworks: batch, hasNextPage } = await page(cursor);
  artworks.push(...batch);
  if (!hasNextPage || batch.length < PAGE) break;
}

const byContract = Map.groupBy(artworks, (a) => a.contractAddress);
const isoDate = (s) => new Date(s * 1000).toISOString().slice(0, 10);

const tokens = [];
const collections = [];
for (const [contract, items] of byContract) {
  if (items.length >= COLLECTION_MIN_TOKENS && !isSharedOneOfOne(items)) {
    const ts = items.map((a) => a.createdAt).sort((x, y) => x - y);
    collections.push({
      contract,
      name: items[0].metadata?.name?.replace(/\s*#\d+$/, '') ?? contract,
      tokens: items.length,
      firstMint: isoDate(ts[0]),
      lastMint: isoDate(ts.at(-1)),
    });
    continue;
  }
  for (const a of items) {
    tokens.push({
      title: (a.metadata?.name ?? `Token ${a.tokenId}`).trim(),
      date: isoDate(a.createdAt),
      contract,
      tokenId: String(a.tokenId),
      media: a.metadata?.mediaDetails?.mediaType ?? null,
      image: a.metadata?.mediaDetails?.imageUri ?? null,
      video: a.metadata?.mediaDetails?.videoUri ?? null,
      collaborator: a.acceptedCollaborator?.username ?? null,
    });
  }
}

// A collection's tokens share a name stem ("Talking Heads #12"); shared 1/1 contracts don't.
function isSharedOneOfOne(items) {
  const stems = new Set(items.map((a) => (a.metadata?.name ?? '').replace(/\s*#\d+$/, '')));
  return stems.size > items.length / 2;
}

tokens.sort((a, b) => a.date.localeCompare(b.date) || Number(a.tokenId) - Number(b.tokenId));
const out = {
  source: `https://superrare.com/${USERNAME}`,
  fetchedAt: new Date().toISOString().slice(0, 10),
  totalTokens: artworks.length,
  tokens,
  collections,
};
await writeFile(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`${tokens.length} 1/1s, ${collections.length} collections (${artworks.length} tokens) → src/data/superrare.json`);
