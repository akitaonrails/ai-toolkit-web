// Checks the built site (run `npm run build` first) for the SEO basics in docs/seo.md: title and description length,
// one h1, no skipped heading levels, alt on every image, canonical URL, and internal links that resolve.
//   npm run check:seo      exits 1 on any problem
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const pages = walk(dist).filter((p) => p.endsWith('index.html'));
const known = new Set(pages.map((p) => `/${relative(dist, dirname(p))}/`.replace('//', '/')));
const decode = (s) => s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
let failed = 0;
for (const p of pages) {
  const s = readFileSync(p, 'utf8');
  const url = `/${relative(dist, dirname(p))}/`.replace('//', '/');
  const problems = [];
  // Search engines show fewer full-width characters, so Japanese and Korean get their own ranges.
  const lang = s.match(/<html lang="([^"]+)"/)?.[1] ?? 'en';
  const cjk = /^(ja|ko)/.test(lang);
  const [dMin, dMax, tMax] = cjk ? [70, 125, 50] : [120, 160, 60];
  const title = decode(s.match(/<title>(.*?)<\/title>/)?.[1] ?? '');
  const desc = decode(s.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  if (!title || title.length > tMax) problems.push(`title is ${title.length} characters`);
  if (desc.length < dMin || desc.length > dMax) problems.push(`description is ${desc.length} characters`);
  const h1 = (s.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) problems.push(`${h1} h1 elements`);
  const levels = [...s.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  levels.forEach((l, i) => { if (i && l > levels[i - 1] + 1) problems.push(`heading skips h${levels[i - 1]} to h${l}`); });
  for (const img of s.match(/<img [^>]*>/g) ?? []) if (!/\salt(=|[\s>])/.test(img)) problems.push('an image has no alt');
  if (!/rel="canonical"/.test(s)) problems.push('no canonical');
  for (const [, link] of s.matchAll(/href="(\/[^"#?]*)"/g)) {
    if (link.startsWith('/_astro/') || known.has(link) || existsSync(join(dist, link)) || ['/github', '/blog'].includes(link)) continue;
    problems.push(`broken link ${link}`);
  }
  if (problems.length) { failed++; console.log(`FAIL ${url}: ${[...new Set(problems)].join('; ')}`); }
  else console.log(`ok   ${url}  title ${title.length}, description ${desc.length}`);
}
process.exit(failed ? 1 : 0);
