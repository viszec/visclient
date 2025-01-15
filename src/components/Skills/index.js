"use client";

import Card from './Card';
import styles from './style.module.scss';

import ReactLenis from '@studio-freight/react-lenis';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const container = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(() => {
    const cards = cardRefs.current;
    const totalScrollHeight = window.innerWidth * 3;
    const positions = [14, 38, 62, 86];
    const rotations = [-15, -7.5, 7.5, 15];

    // pin cards section
    ScrollTrigger.create({
      trigger: container.current.querySelector(".cards"),
      start: "top top",
      end: () => `+=${totalScrollHeight}`,
      pin: true,
      pinSpacing: true,
    });

    // spread cards on scroll
    cards.forEach((card, index) => {
      gsap.to(card, {
        left: `${positions[index]}%`,
        rotation: `${rotations[index]}`,
        ease: "none",
        scrollTrigger: {
          trigger: container.current.querySelector(".cards"),
          start: "top top",
          end: () => `+=${totalScrollHeight}`,
          scrub: 0.5,
          id: `spread-${index + 1}`,
        }
      });
    });

    // flip cards and reset rotation with stagger
    cards.forEach((card, index) => {
      const frontEl = card.querySelector(".flipCardFront");
      const backEl = card.querySelector(".flipCardBack");

      const staggerOffset = index * 0.5;
      const startOffset = 1 / 3 + staggerOffset;
      const endOffset = 2 / 3 + staggerOffset;

      ScrollTrigger.create({
        trigger: container.current.querySelector(".cards"),
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        scrub: 1,
        id: `rotate-flip-${index}`,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress >= startOffset && progress <= endOffset) {
            const animationProgress = (progress - startOffset) / (1 / 3);
            const frontRotation = -180 * animationProgress;
            const backRotation = 180 - 180 * animationProgress;
            const cardRotation = rotations[index] * (1 - animationProgress);

            gsap.to(frontEl, { rotationY: frontRotation, ease: "power1.out" });
            gsap.to(backEl, { rotationY: backRotation, ease: "power1.out" });
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

    // Handle mouse enter and leave events
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

    container.current.addEventListener('mouseenter', handleMouseEnter);
    container.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.current.removeEventListener('mouseenter', handleMouseEnter);
      container.current.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, { scope: container });

  return (
    <>
      <ReactLenis root>
        <div className={styles.skills} ref={container}>
          <section className={styles.skillsSection}>
            <h1 className={styles.skillsH1}>
              Keep scrolling to <br /> reveal the cards
            </h1>
          </section>
          <section className={`${styles.skillsSection} cards`}>
            {[...Array(4)].map((_, index) => (
              <Card
                key={index}
                id={index + 1}
                frontSrc="/images/card-front.png"
                frontAlt="Card Image"
                backText="Your card details appear here"
                ref={(el) => (cardRefs.current[index] = el)}
              />
            ))}
          </section>
          <section className={styles.skillsSection}>
            <h1 className={styles.skillsH1}>Footer or Upcoming Section</h1>
          </section>
        </div>
      </ReactLenis>
    </>
  );
};

export default Skills;