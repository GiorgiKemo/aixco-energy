'use client';

import type { ReactNode } from 'react';
import { recordPdfOpen } from '../lib/backend/energy-lead-capture';

type TrackedPdfLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  label: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export function TrackedPdfLink({ children, className, href, label, metadata }: TrackedPdfLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        void recordPdfOpen(label, href, metadata);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
