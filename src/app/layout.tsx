import type { Metadata } from 'next';
import { Suspense, type ReactNode } from 'react';
import { ClientLayout } from './ClientLayout';
import '../index.css';

export const metadata: Metadata = {
  title: 'AIXCO Energy | Renewable Energy Investment Platform',
  description:
    'AIXCO Energy focuses on scalable renewable infrastructure including solar, wind, hydrogen, battery storage and intelligent grid-connected projects.',
  icons: {
    icon: '/aixco-energy/images/AIXB.png',
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
