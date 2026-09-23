// Numbers on the workflow page, from the "Talking a Bit About My AI Skills" post (counted 2026-09-17)
// and the second-monitor screenshot of the same day. Update both together.
export const throughput = {
  countedOn: '2026-09-17',
  byRepo: { memory: { prs: 430, issues: 260 }, usagebar: { prs: 137, issues: 34 }, jail: { prs: 42, issues: 81 } },
  trackedRepos: 43,
};
export const totals = Object.values(throughput.byRepo).reduce((a, r) => ({ prs: a.prs + r.prs, issues: a.issues + r.issues }), { prs: 0, issues: 0 });

/** The skills shown on the workflow page, in the order of the pipeline. Descriptions live in workflow.json. */
export const skillIds = ['pr-audit', 'iss-audit', 'github-resolution', 'security-audit', 'pr-bump', 'release'] as const;
