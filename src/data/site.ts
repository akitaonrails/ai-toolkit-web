import reposJson from './repos.json';

export const site = {
  name: "Akita's AI Lair",
  // The production domain. astro.config.mjs reads it from here.
  url: 'https://ailair.akitaonrails.com',
  github: 'https://github.com/akitaonrails',
  // This site's own source. The header's GitHub icon points here so readers can open issues and PRs.
  repo: 'https://github.com/akitaonrails/ai-toolkit-web',
  blog: 'https://akitaonrails.com',
  // English posts live under /en/ on the blog; Portuguese is the blog's default.
  blogEn: 'https://akitaonrails.com/en',
  author: 'Fabio Akita',
  authorUrl: 'https://akitaonrails.com/en/about/',
  email: 'boss@akitaonrails.com',
};

export type Hue = 'pennant' | 'copper' | 'jade' | 'patina' | 'cerulean' | 'amethyst' | 'mauve';
export interface NavLink { id: string; href: string; hue: Hue }

// Labels and notes live in common.json under nav.<id>. One hue per subject, everywhere that subject appears.
// The hues come from the tools' own terminals: tclock's red digits, ghpending's amber headers, the blue gauge
// in the Omarchy panel. Green is never a subject: it is the one action color. See docs/design-system.md.
export const nav: NavLink[] = [
  { id: 'workflow', href: '/workflow/', hue: 'amethyst' },
  { id: 'usagebar', href: '/ai-usagebar/', hue: 'cerulean' },
  { id: 'ghpending', href: '/ghpending/', hue: 'jade' },
  { id: 'tclock', href: '/clock-tui/', hue: 'pennant' },
  { id: 'frank', href: '/frank/', hue: 'amethyst' },
  { id: 'book', href: '/book/', hue: 'jade' },
  { id: 'agi', href: '/agi/', hue: 'pennant' },
  { id: 'limits', href: '/limits/', hue: 'cerulean' },
  { id: 'students', href: '/students/', hue: 'jade' },
  { id: 'writing', href: '/writing/', hue: 'mauve' },
  { id: 'newsletter', href: '/newsletter/', hue: 'mauve' },
  { id: 'podcasts', href: '/podcasts/', hue: 'jade' },
  { id: 'games', href: '/games/', hue: 'copper' },
  { id: 'setup', href: '/setup/', hue: 'patina' },
];
/** Every page is a pavilion at the fair: its color (the hue above), the pattern its hero wears (a `.motif-*` class in
    global.css) and its poster (src/assets/img/gen/poster-<id>.webp, generated from scripts/prompts/poster-<id>.txt).
    A new page gets a row here, a poster prompt, and a motif that no neighbor in the same menu uses. docs/design-system.md. */
export type Motif = 'sunburst' | 'shelves' | 'radio' | 'gears' | 'checker' | 'blueprint' | 'waves' | 'fans' | 'chevrons';
export const pavilions: Record<string, { motif: Motif; poster: string }> = {
  home: { motif: 'sunburst', poster: 'poster-home' },
  book: { motif: 'shelves', poster: 'poster-book' },
  agi: { motif: 'sunburst', poster: 'poster-agi' },
  students: { motif: 'blueprint', poster: 'poster-students' },
  limits: { motif: 'waves', poster: 'poster-limits' },
  writing: { motif: 'chevrons', poster: 'poster-writing' },
  workflow: { motif: 'gears', poster: 'poster-workflow' },
  usagebar: { motif: 'radio', poster: 'poster-usagebar' },
  ghpending: { motif: 'fans', poster: 'poster-ghpending' },
  tclock: { motif: 'chevrons', poster: 'poster-tclock' },
  frank: { motif: 'blueprint', poster: 'poster-frank' },
  newsletter: { motif: 'radio', poster: 'poster-newsletter' },
  podcasts: { motif: 'waves', poster: 'poster-podcasts' },
  games: { motif: 'checker', poster: 'poster-games' },
  setup: { motif: 'gears', poster: 'poster-setup' },
  notfound: { motif: 'waves', poster: 'poster-404' },
};
// Pages outside the top bar: listed in the footer and llms.txt, linked from related pages.
export const extras: NavLink[] = [];
/** In the top bar these pages sit under one "Tools" menu, placed where the first of them appears in `nav`. */
export const toolIds = ['usagebar', 'ghpending', 'tclock', 'frank'];
/** Dropdown groups in the top bar (and headings in the drawer). Each sits where its first page appears in `nav`;
    `label` is the catalog key of the button. Tools also lists the external sites after its own pages. */
