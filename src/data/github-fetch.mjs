// Fetches stars and the latest release for every repository the site shows. Used at build time
// (src/data/github.ts) and by `npm run snapshot:github`. Set GITHUB_TOKEN to lift the 60 req/h anonymous limit.
import REPOS from './repos.json' with { type: 'json' };

async function gh(path) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'ailair-build' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com${path}`, { headers, signal: AbortSignal.timeout(15000) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return res.json();
}

export async function fetchGithub() {
  const entries = await Promise.all(Object.entries(REPOS).map(async ([id, full]) => {
    const [repo, release] = await Promise.all([gh(`/repos/${full}`), gh(`/repos/${full}/releases/latest`)]);
    if (!repo) throw new Error(`repository not found: ${full}`);
    return [id, {
      stars: repo.stargazers_count,
      language: repo.language,
      license: repo.license?.spdx_id ?? null,
      release: release ? { tag: release.tag_name, date: release.published_at } : null,
    }];
  }));
  return { fetchedAt: new Date().toISOString(), repos: Object.fromEntries(entries) };
}
