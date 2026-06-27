import sharp from 'sharp';

// Favicon a partir do simbolo 3D da marca (triangulo invertido), FUNDO TRANSPARENTE.
// So o simbolo trimado, centralizado num canvas quadrado transparente.
// Master 512 -> downscale nitido pra cada tamanho.

const SIZE = 512;

const logo = await sharp('./public/logo-vortex-3d.png')
  .trim()
  .resize({ width: Math.round(SIZE * 0.86), withoutEnlargement: false })
  .toBuffer();

const master = await sharp({
  create: { width: SIZE, height: SIZE, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([{ input: logo, gravity: 'center' }])
  .png()
  .toBuffer();

const sizes = [
  { s: 512, name: 'favicon-512.png' },
  { s: 192, name: 'favicon-192.png' },
  { s: 180, name: 'apple-touch-icon.png' },
  { s: 48, name: 'favicon-48.png' },
  { s: 32, name: 'favicon-32.png' },
  { s: 16, name: 'favicon-16.png' },
];

for (const { s, name } of sizes) {
  await sharp(master).resize(s, s).png({ compressionLevel: 9 }).toFile(`./public/${name}`);
  console.log(`public/${name}  ${s}x${s}  (transparente)`);
}
