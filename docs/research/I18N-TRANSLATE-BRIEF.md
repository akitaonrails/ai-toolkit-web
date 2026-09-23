# Brief: translate the catalogs of Akita's AI Lair

You translate the English message catalogs in `src/i18n/locales/en/` (every `.json` file there) into ONE target language, writing files with the same names and the same JSON structure under `src/i18n/locales/<locale>/`. Work from the repository root `/mnt/data/Projects/ai-toolkit-web`.

The site is Fabio Akita's personal hub for his AI work: small open source tools (ai-usagebar, ghpending, tclock), the workflow that ties them to his agent skills and ai-memory, his LLM benchmark and blog, his newsletter, podcast appearances, his game collection as code and his desktop setup. It speaks in the FIRST PERSON: Fabio talking about his own tools and habits. He is a Brazilian programmer with 30+ years of experience, direct, opinionated and a bit playful. Read `docs/design-system.md` (section "Writing") before you start.

## Non-negotiable mechanics

- Same keys, same nesting, same array lengths as English. Never add, remove, rename or reorder keys. Translate values only.
- `{placeholders}` stay exactly as written (`{year}`, `{date}`, `{n}`, `{name}`, `{email}`, `{linkedin}`), placed where the target grammar wants them.
- HTML tags and attributes stay exactly as written (`<code>`, `<a class="link" href="...">`, `<a href="/workflow/">`); never change an href. Translate the text between tags. Everything inside `<code>...</code>` stays byte-for-byte identical.
- Do NOT translate: product and project names (Akita's AI Lair, ai-usagebar, ghpending, tclock, clock-tui, ai-memory, ai-jail, my-skills, omarchy-games-menu, distrobox-gaming, Omarchy, Hyprland, Waybar, tmux, Herdr, Conductor, Claude Squad, Claude Code, Codex, OpenCode, Kimi, GitHub, Dependabot, Steam, Proton, Ansible, distrobox, NERV, Evangelion, M.Arvin, The M.Akita Chronicles, Flow Podcast, Cortes do Flow, Spotify, LinkedIn, X, Instagram, YouTube, Akitando), skill names (pr-audit, iss-audit, github-resolution, security-audit, pr-bump, pr-post-audit, release when it names the skill), commands, flags, file names, env vars, URLs, version numbers, people's names. The brand name "Akita's AI Lair" stays in English everywhere, including the page titles.
- Valid UTF-8 JSON. Escape double quotes inside values. Use the language's real typography (accents, punctuation, full-width punctuation in Japanese), never ASCII approximations.
- `quote.original` values are already in Portuguese: copy them unchanged in every language.
- After each file, run `node scripts/check-i18n.mjs <locale>` and fix every ERROR. "Identical to English" warnings are fine for names and commands. Do NOT run `--stamp`.

## Quality bar: it must read as if Fabio wrote it in that language

- Translate meaning, not words. Restructure freely. If a literal rendering sounds stiff, write it the way a local senior developer would say it to a friend.
- Keep it as short as the English. Headlines stay headlines, no more than about 30% longer. Button labels stay two to five words.
- Keep the personality: the jokes ("Not everything is work. Even I need to play.", "A lair with the doors open", M.Arvin "a very depressed robot"), the blunt opinions, the warnings in the contact block. Keep the famous phrases short and quotable.
- The English avoids AI-writing tells, and so must you, in the target language's own equivalents: no dashes used as connectors (em dash, en dash, the Japanese ―), no "not X but Y" constructions for emphasis, no closing one-liners that restate the point, no rows of dramatic fragments, no forced groups of three, no hype adjectives (the local equivalents of seamless, robust, powerful, unlock, effortless, revolutionary). Go straight to the point.
- Developer vocabulary: use the term local developers actually use. When the community uses the English word, keep it. Never invent a purist translation.
- One English term maps to one target term across every file. Follow the glossary. Record any new decision in `docs/i18n/glossary-<locale>.md` (a two-column table; create it).
- SEO strings (`meta.title`, `meta.description`, `site.homeTitle`, `site.description`): use the words people type into a search engine in that language. `meta.title` values get " | Akita's AI Lair" appended, so keep them under about 42 characters (Japanese: 22 full-width). Descriptions 140 to 160 characters (Japanese: 80 to 110).
- `images.json` holds the labels drawn inside the diagrams. Keep them very short (they must fit the same space as the English), and keep a label in English when it is a name. "Kaizen" stays "Kaizen" except in Japanese (改善).

## Language notes

- **pt-br**: "você", informal and direct, Brazilian developer vocabulary (the way Fabio writes on his blog). In `articles.json`, the `items.<id>.title` values must be the real Portuguese titles of his posts, copied from `docs/i18n/pt-br-post-titles.json`; translate the `summary` values. "Lair" in running text: covil.
- **es**: neutral Spanish, "tú".
- **he**: address the reader in the plural (אתם) to stay gender neutral. Right-to-left text; leave Latin names and code as they are.
- **ja**: です/ます form, no excess honorifics. Kaizen is 改善 (カイゼン).
- **ko**: 합니다체 for body text, short noun-ending headlines.

## Glossary

| English | pt-br | es | he | ja | ko |
|---|---|---|---|---|---|
| AI coding agent / agent | agente de código com IA / agente | agente de programación con IA / agente | סוכן קוד מבוסס AI / סוכן | AIコーディングエージェント / エージェント | AI 코딩 에이전트 / 에이전트 |
| harness (Claude Code, Codex...) | harness | harness | harness | ハーネス | 하네스 |
| skill (agent skill) | skill | skill | skill | スキル | 스킬 |
| workflow | workflow (fluxo de trabalho) | flujo de trabajo | תהליך עבודה | ワークフロー | 워크플로 |
| quota / usage window | cota / janela de uso | cuota / ventana de uso | מכסה / חלון שימוש | クォータ / 利用枠 | 할당량 / 사용 한도 |
| plan (paid subscription) | plano | plan | מנוי | プラン | 요금제 |
| provider | provedor | proveedor | ספק | プロバイダー | 제공업체 |
| top bar | barra superior | barra superior | הסרגל העליון | トップバー | 상단 바 |
| pull request / issue | pull request / issue | pull request / issue | pull request / issue | プルリクエスト / Issue | 풀 리퀘스트 / 이슈 |
| repository | repositório | repositorio | מאגר (repository) | リポジトリ | 저장소 |
| fork | fork | fork | fork | フォーク | 포크 |
| widget | widget | widget | ווידג'ט | ウィジェット | 위젯 |
| release (noun) | release | versión | גרסה | リリース | 릴리스 |
| kaizen | kaizen | kaizen | קאיזן (kaizen) | 改善（カイゼン） | 카이젠 |
| memory (ai-memory) | memória | memoria | זיכרון | メモリ | 메모리 |
| benchmark | benchmark | benchmark | בנצ'מרק | ベンチマーク | 벤치마크 |
| sabotage (benchmark) | sabotagem | sabotaje | חבלה | 妨害工作 | 사보타주 |
| newsletter | newsletter | newsletter | ניוזלטר | ニュースレター | 뉴스레터 |
| podcast / clip (cortes) | podcast / corte | podcast / clip | פודקאסט / קטע | ポッドキャスト / 切り抜き | 팟캐스트 / 클립 |
| container (distrobox) | container | contenedor | קונטיינר | コンテナ | 컨테이너 |
| host (the desktop machine) | host | host | מחשב המארח (host) | ホスト | 호스트 |
| idempotent | idempotente | idempotente | אידמפוטנטי | 冪等 | 멱등 |
| emulator / PC port / decomp / recomp | emulador / port para PC / decomp / recomp | emulador / port para PC / decomp / recomp | אמולטור / פורט ל-PC / decomp / recomp | エミュレーター / PC移植 / デコンプ / リコンプ | 에뮬레이터 / PC 이식 / 디컴프 / 리컴프 |
| launcher | launcher | lanzador | משגר (launcher) | ランチャー | 런처 |
| lair | covil | guarida | מאורה | 隠れ家 | 아지트 |
| tap / sponsor / sponsorship | patrocinar / patrocínio | patrocinar / patrocinio | חסות | スポンサー | 후원 |
| open source | open source | código abierto | קוד פתוח | オープンソース | 오픈 소스 |
