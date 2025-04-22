'use client';

import React, { useEffect, useState } from 'react';

import '../../styles/preloader.styles.css';
//import HeroStackImage from '../common/HeroStackImage';
//import SkillsScrolling from '../common/SkillsScrolling';
import ImageTrail from '../ui/image-trail';

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  // Add state to control ImageTrail visibility
  const [showImageTrail, setShowImageTrail] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Reset the state when the section becomes visible
      setShowImageTrail(false);

      const animateContent = async () => {
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default;

        // Setup the animation for the hero section

        // // 1. Navbar items fade in
        // gsap.fromTo(
        //   '.nav-item',
        //   { opacity: 0, y: -10 },
        //   {
        //     opacity: 1,
        //     y: 0,
        //     duration: 0.5,
        //     stagger: 0.1,
        //     ease: 'power2.out',
        //   }
        // );

        // 2. Text labels fade in - Top labels: FRONTEND ENGINEER, AVAILABLE FOR FREELANCE, GET IN TOUCH
        gsap.fromTo(
          '.small-label',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            delay: 0.6,
            ease: 'power2.out',
          }
        );

        // 3. Creative, Solid fade in
        gsap.fromTo(
          '.text-creative',
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.6,
            ease: 'power3.out',
          }
        );

        gsap.fromTo(
          '.text-solid',
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.8,
            ease: 'power3.out',
          }
        );

        // 4. Divider line animation
        gsap.fromTo(
          '.divider-line',
          { width: 0 },
          {
            width: '100%',
            duration: 1.2,
            stagger: 0.3,
            delay: 1.0,
            ease: 'power2.inOut',
          }
        );

        // 5. "hi, I'm MAVIS MA" fade in
        gsap.fromTo(
          '.hello-text',
          { opacity: 0, scale: 0.95, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            delay: 1.4,
            ease: 'power2.out',
          }
        );

        // 6. "Frontend Engineer" fade in
        gsap.fromTo(
          '.engineer-title',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 1.8,
            ease: 'power3.out',
          }
        );

        // 7. "WEB DEVELOPER" and "DESIGNER" fade in
        gsap.fromTo(
          '.web-developer',
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            delay: 2.1,
            ease: 'back.out(1.2)',
          }
        );

        gsap.fromTo(
          '.designer',
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            delay: 2.3,
            ease: 'back.out(1.2)',
          }
        );

        // 8. "and" fade in
        gsap.fromTo(
          '.and-text',
          { opacity: 0, scale: 0.8, rotate: -10 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            delay: 2.5,
            ease: 'elastic.out(1, 0.5)',
          }
        );

        // 9. Skills fade in
        gsap.fromTo(
          '.skills-text',
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 2.8,
            ease: 'power1.out',
            onComplete: () => {
              // All animations completed, show ImageTrail
              setShowImageTrail(true);
            },
          }
        );
      };

      animateContent();
    }
  }, [isVisible]);

  return (
    <section
      id="hero"
      className="w-full min-h-screen bg-[#efeee9] text-[#333] font-serif flex flex-col relative"
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      {/* ImageTrail Component - Now at top layer with absolute positioning */}
      {showImageTrail && (
        <div
          className="absolute inset-x-0 top-0 z-10 overflow-hidden pb-12"
          style={{ height: 'calc(100% - 50px)' }}
        >
          <ImageTrail
            items={[
              'https://images.unsplash.com/photo-1745034059777-9af299ba7703?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1650088441002-75cd1416b228?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1745034071783-793340853ae6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1745034060041-d1f1c2d7a332?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1745034071686-3ceb79446789?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1745034059801-e285f8ba4310?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1745034071750-b6e0f0478206?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              'https://images.unsplash.com/photo-1745034059874-e3733124fd4d?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            ]}
            variant={6}
          />
        </div>
      )}

      {/* Top nav spacer */}
      <div className="h-16 lg:h-24"></div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col justify-between px-6 md:px-12 relative z-0">
        {/* Desktop layout */}
        <div className="hidden md:block">
          {/* Row 1: 8-column grid layout */}
          <div className="mb-2 2xl:mt-12">
            <div className="grid grid-cols-10 gap-4 items-end pt-4 pb-2">
              <div className="col-span-2 pb-2">
                <div className="text-xs sm:text-xxs lg:text-sm uppercase tracking-wider small-label">
                  FRONTEND ENGINEER
                </div>
              </div>
              <div className="col-span-3 pb-2">
                <div className="text-4xl sm:text-2xl xl:text-[4rem] 2xl:text-[5rem] leading-none font-normal pb-4 text-creative">
                  Cre<span className="text-4xl sm:text-2xl xl:text-[4rem] 2xl:text-[5rem] italic">a</span>t
                  <span className="text-4xl sm:text-2xl xl:text-[4rem] 2xl:text-[5rem] italic">i</span>ve
                </div>
              </div>
              <div className="col-span-2 pb-2">
                <div className="text-xs sm:text-xxs lg:text-sm uppercase tracking-wider small-label">
                  AVAILABLE FOR FREELANCE
                </div>
              </div>
              <div className="col-span-2 text-right">
                <div className="text-4xl sm:text-2xl xl:text-[4rem] 2xl:text-[5rem] leading-none font-bold text-[#908f8c] mr-4 pb-4 text-solid">
                  S<span className="text-4xl sm:text-2xl xl:text-[4rem] 2xl:text-[5rem] italic">ol</span>id
                </div>
              </div>
              <div className="col-span-1 text-right pb-2">
                <div className="text-xs sm:text-xxs lg:text-sm uppercase tracking-wider small-label">GET IN TOUCH</div>
              </div>
            </div>
            <div className="w-full h-px bg-[#33333387] divider-line"></div>
          </div>

          {/* Row 2: 5-column grid with hello I'm MAVIS in col2-col4 */}
          <div className="my-6">
            <div className="grid grid-cols-5 gap-4 pt-4">
              <div className="col-start-2 col-span-3 text-center">
                <div className="text-[4.5rem] font-medium text-[#333] pt-6 2xl:pt-12">
                  <span className="italic font-normal text-4xl sm:text-2xl xl:text-[4rem] 2xl:text-[5rem] hello-text text-[#908f8c] mr-8">
                    hi,
                  </span>
                  <span className="text-5xl sm:text-2xl xl:text-[4.6rem] 2xl:text-[8rem] font-just-me-again hello-text">
                    I&apos;m MAVIS MA
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full h-px bg-[#33333387] divider-line"></div>
          </div>

          {/* Row 3: 3-column grid with Frontend Engineer in col2-col3 */}
          <div className="my-6">
            <div className="grid grid-cols-3 gap-4 pb-8">
              <div className="col-start-2 col-span-2">
                <div className="text-4xl xl:text-[4.8rem] 2xl:text-[5.5rem] font-normal font-halenoir text-center leading-none text-[#333] pt-10 xl:pt-10 2xl:pt-20 engineer-title">
                  Frontend <span className="text-4xl xl:text-[4.8rem] 2xl:text-[5.5rem] 2xl:ml-4">Engineer</span>
                </div>
              </div>
            </div>
            <div className="w-full h-px bg-[#33333387] divider-line"></div>
          </div>

          {/* Row 4: 4-column grid with web developer, and, designer */}
          <div className="my-0">
            <div className="grid grid-cols-8 items-end pb-4">
              <div className="col-span-3">
                <div className="text-4xl xl:text-[4rem] 2xl:text-[5rem] font-light font-halenoir leading-tight text-[#333] pl-12 xl:pl-20 pt-12 xl:pt-14 2xl:pt-18 web-developer">
                  WEB
                  <br />
                  DEVELOPER
                </div>
              </div>
              <div className="col-span-2 flex justify-center pb-8 2xl:pl-20">{/* <HeroStackImage /> */}</div>
              <div className="col-span-1">
                <div className="italic text-3xl xl:text-[2.8rem] 2xl:text-[3.4rem] text-[#908f8c] pb-12 2xl:pb-24 pl-12 and-text">
                  and
                </div>
              </div>
              <div className="col-span-2 text-right">
                <div className="text-4xl xl:text-[4rem] 2xl:text-[5rem] font-halenoir font-light leading-none text-[#333] pr-12 designer">
                  DESIGNER
                </div>
              </div>
            </div>
            <div className="w-full h-px bg-[#33333387] divider-line"></div>
          </div>

          {/* Row 5: Left-aligned skills text */}
          <div className="mb-0">
            <div className="text-left font-halenoir lg:text-lg leading-relaxed tracking-wider text-[#333]/80 font-light skills-text 2xl:pb-4 py-5 mt-4">
              <span className="text-base border border-[#333]/70 py-3 px-3 xl:py-5 xl:px-4 2xl:py-5 2xl:px-4 rounded-full">
                Proficient
              </span>
              <span className="text-base border border-[#333]/70 py-3 px-3 xl:py-5 xl:px-5 2xl:py-5 2xl:px-5 rounded-full">
                in
              </span>
              {/* <span className="font-medium border border-[#333]/70 py-4 px-4 rounded-full !bg-[#333]">
                <SkillsScrolling />
              </span> */}
              <span className="text-sm 2xl:text-base border border-[#333]/70 py-3 px-3 xl:py-5 xl:px-4 2xl:py-5 2xl:px-4 rounded-full">
                React / Next.js / TypeScript / JavaScript / Tailwind CSS / Node.js / GSAP / MCP / Figma / Cursor
              </span>
            </div>
          </div>
        </div>

        {/* Mobile layout - All left aligned */}
        <div className="flex md:hidden flex-1 flex-col space-y-3">
          {/* Row 1: Creative, etc. */}
          <div className="mb-4 text-left space-y-2">
            <div className="text-sm uppercase tracking-wider mb-1 small-label">FRONTEND ENGINEER</div>
            <div className="text-3xl leading-none font-normal mb-2 text-creative">
              Cre<span className="italic">a</span>t<span className="italic">i</span>ve
            </div>
            <div className="text-sm uppercase tracking-wider mb-1 small-label">AVAILABLE FOR FREELANCE</div>
            <div className="text-3xl leading-none font-bold text-[#908f8c] mb-1 text-solid">
              S<span className="italic">ol</span>id
            </div>
            <div className="text-sm uppercase tracking-wider mb-2 small-label">GET IN TOUCH</div>
            <div className="w-full h-px bg-[#33333353] divider-line"></div>
          </div>

          {/* Row 2: hi, I'm MAVIS */}
          <div className="my-4 text-left">
            <div className="text-left">
              <span className="italic font-normal text-2xl text-[#908f8c] mr-2 text-center pl-2 hello-text">hi,</span>
              <span className="text-5xl text-center pl-2 hello-text font-just-me-again">I&apos;m MAViS MA</span>
            </div>
            <div className="w-full h-px bg-[#33333353] divider-line mt-3"></div>
          </div>

          {/* Row 3: Frontend Engineer */}
          <div className="my-4 text-left">
            <div className="text-4xl font-normal font-halenoir leading-none px-2 engineer-title pt-2">
              Frontend <span className="text-4xl">Engineer</span>
            </div>
            <div className="w-full h-px bg-[#33333353] divider-line mt-3"></div>
          </div>

          {/* Row 4: web developer and designer */}
          <div className="mt-4 text-left">
            <div className="text-3xl font-light font-halenoir leading-tight pl-8 web-developer pt-2">
              WEB
              <br />
              DEVELOPER
            </div>
            <div className="flex items-center my-2 pl-4 pr-12">
              {/* <HeroStackImage /> */}
              <span className="italic text-2xl text-[#908f8c] ml-32 and-text">and</span>
            </div>
            <div className="text-3xl font-halenoir font-light leading-none text-right pr-2 designer">DESIGNER</div>
            <div className="w-full h-px bg-[#33333353] divider-line mt-3"></div>
          </div>

          {/* Row 5: Skills */}
          <div className="mt-0 mb-8 text-left text-[#333]/80">
            <div className="flex flex-wrap font-halenoir skills-text">
              <div className="inline-flex items-center relative">
                <span className="relative px-6 py-2 text-sm font-medium text-[#333] bg-[#E6E5DF] rounded-xl">
                  Proficient in React / Next.js / Tailwind CSS / Node.js / GSAP / Figma / Cursor
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
