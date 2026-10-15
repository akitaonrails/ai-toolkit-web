# Color study

The palette is built in OKLCH, a color space where equal numeric steps look like equal steps. That lets seven pavilion colors sit side by side at the same visual weight, and makes the night and day themes mirror images of each other.

No color value appears in a page or component. Every color is a token generated from a few decisions:

```bash
node scripts/build-palette.mjs --write   # decisions in, tokens out, into src/styles/global.css
npm run check:colors                     # WCAG contrast, color-vision separation, and no stray color values
```

## 1. Where the colors come from

Since October 2026 the site follows the owner's book, *Competent Enough*. Its cover is a 1950s World's Fair poster: a giant brass robot, a deep teal-navy sky with sunburst rays, cream lettering, pennants. The site is that fair at night, with an undersea art-deco city's brass and glass, and every page is a pavilion in its own enamel color.

| Seen on the cover and in the genre | Color | Becomes |
|---|---|---|
| The night sky behind the robot, the ocean around an undersea city | Rapture navy, hue 238 | the night ground and the always-dark ink |
| The cover's lettering, an old poster's paper | poster cream, hue 84 | night text and the day ground |
| The robot's trim, the fair's signs, the gilt frames | brass, hue 86 | the one action color |
| The pennants on the fairground | pennant red, 28 | AGI, tclock |
| Copper roofs and arcade neon | copper, 55 | games, ai-jail |
| A library's banker's lamps, garden pavilions | jade, 162 | the book, students, ghpending, podcasts |
| Weathered bronze, the lagoon | patina, 196 | ai-memory, setup |
| The undersea windows, the gauges | cerulean, 240 | ai-usagebar, the limits of LLMs |
| Deco glass and stage curtains | amethyst, 305 | the workflow, the Frank projects |
| Dusty deco rose | mauve, 355 | writing, the newsletter |

## 2. Decisions

**Seven pavilion colors, muted like printed enamel.** Chroma is capped lower than a screen palette (text tones at 0.13 in day, 0.10 at night), so the colors read as paint on a sign, not light from a screen. `build-palette.mjs` finds for each hue the highest chroma that fits sRGB at the role's lightness, then caps it, so no subject looks heavier than its neighbor.

**Brass means press, and nothing else.** `--action` is brass (`oklch(0.76 0.12 86)`), the same in both themes, with navy `--on-action` text. It is the primary button, the focus ring and the text selection. No subject is brass. Brass also appears as gilt frames and rules (`--v-brass`), which never look clickable because they are lines, not fills.

**Night is the default.** `:root` holds the night fair (navy `oklch(0.19 0.045 238)`, cream text); `[data-theme='light']` overrides it with the day fair (cream `oklch(0.945 0.03 84)`, navy text). The theme script still follows the system until the visitor picks one.

**One lightness per role.** In a given theme all text-safe hues share one lightness: 0.45 by day, 0.82 by night. Ink tones pass 4.5:1 on every ground.

**Three tiers per hue.**

| Tier | Token | Use | Text-safe |
|---|---|---|---|
| Ink | `--jade` | text, links, icons, kickers | yes, 4.5:1 or better on every ground |
| Soft | `--jade-soft` | plates behind that subject's content, the hero pattern | ground only |
| Vivid | `--v-jade` | diamonds, rules, frames, map pavilions | never for text |

Vivid is identical in both themes. Its lightness is spread on purpose (pennant 0.52, amethyst 0.48, jade 0.58, mauve 0.66, cerulean 0.68, copper 0.72, patina 0.76), so subjects stay apart for every color vision (section 3).

**Color is never the only cue.** Every color travels with a label, a position or a shape: kickers are text, nav items are words, map pavilions are labelled and shaped differently, and each pavilion also has its own pattern.

## 3. Color vision

`check:colors` simulates protanopia, deuteranopia and tritanopia at full severity and reports the closest pair of vivid subject colors as a Euclidean distance in OKLab. About 0.1 is a clear difference; under 0.05 is easy to confuse.

The first fair palette failed: jade and mauve fell to 0.027 under deuteranopia, jade and cerulean to 0.027 under tritanopia, and the book (jade) sits next to the newsletter (mauve) in the Writing menu. Spreading the vivid lightness (section 2) lifted the closest pair to 0.075 (jade and mauve under protanopia), without touching the text tokens.

## 4. Night and day

Text lightness 0.93 on ground 0.19 at night, 0.25 on 0.945 by day. Figures, terminals, posters, the fair map and the closing band stay on the always-dark ink in both themes (`.on-ink`, `--ink`), the way a poster is printed once. That also means every image is generated once.

## 5. Type

