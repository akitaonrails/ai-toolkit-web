# Deploying

The site is static Astro output, deployed by Netlify on every push to `main`. `netlify.toml` holds everything Netlify needs: build command (`npm run build`), publish folder (`dist`), Node 22, cache headers, security headers and a Content Security Policy.

## First deploy

1. Push the repository to GitHub.
2. Netlify: Add new project, Import an existing project, GitHub, pick the repo. Netlify reads `netlify.toml`; leave the fields as they are and deploy.
3. Optional: name the project `ailair` for `ailair.netlify.app` while DNS propagates.

Recommended: add a `GITHUB_TOKEN` environment variable (a fine-grained token with read-only access to public repositories, scope "Builds", marked secret). The build reads stars and releases from the GitHub API; without a token, Netlify's shared IPs often hit the anonymous limit and the build falls back to `src/data/github-snapshot.json`. It never fails because of it.

## The subdomain

`akitaonrails.com` uses AWS Route 53 for DNS (checked 2026-09-23), and the blog itself is on Netlify.

1. Netlify, the project, Domain management, Add a domain: `ailair.akitaonrails.com`. Netlify will say it is an external domain; accept.
2. Route 53, the `akitaonrails.com` hosted zone, Create record: name `ailair`, type `CNAME`, value `<project-name>.netlify.app`, TTL 300.
3. Back in Netlify, wait for the DNS check, then let it provision the Let's Encrypt certificate (HTTPS, Verify DNS configuration, Provision certificate).

## The old address

The site launched as Akita's AI Toolkit at `aitoolkit.akitaonrails.com`. `netlify.toml` redirects that host to `ailair.akitaonrails.com` with a 301, path included. For the redirect to fire, the old host must still reach Netlify: keep its Route 53 CNAME pointing at the Netlify project and add it in Netlify as a domain alias (Domain management, Add a domain alias).

## Analytics (optional)

Google Analytics 4 with Consent Mode v2 (`src/components/Analytics.astro`, the same component as the sister sites). Nothing loads unless the build sees `PUBLIC_GA_ID`:

1. In Google Analytics, create a Web data stream for `https://ailair.akitaonrails.com` and copy its Measurement ID (`G-...`).
2. Netlify, the project, Project configuration, Environment variables, Add a variable: key `PUBLIC_GA_ID`, value the Measurement ID, scope Builds. The ID is public (it ends up in the page), so it does not need to be secret.
3. Deploys, Trigger deploy.

Visitors see a consent notice in their language. Until they accept, GA gets cookieless pings only; Global Privacy Control and Do Not Track count as a refusal. Besides page views and GA's enhanced measurement (scrolls, outbound clicks), the site sends two events: `github_click` for links to the owner's GitHub and `copy_command` when someone copies a code block. The Content Security Policy in `netlify.toml` already allows Google's hosts.

## Before pushing

```bash
npm run check:colors && npm run check:i18n && npm run build
```

## After launch

- Add `https://ailair.akitaonrails.com/sitemap-index.xml` to Google Search Console (a URL-prefix property works for a subdomain).
- Link the site from the GitHub profile README, the blog's About page and the tools' READMEs.
- Check the share card at https://www.opengraph.xyz.

## When something fails

| Symptom | Cause |
|---|---|
| Build log says "using snapshot" | The GitHub API refused. The site still deploys with saved numbers. Add `GITHUB_TOKEN`, and run `npm run snapshot:github` locally now and then. |
| A video does not play | Something added a host the CSP does not allow. Only `https://www.youtube-nocookie.com` is allowed in `frame-src`. |
| `check:colors` fails | A token pairing dropped below target, or a raw color value appeared in a page or component. The output names it. |
