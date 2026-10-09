// Who a release portrays — used by the Decentral Eyes hub and (next) one page per subject.
// Matched against release titles, first match wins.

import type { Release } from './releases';

// `cover` pins which release's image represents the subject on the hub grid,
// overriding the default (highest last sale). Use a release id.
export type Subject = { key: string; name: string; match: RegExp; cover?: string };

export const SUBJECTS: Subject[] = [
  { key: 'vitalik-buterin', name: 'Vitalik Buterin', match: /vitalik/i, cover: 'sr-b932a7-12380' },
  { key: 'satoshi-nakamoto', name: 'Satoshi Nakamoto', match: /satoshi nakamoto/i },
  { key: 'edward-snowden', name: 'Edward Snowden', match: /snowden/i },
  { key: 'andreas-antonopoulos', name: 'Andreas Antonopoulos', match: /antonopoulos/i },
  { key: 'warren-buffett', name: 'Warren Buffett', match: /buffett?\b/i },
  { key: 'john-mcafee', name: 'John McAfee', match: /mcafee/i },
  { key: 'winklevoss-twins', name: 'Winklevoss twins', match: /winklevoss/i },
  { key: 'julian-assange', name: 'Julian Assange', match: /assange/i },
  { key: 'dalai-lama', name: 'Dalai Lama', match: /dalai lama/i },
  { key: 'kitty', name: 'Kitty', match: /^kitty\b/i },
  { key: 'alan-turing', name: 'Alan Turing', match: /turing/i },
  { key: 'snoop-dogg', name: 'Snoop Dogg', match: /\bdogg\b/i },
  { key: 'gary-gensler', name: 'Gary Gensler', match: /gensler/i },
  { key: 'pascal-gauthier', name: 'Pascal Gauthier', match: /pascal gauthier/i },
  { key: 'brian-armstrong', name: 'Brian Armstrong', match: /brian armstrong/i },
  { key: 'jack-dorsey', name: 'Jack Dorsey', match: /dorsey/i },
  { key: 'donald-trump', name: 'Donald Trump', match: /trump/i },
  { key: 'tech-overlords', name: 'Tech overlords', match: /tech epochalypse/i },
  { key: 'michael-saylor', name: 'Michael Saylor', match: /saylor/i },
];

export const subjectOf = (r: Pick<Release, 'title'>): Subject | undefined =>
  SUBJECTS.find((s) => s.match.test(r.title));
