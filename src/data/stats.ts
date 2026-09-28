// Numbers in the essays' Stats strips (/agi/, /students/ and their PDF decks). Structure only: labels and unit words
// live in the catalogs, and Intl formats every number in the reader's language (src/components/Stats.astro).

// `format` is Intl options (percent, units, compact notation). `suffix` is only for what Intl has no form for ("+");
// a unit word goes in the catalog under sections.<id>.units.<key>.
export interface SectionStat { key: string; n: number; format?: Intl.NumberFormatOptions; suffix?: string }

// "%" as each language writes it: 4.5% in English, 4,5 % in Spanish.
export const percent: Intl.NumberFormatOptions = { style: 'unit', unit: 'percent' };

type Lookup = { t: (key: string) => string; raw: <T>(key: string) => T };
/** One section's Stats items: labels from sections.<id>.stats.<key>, and the unit word from sections.<id>.units.<key>
 *  when there is one ("{n} pts", "{n}%p"), placed around the number the way that language writes it. */
export function statItems(id: string, stats: SectionStat[], { t, raw }: Lookup) {
  const units = raw<{ units?: Record<string, string> }>(`sections.${id}`).units ?? {};
  return stats.map((x) => {
    const [prefix = '', after = ''] = x.key in units ? t(`sections.${id}.units.${x.key}`).split('{n}') : [];
    return { n: x.n, format: x.format, prefix, suffix: after + (x.suffix ?? ''), label: t(`sections.${id}.stats.${x.key}`) };
  });
}
