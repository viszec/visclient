'use client';

import { useEffect, useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';

import Card from '@/components/common/Card';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  id: number;
  frontSrc: string;
  frontAlt: string;
  title: string;
  description: string;
  services: string[];
  stacks?: string;
  tools?: string;
}

const CARDS_DATA: CardData[] = [
  {
    id: 1,
    frontSrc: '/images/cover-card.svg',
    frontAlt: 'Frontend Development',
    title: 'Frontend Development',
    description: 'Modern, responsive web experiences with pixel-perfect UI',
    services: [
      'React & Next.js Apps',
      'TypeScript Integration',
      'Responsive Interfaces',
      'Performance Optimization',
      'Interactive Animations',
    ],
    stacks: 'React, Next.js, TypeScript, TailwindCSS, ShadcnUI, GSAP, Cursor, MCP',
  },
  {
    id: 2,
    frontSrc: '/images/cover-card.svg',
    frontAlt: 'Backend & API Solutions',
    title: 'Backend & API Solutions',
    description: 'Robust APIs, CMS integration & server-side functionality',
    services: ['REST & GraphQL APIs', 'Database Design', 'Headless CMS', 'Serverless Functions', 'Auth Systems'],
    stacks: 'Node.js, Express, MongoDB, Strapi, Contentful, Firebase, AWS Lambda',
  },
  {
    id: 3,
    frontSrc: '/images/cover-card.svg',
    frontAlt: 'Digital Marketing',
    title: 'Digital Marketing',
    description: 'Data-driven strategies to boost online visibility & growth',
    services: ['SEO Optimization', 'Social Media Marketing', 'Google Ads', 'Content Creation', 'Analytics & Reporting'],
    tools: 'Google Analytics, Google Ads, Pagespeed Insights, SEMrush',
  },
  {
    id: 4,
    frontSrc: '/images/cover-card.svg',
    frontAlt: 'UX/UI Design',
    title: 'UX/UI Design',
    description: 'Intuitive, user-centered interfaces with modern aesthetics',
    services: ['User Research', 'Wireframing', 'Interaction Design', 'Design Systems', 'AI-powered 10px precision'],
    tools: 'Figma, Storybook, Relume',
  },
];

// Desktop - Horizontal position distribution (X-axis)
const POSITIONS = [20, 40, 60, 80];

// Mobile - Vertical position distribution (Y-axis) - Increased spacing to prevent card overlap
const MOBILE_Y_POSITIONS = [15, 38, 61, 84]; // Vertical distribution from top to bottom, increased spacing

// Desktop - Rotation angle
const ROTATIONS = [-4, -2, 2, 4];

