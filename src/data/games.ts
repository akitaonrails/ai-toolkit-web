// Numbers on the games page. `docs` is the count of notes in ~/Projects/distrobox-gaming/docs/ and `commits` comes
// from src/data/tally.json, both read on 2026-09-23; `menuGames` is the count shown in the launcher screenshot.
import tally from './tally.json';
import type { RepoId } from './site';

const distrobox = tally.projects.find((p) => p.name === 'distrobox-gaming');
export const games = {
  docs: 96,
  commits: distrobox?.commits ?? 0,
  since: '2026-04-11', // first commit of distrobox-gaming
  menuGames: 52,
  readOn: '2026-09-23',
};

/** Fun to Drive, a small browser game vibe coded with AI agents (github.com/akitaonrails/playmate-fun-to-drive).
    The playthrough video and its poster frame come from the repository's README (docs/media/playthrough-v090.mp4, 2:20, v0.9.0). */
export const funToDrive = {
  play: 'https://akitaonrails.github.io/playmate-fun-to-drive/',
  video: '/media/fun-to-drive.mp4',
  poster: '/media/fun-to-drive.jpg',
  width: 1280,
  height: 720,
};


/** The REA launchers: thin launchers that keep each original game untouched and rewire what aged around it.
    Facts from the owner's posts of 2026-10-29 (Colin McRae Rally 1) and 2026-11-02 (the racing launchers and the SDK),
    read on 2026-11-02; Rad Mobile from its README, read 2026-11-12; the Initial D and Wangan Midnight series from their READMEs, read
    2026-11-14, each dated by its oldest game that plays (Arcade Stage Ver. 1, 2002; Maximum Tune 3, 2007); releases come from the GitHub snapshot. Words in `games.json` `launchers.items.<id>`.
    `sdk: true` marks the launchers generated from the SDK. In the order the games came out. */
export interface Launcher { id: string; repo: RepoId; year: number; sdk?: boolean; linuxOnly?: boolean }
export const launchers: Launcher[] = [
  { id: 'radmobile', repo: 'launcherRadMobile', year: 1990 },
  { id: 'screamer', repo: 'launcherScreamer', year: 1995 },
  { id: 'cmr1', repo: 'launcherCmr1', year: 1998 },
  { id: 'sega', repo: 'launcherSega', year: 2001, sdk: true },
  { id: 'initiald', repo: 'launcherInitialD', year: 2002, sdk: true },
  { id: 'nintendo', repo: 'launcherNintendo', year: 2003, sdk: true },
  { id: 'cmr3', repo: 'launcherCmr3', year: 2003 },
  { id: 'cmr4', repo: 'launcherCmr4', year: 2004 },
  { id: 'cmr2005', repo: 'launcherCmr2005', year: 2004, sdk: true },
  { id: 'outrun', repo: 'launcherOutrun', year: 2006 },
  { id: 'dirt', repo: 'launcherDirt', year: 2007 },
  { id: 'srr', repo: 'launcherSegaRally', year: 2007 },
  { id: 'wangan', repo: 'launcherWangan', year: 2007, sdk: true },
  { id: 'dirtrally', repo: 'launcherDirtRally', year: 2015, sdk: true, linuxOnly: true },
];

/** rea-launcher-sdk numbers from the SDK post (2026-11-02): tests summed over the SDK and the ten projects in its
    table (310 + 171 + 97 + 106 + 74 + 94 + 126 + 89 + 71 + 85), the SDK's own tests and line coverage, the rules in
    `launcher-check`, and the hours each SDK-built launcher took (about 4) against the older ones (8 to 18). */
export const launcherSdk = {
  launchers: 9,
  games: 11,
  tests: 1223,
  sdkTests: 310,
  sdkCoverage: 0.95,
  rules: 33,
  hours: 4,
  readOn: '2026-11-02',
};
