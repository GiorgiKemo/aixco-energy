import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, MoveRight } from 'lucide-react';
import { aixcoAssets, strategyCopy, whyCopy } from '../content/aixcoEnergy';

export const StrategySection: React.FC = () => {
  return (
    <section id="about" className="bg-industrial-black border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="text-brand-red text-[10px] font-black uppercase tracking-widest mb-4">{whyCopy.label}</div>
            <div className="h-1 w-20 bg-brand-red" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-9"
          >
            <h2 className="text-[clamp(1.55rem,2.4vw,2.55rem)] leading-[1.14] max-w-5xl">
              {whyCopy.body}
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="lg:col-span-6 relative min-h-[520px]"
          >
            <div className="absolute left-0 top-6 aspect-[4/3] w-[72%] overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
              <img src={aixcoAssets.solarProject} alt="Solar project" className="h-full w-full object-cover grayscale opacity-80" />
            </div>
            <div className="absolute right-0 bottom-4 aspect-[4/3] w-[68%] overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
              <img src={aixcoAssets.windGridProject} alt="Wind and grid project" className="h-full w-full object-cover grayscale opacity-80" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="lg:col-span-6"
          >
            <div className="text-brand-red text-[10px] font-black uppercase tracking-widest mb-5">{strategyCopy.label}</div>
            <h2 className="text-[clamp(2.1rem,4vw,3.8rem)] leading-[1] mb-8">
              {strategyCopy.title}
            </h2>
            <p className="text-zinc-400 mb-10 uppercase text-sm font-bold leading-relaxed">
              {strategyCopy.body}
            </p>
            <ul className="space-y-4 mb-10">
              {strategyCopy.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-xs font-black uppercase leading-relaxed text-zinc-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  {bullet}
                </li>
              ))}
            </ul>
            <Link to="/platform" className="brutal-btn inline-flex items-center gap-3 italic">
              Learn More About AIXCO Energy <MoveRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
