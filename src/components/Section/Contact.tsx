"use client";
import { useRef } from "react";
import Image from "next/image";
import { useScroll, motion, useTransform } from "framer-motion";
import Rounded from "@/common/RoundedButton";

const CONTACT_INFO = [
  { text: "imavisma@gmail.com", href: "mailto:imavisma@gmail.com" },
  { text: "Let's Connect", href: "tel:+61424209565" },
];

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  return (
    <div className="section bg-black">
      <div id="contact" className="relative">
        <motion.div
          style={{ y }}
          ref={container}
          className="flex flex-col items-center justify-center text-white relative"
        >
          <div className="w-full pt-20 pb-20 lg:pb-18 lg:pt-52 bg-black">
            {/* Title Section */}
            <div className="border-b border-gray-500 pb-12 mx-6 lg:pb-8 lg:mx-20 relative">
              <div className="flex items-center gap-4">
                <div className="relative w-16 lg:w-28 h-16 lg:h-28 rounded-full overflow-hidden ml-4 lg:ml-10">
                  <Image
                    fill
                    alt="avatar"
                    src="/images/avatar.webp"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <h1 className="text-4xl lg:text-8xl font-light ">
                  Let&apos;s Create
                </h1> 
              </div>
              <h1 className="flex items-center text-4xl lg:text-8xl m-0 font-light ml-10 lg:ml-20">
                Together
                <div className="relative inline-block w-[1.7em] h-[1.7em] ml-[0.4em] lg:ml-[0.2em] align-middle">
                  <Image
                    src="/images/smiley.svg"
                    alt="Smiley face"
                    fill
                    className="object-contain"
                  />
                </div>
              </h1>

              <motion.div
                style={{ x }}
                className="absolute left-[calc(100%-210px)] top-[calc(100%-45px)] lg:left-[calc(100%-400px)] lg:top-[calc(100%-175px)]"
              >
                <Rounded
                  backgroundColor="#dd672c"
                  className="lg:!w-52 lg:!h-52 !w-24 !h-24 bg-orange-500 hover:bg-white hover:text-black text-white rounded-full !border-transparent hover:!border-transparent absolute flex items-center justify-center cursor-pointer"
                >
                  <p className="m-0 text-sm lg:text-lg font-light relative z-[2]">
                    Get in touch
                  </p>
                </Rounded>
              </motion.div>

              <motion.svg
                style={{ rotate, scale: 2 }}
                className="absolute top-[30%] left-[95%] lg:top-[50%]"
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

              {/* Navigation Section */}
              <div className="flex flex-col w-3/5 sm:flex-row gap-5 mt-8 lg:mt-14 px-2 lg:px-20">
                {CONTACT_INFO.map((info, index) => (
                  <Rounded
                    key={index}
                    className="w-full sm:!w-[180px] sm:!h-[45px] md:!w-[180px] md:!h-[50px] lg:!w-[230px] lg:!h-[65px] 
                              rounded-full lg:mt-12 lg:mb-16 !border-[1px] !border-gray-500"
                    onClick={() => (window.location.href = info.href)}
                  >
                    <p className="m-0 text-gray-200 text-sm lg:text-base truncate px-4">
                      {info.text}
                    </p>
                  </Rounded>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
