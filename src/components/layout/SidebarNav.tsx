'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/config/routes';
import { menuSlide } from '@/types/animation';
import { AnimatePresence, motion } from 'framer-motion';

import Curve from '@/components/layout/Curve';
import NavLink from '@/components/layout/Link';
import NavSocials from '@/components/layout/NavSocials';

const containerVariants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

export default function SidebarNav() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState<string>(pathname);
  //const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setSelectedIndicator(pathname);
  }, [pathname]);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed inset-0 z-[100] pointer-events-none"
    >
      {/* Half-transparent bg mask */}
      {/*<div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto" />*/}

      {/* Navigation */}
      <div
        className="absolute right-0 top-0 h-screen bg-[#333] text-[#e6e5ef]
                   w-[60vw] sm:w-[40vw] lg:w-[35vw]
                   overflow-visible pointer-events-auto
                   shadow-[-10px_0_30px_rgba(0,0,0,0.1)]
                   pt-[60px] lg:pt-[80px]"
      >
        <div className="box-border h-full p-12 lg:p-[100px] flex flex-col justify-between">
          <motion.div
            variants={containerVariants}
            className="flex flex-col text-4xl gap-3"
          >
            <div className="flex text-[#e6e5ef]/80 border-b py-2 border-[#e6e5ef]/20 uppercase text-sm lg:text-2xl font-light tracking-tight mb-10">
              <div className="tracking-wider items-center gap-2">
                Mavis M.
                <Image
                  src="/icons/arrow.svg"
                  alt="arrow"
                  width={18}
                  height={18}
                  priority
                  className="w-3 h-3 lg:w-4 lg:h-4 brightness-0/80 invert"
                />
                Portfolio
              </div>
            </div>
            <AnimatePresence mode="wait">
              {ROUTES.map((item, index) => (
                <NavLink
                  key={index}
                  data={{ ...item, index }}
                  isActive={selectedIndicator === item.href}
                  setSelectedIndicator={setSelectedIndicator}
                />
              ))}
            </AnimatePresence>
            <div className="flex flex-col pt-[400px] lg:pt-[100px] space-y-2">
              <div className="flex items-center gap-1">
                <p className="text-sm lg:text-xl text-[#e6e5ef]/80 font-light tracking-tight">Let&apos;s connect</p>
                <Image
                  src="/icons/arrow.svg"
                  alt="arrow"
                  width={18}
                  height={18}
                  priority
                  className="w-3 h-3 lg:w-4 lg:h-4 brightness-0/70 invert"
                />
              </div>
              <NavSocials />
            </div>
          </motion.div>
        </div>
        <div className="absolute left-0 top-0 h-full w-[40px] lg:w-[100px]">
          <Curve />
        </div>
      </div>
    </motion.div>
  );
}
