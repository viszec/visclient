'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import Magnetic from '@/components/common/Magnetic';

interface SocialLink {
  name: string;
  url: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/viszec',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/viis.ma',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/imavisma/',
  },
];

export default function Footer() {
  return (
    <section className="section w-full h-full bg-black">
      <div className="flex flex-col">
        <motion.div className="flex flex-col border-t lg:mx-20 border-gray-600 lg:flex-row justify-center lg:justify-between items-center gap-2 lg:gap-4 pt-2 lg:pt-6 sm:pt-4 pb-4 lg:pb-8">
          <div className="order-2 lg:order-1">
            <div className="text-xs lg:text-sm font-light text-gray-300">2025 © MAViS M. All rights reserved.</div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4 order-1 lg:order-2">
            <div className="flex items-center gap-1 mr-2">
              <h3 className="text-gray-300 cursor-default font-light text-xs lg:text-sm">Socials</h3>
              <Image
                src="/icons/arrow.svg"
                alt="arrow"
                width={18}
                height={18}
                priority
                className="w-3 h-3 brightness-0 invert"
              />
            </div>

            <div className="flex items-center space-x-4">
              {SOCIAL_LINKS.map((link) => (
                <Magnetic key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 font-light text-xs lg:text-sm hover-underline hover:text-orange-400"
                  >
                    {link.name}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
