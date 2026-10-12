// Collectors who hold Coldie 1/1s across more than one wallet. Each group counts as
// one collector — tenure, piece count and the leaderboard combine, the first wallet is
// the canonical one (use the current holder), the label is how they're shown, and
// filtering by any member wallet surfaces the whole group. Add groups as you learn them
// (addresses lowercase).
export const COLLECTOR_GROUPS: { label: string; wallets: string[] }[] = [
  { label: 'j1mmy', wallets: ['0x8ad272ac86c6c88683d9a60eb8ed57e6c304bb0c', '0xf22742f06e4f6d68a8d0b49b9f270bb56affab38'] },
  { label: 'snow', wallets: ['0xa362a9676db12606d339d10433c1af3618bca1d4', '0x6b3ab283947afb581a461770d7c52d47b2624788'] },
  // Migrated seb → momus → the current (unnamed) wallet; all one collector.
  {
    label: 'momuscollection',
    wallets: [
      '0xb2892b27eb4fcfd6169e8e5f6bb88c1456b4f994', // current holder (unnamed)
      '0xe25c73435702fed11e9c5584ce6efe7cbff71739', // momuscollection
      '0xdc19d539369c3da9172de453c05bc503c9ac6bc2', // sebdcl
      '0xc8512022e8d045b9d7b6c6e98d38605cd56ed5f6', // sebmomus
    ],
  },
];
