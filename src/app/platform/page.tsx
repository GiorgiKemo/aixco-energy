import { createPageMetadata } from '../../lib/seo';
import PlatformPage from '../../views/PlatformPage';

export const metadata = createPageMetadata({
  title: 'AIXCO Energy Platform',
  description:
    'Explore the AIXCO Energy platform strategy across renewable generation, storage, hydrogen infrastructure and future-facing energy technologies.',
  path: '/platform',
});

export default function PlatformRoute() {
  return <PlatformPage />;
}
