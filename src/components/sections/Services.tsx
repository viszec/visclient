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

// Card positions from left to right (in percentage)
// Represents the horizontal spread of cards across the viewport
const POSITIONS = [20, 40, 60, 80];

// Rotation angles for each card (in degrees)
// Negative values rotate counterclockwise, positive values rotate clockwise
const ROTATIONS = [-8, -4, 4, 8];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(
    () => {
      const containerEl = container.current;
      if (!containerEl) return;

      const cardsSection = containerEl.querySelector('.cards');
      if (!cardsSection) return;

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

      // Fade-in/Fade-out for cards section container
      gsap.fromTo(
        cardsSection,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsSection,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
            markers: false,
          },
        }
      );

      const cards = cardRefs.current.filter(Boolean);

      // Apply different animations for mobile and desktop
      if (isMobile) {
        // Mobile animation: Vertical stack with Y-axis flip

        // Initial state - cards stacked vertically
        cards.forEach((card, index) => {
          const frontEl = card?.querySelector('.flip-card-front');
          const backEl = card?.querySelector('.flip-card-back');

          if (!frontEl || !backEl || !card) return;

          // Position cards in a vertical stack
          gsap.set(card, {
            left: '50%',
            top: `${5 + index * 21}%`, // Reduced spacing from 35% to 22%, first card position from 10% to 5%
            xPercent: -50,
            yPercent: -50,
            rotation: ROTATIONS[index] * 0.3, // Added small rotation angle, half strength of desktop version
            scale: 0.85,
          });

          // Set initial flip state
          gsap.set(frontEl, { rotationY: 0 });
          gsap.set(backEl, { rotationY: 180 });

          // Create scroll trigger animation for each card
          ScrollTrigger.create({
            trigger: cardsSection,
            start: `top+=${index * 100} center`, // Adjusted trigger point distance
            end: `top+=${(index + 1) * 120} center`, // Adjusted end point distance
            scrub: 0.5,
            onEnter: () => {
              // Flip card when entering view
              gsap.to(frontEl, {
                rotationY: 180,
                duration: 0.6,
                ease: 'power2.inOut',
              });
              gsap.to(backEl, {
                rotationY: 0,
                duration: 0.6,
                ease: 'power2.inOut',
              });

              // Scale up slightly when flipped
              gsap.to(card, {
                scale: 0.9,
                duration: 0.5,
              });
            },
            onLeaveBack: () => {
              // Flip back when scrolling up past trigger point
              gsap.to(frontEl, {
                rotationY: 0,
                duration: 0.6,
                ease: 'power2.inOut',
              });
              gsap.to(backEl, {
                rotationY: 180,
                duration: 0.6,
                ease: 'power2.inOut',
              });

              // Scale back down
              gsap.to(card, {
                scale: 0.85,
                duration: 0.5,
              });
            },
          });
        });
      } else {
        // Desktop animation - keep original code

        // Initial state - cards stacked in center with floating animation
        cards.forEach((card) => {
          gsap.set(card, {
            left: '50%',
            top: '20%',
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
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container, dependencies: [isMobile] }
  );

  return (
    <ReactLenis root>
      <div
        className="m-0 p-0 box-border mt-32"
        ref={container}
      >
        {/* Title section - 30% of viewport height */}
        <section className="relative w-full h-[30vh] bg-[#efeee9] top-4/5 title-section">
          <h1
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 
                        text-center font-semibold font-baskervville tracking-wide text-lg lg:text-[2rem] xl:text-[2.5rem] 2xl:text-[3rem] leading-none text-[#333]
                        w-[90%] sm:w-[80%] md:w-[70%] lg:w-auto"
          >
            SERVICES WHAT I OFFER
          </h1>
          <p className="text-center text-xs sm:text-sm 2xl:text-base text-[#333]/60 pt-8 xl:pt-14 2xl:pt-16 max-w-3xl mx-auto font-light px-6">
            Elevating brands with AI-powered precision down to the last 10px. <br /> Fast delivery with zero compromise
            on quality guaranteed.
          </p>
        </section>
        {/* Cards section - adjust height for mobile */}
        <section className={`relative w-full ${isMobile ? 'h-[180vh]' : 'h-[65vh]'} bg-[#efeee9] cards`}>
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
