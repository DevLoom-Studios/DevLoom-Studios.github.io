'use client';

import React, { useEffect } from 'react';
import HeroScroll from '@/components/HeroScroll';
import Philosophy from '@/components/Philosophy';
import VisionCraft from '@/components/VisionCraft';
import Services from '@/components/Services';
import ImageBreakCTA from '@/components/ImageBreakCTA';
import FAQ from '@/components/FAQ';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  useEffect(() => {
    // ScrollTrigger refresh on mount
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  return (
    <main className="bg-neutral-950">
      {/* The New Cinematic Hero */}
      <HeroScroll />

      {/* Content below the hero */}
      <div className="relative z-20 bg-neutral-950">
        <Philosophy />

        {/* Brand Craft Section */}
        <div className="space-y-40 md:space-y-60 pb-40 md:pb-60">
          <Services />
        </div>

        {/* <ProcessHorizontal /> */}

        <ImageBreakCTA />

        <VisionCraft />

        <FAQ />
      </div>
    </main>
  );
};

export default Home;
