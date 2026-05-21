import { createPageMetadata } from '../../lib/seo';
import FaqPage from '../../views/FaqPage';

export const metadata = createPageMetadata({
  title: 'Investor FAQs',
  description:
    'Frequently asked questions about AIXCO Energy, AIXCO Global, the 6% bond, BlueRock onboarding and AIXCO energy investment approach.',
  path: '/faq',
});

export default function FaqRoute() {
  return <FaqPage />;
}
