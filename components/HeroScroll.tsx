'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import Copy from '@/hooks/copy';

gsap.registerPlugin(ScrollTrigger);

const HeroScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { images, isReady, progress } = useImagePreloader(69);

    useGSAP(() => {
        if (!isReady || !canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { alpha: false });
        if (!context) return;

        // Use a selector helper to find internal lines even if they are inside children
        const q = gsap.utils.selector(containerRef);

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
        const totalDuration = 7; // Relative weight for timeline

        // Delay timeline creation to ensure Copy components have split text
        setTimeout(() => {
            // --- MAIN SCROLL TIMELINE ---
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=500%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // 1. Sequence & Canvas Zoom
            tl.to(scrollObj, {
                frame: images.length - 1,
                duration: totalDuration,
                ease: "none",
                onUpdate: () => render(Math.round(scrollObj.frame))
            }, 0);

            tl.to(canvas, { scale: 1.1, duration: totalDuration, ease: "none" }, 0);

            // 2. DevLoom Sequence
            // A. Entrance handled automagically by Copy component (manual={false})

            // B. Move to Navbar (Scale Out & Top)
            // Stays fixed in center until 2.0s
            tl.to(".text-devloom", {
                y: "-45vh",
                scale: 0.3,
                duration: 2,
                ease: "power2.inOut",
            }, 2.0);

            // 3. Manifesto Sequence
            // A. Reveal (Starts after DevLoom is moving)
            const manifestoLines = q(".text-manifesto .line-internal");
            if (manifestoLines.length > 0) {
                tl.to(manifestoLines, {
                    y: "0%",
                    stagger: 0.1,
                    duration: 1,
                    ease: "power4.out"
                }, 3.0);

                // B. Exit
                tl.to(manifestoLines, {
                    y: "-110%",
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.05
                }, 5.5);
            }

            // 4. Services & Pitch Reveal
            // A. Reveal (Bottom Left areas)
            const servicesLines = q(".text-revamp .line-internal, .text-paragraph .line-internal");
            if (servicesLines.length > 0) {
                tl.to(servicesLines, {
                    y: "0%",
                    stagger: 0.08,
                    duration: 1,
                    ease: "power3.out"
                }, 6.0);
            }
        }, 200); // Wait 200ms for Copy components to initialize

        render(0);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(Math.round(scrollObj.frame));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, { scope: containerRef, dependencies: [isReady, images] });

    if (!isReady) {
        return (
            <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white z-50">
                <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-lime-400" style={{ width: `${progress}%` }} />
                </div>
                <p className="font-mono text-sm tracking-widest text-neutral-400">LOADING {progress}%</p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover" />

            <div className="relative z-10 w-full h-full pointer-events-none">

                {/* Layer 1: DevLoom - Entrance and Move to Navbar */}
                <div className="text-devloom absolute inset-0 flex items-center justify-center will-change-transform">
                    <Copy animateOnScroll={false} delay={0.8}>
                        <h1 className="text-white text-6xl md:text-9xl font-bold tracking-tighter mix-blend-difference">
                            DevLoom
                        </h1>
                    </Copy>
                </div>

                {/* Layer 2: Manifesto */}
                <div className="text-manifesto absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
                    <Copy manual={true}>
                        <h2 className="text-white text-3xl md:text-7xl font-bold text-center leading-none tracking-tight max-w-6xl">
                            TECHNOLOGY FOCUSED AND <br className="hidden md:block" /> CREATIVELY DRIVEN®
                        </h2>
                    </Copy>
                </div>

                {/* Layer 3 & 4: Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start md:justify-end md:pb-32 md:pl-20 px-6 pointer-events-none">
                    <div className="max-w-4xl">
                        <Copy manual={true} className="text-revamp">
                            <h3 className="text-lime-400 text-xl md:text-2xl font-bold uppercase mb-6 tracking-widest">
                                Website Revamps for B2B Tech Startups
                            </h3>
                        </Copy>

                        <Copy manual={true} className="text-paragraph">
                            <div className="space-y-8">
                                <p className="text-white text-lg md:text-3xl font-light leading-snug">
                                    Turning websites into your product's best salesperson. Messaging that doesn't confuse visitors, beautiful design that converts and a scalable website your marketing team owns.
                                </p>
                                <button className="pointer-events-auto bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95">
                                    Start Your Project
                                </button>
                            </div>
                        </Copy>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroScroll;