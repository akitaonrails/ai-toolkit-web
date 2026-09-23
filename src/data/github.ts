import snapshot from './github-snapshot.json';
// @ts-ignore plain JS module shared with scripts/
import { fetchGithub } from './github-fetch.mjs';
import type { RepoId } from './site';

export type Github = typeof snapshot;
export type RepoInfo = Github['repos'][RepoId];
let cached: Promise<Github> | undefined;

/** Live numbers at build time; the committed snapshot if GitHub cannot be reached. */
export function getGithub(): Promise<Github> {
  cached ??= fetchGithub().catch((err: Error) => {
    console.warn(`[github] using snapshot from ${snapshot.fetchedAt}: ${err.message}`);
    return snapshot as Github;
  });
  return cached;
}

export async function repo(id: RepoId): Promise<RepoInfo> {
  return (await getGithub()).repos[id];
}
