'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export function FaqRedirect() {
  useEffect(() => {
    window.location.replace('/#faqs');
  }, []);

  return (
    <main className="min-h-screen bg-industrial-white px-6 pt-32 text-industrial-black">
      <div className="mx-auto max-w-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-soft">
        <p className="mb-6 text-sm font-black uppercase tracking-[0.14em] text-brand-red">
          Investor FAQs
        </p>
        <h1 className="mb-6 text-4xl font-black">Redirecting to FAQs</h1>
        <Link href="/#faqs" className="btn-gold">
          Open FAQs
        </Link>
      </div>
    </main>
  );
}