export const navGroups: { id: string; label: string; ids: string[]; external?: boolean }[] = [
  { id: 'tools', label: 'nav.tools.label', ids: toolIds, external: true },
  { id: 'learn', label: 'nav.learn.label', ids: ['book', 'agi', 'limits', 'students', 'writing'] },
];

/** Repositories whose stars and latest release the build reads (src/data/github.ts). The list is JSON so the
    plain-JS snapshot script can read it too. */
export const repos = reposJson;
export type RepoId = keyof typeof repos;
export const repoUrl = (id: RepoId) => `https://github.com/${repos[id]}`;

/** The two tools with their own sites. */
export const sisters = {
  jail: { url: 'https://aijail.io', hue: 'copper' as Hue },
  memory: { url: 'https://aimemory.sh', hue: 'patina' as Hue },
};
export type SisterId = keyof typeof sisters;
/** Both sister sites use the same routes as this one (English at the root, the rest under /<locale>/), so readers stay in their language. */
export const sisterUrl = (id: SisterId, locale = 'en') => `${sisters[id].url}/${locale === 'en' ? '' : `${locale}/`}`;

/** Third-party tools on the setup page. */
export const thirdParty = {
  omarchy: 'https://omarchy.org', foundation: 'https://omarchy.org/foundation/', donate: 'https://donate.omarchy.org',
  tmux: 'https://github.com/tmux/tmux', herdr: 'https://herdr.dev',
  conductor: 'https://www.conductor.build', claudeSquad: 'https://github.com/smtg-ai/claude-squad',
};

/** Tools with their own sites, listed after the on-site tools in the Tools menu and drawer. Labels in common.json nav.<id>. */
export const externalTools: { id: SisterId; hue: Hue }[] = [
  { id: 'memory', hue: sisters.memory.hue },
  { id: 'jail', hue: sisters.jail.hue },
];

export const newsletter = { url: 'https://themakitachronicles.com', blog: 'https://blog.themakitachronicles.com', spotify: 'https://open.spotify.com/show/7MzG2UB7IAkC3GAwEXEIVD' };

/** YouTube playlists with every appearance, beyond the handful on the podcasts page (owner, 2026-09-23). */
export const playlists = {
  talks: 'https://www.youtube.com/playlist?list=PLdsnXVqbHDUf73fY4oNcXIuAjxGf8hTjj',
  interviews: 'https://www.youtube.com/playlist?list=PLdsnXVqbHDUcjiwcY87avf7RWuQX5cF9g',
};

/** Where to follow. Handles and descriptions live in common.json under social.<id>. */
export const social = [
  { id: 'x', url: 'https://x.com/AkitaOnRails', handle: '@AkitaOnRails', hue: 'pennant' as Hue },
  { id: 'linkedin', url: 'https://www.linkedin.com/in/akitaonrails/', handle: 'akitaonrails', hue: 'cerulean' as Hue },
  { id: 'instagram', url: 'https://www.instagram.com/akitaonrails/', handle: '@akitaonrails', hue: 'mauve' as Hue },
  { id: 'youtube', url: 'https://www.youtube.com/@Akitando', handle: 'Akitando', hue: 'jade' as Hue },
  { id: 'blog', url: 'https://akitaonrails.com/en/', handle: 'akitaonrails.com', hue: 'amethyst' as Hue },
  { id: 'github', url: 'https://github.com/akitaonrails', handle: 'akitaonrails', hue: 'patina' as Hue },
] as const;
