#!/usr/bin/env python3
"""Tallies the owner's major projects for one year and writes src/data/tally.json for the workflow page.

    python3 scripts/tally-projects.py            # year 2026, the project list below
    python3 scripts/tally-projects.py --year 2027

Per project, all limited to the year:
  commits      non-merge commits on the checked-out branch (git log --since/--until)
  code_added   lines added to code files (git numstat), leaving out lockfiles, vendored and generated files,
               data (json, csv, svg, snapshots) and prose
  prose_added  lines added to Markdown and plain text (blog posts, docs)
  prs, issues  merged pull requests and closed issues on GitHub (search API), when the project has a GitHub remote
  posts        for the blog only: posts published that year (content/<year>/*/*/*/index.md)

There is deliberately no "size of the tree" figure: several projects are forks (FrankGeary is GNOME Geary, clock-tui is
race604's), so a tree count would credit upstream's code. Everything here happened in the year.

Pull the checkouts first (see docs/sources.md). Needs git and gh (logged in).
"""
import argparse, fnmatch, glob, json, os, re, subprocess, sys, time

ROOT = os.path.expanduser('~/Projects')
# The owner's list (2026-09-23): every ai* and frank*/Frank* folder plus these.
PATTERNS = ['ai*', 'frank*', 'Frank*']
EXTRA = ['github-pending', 'clock-tui', 'distrobox-gaming', 'akitaonrails-hugo', 'llm-coding-benchmark',
         'omarchy-games-menu', 'akitando-news', 'google-calendar-tui', 'tropicalruby2026']
# Packaging repos that would count a project twice.
SKIP = {'frank-sherlock-bin'}
# Folders whose lines were not written by the owner or his agents for the project itself: the benchmark's results are
# code written by the models under test, and the newsletter's content folders are the bot's weekly output.
EXCLUDE = {
    'llm-coding-benchmark': ['results*'],
    'akitando-news': ['content', 'blog/content', 'makita-blog/content'],
    'frank_go': ['data'],               # joseki and tsumego collections
    'frank_fbi': ['suspects'],          # sample emails under investigation
    'frank_yomik': ['fonts'],           # a vendored font repository
    'FrankGeary': ['help'],             # upstream Geary's translated help pages
}
# The blog counts posts instead of lines: in 2026 most of its added lines are edits and translations of old posts.
BLOG = 'akitaonrails-hugo'

NOISE = ['*package-lock.json', '*yarn.lock', '*pnpm-lock.yaml', '*Cargo.lock', '*Gemfile.lock', '*go.sum', '*uv.lock',
         '*poetry.lock', '*bun.lockb', '*.min.js', '*.min.css', '*.map', '*.svg', '*.csv', '*.tsv', '*.json', '*.jsonl',
         '*.snap', '*.ipynb', '*.lock', '*.po', '*.pot', '*.eml', '*.sgf', '*.ttf', '*.otf', '*.ufo/*', '*/fonts/*', 'fonts/*', '*.pdf', '*.png', '*.jpg', '*.webp', '*.gif', '*.mp3', '*.mp4',
         'node_modules/*', '*/node_modules/*', 'vendor/*', '*/vendor/*', 'dist/*', '*/dist/*', 'target/*', '*/target/*',
         'public/*', '*/public/*', '*/assets/gen/*', 'resources/_gen/*', '*.sum']
PROSE = ['*.md', '*.markdown', '*.txt', '*.rst', '*.adoc']


def sh(*args, cwd=None):
    return subprocess.run(args, cwd=cwd, capture_output=True, text=True).stdout


def match(path, pats):
    return any(fnmatch.fnmatch(path, p) for p in pats)


def github_repo(path):
    url = sh('git', 'remote', 'get-url', 'origin', cwd=path).strip()
    m = re.search(r'github\.com[:/]([^/]+/[^/]+?)(?:\.git)?$', url)
    return m.group(1) if m else None


