import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

const requiredFiles = {
  cname: resolve(root, "public/CNAME"),
  css: resolve(root, "src/index.css"),
  header: resolve(root, "src/components/Header.tsx"),
  viteConfig: resolve(root, "vite.config.ts"),
};

for (const [name, path] of Object.entries(requiredFiles)) {
  if (!existsSync(path)) {
    throw new Error(`Missing ${name} file at ${path}`);
  }
}

const cname = readFileSync(requiredFiles.cname, "utf8").trim();
if (cname !== "energy.aixco.global") {
  throw new Error(`Expected public/CNAME to contain energy.aixco.global, got ${JSON.stringify(cname)}`);
}

const css = readFileSync(requiredFiles.css, "utf8");
const expectedCssMarkers = [
  "AIXCO Energy - aligned with AIXCO Global ivory/champagne system",
  "--shadow-soft",
  "--ease-apple",
  "#f9f7f3",
  "--color-brand-red",
];

for (const marker of expectedCssMarkers) {
  if (!css.includes(marker)) {
    throw new Error(`Missing AIXCO Global style marker in index.css: ${marker}`);
  }
}

const header = readFileSync(requiredFiles.header, "utf8");
for (const marker of ["aixcoAssets.markBlack", "AIXCO.ENERGY"]) {
  if (!header.includes(marker)) {
    throw new Error(`Header is not using the light-theme brand treatment: ${marker}`);
  }
}

const viteConfig = readFileSync(requiredFiles.viteConfig, "utf8");
if (!viteConfig.includes("VITE_CUSTOM_DOMAIN")) {
  throw new Error("vite.config.ts must support root-relative builds for custom-domain GitHub Pages deploys.");
}

console.log("Validated AIXCO Global brand alignment and energy.aixco.global domain config.");
