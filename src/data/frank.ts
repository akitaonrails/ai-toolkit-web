// The Frank projects page: the six most starred and still maintained frank* repositories, read on 2026-09-24,
// plus five smaller ones the owner picked the same day (docs/sources.md, section 10). frank_investigator and
// frank_fbi are left out at the owner's request; FrankClaw because its README says it is not done and it has
// not been pushed since May.
// Words live in the `frank` catalog under projects.<id>; the stack line holds only product names.
import type { RepoId } from './site';
import type { ArticleId } from './articles';

export interface FrankProject { id: string; repo: RepoId; stack: string; posts: ArticleId[] }

export const frank = {
  github: 'https://github.com/akitaonrails?tab=repositories&q=frank',
  // Public repositories whose name starts with "frank", counted with `gh repo list akitaonrails`.
  count: 14,
  countDate: '2026-09-24',
  projects: [
    { id: 'frankmd', repo: 'frankmd', stack: 'Rails 8 · Docker', posts: ['frankmdPost'] },
    { id: 'sherlock', repo: 'sherlock', stack: 'Rust · Tauri · Ollama', posts: ['sherlockPost', 'neverDone'] },
    { id: 'yomik', repo: 'yomik', stack: 'Python · Ollama · Flutter · Chromium', posts: ['mangaSolution', 'yomikFail'] },
    { id: 'mega', repo: 'mega', stack: 'Rails 8.1 · SQLite', posts: ['megaPost'] },
    { id: 'karaoke', repo: 'karaoke', stack: 'Flutter · Android', posts: ['karaokePost'] },
    { id: 'scanlation', repo: 'scanlation', stack: 'Tauri · Linux, macOS, Windows', posts: ['dayToDay'] },
  ] satisfies FrankProject[],
  // Smaller ones, shown as compact cards.
  small: [
    { id: 'mangaplus', repo: 'mangaplus', stack: 'Rust · Tauri · SvelteKit', posts: ['mangaSolution'] },
    { id: 'go', repo: 'go', stack: 'Sabaki · KataGo', posts: ['frankGoPost'] },
    { id: 'type', repo: 'type', stack: 'Rails 8 · Docker', posts: ['dayToDay'] },
    { id: 'lyrics', repo: 'lyrics', stack: 'Chrome MV3 · LRCLIB', posts: ['dayToDay'] },
    { id: 'geary', repo: 'geary', stack: 'Vala · GTK', posts: ['dayToDay'] },
  ] satisfies FrankProject[],
};
