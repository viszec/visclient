"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Magnetic from "@/components/common/Magnetic";

interface SocialLink {
  name: string;
  url: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/viszec",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/viis.ma",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/imavisma/",
  },
];

export default function Footer() {
  return (
    <section className="section w-full h-full bg-black">
      <div className="flex flex-col">
        <motion.div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-4 lg:gap-4 pt-2 lg:pt-10 sm:pt-4 pb-6 lg:pb-8 px-6 lg:px-20">
          <div className="order-2 lg:order-1">
            <p className="text-xs lg:text-base font-light text-gray-300">
              2024 © MAViS. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4 order-1 lg:order-2">
            <div className="flex items-center gap-1">
            <h3 className="text-gray-300 cursor-default font-light text-xs lg:text-base">
              Socials
            </h3>
            <Image
                    src="/icons/arrow.svg"
                    alt="arrow"
                    width={18}
                    height={18}
                    priority
                    className="w-3 h-3 brightness-0 invert"
                    />
                    </div>
              
            {SOCIAL_LINKS.map((link) => (
              <Magnetic key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 font-light text-xs lg:text-base hover-underline"
                >
                  {link.name}
                </a>
              </Magnetic>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
