'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { PageIntro } from '../components/PageIntro';
import { aixcoAssets } from '../content/aixcoEnergy';
import { aboutPageCopy } from '../content/sitePages';
import { useI18n } from '../i18n/I18nProvider';
import { imageBlurDataUrl } from '../lib/image-loading';

const AboutPage: React.FC = () => {
  const { tx } = useI18n();

  return (
    <main className="min-h-screen bg-industrial-white pt-24 text-industrial-black lg:pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-12 md:pt-16">
        <div className="mb-20 grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
              <Image
                src={aixcoAssets.solarProject}
                alt=""
                aria-hidden
                width={1200}
                height={900}
                blurDataURL={imageBlurDataUrl}
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 max-w-[12rem] rounded-lg border border-zinc-800 bg-industrial-black p-4 text-industrial-white shadow-elegant">
              <p className="text-4xl font-black italic text-brand-gold">{aboutPageCopy.metricValue}</p>
              <p className="mt-2 text-sm font-bold leading-snug text-zinc-200">{tx(aboutPageCopy.metricLabel)}</p>
            </div>
            <div className="absolute -bottom-6 right-0 w-1/2 overflow-hidden rounded-lg border border-zinc-800 shadow-soft">
              <Image
                src={aixcoAssets.windGridProject}
                alt=""
                aria-hidden
                width={1200}
                height={900}
                blurDataURL={imageBlurDataUrl}
                placeholder="blur"
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-8">
            <PageIntro eyebrow={tx(aboutPageCopy.eyebrow)} title={tx(aboutPageCopy.title)} />
            <div className="space-y-6 text-sm font-bold leading-7 text-zinc-500">
              {aboutPageCopy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{tx(paragraph)}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20 text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-brand-red">{tx(aboutPageCopy.focusLabel)}</p>
          <h2 className="mx-auto max-w-4xl text-[clamp(2rem,4vw,3.5rem)] leading-tight">{tx(aboutPageCopy.focusTitle)}</h2>
        </div>

        <div className="mb-24 grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-2 lg:grid-cols-3">
          {aboutPageCopy.focusAreas.map((area) => (
            <article key={area.title} className="bg-zinc-950 p-8">
              <h3 className="mb-4 text-2xl font-black italic">{tx(area.title)}</h3>
              <p className="text-sm font-bold leading-7 text-zinc-500">{tx(area.body)}</p>
            </article>
          ))}
        </div>

        <div className="mb-24 grid grid-cols-1 gap-10 border-y border-zinc-800 py-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-black uppercase tracking-normal">{tx(aboutPageCopy.visionTitle)}</h2>
            <p className="mb-6 text-xl font-bold leading-snug text-industrial-black">{tx(aboutPageCopy.visionLead)}</p>
            <p className="text-sm font-bold leading-7 text-zinc-500">{tx(aboutPageCopy.visionBody)}</p>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-black uppercase tracking-normal">{tx(aboutPageCopy.missionTitle)}</h2>
            <ol className="space-y-5">
              {aboutPageCopy.missionItems.map((item) => (
                <li key={item.label} className="text-sm font-bold leading-7 text-zinc-500">
                  <span className="font-black text-industrial-black">{tx(item.label)}</span> {tx(item.body)}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mb-24 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="mb-6 text-[clamp(1.8rem,3vw,2.8rem)] leading-tight">{tx(aboutPageCopy.whyTitle)}</h2>
            {aboutPageCopy.whyBody.map((paragraph) => (
              <p key={paragraph} className="mb-5 text-sm font-bold leading-7 text-zinc-500">
                {tx(paragraph)}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5">
            {aboutPageCopy.stats.map((stat) => (
              <div key={stat.title} className="border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="mb-2 text-xl font-black italic text-brand-red">{tx(stat.title)}</h3>
                <p className="text-sm font-bold leading-relaxed text-zinc-500">{tx(stat.body)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 rounded-lg border border-zinc-800 bg-zinc-950 p-8 md:grid-cols-12 md:p-10">
          <div className="md:col-span-8">
            <h2 className="mb-4 text-2xl font-black">{tx(aboutPageCopy.ctaTitle)}</h2>
            <p className="text-sm font-bold leading-7 text-zinc-500">{tx(aboutPageCopy.ctaBody)}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <Link href="/projects" className="brutal-btn">
              {tx("View Projects")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/news" className="btn-ghost-gold">
              {tx("Read News")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
