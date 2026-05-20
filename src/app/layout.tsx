import type { Metadata } from 'next';
import { Suspense, type ReactNode } from 'react';
import { siteTitle, siteUrl } from '../lib/seo';
import { ClientLayout } from './ClientLayout';
import '../index.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  applicationName: 'AIXCO Energy',
  icons: {
    icon: '/aixco-energy/images/AIXB.png',
    shortcut: '/aixco-energy/images/AIXB.png',
    apple: '/aixco-energy/images/AIXB.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <ClientLayout children={children} />
        </Suspense>
      </body>
    </html>
  );
}
