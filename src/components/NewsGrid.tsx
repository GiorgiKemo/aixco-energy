import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { focusAreas } from '../content/aixcoEnergy';

export const NewsGrid: React.FC = () => {
  return (
    <section id="projects" className="py-32 px-6 bg-industrial-black text-industrial-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="text-brand-red text-[10px] font-black uppercase tracking-widest mb-5">Featured focus areas</div>
            <h2 className="text-[clamp(3rem,8vw,6rem)]">
              Examples of project types we may pursue
            </h2>
          </div>
          <a
            href="https://bluerock.cc"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-black uppercase tracking-[0.3em] text-[10px] group text-zinc-500 hover:text-industrial-white transition-colors"
          >
            Buy on BlueRock <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
          {focusAreas.map((area, index) => (
            <motion.article
              key={area.title}
              whileHover={{ scale: 0.98 }}
              className={`flex min-h-[260px] flex-col overflow-hidden p-8 transition-colors ${
                index > 2
                  ? "bg-zinc-950 hover:bg-zinc-900"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              <div className="mb-8 text-[10px] font-black uppercase tracking-widest text-brand-red">
                0{index + 1}
              </div>
              <h3 className="text-3xl font-black mb-8 leading-tight italic group-hover:text-brand-red transition-colors">
                {area.title}
              </h3>
              <p className="text-xs text-zinc-500 font-black uppercase leading-relaxed">
                {area.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
