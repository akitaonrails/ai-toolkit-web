// Reads the color tokens straight out of src/styles/global.css and reports
// WCAG 2.x contrast for every pairing the site actually uses.
// Run: npm run check:colors   (exits 1 if any pairing misses its target)
import { readFileSync, readdirSync } from 'node:fs';
import { parse, wcagContrast, formatHex, differenceEuclidean, filterDeficiencyProt, filterDeficiencyDeuter, filterDeficiencyTrit } from 'culori';

const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');

function block(selector) {
  const out = {};
  const re = new RegExp(`${selector}\\s*\\{([^}]*)\\}`, 'g');
  for (const m of css.matchAll(re)) {
    for (const d of m[1].matchAll(/--([\w-]+):\s*(oklch\([^)]*\))/g)) out[d[1]] = d[2];
  }
  return out;
}

const root = block(':root');
const themes = { light: root, dark: { ...root, ...block("\\[data-theme='dark'\\]") } };
const hues = ['red', 'orange', 'amber', 'teal', 'blue', 'violet', 'rose'];

let failed = 0;
const md = process.argv.includes('--md');
for (const [name, t] of Object.entries(themes)) {
  const rows = [
    ['text', 'bg', 7], ['text', 'surface', 7], ['text', 'tint', 7],
    ['muted', 'bg', 4.5], ['muted', 'surface', 4.5], ['muted', 'tint', 4.5],
    ...hues.flatMap((h) => [[h, 'bg', 4.5], [h, 'surface', 4.5], [h, 'tint', 4.5], [h, `${h}-soft`, 4.5]]),
    ['green', 'bg', 4.5], ['green', 'surface', 4.5],
    ['on-action', 'action', 7], ['on-action', 'action-hi', 7], ['on-ink', 'ink', 7], ['on-ink', 'ink-raised', 7], ['on-ink-muted', 'ink-raised', 4.5],
    ['line', 'bg', 1.2],
  ];
  console.log(md ? `\n### ${name}\n\n| Foreground | Background | Ratio | Target | |\n|---|---|---|---|---|` : `\n== ${name} ==`);
  for (const [fg, bg, target] of rows) {
    const ratio = wcagContrast(parse(t[fg]), parse(t[bg]));
    const ok = ratio >= target;
    if (!ok) failed++;
    const line = md
      ? `| \`${fg}\` ${formatHex(parse(t[fg]))} | \`${bg}\` ${formatHex(parse(t[bg]))} | ${ratio.toFixed(2)} | ${target} | ${ok ? 'pass' : '**FAIL**'} |`
      : `${ok ? 'ok  ' : 'FAIL'} ${ratio.toFixed(2).padStart(5)} (>=${target})  ${fg} on ${bg}`;
    console.log(line);
  }
}

// How far apart the vivid subject hues stay for each common color vision deficiency (simulated, full severity).
// Distance is Euclidean in OKLab; about 0.1 is a clear difference, under 0.05 is easy to confuse. Report only:
// hue is never the only cue on the site (every hue pairs with a label or a position).
const dist = differenceEuclidean('oklab');
const vivid = Object.fromEntries(Object.entries(root).filter(([k]) => k.startsWith('v-') && k !== 'v-green').map(([k, v]) => [k.slice(2), parse(v)]));
const sims = { normal: (c) => c, protan: filterDeficiencyProt(1), deutan: filterDeficiencyDeuter(1), tritan: filterDeficiencyTrit(1) };
console.log(md ? '\n### Closest pair of subject hues\n\n| Vision | Closest pair | OKLab distance |\n|---|---|---|' : '\n== closest subject hues (OKLab distance) ==');
for (const [name, sim] of Object.entries(sims)) {
  const names = Object.keys(vivid);
  let best = [Infinity, '', ''];
  for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) {
    const d = dist(sim(vivid[names[i]]), sim(vivid[names[j]]));
    if (d < best[0]) best = [d, names[i], names[j]];
  }
  console.log(md ? `| ${name} | ${best[1]} and ${best[2]} | ${best[0].toFixed(3)} |` : `${name.padEnd(7)} ${best[0].toFixed(3)}  ${best[1]} / ${best[2]}`);
}

// Every color must be a token: no color values in pages or components.
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]));
const src = new URL('../src', import.meta.url).pathname;
for (const file of [...walk(`${src}/pages`), ...walk(`${src}/components`), ...walk(`${src}/layouts`)]) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (/\b(oklch|oklab|rgba?|hsla?)\(|(?<![&\w"'(/])#[0-9a-fA-F]{3,8}\b/.test(line) && !/theme-color|href=/.test(line)) {
      console.log(`FAIL color value outside the tokens: ${file.replace(src, 'src')}:${i + 1}`);
      failed++;
    }
  });
}
process.exit(failed ? 1 : 0);
