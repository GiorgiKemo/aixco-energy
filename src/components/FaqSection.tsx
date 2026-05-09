import React from 'react';
import { Check, Network } from 'lucide-react';
import { investorReasons } from '../content/aixcoEnergy';

export const FaqSection: React.FC = () => {
  return (
    <section
      id="faqs"
      data-nav-section="/#faqs"
      className="scroll-mt-[65px] border-y border-zinc-800 bg-industrial-white px-6 py-24 text-industrial-black lg:scroll-mt-[98px]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <div className="min-w-0 lg:col-span-5">
          <div className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{investorReasons.label}</div>
          <h2 className="break-words text-[clamp(2.3rem,5vw,4.8rem)] leading-none">{investorReasons.title}</h2>
          <div className="mt-10 flex items-center gap-3 text-brand-red">
            <Network size={20} />
            <span className="text-sm font-black uppercase tracking-normal">Investor FAQs</span>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {investorReasons.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 border border-zinc-800 bg-zinc-950 p-5 text-sm font-black uppercase leading-relaxed text-zinc-500">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
