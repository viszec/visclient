"use client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useScroll } from "framer-motion";
import Rounded from "@/common/RoundedButton";
import Image from "next/image";

// Animation variants for text reveal
const slideUp = {
  initial: {
    y: "100%",
  },
  open: (i: number) => ({
    y: "0%",
    transition: { duration: 0.7, delay: 0.05 * i },
  }),
  closed: {
    y: "100%",
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
  const phrase =
    "BRINGING  DIGITAL  IDEAS  TO  LIFE  WITH  CARE  AND  CRAFT. CREATING  MEMORABLE  WEB EXPERIENCES  FOR  FORWARD-THINKING  BRANDS.  LET'S  EXPLORE  NEW  FRONTIERS  IN  DESIGN TOGETHER.";
  const [isAnimating, setIsAnimating] = useState(false);
  const { scrollY } = useScroll();
  const { ref, entry } = useInView({
    // Only need to detect when section is in view
    // No need for multiple thresholds since we're using scrollY position
    threshold: 0,
    rootMargin: "100px 0px", // Slightly extend detection range
  });

  useEffect(() => {
    let lastScrollY = scrollY.get();
    const sectionTop =
      (entry?.target?.getBoundingClientRect()?.top ?? 0) + window.scrollY;
    const sectionHeight = entry?.target?.getBoundingClientRect()?.height ?? 0;

    const unsubscribe = scrollY.on("change", (current) => {
      const direction = current > lastScrollY ? "down" : "up";
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

      if (direction === "down") {
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
        if (
          relativeScroll >= sectionHeight * 0.4 &&
          relativeScroll <= sectionHeight * 0.9
        ) {
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

  return (
    <section
      id="about"
      ref={ref}
      className="section flex min-h-[800px] px-4 lg:px-28 mt-12 lg:mt-36 md:mt- sm:mt-46 text-4xl pb-12 justify-center"
    >
      <div className="section-container flex gap-4 lg:gap-12 relative pt-12 lg:pt-28">
        {/* Main heading - takes up 60% of space */}
        <div className="w-[50%] lg:w-[60%]">
          <p className="m-0 text-lg lg:text-[3rem] leading-[1.1] tracking-tight font-semibold">
            {phrase.split(" ").map((word, index) => (
              <span
                key={index}
                className="inline-block overflow-hidden mr-[0.15em]"
              >
                <motion.span
                  className="inline-block font-grotesk"
                  variants={slideUp}
                  custom={index}
                  initial="initial"
                  animate={isAnimating ? "open" : "closed"}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </p>
        </div>

        {/* Description - takes up 40% of space */}
        <div className="w-[50%] lg:w-[38%] relative">
          <motion.div
            className="flex-1"
            variants={fadeIn}
            initial="initial"
            animate={isAnimating ? "open" : "closed"}
          >
            <div className="flex flex-col items-start space-y-3 mt-12 lg:mt-0">
              <div className="pb-6">
                <Image
                  src="/icons/arrow.svg"
                  alt="arrow"
                  width={18}
                  height={18}
                  priority
                />
              </div>
              <h1 className="text-2xl lg:text-4xl font-bold pb-4">MOTIVATION</h1>
              <p className="m-0 text-xs lg:text-base font-light text-gray-500 leading-tight lg:leading-relaxed">
                Digital excellence is driven by an unwavering commitment to
                innovation and precision. As a web designer and developer, I
                find deep motivation in transforming complex challenges into
                elegant solutions. Each design element - from pixel-perfect
                layouts to seamless interactions - becomes a deliberate step in
                crafting meaningful user experiences. Drawing from a passion for
                emerging technologies, I focus on creating solutions that not
                only captivate but solve real business challenges. This journey
                of continuous growth fuels my mission: to inspire, engage, and
                deliver digital experiences that leave a lasting impact in our
                ever-evolving landscape.
              </p>
            </div>

            {/* About me button - positioned absolutely */}
            <div
              className="absolute lg:top-[12em] lg:-left-16"
              data-scroll
              data-scroll-speed={0.1}
            >
              <Rounded className="rounded-button !border-0 !w-24 !h-24 lg:!w-40 lg:!h-40">
                <p className="m-0 text-sm lg:text-2xl font-light relative z-[2]">
                  About me
                </p>
              </Rounded>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
