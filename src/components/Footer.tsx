'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, Linkedin, Mail, MapPin, Phone, X } from 'lucide-react';
import {
  aboutEnergy,
  aixcoAssets,
  contact,
  energyFocus,
  footerIntro,
  investmentFocus,
  navItems,
  socialLinks,
} from '../content/aixcoEnergy';
import { useI18n } from '../i18n/I18nProvider';
import { recordEmailClick } from '../lib/backend/energy-lead-capture';

type LegalModalKey = 'terms' | 'privacy';

type LegalSection = {
  heading: string;
  body: string;
  items?: string[];
};

const legalContent: Record<LegalModalKey, { title: string; sections: LegalSection[] }> = {
  terms: {
    title: 'Terms & Conditions',
    sections: [
      {
        heading: '1. Introduction',
        body: 'These Terms & Conditions govern access to and use of the AIXCO Energy website and related information pages.',
      },
      {
        heading: '2. Nature of information',
        body: 'Content on this website is provided for general information only and does not constitute financial, legal, tax or investment advice.',
      },
      {
        heading: '3. Investor responsibility',
        body: 'Any investment decision should be made only after reviewing the relevant official documents and, where appropriate, consulting independent professional advisers.',
      },
      {
        heading: '4. Third-party services',
        body: 'This website may link to external platforms, partner websites or onboarding channels. AIXCO Energy is not responsible for third-party content, policies or availability.',
      },
      {
        heading: '5. Contact',
        body: `For questions regarding these terms, contact ${contact.email}.`,
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: '1. Introduction',
        body: 'AIXCO Energy respects your privacy and handles personal data with care when you interact with this website or contact the team.',
      },
      {
        heading: '2. Information we may process',
        body: 'We may process information submitted through contact actions, email links, partner onboarding flows and technical website usage data.',
      },
      {
        heading: '3. Purpose of processing',
        body: 'Personal data is used to respond to enquiries, support investor relations workflows, improve the website experience and meet applicable compliance obligations.',
      },
      {
        heading: '4. Sharing and retention',
        body: 'Data may be shared with trusted service providers, investor relations partners or regulatory parties when necessary. Data is retained only as long as needed for operational, legal or compliance purposes.',
      },
      {
        heading: '5. Your rights',
        body: 'Depending on your jurisdiction, you may request access, correction, deletion, restriction or portability of your personal data.',
      },
      {
        heading: '6. Contact',
        body: `For privacy-related enquiries, contact ${contact.email}.`,
      },
    ],
  },
};

