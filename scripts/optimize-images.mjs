// Converts every JPG/PNG under public/bybakari to WebP (max 1920px wide, q78).
// Originals are kept on disk for og:image and as fallbacks.
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = new URL("../public/bybakari", import.meta.url).pathname;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield p;
  }
}

let before = 0;
let after = 0;
for await (const file of walk(ROOT)) {
  const out = file.replace(/\.(jpe?g|png)$/i, ".webp");
  const img = sharp(file);
  const meta = await img.metadata();
  await img
    .resize({ width: Math.min(meta.width ?? 1920, 1920), withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(out);
  const a = (await stat(file)).size;
  const b = (await stat(out)).size;
  before += a;
  after += b;
  console.log(`${path.relative(ROOT, file)}: ${(a / 1024).toFixed(0)}K -> ${(b / 1024).toFixed(0)}K`);
}
console.log(`\nTotal: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`);
