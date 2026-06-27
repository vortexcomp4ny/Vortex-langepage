import sharp from 'sharp';

// Gera favicon a partir do simbolo 3D da marca (triangulo invertido).
// Triangulo trimado + centralizado sobre fundo escuro arredondado (app-icon),
// pra ter contraste em aba clara OU escura. Master 512 -> downscale nitido.

const SIZE = 512;
const RADIUS = 112; // ~22% — cantos arredondados estilo app icon

const bgSvg = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="g" cx="50%" cy="36%" r="75%">
        <stop offset="0%" stop-color="#1b1030"/>
        <stop offset="100%" stop-color="#070710"/>
      </radialGradient>
    </defs>
    <rect width="${SIZE}" height="${SIZE}" rx="${RADIUS}" ry="${RADIUS}" fill="url(#g)"/>
  </svg>`
);

const logo = await sharp('./public/logo-vortex-3d.png')
  .trim()
  .resize({ width: Math.round(SIZE * 0.7), withoutEnlargement: false })
  .toBuffer();

const master = await sharp(bgSvg)
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
  console.log(`public/${name}  ${s}x${s}`);
}
