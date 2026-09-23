import reposJson from './repos.json';

export const site = {
  name: "Akita's AI Toolkit",
  // The production domain. astro.config.mjs reads it from here.
  url: 'https://aitoolkit.akitaonrails.com',
  github: 'https://github.com/akitaonrails',
  blog: 'https://akitaonrails.com',
  // English posts live under /en/ on the blog; Portuguese is the blog's default.
  blogEn: 'https://akitaonrails.com/en',
  author: 'Fabio Akita',
  authorUrl: 'https://akitaonrails.com/en/about/',
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
];
export const extras: NavLink[] = [{ id: 'games', href: '/games/', hue: 'orange' }];

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

export const newsletter = { url: 'https://themakitachronicles.com', blog: 'https://blog.themakitachronicles.com' };

/** Where to follow. Handles and descriptions live in common.json under social.<id>. */
export const social = [
  { id: 'x', url: 'https://x.com/AkitaOnRails', handle: '@AkitaOnRails', hue: 'red' as Hue },
  { id: 'linkedin', url: 'https://www.linkedin.com/in/akitaonrails/', handle: 'akitaonrails', hue: 'blue' as Hue },
  { id: 'instagram', url: 'https://www.instagram.com/akitaonrails/', handle: '@akitaonrails', hue: 'rose' as Hue },
  { id: 'youtube', url: 'https://www.youtube.com/@Akitando', handle: 'Akitando', hue: 'amber' as Hue },
  { id: 'blog', url: 'https://akitaonrails.com/en/', handle: 'akitaonrails.com', hue: 'violet' as Hue },
  { id: 'github', url: 'https://github.com/akitaonrails', handle: 'akitaonrails', hue: 'teal' as Hue },
] as const;
