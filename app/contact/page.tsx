'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <main className="pt-32 pb-20 bg-neutral-950 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <h1 className="text-6xl font-syne font-bold mb-6">Let's Talk</h1>
            <p className="text-xl text-neutral-400 mb-12">
              Ready to turn your website into your best salesperson? 
              Fill out the form or send us an email.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-900 rounded-full text-lime-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Email</h3>
                  <p className="text-neutral-400">hello@devloom.tech</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-900 rounded-full text-lime-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Phone</h3>
                  <p className="text-neutral-400">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-900 rounded-full text-lime-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Studio</h3>
                  <p className="text-neutral-400">123 Innovation Dr,<br/>Tech City, TC 90210</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/2"
          >
            <form className="bg-neutral-900/30 p-8 md:p-12 rounded-3xl border border-neutral-800">
              <h2 className="text-3xl font-syne font-bold mb-8">Claim your brand</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-neutral-400">Your Name</label>
                  <input type="text" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-white focus:border-lime-400 focus:outline-none transition-colors" placeholder="John Doe" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2 text-neutral-400">Your Email</label>
                  <input type="email" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-white focus:border-lime-400 focus:outline-none transition-colors" placeholder="john@company.com" />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-neutral-400">Project Type</label>
                  <select className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-white focus:border-lime-400 focus:outline-none transition-colors">
                    <option>Website Revamp</option>
                    <option>New Build</option>
                    <option>App Design</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2 text-neutral-400">Message</label>
                  <textarea rows={4} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-white focus:border-lime-400 focus:outline-none transition-colors" placeholder="Tell us about your goals..."></textarea>
                </div>

                <button type="button" className="w-full bg-lime-400 text-black font-bold py-4 rounded-lg hover:bg-white transition-colors">
                  Send Request
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
};

export default Contact;
