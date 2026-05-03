import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const distDir = "dist";
const routes = ["about", "platform", "projects", "news", "faq", "faqs"];
const indexPath = join(distDir, "index.html");

if (!existsSync(indexPath)) {
  throw new Error("dist/index.html does not exist. Run vite build first.");
}

for (const route of routes) {
  const routeDir = join(distDir, route);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(indexPath, join(routeDir, "index.html"));
}
