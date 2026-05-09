import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { focusAreas } from '../content/aixcoEnergy';
import { TrackedBlueRockLink } from './TrackedBlueRockLink';

export const NewsGrid: React.FC = () => {
  return (
    <section id="projects" data-nav-section="/projects" className="scroll-mt-[65px] bg-industrial-white px-6 py-32 text-industrial-black border-t border-zinc-800 lg:scroll-mt-[98px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">Featured focus areas</div>
            <h2 className="text-[clamp(3rem,8vw,6rem)]">
              Examples of project types we may pursue
            </h2>
          </div>
          <TrackedBlueRockLink
            label="focus_areas_bluerock"
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-black uppercase tracking-normal text-zinc-500 transition-colors hover:text-brand-red"
          >
            Buy on BlueRock <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </TrackedBlueRockLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
          {focusAreas.map((area, index) => (
            <article
              key={area.title}
              className="h-full min-h-[20rem]"
            >
              <Link
                href="/projects"
                aria-label={`Explore ${area.title} project types`}
                className={`group flex h-full min-h-[20rem] flex-col overflow-hidden p-8 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red sm:p-9 lg:p-10 ${
                  index > 2
                    ? "bg-zinc-950 hover:bg-zinc-900"
                    : "bg-industrial-white hover:bg-zinc-900"
                }`}
              >
                <div className="mb-8 text-sm font-black uppercase tracking-normal text-brand-red">
                  0{index + 1}
                </div>
                <h3 className="text-3xl font-black mb-8 leading-tight italic transition-colors group-hover:text-brand-red">
                  {area.title}
                </h3>
                <p className="text-sm font-black uppercase leading-relaxed text-zinc-500">
                  {area.body}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-black uppercase text-brand-red">
                  Explore projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
