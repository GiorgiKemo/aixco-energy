import { createPageMetadata } from '../../lib/seo';
import AboutPage from '../../views/AboutPage';

export const metadata = createPageMetadata({
  title: 'About AIXCO Energy',
  description:
    'Learn how AIXCO Energy presents renewable infrastructure, smart grid, storage and hydrogen opportunities within the wider AIXCO platform.',
  path: '/about',
});

export default function AboutRoute() {
  return <AboutPage />;
}
