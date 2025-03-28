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
    <div className="section bg-black">
      <div
        id="contact"
        className="relative"
      >
        <motion.div
          style={{ y }}
          ref={container}
          className="flex flex-col items-center justify-center text-white relative"
        >
          <div className="w-full pt-72 md:pt-28 pb-8 md:pb-18 lg:pb-16 lg:pt-30 bg-black/85">
            <div className="after:block after:mb-10 lg:after:mb-8 pb-2 md:pb-4 lg:pb-8 mx-8 lg:mx-20 relative">
              {/* Main content wrapper */}
              <div className="flex flex-col lg:flex-row lg:gap-20">
                {/* Left side - Title Section */}
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 lg:w-28 h-16 lg:h-28 rounded-full overflow-hidden ml-4 lg:ml-10">
                      <Image
                        fill
                        alt="avatar"
                        src="/images/avatar.webp"
                        className="object-cover"
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 25vw"
                        width={0}
                        height={0}
                        loading="lazy"
                      />
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-light font-just-me-again">
                      Let&apos;s Create
                    </h1>
                  </div>
                  <h1 className="flex items-center text-4xl sm:text-6xl md:text-8xl font-just-me-again m-0 font-light ml-10 lg:ml-20">
                    Together
                    <div className="relative inline-block w-[1.2em] h-[1.2em] ml-[0.4em] lg:ml-[0.2em] align-middle">
                      <Image
                        src="/images/smiley.svg"
                        alt="Smiley face"
                        fill
                        className="object-contain"
                        loading="lazy"
                      />
                    </div>
                  </h1>

                  {/* Contact info buttons */}
                  {/* <div className="flex flex-col sm:flex-row lg:flex-col gap-5 mt-8">
                    {CONTACT_INFO.map((info, index) => (
                      <Rounded
                        key={index}
                        className="w-full sm:!w-[180px] sm:!h-[45px] md:!w-[180px] md:!h-[50px] lg:!w-[230px] lg:!h-[65px] 
                                  rounded-full lg:mt-12 !border-[1px] !border-gray-500"
                        onClick={() => (window.location.href = info.href)}
                      >
                        <p className="m-0 text-gray-200 text-sm lg:text-base truncate px-4">
                          {info.text}
                        </p>
                      </Rounded>
                    ))}
                  </div> */}
                  {/* Description */}
                  <div className="mt-8">
                    <div className="text-gray-400 text-sm lg:text-base font-light px-4 lg:!px-20 leading-tight">
                      <span className="font-medium">This is me:</span> I&apos;m not just a coder 😉 I&apos;m a digital
                      sorcerer who transforms pixels into mesmerizing experiences! ✨ I craft creations that make people
                      exclaim, <span className="italic">&quot;Blimey, that&apos;s brilliant!&quot;</span> when code
                      meets creativity.{' '}
                      <span className="font-medium">
                        Pushing boundaries with AI is my passion, and I thrive on blending technology with
                        artistry.{' '}
                      </span>
                      Fancy turning scrolling into an adventure? Let&apos;s build something coool!
                    </div>
                  </div>
                </div>

                {/* Right side - Contact Form */}
                <div className="lg:w-1/3 md:mt-10 mt-12">
                  <ContactForm />
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
              <motion.svg
                style={{ rotate, scale: 2 }}
                className="absolute top-[35%] left-[90%] lg:top-2"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
                  fill="white"
                />
              </motion.svg>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
