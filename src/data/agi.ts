// The "Why AGI doesn't matter" essay page. Structure only: each section's diagram, its outside sources and the
// owner's posts it links. Words live in the `agi` catalog. Where every fact comes from: docs/sources.md, section 11.
import type { ArticleId } from './articles';

// `x` links the owner's post on X quoted in that section; `jail` adds a link to ai-jail, the sandbox he uses.
export interface AgiSection { id: string; figure: string; sources: { id: string; href: string }[]; posts: ArticleId[]; x?: string; jail?: boolean }

export const agi = {
  sections: [
    { id: 'define', figure: 'agi-definitions', posts: ['misleadingAds', 'akitaCaved'], sources: [
      { id: 'charter', href: 'https://openai.com/charter/' },
      { id: 'profit', href: 'https://techcrunch.com/2024/12/26/microsoft-and-openai-have-a-financial-definition-of-agi-report/' },
      { id: 'dropped', href: 'https://www.cnbc.com/2026/04/27/openai-microsoft-partnership-revenue-cap.html' },
      { id: 'levels', href: 'https://arxiv.org/abs/2311.02462' },
      { id: 'chollet', href: 'https://arxiv.org/abs/1911.01547' },
      { id: 'altman', href: 'https://www.cnbc.com/2025/08/11/sam-altman-says-agi-is-a-pointless-term-experts-agree.html' },
    ] },
    { id: 'test', figure: 'agi-benchmarks', posts: ['benchmarkPart1', 'benchmarkPart2', 'highestScore'], sources: [
      { id: 'astra', href: 'https://arcprize.org/blog/astra' },
      { id: 'hendrycks', href: 'https://arxiv.org/abs/2510.18212' },
      { id: 'fourati', href: 'https://arxiv.org/abs/2510.20784' },
      { id: 'hle', href: 'https://www.futurehouse.org/research/hle-exam' },
      { id: 'swebench', href: 'https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/' },
      { id: 'arena', href: 'https://arxiv.org/abs/2504.20879' },
      { id: 'nadella', href: 'https://www.dwarkesh.com/p/satya-nadella' },
    ] },
    { id: 'marketing', figure: 'agi-money-loop', posts: ['misleadingAds', 'fableSoap', 'businessModels'], sources: [
      { id: 'huang', href: 'https://www.foxbusiness.com/technology/nvidia-ceo-jensen-huang-declares-agi-has-arrived-after-openai-unveils-gpt-6-astra' },
      { id: 'marcus', href: 'https://garymarcus.substack.com/p/sad-to-see-jensen-huang-claim-that' },
      { id: 'openaiRound', href: 'https://www.cnbc.com/2026/03/31/openai-funding-round-ipo.html' },
      { id: 'anthropicIpo', href: 'https://fortune.com/2026/06/01/anthropic-confidentially-files-ipo-965-billion-valuation/' },
      { id: 'nvidiaDeal', href: 'https://www.cnbc.com/2026/08/17/nvidia-financing-open-ai-data-center-ohio.html' },
      { id: 'capex', href: 'https://www.cnbc.com/2026/02/06/google-microsoft-meta-amazon-ai-cash.html' },
    ] },
    { id: 'attacks', figure: 'agi-attacks', posts: ['misleadingAds', 'protect'], jail: true, x: 'https://x.com/AkitaOnRails/status/2103884967168065543', sources: [
      { id: 'hfReport', href: 'https://cdn.openai.com/pdf/67869394-cb91-4c12-888c-5cbd85c7814c/OpenAI-Hugging-Face%20Incident-Technical-Report.pdf' },
      { id: 'rubygems', href: 'https://www.rubyhack.ai/' },
      { id: 'replit', href: 'https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/' },
      { id: 'gtg', href: 'https://www.anthropic.com/news/disrupting-AI-espionage' },
      { id: 'misalignment', href: 'https://www.anthropic.com/research/agentic-misalignment' },
      { id: 'stuxnet', href: 'https://www.wired.com/2014/11/countdown-to-zero-day-stuxnet/' },
      { id: 'lazarus', href: 'https://www.pbs.org/newshour/nation/north-korean-programmer-charged-in-sony-hack-wannacry-attack' },
      { id: 'bybit', href: 'https://www.fbi.gov/investigate/cyber/alerts/2025/north-korea-responsible-for-1-5-billion-bybit-hack' },
      { id: 'opm', href: 'https://www.nextgov.com/cybersecurity/2015/07/opm-215m-impacted-by-background-check-breach/207786/' },
      { id: 'saltTyphoon', href: 'https://www.cisa.gov/news-events/news/joint-statement-fbi-and-cisa-peoples-republic-china-prc-targeting-commercial-telecommunications' },
    ] },
    { id: 'history', figure: 'agi-history', posts: ['aiKilled'], sources: [
      { id: 'nyt', href: 'https://www.nytimes.com/1958/07/08/archives/new-navy-device-learns-by-doing-psychologist-shows-embryo-of.html' },
      { id: 'perceptrons', href: 'https://en.wikipedia.org/wiki/Perceptrons_(book)' },
      { id: 'lighthill', href: 'http://www.chilton-computing.org.uk/inf/literature/reports/lighthill_report/p001.htm' },
    ] },
    { id: 'tool', figure: 'agi-tool', posts: ['shipMore', 'llmsFail', 'marathon'], sources: [], x: 'https://x.com/AkitaOnRails/status/2103930940179226812' },
    { id: 'efficiency', figure: 'agi-efficiency', posts: ['fableSoap', 'benchmarkPart2', 'benchmarkLatest'], sources: [] },
  ] satisfies AgiSection[],
};
