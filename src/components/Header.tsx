'use client';

import React, { useEffect, useRef, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ExternalLink, Globe, Linkedin, Menu, X } from 'lucide-react';
import { aixcoAssets, contact, navItems, socialLinks } from '../content/aixcoEnergy';
import { LANGS, useI18n } from '../i18n/I18nProvider';
import { recordBlueRockClick, recordEmailClick } from '../lib/backend/energy-lead-capture';
import { imageBlurDataUrl } from '../lib/image-loading';
import { scrollToHash, scrollToPageTop } from '../lib/smooth-scroll';

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const [activeNavTarget, setActiveNavTarget] = useState('/');
  const activeSectionFrame = useRef<number | null>(null);
  const languageSwitcherRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { lang, setLang, tx } = useI18n();
  const selectedLang = LANGS.find((item) => item.code === lang) ?? LANGS[0];

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
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!langOpen) return;

    const closeOnOutsideInteraction = (event: Event) => {
      const target = event.target as Node | null;
      if (target && !languageSwitcherRef.current?.contains(target)) {
        setLangOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideInteraction);
    document.addEventListener('touchstart', closeOnOutsideInteraction);
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideInteraction);
      document.removeEventListener('touchstart', closeOnOutsideInteraction);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [langOpen]);

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
    setLangOpen(false);
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
      return false;
    }

    if (to === "/faq") {
      return activePathname === "/faq" || activePathname === "/faqs";
    }

    if (to === "/news") {
      return activePathname === "/news" || activePathname.startsWith("/news/");
    }

    return activePathname === to;
  };

  return (
    <header className="scroll-fixed-surface fixed top-0 left-0 w-full z-40 border-b border-zinc-800/60 bg-industrial-white/90 shadow-soft backdrop-blur-2xl">
      <div className="hidden border-b border-zinc-800/60 lg:block">
        <div className="site-topbar mx-auto flex h-8 max-w-7xl items-center justify-between px-6 text-sm font-medium tracking-wide text-zinc-500">
          <div className="site-topbar__links flex items-center gap-8">
            <Link href="/contact" onClick={(event) => handleInternalLinkClick(event, "/contact")} className="inline-flex min-h-8 items-center transition-colors hover:text-brand-red">{contact.address}</Link>
            <Link href="/contact" onClick={(event) => handleInternalLinkClick(event, "/contact")} className="inline-flex min-h-8 items-center transition-colors hover:text-brand-red">{tx(contact.support)}</Link>
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
            <a href={socialLinks.aixcoGlobal} target="_blank" rel="noopener noreferrer" aria-label={tx("AIXCO Global")} className="inline-flex h-8 w-8 items-center justify-center transition-colors hover:text-brand-red">
              <Globe size={14} />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex h-8 w-8 items-center justify-center transition-colors hover:text-brand-red">
              <Linkedin size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="site-header__main mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/" onClick={(event) => handleInternalLinkClick(event, "/")} aria-label={tx("AIXCO Energy home")} className="inline-flex min-h-11 items-center gap-2.5 text-industrial-black">
            <Image
              src={aixcoAssets.markBlack}
              alt=""
              aria-hidden
              width={779}
              height={705}
              blurDataURL={imageBlurDataUrl}
              decoding="async"
              placeholder="blur"
              sizes="36px"
              className="h-8 w-8 object-contain md:h-9 md:w-9"
            />
            <span className="whitespace-nowrap text-sm font-medium tracking-normal md:text-[15px]">
              AIXCO.ENERGY
            </span>
          </Link>
          <nav className="site-nav hidden gap-1 text-sm font-medium tracking-normal text-zinc-600 lg:flex xl:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                onClick={(event) => handleInternalLinkClick(event, item.to)}
                aria-current={isActive(item.to) ? "page" : undefined}
                className={`site-nav__link inline-flex min-h-10 items-center rounded-full px-3 transition-colors hover:bg-brand-red/10 hover:text-brand-red ${isActive(item.to) ? "bg-brand-red/10 text-brand-red" : ""}`}
              >
                {tx(item.label)}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-3 xl:translate-x-8 2xl:translate-x-24">
          <div ref={languageSwitcherRef} className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={tx("Change language")}
              onClick={() => setLangOpen((value) => !value)}
              className="inline-flex h-11 min-w-11 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-zinc-800 bg-industrial-white px-3 text-xs font-black tracking-normal text-zinc-600 shadow-soft transition-colors hover:border-brand-red hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red sm:min-w-[4.25rem]"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{selectedLang.native}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            {langOpen && (
              <ul
                role="listbox"
                aria-label={tx("Select language")}
                className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg border border-zinc-800 bg-industrial-white p-1 text-sm font-bold text-zinc-600 shadow-elegant"
              >
                {LANGS.map((item) => (
                  <li key={item.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={item.code === lang}
                      onClick={() => {
                        setLang(item.code);
                        setLangOpen(false);
                      }}
                      className={`flex min-h-10 w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left transition-colors hover:bg-brand-red/10 hover:text-brand-red ${
                        item.code === lang ? "bg-brand-red/10 text-brand-red" : ""
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs font-black tracking-normal opacity-70">{item.native}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <a
            href="https://bluerock.cc"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              void recordBlueRockClick('header_desktop_bluerock');
            }}
            className="btn-gold hidden min-h-11 px-4 py-2 text-sm font-bold !text-white xl:inline-flex"
          >
            {tx("Buy on BlueRock")} <ExternalLink size={13} />
          </a>
          <button
            type="button"
            onClick={() => {
              setOpen((value) => !value);
              setLangOpen(false);
            }}
            className="icon-button-glass h-11 w-11 lg:hidden text-zinc-600 hover:text-brand-red"
            aria-label={tx("Toggle navigation")}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" className="lg:hidden border-t border-zinc-800 bg-industrial-white/95 px-6 py-5 shadow-soft backdrop-blur-2xl">
          <div className="flex flex-col gap-3 text-sm font-medium text-zinc-600">
            <div className="mb-2 rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-xs font-bold leading-relaxed text-zinc-500">
              <Link href="/contact" onClick={(event) => handleInternalLinkClick(event, "/contact")} className="block min-h-8 transition-colors hover:text-brand-red">
                {contact.address}
              </Link>
              <Link href="/contact" onClick={(event) => handleInternalLinkClick(event, "/contact")} className="block min-h-8 transition-colors hover:text-brand-red">
                {tx(contact.support)}
              </Link>
              <a
                href={`mailto:${contact.email}`}
                onClick={() => {
                  setOpen(false);
                  void recordEmailClick('mobile_menu_email', contact.email);
                }}
                className="block min-h-8 transition-colors hover:text-brand-red"
              >
                {contact.email}
              </a>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.to}
                onClick={(event) => handleInternalLinkClick(event, item.to)}
                aria-current={isActive(item.to) ? "page" : undefined}
                className={`inline-flex min-h-11 min-w-11 items-center rounded-lg px-3 transition-colors hover:bg-brand-red/10 hover:text-brand-red ${isActive(item.to) ? "bg-brand-red/10 text-brand-red" : ""}`}
              >
                {tx(item.label)}
              </Link>
            ))}
            <div className="mt-2 border-t border-zinc-800 pt-4">
              <div className="mb-3 text-xs font-black tracking-[0.14em] text-brand-red">{tx("Select language")}</div>
              <div className="grid grid-cols-3 gap-2">
                {LANGS.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    aria-pressed={item.code === lang}
                    onClick={() => {
                      setLang(item.code);
                      setOpen(false);
                    }}
                    className={`inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg border px-3 text-xs font-black tracking-normal transition-colors ${
                      item.code === lang
                        ? "border-brand-red bg-brand-red text-industrial-white"
                        : "border-zinc-800 bg-industrial-white text-zinc-600 hover:border-brand-red hover:text-brand-red"
                    }`}
                  >
                    {item.native}
                  </button>
                ))}
              </div>
            </div>
            <a
              href="https://bluerock.cc"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setOpen(false);
                void recordBlueRockClick('header_mobile_bluerock');
              }}
              className="btn-gold mt-2 justify-center"
            >
              {tx("Buy on BlueRock")}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
