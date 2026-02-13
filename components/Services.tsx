'use client';

import React from 'react';
import { Monitor, ShoppingBag, Box, Zap, MousePointer2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; tags: string[] }> = ({ icon, title, tags }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }}
    className="group border border-neutral-800 hover:border-lime-400/50 bg-neutral-900/20 p-8 transition-all duration-300 hover:bg-neutral-900/50"
  >
    <div className="mb-6 text-neutral-400 group-hover:text-lime-400 transition-colors">
      {icon}
    </div>
    <h3 className="text-2xl font-bold font-syne mb-4 text-white group-hover:translate-x-1 transition-transform">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="text-xs font-mono px-2 py-1 border border-neutral-800 rounded-full text-neutral-400 group-hover:border-neutral-700">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

const Services: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="services" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:flex justify-between items-end">
          <div>
            <h2 className="text-sm font-bold text-lime-400 tracking-widest uppercase mb-2">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-syne font-bold max-w-xl">
              Everything you need to scale your digital presence.
            </h3>
          </div>
          <p className="text-neutral-400 mt-6 md:mt-0 max-w-sm">
            We don't just build websites. We build sales engines that look good and perform better.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <ServiceCard 
            icon={<Monitor size={40} />}
            title="Custom Websites"
            tags={['Next.js', 'React', 'GSAP', 'WebGL']}
          />
          <ServiceCard 
            icon={<ShoppingBag size={40} />}
            title="E-Commerce"
            tags={['Shopify', 'Conversion Rate Optimization', 'Headless']}
          />
          <ServiceCard 
            icon={<MousePointer2 size={40} />}
            title="UI/UX Design"
            tags={['Figma', 'Prototyping', 'User Research']}
          />
          <ServiceCard 
            icon={<Zap size={40} />}
            title="AI Automation"
            tags={['Workflows', 'Chatbots', 'Integration']}
          />
          <ServiceCard 
            icon={<Box size={40} />}
            title="3D Models & WebGL"
            tags={['Three.js', 'Spline', 'Interactive']}
          />
          <ServiceCard 
            icon={<Layers size={40} />}
            title="Creative Ads"
            tags={['Motion Graphics', 'Social Assets', 'Branding']}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Services;