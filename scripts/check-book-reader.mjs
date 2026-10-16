import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { chromium } from 'playwright-core';

const root = resolve('dist');
const types = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.xhtml': 'application/xhtml+xml',
  '.xml': 'application/xml',
};

const server = process.env.READER_ORIGIN ? undefined : createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) throw new Error('invalid path');
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    response.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream');
    response.end(await readFile(file));
  } catch {
    response.statusCode = 404;
    response.end('Not found');
  }
});

if (server) await new Promise((resolveReady) => server.listen(0, '127.0.0.1', resolveReady));
const address = server?.address();
if (server) assert(address && typeof address === 'object');
const origin = process.env.READER_ORIGIN?.replace(/\/$/, '')
  ?? `http://127.0.0.1:${address.port}`;
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/usr/bin/chromium' });

try {
  const page = await browser.newPage({ viewport: { width: 1100, height: 760 } });
  await page.addInitScript(() => localStorage.setItem('book-cfi-pt', 'epubcfi(/6/999999!/4/2/999999:0)'));
  await page.goto(`${origin}/pt-br/book/`);
  const reader = page.locator('[data-reader]');
  await reader.scrollIntoViewIfNeeded();
  await page.locator('[data-view] iframe').waitFor();
  await assert.doesNotReject(() => page.locator('[data-status]').waitFor({ state: 'hidden' }));

  const chapter = await page.locator('[data-toc] option').evaluateAll((options) => options.find((option) => option.value)?.value);
  assert(chapter, 'the reader contents must include at least one chapter');
  await page.locator('[data-toc]').selectOption(chapter);
  await page.waitForFunction(() => Boolean(document.querySelector('[data-where]')?.textContent?.trim()));
  const chapterLabel = (await page.locator('[data-where]').innerText()).trim();

  await page.locator('[data-fs]').click();
  await page.waitForFunction(() => document.fullscreenElement !== null || document.querySelector('[data-reader]')?.classList.contains('max'));
  await page.waitForTimeout(300);
  await page.locator('[data-view] iframe').evaluate((frame) => { frame.dataset.beforeResize = 'true'; });
  for (const viewport of [{ width: 1200, height: 780 }, { width: 1320, height: 860 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(300);
  assert.equal(await page.locator('[data-view] iframe').count(), 1, 'settled reader must contain one rendition');
  assert.equal(await page.locator('[data-view] iframe[data-before-resize]').count(), 0, 'settled resize must replace the old rendition');
  assert.equal(await page.locator('[data-status]').isHidden(), true, 'settled reader must not show an error');
  await page.waitForFunction((expected) => document.querySelector('[data-where]')?.textContent?.trim() === expected, chapterLabel);
  assert.equal((await page.locator('[data-where]').innerText()).trim(), chapterLabel, 'settled resize must preserve the chapter');

  const failed = await browser.newPage();
  await failed.route('**/book/read/pt/**', (route) => route.abort());
  await failed.goto(`${origin}/pt-br/book/`);
  await failed.locator('[data-reader]').scrollIntoViewIfNeeded();
  await failed.locator('[data-status-actions]').waitFor({ state: 'visible' });
  assert.equal(await failed.locator('[data-retry]').isVisible(), true);
  assert.equal(await failed.locator('[data-reader-download]').isVisible(), true);
  await failed.close();

  console.log('book reader: stale location recovery, settled resize, and error actions pass');
} finally {
  await browser.close();
  if (server) await new Promise((resolveClosed, reject) => server.close((err) => err ? reject(err) : resolveClosed()));
}
