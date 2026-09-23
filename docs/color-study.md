# Color study

The palette is built in OKLCH, a color space where equal numeric steps look like equal steps. That lets seven subject hues sit side by side at the same visual weight, and makes the light and dark themes mirror images of each other.

No color value appears in a page or component. Every color is a token generated from a few decisions:

```bash
node scripts/build-palette.mjs --write   # decisions in, tokens out, into src/styles/global.css
npm run check:colors                     # WCAG contrast, color-vision separation, and no stray color values
```

## 1. Where the colors come from

The site has no logo, so the palette comes from the tools themselves. Every screenshot on the site is a terminal or a panel on a dark ground, and they share one visual language: the NERV control-room look of the `nerv` and `evangelion` themes in tclock and ghpending.

| Seen in | Color | Becomes |
|---|---|---|
| tclock's digits | pure signal red | `red`, tclock |
| ghpending's repository headers, tclock's widget titles | amber | `amber`, ghpending (and the podcasts page) |
| The Omarchy Quattro panel border, the usage gauges | blue | `blue`, ai-usagebar |
| Evangelion Unit-01, the Omarchy accent | violet | `violet`, the workflow and skills |
| ai-memory's brand spectrum | teal | `teal`, ai-memory |
| tclock's calendar text | orange | `orange`, the games page and ai-jail |
| (the writing, set apart from the tools) | rose | `rose`, the blog, the benchmark, the newsletter |
| tclock's "● all systems healthy" dot | phosphor green | the one action color |
| The terminal ground in the tclock screenshots | warm graphite | the neutrals |

## 2. Decisions

**Seven subject hues at fixed angles: 27, 52, 80, 190, 252, 300, 350.** The warm end has three hues about 25 degrees apart and the cool end four hues about 50 degrees apart, because warm hues at the same lightness are easier to tell apart than they look on paper, while cool hues need more distance. The gap between 80 and 190 is deliberate: it is where the action green lives, alone.

**Green means go, and nothing else.** `--action` is `oklch(0.85 0.2 150)`, the same in both themes, with dark `--on-action` text. It is the primary button, the focus ring, the text selection and the status dot of a code block. Nothing decorative is green. Green sits in the empty part of the wheel, so one green button is the loudest thing on any page without being large.

**One lightness per role.** In a given theme all text-safe hues share one lightness: 0.48 in light mode, 0.83 in dark. `build-palette.mjs` finds, for each hue, the highest chroma that still fits sRGB at that lightness, then caps it. No subject looks heavier than its neighbor, which picking hex values by eye cannot guarantee: pure yellow and pure blue at the same HSL lightness differ enormously in perceived brightness.

**Three tiers per hue.**

| Tier | Token | Use | Text-safe |
|---|---|---|---|
| Ink | `--blue` | text, links, icons, kickers | yes, 4.5:1 or better on every ground |
| Soft | `--blue-soft` | fills behind that hue's content | ground only |
| Vivid | `--v-blue` | dots, rules, glows, the spectrum | never for text |

Vivid is identical in both themes, because it is the color of the tool itself. Ink and soft flip with the theme.

**Warm graphite neutrals, hue 60.** Dark ground `oklch(0.16 0.008 60)`, light ground `oklch(0.984 0.004 60)`. The sister sites already own the other two options: ai-jail's neutrals are maroon (hue 355) and ai-memory's are indigo (hue 282). A screenshot of any of the three sites is identifiable by its ground alone. Graphite is also what a terminal looks like, and it lets every subject hue sit on it without a cast.

**The spectrum is interpolated in OKLCH.** `linear-gradient(90deg in oklch, ...)` keeps the midpoints saturated. The same stops in sRGB go grey between amber and teal.

**Color is never the only cue.** Every hue travels with a label, a position or a shape: kickers are text, nav items are words, diagram labels are spelled out. The status dot is the only ornament, and it always sits next to words.

## 3. Color vision

