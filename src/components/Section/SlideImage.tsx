'use client'

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';

interface SlideItem {
  color: string;
  src: string;
}

const slider1: SlideItem[] = [
  {
    src: "acornLedger.webp",
    color: "#BA72D0",
  },
  {
    src: "hivestream.webp",
    color: "#D18F52",
  },
  {
    src: "cognix.webp",
    color: "#000009",
  },
  {
    src: "nestease.webp",
    color: "#596E65",
  }
];

const slider2: SlideItem[] = [
  {
    src: "opcc.webp",
    color: "#4BA5D2",
  },
  {
    src: "pp.webp",
    color: "#EFE8D3",
  },
  {
    src: "brightonelc.webp",
    color: "#98B4CD",
  },
  {
    src: "astra.webp",
    color: "#76BCC2",
  }
];

export default function SlidingImages() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.95], [50, 0]);

  return (
    <div className="section-wrapper" style={{ backgroundColor: '#f5f5f5' }}>
      <section id="slide-image" className="section">
        <div className="section-content">
          <div 
            ref={container} 
            className="flex flex-col gap-[3vw] relative mt-[200px] z-[1]"
          >
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
                        className="object-contain rounded-2xl max-w-full max-h-[16vw]"
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

            <motion.div 
              style={{ height }} 
              className="relative mt-[100px]"
            >
              <div 
                className="absolute h-[1440%] w-[120%] -left-[10%]"
                style={{
                  borderRadius: '0 0 50% 50% / 100%',
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

        <div 
          className="absolute h-[1440%] w-[120%] -left-[10%]"
          style={{
            borderRadius: '0 0 50% 50% / 100%',
            background: 'linear-gradient(to bottom, transparent, #fff)',
            zIndex: 0
          }}
        />
      </section>
    </div>
  );
}