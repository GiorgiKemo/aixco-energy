import React from "react";
import { ArrowLeft, Check, ExternalLink, Quote } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getNewsArticleBySlug, newsArticles } from "../content/newsArticles";

const ArticlePage: React.FC = () => {
  const { slug } = useParams();
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  const relatedArticles = newsArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-industrial-white pt-24 text-industrial-black lg:pt-32">
      <article className="mx-auto max-w-7xl px-6 pb-24 pt-12 md:pt-18">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link to="/news" className="btn-ghost-gold">
            <ArrowLeft className="h-4 w-4" /> Back to news
          </Link>
          <a href={article.href} target="_blank" rel="noreferrer" className="btn-gold">
            Original PDF <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <header className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-6 text-sm font-black text-brand-red md:text-base">
              {article.eyebrow}
            </div>
            <h1 className="mb-8 break-words text-[clamp(3rem,8vw,7.4rem)]">
              {article.title}
            </h1>
            <p className="max-w-4xl text-[clamp(1.15rem,2vw,1.55rem)] font-black leading-tight text-zinc-500">
              {article.lead}
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="overflow-hidden border border-zinc-800 bg-zinc-950 shadow-soft">
              <div className="border-b border-zinc-800 bg-industrial-white p-5">
                <img
                  src={article.image}
                  alt={`${article.title} source preview`}
                  className="mx-auto h-80 w-full object-contain"
                />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex flex-wrap gap-2 text-sm font-black text-zinc-500">
                  <span>{article.publication}</span>
                  <span>/</span>
                  <span>{article.date}</span>
                  {article.author ? (
                    <>
                      <span>/</span>
                      <span>{article.author}</span>
                    </>
                  ) : null}
                </div>
                <p className="text-sm leading-7 text-zinc-500">{article.sourceNote}</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-brand-red/35 bg-brand-red/10 px-3 py-2 text-sm font-black text-brand-red"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </header>

        <section className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              {article.pullQuote ? (
                <div className="border border-brand-red/35 bg-brand-red/10 p-6 text-brand-red shadow-soft">
                  <Quote className="mb-5 h-7 w-7" />
                  <p className="text-2xl font-black leading-tight">{article.pullQuote}</p>
                </div>
              ) : null}

              <div className="border border-zinc-800 bg-zinc-950 p-6 shadow-soft">
                <h2 className="mb-5 text-2xl font-black">Article points</h2>
                <ul className="space-y-4">
                  {article.keyPoints.map((point) => (
                    <li key={point} className="flex gap-3 text-sm font-black leading-relaxed text-zinc-500">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-brand-red" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-8">
            <div className="grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800">
              {article.sections.map((section, index) => (
                <section key={section.title} className="min-w-0 bg-zinc-950 p-6 sm:p-8 md:p-10">
                  <div className="mb-5 text-sm font-black text-brand-red md:text-base">
                    0{index + 1}
                  </div>
                  <h2 className="mb-7 break-words text-[clamp(2rem,4vw,3.5rem)]">
                    {section.title}
                  </h2>
                  <div className="space-y-5 text-base leading-8 text-zinc-500 md:text-lg md:leading-9">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </article>

      <section className="border-t border-zinc-800 bg-zinc-950 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-sm font-black text-brand-red md:text-base">More from the archive</div>
          <div className="grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-3">
            {relatedArticles.map((item) => (
              <Link
                key={item.slug}
                to={`/news/${item.slug}`}
                className="group min-w-0 bg-industrial-white p-6 transition-colors hover:bg-zinc-900"
              >
                <div className="mb-5 text-sm font-black text-brand-red">{item.publication}</div>
                <h3 className="mb-4 break-words text-3xl leading-none">{item.title}</h3>
                <p className="mb-6 text-sm leading-7 text-zinc-500">{item.summary}</p>
                <span className="inline-flex items-center gap-2 text-sm font-black text-industrial-black group-hover:text-brand-red">
                  Read article <ExternalLink className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArticlePage;
