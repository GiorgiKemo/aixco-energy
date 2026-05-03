import React from 'react';
import { Hero } from '../components/Hero';
import { NewsTicker } from '../components/NewsTicker';
import { NewsGrid } from '../components/NewsGrid';
import { TechSection } from '../components/TechSection';
import { NewsBanner } from '../components/NewsBanner';
import { StrategySection } from '../components/StrategySection';

const HomePage: React.FC = () => {
  return (
    <main className="bg-industrial-black">
      <Hero />
      <StrategySection />
      <NewsTicker />
      <TechSection />
      <NewsGrid />
      <NewsBanner />
    </main>
  );
};

export default HomePage;
