// The book page (/book/): Fabio Akita's "Competent Enough" / "Competente o Suficiente", built in
// github.com/akitaonrails/ai-book-2026 (local checkout ~/Projects/ai-book-2026). Structure only; words in the `book`
// catalog. Where every fact comes from: docs/sources.md, section 14.
//
// Downloads point at a fixed tag: every release so far is a GitHub pre-release, and /releases/latest skips those.
// When a new edition ships, update `tag` (and `label` if the version name changes) and the numbers below.
export const book = {
  repo: 'https://github.com/akitaonrails/ai-book-2026',
  issues: 'https://github.com/akitaonrails/ai-book-2026/issues',
  // The version as the owner names it on the page; the release it points to.
  label: '1.0-preview',
  tag: 'v1.0.0-preview.2',
  released: '2026-10-13',
  editions: [
    { id: 'en', file: 'Competent-Enough', pages: 459 },
    { id: 'pt', file: 'Competente-o-Suficiente', pages: 466 },
  ],
  // Read on 2026-10-13 from the release's README and CHANGELOG and the print PDFs (pdfinfo).
  numbers: { chapters: 20, parts: 5, glossary: 144, references: 292, figures: 50 },
} as const;

export type BookFormat = 'epub' | 'ebook' | 'print';
const suffix: Record<BookFormat, string> = { epub: '.epub', ebook: '-ebook.pdf', print: '.pdf' };
export const bookFile = (file: string, format: BookFormat) =>
  `${book.repo}/releases/download/${book.tag}/${file}${suffix[format]}`;
/** The edition a reader sees first: Portuguese for pt-br, English for every other language. */
export const bookEdition = (locale: string) => (locale === 'pt-br' ? 'pt' : 'en');
