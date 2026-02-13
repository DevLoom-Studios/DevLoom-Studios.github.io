'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
    return (
        <section className="philosophy-section py-40 md:py-60 border-t border-neutral-900 bg-neutral-950 relative z-30 overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="philosophy-content max-w-5xl mx-auto text-center"
                >
                    <h3 className="text-4xl md:text-7xl font-syne font-bold leading-[1.1] mb-12 text-white tracking-tight">
                        "Your rigid, slow '2013' site repels visitors and handcuffs your marketing team."
                    </h3>
                    <p className="text-neutral-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                        You have a great product but your website is not getting you paying customers.
                        Your competitive advantage remains hidden behind ineffective website messaging.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Philosophy;
