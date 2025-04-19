'use client';

import { useEffect, useRef, useState } from 'react';

import '@/app/globals.css';
import { gsap } from 'gsap';

/**
 * PreloaderCount component
 * Creates an animated counting preloader with star-shaped reveal transition
 * @param {Object} props - Component props
 * @param {Function} props.onComplete - Function to call when animation completes
 */
export default function PreloaderCount({ onComplete }: { onComplete?: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [showRevealers, setShowRevealers] = useState(false);

  useEffect(() => {
    if (!loaderRef.current) return;

    const windowWidth = window.innerWidth;
    const wrapperWidth = 170;
    const finalPosition = windowWidth - wrapperWidth;
    const stepDistance = finalPosition / 5.5;

    // Create timeline for count animation
    const tl = gsap.timeline();

    // Initial animation: move numbers off-screen
    tl.to('.count', {
      x: -900,
      duration: 0.85,
      delay: 0.5,
      ease: 'power4.inOut',
    });

    // Create 9 sequential animation steps with slower speed
    for (let i = 0; i < 9; i++) {
      const xPosition = -900 + i * 180;

      // Make each step slightly slower than the previous one
      const duration = 0.85 + i * 0.05;

      tl.to('.count', {
        x: xPosition,
        duration: duration,
        ease: 'power4.inOut',
        onStart: () => {
          // Synchronize count-wrapper movement
          gsap.to('.count-wrapper', {
            x: stepDistance * i,
            duration: duration,
            ease: 'power4.inOut',
          });

          // On the last step (when we reach 99), show the revealers
          if (i === 8) {
            setShowRevealers(true);
          }
        },
      });
    }

    // Cleanup function to kill all animations on unmount
    return () => {
      gsap.killTweensOf('.count');
      gsap.killTweensOf('.count-wrapper');
      gsap.killTweensOf('.revealer img');
    };
  }, []);

  // Effect for revealer animations that only runs when showRevealers becomes true
  useEffect(() => {
    if (!showRevealers) return;

    // Set initial state for all revealer elements
    gsap.set('.revealer img', { scale: 0 });

    // Define delays for each revealer animation (faster now)
    const delays = [0.1, 0.25, 0.4];

    // Animate each revealer with staggered delays and faster speed
    document.querySelectorAll('.revealer img').forEach((el, i) => {
      gsap.to(el, {
        scale: 65,
        duration: 1.2, // Slightly faster animation
        ease: 'power3.out', // Changed easing for faster initial expansion
        delay: delays[i],
        onComplete: () => {
          // When last revealer animation completes
          if (i === delays.length - 1) {
            // Important change: No longer remove the loader element, but call onComplete
            // The processing will be completed in the Preloader component
            if (onComplete) {
              onComplete();
            }
          }
        },
      });
    });
  }, [showRevealers, onComplete]);

  return (
    <div
      className="loader fixed top-0 left-0 w-full h-full bg-transparent text-[#E6E5DF] flex items-end overflow-hidden"
      ref={loaderRef}
    >
      <div className="count-wrapper relative w-[160px] h-[340px] [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] will-change-transform">
        <div className="count relative w-[1440px] h-[360px] flex -translate-x-[1440px] will-change-transform">
          <div className="digit relative w-[180px] h-[360px] p-4">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] font-ppeditorialoldultralight font-thin leading-none text-[#e6e5df16]">
              9
            </h1>
          </div>
          <div className="digit relative w-[180px] h-[360px] p-4">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] font-ppeditorialoldultralight font-thin leading-none text-[#e6e5df16]">
              8
            </h1>
          </div>
          <div className="digit relative w-[180px] h-[360px] p-4">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] font-ppeditorialoldultralight font-thin leading-none text-[#e6e5df16]">
              6
            </h1>
          </div>
          <div className="digit relative w-[180px] h-[360px] p-4">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] font-ppeditorialoldultralight font-thin leading-none text-[#e6e5df16]">
              4
            </h1>
          </div>
          <div className="digit relative w-[180px] h-[360px] p-4">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] font-ppeditorialoldultralight font-thin leading-none text-[#e6e5df16]">
              2
            </h1>
          </div>
          <div className="digit relative w-[180px] h-[360px] p-4">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] font-ppeditorialoldultralight font-thin leading-none text-[#e6e5df16]">
              0
            </h1>
          </div>
        </div>
      </div>

      <div className="count-wrapper relative w-[160px] h-[340px] [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] will-change-transform">
        <div className="count relative w-[1440px] h-[360px] flex -translate-x-[1440px] will-change-transform">
          <div className="digit relative w-[180px] h-[360px] p-4">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] font-ppeditorialoldultralight font-thin leading-none text-[#e6e5df16]">
              9
            </h1>
          </div>
          <div className="digit relative w-[180px] h-[360px] p-4">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] font-ppeditorialoldultralight font-thin leading-none text-[#e6e5df16]">
              5
            </h1>
          </div>
          <div className="digit relative w-[180px] h-[360px] p-4">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] font-ppeditorialoldultralight font-thin leading-none text-[#e6e5df16]">
              8
            </h1>
          </div>
          <div className="digit relative w-[180px] h-[360px] p-4">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] font-ppeditorialoldultralight font-thin leading-none text-[#e6e5df16]">
              7
            </h1>
          </div>
          <div className="digit relative w-[180px] h-[360px] p-4">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] font-ppeditorialoldultralight font-thin leading-none text-[#e6e5df16]">
              6
            </h1>
          </div>
          <div className="digit relative w-[180px] h-[360px] p-4">
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[320px] font-ppeditorialoldultralight font-thin leading-none text-[#e6e5df16]">
              0
            </h1>
          </div>
        </div>
      </div>

      {showRevealers && (
        <>
          <div className="revealer revealer-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src="/images/revealer-1.svg"
              alt="Revealer 1"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="revealer revealer-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src="/images/revealer-2.svg"
              alt="Revealer 2"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="revealer revealer-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src="/images/revealer-3.svg"
              alt="Revealer 3"
              className="w-full h-full object-cover"
            />
          </div>
        </>
      )}
    </div>
  );
}
