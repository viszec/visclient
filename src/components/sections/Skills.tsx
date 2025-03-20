'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import ReactLenis from '@studio-freight/react-lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Card from '@/components/common/Card';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  id: number;
  frontSrc: string;
  frontAlt: string;
  backText: string;
}

const CARDS_DATA: CardData[] = [
  {
    id: 1,
    frontSrc: '/images/card-front.png',
    frontAlt: 'Frontend Development',
    backText: 'React, Next.js, TypeScript',
  },
  {
    id: 2,
    frontSrc: '/images/card-front.png',
    frontAlt: 'UI/UX Design',
    backText: 'Figma, Adobe XD',
  },
  {
    id: 3,
    frontSrc: '/images/card-front.png',
    frontAlt: 'Backend Development',
    backText: 'Node.js, Express',
  },
  {
    id: 4,
    frontSrc: '/images/card-front.png',
    frontAlt: 'DevOps',
    backText: 'Docker, AWS',
  },
];

// Card positions from left to right (in percentage)
// Represents the horizontal spread of cards across the viewport
const POSITIONS = [20, 40, 60, 80];

// Rotation angles for each card (in degrees)
// Negative values rotate counterclockwise, positive values rotate clockwise
const ROTATIONS = [-8, -4, 4, 8];

export default function Skills() {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const containerEl = container.current;
      if (!containerEl) return;

      const cardsSection = containerEl.querySelector('.cards');
      if (!cardsSection) return;

      const cards = cardRefs.current.filter(Boolean);

      // Initial state - cards stacked in center with floating animation
      cards.forEach((card) => {
        gsap.set(card, {
          left: '50%',
          top: '45%',
          xPercent: -50,
          yPercent: -50,
          rotation: 0,
        });
      });

      // Create main timeline for the sequence
      cards.forEach((card, index) => {
        const frontEl = card?.querySelector('.flip-card-front');
        const backEl = card?.querySelector('.flip-card-back');

        if (!frontEl || !backEl || !card) return;

        ScrollTrigger.create({
          trigger: cardsSection,
          start: 'top bottom-=10%', // Start when cards section is near viewport bottom
          end: 'bottom top+=10%', // End when cards section is leaving viewport
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;

            // Define animation phases
            const spreadStart = 0.1;
            const spreadEnd = 0.3;
            const flipStart = 0.2;
            const flipEnd = 0.4;
            const reverseStart = 0.6;
            const reverseEnd = 0.8;

            // Calculate phase progress
            const spreadProgress = gsap.utils.clamp(0, 1, (progress - spreadStart) / (spreadEnd - spreadStart));
            const flipProgress = gsap.utils.clamp(0, 1, (progress - flipStart) / (flipEnd - flipStart));
            const reverseProgress = gsap.utils.clamp(0, 1, (progress - reverseStart) / (reverseEnd - reverseStart));

            // Spread animation
            const currentPosition = gsap.utils.interpolate(50, POSITIONS[index], spreadProgress - reverseProgress);

            const currentRotation = gsap.utils.interpolate(0, ROTATIONS[index], spreadProgress - reverseProgress);

            // Apply spread
            gsap.to(card, {
              left: `${currentPosition}%`,
              rotation: currentRotation,
              duration: 0.1,
            });

            // Flip animation
            const frontRotation = -180 * (flipProgress - reverseProgress);
            const backRotation = 180 - 180 * (flipProgress - reverseProgress);

            gsap.to(frontEl, {
              rotationY: frontRotation,
              duration: 0.1,
            });
            gsap.to(backEl, {
              rotationY: backRotation,
              duration: 0.1,
            });
          },
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <ReactLenis root>
      <div
        className="m-0 p-0 box-border"
        ref={container}
      >
        {/* Title section - 30% of viewport height */}
        <section className="relative w-full h-[40vh] bg-white">
          <h1
            className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         text-black text-center text-4xl font-semibold tracking-wide"
          >
            SERVICES WHAT I OFFER
          </h1>
        </section>
        {/* Cards section - 65% of viewport height */}
        <section className="relative w-full h-[55vh] bg-white cards">
          {CARDS_DATA.map((card, index) => (
            <Card
              key={card.id}
              {...card}
              ref={(el: HTMLDivElement | null) => {
                cardRefs.current[index] = el;
              }}
            />
          ))}
        </section>
        {/* <section className="relative w-full h-screen bg-black">
          <h1 className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         text-white text-center text-[5vw] font-light leading-none">
            Footer or Upcoming Section
          </h1>
        </section>
        */}
      </div>
    </ReactLenis>
  );
}
