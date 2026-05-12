import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, parse } from 'path';

const PUBLIC = './public';
const QUALITY = 78;
const MAX_WIDTH = 1920;

const files = await readdir(PUBLIC);
const imgs = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));

let totalBefore = 0, totalAfter = 0;
for (const file of imgs) {
  const input = join(PUBLIC, file);
  const out = join(PUBLIC, parse(file).name + '.webp');
  const before = (await stat(input)).size;
  await sharp(input).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(out);
  const after = (await stat(out)).size;
  totalBefore += before;
  totalAfter += after;
  console.log(`${file.padEnd(45)} ${(before/1024).toFixed(0).padStart(6)}K -> ${(after/1024).toFixed(0).padStart(6)}K  (-${((1 - after/before) * 100).toFixed(0)}%)`);
}
console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(2)} MB -> ${(totalAfter/1024/1024).toFixed(2)} MB  (-${((1 - totalAfter/totalBefore) * 100).toFixed(0)}%)`);
