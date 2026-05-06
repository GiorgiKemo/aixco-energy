import React from 'react';
import { ArrowRight, Check, ExternalLink, Quote } from 'lucide-react';
import { aixcoAssets, ctaCopy, futureGrowth, investorReasons, pressArticles, pvArticle } from '../content/aixcoEnergy';

const NewsPage: React.FC = () => {
  return (
    <main className="pt-24 lg:pt-32 min-h-screen bg-industrial-white text-industrial-black">
      <section className="px-6 pb-24 pt-16 md:py-28 max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="mb-6 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">Press archive</div>
          <h1 className="mb-10 break-words text-[clamp(3rem,9vw,8rem)] italic">
            News & <span className="text-brand-red">press</span>
          </h1>
          <p className="max-w-4xl text-sm font-black uppercase text-zinc-500 leading-relaxed">
            Selected magazine features, advertorials and press coverage related to solar contracting, real assets, sustainable development and the AIXCO platform network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 mb-28">
          {pressArticles.map((article, index) => (
            <article
              key={article.slug}
              className={`min-w-0 bg-zinc-950 transition-colors hover:bg-zinc-900 ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <a href={article.href} target="_blank" rel="noreferrer" className="group flex h-full min-w-0 flex-col">
                <div className="border-b border-zinc-800 bg-industrial-white p-4">
                  <img
                    src={article.image}
                    alt={`${article.title} PDF preview`}
                    className={`w-full object-contain ${index === 0 ? "h-80" : "h-64"}`}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7 md:p-8">
                  <div className="mb-6 flex flex-wrap items-center gap-3 text-sm font-black uppercase tracking-normal">
                    <span className="text-brand-red">{article.category}</span>
                    <span className="text-zinc-600">/</span>
                    <span className="text-zinc-500">{article.date}</span>
                  </div>
                  <h2 className={`mb-5 break-words leading-none ${index === 0 ? "text-[clamp(2.4rem,5vw,4.6rem)]" : "text-[clamp(1.9rem,3vw,3rem)]"}`}>
                    {article.title}
                  </h2>
                  <div className="mb-6 text-sm font-black uppercase tracking-normal text-zinc-500">
                    {article.publication}
                  </div>
                  <p className="mb-8 text-sm leading-7 text-zinc-500">
                    {article.summary}
                  </p>
                  <div className="mt-auto">
                    <div className="mb-8 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span key={tag} className="border border-brand-red/35 bg-brand-red/10 px-3 py-2 text-sm font-black uppercase text-brand-red">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-normal text-industrial-black transition-colors group-hover:text-brand-red">
                      Open PDF <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>

        <article className="mb-28">
          <div className="mb-16">
            <div className="mb-6 flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">
              Featured article <ArrowRight className="h-4 w-4" /> {pvArticle.category}
            </div>
            <h2 className="mb-8 break-words text-[clamp(3rem,8vw,7.8rem)] italic">
              {pvArticle.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm font-black uppercase tracking-normal text-zinc-500">
              <span>{pvArticle.author}</span>
              <span>PV-Contracting</span>
              <span>Green PV Gruppe</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <div className="overflow-hidden border border-zinc-800 bg-zinc-950">
                  <img src={aixcoAssets.solarProject} alt="AT&S Fehring solar installation" className="aspect-[4/3] w-full object-cover opacity-95" />
                  <p className="p-5 text-sm font-black uppercase leading-relaxed text-zinc-500">
                    {pvArticle.imageCaption}
                  </p>
                </div>
                <div className="border border-brand-red/40 bg-brand-red/10 p-6 text-brand-red">
                  <Quote className="mb-5 h-7 w-7" />
                  <p className="text-xl font-black italic leading-tight">
                    {pvArticle.quote}
                  </p>
                </div>
              </div>
            </aside>

            <div className="min-w-0 lg:col-span-8">
              <div className="mb-10 border-l-4 border-brand-red pl-6">
                <p className="text-2xl font-black leading-tight text-industrial-black">
                  {pvArticle.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-px bg-zinc-800 border border-zinc-800">
                {pvArticle.sections.map((section, index) => (
                  <section key={section.title} className="min-w-0 bg-zinc-950 p-6 sm:p-7 md:p-10">
                    <div className="mb-6 text-sm font-black uppercase tracking-normal text-brand-red">0{index + 1}</div>
                    <h2 className="mb-6 break-words text-[clamp(1.9rem,4vw,3.4rem)]">{section.title}</h2>
                    <div className="space-y-5 text-base leading-8 text-zinc-500">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </article>

        <div className="mb-20 text-center border-t border-zinc-800 pt-28">
          <div className="mb-6 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{futureGrowth.label}</div>
          <h2 className="mb-8 break-words text-[clamp(3.2rem,9vw,8rem)] italic">
            Where future growth <br /> <span className="text-brand-red">may come from</span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm font-black uppercase leading-relaxed text-zinc-500">
            {futureGrowth.body}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800 mb-20">
          <div className="min-w-0 bg-zinc-950 p-6 sm:p-8 md:p-12">
            <h2 className="mb-8 break-words text-[clamp(2.2rem,4vw,4rem)]">{futureGrowth.title}</h2>
            <div className="flex flex-wrap gap-3 mb-10">
              {futureGrowth.tags.map((tag) => (
                <span key={tag} className="border border-brand-red/40 bg-brand-red/10 px-3 py-2 text-sm font-black uppercase text-brand-red">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm font-black uppercase leading-relaxed text-zinc-500">{futureGrowth.close}</p>
          </div>

          <div className="min-w-0 bg-industrial-white text-industrial-black p-6 sm:p-8 md:p-12">
            <div className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{investorReasons.label}</div>
            <h2 className="mb-8 break-words text-[clamp(2rem,4vw,3.6rem)]">{investorReasons.title}</h2>
            <ul className="space-y-4">
              {investorReasons.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm font-black uppercase leading-relaxed text-zinc-500">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-brand-red text-industrial-white p-8 sm:p-10 md:p-16">
          <div className="mb-5 text-sm font-black uppercase tracking-[0.18em] md:text-base">{ctaCopy.label}</div>
          <h2 className="mb-8 break-words text-[clamp(2.4rem,5vw,5rem)]">{ctaCopy.title}</h2>
          <p className="max-w-3xl text-sm font-black uppercase leading-relaxed">{ctaCopy.body}</p>
        </div>
      </section>
    </main>
  );
};

export default NewsPage;
