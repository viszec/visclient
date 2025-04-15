"use client";

import React, { useEffect } from 'react';
import '../../styles/styles.css';
import HeroStackImage from '../common/HeroStackImage';
import SkillsScrolling from '../common/SkillsScrolling';

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  useEffect(() => {
    if (isVisible) {
      const animateContent = async () => {
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default;

        // Animate the navbar items
        gsap.fromTo('.nav-item',
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
          }
        );

        // Animate the small labels
        gsap.fromTo('.small-label',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.2,
            ease: "power2.out"
          }
        );

        // Animate Creative and Solid
        gsap.fromTo(['.creative-text', '.solid-text'],
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            delay: 0.4,
            ease: "power3.out"
          }
        );

        // Animate divider lines
        gsap.fromTo('.divider-line',
          { width: 0 },
          {
            width: '100%',
            duration: 1.2,
            stagger: 0.2,
            delay: 0.8,
            ease: "power2.inOut"
          }
        );

        // Animate hello I'm MAVIS
        gsap.fromTo('.name-row',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 1.2,
            ease: "power2.out"
          }
        );

        // Animate Frontend Engineer
        gsap.fromTo('.engineer-title',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1.5,
            ease: "power3.out"
          }
        );

        // Animate WEB DEVELOPER and DESIGNER
        gsap.fromTo('.role-text',
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.3,
            delay: 1.8,
            ease: "back.out(1.2)"
          }
        );

        // Animate and
        gsap.fromTo('.conjunction',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 2.1,
            ease: "elastic.out(1, 0.5)"
          }
        );

        // Animate skills text
        gsap.fromTo('.skills-text',
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 2.3,
            ease: "power1.out"
          }
        );
      };

      animateContent();
    }
  }, [isVisible]);

  return (
    <section id='hero'
      className="w-full min-h-screen bg-[#efeee9] text-[#333] font-serif flex flex-col"
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      {/* Top nav spacer */}
      <div className="h-24"></div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col justify-between px-6 md:px-12">
        {/* Desktop layout */}
        <div className="hidden md:block">
          {/* Row 1: 8-column grid layout */}
          <div className='mb-2 2xl:mt-12'>
            <div className="grid grid-cols-10 gap-4 items-end pt-4 pb-2">
              <div className="col-span-2 pb-2">
                <div className="text-xs sm:text-[6px] xl:text-sm uppercase tracking-wider small-label">FONTEND ENGINEER</div>
              </div>
              <div className="col-span-3 pb-2">
                <div className="text-4xl sm:text-2xl xl:text-[4rem] 2xl:text-[5rem] leading-none font-normal pb-4">Cre<span className="text-4xl sm:text-2xl xl:text-[4rem] 2xl:text-[5rem] italic">a</span>t<span className="text-4xl sm:text-2xl xl:text-[4rem] 2xl:text-[5rem] italic">i</span>ve</div>
              </div>
              <div className="col-span-2 pb-2">
                <div className="text-xs sm:text-xxs xl:text-sm uppercase tracking-wider">AVAILABLE FOR FREELANCE</div>
              </div>
              <div className="col-span-2 text-right">
                <div className="text-4xl sm:text-2xl xl:text-[4rem] 2xl:text-[5rem] leading-none font-bold text-[#908f8c] mr-4 pb-4">S<span className="text-4xl sm:text-2xl xl:text-[4rem] 2xl:text-[5rem] italic">ol</span>id</div>
              </div>
              <div className="col-span-1 text-right pb-2">
                <div className="text-xs sm:text-xxs xl:text-sm uppercase tracking-wider small-label">GET IN TOUCH</div>
              </div>
            </div>
            <div className="w-full h-px bg-[#33333387] divider-line"></div>
          </div>

          {/* Row 2: 5-column grid with hello I'm MAVIS in col2-col4 */}
          <div className="my-6">
            <div className="grid grid-cols-5 gap-4 pt-4">
              <div className="col-start-2 col-span-3 text-center">
                <div className="text-[4.5rem] font-medium text-[#333] name-row pt-6 2xl:pt-12">
                  <span className="italic font-normal text-4xl sm:text-2xl xl:text-[4rem] 2xl:text-[5rem] hello-text text-[#908f8c] mr-8">hi,</span><span className="text-5xl sm:text-2xl xl:text-[4.6rem] 2xl:text-[5.6rem] hello-text">I&apos;m MAVIS MA</span>
                </div>
              </div>
            </div>
            <div className="w-full h-px bg-[#33333387] divider-line"></div>
          </div>

          {/* Row 3: 3-column grid with Frontend Engineer in col2-col3 */}
          <div className="my-6">
            <div className="grid grid-cols-3 gap-4 pb-8">
              <div className="col-start-2 col-span-2">
                <div className="text-4xl xl:text-[4.8rem] 2xl:text-[5.5rem] font-normal font-halenoir text-center leading-none text-[#333] pt-10 xl:pt-10 2xl:pt-20">Frontend <span className="text-4xl xl:text-[4.8rem] 2xl:text-[5.5rem] 2xl:ml-4">Engineer</span></div>
              </div>
            </div>
            <div className="w-full h-px bg-[#33333387] divider-line"></div>
          </div>

          {/* Row 4: 4-column grid with web developer, and, designer */}
          <div className="my-0">
            <div className="grid grid-cols-8 items-end pb-4">
              <div className="col-span-3">
                <div className="text-4xl xl:text-[4rem] 2xl:text-[5rem] font-light font-halenoir leading-tight text-[#333] pl-12 xl:pl-20 pt-12 xl:pt-14 2xl:pt-18">WEB<br />DEVELOPER</div>
              </div>
              <div className="col-span-2 flex justify-center pb-8 2xl:pl-20">
                <HeroStackImage />
              </div>
              <div className="col-span-1">
                <div className="italic text-3xl xl:text-[2.8rem] 2xl:text-[3.4rem] text-[#908f8c] pb-12 2xl:pb-24 pl-12">and</div>
              </div>
              <div className="col-span-2 text-right">
                <div className="text-4xl xl:text-[4rem] 2xl:text-[5rem] font-halenoir font-light leading-none text-[#333] pr-12">DESIGNER</div>
              </div>
            </div>
            <div className="w-full h-px bg-[#33333387] divider-line"></div>
          </div>

          {/* Row 5: Left-aligned skills text */}
          <div className="mb-0">
            <div className="text-left font-halenoir lg:text-lg leading-relaxed tracking-wider text-[#333]/80 skills-text font-light 2xl:pb-4 py-5 mt-4">
              <span className="text-base border border-[#333]/70 py-3 px-3 xl:py-5 xl:px-4 2xl:py-5 2xl:px-4 rounded-full">Proficient</span>
              <span className='text-base border border-[#333]/70 py-3 px-3 xl:py-5 xl:px-5 2xl:py-5 2xl:px-5 rounded-full'>in</span>
              {/* <span className="font-medium border border-[#333]/70 py-4 px-4 rounded-full !bg-[#333]">
                <SkillsScrolling />
              </span> */}
              <span className="text-sm 2xl:text-base border border-[#333]/70 py-3 px-3 xl:py-5 xl:px-4 2xl:py-5 2xl:px-4 rounded-full">React / Next.js / TypeScript / JavaScript / Tailwind CSS / Node.js / GSAP / MCP / Figma / Cursor</span>
            </div>
          </div>
        </div>

        {/* Mobile layout - All left aligned */}
        <div className="flex md:hidden flex-1 flex-col justify-between">
          {/* Row 1: Creative, etc. */}
          <div className='my-4 text-left space-y-3'>
            <div className="text-sm uppercase tracking-wider mb-1">FONTEND ENGINEER</div>
            <div className="text-3xl leading-none font-normal mb-2">Cre<span className="italic">a</span>t<span className="italic">i</span>ve</div>
            <div className="text-sm uppercase tracking-wider mb-1">AVAILABLE FOR FREELANCE</div>
            <div className="text-3xl leading-none font-bold text-[#908f8c] mb-1">S<span className="italic">ol</span>id</div>
            <div className="text-sm uppercase tracking-wider mb-2">GET IN TOUCH</div>
            <div className="w-full h-px bg-[#33333387] divider-line"></div>
          </div>

          {/* Row 2: hi, I'm MAVIS */}
          <div className="my-4 text-left">
            <div className="text-left">
              <span className="italic font-normal text-2xl text-[#908f8c] mr-2 text-center pl-2">hi,</span>
              <span className="text-3xl text-center pl-2">I&apos;m MAVIS MA</span>
            </div>
            <div className="w-full h-px bg-[#33333387] divider-line mt-3"></div>
          </div>

          {/* Row 3: Frontend Engineer */}
          <div className="my-4 text-left">
            <div className="text-4xl font-normal font-baskervville leading-none px-2">
              Frontend <span className="text-4xl">Engineer</span>
            </div>
            <div className="w-full h-px bg-[#33333387] divider-line mt-3"></div>
          </div>

          {/* Row 4: web developer and designer */}
          <div className="my-4 text-left">
            <div className="text-3xl font-light font-halenoir leading-tight pl-2">WEB<br />DEVELOPER</div>
            <div className="flex items-center my-2 pl-4 pr-12">
              <HeroStackImage />
              <span className="italic text-2xl text-[#908f8c] ml-6">and</span>
            </div>
            <div className="text-3xl font-halenoir font-light leading-none text-right pr-2">DESIGNER</div>
            <div className="w-full h-px bg-[#33333387] divider-line mt-3"></div>
          </div>

          {/* Row 5: Skills */}
          <div className="mt-0 mb-12 text-left text-[#333]/80">
            <div className="flex flex-wrap font-halenoir">
              <span className="text-xs border border-[#333]/70 py-2 px-3 rounded-full">Proficient</span>
              <span className="text-xs border border-[#333]/70 py-2 px-3 rounded-full">in</span>
              <span className="text-xs border border-[#333]/70 py-2 px-3 rounded-full">React / Next.js / TypeScript / JavaScript / Tailwind CSS / Node.js / GSAP / MCP / Figma / Cursor</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