// Mobile - Rotation angle, slightly smaller but consistent direction
const MOBILE_ROTATIONS = [-4, -2, 2, -3];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  // Add a ref to track ScrollTrigger instances
  const triggerRefs = useRef<ScrollTrigger[]>([]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Function to clear all ScrollTrigger instances
  const clearTriggers = () => {
    triggerRefs.current.forEach((trigger) => {
      if (trigger) trigger.kill();
    });
    triggerRefs.current = [];
  };

  useGSAP(
    () => {
      const containerEl = container.current;
      if (!containerEl) return;

      const cardsSection = containerEl.querySelector('.cards');
      if (!cardsSection) return;

      // First clear all existing triggers
      clearTriggers();

      const titleSection = containerEl.querySelector('.title-section');
      const titleElement = titleSection?.querySelector('h1');
      const descriptionElement = titleSection?.querySelector('p');

      // Fade-in/Fade-out animation for title section
      if (titleSection && titleElement && descriptionElement) {
        gsap.set([titleElement, descriptionElement], {
          opacity: 0,
          y: 30,
        });

        // Title element animation
        gsap.fromTo(
          titleElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleSection,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              markers: false,
            },
          }
        );

        // Description element animation with slight delay
        gsap.fromTo(
          descriptionElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleSection,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              markers: false,
            },
          }
        );
      }

      const cards = cardRefs.current.filter(Boolean);

      // Separate mobile and desktop animations
      if (isMobile) {
        console.log('Setting up mobile animations');

        // Initial state - All cards stacked at first card position
        cards.forEach((card, index) => {
          const frontEl = card?.querySelector('.flip-card-front');
          const backEl = card?.querySelector('.flip-card-back');

          if (!frontEl || !backEl || !card) return;

          // Initial position setup - All cards start from first card position
          gsap.set(card, {
            left: '50%', // Horizontal center
            top: MOBILE_Y_POSITIONS[0] + '%', // All cards start at first card position
            xPercent: -50, // Horizontal center
            yPercent: -50, // Vertical center
            rotation: MOBILE_ROTATIONS[index], // Keep rotation angle
            scale: 0.85, // Shrink ratio
            opacity: 1, // Fully opaque
            zIndex: 10 - index, // Ensure correct stacking order
          });

          // Set initial flip state - Initial flip state
          gsap.set(frontEl, { rotationY: 0 });
          gsap.set(backEl, { rotationY: 180 });
        });

        // First step: When entering service area, expand cards down
        const expandTrigger = ScrollTrigger.create({
          trigger: cardsSection, // Trigger point is card section
          start: 'top 70%', // When card section top is接近视图
          end: 'top 30%', // When card section further enters view
          scrub: 0.5, // Smooth transition
          markers: false,
          onUpdate: (self) => {
            const progress = self.progress;

            // As scroll progresses, gradually move cards to their final positions
            cards.forEach((card, index) => {
              if (!card) return;

              // Calculate the position the current card should be at (gradually moving from initial position to final position)
              const startPos = MOBILE_Y_POSITIONS[0]; // Starting position for all cards (first card position)
              const endPos = MOBILE_Y_POSITIONS[index]; // Final position for each card
              const currentPos = gsap.utils.interpolate(startPos, endPos, progress);

              gsap.to(card, {
                top: `${currentPos}%`,
                duration: 0.1, // Quick scroll follow
                ease: 'power1.out',
              });
            });
          },
        });

        triggerRefs.current.push(expandTrigger);

        // Second step: When scrolling continues, flip each card individually, but keep the card position unchanged
        cards.forEach((card, index) => {
          const frontEl = card?.querySelector('.flip-card-front');
          const backEl = card?.querySelector('.flip-card-back');

          if (!frontEl || !backEl || !card) return;

          // Create a flip trigger for each card, set different triggers based on index to achieve sequential flipping
          const flipTrigger = ScrollTrigger.create({
            trigger: cardsSection, // Use card section as trigger point
            start: `top+=${index * 15}% center`, // Offset trigger timing based on card index
            end: `top+=${index * 15 + 15}% center`, // Expand flip range to smooth animation
            scrub: 0.6, // Increase scrub value to smooth flip
            markers: false,
            onUpdate: (self) => {
              // Flip progress
              const flipProgress = self.progress;

              // Apply flip, increase duration to smooth animation
              gsap.to(frontEl, {
                rotationY: 180 * flipProgress,
                duration: 0.4, // Increase duration value
                ease: 'power2.inOut',
              });

              gsap.to(backEl, {
                rotationY: 180 - 180 * flipProgress,
                duration: 0.4, // Increase duration value
                ease: 'power2.inOut',
              });

              // Slightly scale when flipping
              gsap.to(card, {
                scale: 0.85 + 0.1 * flipProgress, // Increase scale from 0.85 to 0.95
                duration: 0.4, // Match duration with flip animation
              });
            },
          });

          triggerRefs.current.push(flipTrigger);
        });
      } else {
        console.log('Setting up desktop animations');

        /* Desktop animations */
        // Initial state - Cards stacked in the center
        cards.forEach((card) => {
          gsap.set(card, {
            left: '50%',
            top: '20%',
            xPercent: -50,
            yPercent: -50,
            rotation: 0,
            clearProps: 'all', // Clear previously applied properties
          });
        });

        // Create main timeline for each card
        cards.forEach((card, index) => {
          const frontEl = card?.querySelector('.flip-card-front');
          const backEl = card?.querySelector('.flip-card-back');

          if (!frontEl || !backEl || !card) return;

          const trigger = ScrollTrigger.create({
            trigger: cardsSection,
            start: 'top bottom-=10%',
            end: 'bottom top+=10%',
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;

              // Define animation stages
              const spreadStart = 0.1;
              const spreadEnd = 0.3;
              const flipStart = 0.2;
              const flipEnd = 0.4;
              const reverseStart = 0.6;
              const reverseEnd = 0.8;

              // Calculate stage progress
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

          // Store trigger reference
          triggerRefs.current.push(trigger);
        });
      }
    },
    { scope: container, dependencies: [isMobile] }
  );

  return (
    <ReactLenis root>
      <section
        id="services"
        className="m-0 p-0 box-border mt-32 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
        ref={container}
      >
        {/* Title section - 30% of viewport height */}
        <div className="relative w-full h-[12vh] bg-[#efeee9] top-2/5 title-section">
          <h1
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 
                        text-center font-semibold font-baskervville tracking-wide text-lg lg:text-[2rem] xl:text-[2.5rem] 2xl:text-[3rem] leading-none text-[#333]
                        w-[90%] sm:w-[80%] md:w-[70%] lg:w-auto"
          >
            SERVICES WHAT I OFFER
          </h1>
          <p className="text-center text-xs sm:text-sm 2xl:text-base text-[#333]/60 pt-8 xl:pt-14 2xl:pt-16 mx-auto font-light px-0 lg:px-6">
            Elevating brands with AI-powered precision down to the last 10px. <br /> Fast delivery with zero compromise
            on quality guaranteed.
          </p>
        </div>

        {/* Cards section - adjust height for mobile */}
        <div className={`relative w-full ${isMobile ? 'h-[210vh]' : 'h-[65vh]'} bg-[#efeee9] cards`}>
          {CARDS_DATA.map((card, index) => (
            <Card
              key={card.id}
              {...card}
              ref={(el: HTMLDivElement | null) => {
                cardRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </section>
    </ReactLenis>
  );
}
