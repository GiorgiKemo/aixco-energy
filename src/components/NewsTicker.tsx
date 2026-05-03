import React from 'react';
import { aixcoAssets, marqueeItems } from '../content/aixcoEnergy';

export const NewsTicker: React.FC = () => {
  const tickerItems = [...marqueeItems, ...marqueeItems];

  return (
    <div className="bg-brand-red text-industrial-black h-20 flex items-center overflow-hidden whitespace-nowrap border-y border-industrial-black shrink-0 font-mono text-[10px] font-black uppercase shadow-[0_0_24px_rgba(173,125,46,0.24)] z-20">
      <div className="inline-block animate-marquee whitespace-nowrap">
        {tickerItems.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-8 px-10 text-4xl font-black italic tracking-normal">
            {item}
            <img src={aixcoAssets.markBlack} alt="" aria-hidden className="h-10 w-10 object-contain" />
          </span>
        ))}
      </div>
      <div className="inline-block animate-marquee whitespace-nowrap" aria-hidden="true">
        {tickerItems.map((item, index) => (
          <span key={`dup-${item}-${index}`} className="inline-flex items-center gap-8 px-10 text-4xl font-black italic tracking-normal">
            {item}
            <img src={aixcoAssets.markBlack} alt="" aria-hidden className="h-10 w-10 object-contain" />
          </span>
        ))}
      </div>
    </div>
  );
};
