'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PaintBucket, Component, Pencil, Sliders } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ElementType, title: string, description: string, delay: number }> = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="p-8 border border-neutral-800 rounded-2xl bg-neutral-900/20 hover:bg-neutral-900/40 hover:border-lime-400/30 transition-all duration-300 group cursor-default"
  >
    <div className="w-12 h-12 border border-neutral-800 rounded-xl flex items-center justify-center mb-6 text-white group-hover:text-lime-400 group-hover:border-lime-400 transition-all duration-300 bg-neutral-950">
      <Icon size={22} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-syne font-bold mb-3 text-white">{title}</h3>
    <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const VisionCraft: React.FC = () => {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-lime-400/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header & Form */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-syne font-bold mb-6 text-white"
          >
            Your Vision, Our Craft
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 text-lg mb-12 max-w-xl"
          >
            Every great brand starts with a story. We turn yours into a legacy.
          </motion.p>

          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 w-full max-w-3xl"
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              type="text" 
              placeholder="Your Brand Name" 
              className="flex-1 bg-neutral-900/50 border border-neutral-800 rounded-lg px-6 py-4 text-white placeholder-neutral-500 focus:outline-none focus:border-lime-400 transition-colors"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="flex-1 bg-neutral-900/50 border border-neutral-800 rounded-lg px-6 py-4 text-white placeholder-neutral-500 focus:outline-none focus:border-lime-400 transition-colors"
            />
            <button className="bg-white text-black font-bold px-8 py-4 rounded-lg hover:bg-lime-400 hover:scale-105 transition-all duration-300 whitespace-nowrap">
              Claim your brand
            </button>
          </motion.form>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={PaintBucket}
            title="Discover the Vision"
            description="We uncover the story, values, and vision that makes your brand unique."
            delay={0.3}
          />
          <FeatureCard 
            icon={Component}
            title="Design the Identity"
            description="We craft an identity system that doesn't just look beautiful, it feels unforgettable."
            delay={0.4}
          />
          <FeatureCard 
            icon={Pencil}
            title="Define the Voice"
            description="We define your voice, ensuring your brand speaks with clarity and confidence."
            delay={0.5}
          />
          <FeatureCard 
            icon={Sliders}
            title="Deliver the Blueprint"
            description="A full set of brand guidelines, to keep your brand timeless and powerful."
            delay={0.6}
          />
        </div>

      </div>
    </section>
  );
};

export default VisionCraft;