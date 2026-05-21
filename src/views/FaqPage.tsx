'use client';

import React from 'react';
import { FaqAccordion } from '../components/FaqAccordion';
import { PageIntro } from '../components/PageIntro';
import { faqItemsColumnA, faqItemsColumnB, faqPageCopy } from '../content/sitePages';
import { useI18n } from '../i18n/I18nProvider';

const FaqPage: React.FC = () => {
  const { tx } = useI18n();

  return (
    <main className="min-h-screen bg-industrial-white pt-24 text-industrial-black lg:pt-32">
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-12 md:pt-16">
        <PageIntro eyebrow={tx(faqPageCopy.eyebrow)} title={tx(faqPageCopy.title)} />

        <div className="mb-12 rounded-lg border border-zinc-800 bg-zinc-950 p-6 text-center shadow-soft md:p-10">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-brand-red">{tx(faqPageCopy.introLabel)}</p>
          <h2 className="mb-4 text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">{tx(faqPageCopy.introTitle)}</h2>
          <p className="mx-auto max-w-3xl text-sm font-bold leading-7 text-zinc-500">{tx(faqPageCopy.introBody)}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FaqAccordion items={faqItemsColumnA} idPrefix="faq-a" />
          <FaqAccordion items={faqItemsColumnB} idPrefix="faq-b" />
        </div>
      </section>
    </main>
  );
};

export default FaqPage;
