import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "public", "fonts");
await mkdir(output, { recursive: true });

const files = [
  ["@fontsource-variable/manrope/files/manrope-cyrillic-wght-normal.woff2", "manrope-cyrillic.woff2"],
  ["@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", "manrope-latin.woff2"],
  ["@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2", "space-grotesk-latin.woff2"],
];

for (const [source, target] of files) {
  await copyFile(path.join(root, "node_modules", source), path.join(output, target));
}

console.log(`Prepared ${files.length} local font files.`);
