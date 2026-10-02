import { site } from './site';
import type { Work } from './works';

// schema.org generators. These hand engines the facts in machine-readable form.

export function personLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['Person', 'VisualArtist'],
    '@id': `${site.url}/#person`,
    name: site.name,
    description: site.oneLineBio,
    url: site.url,
    jobTitle: 'Stereoscopic-3D and kinetic artist',
    homeLocation: { '@type': 'Place', name: site.location },
    knowsAbout: [
      'Stereoscopy',
      'Lenticular printing',
      'Anaglyph 3D',
      'Kinetic art',
      'Blockchain provenance',
    ],
    sameAs: [site.social.instagram, site.social.x],
  };
}

export function websiteLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.subhead,
    inLanguage: 'en',
    publisher: { '@id': `${site.url}/#person` },
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: new URL(t.path, site.url).href,
    })),
  };
}

export function artworkLd(work: Work): Record<string, unknown> {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    '@id': `${site.url}/work/${work.slug}/#artwork`,
    name: work.title,
    creator: { '@id': `${site.url}/#person` },
    dateCreated: String(work.year),
    artMedium: work.medium,
    artform: work.artform,
    url: `${site.url}/work/${work.slug}`,
    abstract: work.caption,
  };
  if (work.dimensions) ld.size = work.dimensions;
  if (work.edition) ld.artEdition = work.edition;
  if (work.series === 'filthy-fiat') {
    ld.isPartOf = { '@id': `${site.url}/filthy-fiat/#project` };
  }
  if (work.image || work.layers?.length) {
    ld.image = new URL(work.image ?? work.layers![work.layers!.length - 1].src, site.url).href;
  }
  if (work.provenance?.length) {
    ld.provenance = work.provenance.map((p) => p.label).join('; ');
    // Connect the artwork to its verifiable sale/exhibition sources so engines
    // can link the work to its provenance. Only real (non-placeholder) externals.
    const sources = work.provenance
      .filter((p) => p.href && p.href.startsWith('http') && !p.todo)
      .map((p) => p.href as string);
    if (sources.length) {
      ld.subjectOf = sources.map((url) => ({ '@type': 'CreativeWork', url }));
      ld.sameAs = sources;
    }
  }
  if (work.onchain) {
    ld.dateCreated = String(work.year);
    ld.disambiguatingDescription = `Minted ${work.onchain.minted} on ${work.onchain.chain} via ${work.onchain.platform}.`;
    if (work.onchain.url) ld.sameAs = [...((ld.sameAs as string[]) ?? []), work.onchain.url];
  }
  // Collect/marketplace links → offers (only real, non-placeholder URLs).
  const offers: Record<string, unknown>[] = [];
  if (work.collectUrl) {
    offers.push({
      '@type': 'Offer',
      url: work.collectUrl,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${site.url}/#person` },
    });
  }
  if (work.marketplace?.url) {
    offers.push({ '@type': 'Offer', url: work.marketplace.url, seller: work.marketplace.name });
  }
  if (offers.length) ld.offers = offers;
  return ld;
}

// The Collection hub — a CollectionPage whose parts are the tokenized works.
export function collectionPageLd(works: Work[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${site.url}/collection/#collection`,
    name: 'Collection — physical & digital works by Coldie',
    url: `${site.url}/collection`,
    about: { '@id': `${site.url}/#person` },
    isPartOf: { '@id': `${site.url}/#website` },
    hasPart: works.map((w) => artworkLd(w)),
  };
}

// Filthy Fiat — project/series as a CreativeWork; member works are isPartOf it.
export function filthyFiatLd(memberSlugs: string[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${site.url}/filthy-fiat/#project`,
    name: 'Filthy Fiat',
    creator: { '@id': `${site.url}/#person` },
    url: `${site.url}/filthy-fiat`,
    sameAs: ['https://filthyfiat.money'],
    abstract:
      'Filthy Fiat is an art project by Coldie that transforms U.S. dollar bills he buried — and that were destroyed by mold — into a commentary on the fragility of fiat currency.',
    hasPart: memberSlugs.map((slug) => ({ '@id': `${site.url}/work/${slug}/#artwork` })),
  };
}
