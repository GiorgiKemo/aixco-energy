import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BatteryCharging, Droplets, ExternalLink, Network, Sun, Wind } from 'lucide-react';
import { aixcoAssets, heroCopy, heroVerticals, platformMetrics } from '../content/aixcoEnergy';

const verticalIcons = [Sun, Wind, BatteryCharging, Droplets, Network];

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col pt-16 lg:pt-24 overflow-hidden border-b border-zinc-800">
      <div className="flex-1 flex flex-col lg:flex-row divide-x divide-zinc-800">
        <div className="lg:w-2/3 relative flex flex-col">
          <div className="relative min-h-[780px] flex-1 bg-zinc-900 overflow-hidden group lg:min-h-0">
            <motion.video
               initial={{ scale: 1.1, opacity: 0 }}
               animate={{ scale: 1, opacity: 0.42 }}
               transition={{ duration: 1.5 }}
               className="absolute inset-0 h-full w-full object-cover"
               src={aixcoAssets.heroVideo}
               autoPlay
               muted
               loop
               playsInline
               poster={aixcoAssets.solarProject}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-industrial-black via-industrial-black/20 to-transparent"></div>
            
            <div className="absolute bottom-10 left-10 right-10">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-2 mb-6"
              >
                <span className="status-tag">AIXCO Energy</span>
                <span className="bg-industrial-white text-industrial-black px-2 py-1 text-[10px] font-black uppercase">Renewable Infrastructure</span>
              </motion.div>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="hero-reference-font mb-5 text-[clamp(3.2rem,8vw,6rem)] font-semibold leading-[0.82] tracking-normal drop-shadow-[0_18px_42px_rgba(0,0,0,0.38)]"
              >
                {heroCopy.title}
              </motion.h1>
              <motion.h2
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.85 }}
                className="hero-reference-font mb-6 text-[clamp(1.2rem,4vw,4rem)] font-light leading-none tracking-normal text-brand-red [text-transform:uppercase] sm:whitespace-nowrap"
              >
                {heroCopy.subtitle}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="hero-reference-font max-w-2xl text-[clamp(1rem,1.35vw,1.2rem)] font-normal leading-[1.55] text-zinc-200/90"
              >
                {heroCopy.body}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link to="/projects" className="brutal-btn italic">
                  Explore Projects
                </Link>
                <a
                  href="https://bluerock.cc"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost-gold"
                >
                  Buy on BlueRock <ExternalLink size={14} />
                </a>
              </motion.div>
            </div>
          </div>
          
          <div className="border-t border-zinc-800 grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-800 bg-industrial-black lg:h-48">
            {platformMetrics.map((stat, i) => (
              <div key={i} className="min-h-40 p-6 flex flex-col justify-between hover:bg-zinc-900 transition-colors cursor-crosshair lg:min-h-0">
                <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest leading-none">{stat.label}</span>
                <span className="text-4xl font-black italic">{stat.value}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-red">AIXCO Energy</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:w-1/3 flex flex-col bg-zinc-950">
          <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
            <h2 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-red animate-pulse"></div>
              Core Technology Verticals
            </h2>
          </div>
          <div className="flex-1 flex flex-col divide-y divide-zinc-800 overflow-hidden">
            {heroVerticals.map((item, i) => {
              const Icon = verticalIcons[i];
              return (
              <div key={i} className="p-6 hover:bg-zinc-900 transition-colors cursor-pointer group">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-red/40 bg-brand-red/10 text-brand-red">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-black uppercase mt-2 leading-tight group-hover:text-brand-red transition-colors">{item.title}</h3>
                <p className="text-[11px] text-zinc-500 mt-2 font-medium uppercase leading-relaxed">{item.body}</p>
              </div>
              );
            })}
          </div>
          <Link to="/#faqs" className="h-24 flex items-center justify-center px-6 bg-brand-red text-industrial-black font-black uppercase text-xl leading-none hover:bg-industrial-white transition-all cursor-pointer shrink-0 italic tracking-normal text-center">
            Investor FAQs
          </Link>
        </div>
      </div>
    </section>
  );
};
