import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const contentPath = resolve(root, "src/content/aixcoEnergy.ts");
const articlePath = resolve(root, "src/content/newsArticles.ts");
const content = readFileSync(contentPath, "utf8");
const articleContent = existsSync(articlePath) ? readFileSync(articlePath, "utf8") : "";

const expectedItems = [
  {
    slug: "solar-energy-new-thinking",
    pdf: "public/aixco-energy/news/pv-asset.pdf",
    image: "public/aixco-energy/images/news/pv-asset.png",
  },
  {
    slug: "2morrow-solar-real-assets",
    pdf: "public/aixco-energy/news/2morrow-2025-ansicht-immo.pdf",
    image: "public/aixco-energy/images/news/2morrow-2025.png",
  },
  {
    slug: "investment-mit-gesellschaftlichem-mehrwert",
    pdf: "public/aixco-energy/news/assets-01-2025-ansicht-immo.pdf",
    image: "public/aixco-energy/images/news/assets-01-2025.png",
  },
  {
    slug: "solide-veranlagung",
    pdf: "public/aixco-energy/news/assets-02-2025-ansicht-immo.pdf",
    image: "public/aixco-energy/images/news/assets-02-2025.png",
  },
  {
    slug: "kapitalanlage-mit-mehrwert",
    pdf: "public/aixco-energy/news/stanglwirt-m-2025-ansicht-immo.pdf",
    image: "public/aixco-energy/images/news/stanglwirt-2025.png",
  },
  {
    slug: "bruckner-simon-pressespiegel",
    pdf: "public/aixco-energy/news/bruckner-simon-pressespiegel.pdf",
    image: "public/aixco-energy/images/news/bruckner-simon-pressespiegel.png",
  },
];

if (!content.includes("export const pressArticles")) {
  throw new Error("Missing pressArticles export.");
}

if (!articleContent.includes("export const newsArticles")) {
  throw new Error("Missing newsArticles export.");
}

for (const item of expectedItems) {
  if (!content.includes(`slug: "${item.slug}"`)) {
    throw new Error(`Missing press article slug: ${item.slug}`);
  }

  if (!articleContent.includes(`"${item.slug}"`)) {
    throw new Error(`Missing article body for slug: ${item.slug}`);
  }

  for (const relativePath of [item.pdf, item.image]) {
    if (!existsSync(resolve(root, relativePath))) {
      throw new Error(`Missing public news asset: ${relativePath}`);
    }
  }
}

console.log(`Validated ${expectedItems.length} press article entries.`);
