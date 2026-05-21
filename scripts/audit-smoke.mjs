import http from 'node:http';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const repoRoot = process.cwd();
const port = Number(process.env.AIXCO_SMOKE_PORT ?? 3107);
const baseUrl = `http://127.0.0.1:${port}`;
const checkName = process.argv[2] ?? 'all';
const serverLogs = [];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function collectLog(chunk) {
  serverLogs.push(chunk.toString());
  if (serverLogs.length > 40) {
    serverLogs.shift();
  }
}

async function waitForServer(timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const isReady = await new Promise((resolve) => {
      const request = http.get(baseUrl, (response) => {
        response.resume();
        resolve(response.statusCode ? response.statusCode < 500 : false);
      });

      request.on('error', () => resolve(false));
      request.setTimeout(1000, () => {
        request.destroy();
        resolve(false);
      });
    });

    if (isReady) return;
    await wait(250);
  }

  throw new Error(`Timed out waiting for ${baseUrl}\n${serverLogs.join('')}`);
}

async function assertNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => {
    const documentWidth = document.documentElement.scrollWidth;
    const viewportWidth = document.documentElement.clientWidth;

    return {
      documentWidth,
      viewportWidth,
      overflowing: documentWidth > viewportWidth + 1,
    };
  });

  if (overflow.overflowing) {
    throw new Error(`Horizontal overflow: document ${overflow.documentWidth}px, viewport ${overflow.viewportWidth}px`);
  }
}

