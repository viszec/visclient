"use client";

import { useRef } from 'react';
import Card from '@/components/common/Card';
import ReactLenis from '@studio-freight/react-lenis';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
    frontSrc: "/images/card-front.png",
    frontAlt: "Frontend Development",
    backText: "React, Next.js, TypeScript"
  },
  {
    id: 2,
    frontSrc: "/images/card-front.png",
    frontAlt: "UI/UX Design",
    backText: "Figma, Adobe XD"
  },
  {
    id: 3,
    frontSrc: "/images/card-front.png",
    frontAlt: "Backend Development",
    backText: "Node.js, Express"
  },
  {
    id: 4,
    frontSrc: "/images/card-front.png",
    frontAlt: "DevOps",
    backText: "Docker, AWS"
  }
];

const POSITIONS = [14, 38, 62, 86];
const ROTATIONS = [-15, -7.5, 7.5, 15];

export default function Skills() {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const containerEl = container.current;
    if (!containerEl) return;
    
    const cardsSection = containerEl.querySelector(".cards");
    if (!cardsSection) return;

    const cards = cardRefs.current.filter(Boolean);
    const totalScrollHeight = window.innerWidth * 3;

    // Pin cards section
    ScrollTrigger.create({
      trigger: cardsSection,
      start: "top top",
      end: () => `+=${totalScrollHeight}`,
      pin: true,
      pinSpacing: true,
    });

    // Spread cards animation
    cards.forEach((card, index) => {
      gsap.to(card, {
        left: `${POSITIONS[index]}%`,
        rotation: `${ROTATIONS[index]}`,
        ease: "none",
        scrollTrigger: {
          trigger: cardsSection,
          start: "top top",
          end: () => `+=${totalScrollHeight}`,
          scrub: 0.5,
        }
      });
    });

    // Flip cards animation with stagger
    cards.forEach((card, index) => {
      const frontEl = card?.querySelector(".flip-card-front");
      const backEl = card?.querySelector(".flip-card-back");
      
      if (!frontEl || !backEl || !card) return;

      const staggerOffset = index * 0.5;
      const startOffset = 1 / 3 + staggerOffset;
      const endOffset = 2 / 3 + staggerOffset;

      ScrollTrigger.create({
        trigger: cardsSection,
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress >= startOffset && progress <= endOffset) {
            const animationProgress = (progress - startOffset) / (1 / 3);
            const frontRotation = -180 * animationProgress;
            const backRotation = 180 - 180 * animationProgress;
            const cardRotation = ROTATIONS[index] * (1 - animationProgress);

            gsap.to(frontEl, { 
              rotationY: frontRotation, 
              ease: "power1.out" 
            });
            gsap.to(backEl, { 
              rotationY: backRotation, 
              ease: "power1.out" 
            });
            gsap.to(card, {
              xPercent: -50,
              yPercent: -50,
              rotation: cardRotation,
              ease: "power1.out",
            });
          }
        },
      });
    });

    // Mouse interactions
    const handleMouseEnter = () => {
      cards.forEach((card, index) => {
        gsap.to(card, {
          top: '50%',
          left: '50%',
          rotation: 0,
          delay: index * 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseLeave = () => {
      cards.forEach((card, index) => {
        gsap.to(card, {
          top: '50%',
          left: '50%',
          rotation: 0,
          delay: index * 0.2,
          ease: "power1.out",
        });
      });
    };

    containerEl.addEventListener('mouseenter', handleMouseEnter);
    containerEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      containerEl.removeEventListener('mouseenter', handleMouseEnter);
      containerEl.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: container });

  return (
    <ReactLenis root>
      <div className="m-0 p-0 box-border" ref={container}>
        <section className="relative w-full min-h-screen bg-black">
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         text-white text-center text-[5vw] font-light leading-none">
            SERVICES <br /> WHAT I OFFER
          </h1>
        </section>
        <section className="relative w-full min-h-screen bg-black cards">
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