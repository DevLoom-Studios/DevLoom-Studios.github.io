'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-syne font-bold">DEVLOOM.</h2>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Technology focused and creatively driven. Fusing technical expertise with human vision to build brands that matter.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 text-lg">Sitemap</h3>
            <ul className="space-y-4 text-neutral-400">
              <li><Link href="/" className="hover:text-lime-400 transition-colors">Home</Link></li>
              <li><Link href="/work" className="hover:text-lime-400 transition-colors">Work</Link></li>
              <li><Link href="/about" className="hover:text-lime-400 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-lime-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg">Services</h3>
            <ul className="space-y-4 text-neutral-400">
              <li className="hover:text-lime-400 cursor-pointer">Web Development</li>
              <li className="hover:text-lime-400 cursor-pointer">UI/UX Design</li>
              <li className="hover:text-lime-400 cursor-pointer">3D Modeling</li>
              <li className="hover:text-lime-400 cursor-pointer">AI Automation</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg">Socials</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-lime-400 hover:text-black transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-lime-400 hover:text-black transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-lime-400 hover:text-black transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-lime-400 hover:text-black transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Devloom Studios. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;