'use client';

import { useRef } from 'react';

import Image from 'next/image';

import { motion, useScroll, useTransform } from 'framer-motion';

//import Rounded from "@/components/common/RoundedButton";
import ContactForm from '@/components/common/ContactForm';

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  });

  //const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  return (
    <div className="section bg-[#efeee9] pt-20 lg:px-20">
      <div
        id="contact"
        className="relative"
      >
        <motion.div
          style={{ y }}
          ref={container}
          className="flex flex-col items-center justify-center text-[#333] relative"
        >
          <div className="w-full pt-48 md:pt-28 pb-8 md:pb-18 lg:pb-16 lg:pt-30 bg-[#efeee9]">
            <div className="after:block after:mb-10 lg:after:mb-8 pb-2 md:pb-4 lg:pb-8 mx-8 lg:mx-20 relative">
              {/* Main content wrapper - Two column layout */}
              <div className="flex flex-col lg:flex-row lg:gap-10 xl:gap-16 2xl:gap-20">
                {/* Left column - contains title+avatar and description */}
                <div className="lg:w-1/2 xl:w-1/2 flex flex-col">
                  {/* Row 1: Title and Avatar side by side */}
                  <div className="flex flex-row items-start">
                    {/* Title */}
                    <div className="flex flex-col">
                      <h1 className="text-[3rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.4rem] 2xl:text-[5rem] font-just-me-again m-0 font-light self-end">
                        Let&apos;s Create<br />Together
                      </h1>
                    </div>

                    {/* Avatar - aligned with text height */}
                    <div className="hidden lg:block relative w-[160px] xl:w-[200px] 2xl:w-[220px] h-56 xl:h-60 2xl:h-64 pr-0 sm:pr-12 pt-0 sm:pt-12 xl:pt-0 2xl:pt-0 xl:-pl-8 2xl:-ml-8 items-end justify-end ">
                      <Image
                        fill
                        alt="avatar"
                        src="/images/mavis-avatar.webp"
                        className="object-contain 2xl:object-left-center"
                        sizes="(max-width: 1200px) 180px, 200px"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Mobile Avatar - shown only on mobile */}
                  <div className="relative w-[220px] h-[220px] rounded-full overflow-hidden ml-20 -mt-18 mb-2 lg:hidden">
                    <Image
                      fill
                      alt="avatar"
                      src="/images/mavis-avatar.webp"
                      className="object-cover"
                      sizes="(max-width: 768px) 220px"
                      loading="lazy"
                    />
                  </div>

                  {/* Row 2: Description */}
                  <div className="mt-2">
                    <div className="text-[#333]/75 text-sm md:text-base font-light font-baskervville lg:px-0 pr-4 2xl:pr-20 leading-relaxed">
                      <span className="font-medium text-[#333]">This is me:</span> I&apos;m not just a coder 😉 I&apos;m a digital
                      sorcerer who transforms pixels into mesmerizing experiences! ✨ I craft creations that make people
                      exclaim, <span className="italic text-[#333]">&quot;Blimey, that&apos;s brilliant!&quot;</span> when code
                      meets creativity.{' '}
                      <span className="font-medium text-[#333]">
                        Pushing boundaries with AI is my passion, and I thrive on blending technology with
                        artistry.{' '}
                      </span>
                      Fancy turning scrolling into an adventure? Let&apos;s build something coool!
                    </div>
                  </div>
                </div>

                {/* Right column - Contact Form */}
                <div className="lg:w-1/2 xl:w-1/2 md:mt-10 mt-12 lg:mt-0">
                  <motion.svg
                    style={{ rotate, scale: 2 }}
                    className="relative left-[95%] xl:left-[100%] 2xl:left-[80%] lg:top-1 text-[#333]"
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                      fill="currentColor"
                    />
                  </motion.svg>
                  <div className="relative 2xl:pr-32">
                    <ContactForm />
                  </div>
                </div>
              </div>

              {/* Floating Get in touch button */}
              {/*  <motion.div
                style={{ x }}
                className="absolute left-[calc(100%-210px)] top-[calc(100%-55px)] lg:left-[calc(100%-1150px)] lg:top-[calc(100%-215px)]"
              >
                <Rounded
                  backgroundColor="#dd672c"
                  className="lg:!w-32 lg:!h-32 !w-24 !h-24 bg-orange-500 hover:bg-white hover:text-black text-white rounded-full !border-transparent hover:!border-transparent absolute flex items-center justify-center cursor-pointer"
                >
                  <p className="m-0 text-sm lg:text-lg font-light relative z-[2]">
                    Get in touch
                  </p>
                </Rounded>
              </motion.div>

              {/* Arrow SVG */}

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
