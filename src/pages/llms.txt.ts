// A plain-text map of the site for AI assistants (https://llmstxt.org).
import type { APIRoute } from 'astro';
import { nav, extras, site, social, sisters, repoUrl } from '@/data/site';
import common from '@/i18n/locales/en/common.json';

export const GET: APIRoute = () => {
  const page = (id: string, href: string) => {
    const n = (common.nav as Record<string, { label: string; note?: string }>)[id];
    return `- [${n.label}](${new URL(href, site.url).href}): ${n.note ?? ''}`;
  };
  const body = `# ${site.name}

> ${common.site.description}

${common.footer.about}

## Pages

${[...nav, ...extras].map((l) => page(l.id, l.href)).join('\n')}

## Related sites

- [ai-memory](${sisters.memory.url}): long-term memory for coding agents
- [ai-jail](${sisters.jail.url}): an OS sandbox for AI coding agents
- [my-skills](${repoUrl('skills')}): the agent skills behind the workflow
- [Blog](${site.blogEn}/): ${site.author}'s blog, in English and Portuguese

## Follow

${social.map((s) => `- [${(common.social as Record<string, { name: string }>)[s.id].name}](${s.url})`).join('\n')}
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
