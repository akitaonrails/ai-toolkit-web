# SEO

## In place

| Item | Where |
|---|---|
| A unique title per page, 60 characters or fewer with the " \| Akita's AI Toolkit" suffix (page titles in `meta.title` stay under about 39 characters); the home page uses `site.homeTitle` | `Base.astro`, each namespace's `meta` |
| A meta description per page, 140 to 160 characters | each namespace's `meta.description`, `common.json` `site.description` as the fallback |
| Canonical URL on every page, trailing slash | `Base.astro`, `trailingSlash: 'always'` |
| Open Graph and Twitter card with a 1200x630 image | `Base.astro`, `src/assets/img/og.png` |
| Structured data: WebSite, Person (with `sameAs` for every social profile), WebPage; SoftwareApplication on the three tool pages; an ItemList of VideoObject on the podcasts page | `src/lib/schema.ts`, the pages' `schema` prop |
| One h1 per page, no skipped heading levels | page templates; `Benchmark` takes `level` |
| `alt` on every image; decorative video thumbnails inside a labelled link use an empty `alt` | components |
| Sitemap, robots.txt, llms.txt | `@astrojs/sitemap`, `public/robots.txt`, `src/pages/llms.txt.ts` |
| Static HTML, self-hosted fonts, responsive WebP, hashed assets cached for a year | Astro, Fontsource, `netlify.toml` |

## Check before pushing

A quick audit of the built pages (title and description length, h1 count, heading skips, images without `alt`, broken internal links) is the Python snippet in the commit that added this file; rerun it after adding a page.

## After launch

1. Google Search Console: add `https://aitoolkit.akitaonrails.com/` as a URL-prefix property and submit `sitemap-index.xml`.
2. Bing Webmaster Tools: import from Search Console.
3. Link to the site from the GitHub profile README, the blog's About page and each tool's README. Links from pages that already rank matter more than anything on the page.
4. Check the share card at https://www.opengraph.xyz.
