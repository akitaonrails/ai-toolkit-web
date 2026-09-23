// Blog posts this site points to. Titles and summaries live in the `writing` catalog under articles.<id>;
// the address, date and subject stay here. Every address is the English edition on akitaonrails.com.
import type { Hue } from './site';

export interface Article { id: string; path: string; date: string; hue: Hue }

const blog = 'https://akitaonrails.com';
export const articleUrl = (a: Article) => `${blog}${a.path}`;

export const articles = {
  benchmarkLatest: { path: '/en/2026/09/23/llm-benchmark-v4-opus-5-5-gpt-6-sol-luna-mimo-2-6-grok-4-7/', date: '2026-09-23', hue: 'rose' },
  benchmarkPart1: { path: '/en/2026/09/15/new-llm-benchmark-v4-retesting-all-top-llms-part-1/', date: '2026-09-15', hue: 'rose' },
  benchmarkPart2: { path: '/en/2026/09/15/new-llm-benchmark-v4-retesting-39-llms-part-2/', date: '2026-09-15', hue: 'rose' },
  shipMore: { path: '/en/2026/09/22/stop-making-excuses-and-ship-more-the-premise-changed/', date: '2026-09-22', hue: 'violet' },
  skills: { path: '/en/2026/09/17/talking-about-my-ai-skills/', date: '2026-09-17', hue: 'violet' },
  nesToSms: { path: '/en/2026/09/07/ai-challenge-converting-nes-roms-to-master-system-sms/', date: '2026-09-07', hue: 'orange' },
  aiMemory2: { path: '/en/2026/09/02/ai-memory-2-0-best-memory-system-for-agents-and-teams/', date: '2026-09-02', hue: 'teal' },
  hotTake: { path: '/en/2026/08/18/hot-take-harness-loop-engineering-graph-engineering-are-bullshit/', date: '2026-08-18', hue: 'red' },
  dayToDay: { path: '/en/2026/07/12/using-ai-to-solve-my-little-day-to-day-problems/', date: '2026-07-12', hue: 'amber' },
  protect: { path: '/en/2026/07/11/how-to-protect-yourself-from-agents-deleting-your-stuff/', date: '2026-07-11', hue: 'orange' },
  openSourceAi: { path: '/en/2026/06/05/ai-controversy-open-source-project-contributions-my-take/', date: '2026-06-05', hue: 'violet' },
  bestPractices: { path: '/en/2026/05/30/open-source-best-practices-llm-the-minimum/', date: '2026-05-30', hue: 'blue' },
  cleanCode: { path: '/en/2026/04/20/clean-code-for-ai-agents/', date: '2026-04-20', hue: 'blue' },
  multiModel: { path: '/en/2026/04/18/llm-benchmarks-part-2-multi-model/', date: '2026-04-18', hue: 'rose' },
  chronicles: { path: '/en/2026/02/16/vibe-code-zero-to-production-in-6-days-the-m-akita-chronicles/', date: '2026-02-16', hue: 'orange' },
  aiKilled: { path: '/en/2026/02/08/rant-ai-killed-programmers/', date: '2026-02-08', hue: 'red' },
  usagebarPost: { path: '/en/2026/05/24/i-built-a-waybar-widget-for-omarchy-to-monitor-llm-usage-ai-usagebar/', date: '2026-05-24', hue: 'blue' },
  toolkitTips: { path: '/en/2026/05/24/akita-ai-tips-toolkit-ai-jail-ai-memory-ai-usagebar/', date: '2026-05-24', hue: 'violet' },
  tuiPost: { path: '/en/2026/06/08/playing-with-tuis-llms-ratatui-bubbletea/', date: '2026-06-08', hue: 'red' },
  memorySwitch: { path: '/en/2026/07/20/whats-new-ai-memory-switch-agents-without-losing-session/', date: '2026-07-20', hue: 'teal' },
  ghpendingPost: { path: '/en/2026/05/23/i-built-a-cli-to-check-my-github-pending-stuff-ghpending/', date: '2026-05-23', hue: 'amber' },
  githubBlock: { path: '/en/2026/06/11/bypassing-github-api-block-brazil/', date: '2026-06-11', hue: 'amber' },
  bend2: { path: '/en/2026/09/19/new-ai-language-just-released-bend-2/', date: '2026-09-19', hue: 'red' },
  memoryPost: { path: '/en/2026/05/23/i-built-memory-system-for-coding-agents-ai-memory/', date: '2026-05-23', hue: 'teal' },
  jailUpdate: { path: '/en/2026/07/25/ai-jail-security-update-docker-opt-in/', date: '2026-07-25', hue: 'orange' },
  typesafe: { path: '/en/2026/09/16/why-things-like-typesafe-ai-dont-interest-me/', date: '2026-09-16', hue: 'red' },
  omarchyDualGpu: { path: '/en/2026/01/21/omarchy-3-dual-gpu-setup-with-amd-and-nvidia/', date: '2026-01-21', hue: 'blue' },
  omarchyThinkpad: { path: '/en/2026/04/18/omarchy-on-thinkpad-t14-gen-6/', date: '2026-04-18', hue: 'blue' },
  nwOmarchy: { path: '/en/2026/05/01/nw-omarchy-xlibre-inaugural/', date: '2026-05-01', hue: 'blue' },
  emuDistrobox: { path: '/en/2026/04/11/emulation-distrobox-with-claude-code/', date: '2026-04-11', hue: 'orange' },
  racingGames: { path: '/en/2026/04/19/my-favorite-retro-racing-games-on-distrobox/', date: '2026-04-19', hue: 'orange' },
  marathon: { path: '/en/2026/05/14/wrapping-up-my-ai-marathon-success-or-failure/', date: '2026-05-14', hue: 'violet' },
} satisfies Record<string, Omit<Article, 'id'>>;

export type ArticleId = keyof typeof articles;
export const pick = (...ids: ArticleId[]): Article[] => ids.map((id) => ({ id, ...articles[id] }));
/** The same posts, newest first. Used by the "More on my blog" lists. */
export const newest = (...ids: ArticleId[]): Article[] => pick(...ids).sort((a, b) => b.date.localeCompare(a.date));

/** "More on my blog" on each page: the owner's most recent posts on that subject (docs/sources.md, section 3). */
export const related = {
  usagebar: ['usagebarPost', 'memorySwitch', 'tuiPost', 'toolkitTips'],
  ghpending: ['ghpendingPost', 'githubBlock', 'bend2', 'skills'],
  tclock: ['dayToDay', 'bend2', 'tuiPost', 'skills'],
  workflow: ['skills', 'shipMore', 'hotTake', 'openSourceAi', 'marathon'],
  games: ['emuDistrobox', 'racingGames', 'dayToDay'],
  omarchy: ['omarchyDualGpu', 'omarchyThinkpad', 'nwOmarchy'],
  orchestration: ['hotTake', 'typesafe', 'toolkitTips'],
  memory: ['aiMemory2', 'memorySwitch', 'memoryPost'],
  jail: ['jailUpdate', 'protect'],
} satisfies Record<string, ArticleId[]>;

/** The LLM Benchmark v4 numbers, from the Part 1 and Part 2 posts and the latest update. */
export const benchmark = {
  repo: 'https://github.com/akitaonrails/llm-coding-benchmark',
  models: 39,
  sabotages: 14,
  sprints: 7,
  costUsd: 4000,
  days: 9,
  // The most recent round added to the v4 table, and when.
  latestRound: { models: 5, date: '2026-09-23' },
};
