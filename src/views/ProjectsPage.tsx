'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { focusAreas, investmentThemes } from '../content/aixcoEnergy';
import { TrackedBlueRockLink } from '../components/TrackedBlueRockLink';
import { useI18n } from '../i18n/I18nProvider';

const ProjectsPage: React.FC = () => {
  const { tx } = useI18n();

  return (
    <main className="pt-24 lg:pt-32 min-h-screen bg-industrial-white text-industrial-black">
      <section className="px-6 pb-24 pt-16 md:py-28 max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="mb-6 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{tx("Featured focus areas")}</div>
          <h1 className="mb-10 break-words text-[clamp(3rem,9vw,8rem)] italic">
            {tx("Examples of project types")} <br /> <span className="text-brand-red">{tx("we may pursue")}</span>
          </h1>
          <p className="max-w-3xl text-sm font-black uppercase text-zinc-500 leading-relaxed">
            {tx("AIXCO Energy evaluates renewable generation, hydrogen, storage and supporting systems together to improve resilience, flexibility and long-term infrastructure value.")}
          </p>
        </div>
        
        <div className="flex flex-col gap-4 mb-24">
          {focusAreas.map((project, index) => (
            <TrackedBlueRockLink
              key={project.title}
              label="projects_page_focus_area"
              metadata={{
                focus_area: project.title,
                position: index + 1,
              }}
              ariaLabel={`${tx("View on BlueRock")}: ${tx(project.title)}`}
              className="group grid min-w-0 grid-cols-1 items-center border border-zinc-800 bg-zinc-950 p-6 text-industrial-black transition-all hover:border-brand-red hover:bg-brand-red/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red sm:p-8 md:grid-cols-12"
            >
              <div className="text-sm font-black text-brand-red md:col-span-1">
                0{index + 1}
              </div>
              <div className="min-w-0 py-4 md:col-span-4">
                <h3 className="break-words text-3xl font-black italic tracking-normal transition-colors group-hover:text-brand-red">{tx(project.title)}</h3>
              </div>
              <div className="min-w-0 py-4 md:col-span-5">
                <p className="text-sm font-black uppercase leading-relaxed text-zinc-500">{tx(project.body)}</p>
              </div>
              <div className="flex items-center justify-end gap-3 md:col-span-2">
                <span className="hidden text-sm font-black uppercase text-brand-red lg:inline">{tx("View on BlueRock")}</span>
                <span className="inline-flex h-12 w-12 items-center justify-center bg-zinc-900 text-industrial-black transition-colors group-hover:bg-brand-red group-hover:text-industrial-white">
                  <ArrowRight aria-hidden />
                </span>
              </div>
            </TrackedBlueRockLink>
          ))}
        </div>
        
        <div className="p-10 md:p-16 border border-zinc-800 bg-zinc-950">
          <div className="mb-8 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{tx("Investment Themes")}</div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {investmentThemes.map((theme) => (
              <div key={theme.title} className="min-w-0 border-l-2 border-brand-red pl-6">
                <h4 className="mb-4 break-words text-2xl font-black italic uppercase tracking-normal">{tx(theme.title)}</h4>
                <p className="text-sm font-black uppercase leading-relaxed text-zinc-500">{tx(theme.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
