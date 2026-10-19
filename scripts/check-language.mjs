// Language switch regression check (PR #9). Run after `npm run build`.
// 1. dist/_redirects carries no Netlify `Language=` rules: Netlify cached those 302s without varying on the
//    `nf_lang` cookie, so a visitor who picked English was sent back to their browser's language.
// 2. In a Portuguese browser, the first visit to an English page goes to /pt-br/ (the inline detector in Base.astro).
// 3. Picking English in the switcher sticks across a reload and on another page.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { chromium } from 'playwright-core';

const root = resolve('dist');
const redirects = await readFile(resolve(root, '_redirects'), 'utf8');
assert.doesNotMatch(redirects, /Language=/, 'dist/_redirects must not contain Language= redirects');

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
const server = createServer(async (request, response) => {
  try {
    let file = resolve(root, `.${decodeURIComponent(new URL(request.url, 'http://localhost').pathname)}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) throw new Error('invalid path');
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    response.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream');
    response.end(await readFile(file));
  } catch {
    response.statusCode = 404;
    response.end();
  }
});
await new Promise((ready) => server.listen(0, '127.0.0.1', ready));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/usr/bin/chromium' });

try {
  const context = await browser.newContext({ locale: 'pt-BR' });
  const page = await context.newPage();
  const path = () => new URL(page.url()).pathname;

  await page.goto(`${origin}/`);
  await page.waitForURL(`${origin}/pt-br/`);
  assert.equal(await page.getAttribute('html', 'lang'), 'pt-BR', 'a Portuguese browser lands on /pt-br/');

  await page.locator('footer [data-set-lang="en"]').click();
  await page.waitForURL(`${origin}/`);
  assert.equal(path(), '/', 'picking English opens the English page');
  await page.reload();
  assert.equal(path(), '/', 'English sticks after a reload');
  await page.goto(`${origin}/games/`);
  assert.equal(path(), '/games/', 'English sticks on another page');
  assert.equal(await page.getAttribute('html', 'lang'), 'en');
  console.log('language: first visit detected, English choice sticks');
} finally {
  await browser.close();
  server.close();
}
