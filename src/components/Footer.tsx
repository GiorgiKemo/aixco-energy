'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import {
  aboutEnergy,
  aixcoAssets,
  contact,
  energyFocus,
  footerIntro,
  investmentFocus,
  navItems,
  socialLinks,
} from '../content/aixcoEnergy';
import { recordEmailClick } from '../lib/backend/energy-lead-capture';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" data-nav-section="/#contact" className="relative scroll-mt-[65px] overflow-hidden bg-industrial-white text-industrial-black border-t border-zinc-800 px-6 py-20 lg:scroll-mt-[98px]">
      <Image
        src={aixcoAssets.footerShape}
        alt=""
        aria-hidden
        width={2240}
        height={2240}
        sizes="(max-width: 768px) 50vw, 768px"
        className="pointer-events-none absolute bottom-0 right-0 h-auto w-1/2 max-w-3xl opacity-10"
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="mb-8 inline-flex items-center gap-3">
            <Image
              src={aixcoAssets.markBlack}
              alt=""
              aria-hidden
              width={779}
              height={705}
              sizes="40px"
              className="h-10 w-10 object-contain"
            />
            <span className="text-lg font-medium tracking-normal">AIXCO.ENERGY</span>
          </div>
          <p className="mb-8 max-w-xs text-sm font-black uppercase leading-relaxed text-zinc-500">
            {footerIntro}
          </p>
          <div className="flex gap-2">
            <a href={socialLinks.aixcoGlobal} target="_blank" rel="noreferrer" aria-label="AIXCO Global" className="border border-zinc-800 p-3.5 text-zinc-500 transition-all hover:border-brand-red hover:bg-brand-red hover:text-industrial-white">
              <Globe size={18} />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="border border-zinc-800 p-3.5 text-zinc-500 transition-all hover:border-brand-red hover:bg-brand-red hover:text-industrial-white">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="mb-6 text-sm font-black tracking-[0.14em] text-brand-red underline decoration-2 underline-offset-4">ENERGY FOCUS</h4>
          <ul className="flex flex-col gap-2 text-sm font-bold uppercase tracking-normal text-zinc-400">
            {energyFocus.map((item) => (
              <li key={item}>
                <Link href={item === "Technology News" ? "/news" : "/projects"} className="inline-flex min-h-8 min-w-11 items-center transition-colors hover:text-brand-red">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="mb-6 text-sm font-black tracking-[0.14em] text-brand-red underline decoration-2 underline-offset-4">COMPANY</h4>
          <ul className="flex flex-col gap-2 text-sm font-bold uppercase tracking-normal text-zinc-400">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.to} className="inline-flex min-h-8 min-w-11 items-center transition-colors hover:text-brand-red">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="mb-6 text-sm font-black tracking-[0.14em] text-brand-red underline decoration-2 underline-offset-4">CONTACT US</h4>
          <div className="space-y-5 text-sm font-black uppercase leading-relaxed tracking-normal text-zinc-400">
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
              <a
                href={`mailto:${contact.email}`}
                onClick={() => {
                  void recordEmailClick('footer_email', contact.email);
                }}
                className="inline-flex min-h-8 items-center transition-colors hover:text-brand-red"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto mt-16 border-t border-zinc-900 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h4 className="mb-5 text-sm font-black tracking-[0.14em] text-brand-red underline decoration-2 underline-offset-4">INVESTMENT FOCUS</h4>
            <ul className="grid grid-cols-1 gap-3 text-sm font-black uppercase tracking-normal text-zinc-500 sm:grid-cols-2">
              {investmentFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-sm font-black tracking-[0.14em] text-brand-red underline decoration-2 underline-offset-4">ABOUT AIXCO ENERGY</h4>
            <p className="text-sm font-black uppercase leading-relaxed text-zinc-500">{aboutEnergy}</p>
          </div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto mt-16 pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm font-black uppercase tracking-normal text-zinc-600">
          © 2026 AIXCO Energy.
        </div>
        <div className="flex flex-wrap justify-center gap-6 border border-zinc-900 bg-zinc-950/50 px-4 py-2 text-sm font-black uppercase tracking-normal text-zinc-500">
          <span>Terms &amp; Conditions</span>
          <span>Privacy Policy</span>
          <span>{contact.hours}</span>
        </div>
      </div>
    </footer>
  );
};
