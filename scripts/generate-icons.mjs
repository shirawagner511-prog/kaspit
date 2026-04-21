import sharp from 'sharp';

function makeSVG(size) {
  const r = Math.round(size * 0.22);
  const fontSize = Math.round(size * 0.62);
  const y = Math.round(size * 0.72);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="#2D6A4F"/>
  <text x="50%" y="${y}" text-anchor="middle"
    font-family="Georgia, serif" font-weight="700"
    font-size="${fontSize}" fill="#FFFFFF">B</text>
</svg>`;
}

await sharp(Buffer.from(makeSVG(192))).png().toFile('public/icon-192.png');
await sharp(Buffer.from(makeSVG(512))).png().toFile('public/icon-512.png');
await sharp(Buffer.from(makeSVG(32))).png().toFile('public/favicon.png');

console.log('Icons generated.');
