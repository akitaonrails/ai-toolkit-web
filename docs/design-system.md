# Design system

How pages on ailair.akitaonrails.com are put together. Read this before adding or changing a page, a section or an image. Colors: [color-study.md](color-study.md). Images: [images.md](images.md). The essay pages also follow [essays.md](essays.md).

## The idea: a World's Fair of one

Since October 2026 the site wears the look of the owner's book, *Competent Enough*: a 1950s-60s World's Fair, art deco and streamline moderne signage, the brass-and-glass of an undersea art-deco city from a retro-futurist game, and a dry Hitchhiker's Guide humor (a weary round-faced robot, Plaza 42, "Mostly harmless."). The site is the fair; every page is a pavilion.

1. **A night fair by default.** Deep Rapture navy ground, poster-cream text. The day theme is cream poster paper with navy ink. Both are generated (color-study.md).
2. **Brass is the one thing you press.** Buttons, focus rings, the selection. No subject uses brass, so a brass button is the loudest thing on a page.
3. **Every page is its own pavilion.** A pavilion color, a hero pattern and a poster, all declared in `src/data/site.ts` (`nav` and `pavilions`). A visitor knows which building they are in before reading a word.
4. **Deco ornament, used for information.** The diamond (`.dot`) marks a subject; double gilt rules frame a page or a placard; the arch frames a poster or the portrait. No other ornament.
5. **Humor stays dry and rare.** One nod per place at most: Plaza 42 on the fair map, the weary robot in the art, "Mostly harmless." in the footer. Never name or picture a copyrighted character; describe a "weary round-faced robot" (the one on the book cover, the newsletter's M.Arvin).

## Pavilions

Each page is a pavilion: its color (`hue` in `nav`), the pattern its hero wears (`motif`) and its poster (`poster`, a text-free illustration in the arch). Both live in `src/data/site.ts`; PageHero reads them through its `pavilion` prop.

| Pavilion | Page | Color (`data-hue`) | Motif | Poster |
|---|---|---|---|---|
| The fairground | `/` | brass, with every subject on the map | sunburst | the plaza and its pavilions |
| Book Tower | `/book/` | jade | shelves | a deco library rotunda, banker's lamps, a porthole onto the deep sea |
| Hall of Opinions: AGI | `/agi/` | pennant | sunburst | a 1939-Futurama stage with a weary robot head and a crowd |
| Hall of Opinions: the limits of LLMs | `/limits/` | cerulean | waves | a hall of mirrors with wrong reflections |
| Hall of Opinions: students | `/students/` | jade | blueprint | an academy classroom, a student writing by hand |
| Press room | `/writing/` | mauve | chevrons | a rotary press and a typewriter |
| Press House | `/newsletter/` | mauve | radio | a gloomy robot at a radio desk, a mail chute |
| Broadcast Tower | `/podcasts/` | jade | waves | a needle tower sending radio rings |
| The Workshop | `/workflow/` | amethyst | gears | robots on an assembly line, a foreman at the console |
| Inventor's laboratory | `/frank/` | amethyst | blueprint | bell jars, a Tesla coil |
| Hall of Machines: gauges | `/ai-usagebar/` | cerulean | radio | a wall of brass pressure gauges |
| Hall of Machines: post office | `/ghpending/` | jade | fans | pneumatic tubes and cubbyholes |
| Hall of Machines: clock tower | `/clock-tui/` | pennant | chevrons | a deco clock tower with segment digits |
| The Arcade | `/games/` | copper | checker | arcade cabinets under a copper neon arch |
| Control Room | `/setup/` | patina | gears | a curved desk with two monitors and a porthole |
| Lost and found | 404 | brass | waves | an empty lagoon, a blank signpost, a shrugging robot |

Sister sites keep their own colors: ai-memory is patina, ai-jail is copper.

The pattern utilities are in `src/styles/global.css` (`.motif` plus one of `.motif-sunburst`, `-shelves`, `-radio`, `-gears`, `-checker`, `-blueprint`, `-waves`, `-fans`, `-chevrons`). They draw in the pavilion's own soft color on a layer behind the content, and PageHero fades them out under the text. Use `.motif` on any band that should announce a place (the home hero and the closing band do).

## Type

Three faces, each with one job, loaded from `@fontsource`:

- **Limelight** (the book cover's title face): page and section titles (`h1`, `h2`), big numbers in Stats, the plaza's 42. It has one weight; `font-synthesis-weight: none` keeps browsers from faking a bold. Never for sentences.
- **Josefin Sans** (the fair's signage): `h3`, buttons, navigation, kickers, badges, captions of data, dates and other metadata (`font-sign`).
- **Source Serif 4** (the book's body face): all reading text, ledes, pull quotes in italic.
- JetBrains Mono only for code and commands.

Sizes are Tailwind utilities backed by tokens: `text-4xl` (page h1), `text-3xl` (section h2), `text-2xl`, `text-xl` (h3), `text-lg` (lede), `text-base`, `text-sm`. Hebrew uses Rubik and Heebo; Japanese and Korean fall through to Noto (end of global.css).

- Sentence case everywhere. No all-caps labels. Product names keep their own case (ai-usagebar, ghpending, tclock).
- A headline is one color.
- Body lines stay under about 70 characters (`.lede`, `.prose-site`, `max-w-[40em]`).

## Shapes

- Corners are square-cut: `--radius` is 0.35rem; buttons and controls 0.15 to 0.2rem. No pills.
- The diamond (`.dot`, a rotated square in the subject's vivid color) replaces every round dot: kickers, bullets (`.ticks`), carousel dots, repo stats.
- Frames are brass: figures and the fair map sit in a 2px brass frame with a second gilt line around it; posters and the portrait stand in the arch (round top, three gilt frames, a brass plinth).
- Rules are double: `.rule` under a hero title, the 5px double line under every PageHero in the pavilion color, the double brass rule on top of the nav, the footer and menus.
- Callouts are placards (`.callout`): the subject's soft plate with a double rule on top.

## Layout

- `.wrap` is the 76rem column, `.wrap-narrow` is 52rem. `.band` is the vertical rhythm. `tint` on a `Section` marks a change of subject; do not alternate every section.
- Left aligned. Only the closing CTA band is centered.
- Open layouts over boxes. `.cell` is for things you click (an exhibit case: a hairline, and a gilt inner frame on hover).
- Mobile first. Every grid collapses to one column. Standalone links and buttons are at least about 40px tall for touch (links inside running text are exempt). The page must never scroll sideways at 360px (`document.documentElement.scrollWidth === innerWidth`); the fair map scrolls inside its own frame.
- The inline nav appears at `xl` (1280px); below that, the drawer. The tool pages (`toolIds` in `src/data/site.ts`) sit under one "Tools" menu in the top bar and under a "Tools" heading in the drawer, followed by the tools with their own sites (`externalTools`: ai-memory, ai-jail), marked with an arrow.

## Components (`src/components`)

| Component | Use |
|---|---|
| `Base` (layout) | Every page. Props: `title`, `description` (140 to 160 characters), `schema`, `noindex`. |
| `BookReader` | The book read on the page with epub.js: one page in a card, two side by side in full screen, edition switch, contents, resume where the reader stopped. Pages turn with the arrow buttons (hidden on phones), the arrow keys, a swipe, or a tap or click on the page's outer third; links and the middle third are left alone, and horizontal swipes never reach the browser's back gesture. Loads only when near the screen. Words in `book.json` `reader`. |
| `Carousel` | The home page hero: full-width slides (the intro, then the featured pages in their hues, each with its pavilion poster in the arch). Scroll-snap strip without JavaScript; with it, arrows, dots and autoplay that holds on hover or focus, stops once the reader takes over, never runs under reduced motion, and has a pause button. Props: `ids`, `label`, `interval`. Words in `common.json` `carousel`, slides in `home.json` `carousel.items`. |
| `PageHero` | Top of every detail page: the pavilion's entrance. Props: `hue`, `kicker`, `title`, `lede`, `pavilion` (id in `pavilions`, gives the motif and the poster in the arch). Slot: one or two buttons. |
| `FairMap` | The home page's map of the site as a fairground, drawn in SVG; every pavilion links to its page, labels from `home.json` `map`. Add a pavilion here when a page joins the top-level menu. |
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
| `Portrait` | The home page portrait standing in the brass deco arch. |
| `CodeBlock` | A terminal with a copy button. Lines starting with `#` dim. |
| `Tabs` | Panels are slots named `"0"`, `"1"`... Write the slots out; Astro cannot name slots inside a `.map()`. |
| `Callout` | Limits, caveats and asides. |
| `NextPages` | Two or three onward links. |
| `CtaBand` | The closing call to action. |

A detail page is: `PageHero`, a screenshot, three to six `Section`s with at least one `Figure`, `NextPages`, `CtaBand`.

## Motion

Declared in markup and run by `src/scripts/motion.ts`: `data-fill`, `data-zoom`, `data-parallax`, `data-reveal`, `data-count`, `data-focus-list`, `data-exit`. Everything is off under `prefers-reduced-motion`, and the content is complete without JavaScript. Keep motion slow and stately, like a fair's turning signs; add no new effects.

## Writing

This site speaks in the first person: it is Fabio Akita describing his own tools and habits. The reader may have seen him on a podcast and knows nothing about the tools.

- Short. A section is a heading, one or two sentences, and something to look at: a screenshot, a diagram, a command.
- Plain verbs, active voice. Numbers keep their date ("counted on September 17, 2026").
- No em dashes or en dashes. No "not X, but Y". No three-item lists for rhythm. No closing one-liners. No "seamless", "robust", "powerful", "unlock", "effortless", "key", "crucial", "landscape". No emoji.
- Facts come from the sources in [sources.md](sources.md). Do not invent numbers, features or quotes.
- Say a thing fully in one place and link from the others. ai-memory and ai-jail have their own sites: summarize in one sentence and link.
- The owner's voice on X is unfiltered; this site is the calm version. Keep the edge in the quotes, not in the copy.

## Images

Diagrams and posters are generated in the fair's art direction, then checked by eye: [images.md](images.md).

## Adding new content

Follow these steps so a new piece looks like it was always part of the fair.

**A new page.**
1. Pick its subject color from the seven (`pennant`, `copper`, `jade`, `patina`, `cerulean`, `amethyst`, `mauve`); reuse a subject's color if it is the same subject, otherwise pick one not used by its neighbors in the same menu. Brass is never a subject.
2. Add it to `nav` in `src/data/site.ts` (and to a `navGroups` group if it belongs in a menu), and add a row to `pavilions` with a motif no neighbor in that menu uses.
3. Name it as a pavilion (Hall of ..., ... Tower, ... House) for the fair map and the poster; the menu keeps the plain name.
4. Write `scripts/prompts/poster-<id>.txt`: one building or interior that says what the page is about, dominated by its color, text-free, ending with the no-text paragraph the other poster prompts use. Generate it with `node scripts/gen-image.mjs poster-<id> --aspect 3:4` and look at it.
5. Use `PageHero` with `pavilion="<id>"`, then the usual sections. If the page is top level, add it to the fair map (`FairMap.astro`, labels in `home.json` `map.places`) and to the table above.
6. All text in six languages (CLAUDE.md), `npm run check:colors && npm run check:i18n`.

**A new diagram.** Write `scripts/prompts/<name>.txt` like the others: layout and objects, each label in double quotes, "Only these labels: ...", colors named by subject. `_style.txt` adds the art direction. Generate, look, then localize the labels (images.md).

**A new essay or section on an essay page.** essays.md first. A section gets a diagram in the fair style or a Stats strip, never a stock photo.

**A new featured page on the home carousel.** Add its row to `featured` in `src/pages/[...locale]/index.astro` (its poster shows in the arch) and its text to `home.json` `carousel.items`, in all six languages.

**Humor.** At most one nod per place, dry and short, in the owner's voice. The weary round-faced robot may appear in art; quotes from the Hitchhiker's Guide may not be copied beyond a two-word allusion ("Mostly harmless.", 42).
