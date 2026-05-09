'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Transition } from 'motion/react';
import { Check, MoveRight } from 'lucide-react';
import { aixcoAssets, strategyCopy, whyCopy } from '../content/aixcoEnergy';

const premiumEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}

export const StrategySection: React.FC = () => {
  const shouldReduceMotion = usePrefersReducedMotion();
  const revealOffset = shouldReduceMotion ? 8 : 24;
  const horizontalOffset = shouldReduceMotion ? 0 : 24;
  const revealTransition = (delay = 0): Transition => ({
    duration: shouldReduceMotion ? 0.24 : 0.82,
    ease: shouldReduceMotion ? 'easeOut' : premiumEase,
    delay: shouldReduceMotion ? Math.min(delay, 0.03) : delay,
  });

  return (
    <section id="about" className="scroll-mt-[65px] bg-industrial-white text-industrial-black border-b border-zinc-800 lg:scroll-mt-[98px]">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-28">
          <motion.div
            initial={{ opacity: 0, y: revealOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={revealTransition()}
            className="motion-reveal-surface lg:col-span-3"
          >
            <div className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{whyCopy.label}</div>
            <div className="h-1 w-20 bg-brand-red" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: revealOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={revealTransition(0.1)}
            className="motion-reveal-surface lg:col-span-9"
          >
            <h2 className="text-[clamp(1.55rem,2.4vw,2.55rem)] leading-[1.14] max-w-5xl">
              {whyCopy.body}
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -horizontalOffset }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={revealTransition()}
            className="motion-reveal-surface lg:col-span-6 relative min-h-[520px]"
          >
            <div className="absolute left-0 top-6 aspect-[4/3] w-[72%] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-elegant">
              <Image
                src={aixcoAssets.solarProject}
                alt="Solar project"
                fill
                sizes="(max-width: 1024px) 72vw, 36vw"
                className="object-cover opacity-95"
              />
            </div>
            <div className="absolute right-0 bottom-4 aspect-[4/3] w-[68%] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-elegant">
              <Image
                src={aixcoAssets.windGridProject}
                alt="Wind and grid project"
                fill
                sizes="(max-width: 1024px) 68vw, 34vw"
                className="object-cover opacity-95"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: horizontalOffset }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={revealTransition(0.08)}
            className="motion-reveal-surface lg:col-span-6"
          >
            <div className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{strategyCopy.label}</div>
            <h2 className="text-[clamp(2.1rem,4vw,3.8rem)] leading-[1] mb-8">
              {strategyCopy.title}
            </h2>
            <p className="text-zinc-500 mb-10 uppercase text-sm font-bold leading-relaxed">
              {strategyCopy.body}
            </p>
            <ul className="space-y-4 mb-10">
              {strategyCopy.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm font-black uppercase leading-relaxed text-zinc-500">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  {bullet}
                </li>
              ))}
            </ul>
            <Link href="/platform" className="brutal-btn inline-flex items-center gap-3 italic">
              Learn More About AIXCO Energy <MoveRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
