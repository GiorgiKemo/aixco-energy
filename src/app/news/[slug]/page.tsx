import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNewsArticleBySlug, newsArticles } from '../../../content/newsArticles';
import { createPageMetadata } from '../../../lib/seo';
import ArticlePage from '../../../views/ArticlePage';

type ArticleRouteParams = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticleRouteParams): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: 'AIXCO Energy News',
    };
  }

  return createPageMetadata({
    title: article.title,
    description: article.summary,
    path: `/news/${article.slug}`,
    image: article.image,
    type: 'article',
  });
}

export default async function NewsArticleRoute({ params }: ArticleRouteParams) {
  const { slug } = await params;

  if (!getNewsArticleBySlug(slug)) {
    notFound();
  }

  return <ArticlePage slug={slug} />;
}
