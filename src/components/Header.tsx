import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Globe, Linkedin, Menu, Twitter, X } from 'lucide-react';
import { aixcoAssets, contact, navItems } from '../content/aixcoEnergy';

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-40 border-b border-zinc-800/60 bg-industrial-white/80 shadow-soft backdrop-blur-2xl">
      <div className="hidden lg:block border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between text-[clamp(11px,0.72vw,13px)] font-medium tracking-wide text-zinc-500">
          <div className="flex items-center gap-8">
            <a href="#contact" className="hover:text-brand-red transition-colors">{contact.address}</a>
            <a href="#contact" className="hover:text-brand-red transition-colors">{contact.support}</a>
            <a href={`mailto:${contact.email}`} className="hover:text-brand-red transition-colors">{contact.email}</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://aixco.global" target="_blank" rel="noreferrer" aria-label="AIXCO Global" className="hover:text-brand-red transition-colors">
              <Globe size={14} />
            </a>
            <a href="#contact" aria-label="LinkedIn" className="hover:text-brand-red transition-colors">
              <Linkedin size={14} />
            </a>
            <a href="#contact" aria-label="X" className="hover:text-brand-red transition-colors">
              <Twitter size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" aria-label="AIXCO Energy home" className="inline-flex min-h-11 items-center gap-2.5 text-industrial-black">
            <img src={aixcoAssets.markBlack} alt="" aria-hidden className="h-8 w-8 object-contain md:h-9 md:w-9" />
            <span className="whitespace-nowrap text-sm font-medium tracking-[-0.02em] md:text-[15px]">
              AIXCO.ENERGY
            </span>
          </Link>
          <nav className="hidden xl:flex gap-2 text-[clamp(12px,0.78vw,14.5px)] font-medium tracking-normal text-zinc-600">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} className="rounded-full px-2.5 py-1.5 transition-colors hover:bg-brand-red/10 hover:text-brand-red">
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
            className="btn-gold hidden px-4 py-2 text-sm font-bold !text-white sm:inline-flex"
          >
            Buy on BlueRock <ExternalLink size={13} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="icon-button-glass h-10 w-10 xl:hidden text-zinc-600 hover:text-brand-red"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="xl:hidden border-t border-zinc-800 bg-industrial-white/95 px-6 py-5 shadow-soft backdrop-blur-2xl">
          <div className="flex flex-col gap-3 text-sm font-medium text-zinc-600">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-brand-red/10 hover:text-brand-red transition-colors">
                {item.label}
              </Link>
            ))}
            <a href="https://bluerock.cc" target="_blank" rel="noreferrer" className="btn-gold mt-2 justify-center">
              Buy on BlueRock
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
