'use client';

import Link from 'next/link';
import { useI18n } from '../i18n/I18nProvider';

export default function NotFound() {
  const { tx } = useI18n();

  return (
    <main className="min-h-screen bg-industrial-white px-6 pt-32 text-industrial-black">
      <section className="mx-auto max-w-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-soft md:p-12">
        <p className="mb-5 text-sm font-black uppercase tracking-[0.14em] text-brand-red">
          404
        </p>
        <h1 className="mb-6 text-[clamp(2.5rem,8vw,5rem)] font-black leading-none">
          {tx("Page not found")}
        </h1>
        <p className="mb-8 max-w-2xl text-base font-bold leading-7 text-zinc-500">
          {tx("The page you requested is not available. Use one of the main AIXCO Energy destinations below to continue.")}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-gold">
            {tx("Back to home")}
          </Link>
          <Link href="/faq" className="btn-outline-dark">
            {tx("Open FAQs")}
          </Link>
          <Link href="/contact" className="btn-outline-dark">
            {tx("Contact us")}
          </Link>
        </div>
      </section>
    </main>
  );
}