export const Footer: React.FC = () => {
  const [activeLegal, setActiveLegal] = React.useState<LegalModalKey | null>(null);
  const activeLegalContent = activeLegal ? legalContent[activeLegal] : null;
  const legalTitleId = React.useId();
  const { tx } = useI18n();

  React.useEffect(() => {
    if (!activeLegal) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveLegal(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLegal]);

  return (
    <footer id="contact" data-nav-section="/#contact" className="relative scroll-mt-[65px] overflow-hidden bg-industrial-white text-industrial-black border-t border-zinc-800 px-6 py-20 lg:scroll-mt-[98px]">
      <Image
        src={aixcoAssets.footerShape}
        alt=""
        aria-hidden
        width={2240}
        height={2240}
        sizes="(max-width: 768px) 50vw, 768px"
        className="pointer-events-none absolute bottom-0 right-0 h-auto w-1/2 max-w-3xl opacity-10"
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="mb-8 inline-flex items-center gap-3">
            <Image
              src={aixcoAssets.markBlack}
              alt=""
              aria-hidden
              width={779}
              height={705}
              sizes="40px"
              className="h-10 w-10 object-contain"
            />
            <span className="text-lg font-medium tracking-normal">AIXCO.ENERGY</span>
          </div>
          <p className="mb-8 max-w-xs text-sm font-black uppercase leading-relaxed text-zinc-500">
            {tx(footerIntro)}
          </p>
          <div className="flex gap-2">
            <a href={socialLinks.aixcoGlobal} target="_blank" rel="noopener noreferrer" aria-label={tx("AIXCO Global")} className="border border-zinc-800 p-3.5 text-zinc-500 transition-all hover:border-brand-red hover:bg-brand-red hover:text-industrial-white">
              <Globe size={18} />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="border border-zinc-800 p-3.5 text-zinc-500 transition-all hover:border-brand-red hover:bg-brand-red hover:text-industrial-white">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="mb-6 text-sm font-black uppercase tracking-[0.14em] text-brand-red underline decoration-2 underline-offset-4">{tx("Energy focus")}</h4>
          <ul className="flex flex-col gap-2 text-sm font-bold uppercase tracking-normal text-zinc-400">
            {energyFocus.map((item) => (
              <li key={item}>
                <Link href={item === "Technology News" ? "/news" : "/projects"} className="inline-flex min-h-8 min-w-11 items-center transition-colors hover:text-brand-red">
                  {tx(item)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="mb-6 text-sm font-black uppercase tracking-[0.14em] text-brand-red underline decoration-2 underline-offset-4">{tx("Company")}</h4>
          <ul className="flex flex-col gap-2 text-sm font-bold uppercase tracking-normal text-zinc-400">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.to} className="inline-flex min-h-8 min-w-11 items-center transition-colors hover:text-brand-red">
                  {tx(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="mb-6 text-sm font-black uppercase tracking-[0.14em] text-brand-red underline decoration-2 underline-offset-4">{tx("Contact us")}</h4>
          <div className="space-y-5 text-sm font-black uppercase leading-relaxed tracking-normal text-zinc-400">
            <div>
              <div className="mb-2 flex items-center gap-2 text-industrial-black"><MapPin size={14} className="text-brand-red" /> {tx("Head Office")}</div>
              <p>{contact.address}</p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 text-industrial-black"><Phone size={14} className="text-brand-red" /> {tx("Investor Support")}</div>
              <p>{tx(contact.supportDetail)}</p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 text-industrial-black"><Mail size={14} className="text-brand-red" /> {tx("Email")}</div>
              <a
                href={`mailto:${contact.email}`}
                onClick={() => {
                  void recordEmailClick('footer_email', contact.email);
                }}
                className="inline-flex min-h-8 items-center transition-colors hover:text-brand-red"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto mt-16 border-t border-zinc-900 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h4 className="mb-5 text-sm font-black uppercase tracking-[0.14em] text-brand-red underline decoration-2 underline-offset-4">{tx("Investment focus")}</h4>
            <ul className="grid grid-cols-1 gap-3 text-sm font-black uppercase tracking-normal text-zinc-500 sm:grid-cols-2">
              {investmentFocus.map((item) => (
                <li key={item}>{tx(item)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-sm font-black uppercase tracking-[0.14em] text-brand-red underline decoration-2 underline-offset-4">{tx("About AIXCO Energy")}</h4>
            <p className="text-sm font-black uppercase leading-relaxed text-zinc-500">{tx(aboutEnergy)}</p>
          </div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto mt-16 pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm font-black uppercase tracking-normal text-zinc-600">
          © 2026 AIXCO Energy.
        </div>
        <div className="flex flex-wrap justify-center gap-6 border border-zinc-900 bg-zinc-950/50 px-4 py-2 text-sm font-black uppercase tracking-normal text-zinc-500">
          <button
            type="button"
            onClick={() => setActiveLegal('terms')}
            className="inline-flex min-h-8 cursor-pointer items-center transition-colors hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
          >
            {tx("Terms & Conditions")}
          </button>
          <button
            type="button"
            onClick={() => setActiveLegal('privacy')}
            className="inline-flex min-h-8 cursor-pointer items-center transition-colors hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
          >
            {tx("Privacy Policy")}
          </button>
          <span>{tx(contact.hours)}</span>
        </div>
      </div>

      {activeLegalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-industrial-black/60 px-4 py-6 backdrop-blur-sm" role="presentation">
          <button
            type="button"
            aria-label={tx("Close legal information")}
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={() => setActiveLegal(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={legalTitleId}
            className="relative max-h-[84vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-zinc-300 bg-industrial-white shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-zinc-200 bg-industrial-white px-5 py-4 sm:px-7">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-red">{tx("Legal")}</p>
                <h3 id={legalTitleId} className="mt-1 text-2xl font-black uppercase tracking-normal text-industrial-black">
                  {tx(activeLegalContent.title)}
                </h3>
              </div>
              <button
                type="button"
                aria-label={tx("Close")}
                onClick={() => setActiveLegal(null)}
                className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 transition-colors hover:border-brand-red hover:bg-brand-red hover:text-industrial-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-6 px-5 py-6 sm:px-7">
              {activeLegalContent.sections.map((section) => (
                <section key={section.heading}>
                  <h4 className="text-base font-black uppercase tracking-normal text-industrial-black">{tx(section.heading)}</h4>
                  <p className="mt-2 text-sm font-black uppercase leading-relaxed text-zinc-500">{tx(section.body)}</p>
                  {section.items && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm font-black uppercase leading-relaxed text-zinc-500">
                      {section.items.map((item) => (
                        <li key={item}>{tx(item)}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