async function runNotFoundCheck(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => {
    window.localStorage.setItem('aixco-lang', 'de');
  });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/missing-aixco-audit-page`, { waitUntil: 'networkidle' });
  const main = page.locator('main');
  await main.getByRole('heading', { name: /Seite nicht gefunden|Page not found/i }).waitFor();
  await main.getByRole('link', { name: /Zur Startseite|Back to home/i }).waitFor();
  await main.getByRole('link', { name: /FAQs öffnen|Open FAQs/i }).waitFor();
  await main.getByRole('link', { name: /Kontakt|Contact us/i }).waitFor();
  await assertNoHorizontalOverflow(page);

  const state = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    homeHref: document.querySelector('a[href="/"]')?.getAttribute('href'),
    faqHref: document.querySelector('a[href="/faq"]')?.getAttribute('href'),
    contactHref: document.querySelector('a[href="/contact"]')?.getAttribute('href'),
  }));

  if (state.lang !== 'de' || state.homeHref !== '/' || state.faqHref !== '/faq' || state.contactHref !== '/contact') {
    throw new Error(`Unexpected 404 recovery state: ${JSON.stringify(state)}`);
  }

  await context.close();
}

async function runHeroVideoAssetCheck(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  const heroVideoState = await page.evaluate(() => {
    const video = document.querySelector('video');
    const hero = document.querySelector('.energy-hero');
    return {
      src: video?.currentSrc || video?.getAttribute('src') || '',
      autoPlay: video?.autoplay ?? false,
      muted: video?.muted ?? false,
      loop: video?.loop ?? false,
      playsInline: video?.playsInline ?? false,
      paused: video?.paused ?? true,
      readyState: video?.readyState ?? 0,
      hasHeroVideoControl: Boolean(hero?.querySelector('button[aria-label*="hero video" i]')),
      bodyHasBadMediaText: /DSCR|Solence|minimum DSCR/i.test(document.body.textContent ?? ''),
    };
  });

  if (!heroVideoState.src.includes('/aixco-energy/video/hero-solar-panels.mp4')) {
    throw new Error(`Unexpected hero video source: ${heroVideoState.src}`);
  }

  if (heroVideoState.src.includes('/aixco-energy/video/1.mp4') || heroVideoState.bodyHasBadMediaText) {
    throw new Error(`Hero media guard failed: ${JSON.stringify(heroVideoState)}`);
  }

  if (
    !heroVideoState.autoPlay ||
    !heroVideoState.muted ||
    !heroVideoState.loop ||
    !heroVideoState.playsInline ||
    heroVideoState.paused ||
    heroVideoState.hasHeroVideoControl
  ) {
    throw new Error(`Hero autoplay guard failed: ${JSON.stringify(heroVideoState)}`);
  }

  await assertNoHorizontalOverflow(page);
  await context.close();
}

async function runHeroViewportFitCheck(browser) {
  const viewports = [
    { width: 1584, height: 825 },
    { width: 1366, height: 768 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
  ];

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();

    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    const heroState = await page.evaluate(() => {
      const rect = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const box = element.getBoundingClientRect();
        return {
          top: box.top,
          bottom: box.bottom,
          height: box.height,
        };
      };

      const investorFaq = Array.from(document.querySelectorAll('.energy-hero a')).find(
        (element) => element.textContent?.replace(/\s+/g, ' ').trim() === 'Investor FAQs',
      );
      const investorFaqRect = investorFaq?.getBoundingClientRect();
      const skipLink = document.querySelector('.skip-link');

      return {
        viewportHeight: window.innerHeight,
        skipLinkPosition: skipLink ? window.getComputedStyle(skipLink).position : null,
        mainTop: document.querySelector('#main-content')?.getBoundingClientRect().top ?? null,
        hero: rect('.energy-hero'),
        metrics: rect('.energy-hero__metrics'),
        investorFaq: investorFaqRect
          ? {
              top: investorFaqRect.top,
              bottom: investorFaqRect.bottom,
              height: investorFaqRect.height,
            }
          : null,
      };
    });

    if (heroState.skipLinkPosition !== 'fixed' || heroState.mainTop !== 0) {
      throw new Error(`Skip link is affecting document layout at ${viewport.width}x${viewport.height}: ${JSON.stringify(heroState)}`);
    }

    if (viewport.width >= 1024) {
      for (const [label, box] of [
        ['hero', heroState.hero],
        ['metrics', heroState.metrics],
        ['investorFaq', heroState.investorFaq],
      ]) {
        if (!box || box.bottom > heroState.viewportHeight + 1) {
          throw new Error(`${label} does not fit in first viewport at ${viewport.width}x${viewport.height}: ${JSON.stringify(heroState)}`);
        }
      }
    }

    await assertNoHorizontalOverflow(page);
    await context.close();
  }
}

async function runHeroTypographyCheck(browser) {
  const context = await browser.newContext({ viewport: { width: 1525, height: 862 } });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  const typographyState = await page.evaluate(() => {
    const inspect = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const styles = window.getComputedStyle(element);
      return {
        selector,
        text: element.textContent?.replace(/\s+/g, ' ').trim() ?? '',
        fontStyle: styles.fontStyle,
        textTransform: styles.textTransform,
      };
    };

    return [
      inspect('.status-tag'),
      inspect('.energy-hero h2.hero-reference-font'),
      inspect('.energy-hero a[href="/projects"]'),
      inspect('.energy-hero__metric span:nth-child(1)'),
      inspect('.energy-hero__metric span:nth-child(2)'),
      inspect('.energy-hero__vertical h3'),
      inspect('.energy-hero__vertical p'),
      inspect('.energy-hero a[href="/faq"]'),
    ];
  });

  const badTypography = typographyState.filter((item) => !item || item.fontStyle !== 'normal' || item.textTransform !== 'none');
  if (badTypography.length > 0) {
    throw new Error(`Hero typography is forced italic/uppercase: ${JSON.stringify(typographyState)}`);
  }

  await assertNoHorizontalOverflow(page);
  await context.close();
}

async function runNewsLanguageCheck(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.addInitScript(() => {
    window.localStorage.setItem('aixco-lang', 'de');
  });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/news`, { waitUntil: 'networkidle' });
  await page.getByText(/Ausgangssprache/i).first().waitFor();
  await page.getByText(/Deutschsprachiges Quellenmaterial/i).first().waitFor();
  await assertNoHorizontalOverflow(page);

  await page.goto(`${baseUrl}/news/solar-energy-new-thinking`, { waitUntil: 'networkidle' });
  await page.getByText(/Ausgangssprache/i).first().waitFor();
  await page.getByText(/Deutschsprachiges Quellenmaterial/i).first().waitFor();
  await assertNoHorizontalOverflow(page);

  await context.close();
}

async function runNewsRepetitionCheck(browser) {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/news`, { waitUntil: 'networkidle' });
  const pageText = await page.evaluate(() => document.body.textContent?.replace(/\s+/g, ' ').trim() ?? '');

  if (!pageText.includes('How to use this archive') || !pageText.includes('Original sources stay available')) {
    throw new Error('News archive-specific guidance is missing.');
  }

  const repeatedHomeBlocks = [
    'Where future growth may come from',
    'Real assets. Essential demand. Multiple technology pathways.',
  ];

  for (const repeatedBlock of repeatedHomeBlocks) {
    if (pageText.includes(repeatedBlock)) {
      throw new Error(`News page still repeats homepage block: ${repeatedBlock}`);
    }
  }

  await assertNoHorizontalOverflow(page);
  await context.close();
}

async function runNewsCardLinkCheck(browser) {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/news`, { waitUntil: 'networkidle' });
  const articleTextLink = page.locator('article a[href="/news/solar-energy-new-thinking"]:has(h2)').first();
  const href = await articleTextLink.getAttribute('href');
  if (href !== '/news/solar-energy-new-thinking') {
    throw new Error(`Unexpected first article text link href: ${href}`);
  }

  await articleTextLink.click();
  await page.waitForURL(`${baseUrl}/news/solar-energy-new-thinking`);
  await page.getByRole('link', { name: /Back to news/i }).waitFor();
  await assertNoHorizontalOverflow(page);

  await context.close();
}

