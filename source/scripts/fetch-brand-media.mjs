import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const outputDir = fileURLToPath(new URL("../public/media/", import.meta.url));
await mkdir(outputDir, { recursive: true });

const assets = {
  "bb610-systems.webp": "https://bb610.com.ua/assets/bb610-systems.webp",
  "garden.jpg": "https://bb610.com.ua/assets/garden.jpg",
  "bb610-garden.webp": "https://bb610.com.ua/assets/bb610-garden.webp",
  "water.jpg": "https://bb610.com.ua/assets/water.jpg",
  "bb610-water.webp": "https://bb610.com.ua/assets/bb610-water.webp",
  "market.jpg": "https://bb610.com.ua/assets/market.jpg",
  "bb610-market.webp": "https://bb610.com.ua/assets/bb610-market.webp",
  "berry.jpg": "https://bb610.com.ua/assets/berry.jpg",
  "bb610-berry.webp": "https://bb610.com.ua/assets/bb610-berry.webp",
};

for (const [name, url] of Object.entries(assets)) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  await writeFile(path.join(outputDir, name), Buffer.from(await response.arrayBuffer()));
}

for (const name of ["bb610-systems.webp", "bb610-garden.webp", "bb610-water.webp", "bb610-market.webp", "bb610-berry.webp"]) {
  const filePath = path.join(outputDir, name);
  const optimized = await sharp(await readFile(filePath))
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 84, alphaQuality: 90 })
    .toBuffer();
  await writeFile(filePath, optimized);
}

const gradient = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#08120d"/>
        <stop offset="0.58" stop-color="#061117"/>
        <stop offset="1" stop-color="#090a11"/>
      </linearGradient>
      <radialGradient id="r" cx="75%" cy="25%" r="70%">
        <stop stop-color="#27e875" stop-opacity=".22"/>
        <stop offset="1" stop-color="#27e875" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect width="1200" height="630" fill="url(#r)"/>
    <g opacity=".13" stroke="#fff">
      ${Array.from({ length: 17 }, (_, i) => `<path d="M0 ${i * 40}H1200"/>`).join("")}
      ${Array.from({ length: 31 }, (_, i) => `<path d="M${i * 40} 0V630"/>`).join("")}
    </g>
    <text x="68" y="470" fill="#f5f7f2" font-family="Arial, sans-serif" font-size="76" font-weight="700" letter-spacing="-3">ВИРОЩУЄМО. АВТОМАТИЗУЄМО.</text>
    <text x="70" y="540" fill="#aab4ab" font-family="Arial, sans-serif" font-size="34" letter-spacing="4">ПОСТАЧАЄМО.</text>
  </svg>`);

const logoPath = path.join(outputDir, "bb610-systems.webp");
await sharp(gradient)
  .composite([
    {
      input: await sharp(logoPath).resize({ width: 320 }).png().toBuffer(),
      left: 68,
      top: 66,
    },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(path.join(outputDir, "og-bb610.jpg"));

console.log(`Saved ${Object.keys(assets).length} brand assets and Open Graph image.`);
