'use client';

import React from 'react';
import { BatteryCharging, Droplets, Sun, Wind } from 'lucide-react';
import { futureGrowth, investmentThemes } from '../content/aixcoEnergy';
import { useI18n } from '../i18n/I18nProvider';

const themeIcons = [Sun, Wind, BatteryCharging, Droplets];

export const TechSection: React.FC = () => {
  const { tx } = useI18n();

  return (
    <section data-nav-section="/projects" className="bg-zinc-950 text-industrial-black border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{tx("Investment Themes")}</div>
          <h2 className="text-[clamp(2.2rem,4.8vw,4.6rem)] mb-8">
            {tx("Technologies AIXCO Energy is actively interested in for long-term growth")}
          </h2>
          <p className="text-sm font-black uppercase leading-relaxed text-zinc-500">
            {tx("We focus on sectors where demand growth, technological improvement and infrastructure necessity can work together.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 mb-28">
          {investmentThemes.map((theme, index) => {
            const Icon = themeIcons[index];
            return (
              <article key={theme.title} className="bg-industrial-white p-8 min-h-[320px] flex flex-col">
                <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-industrial-white">
                  <Icon size={24} />
                </div>
                <h3 className="text-3xl mb-5">{tx(theme.title)}</h3>
                <p className="text-sm font-black uppercase leading-relaxed text-zinc-500">{tx(theme.body)}</p>
              </article>
            );
          })}
        </div>

        <div className="border border-zinc-800 bg-industrial-white p-8 md:p-12">
          <div className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{tx(futureGrowth.label)}</div>
          <h2 className="mb-8 text-[clamp(2.3rem,5vw,4.8rem)]">{tx(futureGrowth.title)}</h2>
          <p className="mb-8 text-sm font-black uppercase leading-relaxed text-zinc-500">{tx(futureGrowth.body)}</p>
          <div className="mb-8 flex flex-wrap gap-3">
            {futureGrowth.tags.map((tag) => (
              <span key={tag} className="border border-brand-red/40 bg-brand-red/10 px-3 py-2 text-sm font-black uppercase text-brand-red">
                {tx(tag)}
              </span>
            ))}
          </div>
          <p className="text-sm font-black uppercase leading-relaxed text-zinc-500">{tx(futureGrowth.close)}</p>
        </div>
      </div>
    </section>
  );
};
