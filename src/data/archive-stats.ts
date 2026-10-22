import marketJson from './market.json';
import { sortedReleases, withManualListings } from './releases';
import { COLLECTOR_GROUPS } from './collectors';

// "On the record" archive facts, computed from the data so every page that
// quotes them (the Archive, llms.txt) stays accurate after each market fetch.

type Price = { amount: number; symbol: string; usd: number | null };
type MarketEntry = {
  owner?: { address: string; artist: boolean } | null;
  lastSale: (Price & { date?: string | null }) | null;
};
const market = withManualListings(marketJson.releases as unknown as Record<string, MarketEntry>);

// Collectors who hold Coldie 1/1s across more than one wallet (see data/collectors.ts).
const walletToGroup = new Map<string, { label: string; wallets: string[] }>();
for (const g of COLLECTOR_GROUPS) for (const w of g.wallets) walletToGroup.set(w.toLowerCase(), g);
/** The wallet a collector's holdings all filter under — the group's first wallet, or itself. */
export const canonAddr = (addr: string) => (walletToGroup.get(addr.toLowerCase())?.wallets[0] ?? addr).toLowerCase();

export const releaseCount = sortedReleases.length;

export const collectorCount = new Set(
  Object.values(market).flatMap((m) => (m.owner && !m.owner.artist ? [canonAddr(m.owner.address)] : []))
).size;

const sales = sortedReleases.flatMap((r) => (market[r.id]?.lastSale ? [{ r, sale: market[r.id].lastSale! }] : []));
/** Works whose last sale was 10 ETH or more. */
export const bigSales = sales.filter((x) => x.sale.amount >= 10).length;
export const topSale = [...sales].sort((a, b) => b.sale.amount - a.sale.amount)[0];
