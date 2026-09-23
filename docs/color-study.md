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
| The Omarchy accent | violet, a bluer lavender than the ground | `violet`, the workflow and skills |
| ai-memory's brand spectrum | teal | `teal`, ai-memory |
| tclock's calendar text | orange | `orange`, the games page and ai-jail |
| (the writing, set apart from the tools) | rose | `rose`, the blog, the benchmark, the newsletter |
| tclock's "● all systems healthy" dot, and Unit-01's green on purple | phosphor green | the one action color |
| Evangelion Unit-01's purple armor (the NERV look of the `nerv` and `evangelion` themes) | dark aubergine purple | the neutrals |

## 2. Decisions

**Seven subject hues at fixed angles: 27, 52, 80, 190, 250, 288, 350.** The warm end has three hues about 25 degrees apart and the cool end four hues about 50 degrees apart, because warm hues at the same lightness are easier to tell apart than they look on paper, while cool hues need more distance. The gap between 80 and 190 is deliberate: it is where the action green lives, alone.

**Green means go, and nothing else.** `--action` is `oklch(0.85 0.2 150)`, the same in both themes, with dark `--on-action` text. It is the primary button, the focus ring, the text selection and the status dot of a code block. Nothing decorative is green. Green sits in the empty part of the wheel, so one green button is the loudest thing on any page without being large.

**One lightness per role.** In a given theme all text-safe hues share one lightness: 0.48 in light mode, 0.83 in dark. `build-palette.mjs` finds, for each hue, the highest chroma that still fits sRGB at that lightness, then caps it. No subject looks heavier than its neighbor, which picking hex values by eye cannot guarantee: pure yellow and pure blue at the same HSL lightness differ enormously in perceived brightness.

**Three tiers per hue.**

| Tier | Token | Use | Text-safe |
|---|---|---|---|
| Ink | `--blue` | text, links, icons, kickers | yes, 4.5:1 or better on every ground |
| Soft | `--blue-soft` | fills behind that hue's content | ground only |
| Vivid | `--v-blue` | dots, rules, glows, the spectrum | never for text |

Vivid is identical in both themes, because it is the color of the tool itself. Ink and soft flip with the theme.

