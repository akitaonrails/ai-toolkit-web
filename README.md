# Akita's AI Lair

Source of https://ailair.akitaonrails.com: Fabio Akita's open source AI tools (ai-usagebar, ghpending, tclock, my-skills), the workflow that ties them to ai-memory, the LLM benchmark and writing, the newsletter and podcast appearances.

```bash
npm install
npm run dev            # http://localhost:4321
npm run build          # static site in dist/
npm run check:colors   # WCAG contrast, color-vision separation, no stray colors
npm run check:i18n
```

| Doc | What it covers |
|---|---|
| [docs/sources.md](docs/sources.md) | Every source of every fact, and how to find what is out of date |
| [docs/design-system.md](docs/design-system.md) | Components, hues, layout, motion, writing rules |
| [docs/color-study.md](docs/color-study.md) | How the palette and type were chosen, with measured contrast |
| [docs/images.md](docs/images.md) | Generating diagrams, screenshots, recordings, video thumbnails |
| [docs/deploy.md](docs/deploy.md) | Netlify and the subdomain |
| [docs/i18n.md](docs/i18n.md) | Languages (English only for now) |