`check:colors` simulates protanopia, deuteranopia and tritanopia at full severity (culori's deficiency filters) and reports the closest pair of vivid subject hues as a Euclidean distance in OKLab. About 0.1 is a clear difference; under 0.05 is easy to confuse.

The first version failed this: under deuteranopia, blue (ai-usagebar) and violet (the workflow) fell to 0.030, and they sit next to each other in the navigation. Darkening vivid violet from L 0.66 to 0.57 opened the gap without touching the text tokens. The tightest pair now is red and orange under tritanopia, the rarest of the three, at 0.077.

## 4. Light and dark

Text lightness 0.2 on ground 0.984 in light mode, 0.955 on 0.16 in dark. Accent ink flips from 0.48 to 0.83. Terminals, screenshots, diagrams, the quotes band and the closing band stay on the dark ink ground in both themes (`.on-ink`), the way a terminal does on a real desktop. That also means every diagram is generated once.

The theme follows the operating system until the visitor picks one; the footer has a "System" option that clears the choice. An inline script sets the theme before first paint, so there is no flash.

## 5. Type

| Role | Family | Why |
|---|---|---|
| Headlines | Hubot Sans, weight 800, width 112% | GitHub's display face, made for the tools' home. The width axis gives headlines presence without making them taller, which keeps long headlines to two lines on a phone. |
| Body and UI | Mona Sans, weight 400, width 100% | Hubot's text companion: same skeleton, tuned for reading, with tabular figures. |
| Code only | JetBrains Mono | Omarchy's default terminal font, so the code blocks look like the screenshots next to them. |

All three are variable fonts, self-hosted through Fontsource, with Latin Extended included for the Portuguese quote and a future Portuguese edition.

## 6. Generated images

The art direction in `scripts/prompts/_style.txt` names the same hex values and the same meanings: which hue belongs to which tool, green only for flow and status, the graphite ground. The images were generated when vivid violet was `#A86BFD`; the prompt now names the darker `#8E4AE2`, and the difference is only visible side by side.

## 7. Measured values

Regenerate with `node scripts/check-contrast.mjs --md`. Targets: 7:1 for body text (AAA), 4.5:1 for accents and muted text (AA).

### light

| Foreground | Background | Ratio | Target | |
|---|---|---|---|---|
| `text` #1a1511 | `bg` #fcf9f7 | 17.30 | 7 | pass |
| `text` #1a1511 | `surface` #ffffff | 18.13 | 7 | pass |
| `text` #1a1511 | `tint` #f5f0ec | 16.02 | 7 | pass |
| `muted` #5b544e | `bg` #fcf9f7 | 7.12 | 4.5 | pass |
| `muted` #5b544e | `surface` #ffffff | 7.47 | 4.5 | pass |
| `muted` #5b544e | `tint` #f5f0ec | 6.60 | 4.5 | pass |
| `red` #a52a26 | `bg` #fcf9f7 | 6.78 | 4.5 | pass |
| `red` #a52a26 | `surface` #ffffff | 7.10 | 4.5 | pass |
| `red` #a52a26 | `tint` #f5f0ec | 6.27 | 4.5 | pass |
| `red` #a52a26 | `red-soft` #ffebe8 | 6.18 | 4.5 | pass |
| `orange` #924501 | `bg` #fcf9f7 | 6.54 | 4.5 | pass |
| `orange` #924501 | `surface` #ffffff | 6.85 | 4.5 | pass |
| `orange` #924501 | `tint` #f5f0ec | 6.05 | 4.5 | pass |
| `orange` #924501 | `orange-soft` #ffece1 | 5.97 | 4.5 | pass |
| `amber` #7b5601 | `bg` #fcf9f7 | 6.32 | 4.5 | pass |
| `amber` #7b5601 | `surface` #ffffff | 6.63 | 4.5 | pass |
| `amber` #7b5601 | `tint` #f5f0ec | 5.86 | 4.5 | pass |
| `amber` #7b5601 | `amber-soft` #fdeed6 | 5.80 | 4.5 | pass |
| `teal` #006c68 | `bg` #fcf9f7 | 5.98 | 4.5 | pass |
| `teal` #006c68 | `surface` #ffffff | 6.26 | 4.5 | pass |
| `teal` #006c68 | `tint` #f5f0ec | 5.54 | 4.5 | pass |
| `teal` #006c68 | `teal-soft` #d7f8f5 | 5.56 | 4.5 | pass |
| `blue` #005eab | `bg` #fcf9f7 | 6.28 | 4.5 | pass |
| `blue` #005eab | `surface` #ffffff | 6.58 | 4.5 | pass |
| `blue` #005eab | `tint` #f5f0ec | 5.81 | 4.5 | pass |
| `blue` #005eab | `blue-soft` #e6f2ff | 5.78 | 4.5 | pass |
| `violet` #6d41a9 | `bg` #fcf9f7 | 6.73 | 4.5 | pass |
| `violet` #6d41a9 | `surface` #ffffff | 7.05 | 4.5 | pass |
| `violet` #6d41a9 | `tint` #f5f0ec | 6.23 | 4.5 | pass |
| `violet` #6d41a9 | `violet-soft` #f2edff | 6.15 | 4.5 | pass |
| `rose` #9b2b6a | `bg` #fcf9f7 | 6.84 | 4.5 | pass |
| `rose` #9b2b6a | `surface` #ffffff | 7.16 | 4.5 | pass |
| `rose` #9b2b6a | `tint` #f5f0ec | 6.33 | 4.5 | pass |
| `rose` #9b2b6a | `rose-soft` #ffe9f3 | 6.22 | 4.5 | pass |
| `green` #007132 | `bg` #fcf9f7 | 5.87 | 4.5 | pass |
| `green` #007132 | `surface` #ffffff | 6.15 | 4.5 | pass |
| `on-action` #002112 | `action` #52f184 | 11.58 | 7 | pass |
| `on-action` #002112 | `action-hi` #8cffa7 | 13.79 | 7 | pass |
| `on-ink` #f3efec | `ink` #100c0a | 17.02 | 7 | pass |
| `on-ink` #f3efec | `ink-raised` #1c1714 | 15.55 | 7 | pass |
| `on-ink-muted` #b7afaa | `ink-raised` #1c1714 | 8.24 | 4.5 | pass |
| `line` #dfd7d1 | `bg` #fcf9f7 | 1.35 | 1.2 | pass |

### dark

| Foreground | Background | Ratio | Target | |
|---|---|---|---|---|
| `text` #f3efec | `bg` #100c0a | 17.02 | 7 | pass |
| `text` #f3efec | `surface` #1a1512 | 15.88 | 7 | pass |
| `text` #f3efec | `tint` #221d19 | 14.63 | 7 | pass |
| `muted` #b7afaa | `bg` #100c0a | 9.02 | 4.5 | pass |
| `muted` #b7afaa | `surface` #1a1512 | 8.42 | 4.5 | pass |
| `muted` #b7afaa | `tint` #221d19 | 7.76 | 4.5 | pass |
| `red` #ffb0a6 | `bg` #100c0a | 11.11 | 4.5 | pass |
| `red` #ffb0a6 | `surface` #1a1512 | 10.36 | 4.5 | pass |
| `red` #ffb0a6 | `tint` #221d19 | 9.55 | 4.5 | pass |
| `red` #ffb0a6 | `red-soft` #3d1b17 | 8.79 | 4.5 | pass |
| `orange` #ffb486 | `bg` #100c0a | 11.18 | 4.5 | pass |
| `orange` #ffb486 | `surface` #1a1512 | 10.44 | 4.5 | pass |
| `orange` #ffb486 | `tint` #221d19 | 9.62 | 4.5 | pass |
| `orange` #ffb486 | `orange-soft` #3b1e0a | 8.80 | 4.5 | pass |
| `amber` #f3bd5c | `bg` #100c0a | 11.37 | 4.5 | pass |
| `amber` #f3bd5c | `surface` #1a1512 | 10.61 | 4.5 | pass |
| `amber` #f3bd5c | `tint` #221d19 | 9.78 | 4.5 | pass |
| `amber` #f3bd5c | `amber-soft` #342301 | 8.87 | 4.5 | pass |
| `teal` #3fe2da | `bg` #100c0a | 12.11 | 4.5 | pass |
| `teal` #3fe2da | `surface` #1a1512 | 11.30 | 4.5 | pass |
| `teal` #3fe2da | `tint` #221d19 | 10.42 | 4.5 | pass |
| `teal` #3fe2da | `teal-soft` #002e2b | 9.23 | 4.5 | pass |
| `blue` #9eccff | `bg` #100c0a | 11.55 | 4.5 | pass |
| `blue` #9eccff | `surface` #1a1512 | 10.78 | 4.5 | pass |
| `blue` #9eccff | `tint` #221d19 | 9.93 | 4.5 | pass |
| `blue` #9eccff | `blue-soft` #102840 | 8.96 | 4.5 | pass |
| `violet` #d1b9ff | `bg` #100c0a | 11.18 | 4.5 | pass |
| `violet` #d1b9ff | `surface` #1a1512 | 10.43 | 4.5 | pass |
| `violet` #d1b9ff | `tint` #221d19 | 9.61 | 4.5 | pass |
| `violet` #d1b9ff | `violet-soft` #2b203d | 8.81 | 4.5 | pass |
| `rose` #ffa9d2 | `bg` #100c0a | 10.96 | 4.5 | pass |
| `rose` #ffa9d2 | `surface` #1a1512 | 10.23 | 4.5 | pass |
| `rose` #ffa9d2 | `tint` #221d19 | 9.42 | 4.5 | pass |
| `rose` #ffa9d2 | `rose-soft` #3a1a2a | 8.69 | 4.5 | pass |
| `green` #86df9a | `bg` #100c0a | 12.06 | 4.5 | pass |
| `green` #86df9a | `surface` #1a1512 | 11.26 | 4.5 | pass |
| `on-action` #002112 | `action` #52f184 | 11.58 | 7 | pass |
| `on-action` #002112 | `action-hi` #8cffa7 | 13.79 | 7 | pass |
| `on-ink` #f3efec | `ink` #100c0a | 17.02 | 7 | pass |
| `on-ink` #f3efec | `ink-raised` #1c1714 | 15.55 | 7 | pass |
| `on-ink-muted` #b7afaa | `ink-raised` #1c1714 | 8.24 | 4.5 | pass |
| `line` #3d3732 | `bg` #100c0a | 1.65 | 1.2 | pass |

### Closest pair of subject hues

| Vision | Closest pair | OKLab distance |
|---|---|---|
| normal | orange and amber | 0.130 |
| protan | violet and rose | 0.125 |
| deutan | teal and rose | 0.093 |
| tritan | red and orange | 0.077 |
