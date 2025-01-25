import { useRef } from "react";
import Image from "next/image";
import { useScroll, motion, useTransform } from "framer-motion";
import Rounded from "@/common/RoundedButton";

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
    <div className="section bg-[#2e2e2e]">
      <div id="contact" className="relative">
        <motion.div
          style={{ y }}
          ref={container}
          className="flex flex-col items-center justify-center text-white relative"
        >
          <div className="w-full pt-52 pb-12 bg-[#2e2e2e]">
            {/* Title Section */}
            <div className="border-b border-gray-500 pb-24 mx-20 relative">
              <div className="flex items-center gap-4">
                <div className="relative w-28 h-28 rounded-full overflow-hidden ml-20">
                  <Image
                    fill
                    alt="avatar"
                    src="/images/avatar.webp"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <h1 className="text-2xl lg:text-8xl font-light ">
                  Let&apos;s work
                </h1>
              </div>
              <h1 className="flex items-center text-2xl lg:text-8xl m-0 font-light ml-20">
                together
                <div className="relative inline-block w-[1.7em] h-[1.7em] ml-[0.2em] align-middle">
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
                className="absolute left-[calc(100%-400px)] top-[calc(100%-75px)]"
              >
                <Rounded
                  backgroundColor="#dd672c"
                  className="lg:!w-52 lg:!h-52 md:w-!40 md:h-!40 sm:w-!32 sm:h-!32 bg-[#dd672c] text-white rounded-full absolute flex items-center justify-center cursor-pointer"
                >
                  <p className="m-0 text-lg font-light relative z-[2]">
                    Get in touch
                  </p>
                </Rounded>
              </motion.div>

              <motion.svg
                style={{ rotate, scale: 2 }}
                className="absolute top-[30%] left-[100%]"
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

            {/* Navigation Section */}
            <div className="flex gap-5 mt-14 mx-20">
              <Rounded className="!w-[230px] !h-[65px] rounded-full mt-12 mb-16 border-gray-500">
                <p className="m-0 text-gray-300 text-base">imavisma@gmail.com</p>
              </Rounded>
              <Rounded className="!w-[230px] !h-[65px] rounded-full mt-12 mb-16 border-gray-500">
                <p className="m-0 text-gray-300 text-base">+61(0)424209565</p>
              </Rounded>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
