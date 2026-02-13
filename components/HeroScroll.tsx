'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImagePreloader } from '@/hooks/useImagePreloader';

gsap.registerPlugin(ScrollTrigger);

const HeroScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { images, isReady, progress } = useImagePreloader(69);

    useEffect(() => {
        if (!isReady || !canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { alpha: false });
        if (!context) return;

        // Set canvas size to window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const render = (index: number) => {
            const safeIndex = Math.min(Math.max(index, 0), images.length - 1);
            const img = images[safeIndex];

            if (img) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        const scrollObj = { frame: 0 };

        const totalDuration = 6; // slightly longer
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%", // bit more scroll for more "air"
                scrub: true, // instantaneous response
                pin: true,
                anticipatePin: 1
            }
        });

        // 1. Image sequence scrubbing
        tl.to(scrollObj, {
            frame: images.length - 1,
            ease: "none",
            duration: totalDuration,
            onUpdate: () => render(Math.round(scrollObj.frame))
        }, 0);

        // Subtle Canvas Zoom
        tl.to(canvas, {
            scale: 1.1,
            duration: totalDuration,
            ease: "none"
        }, 0);

        // 2. Text Animations - Refined Timing
        tl.fromTo(".text-devloom",
            { scale: 1, opacity: 1, filter: "blur(0px)" },
            { scale: 0.6, opacity: 0, filter: "blur(15px)", duration: 3, ease: "power2.inOut" }, 0
        );

        // Layer 2: Manifesto - Reveal and Fade
        tl.fromTo(".text-manifesto",
            { y: 100, opacity: 0, scale: 0.6, filter: "blur(15px)" },
            { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, 2
        )
            .to(".text-manifesto", { opacity: 0, scale: 1.2, filter: "blur(15px)", y: -50, duration: 1 }, 3.2);

        // Layer 3: Service - Slide from bottom
        tl.fromTo(".text-revamp",
            { y: 50, opacity: 0, filter: "blur(5px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power4.out" }, 4
        );

        // Layer 4: Pitch & Button
        tl.fromTo(".text-paragraph",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 4.2
        );

        // Initial render
        render(0);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(Math.round(scrollObj.frame));
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            tl.kill();
        };
    }, [isReady, images]);

    // Loading Screen
    if (!isReady) {
        return (
            <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white z-50">
                <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mb-4">
                    <div
                        className="h-full bg-lime-400 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="font-mono text-sm tracking-widest text-neutral-400">
                    LOADING EXPERIENCE {progress}%
                </p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover" />

            {/* Scrollable Content Overlays */}
            <div className="relative z-10 w-full h-full pointer-events-none">

                {/* Layer 1: Brand Name */}
                <div className="text-devloom absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-6xl md:text-9xl font-bold tracking-tighter mix-blend-difference will-change-transform">
                        DevLoom
                    </h1>
                </div>

                {/* Layer 2: Manifesto */}
                <div className="text-manifesto absolute inset-0 flex items-center justify-center opacity-0 px-6 will-change-transform">
                    <h2 className="text-white text-3xl md:text-7xl font-bold text-center leading-none tracking-tight">
                        TECHNOLOGY FOCUSED AND <br className="hidden md:block" /> CREATIVELY DRIVEN®
                    </h2>
                </div>

                {/* Layer 3 & 4: Service & Pitch */}
                <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start md:justify-end md:pb-32 md:pl-20 px-6">
                    <div className="max-w-4xl">
                        <h3 className="text-revamp text-lime-400 text-xl md:text-2xl font-bold uppercase mb-6 opacity-0 tracking-widest translate-y-8">
                            Website Revamps for B2B Tech Startups
                        </h3>
                        <div className="text-paragraph opacity-0 translate-y-8 space-y-8">
                            <p className="text-white text-lg md:text-3xl font-light leading-snug">
                                Turning websites into your product's best salesperson. Messaging that doesn't confuse visitors, beautiful design that converts and a scalable website your marketing team owns.
                            </p>
                            <button className="pointer-events-auto bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-neutral-200 transition-colors duration-300 transform hover:scale-105 active:scale-95">
                                Start Your Project
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroScroll;
