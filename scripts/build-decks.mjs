// Prints the slide decks (PDF versions of /agi/ and /students/) in every language, from the built site.
//   npm run build:decks          build the site, print 12 PDFs into public/pdf/, write public/pdf/manifest.json
//   npm run check:decks          exit 1 when the PDFs are older than the content they were made from
// Every slide is a fixed 1920x1080 page (src/layouts/Deck.astro). Before printing, each slide is measured in the
// browser; any slide whose content overflows its page stops the run with its number, so a bad break never ships.
// Uses the system Chromium through playwright-core (set CHROMIUM=/path to override), then Ghostscript (gs) to cut
// each file to about a third of Chromium's size; text stays text and links stay links. See docs/pdf.md.
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync, rmSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const out = join(root, 'public/pdf');
const languages = JSON.parse(readFileSync(join(root, 'src/i18n/languages.json'), 'utf8'));
const locales = Object.keys(languages);
export const decks = ['agi', 'students'];

// Everything a deck is made from. A change to any of these makes the PDFs stale.
export function inputsHash() {
  const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
  const files = [
    ...locales.flatMap((l) => ['agi', 'students', 'articles', 'common'].map((ns) => `src/i18n/locales/${l}/${ns}.json`)),
    'src/data/agi.ts', 'src/data/students.ts', 'src/data/articles.ts', 'src/data/videos.json',
    'src/layouts/Deck.astro', 'src/components/AgiNetwork.astro',
    ...walk(join(root, 'src/components/deck')).map((p) => relative(root, p)),
    ...walk(join(root, 'src/assets/img/gen')).map((p) => relative(root, p)).filter((p) => /\/(agi|students)-[^/]+\.webp$/.test(p)),
  ].filter((p) => existsSync(join(root, p))).sort();
  const h = createHash('sha256');
  for (const f of files) h.update(f).update(readFileSync(join(root, f)));
  return h.digest('hex').slice(0, 16);
}
const pdfName = (deck, locale) => `${deck}-${locale}.pdf`;

if (process.argv.includes('--check')) {
  const manifest = join(out, 'manifest.json');
  const want = inputsHash();
  const have = existsSync(manifest) ? JSON.parse(readFileSync(manifest, 'utf8')).inputs : null;
  const missing = decks.flatMap((d) => locales.map((l) => pdfName(d, l))).filter((f) => !existsSync(join(out, f)));
  if (have !== want || missing.length) {
    console.log(`decks are stale${missing.length ? ` (missing: ${missing.join(', ')})` : ''}: run \`npm run build:decks\` and commit public/pdf/`);
    process.exit(1);
  }
  console.log('decks are current');
  process.exit(0);
}

const { chromium } = await import('playwright-core');
if (!process.argv.includes('--no-build')) execSync('npm run -s build', { cwd: root, stdio: 'inherit' });

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json' };
const server = createServer((req, res) => {
  let p = join(dist, decodeURIComponent(req.url.split('?')[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[extname(p)] ?? 'application/octet-stream' });
  res.end(readFileSync(p));
}).listen(0);
const base = `http://localhost:${server.address().port}`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/usr/bin/chromium' });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
mkdirSync(out, { recursive: true });
let failed = false;
for (const deck of decks) {
  for (const locale of locales) {
    const path = `${locale === 'en' ? '' : `/${locale}`}/deck/${deck}/`;
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.body.dataset.paged, null, { timeout: 60000 });
    const overflow = await page.evaluate(() => [...document.querySelectorAll('.slide')].flatMap((s, i) => {
      const box = s.getBoundingClientRect();
      const bad = [...s.querySelectorAll('*')].some((el) => { const r = el.getBoundingClientRect(); return r.width && (r.bottom > box.bottom - 88 && !el.closest('.slide-foot') && !el.classList.contains('rule')) || r.right > box.right + 1; });
      return s.scrollHeight > s.clientHeight + 1 || bad ? [i + 1] : [];
    }));
    const slides = await page.evaluate(() => document.querySelectorAll('.slide').length);
    if (overflow.length) {
      console.log(`FAIL ${pdfName(deck, locale)}: slide(s) ${overflow.join(', ')} of ${slides} overflow`); failed = true;
      // DECK_DEBUG=/some/dir saves a screenshot of each failing slide there.
      if (process.env.DECK_DEBUG) for (const n of overflow) await page.locator('.slide').nth(n - 1).screenshot({ path: join(process.env.DECK_DEBUG, `${deck}-${locale}-${n}.png`) });
      continue;
    }
    const raw = join(out, `.${pdfName(deck, locale)}`), final = join(out, pdfName(deck, locale));
    await page.pdf({ path: raw, width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true });
    execSync(`gs -q -sDEVICE=pdfwrite -dPDFSETTINGS=/printer -sColorConversionStrategy=RGB -dNOPAUSE -dBATCH -sOutputFile="${final}" "${raw}"`);
    rmSync(raw);
    console.log(`ok   ${pdfName(deck, locale)}  ${slides} slides, ${(statSync(final).size / 1e6).toFixed(1)} MB`);
  }
}
await browser.close();
server.close();
if (failed) process.exit(1);
writeFileSync(join(out, 'manifest.json'), JSON.stringify({ inputs: inputsHash(), generatedAt: new Date().toISOString() }, null, 2) + '\n');
// The site was built before the PDFs existed; copy them into dist so this build can deploy as is.
mkdirSync(join(dist, 'pdf'), { recursive: true });
for (const f of readdirSync(out)) copyFileSync(join(out, f), join(dist, 'pdf', f));
