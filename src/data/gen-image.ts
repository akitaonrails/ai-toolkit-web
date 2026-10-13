// Generated diagrams (src/assets/img/gen/). A language's own copy wins when it exists (gen/<locale>/<name>.webp,
// made by scripts/localize-image.mjs); otherwise the English original. See docs/images.md.
const originals = import.meta.glob<{ default: ImageMetadata }>('/src/assets/img/gen/*.webp', { eager: true });
const localized = import.meta.glob<{ default: ImageMetadata }>('/src/assets/img/gen/*/*.webp', { eager: true });

export function genImage(name: string, locale: string): ImageMetadata {
  const image = localized[`/src/assets/img/gen/${locale}/${name}.webp`]?.default ?? originals[`/src/assets/img/gen/${name}.webp`]?.default;
  if (!image) throw new Error(`no generated image named "${name}"`);
  return image;
}
