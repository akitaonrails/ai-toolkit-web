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
} satisfies Record<string, Omit<Article, 'id'>>;

export type ArticleId = keyof typeof articles;
export const pick = (...ids: ArticleId[]): Article[] => ids.map((id) => ({ id, ...articles[id] }));

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
