'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SliderTextProps {
  containerWidth?: number; // Width of the parent container
  containerHeight?: number; // Height of the parent container
}

export default function SliderText({ containerWidth, containerHeight }: SliderTextProps = {}) {
  // Refs for text elements and container
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  //const thirdText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // State management
  const [isInitialized, setIsInitialized] = useState(false);
  const [fontSize, setFontSize] = useState('150px');

  // Animation control references
  const xPercentRef = useRef(0); // Controls horizontal position
  const directionRef = useRef<number>(1); // Controls scroll direction (1 or -1)
  const scrollWidthRef = useRef(0); // Total scroll width for animation

  // Update font size based on container width
  const updateFontSize = useCallback(() => {
    const width = containerWidth || window.innerWidth;
    setFontSize(width > 1366 ? '150px' : '120px'); // Larger font for wider screens
  }, [containerWidth]);

  // Calculate and update scroll width for smooth animation
  const updateScrollWidth = useCallback(() => {
    if (!containerRef.current || !firstText.current || !secondText.current) return;

    const firstTextWidth = firstText.current.offsetWidth;
    const secondTextWidth = secondText.current.offsetWidth;
    //const thirdTextWidth = thirdText.current.offsetWidth;
    const contentWidth = firstTextWidth + secondTextWidth;
    const effectiveWidth = containerWidth || window.innerWidth;

    // Ensure content width is sufficient for smooth scrolling
    scrollWidthRef.current = Math.max(contentWidth * 1.5, effectiveWidth * 1.2);

    // Setup GSAP scroll trigger animation
    if (slider.current) {
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.1, // Smooth scrolling effect
          start: 0,
          end: containerHeight || window.innerHeight,
          onUpdate: (e) => {
            directionRef.current = e.direction * -1; // Reverse direction based on scroll
          },
        },
        x: `-${scrollWidthRef.current}px`, // Horizontal movement
      });
    }
  }, [containerWidth, containerHeight]);

  // Main animation loop
  const animate = useCallback(() => {
    if (!isInitialized) return;

    // Reset position when text moves too far
    if (xPercentRef.current < -300) {
      xPercentRef.current = 0;
    } else if (xPercentRef.current > 0) {
      xPercentRef.current = -50;
    }

    // Update text position
    gsap.set([firstText.current, secondText.current], {
      xPercent: xPercentRef.current,
    });

    // Continue animation
    xPercentRef.current += 0.1 * directionRef.current;
    requestAnimationFrame(animate);
  }, [isInitialized]);

  // Initialize and cleanup animations
  useLayoutEffect(() => {
    let animationFrame: number;

    const initAnimation = () => {
      if (typeof window === 'undefined') return;

      // Setup GSAP and initial states
      gsap.registerPlugin(ScrollTrigger);
      setIsInitialized(true);
      updateFontSize();

      // Watch for container size changes
      const resizeObserver = new ResizeObserver(() => {
        updateFontSize();
        updateScrollWidth();
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
        updateScrollWidth();
      }

      animationFrame = requestAnimationFrame(animate);

      // Cleanup function
      return () => {
        resizeObserver.disconnect();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        cancelAnimationFrame(animationFrame);
      };
    };

    const timer = setTimeout(initAnimation, 100);

    return () => {
      clearTimeout(timer);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [animate, updateScrollWidth, updateFontSize]);

  return (
    <div
      ref={containerRef}
      className="absolute left-0 right-0 w-full overflow-hidden"
      style={{
        bottom: '-6%',
        height: fontSize === '150px' ? '270px' : '220px', // Adjust container height based on font size
        minHeight: fontSize === '160px' ? '280px' : '230px',
      }}
    >
      <div
        ref={slider}
        className="relative w-full h-full whitespace-nowrap flex items-center"
        style={{
          paddingLeft: containerWidth ? `${containerWidth * 0.05}px` : '5vw',
        }}
      >
        <div className="flex items-center h-full">
          {/* First text element */}
          <p
            ref={firstText}
            className="relative m-0 text-black/85 dark:text-white/85 font-medium leading-none"
            style={{
              fontSize,
              height: 'auto',
              lineHeight: '1',
            }}
          >
            INNÖVATION <span className="dot">*</span>
          </p>
          {/* Second text element */}
          <p
            ref={secondText}
            className="relative m-0 text-black/85 dark:text-white/85 font-medium leading-none pl-12"
            style={{
              fontSize,
              height: 'auto',
              lineHeight: '1',
            }}
          >
            CReATiVITY <span className="dot">*</span>
          </p>
          {/*<div
            ref={thirdText}
            className="relative m-0 text-black/85 text-4xl lg:text-[150px] font-normal lg:font-medium pl-12"
          >
            DeVELoPiNG <span className="dot">*</span>
          </div>*/}
        </div>
      </div>
    </div>
  );
}
