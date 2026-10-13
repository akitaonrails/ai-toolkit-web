# The essay pages: who they are for and how they sound

`/agi/`, `/students/` and `/limits/` are the owner's opinion pages. Read this before writing or editing a word on them, and hand it to anyone (person or agent) who translates or reviews them. The general writing rules are in [design-system.md](design-system.md), "Writing"; this file adds what is specific to the essays.

## Who reads them

Someone who arrived from a headline or a viral post and believes one of these:

- AGI is close, AI is improving itself, and Skynet is a matter of time (`/agi/`).
- Any program can now be cloned or reverse engineered by pointing an agent at it: "Adobe is dead", "no binary is sacred" (`/limits/`).
- Software engineers are no longer needed, so there's no point in learning to program (`/students/`, `/limits/`).

They are not stupid and not technical. They may be a manager, a student, a journalist, an investor or a developer outside AI. They will read a heading, a lede and a picture, and maybe two points. Assume they skim.

The goal is to inform people, not to win a fight. Each page replaces a belief with facts they can check: what the thing actually does, what it cost, where the numbers come from. The tools are excellent, and the pages say so. What they take apart is the magic.

## Who is talking

Fabio Akita, in the first person. A programmer since the 90s who uses coding agents all day, measures them in his own benchmarks and writes about it at akitaonrails.com. He speaks from experience and data, never from authority. The voice rules come from his blog (`~/Projects/akitaonrails-hugo/WRITER.md`):

- **Straightforward by default.** State the point. Never announce it ("to be honest", "let me be direct", "the truth is").
- **No negative parallelism.** "It's not X, it's Y", "X, not Y", "That isn't the goal. The goal is..." read as AI. Say the positive thing. A plain negative can stand alone ("Nobody was fined."). At most one per page, and only if nothing else is clearer.
- **No flourishes.** No "the juiciest part", "beautiful to see", "game changer", "let that sink in". Dry and plain. When tempted to add color, put a concrete fact there instead.
- **Opinions are marked as his.** "In my view", "my reading". Facts carry their source and date. Forecasts are labeled as forecasts.
- **The edge lives in quotes.** His X posts are unfiltered; the copy around them is calm.

## Density

- A section is a kicker, a title, a one-sentence lede, a picture, and three to five points.
- A point is one idea, at most about 45 words, with one number at most when it can carry it. If a point needs "and" twice, it's two points or one too many.
- If a diagram can say it, the diagram says it and the text doesn't repeat it.
- The full argument lives in his blog post. The page summarizes and links.
- A fact appears once across the three pages. The others link to it.

## AI-isms to remove before anything ships

Grep every new string for these and rewrite each hit:

- not / but, isn't / it's, "rather than" used as a contrast device
- em dashes and en dashes
- groups of three built for rhythm ("faster, cheaper, better")
- closing one-liners and morals at the end of a point ("And that changes everything.")
- "seamless", "robust", "powerful", "unlock", "effortless", "key", "crucial", "landscape", "delve", "leverage", "navigate", "testament", "game changer", "in today's world"
- rhetorical questions as openers, "Here's the thing", "The bottom line"
- hedges stacked on hedges ("could potentially perhaps")
- bold sentences, emoji

## Translations

The other five languages follow [research/I18N-TRANSLATE-BRIEF.md](research/I18N-TRANSLATE-BRIEF.md) and carry the same voice: short, plain, first person, no flourishes added in translation. The rules above apply in every language; a translation that adds a contrast or a flourish the English doesn't have is wrong.
