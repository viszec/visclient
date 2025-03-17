'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

interface SlideItem {
  color: string;
  src: string;
}

const slider1: SlideItem[] = [
  {
    src: 'acornLedger.webp',
    color: '#BA72D0',
  },
  {
    src: 'hivestream.webp',
    color: '#D18F52',
  },
  {
    src: 'cognix.webp',
    color: '#000009',
  },
  {
    src: 'nestease.webp',
    color: '#596E65',
  },
];

const slider2: SlideItem[] = [
  {
    src: 'opcc.webp',
    color: '#4BA5D2',
  },
  {
    src: 'pp.webp',
    color: '#EFE8D3',
  },
  {
    src: 'brightonelc.webp',
    color: '#98B4CD',
  },
  {
    src: 'astra.webp',
    color: '#76BCC2',
  },
];

const useScreenWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export default function SlidingImages() {
  const container = useRef<HTMLDivElement>(null);
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 768;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine sliders for mobile carousel
  const mobileSlider = [...slider1, ...slider2];

  // Auto slide effect for mobile
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mobileSlider.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, mobileSlider.length]);

  // Desktop scroll animation setup
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.55], [200, 0]);
  const borderRadiusProgress = useTransform(
    scrollYProgress,
    [0, 0.95],
    [0, 100]
  );

  return (
    <section
      className="section relative"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      <div id="slide-image" className="section-wrapper">
        <div className={`section-content ${isMobile ? 'w-full px-0' : ''}`}>
          <div
            ref={container}
            className="flex flex-col gap-[3vw] relative mt-24 lg:mt-32 z-[1]"
          >
            {isMobile ? (
              <div className="relative w-full">
                <div className="overflow-hidden w-full h-[25vh]">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -300 }}
                      transition={{ duration: 0.5 }}
                      className="absolute w-full h-full"
                    >
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          backgroundColor: mobileSlider[currentIndex].color,
                        }}
                      >
                        <div className="relative w-[90%] h-[80%]">
                          <Image
                            src={`/images/${mobileSlider[currentIndex].src}`}
                            alt="project image"
                            fill
                            className="object-contain"
                            priority
                          />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Pagination dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {mobileSlider.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-black' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <motion.div
                  style={{ x: x1 }}
                  className="flex relative gap-5 w-[120vw] -left-[10vw]"
                >
                  {slider1.map((project, index) => (
                    <div
                      key={index}
                      className="w-1/4 h-[20vw] flex items-center justify-center"
                      style={{ backgroundColor: project.color }}
                    >
                      <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                        <div className="relative w-fit h-fit max-w-full max-h-full">
                          <Image
                            src={`/images/${project.src}`}
                            alt="project image"
                            width={500}
                            height={300}
                            className="object-contain rounded-lg lg:rounded-2xl max-w-full max-h-[16vw]"
                            style={{ width: 'auto', height: 'auto' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
                <motion.div
                  style={{ x: x2 }}
                  className="flex relative gap-[3vw] w-[120vw] -left-[10vw]"
                >
                  {slider2.map((project, index) => (
                    <div
                      key={index}
                      className="w-1/4 h-[20vw] flex items-center justify-center"
                      style={{ backgroundColor: project.color }}
                    >
                      <div className="relative w-4/5 h-4/5">
                        <Image
                          fill
                          alt="project image"
                          src={`/images/${project.src}`}
                          className="object-cover rounded-2xl"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </>
            )}

            <motion.div
              style={{ height }}
              className="relative mt-12 lg:mt-[100px]"
            >
              <motion.div
                className="absolute h-[1440%] w-[120%] -left-[10%]"
                style={{
                  borderRadius: `0 0 ${borderRadiusProgress}% ${borderRadiusProgress}% / ${borderRadiusProgress}%`,
                  background: `linear-gradient(
                    to bottom,
                    #f5f5f5 0%,
                    #f5f5f5 97%,
                    rgba(245, 245, 245, 0.9) 98%,
                    rgba(245, 245, 245, 0.8) 99%,
                    transparent 100%
                  )`,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)',
                  zIndex: 1,
                }}
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute h-[1440%] w-[120%] -left-[10%]"
          style={{
            borderRadius: `0 0 ${borderRadiusProgress}% ${borderRadiusProgress}% / ${borderRadiusProgress}%`,
            background: 'linear-gradient(to bottom, transparent, #fff)',
            zIndex: 0,
          }}
        />
      </div>
    </section>
  );
}
