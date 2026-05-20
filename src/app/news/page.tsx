import { createPageMetadata } from '../../lib/seo';
import NewsPage from '../../views/NewsPage';

export const metadata = createPageMetadata({
  title: 'News & Press',
  description:
    'Read AIXCO Energy news, press coverage and market notes about renewable infrastructure, photovoltaic contracting and real asset themes.',
  path: '/news',
  image: '/aixco-energy/images/news/pv-asset.png',
});

export default function NewsRoute() {
  return <NewsPage />;
}
