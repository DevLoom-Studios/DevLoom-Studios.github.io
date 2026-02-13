'use client';

import React from 'react';

const ImageBreakCTA: React.FC = () => {
    return (
        <div className="py-40 md:py-60">
            <section className="cta-section py-24 bg-neutral-900/50 rounded-[40px] mx-6 overflow-hidden border border-neutral-800">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                    <div className="cta-text md:w-1/2">
                        <h2 className="text-5xl md:text-7xl font-syne font-bold mb-8 text-white leading-tight">
                            Where Innovation <br />Meets Imagination
                        </h2>
                        <p className="text-neutral-400 text-lg md:text-xl mb-10 leading-relaxed">
                            Fusing technical expertise with human vision. We don't just follow trends; we set them.
                            Our team of engineers and artists work in unison to deliver digital experiences that leave a lasting impact.
                        </p>
                        <button className="text-lime-400 border-b-2 border-lime-400 pb-2 font-bold hover:text-white hover:border-white transition-all duration-300 text-lg">
                            Read our story
                        </button>
                    </div>
                    <div className="md:w-1/2 relative">
                        <div className="aspect-square bg-gradient-to-br from-lime-400 to-blue-500 rounded-full blur-[100px] opacity-20 absolute inset-0 animate-pulse"></div>
                        <img
                            src="https://picsum.photos/800/800?grayscale"
                            alt="Abstract 3D Shape"
                            className="cta-image relative z-10 w-full rounded-3xl grayscale hover:grayscale-0 transition-all duration-1000 mix-blend-screen shadow-2xl"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ImageBreakCTA;
