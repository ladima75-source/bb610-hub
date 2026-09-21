import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "static-export");
const serverUrl = process.env.BB610_EXPORT_URL ?? "http://127.0.0.1:8787/";

const response = await fetch(serverUrl);
if (!response.ok) {
  throw new Error(`Could not render ${serverUrl}: ${response.status}`);
}

const html = await response.text();
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, "dist", "client"), output, { recursive: true });
await writeFile(path.join(output, "index.html"), html, "utf8");
await writeFile(path.join(output, ".nojekyll"), "", "utf8");

console.log(`Static export created at ${output}`);
