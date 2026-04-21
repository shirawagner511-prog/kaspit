import sharp from 'sharp';

const BG = '#F7F5F0';
const GREEN = '#2D6A4F';

function makeSVG(size) {
  const pad = size * 0.18;
  const r = size * 0.22;
  const fontSize = size * 0.52;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="${BG}"/>
  <rect x="2" y="2" width="${size-4}" height="${size-4}" rx="${r-2}" fill="none" stroke="${GREEN}" stroke-width="${size*0.025}"/>
  <text
    x="50%" y="54%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="Georgia, serif"
    font-weight="700"
    font-size="${fontSize}"
    fill="${GREEN}"
    letter-spacing="-2"
  >B</text>
</svg>`;
}

await sharp(Buffer.from(makeSVG(192))).png().toFile('public/icon-192.png');
await sharp(Buffer.from(makeSVG(512))).png().toFile('public/icon-512.png');
await sharp(Buffer.from(makeSVG(32))).png().toFile('public/favicon.png');

console.log('Icons generated.');
