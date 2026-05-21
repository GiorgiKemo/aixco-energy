'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { platformMetrics, strategyCopy, whyCopy } from '../content/aixcoEnergy';
import { useI18n } from '../i18n/I18nProvider';

const PlatformPage: React.FC = () => {
  const { tx } = useI18n();

  return (
    <main className="pt-24 lg:pt-32 min-h-screen bg-industrial-white text-industrial-black">
      <section className="px-6 pb-24 pt-16 md:py-28 max-w-7xl mx-auto">
        <div className="mb-24">
          <div className="mb-6 text-sm font-black tracking-[0.18em] text-brand-red md:text-base">{tx(whyCopy.label)}</div>
          <h1 className="mb-12 break-words text-[clamp(3rem,9vw,8rem)]">
            AIXCO <br /> <span className="text-brand-red">Energy</span>
          </h1>
          <p className="max-w-4xl text-xl font-black text-zinc-500 leading-tight">
            {tx(whyCopy.body)}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 mb-24">
          {platformMetrics.map((metric) => (
            <div key={metric.label} className="bg-zinc-950 p-8">
              <div className="text-6xl font-black text-brand-red mb-6">{metric.value}</div>
              <p className="text-sm font-black leading-relaxed text-zinc-500">{tx(metric.label)}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="min-w-0 lg:col-span-5">
            <div className="mb-6 text-sm font-black tracking-[0.18em] text-brand-red md:text-base">{tx(strategyCopy.label)}</div>
            <h2 className="mb-8 break-words text-[clamp(2.5rem,5vw,5rem)]">{tx(strategyCopy.title)}</h2>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <p className="text-zinc-500 text-sm font-black leading-relaxed mb-10">{tx(strategyCopy.body)}</p>
            <ul className="space-y-5">
              {strategyCopy.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-4 text-sm font-black leading-relaxed text-zinc-500">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  {tx(bullet)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PlatformPage;
