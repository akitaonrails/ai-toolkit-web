# aitoolkit.akitaonrails.com

Akita's AI Toolkit: one site for Fabio Akita's AI tools, workflow, writing, newsletter and podcast appearances. Astro 7, Tailwind 4, GSAP, deployed on Netlify. It is the umbrella over the sister sites `~/Projects/ai-jail-web` (aijail.io) and `~/Projects/ai-memory-web` and shares their structure and scripts.

Read before changing anything: `docs/design-system.md`, `docs/color-study.md`, `docs/sources.md`.

## When asked to update the site

Start from `docs/sources.md`. It lists every source (GitHub repos, blog posts, the private newsletter repo, videos, the owner's own words), what the site takes from each, where it lands, and how to spot a gap. Pull the local checkouts, compare, and update the data file and the catalog together. Keep `docs/sources.md` true when you add a source or move a fact.

## Rules

- English only until the owner approves translations (`docs/i18n.md`). Still, no visible text in `.astro` files: words go in `src/i18n/locales/en/<namespace>.json`, structure (hues, hrefs, ids, commands) stays in code or `src/data/`.
- Colors are tokens. Change a decision in `scripts/build-palette.mjs`, run it with `--write`, then `npm run check:colors`. No raw color values in pages or components; the check fails on them.
- Green is the one action color. Each subject keeps its hue everywhere (table in `docs/design-system.md`).
- Facts come from the sources. Do not invent numbers, features or quotes. Numbers that change (subscribers, PR counts) carry the date they were read, in `src/data/`.
- The newsletter repository is private: describe the pipeline, never quote its code, prompts, credentials or infrastructure.
- Writing rules: `docs/design-system.md`, "Writing". First person, short, no em dashes, no hype words.
- Diagrams: `docs/images.md`. Look at every generated image before committing it.
- Videos: edit `src/data/videos.config.json`, run `node scripts/refresh-videos.mjs`.
- Yearly numbers on the workflow page: `python3 scripts/tally-projects.py`, method and exclusions in `docs/sources.md` section 9. Sanity-check outliers before publishing.
- Before pushing: `npm run check:colors && npm run check:i18n && npm run build`. `main` deploys to production through Netlify (`docs/deploy.md`).
