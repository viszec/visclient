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
    <section className="w-full h-full bg-[#efeee9] ">
      <div className="flex flex-col px-6 2xl:px-12">
        <motion.div className="flex flex-col border-t border-gray-600 lg:flex-row justify-center lg:justify-between items-center gap-2 lg:gap-4 pt-2 lg:pt-6 sm:pt-4 pb-4 lg:pb-8">
          <div className="order-2 lg:order-1">
            <div className="text-xs lg:text-sm text-[#333]">2025 © MAViS M. All Rights Reserved.</div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4 order-1 lg:order-2">
            <div className="flex items-center gap-1 mr-2">
              <h3 className="text-[#333] cursor-default text-xs lg:text-sm">Socials</h3>
              <Image
                src="/icons/arrow.svg"
                alt="arrow"
                width={18}
                height={18}
                priority
                className="mt-[-2px] lg:mt-0 lg:w-3 lg:h-3 w-2.5 h-2.5 text-[#333]"
              />
            </div>

            <div className="flex items-center space-x-4">
              {SOCIAL_LINKS.map((link) => (
                <Magnetic key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#333] text-xs lg:text-sm hover-underline hover:text-[#333]/60"
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
