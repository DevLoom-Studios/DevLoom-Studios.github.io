'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ProcessCard: React.FC<{
  number: string;
  title: string;
  description: string;
  image: string;
}> = ({ number, title, description, image }) => {
  return (
    <div className="process-card w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 flex flex-col gap-6 p-4 md:p-8 snap-center group">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-lime-400 text-black flex items-center justify-center text-xl md:text-2xl font-bold font-syne shadow-[0_0_20px_rgba(193,255,114,0.4)] transition-transform group-hover:scale-110 duration-500">
          {number}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold font-syne leading-tight text-white group-hover:text-lime-400 transition-colors duration-300">
          {title}
        </h3>
      </div>

      <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl">
        {description}
      </p>

      <div className="relative aspect-video rounded-2xl overflow-hidden border border-neutral-800">
        <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
      </div>
    </div>
  );
};

const ProcessHorizontal: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: "01",
      title: "Develop clear, customer focused messaging",
      description: "We conduct in-depth messaging sessions to define your product's place in the market. We analyze your audience and competition and craft clear messaging and conversion driven website copy.",
      image: "https://picsum.photos/800/600?random=1"
    },
    {
      number: "02",
      title: "Crafting beautiful designs that convert",
      description: "We reimagine the look and feel of your website, create compelling product visuals that explain your features best. Our design focuses on driving more conversions and reducing bounce rates.",
      image: "https://picsum.photos/800/600?random=2"
    },
    {
      number: "03",
      title: "Scalable Development & Integration",
      description: "We build your site using modern frameworks like React and Next.js, ensuring lightning-fast performance, SEO optimization, and a CMS that your marketing team can actually use.",
      image: "https://picsum.photos/800/600?random=3"
    }
  ];

  useGSAP(() => {
    if (!containerRef.current || !triggerRef.current) return;

    const container = containerRef.current;
    const trigger = triggerRef.current;

    // Calculate total scroll progress based on container width
    const getScrollWidth = () => container.scrollWidth - window.innerWidth;

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: () => `+=${getScrollWidth()}`,
        pin: true,
        scrub: 0.5,
        pinSpacing: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
              scaleX: self.progress,
              duration: 0.1,
              overwrite: true,
              ease: "none"
            });
          }
        }
      },
    });

    tl.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: "none",
    });

    // Animate cards on entrance - trigger when the section enters the viewport
    gsap.from(".process-card", {
      opacity: 0,
      y: 100,
      stagger: 0.1,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: trigger,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Force refresh after a short delay to ensure layout is settled
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);

  }, { scope: triggerRef, dependencies: [] });

  return (
    <section ref={triggerRef} className="relative z-20 bg-neutral-950 overflow-hidden h-screen">
      <div className="flex h-screen items-center">

        {/* Static Title Overlay */}
        <div className="absolute top-20 left-6 md:left-20 z-20 pointer-events-none">
          <div className="overflow-hidden">
            <h2 className="text-sm font-bold text-lime-400 tracking-[0.3em] uppercase mb-4 opacity-0 animate-reveal-up">Our Process</h2>
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-3xl md:text-5xl font-syne font-bold leading-tight opacity-0 animate-reveal-up-delayed">From Chaos <br />to Clarity</p>
          </div>
        </div>

        {/* Moving Container */}
        <div
          ref={containerRef}
          className="flex gap-16 pl-[15vw] md:pl-[25vw] pr-[10vw] items-center will-change-transform"
        >
          {steps.map((step, i) => (
            <ProcessCard key={i} {...step} />
          ))}
        </div>

        {/* Progress Bar Container */}
        <div className="absolute bottom-12 left-6 md:left-20 right-6 md:right-20 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-lime-400 origin-left scale-x-0"
          />
        </div>

      </div>
    </section>
  );
};

export default ProcessHorizontal;