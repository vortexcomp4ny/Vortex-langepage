import sharp from 'sharp';

// Topbar logo — trim auto-tira whitespace em volta + resize cap 480px
await sharp('./public/vortex-logo.png')
  .trim() // remove margens transparentes/uniformes automaticamente
  .resize({ width: 480, withoutEnlargement: true })
  .webp({ quality: 92 })
  .toFile('./public/vortex-logo.webp');

import { stat } from 'fs/promises';
const before = (await stat('./public/vortex-logo.png')).size;
const after = (await stat('./public/vortex-logo.webp')).size;
console.log(`vortex-logo.png  ${(before/1024).toFixed(0)}K -> webp ${(after/1024).toFixed(0)}K  (-${((1 - after/before) * 100).toFixed(0)}%)`);
