"use client";

import Magnetic from "@/common/Magnetic";
import { motion } from "framer-motion";

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
    <section className="section w-full h-full bg-[#2e2e2e]">
      <div className="flex flex-col">
        <motion.div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-4 lg:gap-0 pt-20 pb-8 px-6 lg:px-20">
          <div className="order-2 lg:order-1">
            <p className="text-xs lg:text-base font-light text-gray-400">
              2024 © MAViS. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-[15px] order-1 lg:order-2">
            <h3 className="text-gray-400 cursor-default font-light text-sm">
              Socials{" ->"}
            </h3>
            {SOCIAL_LINKS.map((link) => (
              <Magnetic key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 font-light text-sm hover-underline"
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
