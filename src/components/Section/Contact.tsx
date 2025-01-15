import { useRef } from "react";
import Image from "next/image";
import { useScroll, motion, useTransform } from "framer-motion";
import Rounded from "@/common/RoundedButton";
import Magnetic from "@/common/Magnetic";

interface SocialLink {
  name: string;
  url: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername"
  },
  {
    name: "Instagram",
    url: "https://instagram.com/yourusername"
  },
  {
    name: "Facebook",
    url: "https://facebook.com/yourusername"
  },
  {
    name: "Linkedin",
    url: "https://linkedin.com/in/yourusername"
  }
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
    <div className="section-wrapper bg-[#2e2e2e]">
      <section id="contact" className="section">
        <motion.div
          style={{ y }}
          ref={container}
          className="flex flex-col items-center justify-center text-white relative"
        >
          <div className="pt-[200px] w-full max-w-[1800px] bg-[#2e2e2e]">
            {/* Title Section */}
            <div className="border-b border-[#868686] pb-[100px] mx-[200px] relative">
              <span className="flex items-center">
                <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
                  <Image
                    fill
                    alt="avatar"
                    src="/images/avatar.png"
                    className="object-cover"
                  />
                </div>
                <h2 className="ml-[0.3em] text-[5vw] font-light">
                  Let&apos;s work
                </h2>
              </span>

              <h2 className="flex items-center text-[5vw] m-0 font-light">
                together
                <span className="relative inline-block w-[1.7em] h-[1.7em] ml-[0.2em] align-middle">
                  <Image
                    src="/images/smiley.svg"
                    alt="Smiley face"
                    fill
                    className="object-contain"
                  />
                </span>
              </h2>

              <motion.div
                style={{ x }}
                className="absolute left-[calc(100%-400px)] top-[calc(100%-75px)]"
              >
                <Rounded
                  backgroundColor="#dd672c"
                  className="w-[180px] h-[180px] bg-[#dd672c] text-white rounded-full absolute flex items-center justify-center cursor-pointer"
                >
                  <p className="m-0 text-base font-light relative z-[2]">
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
            <div className="flex gap-5 mt-[100px] mx-[200px]">
              <Rounded>
                <p className="m-0">imavisma@gmail.com</p>
              </Rounded>
              <Rounded>
                <p className="m-0">+61(0)424209565</p>
              </Rounded>
            </div>

            {/* Info Section */}
            <div className="flex justify-between items-end mt-24 p-5">
              <div>
                <p className="m-0 text-base font-light text-gray-300">
                  2024 © MAViS. All rights reserved.
                </p>
              </div>
              <div className="flex gap-[15px] items-end">
                <h3 className="m-0 p-[2.5px] text-gray-400 cursor-default font-light text-base">
                  Socials
                </h3>
                {SOCIAL_LINKS.map((link) => (
                  <Magnetic key={link.name}>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 font-light text-sm m-0 p-[2.5px] cursor-pointer hover-underline"
                    >
                      {link.name}
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
