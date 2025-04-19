'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to handle preloader animation
 * @param onComplete - Optional callback to run after animation completes
 * @returns Animation state and control functions
 */
export function usePreloader(onComplete?: () => void) {
  const animationCompletedRef = useRef(false);
  const [showHeroSection, setShowHeroSection] = useState(false);

  // Initialize preloader animation
  useEffect(() => {
    // Import GSAP dynamically to reduce initial bundle size
    const initializeAnimation = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;

      // Create timeline animation
      const tl = gsap.timeline({ paused: false });

      // Text animation and button display
      tl.to('.header > h1', 2, {
        top: 0,
        ease: 'power3.inOut',
        stagger: {
          amount: 0.3,
        },
      });

      // After text animation completes, add delay, then show button
      tl.to('.pre-loader-btn', {
        opacity: 1,
        duration: 0.5,
        delay: 1.5,
        onComplete: function () {
          animationCompletedRef.current = true;
          const btnElement = document.querySelector('.pre-loader-btn') as HTMLElement;
          if (btnElement) btnElement.style.pointerEvents = 'auto';

          // Add cursor pointer to the entire preloader
          const preLoaderElement = document.querySelector('.pre-loader') as HTMLElement;
          if (preLoaderElement) preLoaderElement.style.cursor = 'pointer';
        },
      });

      // Initialize click area
      const preLoaderBtn = document.querySelector('.pre-loader-btn') as HTMLElement;
      if (preLoaderBtn) preLoaderBtn.style.pointerEvents = 'none';
    };

    initializeAnimation();

    // Cleanup function
    return () => {
      // Import GSAP to kill animations on unmount
      import('gsap').then((gsapModule) => {
        const gsap = gsapModule.default;
        // Kill all GSAP animations if component unmounts
        gsap.killTweensOf('.header > h1');
        gsap.killTweensOf('.pre-loader-btn');
      });
    };
  }, []);

  /**
   * Reveals the main site by fading out preloader
   * and triggering hero section animations
   */
  const revealSite = async () => {
    if (!animationCompletedRef.current) return;

    // Import GSAP when needed
    const gsapModule = await import('gsap');
    const gsap = gsapModule.default;
    const tl2 = gsap.timeline();

    // Fade out preloader
    tl2.to('.pre-loader', {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: function () {
        const preLoader = document.querySelector('.pre-loader') as HTMLElement;
        if (preLoader) preLoader.style.display = 'none';
        setShowHeroSection(true);

        // Call the onComplete callback passed from parent component
        if (onComplete) onComplete();
      },
    });

    // After setting showHeroSection to true, we can animate the hero section
    setTimeout(() => {
      import('gsap').then((gsapModule) => {
        const gsap = gsapModule.default;

        // Show main content (now in HeroSection)
        gsap.to('.header-row', 0.8, {
          top: 0,
          ease: 'power4.inOut',
          stagger: {
            amount: 0.2,
          },
          delay: 0.2,
        });

        gsap.from('.navbar, .footer', 2, {
          opacity: 0,
          y: 20,
          ease: 'power4.inOut',
          delay: 0.5,
        });
      });
    }, 1000);
  };

  return {
    animationCompletedRef,
    showHeroSection,
    revealSite,
  };
}
