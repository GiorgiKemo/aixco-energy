'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { BatteryCharging, Droplets, ExternalLink, Network, Sun, Wind } from 'lucide-react';
import { aixcoAssets, heroCopy, heroVerticals, platformMetrics } from '../content/aixcoEnergy';
import { useI18n } from '../i18n/I18nProvider';
import { recordBlueRockClick } from '../lib/backend/energy-lead-capture';

const verticalIcons = [Sun, Wind, BatteryCharging, Droplets, Network];

export const Hero: React.FC = () => {
  const { tx } = useI18n();

  return (
    <section data-nav-section="/" className="energy-hero relative flex min-h-[100svh] flex-col overflow-hidden border-b border-zinc-800 pt-16 lg:h-[100svh] lg:min-h-0 lg:pt-[98px]">
      <div className="energy-hero__body flex min-h-0 flex-1 flex-col divide-x divide-zinc-800 lg:flex-row">
        <div className="relative flex min-h-0 flex-col lg:w-2/3">
          <div className="group relative min-h-[clamp(34rem,72svh,42rem)] flex-1 overflow-hidden bg-zinc-900 md:min-h-[40rem] lg:min-h-0">
            <motion.video
               initial={{ scale: 1.1, opacity: 0 }}
               animate={{ scale: 1, opacity: 0.48 }}
               transition={{ duration: 1.5 }}
               className="absolute inset-0 h-full w-full object-cover"
               src={aixcoAssets.heroVideo}
               autoPlay
               muted
               loop
               playsInline
               poster={aixcoAssets.solarProject}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-industrial-black/90 via-industrial-black/48 to-industrial-black/24"></div>
            
            <div className="absolute bottom-8 left-6 right-6 text-industrial-white md:left-10 md:right-10 lg:bottom-6 xl:bottom-8">
              <div className="mb-4 flex gap-2 lg:mb-3 xl:mb-4">
                <span className="status-tag">{tx("AIXCO Energy")}</span>
                <span className="bg-industrial-white px-2.5 py-1 text-sm font-black text-industrial-black">{tx("Renewable Infrastructure")}</span>
              </div>
              <h1 className="hero-reference-font mb-4 text-[clamp(2.8rem,6.8vw,5.55rem)] font-semibold leading-[0.86] tracking-normal drop-shadow-[0_18px_42px_rgba(0,0,0,0.38)]">
                {tx(heroCopy.title)}
              </h1>
              <h2 className="hero-reference-font mb-5 max-w-3xl text-[clamp(1.25rem,3.2vw,3.2rem)] font-light leading-[1.05] tracking-normal text-brand-red">
                {tx(heroCopy.subtitle)}
              </h2>
              <p className="hero-reference-font max-w-3xl text-[clamp(0.98rem,1.12vw,1.1rem)] font-normal leading-[1.45] text-zinc-200/90">
                {tx(heroCopy.body)}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/projects" className="brutal-btn">
                  {tx("Explore Projects")}
                </Link>
                <a
                  href="https://bluerock.cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    void recordBlueRockClick('hero_bluerock');
                  }}
                  className="btn-ghost-gold"
                >
                  {tx("Buy on BlueRock")} <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="energy-hero__metrics grid grid-cols-2 divide-x divide-zinc-800 border-t border-zinc-800 bg-industrial-white text-industrial-black md:grid-cols-4 lg:h-32 xl:h-36">
            {platformMetrics.map((stat) => (
              <div key={stat.label} className="energy-hero__metric flex min-h-40 flex-col justify-between p-6 lg:min-h-0 lg:p-4 xl:p-5">
                <span className="text-sm font-black leading-snug tracking-normal text-zinc-500">{tx(stat.label)}</span>
                <span className="text-3xl font-black xl:text-4xl">{stat.value}</span>
                <span className="text-sm font-black tracking-normal text-brand-red">{tx("AIXCO Energy")}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex min-h-0 flex-col bg-zinc-950 text-industrial-black lg:w-1/3">
          <div className="border-b border-zinc-800 bg-zinc-900/70 p-5 lg:flex lg:min-h-14 lg:items-center lg:p-4 xl:min-h-16 xl:p-5">
            <h2 className="flex items-center gap-2 text-sm font-black tracking-normal">
              <span className="h-2 w-2 bg-brand-red animate-pulse" aria-hidden="true" />
              {tx("Core Technology Verticals")}
            </h2>
          </div>
          <div className="energy-hero__verticals flex min-h-0 flex-1 flex-col divide-y divide-zinc-800 overflow-hidden">
            {heroVerticals.map((item, index) => {
              const Icon = verticalIcons[index] ?? Network;
              return (
                <div key={item.title} className="energy-hero__vertical flex min-h-0 flex-1 items-center gap-4 p-4 xl:p-5">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-red/40 bg-brand-red/10 text-brand-red xl:h-12 xl:w-12">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-black leading-tight xl:text-lg">{tx(item.title)}</h3>
                    <p className="mt-1 text-sm font-medium leading-snug text-zinc-500">{tx(item.body)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/faq" className="-mb-px flex h-16 shrink-0 cursor-pointer items-center justify-center bg-brand-red px-6 text-center text-lg font-black leading-none tracking-normal text-industrial-white transition-all hover:bg-industrial-black xl:h-20 xl:text-xl">
            {tx("Investor FAQs")}
          </Link>
        </div>
      </div>
    </section>
  );
};