Limelight (the book cover's title face) for titles, Josefin Sans for signage and controls, Source Serif 4 (the book's body face) for reading, JetBrains Mono for code. Details in [design-system.md](design-system.md).

## 6. Generated images

The art direction in `scripts/prompts/_style.txt` names the same colors in hex (vivid tier) and the navy ground, so posters and diagrams sit in the palette. When a vivid value changes here, update those hex codes too.

## 7. Measured values

Output of `node scripts/check-contrast.mjs --md` on 2026-10-15.

### dark

| Foreground | Background | Ratio | Target | |
|---|---|---|---|---|
| `text` #f3e6ce | `bg` #001624 | 14.98 | 7 | pass |
| `text` #f3e6ce | `surface` #022133 | 13.49 | 7 | pass |
| `text` #f3e6ce | `tint` #06283b | 12.37 | 7 | pass |
| `muted` #cabca1 | `bg` #001624 | 9.85 | 4.5 | pass |
| `muted` #cabca1 | `surface` #022133 | 8.87 | 4.5 | pass |
| `muted` #cabca1 | `tint` #06283b | 8.13 | 4.5 | pass |
| `pennant` #feaba0 | `bg` #001624 | 10.16 | 4.5 | pass |
| `pennant` #feaba0 | `surface` #022133 | 9.15 | 4.5 | pass |
| `pennant` #feaba0 | `tint` #06283b | 8.39 | 4.5 | pass |
| `pennant` #feaba0 | `pennant-soft` #3e1f1b | 8.20 | 4.5 | pass |
| `copper` #f7b385 | `bg` #001624 | 10.29 | 4.5 | pass |
| `copper` #f7b385 | `surface` #022133 | 9.27 | 4.5 | pass |
| `copper` #f7b385 | `tint` #06283b | 8.50 | 4.5 | pass |
| `copper` #f7b385 | `copper-soft` #3c220f | 8.26 | 4.5 | pass |
| `jade` #86d9b0 | `bg` #001624 | 10.99 | 4.5 | pass |
| `jade` #86d9b0 | `surface` #022133 | 9.90 | 4.5 | pass |
| `jade` #86d9b0 | `tint` #06283b | 9.08 | 4.5 | pass |
| `jade` #86d9b0 | `jade-soft` #0d3021 | 8.53 | 4.5 | pass |
| `patina` #6cd8d9 | `bg` #001624 | 10.96 | 4.5 | pass |
| `patina` #6cd8d9 | `surface` #022133 | 9.88 | 4.5 | pass |
| `patina` #6cd8d9 | `tint` #06283b | 9.06 | 4.5 | pass |
| `patina` #6cd8d9 | `patina-soft` #003031 | 8.53 | 4.5 | pass |
| `cerulean` #86cdff | `bg` #001624 | 10.69 | 4.5 | pass |
| `cerulean` #86cdff | `surface` #022133 | 9.63 | 4.5 | pass |
| `cerulean` #86cdff | `tint` #06283b | 8.83 | 4.5 | pass |
| `cerulean` #86cdff | `cerulean-soft` #0e2c3f | 8.42 | 4.5 | pass |
| `amethyst` #d3b4f9 | `bg` #001624 | 10.22 | 4.5 | pass |
| `amethyst` #d3b4f9 | `surface` #022133 | 9.21 | 4.5 | pass |
| `amethyst` #d3b4f9 | `tint` #06283b | 8.44 | 4.5 | pass |
| `amethyst` #d3b4f9 | `amethyst-soft` #2f223d | 8.23 | 4.5 | pass |
| `mauve` #f8a9c7 | `bg` #001624 | 10.10 | 4.5 | pass |
| `mauve` #f8a9c7 | `surface` #022133 | 9.10 | 4.5 | pass |
| `mauve` #f8a9c7 | `tint` #06283b | 8.34 | 4.5 | pass |
| `mauve` #f8a9c7 | `mauve-soft` #3c1e2a | 8.17 | 4.5 | pass |
| `brass` #e0b85c | `bg` #001624 | 9.81 | 4.5 | pass |
| `brass` #e0b85c | `surface` #022133 | 8.84 | 4.5 | pass |
| `on-paper` #002539 | `paper` #f3e6ce | 12.94 | 7 | pass |
| `on-action` #001624 | `action` #d3ab4e | 8.53 | 7 | pass |
| `on-action` #001624 | `action-hi` #eac266 | 10.85 | 7 | pass |
| `on-ink` #f3e6ce | `ink` #001624 | 14.98 | 7 | pass |
| `on-ink` #f3e6ce | `ink-raised` #022234 | 13.31 | 7 | pass |
| `on-ink-muted` #cabca1 | `ink-raised` #022234 | 8.75 | 4.5 | pass |
| `line` #2d4c60 | `bg` #001624 | 2.02 | 1.2 | pass |

