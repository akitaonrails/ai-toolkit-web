# PDF slide decks

`/agi/` and `/students/` also ship as 16:9 PDF slide decks, one per language, for readers who would rather page through slides than scroll. Each page links its deck twice (hero and takeaways) with the "Send this to your boss" button (`src/components/DeckLink.astro`, words in `common.deck`).

## Regenerate them

When the words, data, diagrams or videos of `/agi/` or `/students/` change:

```sh
npm run build:decks     # builds the site, prints public/pdf/{agi,students}-<locale>.pdf, writes public/pdf/manifest.json
```

Commit `public/pdf/` with the content change. `npm run check:decks` fails when the PDFs are older than their inputs (catalogs, `src/data/agi.ts`, `students.ts`, `articles.ts`, `videos.json`, the deck components and the `agi-*`/`students-*` diagrams), so it belongs in the pre-push checks.

Needs `/usr/bin/chromium` (or `CHROMIUM=/path`) and `gs` (Ghostscript).

## How it works

- `src/pages/[...locale]/deck/{agi,students}.astro` render the deck pages from the same catalogs and data as the web pages. They are `noindex`, left out of the sitemap and skipped by `check:seo`.
- `src/components/deck/Deck.astro` lays out the slide sequence: cover, opening quote, then per section an intro slide (title, lede, diagram or numbers), the network map when there is one, the points, the quote; then videos, takeaways, closing quote, a clickable "Read more" appendix of posts and sources, and an end slide with the page URL.
- `src/layouts/Deck.astro` fixes every slide at 1920x1080, one per PDF page. Fonts never go below 26px, except the 20px footer. An inline script paginates by measuring: a slide whose list (`[data-flow]`: points, takeaway cards, appendix blocks) overflows moves its last whole item to a continuation slide until it fits, so a break never falls inside a point in any language. A section's quote joins its last points slide only when it fits there.
- `scripts/build-decks.mjs` serves `dist`, opens each deck in Chromium, measures every slide again and refuses to print one that overflows (`DECK_DEBUG=/some/dir` saves screenshots of the failing slides). It then prints with `page.pdf` and shrinks the file with Ghostscript, which keeps text and links.

## Before committing new PDFs

Look at them. `pdftoppm -r 24 -png public/pdf/agi-en.pdf /tmp/x && magick montage /tmp/x-*.png -tile 6x -geometry +6+6 sheet.png` gives a contact sheet; check at least en, one of ja/ko and he (right to left).
