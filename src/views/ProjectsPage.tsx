'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { PageIntro } from '../components/PageIntro';
import { aixcoAssets } from '../content/aixcoEnergy';
import { projectsPageCopy } from '../content/sitePages';
import { useI18n } from '../i18n/I18nProvider';
import { ResilientImage } from '../components/ResilientImage';

const projectImages = [aixcoAssets.solarProject, aixcoAssets.windGridProject, aixcoAssets.solarProject, aixcoAssets.windGridProject, aixcoAssets.solarProject, aixcoAssets.windGridProject];

const ProjectsPage: React.FC = () => {
  const { tx } = useI18n();

  return (
    <main className="min-h-screen bg-industrial-white pt-24 text-industrial-black lg:pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-12 md:pt-16">
        <PageIntro eyebrow={tx(projectsPageCopy.eyebrow)} title={tx(projectsPageCopy.title)} />

        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-brand-red">{tx(projectsPageCopy.sectionLabel)}</p>
          <h2 className="mx-auto mb-6 max-w-4xl text-[clamp(2rem,4vw,3.6rem)] leading-tight">{tx(projectsPageCopy.sectionTitle)}</h2>
          <p className="mx-auto max-w-3xl text-sm font-bold leading-7 text-zinc-500">{tx(projectsPageCopy.sectionLead)}</p>
        </div>

        <div className="mb-24 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsPageCopy.themes.map((theme, index) => (
            <article
              key={theme.title}
              id={theme.anchor}
              className="group relative min-h-[22rem] scroll-mt-[65px] overflow-hidden rounded-lg border border-zinc-800 bg-industrial-black text-industrial-white lg:scroll-mt-[98px]"
            >
              <ResilientImage
                src={projectImages[index] ?? aixcoAssets.solarProject}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-55 transition-opacity duration-300 group-hover:opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-black via-industrial-black/70 to-industrial-black/20" />
              <div className="relative flex h-full flex-col justify-end p-8">
                <span className="mb-3 inline-flex w-fit rounded-full border border-brand-red/40 bg-brand-red/15 px-3 py-1 text-xs font-black uppercase tracking-normal text-brand-gold">
                  {tx(theme.tag)}
                </span>
                <h3 className="mb-3 text-2xl font-black italic">{tx(theme.title)}</h3>
                <p className="text-sm font-bold leading-relaxed text-zinc-200">{tx(theme.body)}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mb-24 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-8 lg:col-span-7">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-brand-red">{tx(projectsPageCopy.whyLabel)}</p>
            <h3 className="mb-6 text-[clamp(1.6rem,3vw,2.3rem)] leading-tight">{tx(projectsPageCopy.whyTitle)}</h3>
            {projectsPageCopy.whyParagraphs.map((paragraph) => (
              <p key={paragraph} className="mb-5 text-sm font-bold leading-7 text-zinc-500">
                {tx(paragraph)}
              </p>
            ))}
          </div>
          <div className="rounded-lg border border-zinc-800 bg-industrial-white p-8 lg:col-span-5">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-brand-red">{tx(projectsPageCopy.characteristicsLabel)}</p>
            <ul className="space-y-4">
              {projectsPageCopy.characteristics.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-bold leading-relaxed text-zinc-500">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  {tx(item)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-3">
          {projectsPageCopy.highlights.map((item) => (
            <div key={item.title} className="bg-zinc-950 p-8 text-center">
              <h4 className="mb-3 text-lg font-black uppercase tracking-normal">{tx(item.title)}</h4>
              <p className="text-sm font-bold leading-relaxed text-zinc-500">{tx(item.body)}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/contact" className="btn-gold inline-flex min-h-11 items-center gap-2">
            {tx("Speak With Us")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
