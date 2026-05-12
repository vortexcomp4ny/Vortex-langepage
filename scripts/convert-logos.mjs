import sharp from 'sharp';
import { stat } from 'fs/promises';

const files = [
  { in: './public/logo-meta.png', out: './public/logo-meta.webp', trim: true },
  { in: './public/logo-vortex-3d.png', out: './public/logo-vortex-3d.webp', trim: true },
];

for (const { in: input, out, trim } of files) {
  let pipeline = sharp(input);
  if (trim) pipeline = pipeline.trim();
  await pipeline.resize({ width: 600, withoutEnlargement: true }).webp({ quality: 90 }).toFile(out);
  const before = (await stat(input)).size;
  const after = (await stat(out)).size;
  console.log(`${input.split('/').pop().padEnd(28)} ${(before/1024).toFixed(0)}K -> ${(after/1024).toFixed(0)}K  (-${((1 - after/before) * 100).toFixed(0)}%)`);
}
