# Sources: where every fact on this site comes from

Use this file whenever the owner says "update the site", "a new version is out" or "add X". For each source it lists what the site takes from it, where that lands, and how to spot a gap. Nothing on the site should state a fact that is not traceable to a row here.

Local checkouts live in `~/Projects/` (same as `/mnt/data/Projects/`). Pull before reading: `git -C ~/Projects/<repo> pull --ff-only`.

## 1. Quick gap check

Run these, then read the sections below for whatever changed.

```bash
npm run snapshot:github             # stars and latest release of every repo in src/data/repos.json
git -C ~/Projects/ai-usagebar log --oneline $(git -C ~/Projects/ai-usagebar describe --tags --abbrev=0)..HEAD | head
node scripts/refresh-videos.mjs     # podcast metadata and thumbnails (falls back to the cache when YouTube refuses)
grep -o 'href="/en/20[^"]*"' ~/Projects/akitaonrails-hugo/content/_index.en.md | head -20   # blog highlights, newest first
```

Stars and release tags on the pages are read from GitHub at build time, with `src/data/github-snapshot.json` as the fallback, so those never need a text edit. Everything else below does.

## 2. GitHub repositories

| Source | Local path | Facts taken | Lands in | Gap signal |
|---|---|---|---|---|
| [akitaonrails/ai-usagebar](https://github.com/akitaonrails/ai-usagebar) | `~/Projects/ai-usagebar` | Provider list (`VendorId::display_name` in `src/vendor.rs`, 24 at v1.22.0); front ends (Omarchy Quattro, Waybar, TUI, GNOME, KDE Plasma 6, macOS tray, Windows tray); alert at 97%, 100% critical, credits warning 48h; HTTP 429 backoff of 5 minutes; `detect`, `usage --json`; multiple accounts; claudebar compatibility; install commands (README "Install"); MIT license | `src/data/usagebar.ts` (providers, install, quickstart), `src/i18n/locales/en/usagebar.json`, home tool block (`home.json` `tools.items[0]`), `common.json` `nav.usagebar.note` ("24 AI providers") | A new or removed `VendorId`; a changed default threshold in `[notifications]`; a new platform or install channel in the README |
| [akitaonrails/ghpending](https://github.com/akitaonrails/ghpending) | `~/Projects/github-pending` (note the folder name) | Fork to upstream behavior; SEC/QUA alerts for owned repos; own items de-emphasized; sort modes `activity`, `name`, `count`, `stale`; `--limit`, `--subscribed`; batched GraphQL with a token; themes and `TCLOCK_WIDGET_THEME`; install via Homebrew, AUR, Cargo, mise; MIT | `src/pages/[...locale]/ghpending.astro` (usage and install commands), `ghpending.json`, home tool block (`tools.items[1]`) | A new flag or sort mode in the README "Usage"; a new install channel |
| [akitaonrails/clock-tui](https://github.com/akitaonrails/clock-tui) | `~/Projects/clock-tui` | Modes (clock, timer, stopwatch, countdown); widgets (up to 2, 4 or 6 per row, `position = "bottom"`, groups with `g`, `z` clock-only, popup actions); themes `default`, `evangelion`, `nerv` and `Shift+T`; release targets x86_64 and aarch64; AUR `clock-tui-bin`; fork of race604/clock-tui; screenshots and demo GIFs in `assets/` | `clock-tui.astro` (config example, commands), `tclock.json`, home tool block (`tools.items[2]`), `public/media/tclock-*.mp4` | New widget options in README "Clock widgets"; new themes; new screenshots in `assets/` |
| Owner's tclock config | `~/.config/tclock/config.toml` | The real widget setup shown on the tclock page, trimmed (mount exclusions removed) | `clock-tui.astro` `config` | The file changed |
| [akitaonrails/my-skills](https://github.com/akitaonrails/my-skills) | `~/Projects/my-skills` | Skill names and what each does (each `SKILL.md` description); the symlink layout and harness table (README "Consumers"); "about two dozen" skills (23 directories on 2026-09-23); the "do not copy" warning | `workflow.json` (`skills.items`, `links`, `copy`), `src/data/workflow.ts` (`skillIds`), home `sisters.items[2]` | A skill added, renamed or removed; a new harness in the Consumers table |
| [akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory) | `~/Projects/ai-memory` | `ai-memory run claude` and `ai-memory run codex --yolo` continuing the same workstream (README, "If in doubt, start your harness with ai-memory run"); the one-line product description | home `switch` section, `workflow.astro` start block, home `sisters.items[0]` | The `run` syntax changes. The full story belongs to the ai-memory site; link, do not repeat |
| [akitaonrails/ai-jail](https://github.com/akitaonrails/ai-jail) | `~/Projects/ai-jail` | One-line description only | home `sisters.items[1]` | The sister site's tagline changes (`~/Projects/ai-jail-web/src/i18n/locales/en/common.json` `site.tagline`) |
| [akitaonrails/llm-coding-benchmark](https://github.com/akitaonrails/llm-coding-benchmark) | not cloned | Repository link | `src/data/articles.ts` `benchmark.repo` | None; numbers come from the blog posts (section 3) |
| [akitaonrails/distrobox-gaming](https://github.com/akitaonrails/distrobox-gaming) | `~/Projects/distrobox-gaming` | Emulator list, recomp and port examples, Wine and NexusMods roles, playbook commands (README intro, "Quick Start", "Commands") | `games.json` `distrobox`, `games.astro` `playbooks` | New emulators or roles in the README intro |
| [akitaonrails/omarchy-games-menu](https://github.com/akitaonrails/omarchy-games-menu) | `~/Projects/omarchy-games-menu` | `ogm` CLI plus QuickShell overlay; SteamGridDB covers; GitHub release checks; sort options; Super+G suggestion; AUR install; `screenshot.jpg` | `games.json` `menu`, `games.astro` `ogm`, `src/assets/img/shots/games-menu.jpg` | README "Using the overlay" changes; a new screenshot |

All repositories whose stars and releases the build reads are listed in `src/data/repos.json`. Add a repo there and `src/data/site.ts` `repoUrl()` and `RepoMeta` work for it.

## 3. The blog (akitaonrails.com)

Local checkout: `~/Projects/akitaonrails-hugo`. English posts are `index.en.md` next to the Portuguese `index.md`, published under `/en/`.

| Source | Facts taken | Lands in |
|---|---|---|
| Homepage highlights ("Destaques"), `content/_index.en.md`, block `aor-featured__list` | Which posts to feature, their English titles and descriptions | `src/data/articles.ts` (address, date, hue) and `articles.json` (title, summary, rewritten short) |
| [LLM Benchmark v4 Part 1](https://akitaonrails.com/en/2026/09/15/new-llm-benchmark-v4-retesting-all-top-llms-part-1/) | Rebuilt from scratch the third time; Rails app; over $4,000 in 9 days | `articles.ts` `benchmark`, `writing.json` `benchmark` |
| [LLM Benchmark v4 Part 2](https://akitaonrails.com/en/2026/09/15/new-llm-benchmark-v4-retesting-39-llms-part-2/) | 39 models; 7 sprints; 14 sabotages based on real CVEs; ranked by vigilance; the cost-score chart (`v4-cost-score-en.png`, S3) | same, plus `src/assets/img/shots/benchmark-v4-cost-en.png` |
| [LLM Benchmark v4: Opus 5.5, GPT 6...](https://akitaonrails.com/en/2026/09/23/llm-benchmark-v4-opus-5-5-gpt-6-sol-luna-mimo-2-6-grok-4-7/) | Latest round: 5 models on 2026-09-23 | `articles.ts` `benchmark.latestRound` |
| [Talking a Bit About My AI Skills](https://akitaonrails.com/en/2026/09/17/talking-about-my-ai-skills/) | The daily ritual and its one-line prompts; skill rules; merged PRs and closed issues per repo (ai-memory 430/260, ai-usagebar 137/34, ai-jail 42/81, counted 2026-09-17); "more than 40 repositories"; the second-monitor screenshot; knowledge over skills | `src/data/workflow.ts` `throughput`, `workflow.json`, home `desk`, `src/assets/img/shots/desk-second-monitor.png` |
| Second-monitor screenshot in that post | 43 projects checked, 6 with pending work | `workflow.ts` `trackedRepos`, home `hero.shotCaption` |
| [Vibe Code: From Zero to Production in 6 Days](https://akitaonrails.com/en/2026/02/16/vibe-code-zero-to-production-in-6-days-the-m-akita-chronicles/) | Newsletter stack built in six days, 201 commits | `newsletter.json` `story` |
| `content/about.en.md` | Blogging since 2006; X account is protected; YouTube channel finished, still valuable; no sponsorships | `common.json` `social`, `writing.json` `hero` |

Gap signal: a new post in the highlights block that is about AI. Add it to `articles.ts` and `articles.json`, and to a group in `writing.astro`. When a new benchmark round is published, update `benchmark.latestRound` and add the post as `benchmarkLatest` (move the old one to its own id if it should stay listed).

## 4. The newsletter (The M.Akita Chronicles)

| Source | Facts taken | Lands in |
|---|---|---|
| `~/Projects/akitando-news` (private repo): `README.md`, `AGENTS.md`, `CLAUDE.md` | Weekly, in Portuguese, M.Arvin persona; Discord and X (every 30 min) intake; summaries and illustrations; credibility check for `#suspect` stories; Sunday sections list; Sunday night assembly and approval gate; podcast with a cloned voice and M.Arvin's; Monday 7 a.m. BRT email and blog; two Rails apps sharing a `content/` folder plus a Hugo blog | `newsletter.json` `pipeline`, `stack` |
| https://themakitachronicles.com (live) | Subscriber counter (16,054 on 2026-09-23); the screenshot | `src/data/newsletter.ts`, `src/assets/img/shots/newsletter-home.png` |
| https://blog.themakitachronicles.com (live) | Latest issue number (#33 on 2026-09-23); the screenshot | same, `newsletter-blog.png` |

The repository is private. Never quote code, prompts, credentials, environment variable values or infrastructure details from it. Model names change often there; the site does not name them on purpose.

## 5. Videos (podcasts page)

| Source | Facts taken | Lands in |
|---|---|---|
| The five appearances the owner listed (YouTube IDs in `src/data/videos.config.json` `appearances`) | Title, channel, date, duration, views; summary from each video's description and chapters | `src/data/videos.json` (generated), `podcasts.json` `items` (summaries, written by hand) |
| [Cortes do Flow](https://www.youtube.com/@cortesdoflow) | Clips cut from the two Flow episodes | `videos.config.json` `cuts`, generated into `videos.json` |

How the cuts were found: list the channel's uploads with `yt-dlp --flat-playlist`, find the positions of a few known clips, fetch the neighbors, and keep only videos whose description says `ASSISTA COMPLETO: https://youtube.com/live/<episode id>`. Titles alone are not enough: several clips do not name the guest, and one clip about the owner ("Convidado é 100% SINCERO sobre FABIO AKITA") comes from another guest's episode and is left out. There are also clips from an August 2024 Flow appearance that is not on the owner's list.

YouTube answers bursts of requests with a bot check. `refresh-videos.mjs` caches every fetch in `.cache/videos/` and falls back to it; `--cached` skips YouTube entirely.

## 6. The owner's own words

| Source | Lands in |
|---|---|
| Owner's instructions (2026-09-23): social networks and what each is for; the phrases he is known for; "not a paid content creator, no sponsorship, no Patreon, no subscriptions, no monetized views, self-sustained, does it for leisure" | `common.json` `social` and `footer.about`; `home.json` `independence`. The phrases are spread, one per place: "excitement is inversely proportional" in `home.json` `writing.quote`, "ship first, fix later" in `home.json` `loop.quote`, "voluntary trade" in `home.json` `independence.quote`, "AI is a mirror" in `workflow.json` `numbers.quote`, "apologize rather than ask permission" in `writing.json` `sections.opinions.quote` |
| Sister sites' designs: `~/Projects/ai-jail-web`, `~/Projects/ai-memory-web` | The component set, the scripts and the rules in `docs/design-system.md` |

## 7. Images

| Image | Source |
|---|---|
| `src/assets/img/gen/*.webp` | Generated with Gemini from `scripts/prompts/`. See `docs/images.md` |
| `src/assets/img/og.png` | Generated from `scripts/prompts/og.txt`, cropped to 1200x630 |
| `src/assets/img/shots/omarchy-quattro-panel*.png`, `tui-openai.png`, `macos-tray-dashboard.png`, `windows-tray-dashboard.png`, `kde-plasmoid.png` | `~/Projects/ai-usagebar/screenshots/`, cropped: the Quattro panel to the open panel (`-crop`), the TUI to its top 1250 px, and the trays at card boundaries (macOS 640x550, Windows 488x556 from x=13, KDE 515x408) so they line up in one row |
| `ghpending-digest.png` | `~/Projects/github-pending/docs/screenshot.png` |
| `tclock-nerv.png`, `tclock-evangelion.png`, `public/media/tclock-*.mp4` | `~/Projects/clock-tui/assets/` (GIFs converted with ffmpeg, see `docs/images.md`) |
| `games-menu.jpg` | `~/Projects/omarchy-games-menu/screenshot.jpg` |
| `desk-second-monitor.png`, `benchmark-v4-cost-*.png` | The blog's S3 bucket, from the posts in section 3 |
| `newsletter-home.png`, `newsletter-blog.png` | Screenshots of the live sites, 1440 px wide, cropped |
| `src/assets/img/video/*.jpg` | YouTube thumbnails, downloaded by `scripts/refresh-videos.mjs` |

## 8. Page by page

| Page | Built from |
|---|---|
| `/` | Blog post on skills (desk, loop), ai-memory README (switch), the three tool repos (tool blocks), sister sites, benchmark posts, blog highlights, owner's words (phrases next to the loop, the writing and the independence note; social) |
| `/workflow/` | my-skills repo, skills blog post, ai-memory README |
| `/ai-usagebar/` | ai-usagebar repo |
| `/ghpending/` | ghpending repo |
| `/clock-tui/` | clock-tui repo, owner's tclock config |
| `/writing/` | Blog highlights and the benchmark posts |
| `/newsletter/` | akitando-news repo, the two live newsletter sites, the six-days post |
| `/podcasts/` | The five videos, Cortes do Flow |
| `/games/` | distrobox-gaming and omarchy-games-menu repos |
