'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';

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
  // Handle cookie preferences button click
  const handleCookiePreferences = () => {
    if (typeof window !== 'undefined' && window.showCookieManager) {
      window.showCookieManager();
    }
  };

  return (
    <section className="w-full h-full bg-[#efeee9]">
      <div className="flex flex-col px-6 2xl:px-12">
        <motion.div className="flex flex-col lg:grid lg:grid-cols-3 border-t border-gray-600 justify-center items-center gap-2 lg:gap-4 pt-2 lg:pt-6 sm:pt-4 pb-4 lg:pb-8">
          {/* Cookie and Privacy - Row 1 on mobile, Left column on desktop */}
          <div className="order-1 lg:order-1 flex flex-row items-center lg:items-start lg:justify-start gap-1 w-full justify-center">
            <button
              onClick={handleCookiePreferences}
              className="text-xs lg:text-sm text-[#333] hover:text-[#333]/60 transition-colors flex items-center"
              aria-label="Manage cookie preferences"
            >
              <Cookie
                size={12}
                className="mr-1"
              />
              Cookie Settings
            </button>
            <span className="inline mx-1 text-[#33333365]">|</span>
            <Link
              href="/privacy-notice"
              className="text-xs lg:text-sm text-[#333] hover:text-[#333]/60 transition-colors"
            >
              Privacy Notice
            </Link>
          </div>

          {/* All Rights - Row 2 on mobile, Center column on desktop */}
          <div className="order-2 lg:order-2 flex justify-center mt-1 lg:mt-0 w-full">
            <div className="text-xs lg:text-sm text-[#333]">© 2025 MAViS M. All Rights Reserved.</div>
          </div>

          {/* Socials - Row 3 on mobile, Right column on desktop */}
          <div className="flex flex-row items-center gap-2 lg:gap-4 order-3 lg:order-3 justify-center lg:justify-end mt-1 lg:mt-0 w-full">
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
