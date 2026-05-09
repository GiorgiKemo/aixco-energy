import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { aixcoAssets, ctaCopy } from '../content/aixcoEnergy';

export const NewsBanner: React.FC = () => {
  return (
    <section data-nav-section="/news" className="relative overflow-hidden bg-zinc-950 text-industrial-black border-y border-zinc-800 px-6 py-28">
      <Image
        src={aixcoAssets.windGridProject}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-industrial-white via-industrial-white/92 to-industrial-white/60" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8">
          <div className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{ctaCopy.label}</div>
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] mb-8 max-w-5xl">
            {ctaCopy.title}
          </h2>
          <p className="text-zinc-500 uppercase text-sm font-black leading-relaxed max-w-3xl">
            {ctaCopy.body}
          </p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <Link href="/news" className="brutal-btn group inline-flex items-center gap-4 italic">
            Read News <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
