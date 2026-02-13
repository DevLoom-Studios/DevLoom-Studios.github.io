'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard: React.FC<{ title: string; category: string; image: string }> = ({ title, category, image }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="group cursor-pointer"
  >
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4 bg-neutral-900">
      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
      <img 
        src={image} 
        alt={title} 
        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" 
      />
    </div>
    <div className="flex justify-between items-start border-b border-neutral-800 pb-4">
      <div>
        <h3 className="text-2xl font-syne font-bold text-white group-hover:text-lime-400 transition-colors">{title}</h3>
        <p className="text-sm text-neutral-500">{category}</p>
      </div>
      <span className="text-xs border border-neutral-800 rounded-full px-3 py-1">2024</span>
    </div>
  </motion.div>
);

const Work: React.FC = () => {
  return (
    <main className="pt-32 pb-20 bg-neutral-950 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-syne font-bold mb-8"
          >
            SELECTED <br/> <span className="text-lime-400">WORK</span>
          </motion.h1>
          <p className="text-xl text-neutral-400 max-w-2xl">
            A showcase of digital products, websites, and brand identities we've crafted for ambitious tech companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          <ProjectCard title="FinFlow" category="Fintech Website Revamp" image="https://picsum.photos/800/600?random=10" />
          <ProjectCard title="AeroSpace" category="3D Interactive Experience" image="https://picsum.photos/800/600?random=11" />
          <ProjectCard title="Databaze" category="SaaS Branding & UI" image="https://picsum.photos/800/600?random=12" />
          <ProjectCard title="Nexus Core" category="AI Platform Development" image="https://picsum.photos/800/600?random=13" />
        </div>
      </div>
    </main>
  );
};

export default Work;
