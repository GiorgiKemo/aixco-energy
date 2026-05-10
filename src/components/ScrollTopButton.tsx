'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { scrollToPageTop } from '../lib/smooth-scroll';

export const ScrollTopButton: React.FC = () => {
  const { tx } = useI18n();
  const [visible, setVisible] = React.useState(false);
  const frameRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const updateVisibility = () => {
      setVisible(window.scrollY > Math.min(window.innerHeight * 0.75, 680));
    };

    const scheduleVisibilityUpdate = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateVisibility();
      });
    };

    updateVisibility();
    const intervalId = window.setInterval(updateVisibility, 250);
    window.addEventListener('scroll', scheduleVisibilityUpdate, { passive: true });
    window.addEventListener('resize', scheduleVisibilityUpdate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.clearInterval(intervalId);
      window.removeEventListener('scroll', scheduleVisibilityUpdate);
      window.removeEventListener('resize', scheduleVisibilityUpdate);
    };
  }, []);

  const handleClick = () => {
    const cleanPath = `${window.location.pathname}${window.location.search}` || '/';

    if (window.location.hash) {
      window.history.pushState(window.history.state, document.title, cleanPath);
      window.dispatchEvent(new Event('hashchange'));
    }

    scrollToPageTop();
  };

  return (
    <button
      type="button"
      aria-label={tx("Scroll to top")}
      title={tx("Scroll to top")}
      onClick={handleClick}
      tabIndex={visible ? 0 : -1}
      data-visible={visible ? 'true' : 'false'}
      className="scroll-top-button"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};
