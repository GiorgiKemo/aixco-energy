import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const header = readFileSync(resolve(root, "src/components/Header.tsx"), "utf8");
const app = readFileSync(resolve(root, "src/App.tsx"), "utf8");
const smoothScroll = readFileSync(resolve(root, "src/lib/smooth-scroll.ts"), "utf8");

const expectations = [
  {
    label: "App installs the shared glide scroll manager",
    pass: app.includes("installGlideScroll") && app.includes("<ScrollManager />"),
  },
  {
    label: "Initial hash loads are normalized so refresh starts at the top",
    pass:
      app.includes("normalizeInitialHashNavigation") &&
      app.includes("window.history.replaceState") &&
      app.includes("scrollToPageTop('auto')"),
  },
  {
    label: "First-render scroll state is consumed only when the scheduled scroll frame runs",
    pass: !/const firstRender = isFirstRender\.current;\s*isFirstRender\.current = false;/.test(app),
  },
  {
    label: "Header imports the custom scroll helpers",
    pass: header.includes("scrollToHash") && header.includes("scrollToPageTop"),
  },
  {
    label: "Header can update same-page navigation before scrolling",
    pass: header.includes("useNavigate") && header.includes("handleInternalLinkClick"),
  },
  {
    label: "Contact header links route through React instead of native hash anchors",
    pass: header.includes('to="/#contact"') && !header.includes('href="#contact"'),
  },
  {
    label: "Header logo/home clicks trigger the custom page-top glide",
    pass: header.includes('handleInternalLinkClick(event, "/")') && header.includes("scrollToPageTop()"),
  },
  {
    label: "Header hash nav clicks trigger the custom hash glide",
    pass: header.includes("handleInternalLinkClick(event, item.to)") && header.includes("scrollToHash(targetHash)"),
  },
  {
    label: "Glide scroll keeps wheel handling eased through requestAnimationFrame",
    pass:
      smoothScroll.includes('document.addEventListener("wheel"') &&
      smoothScroll.includes("window.requestAnimationFrame(step)") &&
      smoothScroll.includes('document.documentElement.dataset.glideScroll = "enabled"'),
  },
];

const failures = expectations.filter((expectation) => !expectation.pass);

if (failures.length > 0) {
  throw new Error(
    `Smooth scroll integration is incomplete:\n${failures
      .map((failure) => `- ${failure.label}`)
      .join("\n")}`,
  );
}

console.log("Smooth scroll integration validated.");
