import React from 'react';
import Image from 'next/image';
import { aixcoAssets, marqueeItems } from '../content/aixcoEnergy';

export const NewsTicker: React.FC = () => {
  const tickerGroups = [0, 1];

  return (
    <section
      id="energy-ticker"
      aria-label="AIXCO Energy focus areas"
      className="energy-ticker bg-brand-red text-industrial-black overflow-hidden whitespace-nowrap border-y border-industrial-black shrink-0 font-black uppercase shadow-[0_0_24px_rgba(173,125,46,0.24)] z-20"
    >
      <div className="energy-ticker__track" aria-hidden="true">
        {tickerGroups.map((group) => (
          <div key={group} className="energy-ticker__group">
            {marqueeItems.map((item) => (
              <span key={`${group}-${item}`} className="energy-ticker__item">
                {item}
                <Image
                  src={aixcoAssets.markBlack}
                  alt=""
                  aria-hidden
                  width={779}
                  height={705}
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
