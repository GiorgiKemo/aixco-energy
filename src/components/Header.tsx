import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink, Globe, Linkedin, Menu, X } from 'lucide-react';
import { aixcoAssets, contact, navItems, socialLinks } from '../content/aixcoEnergy';

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === "/") {
      return location.pathname === "/" && !location.hash;
    }

    if (to.startsWith("/#")) {
      return location.pathname === "/" && location.hash === to.slice(1);
    }

    return location.pathname === to;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 border-b border-zinc-800/60 bg-industrial-white/80 shadow-soft backdrop-blur-2xl">
      <div className="hidden lg:block border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between text-sm font-medium tracking-wide text-zinc-500">
          <div className="flex items-center gap-8">
            <a href="#contact" className="inline-flex min-h-8 items-center transition-colors hover:text-brand-red">{contact.address}</a>
            <a href="#contact" className="inline-flex min-h-8 items-center transition-colors hover:text-brand-red">{contact.support}</a>
            <a href={`mailto:${contact.email}`} className="inline-flex min-h-8 items-center transition-colors hover:text-brand-red">{contact.email}</a>
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
          <Link to="/" aria-label="AIXCO Energy home" className="inline-flex min-h-11 items-center gap-2.5 text-industrial-black">
            <img src={aixcoAssets.markBlack} alt="" aria-hidden className="h-8 w-8 object-contain md:h-9 md:w-9" />
            <span className="whitespace-nowrap text-sm font-medium tracking-normal md:text-[15px]">
              AIXCO.ENERGY
            </span>
          </Link>
          <nav className="hidden xl:flex gap-2 text-sm font-medium tracking-normal text-zinc-600">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
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
                to={item.to}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.to) ? "page" : undefined}
                className={`inline-flex min-h-11 min-w-11 items-center rounded-lg px-3 transition-colors hover:bg-brand-red/10 hover:text-brand-red ${isActive(item.to) ? "bg-brand-red/10 text-brand-red" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            <a href="https://bluerock.cc" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="btn-gold mt-2 justify-center">
              Buy on BlueRock
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
