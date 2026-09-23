// Refreshes the podcast page's video data from YouTube with yt-dlp: titles (original language), channel, upload
// date, duration and views, plus a local thumbnail for each, so the page loads nothing from YouTube until a
// visitor presses play. Reads src/data/videos.config.json, writes src/data/videos.json and src/assets/img/video/.
//   node scripts/refresh-videos.mjs            use cached metadata when YouTube refuses
//   node scripts/refresh-videos.mjs --cached   skip YouTube and rebuild from the cache
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const cfg = JSON.parse(readFileSync(`${root}src/data/videos.config.json`, 'utf8'));

// YouTube rate-limits bursts of metadata requests ("confirm you are not a bot"). Every successful fetch is cached in
// .cache/videos/ (ignored by git), and a failed fetch falls back to that cache, so a refresh never loses data.
const cacheDir = `${root}.cache/videos`;
mkdirSync(cacheDir, { recursive: true });
function meta(id) {
  let d;
  try {
    if (process.argv.includes('--cached')) throw new Error('cached');
    const out = execFileSync('yt-dlp', ['--skip-download', '--sleep-requests', '1', '--extractor-args', 'youtube:lang=pt', '-j', `https://www.youtube.com/watch?v=${id}`], { maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'] });
    d = JSON.parse(out.toString());
    writeFileSync(`${cacheDir}/${id}.json`, JSON.stringify(d));
  } catch {
    if (!existsSync(`${cacheDir}/${id}.json`)) throw new Error(`cannot fetch ${id} and it is not cached`);
    console.warn(`${id}: using cached metadata`);
    d = JSON.parse(readFileSync(`${cacheDir}/${id}.json`, 'utf8'));
  }
  return { id, title: d.title, channel: d.channel, date: `${d.upload_date.slice(0, 4)}-${d.upload_date.slice(4, 6)}-${d.upload_date.slice(6, 8)}`, duration: d.duration_string, views: d.view_count };
}
function thumb(id, big) {
  const out = `${root}src/assets/img/video/${id}.jpg`;
  if (existsSync(out)) return;
  for (const name of big ? ['maxresdefault', 'hqdefault'] : ['hqdefault']) {
    try { execFileSync('curl', ['-sSfLo', out, `https://i.ytimg.com/vi/${id}/${name}.jpg`]); return; } catch {}
  }
  throw new Error(`no thumbnail for ${id}`);
}

const byDate = (a, b) => b.date.localeCompare(a.date) || (b.views ?? 0) - (a.views ?? 0);
const appearances = cfg.appearances.map((id) => { thumb(id, true); return meta(id); }).sort(byDate);
const cuts = Object.fromEntries(Object.entries(cfg.cuts).map(([episode, ids]) => [episode, ids.map((id) => { thumb(id, false); return meta(id); }).sort(byDate)]));
writeFileSync(`${root}src/data/videos.json`, JSON.stringify({ fetchedAt: new Date().toISOString(), appearances, cuts }, null, 2) + '\n');
console.log(`${appearances.length} appearances, ${Object.values(cuts).flat().length} cuts`);