def search_count(q):
    out = None
    for attempt in range(5):
        out = subprocess.run(['gh', 'api', '-X', 'GET', 'search/issues', '-f', f'q={q}', '-f', 'per_page=1', '--jq', '.total_count'],
                             capture_output=True, text=True)
        if out.returncode == 0:
            time.sleep(2.2)  # the search API allows 30 requests a minute
            return int(out.stdout.strip())
        time.sleep(15 * (attempt + 1))
    raise RuntimeError(f'search failed: {q}: {out.stderr.strip() if out else ""}')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--year', type=int, default=2026)
    year = ap.parse_args().year
    since, until = f'{year}-01-01', f'{year + 1}-01-01'

    names = sorted({os.path.basename(p) for pat in PATTERNS for p in glob.glob(os.path.join(ROOT, pat)) if os.path.isdir(p)} | set(EXTRA))
    rows = []
    for name in names:
        if name in SKIP:
            continue
        path = os.path.join(ROOT, name)
        if not os.path.isdir(path):
            print(f'missing: {name}', file=sys.stderr)
            continue
        row = {'name': name, 'repo': None, 'commits': None, 'code_added': None, 'prose_added': None, 'prs': None, 'issues': None}
        skip = [p for e in EXCLUDE.get(name, []) for p in (e, f'{e}/*')]
        if os.path.isdir(os.path.join(path, '.git')):
            row['repo'] = github_repo(path)
            # Count what is on the remote, so a checkout with local changes that could not pull is still current.
            sh('git', 'fetch', '-q', cwd=path)
            ref = 'origin/HEAD' if sh('git', 'rev-parse', '--verify', '-q', 'origin/HEAD', cwd=path).strip() else 'HEAD'
            row['commits'] = int(sh('git', 'rev-list', '--count', '--no-merges', f'--since={since}', f'--until={until}', ref, cwd=path).strip() or 0)
            code = prose = 0
            log = sh('git', 'log', '--no-merges', f'--since={since}', f'--until={until}', '--numstat', '--format=', ref, cwd=path)
            for line in log.splitlines():
                parts = line.split('\t')
                if len(parts) != 3 or parts[0] == '-':
                    continue
                added, f = int(parts[0]), parts[2]
                if match(f, NOISE) or match(f, skip):
                    continue
                if match(f, PROSE):
                    prose += added
                else:
                    code += added
            row['code_added'], row['prose_added'] = code, prose
            if row['repo']:
                # Private repos are counted but never linked from the site.
                row['private'] = sh('gh', 'repo', 'view', row['repo'], '--json', 'isPrivate', '--jq', '.isPrivate').strip() == 'true'
                row['prs'] = search_count(f'repo:{row["repo"]} is:pr is:merged merged:{since}..{year}-12-31')
                row['issues'] = search_count(f'repo:{row["repo"]} is:issue is:closed closed:{since}..{year}-12-31')
        if name == BLOG:
            row['posts'] = len(glob.glob(os.path.join(path, 'content', str(year), '*', '*', '*', 'index.md')))
            row['code_added'] = row['prose_added'] = None
        rows.append(row)
        print(f"{name:26} {row['repo'] or '-':42} commits={row['commits']} code+={row['code_added']} prose+={row['prose_added']} prs={row['prs']} issues={row['issues']}", file=sys.stderr)

    active = [r for r in rows if (r['commits'] or 0) > 0 or (r['prs'] or 0) > 0]
    total = lambda k: sum(r[k] or 0 for r in active)
    out = {
        'year': year, 'countedOn': time.strftime('%Y-%m-%d'),
        'totals': {k: total(k) for k in ('commits', 'code_added', 'prose_added', 'prs', 'issues')}
                  | {'projects': len(active), 'posts': sum(r.get('posts') or 0 for r in active)},
        'projects': sorted(active, key=lambda r: -(r['commits'] or 0)),
    }
    dest = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'tally.json')
    with open(dest, 'w') as fh:
        json.dump(out, fh, indent=2)
        fh.write('\n')
    print(json.dumps(out['totals']), file=sys.stderr)


if __name__ == '__main__':
    main()
