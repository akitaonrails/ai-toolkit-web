// Numbers on the games page. `docs` is the count of notes in ~/Projects/distrobox-gaming/docs/ and `commits` comes
// from src/data/tally.json, both read on 2026-09-23; `menuGames` is the count shown in the launcher screenshot.
import tally from './tally.json';

const distrobox = tally.projects.find((p) => p.name === 'distrobox-gaming');
export const games = {
  docs: 96,
  commits: distrobox?.commits ?? 0,
  since: '2026-04-11', // first commit of distrobox-gaming
  menuGames: 52,
  readOn: '2026-09-23',
};

/** Fun to Drive, a small browser game vibe coded with AI agents (github.com/akitaonrails/playmate-fun-to-drive).
    The playthrough video and its poster frame come from the repository's README (docs/media/playthrough-v060.mp4, 2:10, v0.6.0). */
export const funToDrive = {
  play: 'https://akitaonrails.github.io/playmate-fun-to-drive/',
  video: '/media/fun-to-drive.mp4',
  poster: '/media/fun-to-drive.jpg',
  width: 1280,
  height: 720,
};

