# Design system

How pages on aitoolkit.akitaonrails.com are put together. Read this before adding or changing a page. It follows the same structure as the sister sites (`~/Projects/ai-jail-web`, `~/Projects/ai-memory-web`) with its own palette and type. Colors and type: [color-study.md](color-study.md).

## The idea

This site is an umbrella: many small tools, one person, one workflow. There is no logo; the portrait is the face. The identity is a dark purple ground with phosphor green actions (Evangelion Unit-01, the NERV look of the tools' own terminals).

1. One hue per subject, taken from the tool's own terminal colors, kept everywhere that subject appears.
2. Phosphor green means go: the primary button, focus, the status dot on a code block. Nothing else is green.
3. The status dot (`.dot`, from tclock's "● GitHub pending" widget headers) is the only ornament. The sister sites use bars (ai-jail) and a spectrum (ai-memory).

## Subject hues

| Subject | Hue | `data-hue` |
|---|---|---|
| Workflow, skills, agents | violet | `violet` |
| ai-usagebar | blue | `blue` |
| ghpending, podcasts | amber | `amber` |
| tclock | red | `red` |
| ai-memory | teal | `teal` |
| Writing, the benchmark, the newsletter | rose | `rose` |
| Games, ai-jail | orange | `orange` |
| Setup (third-party tools), ai-memory's punchline | teal | `teal` |

The mapping for pages lives in `src/data/site.ts` (`nav`, `extras`, `sisters`, `social`). Put `data-hue` on an element and its children can use `var(--hue)` (text-safe), `var(--hue-soft)` (fill) and `var(--hue-vivid)` (dots, rules, glows; never text).

## Type

Hubot Sans for headlines (800, width 112%; the home h1 goes to 118%), Mona Sans for text, JetBrains Mono for code, kickers and small metadata. Sizes are Tailwind utilities backed by tokens: `text-4xl` (page h1), `text-3xl` (section h2), `text-2xl`, `text-xl` (h3), `text-lg` (lede), `text-base`, `text-sm`.

- Sentence case everywhere. Product names keep their own case (ai-usagebar, ghpending, tclock).
- A headline is one color.
- Body lines stay under about 70 characters (`.lede`, `.prose-site`, `max-w-[40em]`).

## Layout

- `.wrap` is the 76rem column, `.wrap-narrow` is 52rem. `.band` is the vertical rhythm. `tint` on a `Section` marks a change of subject; do not alternate every section.
- Left aligned. Only the closing CTA band is centered.
- Open layouts over boxes. `.cell` is for things you click.
- Mobile first. Every grid collapses to one column. Standalone links and buttons are at least about 40px tall for touch (links inside running text are exempt). The page must never scroll sideways at 360px (`document.documentElement.scrollWidth === innerWidth`).
- The inline nav appears at `xl` (1280px); below that, the drawer. The tool pages (`toolIds` in `src/data/site.ts`) sit under one "Tools" menu in the top bar and under a "Tools" heading in the drawer, followed by the tools with their own sites (`externalTools`: ai-memory, ai-jail), marked with an arrow.

## Components (`src/components`)

| Component | Use |
|---|---|
| `Base` (layout) | Every page. Props: `title`, `description` (140 to 160 characters), `schema`, `noindex`. |
| `PageHero` | Top of every detail page. Props: `hue`, `kicker`, `title`, `lede`. Slot: one or two buttons. |
| `Section` | A band with an h2. Props: `title`, `lede`, `hue`, `id`, `tint`, `narrow`, `fill` (scroll-lit lede, one per page), `ink`. |
| `Figure` | A generated diagram from `src/assets/img/gen/`. Props: `name`, `alt`, `caption`. |
| `Shot` | A real screenshot, framed on the dark ground. Props: `src`, `alt`, `caption`, `tall` (portrait captures), `eager`, `zoom`, `sizes`. |
| `Clip` | A looping screen recording from `public/media/`, played only while visible and never under reduced motion. |
| `Video` | A YouTube video as a local thumbnail; becomes a youtube-nocookie.com player only on click. |
| `ToolBlock` | One tool on the home page: screenshot, tagline, points, install command, links. `flip` alternates sides. |
| `RepoMeta` | GitHub link, stars and latest release of a repo in `src/data/repos.json`, read at build time. |
| `FeatureGrid` | Two to six short points; items with `href` become cells. |
| `Stats` | Numbers that count up. Props: `items[{n,label,prefix,suffix,display}]`, `cols`. `display` shows fixed text ("1.08M") for figures too wide to count in full. Numbers come from `src/data`. |
| `Benchmark` | The LLM Benchmark v4 feature (home and writing). |
| `ArticleList` | Blog posts as cells. Props: `items` from `pick()` in `src/data/articles.ts`. |
| `PullQuote` | One of the owner's known phrases, placed next to the subject it is about. Props: `text`, `original` (Portuguese wording), `cite`, `large`. Use each phrase once, never as a gallery. |
| `Social` | Where to follow, one cell per network. |
| `Related` | "More on my blog": the most recent posts on the page's subject. With `hue`, a full band at the end of a page; without, a small list inside a section. Ids from `related` in `src/data/articles.ts`. |
| `Portrait` | The home page portrait over the spectrum-ringed disc. |
| `PullQuote` | See above. |
| `CodeBlock` | A terminal with a copy button. Lines starting with `#` dim. |
| `Tabs` | Panels are slots named `"0"`, `"1"`... Write the slots out; Astro cannot name slots inside a `.map()`. |
| `Callout` | Limits, caveats and asides. |
| `NextPages` | Two or three onward links. |
| `CtaBand` | The closing call to action. |

A detail page is: `PageHero`, a screenshot, three to six `Section`s with at least one `Figure`, `NextPages`, `CtaBand`.

## Motion

Declared in markup and run by `src/scripts/motion.ts` (the same script as the sister sites): `data-fill`, `data-zoom`, `data-parallax`, `data-reveal`, `data-count`, `data-focus-list`, `data-exit`. Everything is off under `prefers-reduced-motion`, and the content is complete without JavaScript.

## Writing

This site speaks in the first person: it is Fabio Akita describing his own tools and habits. The reader may have seen him on a podcast and knows nothing about the tools.

- Short. A section is a heading, one or two sentences, and something to look at: a screenshot, a diagram, a command.
- Plain verbs, active voice. Numbers keep their date ("counted on September 17, 2026").
- No em dashes or en dashes. No "not X, but Y". No three-item lists for rhythm. No closing one-liners. No "seamless", "robust", "powerful", "unlock", "effortless", "key", "crucial", "landscape". No emoji.
- Facts come from the sources in [sources.md](sources.md). Do not invent numbers, features or quotes.
- Say a thing fully in one place and link from the others. ai-memory and ai-jail have their own sites: summarize in one sentence and link.
- The owner's voice on X is unfiltered; this site is the calm version. Keep the edge in the quotes, not in the copy.

## Images

Diagrams are generated, then checked by a person: [images.md](images.md).
