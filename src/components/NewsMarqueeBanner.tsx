import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Newspaper } from 'lucide-react';
import { pressArticles } from '../content/aixcoEnergy';

export const NewsMarqueeBanner: React.FC = () => {
  const groups = [0, 1];

  return (
    <section
      id="press-banner"
      aria-label="Latest AIXCO Energy press coverage"
      className="news-marquee border-y border-zinc-800 bg-industrial-white text-industrial-black"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-14">
        <div className="news-marquee__header">
          <div className="min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-red">
              <Newspaper className="h-4 w-4" aria-hidden="true" />
              Latest press
            </div>
            <h2 className="max-w-4xl text-[clamp(2rem,4.8vw,4.35rem)] leading-[0.95]">
              Market notes and media coverage
            </h2>
          </div>
          <Link
            to="/news"
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-brand-red"
          >
            View all news
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="news-marquee__viewport" aria-live="off">
          <div className="news-marquee__track">
            {groups.map((group) => (
              <div key={group} className="news-marquee__group" aria-hidden={group > 0}>
                {pressArticles.map((article) => (
                  <Link
                    key={`${group}-${article.slug}`}
                    to={`/news/${article.slug}`}
                    tabIndex={group > 0 ? -1 : undefined}
                    className="news-marquee__card group"
                  >
                    <span className="news-marquee__image-wrap">
                      <img src={article.image} alt="" aria-hidden="true" className="news-marquee__image" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="mb-2 flex flex-wrap items-center gap-2 text-[0.76rem] font-semibold text-brand-red">
                        <span>{article.category}</span>
                        <span className="h-1 w-1 rounded-full bg-zinc-700" aria-hidden="true" />
                        <span>{article.date}</span>
                      </span>
                      <span className="news-marquee__title">{article.title}</span>
                      <span className="mt-2 block text-[0.82rem] font-semibold leading-snug text-zinc-500">
                        {article.publication}
                      </span>
                    </span>
                    <ArrowRight className="news-marquee__arrow" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
