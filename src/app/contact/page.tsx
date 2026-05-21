import { createPageMetadata } from '../../lib/seo';
import ContactPage from '../../views/ContactPage';

export const metadata = createPageMetadata({
  title: 'Contact AIXCO Energy',
  description:
    'Contact AIXCO Energy for investor enquiries, project information, BlueRock onboarding guidance and general website questions.',
  path: '/contact',
});

export default function ContactRoute() {
  return <ContactPage />;
}
