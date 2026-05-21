'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../content/sitePages';
import { useI18n } from '../i18n/I18nProvider';

type FaqAccordionProps = {
  items: FaqItem[];
  idPrefix: string;
};

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, idPrefix }) => {
  const { tx } = useI18n();
  const [openId, setOpenId] = React.useState<string | null>(`${idPrefix}-0`);

  return (
    <div className="divide-y divide-zinc-800 border border-zinc-800 bg-zinc-950">
      {items.map((item, index) => {
        const panelId = `${idPrefix}-${index}`;
        const isOpen = openId === panelId;

        return (
          <div key={panelId}>
            <button
              type="button"
              id={`${panelId}-trigger`}
              aria-expanded={isOpen}
              aria-controls={`${panelId}-content`}
              onClick={() => setOpenId(isOpen ? null : panelId)}
              className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-black leading-snug tracking-normal text-industrial-black transition-colors hover:bg-brand-red/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-red sm:px-6"
            >
              <span>{tx(item.question)}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-brand-red transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            <div
              id={`${panelId}-content`}
              role="region"
              aria-labelledby={`${panelId}-trigger`}
              hidden={!isOpen}
              className="border-t border-zinc-800 bg-industrial-white px-5 py-4 sm:px-6"
            >
              <p className="text-sm font-bold leading-7 text-zinc-500">{tx(item.answer)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
