'use client';

import { useEffect, useState } from 'react';

//import Rounded from "@/components/common/RoundedButton";
import Image from 'next/image';

import { motion, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import CircularText from '@/components/ui/TextAnimations/CircularText/CircularText';
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal';

// Animation variants for text reveal
const slideUp = {
  initial: {
    y: '100%',
  },
  open: (i: number) => ({
    y: '0%',
    transition: { duration: 0.7, delay: 0.05 * i },
  }),
  closed: {
    y: '100%',
    transition: { duration: 0.5 },
  },
};

// Animation variants for paragraph
const fadeIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  open: {
    opacity: 1,
    y: 10,
    transition: { duration: 0.6, delay: 0.2 },
  },
  closed: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.6 },
  },
};

export default function About() {
  // Define special words in an object for individual styling
  const specialWords: { [key: string]: string } = {
    CRAFT: 'text-green-500 font-bold',
    MEMORABLE: 'text-[#333]/50 font-medium',
    'FORWARD-THINKING': 'text-[#333]/50 font-light',
    FRONTIERS: 'text-[#333]/50 text-[2rem] xl:text-[2.8rem] 2xl:text-[4.2rem] font-just-me-again font-bold',
  };

  // Common words
  const phraseWords = [
    'BRINGING',
    'DIGITAL',
    'IDEAS',
    'TO',
    'LIFE',
    'WITH',
    'CARE',
    'AND',
    'CRAFT.',
    'CREATING',
    'MEMORABLE',
    'WEB',
    'EXPERIENCES',
    'FOR',
    'FORWARD-THINKING',
    'BRANDS.',
    "LET'S",
    'EXPLORE',
    'NEW',
    'FRONTIERS',
    'IN',
    'DESIGN',
    'TOGETHER.',
  ];

  //const phrase = phraseWords.join(' ');
  const [isAnimating, setIsAnimating] = useState(false);
  const { scrollY } = useScroll();
  const { ref, entry } = useInView({
    // Only need to detect when section is in view
    // No need for multiple thresholds since we're using scrollY position
    threshold: 0,
    rootMargin: '20px 0px', // Slightly extend detection range
  });

  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    let lastScrollY = scrollY.get();
    const sectionTop = (entry?.target?.getBoundingClientRect()?.top ?? 0) + window.scrollY;
    const sectionHeight = entry?.target?.getBoundingClientRect()?.height ?? 0;

    const unsubscribe = scrollY.on('change', (current) => {
      const direction = current > lastScrollY ? 'down' : 'up';
      const relativeScroll = current - sectionTop;

      /* Animation Trigger Points:
       * Down scroll:
       * - Trigger: When reaching end of Hero (-10% of About section)
       * - Reset: When passing 90% of About section
       *
       * Up scroll:
       * - Trigger: When entering from bottom (70-90% of section)
       * - Keep visible: While in section
       */

      if (direction === 'down') {
        // Trigger when reaching end of Hero
        if (relativeScroll >= -sectionHeight * 0.4 && relativeScroll <= 0) {
          setIsAnimating(true);
        }
        // Reset when near bottom of About
        else if (relativeScroll > sectionHeight * 0.9) {
          setIsAnimating(false);
        }
      } else {
        // Scrolling up
        // Re-entering from bottom
        if (relativeScroll >= sectionHeight * 0.4 && relativeScroll <= sectionHeight * 0.9) {
          setIsAnimating(true);
        }
        // Reset when completely exiting top
        else if (relativeScroll < -sectionHeight * 0.4) {
          setIsAnimating(false);
        }
      }

      lastScrollY = current;
    });

    return () => unsubscribe();
  }, [scrollY, entry]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isAnimating) {
      // Start description animation 0.5s after phrase animation
      timer = setTimeout(() => {
        setShowDescription(true);
      }, 200);
    } else {
      // Reset description when phrase animation resets
      setShowDescription(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAnimating]); // Depend on isAnimating instead of mounting

  return (
    <section
      id="about"
      ref={ref}
      className="section flex min-h-screen lg:min-h-[1000px] bg-[#efeee9] px-4 lg:px-28 mt-12 lg:mt-24 md:mt-24 sm:mt-36 text-4xl lg:pb-0 justify-center relative w-full pt-8 lg:pt-20"
    >
      <div className="section-container flex flex-col lg:flex-row gap-4 lg:gap-12 relative pt-12 lg:pt-28">
        {/* Main heading - takes up full width on mobile, 60% on desktop */}
        <div className="w-full lg:w-[62%]">
          <p className="m-0 text-2xl lg:text-[2.8rem] 2xl:text-[3.2rem] leading-[1.1em] justify-around tracking-tight font-bold text-[#333] pl-4 pr-8 lg:pl-0 lg:pr-0">
            {phraseWords.map((word, index) => (
              <span
                key={index}
                className="inline-block overflow-hidden mr-[0.15em] font-grotesk"
              >
                <motion.span
                  className={`inline-block font-grotesk ${specialWords[word] || ''}`}
                  variants={slideUp}
                  custom={index}
                  initial="initial"
                  animate={isAnimating ? 'open' : 'closed'}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </p>
        </div>

        {/* Description Section - full width on mobile, 38% on desktop */}
        <div className="w-full lg:w-[38%] mt-8 lg:mt-0 relative">
          <motion.div
            className="flex-1"
            variants={fadeIn}
            initial="initial"
            animate={isAnimating ? 'open' : 'closed'}
          >
            <div className="flex flex-col items-start space-y-3">
              <div className="pb-6 pl-4 lg:pl-0">
                <Image
                  src="/icons/arrow.svg"
                  alt="arrow"
                  width={18}
                  height={18}
                  priority
                />
              </div>
              <h1 className="text-2xl xl:text-[2.5rem] 2xl:text-[2.6rem] font-bold text-[#333] pb-4 pl-4 lg:pl-0">
                MOTIVATION
              </h1>
              {showDescription && (
                <div className="m-0 text-sm px-4 lg:pr-16 lg:text-lg 2xl:text-[19px] font-light text-[#333]/60 font-baskervville leading-tight sm:tracking-tight pl-4 lg:pl-0">
                  <VerticalCutReveal
                    splitBy="characters"
                    staggerDuration={0.002}
                    staggerFrom="random"
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 35,
                      delay: 0.1,
                    }}
                    containerClassName="text-[#00000] leading-tight justify-between"
                  >
                    {`Digital excellence is driven by an unwavering commitment to innovation and precision. As a web designer and developer, I find deep motivation in transforming complex challenges into elegant solutions. Each design element, ranging from pixel-perfect layouts through seamless interactions, becomes a deliberate step in crafting meaningful user experiences. Drawing from a passion for emerging technologies, I focus on creating solutions that not only captivate but solve real business challenges. This journey of continuous growth fuels my mission: to inspire, engage, and deliver digital experiences that leave a lasting impact in our ever-evolving landscape.`}
                  </VerticalCutReveal>
                </div>
              )}
            </div>

            {/* About me button */}
            <div
              className="absolute 
                right-12 top-[-3em]          // mobile position
                md:right-auto md:left-[-3.5em] md:top-[13.5em]  // tablet
                laptop:right-auto laptop:left-[-3.5em] laptop:top-[15.5em]  // 13-inch MacBook
                lg:right-auto lg:left-[-3.5em] lg:top-[11.5em]  // larger displays
                transform 
                lg:transform-none 
                mt-8 lg:mt-0"
              data-scroll
              data-scroll-speed={0.1}
            >
              <CircularText
                text="ABOUT·DEVELOPER·MAVIS·☺·"
                onHover="speedUp"
                spinDuration={50}
                className="text-[#e6e5ef] font-normal text-sm tracking-tight bg-[#333]/90 rounded-full relative z-10 hover:scale-105 transition-transform duration-300 p-0 lg:p-10 lg:pt-0"
              />
              {/* <Rounded className="rounded-button !border-0 !w-24 !h-24 lg:!w-40 lg:!h-40">
                <p className="m-0 text-sm lg:text-2xl font-light relative z-[2]">
                  About me
                </p>
              </Rounded> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
