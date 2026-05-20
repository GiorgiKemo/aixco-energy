import { createPageMetadata } from '../../lib/seo';
import { FaqRedirect } from './FaqRedirect';

export const metadata = createPageMetadata({
  title: 'Investor FAQs',
  description:
    'Open the AIXCO Energy investor FAQ section with answers about the renewable infrastructure strategy and platform access.',
  path: '/#faqs',
});

export default function FaqRoute() {
  return <FaqRedirect />;
}
