'use client';

import React, { useEffect, useRef, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, Globe, Linkedin, Menu, X } from 'lucide-react';
import { aixcoAssets, contact, navItems, socialLinks } from '../content/aixcoEnergy';
import { recordBlueRockClick, recordEmailClick } from '../lib/backend/energy-lead-capture';
import { scrollToHash, scrollToPageTop } from '../lib/smooth-scroll';

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const [activeNavTarget, setActiveNavTarget] = useState('/');
  const activeSectionFrame = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);

    updateHash();
    window.addEventListener('hashchange', updateHash);
    window.addEventListener('popstate', updateHash);

    return () => {
      window.removeEventListener('hashchange', updateHash);
      window.removeEventListener('popstate', updateHash);
    };
  }, []);

  useEffect(() => {
    setCurrentHash(window.location.hash);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') {
      setActiveNavTarget('');
      return;
    }

    const updateActiveSection = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-section]'));
      const headerBottom = document.querySelector('header.scroll-fixed-surface')?.getBoundingClientRect().bottom ?? 0;
      const markerTop = headerBottom + Math.min(window.innerHeight * 0.32, 240);
      let nextActiveTarget = '/';

      sections.forEach((section) => {
        const navTarget = section.dataset.navSection;
        if (!navTarget) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= markerTop && rect.bottom > headerBottom + 1) {
          nextActiveTarget = navTarget;
        }
      });

      setActiveNavTarget(nextActiveTarget);
    };

    const scheduleActiveSectionUpdate = () => {
      if (activeSectionFrame.current !== null) {
        window.cancelAnimationFrame(activeSectionFrame.current);
      }

      activeSectionFrame.current = window.requestAnimationFrame(() => {
        activeSectionFrame.current = null;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', scheduleActiveSectionUpdate, { passive: true });
    window.addEventListener('resize', scheduleActiveSectionUpdate);
    window.addEventListener('hashchange', scheduleActiveSectionUpdate);

    return () => {
      if (activeSectionFrame.current !== null) {
        window.cancelAnimationFrame(activeSectionFrame.current);
        activeSectionFrame.current = null;
      }
      window.removeEventListener('scroll', scheduleActiveSectionUpdate);
      window.removeEventListener('resize', scheduleActiveSectionUpdate);
      window.removeEventListener('hashchange', scheduleActiveSectionUpdate);
    };
  }, [pathname]);

  const handleInternalLinkClick = (event: MouseEvent<HTMLAnchorElement>, to: string) => {
    setOpen(false);
    const activePathname = pathname || '/';

    if (to === "/") {
      if (activePathname !== "/") return;

      event.preventDefault();
      if (currentHash) {
        window.history.pushState(window.history.state, document.title, "/");
        setCurrentHash("");
      }
      setActiveNavTarget("/");
      scrollToPageTop();
      return;
    }

    const hashIndex = to.indexOf("#");
    if (hashIndex === -1) return;

    const targetPath = to.slice(0, hashIndex) || "/";
    const targetHash = to.slice(hashIndex);
    if (activePathname !== targetPath) return;

    event.preventDefault();
    if (currentHash !== targetHash) {
      window.history.pushState(window.history.state, document.title, to);
      setCurrentHash(targetHash);
    }
    setActiveNavTarget(to);
    scrollToHash(targetHash);
  };

  const isActive = (to: string) => {
    const activePathname = pathname || '/';

    if (activePathname === "/") {
      const homeActiveTarget = activeNavTarget || (currentHash ? `/${currentHash}` : "/");
      return homeActiveTarget === to;
    }

    if (to === "/") {
      return false;
    }

    if (to.startsWith("/#")) {
      if (to === "/#about") {
        return activePathname === "/about" || activePathname === "/platform";
      }

      return false;
    }

    if (to === "/news") {
      return activePathname === "/news" || activePathname.startsWith("/news/");
    }

    return activePathname === to;
  };

  return (
    <header className="scroll-fixed-surface fixed top-0 left-0 w-full z-40 border-b border-zinc-800/60 bg-industrial-white/90 shadow-soft backdrop-blur-2xl">
      <div className="hidden lg:block border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between text-sm font-medium tracking-wide text-zinc-500">
          <div className="flex items-center gap-8">
            <Link href="/#contact" onClick={(event) => handleInternalLinkClick(event, "/#contact")} className="inline-flex min-h-8 items-center transition-colors hover:text-brand-red">{contact.address}</Link>
            <Link href="/#contact" onClick={(event) => handleInternalLinkClick(event, "/#contact")} className="inline-flex min-h-8 items-center transition-colors hover:text-brand-red">{contact.support}</Link>
            <a
              href={`mailto:${contact.email}`}
              onClick={() => {
                void recordEmailClick('header_email', contact.email);
              }}
              className="inline-flex min-h-8 items-center transition-colors hover:text-brand-red"
            >
              {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={socialLinks.aixcoGlobal} target="_blank" rel="noreferrer" aria-label="AIXCO Global" className="inline-flex h-8 w-8 items-center justify-center transition-colors hover:text-brand-red">
              <Globe size={14} />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex h-8 w-8 items-center justify-center transition-colors hover:text-brand-red">
              <Linkedin size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" onClick={(event) => handleInternalLinkClick(event, "/")} aria-label="AIXCO Energy home" className="inline-flex min-h-11 items-center gap-2.5 text-industrial-black">
            <Image
              src={aixcoAssets.markBlack}
              alt=""
              aria-hidden
              width={779}
              height={705}
              sizes="36px"
              className="h-8 w-8 object-contain md:h-9 md:w-9"
            />
            <span className="whitespace-nowrap text-sm font-medium tracking-normal md:text-[15px]">
              AIXCO.ENERGY
            </span>
          </Link>
          <nav className="hidden xl:flex gap-2 text-sm font-medium tracking-normal text-zinc-600">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                onClick={(event) => handleInternalLinkClick(event, item.to)}
                aria-current={isActive(item.to) ? "page" : undefined}
                className={`inline-flex min-h-10 items-center rounded-full px-3 transition-colors hover:bg-brand-red/10 hover:text-brand-red ${isActive(item.to) ? "bg-brand-red/10 text-brand-red" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <a
            href="https://bluerock.cc"
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              void recordBlueRockClick('header_desktop_bluerock');
            }}
            className="btn-gold hidden min-h-11 px-4 py-2 text-sm font-bold !text-white sm:inline-flex"
          >
            Buy on BlueRock <ExternalLink size={13} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="icon-button-glass h-11 w-11 xl:hidden text-zinc-600 hover:text-brand-red"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" className="xl:hidden border-t border-zinc-800 bg-industrial-white/95 px-6 py-5 shadow-soft backdrop-blur-2xl">
          <div className="flex flex-col gap-3 text-sm font-medium text-zinc-600">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                onClick={(event) => handleInternalLinkClick(event, item.to)}
                aria-current={isActive(item.to) ? "page" : undefined}
                className={`inline-flex min-h-11 min-w-11 items-center rounded-lg px-3 transition-colors hover:bg-brand-red/10 hover:text-brand-red ${isActive(item.to) ? "bg-brand-red/10 text-brand-red" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://bluerock.cc"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                setOpen(false);
                void recordBlueRockClick('header_mobile_bluerock');
              }}
              className="btn-gold mt-2 justify-center"
            >
              Buy on BlueRock
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
