'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ScrollTopButton } from '../components/ScrollTopButton';
import { I18nProvider } from '../i18n/I18nProvider';
import { installGlideScroll, scrollToHash, scrollToPageTop } from '../lib/smooth-scroll';

function ScrollManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !('scrollRestoration' in window.history)) return;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => installGlideScroll(), []);

  useEffect(() => {
    const frameIds: number[] = [];

    const runScroll = (attemptsLeft = 12) => {
      const firstRender = isFirstRender.current;
      if (firstRender) {
        isFirstRender.current = false;
      }

      const hash = window.location.hash;
      if (hash) {
        const didScroll = scrollToHash(hash, firstRender ? 'auto' : undefined);
        if ((!didScroll || firstRender) && attemptsLeft > 0) {
          const frameId = window.requestAnimationFrame(() => runScroll(attemptsLeft - 1));
          frameIds.push(frameId);
        }
        return;
      }

      if (!firstRender) {
        scrollToPageTop();
      }
    };

    const frameId = window.requestAnimationFrame(() => runScroll(isFirstRender.current ? 36 : 12));
    frameIds.push(frameId);

    return () => {
      frameIds.forEach((id) => window.cancelAnimationFrame(id));
    };
  }, [pathname, searchParams]);

  return null;
}

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <ScrollManager />
      <div className="flex min-h-screen flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <div id="main-content" tabIndex={-1} className="flex-grow">
          {children}
        </div>
        <Footer />
        <ScrollTopButton />
      </div>
    </I18nProvider>
  );
}
