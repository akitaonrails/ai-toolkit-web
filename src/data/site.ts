import reposJson from './repos.json';

export const site = {
  name: "Akita's AI Lair",
  // The production domain. astro.config.mjs reads it from here.
  url: 'https://ailair.akitaonrails.com',
  github: 'https://github.com/akitaonrails',
  blog: 'https://akitaonrails.com',
  // English posts live under /en/ on the blog; Portuguese is the blog's default.
  blogEn: 'https://akitaonrails.com/en',
  author: 'Fabio Akita',
  authorUrl: 'https://akitaonrails.com/en/about/',
  email: 'boss@akitaonrails.com',
};

export type Hue = 'red' | 'orange' | 'amber' | 'teal' | 'blue' | 'violet' | 'rose';
export interface NavLink { id: string; href: string; hue: Hue }

// Labels and notes live in common.json under nav.<id>. One hue per subject, everywhere that subject appears.
// The hues come from the tools' own terminals: tclock's red digits, ghpending's amber headers, the blue gauge
// in the Omarchy panel. Green is never a subject: it is the one action color. See docs/design-system.md.
export const nav: NavLink[] = [
  { id: 'workflow', href: '/workflow/', hue: 'violet' },
  { id: 'usagebar', href: '/ai-usagebar/', hue: 'blue' },
  { id: 'ghpending', href: '/ghpending/', hue: 'amber' },
  { id: 'tclock', href: '/clock-tui/', hue: 'red' },
  { id: 'writing', href: '/writing/', hue: 'rose' },
  { id: 'newsletter', href: '/newsletter/', hue: 'rose' },
  { id: 'podcasts', href: '/podcasts/', hue: 'amber' },
  { id: 'games', href: '/games/', hue: 'orange' },
  { id: 'setup', href: '/setup/', hue: 'teal' },
];
export const extras: NavLink[] = [];
/** In the top bar these pages sit under one "Tools" menu, placed where the first of them appears in `nav`. */
export const toolIds = ['usagebar', 'ghpending', 'tclock'];

/** Repositories whose stars and latest release the build reads (src/data/github.ts). The list is JSON so the
    plain-JS snapshot script can read it too. */
export const repos = reposJson;
export type RepoId = keyof typeof repos;
export const repoUrl = (id: RepoId) => `https://github.com/${repos[id]}`;

/** The two tools with their own sites. ai-memory's address is temporary until aimemory.io is live. */
export const sisters = {
  jail: { url: 'https://aijail.io', hue: 'orange' as Hue },
  memory: { url: 'https://aimemorybr.netlify.app', hue: 'teal' as Hue },
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
  { id: 'x', url: 'https://x.com/AkitaOnRails', handle: '@AkitaOnRails', hue: 'red' as Hue },
  { id: 'linkedin', url: 'https://www.linkedin.com/in/akitaonrails/', handle: 'akitaonrails', hue: 'blue' as Hue },
  { id: 'instagram', url: 'https://www.instagram.com/akitaonrails/', handle: '@akitaonrails', hue: 'rose' as Hue },
  { id: 'youtube', url: 'https://www.youtube.com/@Akitando', handle: 'Akitando', hue: 'amber' as Hue },
  { id: 'blog', url: 'https://akitaonrails.com/en/', handle: 'akitaonrails.com', hue: 'violet' as Hue },
  { id: 'github', url: 'https://github.com/akitaonrails', handle: 'akitaonrails', hue: 'teal' as Hue },
] as const;