async function runFooterEnergyLinksCheck(browser) {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  const footerLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll('#contact a'))
      .map((link) => ({
        text: link.textContent?.replace(/\s+/g, ' ').trim(),
        href: link.getAttribute('href'),
      }))
      .filter((link) =>
        [
          'Utility-Scale Solar',
          'Onshore Wind',
          'Battery Storage Systems',
          'Hydrogen Infrastructure',
          'Hybrid Energy Assets',
          'Grid & Digital Controls',
          'Technology News',
        ].includes(link.text ?? ''),
      ),
  );

  const hrefByText = Object.fromEntries(footerLinks.map((link) => [link.text, link.href]));
  const expected = {
    'Utility-Scale Solar': '/projects#utility-scale-solar',
    'Onshore Wind': '/projects#onshore-offshore-wind',
    'Battery Storage Systems': '/projects#battery-energy-storage',
    'Hydrogen Infrastructure': '/projects#green-hydrogen-electrolysis',
    'Hybrid Energy Assets': '/projects#solar-wind-storage',
    'Grid & Digital Controls': '/projects#smart-grid-ai-optimisation',
    'Technology News': '/news',
  };

  for (const [text, href] of Object.entries(expected)) {
    if (hrefByText[text] !== href) {
      throw new Error(`Unexpected footer link for ${text}: ${hrefByText[text]}`);
    }
  }

  await page.goto(`${baseUrl}/projects#battery-energy-storage`, { waitUntil: 'networkidle' });
  const anchorState = await page.evaluate(() => {
    const target = document.querySelector('#battery-energy-storage');
    const header = document.querySelector('header.scroll-fixed-surface');
    if (!target || !header) return null;
    return {
      targetTop: target.getBoundingClientRect().top,
      headerBottom: header.getBoundingClientRect().bottom,
    };
  });

  if (!anchorState || anchorState.targetTop < anchorState.headerBottom - 1) {
    throw new Error(`Footer anchor target hidden by header: ${JSON.stringify(anchorState)}`);
  }

  await assertNoHorizontalOverflow(page);
  await context.close();
}

async function runActiveNavCheck(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  const activeLabel = async () =>
    page.evaluate(() =>
      document.querySelector('nav.site-nav a[aria-current="page"]')?.textContent?.replace(/\s+/g, ' ').trim() ?? null,
    );

  await page.goto(`${baseUrl}/#faqs`, { waitUntil: 'networkidle' });
  if ((await activeLabel()) !== 'Home') {
    throw new Error(`Expected Home active on legacy FAQ hash, got ${await activeLabel()}`);
  }

  await page.goto(`${baseUrl}/news/solar-energy-new-thinking`, { waitUntil: 'networkidle' });
  if ((await activeLabel()) !== 'News') {
    throw new Error(`Expected News active on article page, got ${await activeLabel()}`);
  }

  await page.goto(`${baseUrl}/contact`, { waitUntil: 'networkidle' });
  if ((await activeLabel()) !== 'Contact') {
    throw new Error(`Expected Contact active on contact page, got ${await activeLabel()}`);
  }

  await assertNoHorizontalOverflow(page);
  await context.close();
}

async function runScrollOffsetCheck(browser) {
  const viewports = [
    { width: 390, height: 844 },
    { width: 1024, height: 768 },
  ];
  const targets = [
    ['/#about', '#about'],
    ['/#faqs', '#faqs'],
    ['/projects#battery-energy-storage', '#battery-energy-storage'],
  ];

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();

    for (const [path, selector] of targets) {
      await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });
      await wait(500);
      const anchorState = await page.evaluate((targetSelector) => {
        const target = document.querySelector(targetSelector);
        const header = document.querySelector('header.scroll-fixed-surface');
        if (!target || !header) return null;
        return {
          targetTop: target.getBoundingClientRect().top,
          headerBottom: header.getBoundingClientRect().bottom,
          scrollPaddingTop: window.getComputedStyle(document.documentElement).scrollPaddingTop,
        };
      }, selector);

      if (!anchorState || anchorState.targetTop < anchorState.headerBottom - 1) {
        throw new Error(`Anchor ${path} hidden by header at ${viewport.width}x${viewport.height}: ${JSON.stringify(anchorState)}`);
      }

      await assertNoHorizontalOverflow(page);
    }

    await context.close();
  }
}

