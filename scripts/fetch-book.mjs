// Unpacks the book's EPUBs into public/book/read/<edition>/ so the reader on /book/ can open them from this site.
// GitHub serves release files without CORS headers, so the browser cannot read them from there; and an unpacked
// book lets the reader fetch one chapter (and its images) at a time instead of the whole 25 MB archive.
// Runs before every build and dev server (npm `prebuild` / `predev`). The files are not committed (.gitignore);
// the release tag and file names come from src/data/book.ts. A marker file skips the download when the tag matches.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import JSZip from 'jszip';

const root = new URL('..', import.meta.url).pathname;
const data = readFileSync(join(root, 'src/data/book.ts'), 'utf8');
const repo = data.match(/repo: '([^']+)'/)[1];
const tag = data.match(/tag: '([^']+)'/)[1];
const editions = [...data.matchAll(/\{ id: '(\w+)', file: '([^']+)'/g)].map(([, id, file]) => ({ id, file }));
if (!editions.length) throw new Error('fetch-book: no editions found in src/data/book.ts');

for (const { id, file } of editions) {
  const dir = join(root, 'public/book/read', id);
  const marker = join(dir, '.tag');
  if (existsSync(marker) && readFileSync(marker, 'utf8') === tag) { console.log(`book ${id}: ${tag} already unpacked`); continue; }
  const url = `${repo}/releases/download/${tag}/${file}.epub`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch-book: ${url} answered ${res.status}`);
  const zip = await JSZip.loadAsync(await res.arrayBuffer());
  rmSync(dir, { recursive: true, force: true });
  let count = 0;
  for (const entry of Object.values(zip.files)) {
    if (entry.dir) continue;
    // Refuse anything that would land outside the edition's folder.
    if (entry.name.split('/').includes('..') || entry.name.startsWith('/')) throw new Error(`fetch-book: bad path ${entry.name}`);
    const out = join(dir, entry.name);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, await entry.async('nodebuffer'));
    count++;
  }
  writeFileSync(marker, tag);
  console.log(`book ${id}: ${tag}, ${count} files unpacked`);
}
