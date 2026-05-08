'use client';

import type { ReactNode } from 'react';
import { recordBlueRockClick } from '../lib/backend/energy-lead-capture';

type TrackedBlueRockLinkProps = {
  children: ReactNode;
  className?: string;
  label: string;
  metadata?: Record<string, string | number | boolean | null>;
  ariaLabel?: string;
};

export function TrackedBlueRockLink({
  children,
  className,
  label,
  metadata,
  ariaLabel,
}: TrackedBlueRockLinkProps) {
  return (
    <a
      href="https://bluerock.cc"
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      onClick={() => {
        void recordBlueRockClick(label, metadata);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
