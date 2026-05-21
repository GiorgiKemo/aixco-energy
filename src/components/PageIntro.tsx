import React from 'react';

type PageIntroProps = {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
};

export const PageIntro: React.FC<PageIntroProps> = ({ eyebrow, title, children }) => {
  return (
    <div className="mb-16 border-b border-zinc-800 pb-12">
      <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-brand-red md:text-base">{eyebrow}</p>
      <h1 className="break-words text-[clamp(2.6rem,8vw,5.5rem)] leading-none">{title}</h1>
      {children}
    </div>
  );
};
