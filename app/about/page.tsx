'use client';

import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <main className="pt-32 pb-20 bg-neutral-950 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-syne font-bold mb-12 leading-tight">
            WE ARE <span className="text-lime-400">DEVLOOM.</span><br />
            WHERE INNOVATION MEETS IMAGINATION.
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 text-lg text-neutral-400 leading-relaxed">
            <p>
              Phantom is a technology-led creative studio, elevating both real and digital worlds. 
              We partner with companies and collaborators aspiring to lead the way in marketing, brand and innovation.
            </p>
            <p>
              Your website's poor design is hurting your brand image and your bottom line. 
              We exist to fix that. By fusing high-end aesthetics with robust engineering, 
              we turn your digital presence into a conversion engine.
            </p>
          </div>
        </motion.div>

        <div className="mt-32">
          <h2 className="text-3xl font-bold font-syne mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Utility', desc: 'Function comes first. We build things that work seamlessly.' },
              { title: 'Immersion', desc: 'We create worlds, not just pages. Experiences that stick.' },
              { title: 'Impact', desc: 'Data-driven decisions that move the needle for your business.' }
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="border-t border-neutral-800 pt-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-neutral-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-32 relative rounded-2xl overflow-hidden h-[50vh]">
            <img src="https://picsum.photos/1600/900?grayscale" alt="Office" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h2 className="text-4xl md:text-6xl font-syne font-bold text-white">Join the Movement</h2>
            </div>
        </div>
      </div>
    </main>
  );
};

export default About;
