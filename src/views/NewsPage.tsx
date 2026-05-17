'use client';

import React from 'react';
import { ArrowRight, Check, ExternalLink, Quote } from 'lucide-react';
import Link from 'next/link';
import { aixcoAssets, ctaCopy, futureGrowth, investorReasons, pvArticle } from '../content/aixcoEnergy';
import { newsArticles } from '../content/newsArticles';
import { ResilientImage } from '../components/ResilientImage';
import { TrackedPdfLink } from '../components/TrackedPdfLink';
import { useI18n } from '../i18n/I18nProvider';

const NewsPage: React.FC = () => {
  const { tx } = useI18n();
  const lastArticleIndex = newsArticles.length - 1;

  return (
    <main className="pt-24 lg:pt-32 min-h-screen bg-industrial-white text-industrial-black">
      <section className="px-6 pb-24 pt-16 md:py-28 max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="mb-6 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{tx("Press archive")}</div>
          <h1 className="mb-10 break-words text-[clamp(3rem,9vw,8rem)] italic">
            {tx("News &")} <span className="text-brand-red">{tx("press")}</span>
          </h1>
          <p className="max-w-4xl text-sm font-black uppercase text-zinc-500 leading-relaxed">
            {tx("Selected magazine features, advertorials and press coverage related to solar contracting, real assets, sustainable development and the AIXCO platform network.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 mb-28">
          {newsArticles.map((article, index) => {
            const isOnlyArticle = newsArticles.length === 1;
            const isFeaturedArticle = index === 0 && !isOnlyArticle;
            const isLastArticle = index === lastArticleIndex;
            const isLgOrphan = isOnlyArticle || (newsArticles.length > 2 && isLastArticle && (newsArticles.length - 2) % 3 === 1);
            const isMdOrphan = isOnlyArticle || (isLastArticle && newsArticles.length % 2 === 1);
            const isWideArticle = isFeaturedArticle || isLgOrphan;

            return (
              <article
                key={article.slug}
                className={`min-w-0 bg-zinc-950 transition-colors hover:bg-zinc-900 ${
                  isFeaturedArticle ? "lg:col-span-2" : ""
                } ${isMdOrphan ? "md:col-span-2" : ""} ${isLgOrphan ? "lg:col-span-3" : ""}`}
              >
                <div className={`flex h-full min-w-0 flex-col ${isLgOrphan ? "lg:grid lg:grid-cols-12" : ""}`}>
                  <Link
                    href={`/news/${article.slug}`}
                    className={`group block border-b border-zinc-800 bg-industrial-white p-4 ${
                      isLgOrphan ? "lg:col-span-4 lg:border-b-0 lg:border-r lg:p-8" : ""
                    }`}
                  >
                    <span className={`relative block w-full ${isWideArticle ? "h-80" : "h-64"} ${isLgOrphan ? "lg:h-full lg:min-h-[24rem]" : ""}`}>
                      <ResilientImage
                        src={article.image}
                        alt={`${tx(article.title)} ${tx("article preview")}`}
                        fallbackLabel={tx(article.publication)}
                        fill
                        fetchPriority={index === 0 ? "high" : undefined}
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes={isLgOrphan ? "(max-width: 1024px) 100vw, 33vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                        className="object-contain"
                      />
                    </span>
                  </Link>
                  <div className={`flex min-w-0 flex-1 flex-col p-6 sm:p-7 md:p-8 ${isLgOrphan ? "lg:col-span-8 lg:p-10 xl:p-12" : ""}`}>
                    <div className="mb-6 flex flex-wrap items-center gap-3 text-sm font-black uppercase tracking-normal">
                      <span className="text-brand-red">{tx(article.category)}</span>
                      <span className="text-zinc-600">/</span>
                      <span className="text-zinc-500">{article.date}</span>
                    </div>
                    <h2 className={`mb-5 break-words leading-none ${isWideArticle ? "text-[clamp(2.4rem,5vw,4.6rem)]" : "text-[clamp(1.9rem,3vw,3rem)]"}`}>
                      {tx(article.title)}
                    </h2>
                    <div className="mb-6 text-sm font-black uppercase tracking-normal text-zinc-500">
                      {tx(article.publication)}
                    </div>
                    <p className="mb-8 text-sm leading-7 text-zinc-500">
                      {tx(article.summary)}
                    </p>
                    <div className="mt-auto">
                      <div className="mb-8 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span key={tag} className="border border-brand-red/35 bg-brand-red/10 px-3 py-2 text-sm font-black uppercase text-brand-red">
                            {tx(tag)}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/news/${article.slug}`}
                          className="btn-gold min-h-11 px-4 py-2 text-sm"
                        >
                          {tx("Read article")} <ArrowRight className="h-4 w-4" />
                        </Link>
                        <TrackedPdfLink
                          href={article.href}
                          label="news_archive_original_pdf"
                          metadata={{
                            article_slug: article.slug,
                            article_title: article.title,
                          }}
                          className="btn-ghost-gold min-h-11 px-4 py-2 text-sm"
                        >
                          {tx("Original PDF")} <ExternalLink className="h-4 w-4" />
                        </TrackedPdfLink>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <article className="mb-28">
          <div className="mb-16">
            <div className="mb-6 flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">
              {tx("Featured article")} <ArrowRight className="h-4 w-4" /> {tx(pvArticle.category)}
            </div>
            <h2 className="mb-8 break-words text-[clamp(3rem,8vw,7.8rem)] italic">
              {tx(pvArticle.title)}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm font-black uppercase tracking-normal text-zinc-500">
              <span>{tx(pvArticle.author)}</span>
              <span>PV-Contracting</span>
              <span>Green PV Gruppe</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <div className="overflow-hidden border border-zinc-800 bg-zinc-950">
                  <div className="relative aspect-[4/3] w-full">
                    <ResilientImage
                      src={aixcoAssets.solarProject}
                      alt={tx("AT&S Fehring solar installation")}
                      fallbackLabel={tx("AT&S Fehring solar installation")}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover opacity-95"
                    />
                  </div>
                  <p className="p-5 text-sm font-black uppercase leading-relaxed text-zinc-500">
                    {tx(pvArticle.imageCaption)}
                  </p>
                </div>
                <div className="border border-brand-red/40 bg-brand-red/10 p-6 text-brand-red">
                  <Quote className="mb-5 h-7 w-7" />
                  <p className="text-xl font-black italic leading-tight">
                    {tx(pvArticle.quote)}
                  </p>
                </div>
              </div>
            </aside>

            <div className="min-w-0 lg:col-span-8">
              <div className="mb-10 border-l-4 border-brand-red pl-6">
                <p className="text-2xl font-black leading-tight text-industrial-black">
                  {tx(pvArticle.summary)}
                </p>
              </div>

              <div className="mb-10">
                <Link href="/news/solar-energy-new-thinking" className="btn-gold">
                  {tx("Read full article page")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-px bg-zinc-800 border border-zinc-800">
                {pvArticle.sections.map((section, index) => (
                  <section key={section.title} className="min-w-0 bg-zinc-950 p-6 sm:p-7 md:p-10">
                    <div className="mb-6 text-sm font-black uppercase tracking-normal text-brand-red">0{index + 1}</div>
                    <h2 className="mb-6 break-words text-[clamp(1.9rem,4vw,3.4rem)]">{tx(section.title)}</h2>
                    <div className="space-y-5 text-base leading-8 text-zinc-500">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{tx(paragraph)}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </article>

        <div className="mb-20 text-center border-t border-zinc-800 pt-28">
          <div className="mb-6 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{tx(futureGrowth.label)}</div>
          <h2 className="mb-8 break-words text-[clamp(3.2rem,9vw,8rem)] italic">
            {tx("Where future growth")} <br /> <span className="text-brand-red">{tx("may come from")}</span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm font-black uppercase leading-relaxed text-zinc-500">
            {tx(futureGrowth.body)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800 mb-20">
          <div className="min-w-0 bg-zinc-950 p-6 sm:p-8 md:p-12">
            <h2 className="mb-8 break-words text-[clamp(2.2rem,4vw,4rem)]">{tx(futureGrowth.title)}</h2>
            <div className="flex flex-wrap gap-3 mb-10">
              {futureGrowth.tags.map((tag) => (
                <span key={tag} className="border border-brand-red/40 bg-brand-red/10 px-3 py-2 text-sm font-black uppercase text-brand-red">
                  {tx(tag)}
                </span>
              ))}
            </div>
            <p className="text-sm font-black uppercase leading-relaxed text-zinc-500">{tx(futureGrowth.close)}</p>
          </div>

          <div className="min-w-0 bg-industrial-white text-industrial-black p-6 sm:p-8 md:p-12">
            <div className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{tx(investorReasons.label)}</div>
            <h2 className="mb-8 break-words text-[clamp(2rem,4vw,3.6rem)]">{tx(investorReasons.title)}</h2>
            <ul className="space-y-4">
              {investorReasons.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm font-black uppercase leading-relaxed text-zinc-500">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  {tx(bullet)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-brand-red text-industrial-white p-8 sm:p-10 md:p-16">
          <div className="mb-5 text-sm font-black uppercase tracking-[0.18em] md:text-base">{tx(ctaCopy.label)}</div>
          <h2 className="mb-8 break-words text-[clamp(2.4rem,5vw,5rem)]">{tx(ctaCopy.title)}</h2>
          <p className="max-w-3xl text-sm font-black uppercase leading-relaxed">{tx(ctaCopy.body)}</p>
        </div>
      </section>
    </main>
  );
};

export default NewsPage;
