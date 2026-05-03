import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { aixcoAssets, ctaCopy } from '../content/aixcoEnergy';

export const NewsBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-zinc-950 border-y border-zinc-800 px-6 py-28">
      <img
        src={aixcoAssets.windGridProject}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-[0.18] grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-industrial-black via-industrial-black/90 to-industrial-black/40" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8">
          <div className="text-brand-red text-[10px] font-black uppercase tracking-widest mb-5">{ctaCopy.label}</div>
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] mb-8 max-w-5xl">
            {ctaCopy.title}
          </h2>
          <p className="text-zinc-400 uppercase text-sm font-black leading-relaxed max-w-3xl">
            {ctaCopy.body}
          </p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <Link to="/news" className="brutal-btn group inline-flex items-center gap-4 italic">
            Read News <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
