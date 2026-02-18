'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface CopyProps {
    children: React.ReactNode;
    animateOnScroll?: boolean;
    delay?: number;
    className?: string;
    manual?: boolean; // If true, sets initial state but does NOT trigger any animation (allows external control)
}

const Copy = ({ children, animateOnScroll = true, delay = 0, className = "", manual = false }: CopyProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const splits = useRef<SplitText[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Determine which elements to animate
        // If the container itself is the target (single child), use it.
        // Otherwise, query for children.
        let elements: HTMLElement[] = [];

        // Check if containerRef is directly on the text element we want to animate
        const isDirectTextElement = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI'].includes(containerRef.current.tagName);

        if (isDirectTextElement) {
            elements = [containerRef.current];
        } else {
            // Target all text-based elements inside
            const nodeList = containerRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, li, div');
            // Filter out any that are just wrappers if possible, but for now take all potentially text-containing block/inline elements
            // Actually, let's trust the user's structure or just target common text tags.
            elements = Array.from(nodeList) as HTMLElement[];
        }

        // If no elements found (maybe it's a wrapper div with text nodes?), fall back to container
        if (elements.length === 0 && containerRef.current.innerText.trim().length > 0) {
            elements = [containerRef.current];
        }

        const allInternalLines: HTMLElement[] = [];

        elements.forEach((element) => {
            // Skip if it is a container with no direct text or handle recursively? 
            // For safety, let's try to split. If it fails or has mixed content, SplitText usually handles it or does nothing.

            // 1. Create the outer split (the "mask" or "window")
            const outerSplit = new SplitText(element, {
                type: "lines",
                linesClass: "overflow-hidden",
            });

            // 2. Create the inner split (the actual text we move)
            const innerSplit = new SplitText(outerSplit.lines, {
                type: "lines",
                linesClass: "line-internal" // This class is often used for the transform
            });

            // Store both for cleanup
            splits.current.push(outerSplit, innerSplit);

            // Handle the textIndent logic if needed (from your reference)
            const computedStyle = window.getComputedStyle(element);
            const textIndent = computedStyle.textIndent;
            if (textIndent && textIndent !== "0px" && innerSplit.lines.length > 0) {
                (innerSplit.lines[0] as HTMLElement).style.paddingLeft = textIndent;
                element.style.textIndent = "0";
            }

            allInternalLines.push(...(innerSplit.lines as HTMLElement[]));
        });

        if (allInternalLines.length === 0) return;

        // Set Initial State (hidden below the mask)
        gsap.set(allInternalLines, { y: "100%", scale: 0.96 });

        // Trigger Animation (CONTROLLED)
        if (!manual) {
            if (animateOnScroll) {
                gsap.to(allInternalLines, {
                    y: "0%",
                    scale: 1,
                    duration: 1.3,
                    ease: "power4.out",
                    delay: delay,
                    stagger: {
                        each: 0.05,
                        from: "start"
                    },
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%", // Triggers when top of element is 85% down viewport
                        toggleActions: "play none none none",
                        // debug: true // Uncomment for debugging
                    }
                });
            } else {
                // Immediate animation if not scroll-triggered
                gsap.to(allInternalLines, {
                    y: "0%",
                    duration: 1.3,
                    stagger: 0.05,
                    ease: "power4.out",
                    delay: delay,
                });
            }
        }

        return () => {
            splits.current.forEach(s => s.revert());
            splits.current = [];
        };
    }, { scope: containerRef, dependencies: [children, animateOnScroll, delay, manual] });


    // React.cloneElement logic to keep the DOM clean if it's a single child
    if (React.Children.count(children) === 1 && React.isValidElement(children)) {
        const child = children as React.ReactElement<{ className?: string, ref?: React.Ref<any> }>;
        return React.cloneElement(child, {
            ref: containerRef,
            className: `${child.props.className || ''} ${className}`.trim()
        });
    }

    // Wrapper for multiple children
    return (
        <div ref={containerRef} className={className} data-copy-wrapper="true">
            {children}
        </div>
    );
};

export default Copy;