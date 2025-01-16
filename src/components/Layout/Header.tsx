'use client'

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/Layout/Nav";
import Rounded from "@/common/RoundedButton";
import { ROUTES } from '@/config/routes';
import Magnetic from "@/common/Magnetic";

export default function Header() {
  const header = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top+=100 top",
      end: "bottom top",
      onEnter: () => {
        gsap.to(button.current, {
          scale: 1,
          duration: 0.25,
          ease: "power1.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(button.current, {
          scale: 0,
          duration: 0.25,
          ease: "power1.out",
        });
        setIsActive(false);
      },
      toggleClass: {
        targets: button.current,
        className: "visible"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <section ref={header} className="absolute flex z-[1] top-0 text-white p-[35px] justify-between w-full font-light items-center box-border">
        <div className="flex cursor-pointer group">
          <p className="m-0 transition-all duration-500 ease-bezier group-hover:rotate-[360deg]">©</p>
          <div className="flex relative overflow-hidden whitespace-nowrap ml-[5px] transition-all duration-500 ease-bezier group-hover:pr-[30px]">
            <p className="relative transition-transform duration-500 ease-bezier group-hover:-translate-x-full">↗MAViS MA</p>
            <p className="relative pl-[0.3em] transition-transform duration-500 ease-bezier group-hover:-translate-x-[85px]">↗Based in Melbourne AU</p>
          </div>
        </div>

        <nav className="flex items-center">
          {ROUTES.map((item) => (
            <Magnetic key={item.href}>
              <div className="flex flex-col relative z-[1] p-[15px] cursor-pointer group">
                <Link href={item.href} className="font-light text-white/90 no-underline hover:text-white">
                  {item.label}
                </Link>
                <div className="absolute w-[5px] h-[5px] top-[38px] left-1/2 bg-white rounded-full scale-0 -translate-x-1/2 transition-transform duration-200 ease-bezier group-hover:scale-100" />
              </div>
            </Magnetic>
          ))}
        </nav>
      </section>

      <div 
        ref={button} 
        className="scale-0 fixed right-0 z-[4] transition-transform duration-300 ease-out"
      >
        <Rounded
          onClick={() => setIsActive(!isActive)}
          className="relative m-[20px] w-[80px] h-[80px] rounded-full bg-[#1C1D20] cursor-pointer flex items-center justify-center"
        >
          <div className={`w-full relative ${isActive ? 'burger-active' : ''}`}>
            <div className="burger-line" />
            <div className="burger-line" />
          </div>
        </Rounded>
      </div>

      <AnimatePresence mode="wait">
        {isActive && <Nav />}
      </AnimatePresence>
    </>
  );
} 