'use client';

import React from 'react';
import Image from 'next/image';
import { aixcoAssets, marqueeItems } from '../content/aixcoEnergy';
import { useI18n } from '../i18n/I18nProvider';
import { imageBlurDataUrl } from '../lib/image-loading';

export const NewsTicker: React.FC = () => {
  const { tx } = useI18n();
  const tickerGroups = [0, 1];

  return (
    <section
      id="energy-ticker"
      data-nav-section="/news"
      aria-label={tx("AIXCO Energy focus areas")}
      className="energy-ticker bg-brand-red text-industrial-black overflow-hidden whitespace-nowrap border-y border-industrial-black shrink-0 font-black uppercase shadow-[0_0_24px_rgba(173,125,46,0.24)] z-20"
    >
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
    </section>
  );
};
