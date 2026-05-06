import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Globe, Linkedin, Menu, Twitter, X } from 'lucide-react';
import { aixcoAssets, contact, navItems } from '../content/aixcoEnergy';

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-industrial-black/90 border-b border-zinc-800 backdrop-blur-md">
      <div className="hidden lg:block border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between text-[10px] font-black uppercase text-zinc-400">
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
          <Link to="/" aria-label="AIXCO Energy home" className="flex items-center group">
            <img src={aixcoAssets.logoSquare} alt="" aria-hidden className="h-10 w-10 object-contain sm:hidden" />
            <img src={aixcoAssets.logoWide} alt="" aria-hidden className="hidden h-10 w-auto object-contain sm:block" />
          </Link>
          <nav className="hidden xl:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} className="hover:text-brand-red transition-colors">
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
            className="btn-gold hidden min-h-9 px-4 py-2 text-[0.82rem] sm:inline-flex"
          >
            Buy on BlueRock <ExternalLink size={13} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="xl:hidden text-zinc-400 hover:text-brand-red transition-colors"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="xl:hidden border-t border-zinc-800 bg-industrial-black px-6 py-5">
          <div className="flex flex-col gap-4 text-xs font-black uppercase tracking-widest text-zinc-300">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className="hover:text-brand-red transition-colors">
                {item.label}
              </Link>
            ))}
            <a href="https://bluerock.cc" target="_blank" rel="noreferrer" className="text-brand-red">
              Buy on BlueRock
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
