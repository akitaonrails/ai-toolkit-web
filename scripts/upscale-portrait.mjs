// Redraws a small illustration at 2048x2048 with Gemini, keeping it faithful to the original, as a clean source for
// background removal. Usage: GEMINI_API_KEY=... node scripts/upscale-portrait.mjs <input> <output.png>
// Used once for the home page portrait (docs/images.md, "Portrait"); the source is akitando-news/docs/images/akita.jpg.
import { readFileSync, writeFileSync } from 'node:fs';

const [input, output] = process.argv.slice(2);
const prompt = `Redraw this exact illustration at high resolution. It must be the same drawing: same person, same face, same glasses, same hair, same expression, same head angle, same shirt and tie, same crop, same colors and the same comic-book line art style with bold clean black outlines and flat cel shading.
Only improve sharpness: crisp smooth outlines, clean flat color fills, no blur, no JPEG artifacts, no noise.
Background: one solid flat pure white, edge to edge, with nothing else in it.
Do not add or remove anything, do not change the proportions, do not make it more realistic, no text, no border, no watermark.`;
const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image:generateContent', {
  method: 'POST',
  headers: { 'content-type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
  body: JSON.stringify({
    contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: 'image/jpeg', data: readFileSync(input).toString('base64') } }] }],
    generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '1:1', imageSize: '2K' } },
  }),
});
const json = await res.json();
const img = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)?.inlineData;
if (!img) { console.error(JSON.stringify(json).slice(0, 600)); process.exit(1); }
writeFileSync(output, Buffer.from(img.data, 'base64'));
console.log(output);
