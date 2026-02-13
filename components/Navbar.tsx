'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/#services' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-neutral-950/70 backdrop-blur-xl py-4 border-b border-neutral-800'
          : 'bg-transparent py-8 border-b border-transparent'
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="z-50 group">
          <h1 className="text-2xl font-bold font-syne tracking-tighter flex items-center gap-1.5">
            DEVLOOM
            <span className="w-2 h-2 rounded-full bg-lime-400 group-hover:scale-150 transition-transform duration-300"></span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:text-lime-400 ${pathname === link.path ? 'text-lime-400' : 'text-neutral-400'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-lime-400 transition-all duration-300 flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(193,255,114,0.3)]"
          >
            Let's Talk
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-white p-2 hover:bg-neutral-900 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-neutral-950/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center p-6 md:hidden"
          >
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-syne font-bold hover:text-lime-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-syne font-bold text-lime-400"
                >
                  Contact
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;