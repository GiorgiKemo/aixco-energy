import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import {
  aboutEnergy,
  aixcoAssets,
  contact,
  energyFocus,
  footerIntro,
  investmentFocus,
  navItems,
} from '../content/aixcoEnergy';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative overflow-hidden bg-industrial-white text-industrial-black border-t border-zinc-800 px-6 py-20">
      <img
        src={aixcoAssets.footerShape}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 w-1/2 max-w-3xl opacity-10"
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="mb-8 inline-flex items-center gap-3">
            <img src={aixcoAssets.markBlack} alt="" aria-hidden className="h-10 w-10 object-contain" />
            <span className="text-lg font-medium tracking-[-0.02em]">AIXCO.ENERGY</span>
          </div>
          <p className="text-zinc-500 mb-8 uppercase text-[10px] font-black leading-relaxed tracking-widest max-w-xs">
            {footerIntro}
          </p>
          <div className="flex gap-2">
            <a href="https://aixco.global" target="_blank" rel="noreferrer" aria-label="AIXCO Global" className="p-3 border border-zinc-800 text-zinc-500 hover:bg-brand-red hover:text-industrial-white hover:border-brand-red transition-all">
              <Globe size={18} />
            </a>
            <a href="#contact" aria-label="LinkedIn" className="p-3 border border-zinc-800 text-zinc-500 hover:bg-brand-red hover:text-industrial-white hover:border-brand-red transition-all">
              <Linkedin size={18} />
            </a>
            <a href="#contact" aria-label="X" className="p-3 border border-zinc-800 text-zinc-500 hover:bg-brand-red hover:text-industrial-white hover:border-brand-red transition-all">
              <Twitter size={18} />
            </a>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="text-brand-red mb-6 text-[10px] font-black tracking-widest underline decoration-2 underline-offset-4">ENERGY FOCUS</h4>
          <ul className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            {energyFocus.map((item) => (
              <li key={item}>
                <Link to={item === "Technology News" ? "/news" : "/projects"} className="hover:text-brand-red transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="text-brand-red mb-6 text-[10px] font-black tracking-widest underline decoration-2 underline-offset-4">COMPANY</h4>
          <ul className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="hover:text-brand-red transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="text-brand-red mb-6 text-[10px] font-black tracking-widest underline decoration-2 underline-offset-4">CONTACT US</h4>
          <div className="space-y-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <div>
              <div className="mb-2 flex items-center gap-2 text-industrial-black"><MapPin size={14} className="text-brand-red" /> Head Office</div>
              <p>{contact.address}</p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 text-industrial-black"><Phone size={14} className="text-brand-red" /> Investor Support</div>
              <p>{contact.supportDetail}</p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 text-industrial-black"><Mail size={14} className="text-brand-red" /> Email</div>
              <a href={`mailto:${contact.email}`} className="hover:text-brand-red transition-colors">{contact.email}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto mt-16 border-t border-zinc-900 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h4 className="text-brand-red mb-5 text-[10px] font-black tracking-widest underline decoration-2 underline-offset-4">INVESTMENT FOCUS</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500">
              {investmentFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-brand-red mb-5 text-[10px] font-black tracking-widest underline decoration-2 underline-offset-4">ABOUT AIXCO ENERGY</h4>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">{aboutEnergy}</p>
          </div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto mt-16 pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-normal">
          © 2026 AIXCO Energy.
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-zinc-500 border border-zinc-900 px-4 py-2 bg-zinc-950/50">
          <span>Terms &amp; Conditions</span>
          <span>Privacy Policy</span>
          <span>{contact.hours}</span>
        </div>
      </div>
    </footer>
  );
};
