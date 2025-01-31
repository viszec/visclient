"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Particles } from "@/components/ui/particles";
import { TechSkills } from "@/components/common/TechSkills";
import { useScreenSize } from "@/hooks/useScreenSize";
import SliderText from "@/components/common/SliderText";
import { WelcomeIntro } from "@/components/common/WelcomeIntro";

// Animation variants
const animations = {
  slideUp: {
    initial: { y: 100 },
    enter: {
      y: 0,
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 2.5 },
    },
  },
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    enter: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay },
    }),
  },
};

export default function Hero() {
  const { theme } = useTheme();
  const [particleColor, setParticleColor] = useState("#ffffff");
  const { width, height } = useScreenSize();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scale, setScale] = useState({ x: 0.4, y: 1 });

  useEffect(() => {
    setParticleColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  useEffect(() => {
    // Calculate scale based on viewport size
    const calculateScale = () => {
      if (width < 768) {
        // mobile
        return { x: 1, y: 1 };
      } else if (width < 1024) {
        // tablet
        return { x: 0.7, y: 1 };
      } else {
        // desktop
        return { x: 0.4, y: 1 };
      }
    };

    setScale(calculateScale());
  }, [width]);

  return (
    <section
      id="hero"
      className="relative w-full lg:h-[1250px] md:h-[850px] max-h-screen overflow-hidden"
    >
      {/* Background Container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Background Text */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/images/bg-text.svg"
            fill={true}
            alt="background"
            className="object-cover z-0 [mask-image:linear-gradient(to_top,transparent,white_200px)]
            dark:[mask-image:linear-gradient(to_top,transparent,black_150px)]"
            priority
          />
        </div>

        {/* Particles Effect */}
        <div className="absolute inset-0">
          <Particles
            className="w-full h-full"
            quantity={Math.floor((width * height) / 15000)}
            ease={80}
            color={particleColor}
            refresh
          />
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={animations.slideUp}
        initial="initial"
        animate="enter"
        className="section-container relative h-full flex items-center justify-center"
      >
        <div className="section-content flex flex-col items-center justify-center">
          <motion.div
            className="flex flex-col items-center space-y-12 text-center"
            variants={animations.fadeIn}
            initial="initial"
            animate="enter"
            custom={2.8}
          >
            {/* Profile Content - Changed to row layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 pt-28 lg:pt-0 pb-14">
              {/* Avatar */}
              <div className="relative w-60 h-60 lg:w-120 lg:h-120 rounded-full overflow-hidden opacity-90">
                <Image
                  src="/images/mavis-avatar.webp"
                  alt="avatar"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Description and Tech Skills */}
              <div className="flex flex-col items-start space-y-2 lg:space-y-6">
                <div className="flex flex-col items-start space-y-1 lg:space-y-2">
                  <div className="flex flex-col items-start lg:items-start lg:space-y-1">
                    <Image
                      src="/icons/arrow.svg"
                      alt="arrow"
                      width={18}
                      height={18}
                      className="w-5 h-5 lg:w-6 lg:h-6"
                      priority
                    />
                    <WelcomeIntro />
                  </div>
                  <div className="flex w-full items-start justify-start pt-1 lg:pt-0">
                    <TechSkills />
                  </div>
                  <div className="py-6">
                    <SliderText />
                  </div>

                  {/*<h1 className="text-3xl lg:text-5xl font-light text-black">
                  {/*<h1 className="text-3xl lg:text-5xl font-light text-black">
                    CREATIVE
                  </h1>
                  <h2 className="text-2xl lg:text-4xl font-light text-black">
                    Web Designer & Developer
                  </h2>
                  <div className="flex w-7 h-[2px] lg:h-[3px] bg-black/80 my-3" />
                  <div className="flex items-center gap-2 lg:gap-3">
                    <p className="text-lg lg:text-3xl text-black font-light pt-3">
                      What I am interested in
                    </p>
                    <Image
                      src="/icons/arrow.svg"
                      alt="arrow"
                      width={18}
                      height={18}
                      priority
                      className="w-3 h-3 lg:w-5 lg:h-5 rotate-90 transform"
                    />
                  </div>*/}
                </div>

                {/* Tech Skills */}
                {/*<div className="w-full">
                  <TechSkills />
                </div>*/}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
