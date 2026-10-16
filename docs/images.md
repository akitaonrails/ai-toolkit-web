# Images

All generated art follows one art direction (October 2026): a 1950s-60s World's Fair poster in art deco style, with the brass, glass and portholes of an undersea art-deco city and a dry sense of humor, painted in gouache on a deep navy ground with the pavilion colors (color-study.md). It lives in `scripts/prompts/_style.txt`, which is appended to every prompt; never restate the style in a prompt.

Generated with Google's Gemini image model (`gemini-3-pro-image`), then checked by eye. A generated image can misspell a label, add text nobody asked for, or draw something untrue, so nothing ships unseen.

```bash
export GEMINI_API_KEY=...          # https://aistudio.google.com/apikey
$EDITOR scripts/prompts/home-loop.txt
node scripts/gen-image.mjs home-loop                       # 16:9, 1920 px WebP into src/assets/img/gen/
node scripts/gen-image.mjs poster-book --aspect 3:4        # posters are portrait
node scripts/gen-image.mjs tclock-widgets --ref ~/Projects/clock-tui/assets/screenshot-clock-widgets.png
```

## Posters

Every page has a poster (`poster-<id>`, 3:4): one building or interior that says what the page is about, dominated by the page's pavilion color, standing in the brass arch of its hero (`PageHero`) and on the home carousel. Posters carry no text at all, so they are generated once and never localized. Their prompts end with the same no-text paragraph; the generation of October 2026 also needed, in several prompts, "the navy runs to all four edges, no cream margin" and "no labels or title". The table of pavilions and posters is in design-system.md.

Check before committing a poster: no letters, numbers or sign text anywhere (zoom in on signs, spines, screens and tapes); the named color is the clear accent; the subject reads at phone width; no real person's likeness. The weary round-faced robot may appear; never a named copyrighted character.

## Diagrams

Diagrams explain something and carry short labels. Writing a prompt that works:

- Describe layout and objects. Leave style to `_style.txt`.
- Put every label in double quotes, one to three words each, and end with "Only these labels: ...". Eight labels is about the limit before one goes missing.
- Say which way it reads and name each part's color by its subject (pennant red, copper, jade green, patina teal, cerulean blue, amethyst, mauve; brass gold for arrows and flow; cream for labels).

Check before committing:

1. Every label is present, spelled right, and appears once. No other text.
2. The picture says nothing untrue about the tool.
3. It reads at phone width.
4. The `alt` text says what the diagram says, in a sentence.

Generation costs a few cents per image and is not part of the build.

Every diagram with translatable labels also has a copy per language in `src/assets/img/gen/<locale>/`, made by `scripts/localize-image.mjs` from the labels in `images.json` (see `docs/i18n.md`). When an English diagram is regenerated, delete its copies and localize again, then compare every label with `images.json`; Hebrew, Japanese and Korean are where a model most often drops or swaps a character. If a label keeps failing, paint it over the English original with ImageMagick (mask the old text, fill it from a median of the surrounding background, draw the new label in a matching font and color), or delete the copy so the English one shows.

## The October 2026 set

All 31 diagrams, 16 posters and the share card were regenerated on 2026-10-15 for the World's Fair redesign, and every localized copy was checked label by label. Notes from that pass:

- Gemini often sets deco labels in capitals (frontier, attacks, tool, efficiency, bubbles, guardrails); spelling is checked, case is accepted.
- It adds a thin cream margin; agi-definitions, agi-benchmarks and agi-money-loop were cropped back to navy edge to edge.
- Prompts no longer end with a "The picture says..." sentence: Gemini printed it as a caption.
- `home-desk` keeps "PR"/"ISS" pills and a pixel clock, and `tclock-widgets` a readable time, because the reference screenshot makes the model draw digits every time.
- The Hebrew `limits-timeline` had its Mario label words painted back into right-to-left order.
- `agi-money-loop` has no pt-br copy: its labels read the same in Portuguese.

## Share card

`og` is generated at 16:9 like the diagrams, then cropped to `src/assets/img/og.jpg` (1200x630, JPEG, under 300 KB so WhatsApp shows the preview): `magick src/assets/img/gen/og.webp -resize 1200x630^ -gravity center -extent 1200x630 -quality 86 src/assets/img/og.jpg`. Its alt text is `site.ogAlt` in `common.json`.

## Favicon

`public/favicon.svg` is drawn by hand: the weary round-faced robot from the book cover (a silver dome, green eyes under heavy lids, a small frown) in a brass ring on the navy ground. `public/apple-touch-icon.png` is the same SVG rendered at 180 px: `magick -background none -density 600 public/favicon.svg -resize 180x180 public/apple-touch-icon.png`.

## Screenshots

Real screenshots live in `src/assets/img/shots/` and render through `Shot`. Where each comes from: [sources.md](sources.md), section 7. Astro converts them to responsive WebP at build time, so commit the original PNG or JPG.

## Screen recordings

GIFs are converted to MP4 with a poster frame, which is about a tenth of the size:

```bash
ffmpeg -i demo.gif -movflags +faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 26 -preset slow public/media/name.mp4
ffmpeg -i public/media/name.mp4 -frames:v 1 -update 1 public/media/name.jpg
```

## Video thumbnails

`node scripts/refresh-videos.mjs` downloads a thumbnail for every video in `src/data/videos.config.json` into `src/assets/img/video/`. The page never loads images from YouTube.

## Portrait

`src/assets/img/portrait/akita.png` is the home page portrait, transparent, 1600x1600. The source is the 200x200 newsletter avatar `~/Projects/akitando-news/docs/images/akita.jpg`.

1. `node scripts/upscale-portrait.mjs <akita.jpg> <out.png>` asks Gemini to redraw the same illustration at 2048x2048 on flat white (same face, pose, colors and line style; only sharper). Run it two or three times and keep the one closest to the original.
2. Remove the background with rembg's illustration model: `uvx --python 3.12 --from 'rembg[cli,cpu]' rembg i -m isnet-anime in.png out.png`. BiRefNet was tried and left a light halo around the outline.
3. `magick out.png -trim +repage -resize '1600x1600>' src/assets/img/portrait/akita.png`.

Plain flood fill does not work on this image: the white shirt touches the edge and would be removed with the background.

## Book

`src/assets/img/book/book-en.png` and `book-pt.png` are 3D renders of the book's official covers, made in Blender (no image model touches the cover):

```bash
blender -b -P scripts/render-book.py -- ~/Projects/ai-book-2026/assets/cover/cover-en.png /tmp/book-en.png "COMPETENT ENOUGH" 487
blender -b -P scripts/render-book.py -- ~/Projects/ai-book-2026/assets/cover/cover.png /tmp/book-pt.png "COMPETENTE O SUFICIENTE" 500
# The shadow-catching floor leaves a faint haze; drop it, then crop to the book and its shadow.
magick /tmp/book-en.png -channel A -level 14%,100% +channel /tmp/clean.png
magick /tmp/clean.png -crop $(magick /tmp/clean.png -alpha extract -threshold 1% -format %@ info:) +repage -bordercolor none -border 24 src/assets/img/book/book-en.png
```

The model is a 6 × 9 in paperback as thick as the print edition, about 0.0025 in per page (the last argument; pages from `src/data/book.ts`). The spine is drawn by the script in the cover's own navy, cream and Limelight title face. Made 2026-10-13 from the 1.0.0-preview.2 covers and re-rendered 2026-10-14 for preview.5's thickness (487 and 500 pages); checked on dark and light grounds. Re-render when the cover changes or the page count moves by more than a few dozen pages.