**Dark purple neutrals, hue 310.** Dark ground `oklch(0.16 0.05 310)` (#14061d), light ground `oklch(0.983 0.008 310)` (#fbf8fe). The first version used a warm graphite (hue 60, almost no chroma), and next to the sister sites it read as a cousin of ai-jail's maroon. The ground moved to a clearly purple aubergine with enough chroma (0.05) to be seen as a color, not a tinted black. It sits between the sister sites on the wheel: ai-memory's ground is indigo (hue 282, #0a0a1b) and ai-jail's is maroon (hue 355, #11070b), so the three are told apart by their grounds alone. Purple ground with a phosphor green action color is Evangelion Unit-01's scheme, the same NERV look the tools use in their terminals. The violet subject moved from 300 to 288 so it stays distinguishable from the ground.

**The spectrum is interpolated in OKLCH.** `linear-gradient(90deg in oklch, ...)` keeps the midpoints saturated. The same stops in sRGB go grey between amber and teal.

**Color is never the only cue.** Every hue travels with a label, a position or a shape: kickers are text, nav items are words, diagram labels are spelled out. The status dot is the only ornament, and it always sits next to words.

## 3. Color vision

`check:colors` simulates protanopia, deuteranopia and tritanopia at full severity (culori's deficiency filters) and reports the closest pair of vivid subject hues as a Euclidean distance in OKLab. About 0.1 is a clear difference; under 0.05 is easy to confuse.

The first version failed this: under deuteranopia, blue (ai-usagebar) and violet (the workflow) fell to 0.030, and they sit next to each other in the navigation. Darkening vivid violet from L 0.66 to 0.57 opened the gap without touching the text tokens. The tightest pair now is red and orange under tritanopia, the rarest of the three, at 0.077.

## 4. Light and dark

Text lightness 0.2 on ground 0.983 in light mode, 0.96 on 0.16 in dark. Accent ink flips from 0.48 to 0.83. Terminals, screenshots, diagrams, the quotes band and the closing band stay on the dark ink ground in both themes (`.on-ink`), the way a terminal does on a real desktop. That also means every diagram is generated once.

The theme follows the operating system until the visitor picks one; the footer has a "System" option that clears the choice. An inline script sets the theme before first paint, so there is no flash.

## 5. Type

| Role | Family | Why |
|---|---|---|
| Headlines | Hubot Sans, weight 800, width 112% | GitHub's display face, made for the tools' home. The width axis gives headlines presence without making them taller, which keeps long headlines to two lines on a phone. |
| Body and UI | Mona Sans, weight 400, width 100% | Hubot's text companion: same skeleton, tuned for reading, with tabular figures. |
| Code only | JetBrains Mono | Omarchy's default terminal font, so the code blocks look like the screenshots next to them. |

All three are variable fonts, self-hosted through Fontsource, with Latin Extended included for the Portuguese quote and a future Portuguese edition.

## 6. Generated images

The art direction in `scripts/prompts/_style.txt` names the same hex values and the same meanings: which hue belongs to which tool, green only for flow and status, the purple ground. Every diagram was regenerated when the ground moved to purple, so the images and the page share one ground.

## 7. Measured values

Regenerate with `node scripts/check-contrast.mjs --md`. Targets: 7:1 for body text (AAA), 4.5:1 for accents and muted text (AA).

### light

| Foreground | Background | Ratio | Target | |
|---|---|---|---|---|
| `text` #1c1025 | `bg` #fbf8fe | 17.37 | 7 | pass |
| `text` #1c1025 | `surface` #ffffff | 18.28 | 7 | pass |
| `text` #1c1025 | `tint` #f3edf8 | 15.97 | 7 | pass |
| `muted` #5d4e68 | `bg` #fbf8fe | 7.21 | 4.5 | pass |
| `muted` #5d4e68 | `surface` #ffffff | 7.58 | 4.5 | pass |
| `muted` #5d4e68 | `tint` #f3edf8 | 6.62 | 4.5 | pass |
| `red` #a52a26 | `bg` #fbf8fe | 6.75 | 4.5 | pass |
| `red` #a52a26 | `surface` #ffffff | 7.10 | 4.5 | pass |
| `red` #a52a26 | `tint` #f3edf8 | 6.20 | 4.5 | pass |
| `red` #a52a26 | `red-soft` #ffebe8 | 6.18 | 4.5 | pass |
| `orange` #924501 | `bg` #fbf8fe | 6.51 | 4.5 | pass |
| `orange` #924501 | `surface` #ffffff | 6.85 | 4.5 | pass |
| `orange` #924501 | `tint` #f3edf8 | 5.98 | 4.5 | pass |
| `orange` #924501 | `orange-soft` #ffece1 | 5.97 | 4.5 | pass |
| `amber` #7b5601 | `bg` #fbf8fe | 6.30 | 4.5 | pass |
| `amber` #7b5601 | `surface` #ffffff | 6.63 | 4.5 | pass |
| `amber` #7b5601 | `tint` #f3edf8 | 5.79 | 4.5 | pass |
| `amber` #7b5601 | `amber-soft` #fdeed6 | 5.80 | 4.5 | pass |
| `teal` #006c68 | `bg` #fbf8fe | 5.95 | 4.5 | pass |
| `teal` #006c68 | `surface` #ffffff | 6.26 | 4.5 | pass |
| `teal` #006c68 | `tint` #f3edf8 | 5.47 | 4.5 | pass |
| `teal` #006c68 | `teal-soft` #d7f8f5 | 5.56 | 4.5 | pass |
| `blue` #0060a6 | `bg` #fbf8fe | 6.22 | 4.5 | pass |
| `blue` #0060a6 | `surface` #ffffff | 6.55 | 4.5 | pass |
| `blue` #0060a6 | `tint` #f3edf8 | 5.72 | 4.5 | pass |
| `blue` #0060a6 | `blue-soft` #e5f2ff | 5.75 | 4.5 | pass |
| `violet` #5d48b1 | `bg` #fbf8fe | 6.62 | 4.5 | pass |
| `violet` #5d48b1 | `surface` #ffffff | 6.97 | 4.5 | pass |
| `violet` #5d48b1 | `tint` #f3edf8 | 6.09 | 4.5 | pass |
| `violet` #5d48b1 | `violet-soft` #efeeff | 6.09 | 4.5 | pass |
| `rose` #9b2b6a | `bg` #fbf8fe | 6.81 | 4.5 | pass |
| `rose` #9b2b6a | `surface` #ffffff | 7.16 | 4.5 | pass |
| `rose` #9b2b6a | `tint` #f3edf8 | 6.25 | 4.5 | pass |
| `rose` #9b2b6a | `rose-soft` #ffe9f3 | 6.22 | 4.5 | pass |
| `green` #007132 | `bg` #fbf8fe | 5.84 | 4.5 | pass |
| `green` #007132 | `surface` #ffffff | 6.15 | 4.5 | pass |
| `on-action` #002112 | `action` #52f184 | 11.58 | 7 | pass |
| `on-action` #002112 | `action-hi` #8cffa7 | 13.79 | 7 | pass |
| `on-ink` #f4f0f8 | `ink` #14061d | 17.36 | 7 | pass |
| `on-ink` #f4f0f8 | `ink-raised` #20102b | 15.94 | 7 | pass |
| `on-ink-muted` #beb2c9 | `ink-raised` #20102b | 8.87 | 4.5 | pass |
| `line` #ddd3e6 | `bg` #fbf8fe | 1.38 | 1.2 | pass |

### dark

| Foreground | Background | Ratio | Target | |
|---|---|---|---|---|
| `text` #f4f0f8 | `bg` #14061d | 17.36 | 7 | pass |
| `text` #f4f0f8 | `surface` #1f0f2a | 16.10 | 7 | pass |
| `text` #f4f0f8 | `tint` #281634 | 14.85 | 7 | pass |
| `muted` #beb2c9 | `bg` #14061d | 9.66 | 4.5 | pass |
| `muted` #beb2c9 | `surface` #1f0f2a | 8.96 | 4.5 | pass |
| `muted` #beb2c9 | `tint` #281634 | 8.26 | 4.5 | pass |
| `red` #ffb0a6 | `bg` #14061d | 11.19 | 4.5 | pass |
| `red` #ffb0a6 | `surface` #1f0f2a | 10.38 | 4.5 | pass |
| `red` #ffb0a6 | `tint` #281634 | 9.57 | 4.5 | pass |
| `red` #ffb0a6 | `red-soft` #3d1b17 | 8.79 | 4.5 | pass |
| `orange` #ffb486 | `bg` #14061d | 11.27 | 4.5 | pass |
| `orange` #ffb486 | `surface` #1f0f2a | 10.45 | 4.5 | pass |
| `orange` #ffb486 | `tint` #281634 | 9.64 | 4.5 | pass |
| `orange` #ffb486 | `orange-soft` #3b1e0a | 8.80 | 4.5 | pass |
| `amber` #f3bd5c | `bg` #14061d | 11.46 | 4.5 | pass |
| `amber` #f3bd5c | `surface` #1f0f2a | 10.63 | 4.5 | pass |
| `amber` #f3bd5c | `tint` #281634 | 9.80 | 4.5 | pass |
| `amber` #f3bd5c | `amber-soft` #342301 | 8.87 | 4.5 | pass |
| `teal` #3fe2da | `bg` #14061d | 12.20 | 4.5 | pass |
| `teal` #3fe2da | `surface` #1f0f2a | 11.32 | 4.5 | pass |
| `teal` #3fe2da | `tint` #281634 | 10.44 | 4.5 | pass |
| `teal` #3fe2da | `teal-soft` #002e2b | 9.23 | 4.5 | pass |
| `blue` #9cccff | `bg` #14061d | 11.65 | 4.5 | pass |
| `blue` #9cccff | `surface` #1f0f2a | 10.81 | 4.5 | pass |
| `blue` #9cccff | `tint` #281634 | 9.97 | 4.5 | pass |
| `blue` #9cccff | `blue-soft` #0f2840 | 8.96 | 4.5 | pass |
| `violet` #c4bfff | `bg` #14061d | 11.37 | 4.5 | pass |
| `violet` #c4bfff | `surface` #1f0f2a | 10.54 | 4.5 | pass |
| `violet` #c4bfff | `tint` #281634 | 9.72 | 4.5 | pass |
| `violet` #c4bfff | `violet-soft` #252140 | 8.87 | 4.5 | pass |
| `rose` #ffa9d2 | `bg` #14061d | 11.04 | 4.5 | pass |
| `rose` #ffa9d2 | `surface` #1f0f2a | 10.24 | 4.5 | pass |
| `rose` #ffa9d2 | `tint` #281634 | 9.44 | 4.5 | pass |
| `rose` #ffa9d2 | `rose-soft` #3a1a2a | 8.69 | 4.5 | pass |
| `green` #86df9a | `bg` #14061d | 12.15 | 4.5 | pass |
| `green` #86df9a | `surface` #1f0f2a | 11.27 | 4.5 | pass |
| `on-action` #002112 | `action` #52f184 | 11.58 | 7 | pass |
| `on-action` #002112 | `action-hi` #8cffa7 | 13.79 | 7 | pass |
| `on-ink` #f4f0f8 | `ink` #14061d | 17.36 | 7 | pass |
| `on-ink` #f4f0f8 | `ink-raised` #20102b | 15.94 | 7 | pass |
| `on-ink-muted` #beb2c9 | `ink-raised` #20102b | 8.87 | 4.5 | pass |
| `line` #443152 | `bg` #14061d | 1.69 | 1.2 | pass |

### Closest pair of subject hues

| Vision | Closest pair | OKLab distance |
|---|---|---|
| normal | orange and amber | 0.130 |
| protan | violet and rose | 0.127 |
| deutan | teal and rose | 0.093 |
| tritan | red and orange | 0.077 |
