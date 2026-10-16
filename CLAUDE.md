# ailair.akitaonrails.com

Akita's AI Lair: one site for Fabio Akita's AI tools, workflow, writing, book, newsletter and podcast appearances, dressed as a 1950s-60s World's Fair after his book's cover (every page a pavilion). Astro 7, Tailwind 4, GSAP, deployed on Netlify. It is the umbrella over the sister sites `~/Projects/ai-jail-web` (aijail.io) and `~/Projects/ai-memory-web` and shares their structure and scripts.

Read before changing anything: `docs/design-system.md`, `docs/color-study.md`, `docs/sources.md`. Before touching the essay pages (`/agi/`, `/students/`, `/limits/`), read `docs/essays.md`: who they are for, the owner's voice, and the AI-isms to remove.

## When asked to update the site

Start from `docs/sources.md`. It lists every source (GitHub repos, blog posts, the private newsletter repo, videos, the owner's own words), what the site takes from each, where it lands, and how to spot a gap. Pull the local checkouts, compare, and update the data file and the catalog together. Keep `docs/sources.md` true when you add a source or move a fact.

## Rules

- Six languages: en, pt-br, es, he, ja, ko (`docs/i18n.md`). Every text change goes to all six in the same change: edit English, translate the same key in the other five following `docs/research/I18N-TRANSLATE-BRIEF.md`, then `npm run i18n:stamp && npm run check:i18n`. Never stamp without translating. Numbers are localized too: never pre-format a number as text in data or pages (`number(n, opts)` / Stats `format`), and translated prose writes numbers in the language's own convention (`4,5` in pt-br and es; `docs/i18n.md`). No visible text in `.astro` files: words go in `src/i18n/locales/<locale>/<namespace>.json`, structure (hues, hrefs, ids, commands) stays in code or `src/data/`. A diagram label change means localizing that diagram again (`scripts/localize-image.mjs`).
- Colors are tokens. Change a decision in `scripts/build-palette.mjs`, run it with `--write`, then `npm run check:colors`. No raw color values in pages or components; the check fails on them.
- Brass is the one action color; no subject uses it. Each page is a pavilion with its own color, hero pattern and poster (`pavilions` in `src/data/site.ts`, table in `docs/design-system.md`). New pages, diagrams, posters, essays and carousel slides follow "Adding new content" in `docs/design-system.md`.
- Facts come from the sources. Do not invent numbers, features or quotes. Numbers that change (subscribers, PR counts) carry the date they were read, in `src/data/`.
- The newsletter repository is private: describe the pipeline, never quote its code, prompts, credentials or infrastructure.
- Writing rules: `docs/design-system.md`, "Writing". First person, short, no em dashes, no hype words.
- Images: `docs/images.md`. All generated art follows `scripts/prompts/_style.txt` (the fair's art direction); posters carry no text. Look at every generated image before committing it.
- Videos: edit `src/data/videos.config.json`, run `node scripts/refresh-videos.mjs`.
- Yearly numbers on the workflow page: `python3 scripts/tally-projects.py`, method and exclusions in `docs/sources.md` section 9. Sanity-check outliers before publishing.
- PDF decks: `/agi/`, `/students/` and `/limits/` ship as slide PDFs in every language (`docs/pdf.md`). Any change to their words, data, diagrams or videos means `npm run build:decks`, a look at the result, and committing `public/pdf/` in the same change.
- Before pushing: `npm run check:colors && npm run check:i18n && npm run build && npm run check:reader && npm run check:seo && npm run check:decks`. `main` deploys to production through Netlify (`docs/deploy.md`).
