# Images

## Diagrams

Generated with Google's Gemini image model (`gemini-3-pro-image`), then checked by eye. A generated diagram can misspell a label or draw something the tool does not do, so nothing ships unseen.

```bash
export GEMINI_API_KEY=...          # https://aistudio.google.com/apikey
$EDITOR scripts/prompts/home-loop.txt
node scripts/gen-image.mjs home-loop                     # 16:9, 1920 px WebP into src/assets/img/gen/
node scripts/gen-image.mjs home-loop --aspect 4:3        # also 1:1, 21:9, 3:2
node scripts/gen-image.mjs tclock-widgets --ref ~/Projects/clock-tui/assets/screenshot-clock-widgets.png
```

Every request gets `scripts/prompts/_style.txt` appended: the graphite ground, which hue belongs to which tool, green only for flow and status, short off-white labels. The site has no logo, so there is no default reference image; `--ref` attaches a real screenshot when a drawing should echo a tool's interface.

Writing a prompt that works:

- Describe layout and objects. Leave style to `_style.txt`.
- Put every label in double quotes, one to three words each, and end with "Only these labels: ...". Eight labels is about the limit before one goes missing.
- Say which way it reads and name the hue of each part by its subject.

Check before committing:

1. Every label is present and spelled right. (The first `workflow-symlinks` dropped "Kimi" and was regenerated.)
2. The picture says nothing untrue about the tool.
3. It reads at phone width.
4. The `alt` text says what the diagram says, in a sentence.

| Image | Used on |
|---|---|
| `home-desk` | home |
| `home-loop` | home |
| `home-switch` | home |
| `workflow-pipeline` | workflow |
| `workflow-symlinks` | workflow |
| `usagebar-providers` | ai-usagebar |
| `ghpending-digest` | ghpending |
| `tclock-widgets` | clock-tui |
| `newsletter-pipeline` | newsletter |
| `games-stack` | games |
| `games-clean-host` | games (regenerated once: the first try printed the prompt's own words, "LEFT PANEL", as labels; never name layout parts in quotes-free prose that could be read as text) |
| `og` (cropped to `src/assets/img/og.png`, 1200x630) | share card |

Generation costs a few cents per image and is not part of the build.

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
