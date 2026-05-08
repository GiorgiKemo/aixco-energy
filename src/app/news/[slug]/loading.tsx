export default function NewsArticleLoading() {
  return (
    <main className="min-h-screen bg-industrial-white pt-24 text-industrial-black lg:pt-32">
      <article className="mx-auto max-w-7xl px-6 pb-24 pt-12 md:pt-18">
        <div className="mb-10 h-12 w-40 rounded-lg border border-brand-red/30 bg-brand-red/10" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-6 h-5 w-48 bg-brand-red/20" />
            <div className="mb-5 h-16 w-full max-w-4xl bg-zinc-900" />
            <div className="mb-8 h-16 w-3/4 bg-zinc-900" />
            <div className="h-20 w-full max-w-3xl bg-zinc-900" />
          </div>
          <aside className="lg:col-span-5">
            <div className="h-[28rem] border border-zinc-800 bg-zinc-950 shadow-soft" />
          </aside>
        </div>
      </article>
    </main>
  );
}
