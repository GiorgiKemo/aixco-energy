import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-industrial-white px-6 pt-32 text-industrial-black">
      <section className="mx-auto max-w-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-soft md:p-12">
        <p className="mb-5 text-sm font-black uppercase tracking-[0.14em] text-brand-red">
          404
        </p>
        <h1 className="mb-6 text-[clamp(2.5rem,8vw,5rem)] font-black leading-none">
          Page not found
        </h1>
        <p className="mb-8 max-w-2xl text-base font-bold leading-7 text-zinc-500">
          The page you requested is not available. Return to the AIXCO Energy home page or use the navigation to continue.
        </p>
        <Link href="/" className="btn-gold">
          Back to home
        </Link>
      </section>
    </main>
  );
}
