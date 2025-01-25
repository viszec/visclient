"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SidebarNav from "@/components/Layout/SidebarNav";
import { Logo } from "@/common/Logo";
import { Navigation } from "@/common/Navigation";
import { MenuButton } from "@/common/MenuButton";

// Animation configurations
const scrollAnimation = {
  scale: {
    show: { scale: 1, duration: 0.25, ease: "power1.out" },
    hide: { scale: 0, duration: 0.25, ease: "power1.out" }
  }
};

export default function Header() {
  const header = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname, isActive]);

  // Only use ScrollTrigger on desktop
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Just show the menu button on desktop
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    if (mediaQuery.matches) {
      const trigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top+=100 top",
        end: "bottom top",
        onEnter: () => {
          gsap.to(buttonRef.current, scrollAnimation.scale.show);
        },
        onLeaveBack: () => {
          gsap.to(buttonRef.current, scrollAnimation.scale.hide);
          setIsActive(false);
        },
        toggleClass: {
          targets: buttonRef.current,
          className: "visible"
        }
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
        className="fixed top-0 w-full bg-white lg:bg-transparent backdrop-blur-sm z-[1] px-6 sm:px-4 md:px-8 lg:px-12"
      >
        <div className="flex justify-between items-center py-3 sm:py-5 md:py-4 lg:py-2">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <div className="flex items-center gap-4">
            <Navigation />
            {/* Mobile menu button */}
            <div className="md:hidden">
              <MenuButton 
                buttonRef={buttonRef}
                isActive={isActive}
                onClick={() => setIsActive(!isActive)}
                className="scale-100"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Desktop menu button */}
      <div className="hidden md:block">
        <MenuButton 
          buttonRef={buttonRef}
          isActive={isActive}
          onClick={() => setIsActive(!isActive)}
        />
      </div>

      <AnimatePresence mode="wait">
        {isActive && <SidebarNav />}
      </AnimatePresence>
    </>
  );
}