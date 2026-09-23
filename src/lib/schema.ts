// schema.org structured data. Base.astro builds the site-wide graph; pages add their own objects.
import { site, social } from '@/data/site';

export interface Faq { q: string; a: string }

/** FAQPage from the same list the page renders. Answers may hold inline HTML; search engines want text. */
export const faqPage = (items: readonly Faq[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') } })),
});

/** A tool page describes one open source program. */
export const softwareApp = (o: { name: string; description: string; repo: string; os: string; version?: string | null; home: string }) => ({
  '@type': 'SoftwareApplication', name: o.name, description: o.description, codeRepository: o.repo, url: o.repo,
  applicationCategory: 'DeveloperApplication', operatingSystem: o.os, ...(o.version ? { softwareVersion: o.version } : {}),
  license: 'https://opensource.org/license/mit', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@id': `${o.home}#author` },
});

interface GraphInput { home: string; canonical: string; htmlLang: string; tagline: string; description: string; fullTitle: string; extra: Record<string, unknown>[] }

export function siteGraph({ home, canonical, htmlLang, tagline, description, fullTitle, extra }: GraphInput) {
  const author = { '@id': `${home}#author` };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${home}#site`, url: home, name: site.name, description: tagline, inLanguage: htmlLang, publisher: author },
      { '@type': 'Person', ...author, name: site.author, url: site.authorUrl, sameAs: social.map((s) => s.url) },
      { '@type': 'WebPage', '@id': `${canonical}#page`, url: canonical, name: fullTitle, description, inLanguage: htmlLang, isPartOf: { '@id': `${home}#site` } },
      ...extra,
    ],
  };
}
