// The book page (/book/): Fabio Akita's "Competent Enough" / "Competente o Suficiente", built in
// github.com/akitaonrails/ai-book-2026 (local checkout ~/Projects/ai-book-2026). Structure only; words in the `book`
// catalog. Where every fact comes from: docs/sources.md, section 14.
//
// Downloads point at a fixed tag: every release so far is a GitHub pre-release, and /releases/latest skips those.
// When a new edition ships, update `tag` (and `label` if the version name changes) and the numbers below. The book repo
// keeps only its two newest releases, so a tag two releases old stops existing: the build fails loudly then
// (scripts/fetch-book.mjs), which is the cue to update it here.
export const book = {
  repo: 'https://github.com/akitaonrails/ai-book-2026',
  issues: 'https://github.com/akitaonrails/ai-book-2026/issues',
  // The version as the owner names it on the page; the release it points to.
  label: '1.0-preview',
  tag: 'v1.0.0-preview.9',
  released: '2026-10-16',
  editions: [
    { id: 'en', file: 'Competent-Enough', pages: 517 },
    { id: 'pt', file: 'Competente-o-Suficiente', pages: 531 },
  ],
  // Amazon product pages, released 2026-10-17. English has hardcover and Kindle; Portuguese also has paperback.
  amazon: {
    en: 'https://www.amazon.com/dp/B0HN85BTX2',
    pt: 'https://www.amazon.com/dp/B0HN94HVZH',
  } as Record<'en' | 'pt', string>,
  // Read on 2026-10-16 at the tag: print PDFs, book/back/glossary-*.yml (146 entries in each edition),
  // book/back/references.yaml (320), book/outline.yml (22 chapters, 5 parts, 10 appendices).
  numbers: { chapters: 22, parts: 5, glossary: 146, references: 320 },
} as const;

/** The release name as GitHub shows it, without the tag's leading v: 1.0.0-preview.5. */
export const bookVersion = book.tag.replace(/^v/, '');

export type BookFormat = 'epub' | 'ebook' | 'print';
const suffix: Record<BookFormat, string> = { epub: '.epub', ebook: '-ebook.pdf', print: '.pdf' };
export const bookFile = (file: string, format: BookFormat) =>
  `${book.repo}/releases/download/${book.tag}/${file}${suffix[format]}`;
/** The edition a reader sees first: Portuguese for pt-br, English for every other language. */
export const bookEdition = (locale: string) => (locale === 'pt-br' ? 'pt' : 'en');
