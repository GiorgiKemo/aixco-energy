import React from 'react';
import { Hero } from '../components/Hero';
import { NewsTicker } from '../components/NewsTicker';
import { NewsGrid } from '../components/NewsGrid';
import { TechSection } from '../components/TechSection';
import { NewsBanner } from '../components/NewsBanner';
import { NewsMarqueeBanner } from '../components/NewsMarqueeBanner';
import { StrategySection } from '../components/StrategySection';
import { FaqSection } from '../components/FaqSection';

const HomePage: React.FC = () => {
  return (
    <main className="bg-industrial-white text-industrial-black">
      <Hero />
      <StrategySection />
      <NewsGrid />
      <TechSection />
      <NewsTicker />
      <NewsMarqueeBanner />
      <NewsBanner />
      <FaqSection />
    </main>
  );
};

export default HomePage;
