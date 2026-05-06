import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { focusAreas, investmentThemes } from '../content/aixcoEnergy';

const ProjectsPage: React.FC = () => {
  return (
    <main className="pt-24 lg:pt-32 min-h-screen bg-industrial-white text-industrial-black">
      <section className="px-6 pb-24 pt-16 md:py-28 max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="text-brand-red text-[10px] font-black uppercase tracking-widest mb-6">Featured focus areas</div>
          <h1 className="mb-10 break-words text-[clamp(3rem,9vw,8rem)] italic">
            Examples of project types <br /> <span className="text-brand-red">we may pursue</span>
          </h1>
          <p className="max-w-3xl text-sm font-black uppercase text-zinc-500 leading-relaxed">
            AIXCO Energy evaluates renewable generation, hydrogen, storage and supporting systems together to improve resilience, flexibility and long-term infrastructure value.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 mb-24">
          {focusAreas.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06 }}
              className="group grid min-w-0 grid-cols-1 items-center border border-zinc-800 bg-zinc-950 p-6 transition-all hover:border-brand-red hover:bg-brand-red/5 sm:p-8 md:grid-cols-12"
            >
              <div className="md:col-span-1 text-[10px] font-black text-zinc-700 group-hover:text-brand-red">
                0{index + 1}
              </div>
              <div className="min-w-0 py-4 md:col-span-4">
                <h3 className="break-words text-3xl font-black italic tracking-normal transition-colors group-hover:text-brand-red">{project.title}</h3>
              </div>
              <div className="min-w-0 py-4 md:col-span-5">
                <p className="text-xs font-black uppercase tracking-widest leading-relaxed text-zinc-500">{project.body}</p>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <a href="https://bluerock.cc" target="_blank" rel="noreferrer" className="p-4 bg-zinc-900 text-industrial-black group-hover:bg-brand-red group-hover:text-industrial-white transition-colors" aria-label={`Open ${project.title}`}>
                  <ArrowRight />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
        
        <div className="p-10 md:p-16 border border-zinc-800 bg-zinc-950">
          <div className="text-brand-red text-[10px] font-black uppercase tracking-widest mb-8">Investment Themes</div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {investmentThemes.map((theme) => (
              <div key={theme.title} className="min-w-0 border-l-2 border-brand-red pl-6">
                <h4 className="mb-4 break-words text-2xl font-black italic uppercase tracking-normal">{theme.title}</h4>
                <p className="text-xs font-black uppercase tracking-widest leading-relaxed text-zinc-500">{theme.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
