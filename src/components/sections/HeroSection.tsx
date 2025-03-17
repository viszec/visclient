'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useScreenSize } from '@/hooks/useScreenSize';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

import SliderText from '@/components/common/SliderText';
import { TechSkills } from '@/components/common/TechSkills';
import { WelcomeIntro } from '@/components/common/WelcomeIntro';
import TiltedCard from '@/components/ui/TiltedCard';
import { Particles } from '@/components/ui/particles';

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
  const [particleColor, setParticleColor] = useState('#ffffff');
  const { width, height } = useScreenSize();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scale, setScale] = useState({ x: 0.4, y: 1 });

  useEffect(() => {
    setParticleColor(theme === 'dark' ? '#ffffff' : '#000000');
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
        className="section-container relative h-full flex items-center justify-center w-full px-6 md:px-12 lg:px-20"
      >
        <div className="section-content flex flex-col items-center justify-center w-full max-w-[1800px]">
          <motion.div
            className="flex flex-col items-center space-y-12 text-center w-full"
            variants={animations.fadeIn}
            initial="initial"
            animate="enter"
            custom={2.8}
          >
            {/* Profile Content */}
            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-8 md:gap-8 lg:gap-12 pt-28 lg:pt-0 pb-14 w-full">
              {/* Avatar with TiltedCard */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 relative flex justify-center md:justify-end lg:justify-end w-full opacity-90">
                <div className="w-[10rem] h-[10rem] md:w-[15rem] md:h-[15rem]">
                  <TiltedCard
                    imageSrc="/images/mavis-avatar.webp"
                    altText="Mavis Avatar"
                    captionText="Mavis"
                    containerHeight="100%"
                    containerWidth="100%"
                    imageHeight={width < 768 ? '16.5rem' : '32rem'}
                    imageWidth={width < 768 ? '16.5rem' : '32rem'}
                    rotateAmplitude={8}
                    scaleOnHover={1.1}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={false}
                    className="rounded-full"
                    overlayContent={<div className="tilted-card-text">Mavis M.</div>}
                  />
                </div>
              </div>

              {/* Description and Tech Skills */}
              <div className="col-span-1 md:col-span-3 lg:col-span-3 flex flex-col items-center md:items-start space-y-4 lg:space-y-8 pt-4 md:pt-0">
                <div className="flex flex-col items-center md:items-start space-y-3 lg:space-y-4 w-full pt-10 lg:pt-0">
                  <div className="flex flex-col items-center md:items-start lg:items-start space-y-2 lg:space-y-3">
                    <Image
                      src="/icons/arrow.svg"
                      alt="arrow"
                      width={18}
                      height={18}
                      className="w-5 h-5 lg:w-6 lg:h-6 hidden md:block"
                      priority
                    />
                    <WelcomeIntro />
                  </div>
                  <div className="flex w-full items-center justify-center max-w-[400px] lg:max-w-[570px]">
                    <TechSkills />
                  </div>
                  <div className="hidden md:flex w-full items-center justify-center py-4">
                    <SliderText />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
