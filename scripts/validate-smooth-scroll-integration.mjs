import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const header = readFileSync(resolve(root, "src/components/Header.tsx"), "utf8");
const appShell = readFileSync(resolve(root, "src/app/ClientLayout.tsx"), "utf8");
const smoothScroll = readFileSync(resolve(root, "src/lib/smooth-scroll.ts"), "utf8");
const strategySection = readFileSync(resolve(root, "src/components/StrategySection.tsx"), "utf8");
const css = readFileSync(resolve(root, "src/index.css"), "utf8");

const expectations = [
  {
    label: "Next app shell installs the shared glide scroll manager",
    pass: appShell.includes("installGlideScroll") && appShell.includes("<ScrollManager />"),
  },
  {
    label: "Initial hash loads are preserved and scrolled with the shared hash helper",
    pass:
      !appShell.includes("normalizeInitialHashNavigation") &&
      !appShell.includes("window.history.replaceState") &&
      appShell.includes("scrollToHash(hash, firstRender ? 'auto' : undefined)"),
  },
  {
    label: "First-render scroll state is consumed only when the scheduled scroll frame runs",
    pass: !/const firstRender = isFirstRender\.current;\s*isFirstRender\.current = false;/.test(appShell),
  },
  {
    label: "Header imports the custom scroll helpers",
    pass: header.includes("scrollToHash") && header.includes("scrollToPageTop"),
  },
  {
    label: "Header can update same-page navigation before scrolling",
    pass: header.includes("window.history.pushState") && header.includes("handleInternalLinkClick"),
  },
  {
    label: "Contact header links route to the contact page instead of footer hash anchors",
    pass:
      header.includes('href="/contact"') &&
      !header.includes('href="#contact"') &&
      !header.includes('handleInternalLinkClick(event, "/#contact")'),
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
  {
    label: "Glide easing is normalized by requestAnimationFrame timing instead of frame count",
    pass:
      smoothScroll.includes("lastGlideFrameTime") &&
      smoothScroll.includes("deltaMs") &&
      smoothScroll.includes("1000 / 60") &&
      smoothScroll.includes("Math.pow(1 - resolvedEasing"),
  },
  {
    label: "Glide scroll exposes active state so heavy fixed effects can cooperate with wheel motion",
    pass: smoothScroll.includes("glideScrollState") && css.includes('[data-glide-scroll-state="active"]'),
  },
  {
    label: "Scroll reveal Motion animations use explicit compositor-friendly transitions",
    pass:
      strategySection.includes("usePrefersReducedMotion") &&
      strategySection.includes("revealTransition") &&
      strategySection.includes("motion-reveal-surface") &&
      !strategySection.includes("transition={{ delay: 0.1 }}"),
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
