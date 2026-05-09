'use client';

import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ScrollTopButton } from '../components/ScrollTopButton';
import { installGlideScroll, scrollToHash, scrollToPageTop } from '../lib/smooth-scroll';

function ScrollManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);
  const didNormalizeInitialHash = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('scrollRestoration' in window.history)) return;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => installGlideScroll(), []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !window.location.hash) return;

    didNormalizeInitialHash.current = true;
    const oldUrl = window.location.href;
    const nextPath = `${window.location.pathname}${window.location.search}`;

    window.history.replaceState(window.history.state, document.title, nextPath || '/');
    const hashChangeEvent =
      typeof HashChangeEvent === 'function'
        ? new HashChangeEvent('hashchange', { oldURL: oldUrl, newURL: window.location.href })
        : new Event('hashchange');
    window.dispatchEvent(hashChangeEvent);

    const forceTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const frameIds: number[] = [];
    const timeoutIds: number[] = [];

    forceTop();
    frameIds.push(window.requestAnimationFrame(forceTop));
    timeoutIds.push(window.setTimeout(forceTop, 80));
    timeoutIds.push(window.setTimeout(forceTop, 240));

    return () => {
      frameIds.forEach((id) => window.cancelAnimationFrame(id));
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    const frameIds: number[] = [];
    const queryString = searchParams?.toString() ?? '';
    const currentPath = `${pathname || '/'}${queryString ? `?${queryString}` : ''}`;

    const normalizeInitialHashNavigation = (firstRender: boolean) => {
      if (!firstRender || !window.location.hash) return false;

      window.history.replaceState(window.history.state, document.title, currentPath);
      window.dispatchEvent(new Event('hashchange'));
      scrollToPageTop('auto');
      return true;
    };

    const runScroll = (attemptsLeft = 12) => {
      const firstRender = isFirstRender.current;
      if (firstRender) {
        isFirstRender.current = false;
      }

      if (!didNormalizeInitialHash.current && normalizeInitialHashNavigation(firstRender)) {
        return;
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
    <>
      <ScrollManager />
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
        <ScrollTopButton />
      </div>
    </>
  );
}
