import { createPageMetadata, siteDescription, siteTitle } from '../lib/seo';
import HomePage from '../views/HomePage';

export const metadata = createPageMetadata({
  title: siteTitle,
  description: siteDescription,
  path: '/',
});

export default function HomeRoute() {
  return <HomePage />;
}
