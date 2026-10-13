// "The limits of LLMs": what AI copies well and what it can't, for readers who came from "Adobe is dead" and "programmers
// are finished". Structure only: each section's diagram or numbers, its outside sources and the owner's posts it links.
// Words live in the `limits` catalog. Where every fact comes from: docs/sources.md, section 13.
import type { ArticleId } from './articles';
import { percent, type SectionStat } from './stats';

export interface LimitsSection {
  id: string; figure?: string; posts: ArticleId[]; sources: { id: string; href: string }[];
  // Numbers shown as a Stats strip; labels in the catalog under sections.<id>.stats.<key>.
  stats?: SectionStat[];
}

const usd: Intl.NumberFormatOptions = { style: 'currency', currency: 'USD', maximumFractionDigits: 0 };

export const limits = {
  sections: [
    { id: 'copy', posts: ['llmLimits'], stats: [
      { key: 'private', n: 81.5, format: percent },
      { key: 'stack', n: 67.5, format: { style: 'unit', unit: 'terabyte' } },
    ], sources: [
      { id: 'octoverse', href: 'https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/' },
      { id: 'stack', href: 'https://huggingface.co/datasets/bigcode/the-stack-v2' },
    ] },
    { id: 'history', figure: 'limits-timeline', posts: ['adobeRe'], sources: [
      { id: 'phoenix', href: 'https://en.wikipedia.org/wiki/Phoenix_Technologies' },
      { id: 'sega', href: 'https://www.copyright.gov/fair-use/summaries/segaenters-accolade-9thcir1992.pdf' },
      { id: 'connectix', href: 'https://law.resource.org/pub/us/case/reporter/F3/203/203.F3d.596.99-15852.html' },
      { id: 'ghidra', href: 'https://github.com/NationalSecurityAgency/ghidra' },
      { id: 'decompileBench', href: 'https://arxiv.org/abs/2505.11340' },
      { id: 'rea', href: 'https://github.com/morluto/rea' },
      { id: 'reaCost', href: 'https://github.com/morluto/rea/tree/main/experiments/analysis-efficiency' },
    ] },
    { id: 'retro', figure: 'limits-retro', posts: ['adobeRe', 'driveclub'], sources: [
      { id: 'zelda', href: 'https://github.com/Zelda64Recomp/Zelda64Recomp' },
      { id: 'shadps4', href: 'https://github.com/shadps4-emu/shadPS4' },
      { id: 'kotaku', href: 'https://kotaku.com/zelda-and-banjo-recompiled-devs-go-to-war-with-ai-vibe-coded-slopcomps-2000739936' },
    ] },
    { id: 'clones', figure: 'limits-facade', posts: ['adobeRe'], stats: [
      // Read from the GitHub API on 2026-10-13 (docs/sources.md, section 13).
      { key: 'issues', n: 968 },
      { key: 'days', n: 13 },
    ], sources: [
      { id: 'photocraft', href: 'https://github.com/storytold/photocraft' },
      { id: 'neural', href: 'https://helpx.adobe.com/photoshop/using/neural-filters.html' },
      { id: 'lenses', href: 'https://helpx.adobe.com/camera-raw/desktop/dng-and-file-formats/supported-lenses.html' },
      { id: 'gimp', href: 'https://developer.gimp.org/core/roadmap/' },
      { id: 'pantone', href: 'https://petapixel.com/2022/10/28/you-have-to-pay-a-subscription-to-use-pantone-colors-in-photoshop-now' },
    ] },
    { id: 'cost', figure: 'limits-bun', posts: ['adobeRe'], stats: [
      { key: 'cost', n: 165000, format: { style: 'currency', currency: 'USD', notation: 'compact', maximumSignificantDigits: 3 } },
      { key: 'days', n: 11 },
      { key: 'agents', n: 64 },
    ], sources: [
      { id: 'bun', href: 'https://bun.com/blog/bun-in-rust' },
      { id: 'compiler', href: 'https://www.anthropic.com/engineering/building-c-compiler' },
    ] },
    { id: 'price', posts: ['competentEnough', 'adobeRe'], stats: [
      // US$ per million output tokens: GPT-4 at launch (March 2023), and Fable 5.1 / GPT-6 Astra (October 2026).
      { key: 'then', n: 60, format: usd },
      { key: 'now', n: 50, format: usd },
    ], sources: [
      { id: 'claude', href: 'https://claude.com/pricing' },
      { id: 'openai', href: 'https://developers.openai.com/api/docs/pricing' },
      { id: 'epoch', href: 'https://epoch.ai/blog/llm-inference-price-trends' },
      { id: 'epochBurden', href: 'https://epoch.ai/gradient-updates/how-persistent-is-the-inference-cost-burden' },
    ] },
    { id: 'job', posts: ['languages', 'competentEnough', 'adobeRe'], stats: [
      // Indeed Hiring Lab, 2026-07-08: US software development postings since Claude Code's launch (2025-02-24).
      { key: 'postings', n: 15, format: percent },
      { key: 'senior', n: 71, format: percent },
    ], sources: [
      { id: 'indeed', href: 'https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/' },
    ] },
  ] satisfies LimitsSection[],
};
