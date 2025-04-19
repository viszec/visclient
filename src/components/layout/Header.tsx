'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Logo } from '@/components/common/Logo';
import { MenuButton } from '@/components/common/MenuButton';
import { Navigation } from '@/components/common/Navigation';
import SidebarNav from '@/components/layout/SidebarNav';

// Animation configurations
const scrollAnimation = {
  scale: {
    show: { scale: 1, duration: 0.25, ease: 'power1.out' },
    hide: { scale: 0, duration: 0.25, ease: 'power1.out' },
  },
};

// Fade-in animation variants
const fadeInVariants = {
  logoHidden: { opacity: 0, x: -20 },
  logoVisible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  navHidden: { opacity: 0, x: 20 },
  navVisible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function Header() {
  const header = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  // Add scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only use ScrollTrigger on desktop
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Just show the menu button on desktop
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    if (mediaQuery.matches) {
      const trigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top+=100 top',
        end: 'bottom top',
        onEnter: () => {
          gsap.to(buttonRef.current, scrollAnimation.scale.show);
        },
        onLeaveBack: () => {
          gsap.to(buttonRef.current, scrollAnimation.scale.hide);
          setIsActive(false);
        },
        toggleClass: {
          targets: buttonRef.current,
          className: 'visible',
        },
      });

      return () => {
        trigger.kill();
      };
    }
  }, []);

  return (
    <>
      <header
        ref={header}
        className={`fixed top-0 w-full backdrop-blur-sm z-[99] px-4 md:px-8 lg:px-12 2xl:px-12 transition-colors duration-300
          ${isScrolled ? 'lg:bg-[#efeee9] shadow-sm' : 'lg:bg-transparent'} 
          bg-[#efeee9] md:bg-[#efeee9]/80`}
      >
        <div className="flex justify-between items-center py-2 lg:py-2">
          <motion.div
            className="flex items-center"
            initial="logoHidden"
            animate="logoVisible"
            variants={fadeInVariants}
          >
            <Logo />
          </motion.div>

          <motion.div
            className="flex items-center gap-4"
            initial="navHidden"
            animate="navVisible"
            variants={fadeInVariants}
            transition={{ delay: 0.2 }}
          >
            <Navigation />
          </motion.div>
        </div>
      </header>

      {/* Move out MenuButton to the out layer on mobile, ensure on the top */}
      <div className="md:hidden fixed top-3 right-4 z-[200]">
        <MenuButton
          buttonRef={buttonRef}
          isActive={isActive}
          onClick={() => setIsActive(!isActive)}
          className="scale-100"
        />
      </div>

      {/* Desktop menu button */}
      <div className="hidden md:block z-[101]">
        <MenuButton
          buttonRef={buttonRef}
          isActive={isActive}
          onClick={() => setIsActive(!isActive)}
        />
      </div>

      <AnimatePresence mode="wait">{isActive && <SidebarNav />}</AnimatePresence>
    </>
  );
}
