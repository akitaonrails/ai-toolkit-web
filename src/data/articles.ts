// Blog posts this site points to. Titles and summaries live in the `writing` catalog under articles.<id>;
// the address, date and subject stay here. Every address is the English edition on akitaonrails.com.
import type { Hue } from './site';

export interface Article { id: string; path: string; ptPath?: string; date: string; hue: Hue }

const blog = 'https://akitaonrails.com';
/** The blog publishes every post in English (under /en/) and Portuguese. Portuguese readers get the Portuguese post;
    every other language gets the English one. `ptPath` comes from the post's folder in the blog repo. */
export const articleUrl = (a: Article, locale?: string) => `${blog}${locale === 'pt-br' && a.ptPath ? a.ptPath : a.path}`;
/** The blog's home and archive in the reader's language. */
export const blogHome = (locale?: string) => (locale === 'pt-br' ? `${blog}/` : `${blog}/en/`);
export const blogArchive = (locale?: string) => `${blogHome(locale)}archives/`;

export const articles = {
  benchmarkLatest: { path: '/en/2026/09/23/llm-benchmark-v4-opus-5-5-gpt-6-sol-luna-mimo-2-6-grok-4-7/', ptPath: '/2026/09/23/llm-benchmark-v4-opus-5-5-gpt-6-sol-luna-mimo-2-6-grok-4-7/', date: '2026-09-23', hue: 'rose' },
  benchmarkPart1: { path: '/en/2026/09/15/new-llm-benchmark-v4-retesting-all-top-llms-part-1/', ptPath: '/2026/09/15/novo-llm-benchmark-v4-retestando-todos-llms-parte-1/', date: '2026-09-15', hue: 'rose' },
  benchmarkPart2: { path: '/en/2026/09/15/new-llm-benchmark-v4-retesting-39-llms-part-2/', ptPath: '/2026/09/15/novo-llm-benchmark-v4-retestando-todos-llms-parte-2/', date: '2026-09-15', hue: 'rose' },
  shipMore: { path: '/en/2026/09/22/stop-making-excuses-and-ship-more-the-premise-changed/', ptPath: '/2026/09/22/parem-de-inventar-desculpas-e-facam-mais-deploy-a-premissa-mudou/', date: '2026-09-22', hue: 'violet' },
  skills: { path: '/en/2026/09/17/talking-about-my-ai-skills/', ptPath: '/2026/09/17/falando-um-pouco-sobre-minhas-skills-de-ia/', date: '2026-09-17', hue: 'violet' },
  nesToSms: { path: '/en/2026/09/07/ai-challenge-converting-nes-roms-to-master-system-sms/', ptPath: '/2026/09/07/desafio-pra-ia-converter-roms-de-nes-pra-master-system-sms/', date: '2026-09-07', hue: 'orange' },
  aiMemory2: { path: '/en/2026/09/02/ai-memory-2-0-best-memory-system-for-agents-and-teams/', ptPath: '/2026/09/02/ai-memory-2-0-melhor-sistema-memoria-agentes-e-times/', date: '2026-09-02', hue: 'teal' },
  hotTake: { path: '/en/2026/08/18/hot-take-harness-loop-engineering-graph-engineering-are-bullshit/', ptPath: '/2026/08/18/hot-take-harness-loop-engineering-graph-engineering-sao-bullshit/', date: '2026-08-18', hue: 'red' },
  dayToDay: { path: '/en/2026/07/12/using-ai-to-solve-my-little-day-to-day-problems/', ptPath: '/2026/07/12/usando-ia-pra-resolver-meus-probleminhas-do-dia-a-dia/', date: '2026-07-12', hue: 'amber' },
  protect: { path: '/en/2026/07/11/how-to-protect-yourself-from-agents-deleting-your-stuff/', ptPath: '/2026/07/11/como-me-precaver-pros-meus-agentes-nao-apagarem-minhas-coisas/', date: '2026-07-11', hue: 'orange' },
  openSourceAi: { path: '/en/2026/06/05/ai-controversy-open-source-project-contributions-my-take/', ptPath: '/2026/06/05/controversia-ia-contribuicoes-projetos-codigo-aberto-minha-opiniao/', date: '2026-06-05', hue: 'violet' },
  bestPractices: { path: '/en/2026/05/30/open-source-best-practices-llm-the-minimum/', ptPath: '/2026/05/30/boas-praticas-projetos-codigo-aberto-llm-o-minimo/', date: '2026-05-30', hue: 'blue' },
  cleanCode: { path: '/en/2026/04/20/clean-code-for-ai-agents/', ptPath: '/2026/04/20/clean-code-para-agentes-de-ia/', date: '2026-04-20', hue: 'blue' },
  multiModel: { path: '/en/2026/04/18/llm-benchmarks-part-2-multi-model/', ptPath: '/2026/04/18/llm-benchmarks-parte-2-multiplos-modelos/', date: '2026-04-18', hue: 'rose' },
  chronicles: { path: '/en/2026/02/16/vibe-code-zero-to-production-in-6-days-the-m-akita-chronicles/', ptPath: '/2026/02/16/vibe-code-do-zero-a-producao-em-6-dias-the-m-akita-chronicles/', date: '2026-02-16', hue: 'orange' },
  aiKilled: { path: '/en/2026/02/08/rant-ai-killed-programmers/', ptPath: '/2026/02/08/rant-ia-acabou-com-programadores/', date: '2026-02-08', hue: 'red' },
  usagebarPost: { path: '/en/2026/05/24/i-built-a-waybar-widget-for-omarchy-to-monitor-llm-usage-ai-usagebar/', ptPath: '/2026/05/24/criei-widget-waybar-omarchy-monitorar-uso-llms-ai-usagebar/', date: '2026-05-24', hue: 'blue' },
  toolkitTips: { path: '/en/2026/05/24/akita-ai-tips-toolkit-ai-jail-ai-memory-ai-usagebar/', ptPath: '/2026/05/24/dicas-e-toolkit-de-ia-do-akita-ai-jail-ai-memory-ai-usagebar/', date: '2026-05-24', hue: 'violet' },
  tuiPost: { path: '/en/2026/06/08/playing-with-tuis-llms-ratatui-bubbletea/', ptPath: '/2026/06/08/brincando-tui-llms-ratatui-bubbletea/', date: '2026-06-08', hue: 'red' },
  memorySwitch: { path: '/en/2026/07/20/whats-new-ai-memory-switch-agents-without-losing-session/', ptPath: '/2026/07/20/novidades-no-meu-ai-memory-cada-vez-melhor-pra-usar-com-suas-ias/', date: '2026-07-20', hue: 'teal' },
  ghpendingPost: { path: '/en/2026/05/23/i-built-a-cli-to-check-my-github-pending-stuff-ghpending/', ptPath: '/2026/05/23/criei-cli-pra-checar-pendencias-github-ghpending/', date: '2026-05-23', hue: 'amber' },
  githubBlock: { path: '/en/2026/06/11/bypassing-github-api-block-brazil/', ptPath: '/2026/06/11/burlando-bloqueio-api-github-brasil/', date: '2026-06-11', hue: 'amber' },
  bend2: { path: '/en/2026/09/19/new-ai-language-just-released-bend-2/', ptPath: '/2026/09/19/nova-linguagem-voltada-pra-ia-bend-2/', date: '2026-09-19', hue: 'red' },
  memoryPost: { path: '/en/2026/05/23/i-built-memory-system-for-coding-agents-ai-memory/', ptPath: '/2026/05/23/criei-sistema-memoria-agentes-codigo-ai-memory/', date: '2026-05-23', hue: 'teal' },
  jailUpdate: { path: '/en/2026/07/25/ai-jail-security-update-docker-opt-in/', ptPath: '/2026/07/25/ai-jail-update-seguranca-docker-opt-in/', date: '2026-07-25', hue: 'orange' },
  typesafe: { path: '/en/2026/09/16/why-things-like-typesafe-ai-dont-interest-me/', ptPath: '/2026/09/16/por-que-coisas-como-typesafe-ia-nao-me-interessam/', date: '2026-09-16', hue: 'red' },
  omarchyDualGpu: { path: '/en/2026/01/21/omarchy-3-dual-gpu-setup-with-amd-and-nvidia/', ptPath: '/2026/01/21/omarchy-3-setup-de-dual-gpus-com-amd-e-nvidia/', date: '2026-01-21', hue: 'blue' },
  omarchyThinkpad: { path: '/en/2026/04/18/omarchy-on-thinkpad-t14-gen-6/', ptPath: '/2026/04/18/omarchy-no-thinkpad-t14-gen-6/', date: '2026-04-18', hue: 'blue' },
  nwOmarchy: { path: '/en/2026/05/01/nw-omarchy-xlibre-inaugural/', ptPath: '/2026/05/01/omarchy-no-xlibre/', date: '2026-05-01', hue: 'blue' },
  emuDistrobox: { path: '/en/2026/04/11/emulation-distrobox-with-claude-code/', ptPath: '/2026/04/11/distrobox-de-emulacao-com-claude-code/', date: '2026-04-11', hue: 'orange' },
  racingGames: { path: '/en/2026/04/19/my-favorite-retro-racing-games-on-distrobox/', ptPath: '/2026/04/19/retrogames-de-corrida-favoritos-no-distrobox/', date: '2026-04-19', hue: 'orange' },
  marathon: { path: '/en/2026/05/14/wrapping-up-my-ai-marathon-success-or-failure/', ptPath: '/2026/05/14/terminando-maratona-ia-sucesso-ou-fracasso/', date: '2026-05-14', hue: 'violet' },
} satisfies Record<string, Omit<Article, 'id'> & { ptPath: string }>;

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
  models: 44, // 39 in Part 2, plus 5 added on 2026-09-23
  sabotages: 14,
  sprints: 7,
  costUsd: 4000,
  days: 9,
  // The most recent round added to the v4 table, and when.
  latestRound: { models: 5, date: '2026-09-23' },
};