### light

| Foreground | Background | Ratio | Target | |
|---|---|---|---|---|
| `text` #002539 | `bg` #f6ecd7 | 13.54 | 7 | pass |
| `text` #002539 | `surface` #fdf6e9 | 14.80 | 7 | pass |
| `text` #002539 | `tint` #ede0c5 | 12.17 | 7 | pass |
| `muted` #3b5669 | `bg` #f6ecd7 | 6.55 | 4.5 | pass |
| `muted` #3b5669 | `surface` #fdf6e9 | 7.16 | 4.5 | pass |
| `muted` #3b5669 | `tint` #ede0c5 | 5.89 | 4.5 | pass |
| `pennant` #903129 | `bg` #f6ecd7 | 6.76 | 4.5 | pass |
| `pennant` #903129 | `surface` #fdf6e9 | 7.39 | 4.5 | pass |
| `pennant` #903129 | `tint` #ede0c5 | 6.07 | 4.5 | pass |
| `pennant` #903129 | `pennant-soft` #fedbd6 | 6.19 | 4.5 | pass |
| `copper` #834101 | `bg` #f6ecd7 | 6.59 | 4.5 | pass |
| `copper` #834101 | `surface` #fdf6e9 | 7.20 | 4.5 | pass |
| `copper` #834101 | `tint` #ede0c5 | 5.92 | 4.5 | pass |
| `copper` #834101 | `copper-soft` #fbdecc | 6.06 | 4.5 | pass |
| `jade` #006644 | `bg` #f6ecd7 | 6.01 | 4.5 | pass |
| `jade` #006644 | `surface` #fdf6e9 | 6.57 | 4.5 | pass |
| `jade` #006644 | `tint` #ede0c5 | 5.40 | 4.5 | pass |
| `jade` #006644 | `jade-soft` #ceeddc | 5.66 | 4.5 | pass |
| `patina` #006263 | `bg` #f6ecd7 | 6.09 | 4.5 | pass |
| `patina` #006263 | `surface` #fdf6e9 | 6.66 | 4.5 | pass |
| `patina` #006263 | `tint` #ede0c5 | 5.48 | 4.5 | pass |
| `patina` #006263 | `patina-soft` #c7eded | 5.73 | 4.5 | pass |
| `cerulean` #005b88 | `bg` #f6ecd7 | 6.25 | 4.5 | pass |
| `cerulean` #005b88 | `surface` #fdf6e9 | 6.83 | 4.5 | pass |
| `cerulean` #005b88 | `tint` #ede0c5 | 5.62 | 4.5 | pass |
| `cerulean` #005b88 | `cerulean-soft` #cee9fd | 5.83 | 4.5 | pass |
| `amethyst` #663e8e | `bg` #f6ecd7 | 6.73 | 4.5 | pass |
| `amethyst` #663e8e | `surface` #fdf6e9 | 7.36 | 4.5 | pass |
| `amethyst` #663e8e | `tint` #ede0c5 | 6.05 | 4.5 | pass |
| `amethyst` #663e8e | `amethyst-soft` #ebdefb | 6.18 | 4.5 | pass |
| `mauve` #892f59 | `bg` #f6ecd7 | 6.81 | 4.5 | pass |
| `mauve` #892f59 | `surface` #fdf6e9 | 7.45 | 4.5 | pass |
| `mauve` #892f59 | `tint` #ede0c5 | 6.12 | 4.5 | pass |
| `mauve` #892f59 | `mauve-soft` #fcdae6 | 6.22 | 4.5 | pass |
| `brass` #735601 | `bg` #f6ecd7 | 5.85 | 4.5 | pass |
| `brass` #735601 | `surface` #fdf6e9 | 6.40 | 4.5 | pass |
| `on-paper` #002539 | `paper` #f3e6ce | 12.94 | 7 | pass |
| `on-action` #001624 | `action` #d3ab4e | 8.53 | 7 | pass |
| `on-action` #001624 | `action-hi` #eac266 | 10.85 | 7 | pass |
| `on-ink` #f3e6ce | `ink` #001624 | 14.98 | 7 | pass |
| `on-ink` #f3e6ce | `ink-raised` #022234 | 13.31 | 7 | pass |
| `on-ink-muted` #cabca1 | `ink-raised` #022234 | 8.75 | 4.5 | pass |
| `line` #cdbb9e | `bg` #f6ecd7 | 1.59 | 1.2 | pass |

### Closest pair of subject hues

| Vision | Closest pair | OKLab distance |
|---|---|---|
| normal | patina and cerulean | 0.118 |
| protan | jade and mauve | 0.075 |
| deutan | patina and mauve | 0.087 |
| tritan | patina and cerulean | 0.090 |
