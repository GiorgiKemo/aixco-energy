import type { MetadataRoute } from 'next';
import { newsArticles } from '../content/newsArticles';
import { siteUrl } from '../lib/seo';

const staticRoutes = ['/', '/about', '/platform', '/projects', '/news'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified,
      changeFrequency: route === '/' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '/' ? 1 : 0.8,
    })),
    ...newsArticles.map((article) => ({
      url: `${siteUrl}/news/${article.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
