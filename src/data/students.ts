// The "AI and students" essay page. Structure only: each section's diagram or numbers, its outside sources and the
// owner's posts it links. Words live in the `students` catalog. Where every fact comes from: docs/sources.md, section 12.
import type { ArticleId } from './articles';
import { percent, type SectionStat } from './stats';


export interface StudentsSection {
  id: string; figure?: string; posts: ArticleId[]; sources: { id: string; href: string }[];
  // Numbers shown as a Stats strip; labels in the catalog under sections.<id>.stats.<key>.
  stats?: SectionStat[];
  x?: string; memory?: boolean;
}

export const students = {
  // The owner's posts on X of 2026-09-25 that started the page.
  xStudents: 'https://x.com/AkitaOnRails/status/2103300221799207150',
  xMemory: 'https://x.com/AkitaOnRails/status/2103322331745604001',
  channel: 'https://www.youtube.com/@Akitando',
  transcripts: 'https://akitaonrails.com/akitando/',
  // Blog transcripts (Portuguese only) of the Akitando episodes in videos.config.json `akitando`, same order.
  episodes: {
    'V7oUDL7E1g4': 'https://akitaonrails.com/2020/02/19/akitando-72-rant-programacao-nao-e-facil/',
    'oUPaJxk6TZ0': 'https://akitaonrails.com/2020/04/01/akitando-76-guia-definitivo-de-aprendendo-a-aprender-a-maior-bronca-da-sua-vida-rated-r/',
    '8G80nuEyDN4': 'https://akitaonrails.com/2020/06/04/akitando-80-o-guia-hardcore-de-introducao-a-computacao/',
    'Gp2m8ZuXoPg': 'https://akitaonrails.com/2021/03/06/akitando-93-hello-world-como-voce-nunca-viu-entendendo-c/',
    'SNyh-cubxaU': 'https://akitaonrails.com/2022/04/15/akitando-117-linguagem-compilada-vs-interpretada-qual-e-melhor/',
    '0TndL-Nh6Ok': 'https://akitaonrails.com/2022/07/01/akitando-121-entendendo-transferencia-de-sinais-digitais-introducao-a-redes-parte-1/',
  } as Record<string, string>,
  sections: [
    { id: 'multiplier', figure: 'students-multiplier', x: 'https://x.com/AkitaOnRails/status/2104602262219771929', posts: ['zeroToPost', 'punchCard', 'shipMore'], sources: [
      { id: 'dora', href: 'https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report' },
      { id: 'veracode', href: 'https://www.veracode.com/blog/genai-code-security-report/' },
    ] },
    { id: 'bubble', figure: 'students-bubbles', posts: ['aiKilled'], sources: [
      { id: 'cfpb', href: 'https://www.consumerfinance.gov/archive/newsroom/cfpb-takes-action-against-coding-boot-camp-bloomtech-and-ceo-austen-allred-for-deceiving-students-and-hiding-loan-costs/' },
      { id: 'courseReport', href: 'https://www.coursereport.com/reports/2018-coding-bootcamp-market-size-research' },
      { id: 'closures', href: 'https://www.insidehighered.com/news/tech-innovation/teaching-learning/2025/01/09/changes-boot-camp-marks-signal-shifts-workforce' },
      { id: 'twoU', href: 'https://www.highereddive.com/news/2u-exit-boot-camps-transition-microcredentials/734798/' },
      { id: 'layoffs', href: 'https://techcrunch.com/2024/12/31/a-comprehensive-archive-of-2024-tech-layoffs/' },
      { id: 'ep132', href: 'https://akitaonrails.com/2022/11/22/akitando-132-rant-a-bolha-de-startups-estourou/' },
    ] },
    { id: 'evidence', posts: ['benchmarkPart1', 'punchCard', 'driveclub'], stats: [
      { key: 'anthropic', n: 17 },
      { key: 'bastani', n: 17, format: percent },
      { key: 'metr', n: 19, format: percent },
    ], sources: [
      { id: 'anthropic', href: 'https://www.anthropic.com/research/AI-assistance-coding-skills' },
      { id: 'bastani', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12232635/' },
      { id: 'metr', href: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/' },
      { id: 'mit', href: 'https://arxiv.org/abs/2506.08872' },
    ] },
    { id: 'market', posts: ['aiKilled'], stats: [
      { key: 'newGrads', n: 65, format: percent },
      { key: 'entry', n: 4.5, format: percent },
      { key: 'young', n: 19, format: percent },
    ], sources: [
      { id: 'signalfire', href: 'https://www.signalfire.com/blog/signalfire-state-of-talent-report-2026' },
      { id: 'indeed', href: 'https://hiringlab.indeed.com/2026/07/23/the-labor-market-is-tilting-toward-seniority/' },
      { id: 'canaries', href: 'https://digitaleconomy.stanford.edu/news/canariesaug26/' },
      { id: 'nyfed', href: 'https://www.newyorkfed.org/research/college-labor-market' },
      { id: 'bls', href: 'https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm' },
    ] },
    { id: 'guess', figure: 'students-guess', posts: ['llmsFail', 'talkClaude', 'tvClipboard'], sources: [] },
    { id: 'why', figure: 'students-gap', posts: ['llmLimits', 'punchCard', 'aiKilled'], sources: [
      { id: 'octoverse', href: 'https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/' },
      { id: 'cobol', href: 'https://arxiv.org/abs/2604.03986' },
      { id: 'arc', href: 'https://arcprize.org/' },
    ] },
    { id: 'memory', figure: 'students-guardrails', memory: true, x: 'https://x.com/AkitaOnRails/status/2103322331745604001', posts: ['aiMemory2', 'neverDone'], stats: [
      // Measured on the ai-memory checkout at 49147a5d, 2026-09-27 (docs/sources.md, section 12).
      { key: 'words', n: 4743 },
      { key: 'invariants', n: 16 },
      // 23 rows in docs/security-boundaries.md, one of them a proposal: 22 enforced.
      { key: 'boundaries', n: 22 },
      // Test attributes counted with grep (3,028 to 3,029 unit, 614 integration, depending on the pattern).
      { key: 'unit', n: 3000, suffix: '+' },
      { key: 'integration', n: 600, suffix: '+' },
    ], sources: [] },
    { id: 'practice', figure: 'students-practice', posts: ['driveclub', 'akitaCaved', 'marathon'], sources: [
      { id: 'anthropicStuck', href: 'https://www.anthropic.com/research/AI-assistance-coding-skills' },
      { id: 'ericsson', href: 'https://doi.org/10.1037/0033-295X.100.3.363' },
      { id: 'macnamara', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6731745/' },
      { id: 'ep72', href: 'https://akitaonrails.com/2020/02/19/akitando-72-rant-programacao-nao-e-facil/' },
    ] },
  ] satisfies StudentsSection[],
};
