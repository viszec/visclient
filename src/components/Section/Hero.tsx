"use client";
import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { motion } from "framer-motion";

// Animation variants
const slideUp = {
  initial: {
    y: 300,
  },
  enter: {
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 2.5 },
  },
};

// Remove the unused interface
// interface AnimationRefs {
//   firstText: React.RefObject<HTMLParagraphElement>
//   secondText: React.RefObject<HTMLParagraphElement>
//   slider: React.RefObject<HTMLDivElement>
// }

export default function Hero() {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  let xPercent = 0;
  let direction = -1;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  return (
    <div className="section-wrapper">
      <section id="hero" className="section">
        <motion.main
          variants={slideUp}
          initial="initial"
          animate="enter"
          className="relative flex h-screen"
        >
          <Image
            src="/images/ver2.png"
            fill={true}
            alt="background"
            className="object-cover"
            priority
          />

          {/* Slider Container */}
          <div className="absolute top-[calc(100vh-350px)]">
            <div ref={slider} className="relative whitespace-nowrap">
              <p
                ref={firstText}
                className="relative m-0 text-white text-[230px] font-medium pr-12"
              >
                INNÖVATION <span className="dot">•</span>
              </p>
              <p
                ref={secondText}
                className="absolute left-full top-0 m-0 text-white text-[230px] font-medium pr-12"
              >
                CReATiVITY <span className="dot">•</span>
              </p>
            </div>
          </div>

          {/* Description */}
          <div
            data-scroll
            data-scroll-speed={0.1}
            className="absolute top-1/3 left-2/3 text-white text-2xl font-light"
          >
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-200 mb-24"
            >
              <path
                d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                fill="white"
              />
            </svg>
            <p className="w-full m-0 mb-2.5">CREATIVE</p>
            <p className="w-full m-0 mb-2.5">Web Designer & Developer</p>
            <p className="w-1/2 m-0 mb-2.5"> - </p>
            <p className="w-1/2 m-0 mb-2.5">
              JavaScript, React, Next.js, TypeScript, Tailwind CSS, GSAP, Node.js
            </p>
          </div>
        </motion.main>
      </section>
    </div>
  );
}