async function runFooterLegalGroupingCheck(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  const groupingState = await page.evaluate(() => ({
    legalText: document.querySelector('[data-legal-actions]')?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
    hoursText: document.querySelector('[data-office-hours]')?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
  }));

  if (!groupingState.legalText.includes('Terms') || !groupingState.legalText.includes('Privacy')) {
    throw new Error(`Missing legal actions: ${JSON.stringify(groupingState)}`);
  }

  if (/Monday|Friday|CET/i.test(groupingState.legalText) || !/Monday|Friday|CET/i.test(groupingState.hoursText)) {
    throw new Error(`Office hours are not separated from legal actions: ${JSON.stringify(groupingState)}`);
  }

  await assertNoHorizontalOverflow(page);
  await context.close();
}

async function runLegalFocusCheck(browser) {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  const termsButton = page.getByRole('button', { name: /Terms & Conditions/i });
  await termsButton.click();
  await page.getByRole('dialog', { name: /Terms & Conditions/i }).waitFor();
  await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Close');

  const initialFocus = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  if (initialFocus !== 'Close') {
    throw new Error(`Legal dialog did not move focus to the close button: ${initialFocus}`);
  }

  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('[role="dialog"]'));
  await page.waitForFunction(() => document.activeElement?.textContent?.replace(/\s+/g, ' ').trim() === 'Terms & Conditions');
  const returnFocus = await page.evaluate(() => document.activeElement?.textContent?.replace(/\s+/g, ' ').trim());
  if (returnFocus !== 'Terms & Conditions') {
    throw new Error(`Legal dialog did not return focus to trigger: ${returnFocus}`);
  }

  await termsButton.click();
  await page.getByRole('dialog', { name: /Terms & Conditions/i }).waitFor();
  await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Close');
  await page.keyboard.press('Tab');
  const tabFocusInsideDialog = await page.evaluate(() => Boolean(document.querySelector('[role="dialog"]')?.contains(document.activeElement)));
  if (!tabFocusInsideDialog) {
    throw new Error('Tab focus escaped the legal dialog.');
  }

  await assertNoHorizontalOverflow(page);
  await context.close();
}

async function runNewsMarqueeA11yCheck(browser) {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  const marqueeState = await page.evaluate(() => {
    const groups = Array.from(document.querySelectorAll('.news-marquee__group'));
    return groups.map((group) => ({
      ariaHidden: group.getAttribute('aria-hidden'),
      inert: group.hasAttribute('inert'),
      focusableLinks: Array.from(group.querySelectorAll('a')).filter((link) => link.tabIndex >= 0).length,
      totalLinks: group.querySelectorAll('a').length,
    }));
  });

  const primaryGroup = marqueeState[0];
  const duplicateGroup = marqueeState[1];
  if (!primaryGroup || primaryGroup.ariaHidden !== null || primaryGroup.inert || primaryGroup.focusableLinks === 0) {
    throw new Error(`Primary marquee group is not accessible: ${JSON.stringify(marqueeState)}`);
  }

  if (!duplicateGroup || duplicateGroup.ariaHidden !== 'true' || !duplicateGroup.inert || duplicateGroup.focusableLinks !== 0) {
    throw new Error(`Duplicate marquee group is still accessible/focusable: ${JSON.stringify(marqueeState)}`);
  }

  await assertNoHorizontalOverflow(page);
  await context.close();
}

const checks = {
  'hero-video-asset': runHeroVideoAssetCheck,
  'hero-viewport-fit': runHeroViewportFitCheck,
  'hero-typography': runHeroTypographyCheck,
  'not-found': runNotFoundCheck,
  'news-language': runNewsLanguageCheck,
  'news-repetition': runNewsRepetitionCheck,
  'news-card-link': runNewsCardLinkCheck,
  'footer-energy-links': runFooterEnergyLinksCheck,
  'active-nav': runActiveNavCheck,
  'scroll-offset': runScrollOffsetCheck,
  'footer-legal-grouping': runFooterLegalGroupingCheck,
  'legal-focus': runLegalFocusCheck,
  'news-marquee-a11y': runNewsMarqueeA11yCheck,
};

async function main() {
  const server = spawn(
    process.execPath,
    ['node_modules/next/dist/bin/next', 'start', '-p', String(port), '-H', '127.0.0.1'],
    {
      cwd: repoRoot,
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );

  server.stdout.on('data', collectLog);
  server.stderr.on('data', collectLog);

  try {
    await waitForServer();
    const browser = await chromium.launch();

    try {
      const selectedChecks = checkName === 'all' ? Object.values(checks) : [checks[checkName]];
      if (selectedChecks.some((check) => !check)) {
        throw new Error(`Unknown smoke check: ${checkName}`);
      }

      for (const check of selectedChecks) {
        await check(browser);
      }
    } finally {
      await browser.close();
    }
  } finally {
    server.kill();
  }
}

main()
  .then(() => {
    console.log(`Audit smoke passed: ${checkName}`);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
