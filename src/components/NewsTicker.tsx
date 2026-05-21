'use client';

import React from 'react';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import { aixcoAssets, marqueeItems } from '../content/aixcoEnergy';
import { useI18n } from '../i18n/I18nProvider';
import { imageBlurDataUrl } from '../lib/image-loading';

export const NewsTicker: React.FC = () => {
  const { tx } = useI18n();
  const [isPaused, setIsPaused] = React.useState(false);
  const tickerGroups = [0, 1];

  return (
    <section
      id="energy-ticker"
      data-nav-section="/news"
      data-paused={isPaused}
      aria-label={tx("AIXCO Energy focus areas")}
      className="energy-ticker relative z-20 shrink-0 overflow-hidden whitespace-nowrap border-y border-industrial-black bg-brand-red font-black uppercase text-industrial-black shadow-[0_0_24px_rgba(173,125,46,0.24)]"
    >
      <ul className="sr-only">
        {marqueeItems.map((item) => (
          <li key={item}>{tx(item)}</li>
        ))}
      </ul>
      <div className="energy-ticker__track" aria-hidden="true">
        {tickerGroups.map((group) => (
          <div key={group} className="energy-ticker__group">
            {marqueeItems.map((item) => (
              <span key={`${group}-${item}`} className="energy-ticker__item">
                {tx(item)}
                <Image
                  src={aixcoAssets.markBlack}
                  alt=""
                  aria-hidden
                  width={779}
                  height={705}
                  blurDataURL={imageBlurDataUrl}
                  decoding="async"
                  placeholder="blur"
                  sizes="40px"
                  className="energy-ticker__mark object-contain"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setIsPaused((value) => !value)}
        className="absolute right-2 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-industrial-black/20 bg-industrial-white/90 text-industrial-black shadow-soft backdrop-blur transition-colors hover:bg-industrial-black hover:text-industrial-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-industrial-black"
        aria-label={isPaused ? tx('Play energy ticker') : tx('Pause energy ticker')}
        aria-pressed={isPaused}
      >
        {isPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
      </button>
    </section>
  );
};
