import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { platformMetrics, strategyCopy, whyCopy } from '../content/aixcoEnergy';

const PlatformPage: React.FC = () => {
  return (
    <main className="pt-24 lg:pt-32 min-h-screen bg-industrial-black">
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-24"
        >
          <div className="text-brand-red text-[10px] font-black uppercase tracking-widest mb-6">{whyCopy.label}</div>
          <h1 className="text-[clamp(3rem,9vw,8rem)] mb-12">
            AIXCO <br /> <span className="text-brand-red italic">Energy</span>
          </h1>
          <p className="max-w-4xl text-xl font-black uppercase text-zinc-500 leading-tight">
            {whyCopy.body}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 mb-24">
          {platformMetrics.map((metric) => (
            <div key={metric.label} className="bg-zinc-950 p-8 hover:bg-zinc-900 transition-colors">
              <div className="text-6xl font-black italic text-brand-red mb-6">{metric.value}</div>
              <p className="text-xs font-black uppercase tracking-widest leading-relaxed text-zinc-400">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="text-brand-red text-[10px] font-black uppercase tracking-widest mb-6">{strategyCopy.label}</div>
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] mb-8">{strategyCopy.title}</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-zinc-400 text-sm font-black uppercase leading-relaxed mb-10">{strategyCopy.body}</p>
            <ul className="space-y-5">
              {strategyCopy.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-4 text-xs font-black uppercase leading-relaxed text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  {bullet}
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
