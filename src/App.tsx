/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import HomePage from './pages/HomePage';
import PlatformPage from './pages/PlatformPage';
import ProjectsPage from './pages/ProjectsPage';
import NewsPage from './pages/NewsPage';
import ArticlePage from './pages/ArticlePage';
import { installGlideScroll, scrollToHash, scrollToPageTop } from './lib/smooth-scroll';

function ScrollManager() {
  const location = useLocation();
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
    const firstRender = isFirstRender.current;
    isFirstRender.current = false;
    const frameIds: number[] = [];

    const runScroll = (attemptsLeft = 12) => {
      if (location.hash) {
        const didScroll = scrollToHash(location.hash, firstRender ? 'auto' : undefined);
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

    const frameId = window.requestAnimationFrame(() => runScroll(firstRender ? 36 : 12));
    frameIds.push(frameId);

    return () => {
      frameIds.forEach((id) => window.cancelAnimationFrame(id));
    };
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollManager />
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<PlatformPage />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<ArticlePage />} />
            <Route path="/faq" element={<Navigate to="/#faqs" replace />} />
            <Route path="/faqs" element={<Navigate to="/#faqs" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
