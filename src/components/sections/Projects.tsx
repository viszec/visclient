'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { projects } from '@/types/projects';
import { motion, useScroll } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

import Project from '@/components/common/ProjectItem';
import Rounded from '@/components/common/RoundedButton';

// register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

// Define QuickToFunc type
type QuickToFunc = (value: number) => void;

// Create useScreenWidth hook
const useScreenWidth = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export default function Projects() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  // Use QuickToFunc type
  const xMoveContainer = useRef<QuickToFunc | null>(null);
  const yMoveContainer = useRef<QuickToFunc | null>(null);
  const xMoveCursor = useRef<QuickToFunc | null>(null);
  const yMoveCursor = useRef<QuickToFunc | null>(null);
  const xMoveCursorLabel = useRef<QuickToFunc | null>(null);
  const yMoveCursorLabel = useRef<QuickToFunc | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // create quickTo instance if ref exists
    if (modalContainer.current) {
      xMoveContainer.current = gsap.quickTo(modalContainer.current, 'left', {
        duration: 0.8,
        ease: 'power3',
      });
      yMoveContainer.current = gsap.quickTo(modalContainer.current, 'top', {
        duration: 0.8,
        ease: 'power3',
      });
    }

    if (cursor.current) {
      xMoveCursor.current = gsap.quickTo(cursor.current, 'left', {
        duration: 0.5,
        ease: 'power3',
      });
      yMoveCursor.current = gsap.quickTo(cursor.current, 'top', {
        duration: 0.5,
        ease: 'power3',
      });
    }

    if (cursorLabel.current) {
      xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'left', {
        duration: 0.45,
        ease: 'power3',
      });
      yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'top', {
        duration: 0.45,
        ease: 'power3',
      });
    }

    // cleanup function
    return () => {
      // clean up GSAP instance
      if (modalContainer.current) {
        gsap.killTweensOf(modalContainer.current);
      }
      if (cursor.current) {
        gsap.killTweensOf(cursor.current);
      }
      if (cursorLabel.current) {
        gsap.killTweensOf(cursorLabel.current);
      }
    };
  }, []);

  const moveItems = (x: number, y: number) => {
    xMoveContainer.current?.(x);
    yMoveContainer.current?.(y);
    xMoveCursor.current?.(x);
    yMoveCursor.current?.(y);
    xMoveCursorLabel.current?.(x);
    yMoveCursorLabel.current?.(y);
  };

  const manageModal = (active: boolean, index: number, x: number, y: number) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  //const handleLiveClick = () => {
  //if (active) {
  // Get current project URL and open in new tab
  //const currentProject = projects[index];
  //window.open(currentProject.url, '_blank');
  //}
  //};

  const [showAll, setShowAll] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState(projects.slice(0, 7));
  const projectsContainer = useRef<HTMLDivElement>(null);

  // Expand/collapse animation
  const handleToggleProjects = () => {
    setShowAll((prev) => !prev);

    // Use GSAP to animate the height change
    if (projectsContainer.current) {
      gsap.to(projectsContainer.current, {
        height: showAll ? 'auto' : '100%',
        duration: 0.6,
        ease: 'power3.inOut',
      });
    }

    // Update displayed projects
    setDisplayedProjects(showAll ? projects.slice(0, 7) : projects);
  };

  const [isAnimating, setIsAnimating] = useState(false);
  const { scrollY } = useScroll();
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 768;

  const { ref } = useInView({
    threshold: 0,
    rootMargin: isMobile ? '20px 0px' : '80px 0px',
  });

  useEffect(() => {
    let lastScrollY = scrollY.get();
    const aboutSection = document.getElementById('about');
    const aboutBottom = aboutSection
      ? aboutSection.getBoundingClientRect().top + window.scrollY + aboutSection.offsetHeight
      : 0;

    const unsubscribe = scrollY.on('change', (current) => {
      const direction = current > lastScrollY ? 'down' : 'up';

      if (direction === 'down') {
        // mobile trigger point
        const triggerPoint = isMobile ? aboutBottom * 0.7 : aboutBottom * 0.9;
        if (current >= triggerPoint) {
          setIsAnimating(true);
        }
      } else {
        // mobile reset point
        const resetPoint = isMobile ? aboutBottom * 0.5 : aboutBottom * 0.7;
        if (current < resetPoint) {
          setIsAnimating(false);
        }
      }

      lastScrollY = current;
    });

    return () => unsubscribe();
  }, [scrollY, isMobile]); // add isMobile as a dependency

  return (
    <section
      id="work"
      ref={ref}
      className="section-container !lg:px-0 py-12 lg:pt-28 lg:pb-48"
    >
      <div className="h-[9vh] sm:h-[2vh]"></div>
      <motion.div
        className="flex items-center flex-col"
        initial={{ opacity: 0, y: 40 }}
        animate={isAnimating ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          ref={projectsContainer}
          className="w-full mb-24 relative"
          initial={{ opacity: 0 }}
          animate={isAnimating ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-12 pl-0 pr-4 lg:px-4 pb-4 border-b border-[#c9c9c9] w-full">
            {[
              { text: 'PROJECT', span: 'col-start-1 col-end-5' },
              { text: 'CATEGORY', span: 'col-start-6 lg:col-start-5 col-end-9' },
              {
                text: 'CLIENT',
                span: 'col-start-9 col-end-11',
                className: 'hidden md:block',
              },
              {
                text: 'YEAR',
                span: 'col-start-10 lg:col-start-11 col-end-12 lg:col-end-12',
              },
              {
                text: 'WEBSITE',
                span: 'col-start-12 col-end-13',
                align: 'text-right',
              },
            ].map(({ text, span, align = '', className = '' }) => (
              <h3
                key={text}
                className={`${span} lg:text-sm text-xxs font-light ${align} text-gray-600 ${className}`}
              >
                {text}
              </h3>
            ))}
          </div>

          <AnimatePresence>
            <div className="flex flex-col">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isAnimating ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Project
                    index={index}
                    {...project}
                    manageModal={manageModal}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </motion.div>

        <Rounded
          onClick={handleToggleProjects}
          className="!w-[140px] !h-[45px] sm:!w-[180px] sm:!h-[45px] lg:!w-[230px] lg:!h-[65px] 
                    rounded-full mt-2 lg:mt-12 mb-12 lg:mb-16 
                    !border-[1px] !border-gray-500 hover:!border-transparent"
        >
          <p
            className="relative z-10 group-hover:text-white dark:group-hover:text-black 
                      text-base sm:text-sm lg:text-xl font-normal tracking-wider"
          >
            {showAll ? 'Show Less' : 'More Work'}
          </p>
        </Rounded>

        <>
          <motion.div
            ref={modalContainer}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? 'enter' : 'closed'}
            className="h-[200px] w-[220px] lg:h-[350px] lg:w-[500px] fixed top-1/2 left-1/2 bg-white pointer-events-none overflow-hidden z-[3]"
          >
            <div
              style={{ top: `${index * -100}%` }}
              className="h-full w-full relative transition-[top] duration-500 ease-custom-bezier"
            >
              {projects.map((project, index) => {
                const { src, color } = project;
                return (
                  <div
                    className="h-full w-full flex items-center justify-center"
                    style={{ backgroundColor: color }}
                    key={`modal_${index}`}
                  >
                    <Image
                      src={`/images/${src}`}
                      width={0}
                      height={0}
                      alt="image"
                      className="w-[180px] lg:w-[430px] h-auto"
                      loading="lazy"
                      sizes="(max-width: 768px) 280px, 430px"
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/*
          <motion.div 
            ref={cursor}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
            className="w-20 h-20 rounded-full bg-[#455CE9] text-white fixed z-[3] flex items-center justify-center text-sm font-light pointer-events-none"
          />


          <motion.div 
            ref={cursorLabel}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
            className="w-20 h-20 rounded-full bg-transparent text-white fixed z-[3] flex items-center justify-center text-sm font-light cursor-pointer"
            onClick={handleLiveClick}
          >
            Live
          </motion.div>
          */}
        </>
      </motion.div>
    </section>
  );
}
