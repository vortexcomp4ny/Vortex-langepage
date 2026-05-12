import sharp from 'sharp';
import { stat } from 'fs/promises';

const input = './public/augustus-portrait.png';
const out = './public/augustus-portrait.webp';

await sharp(input)
  .resize({ width: 800, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(out);

const before = (await stat(input)).size;
const after = (await stat(out)).size;
console.log(`augustus-portrait.png  ${(before/1024).toFixed(0)}K -> webp ${(after/1024).toFixed(0)}K  (-${((1 - after/before) * 100).toFixed(0)}%)`);
