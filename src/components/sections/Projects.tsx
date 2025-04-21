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
  initial: { scale: 0, x: '-50%', y: '-50%', opacity: 0 },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    opacity: 1,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    opacity: 0,
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
    // If there is an expanded project, do not show the image preview
    if (activeExpandedIndex !== null) {
      return;
    }

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

    // get the position information of the Projects section
    const unsubscribe = scrollY.on('change', (current) => {
      const direction = current > lastScrollY ? 'down' : 'up';

      // get the position information of the Projects section
      const projectsSection = document.getElementById('work');
      if (!projectsSection) return;

      // calculate the relative scroll position, similar to the About component
      const sectionTop = projectsSection.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = projectsSection.getBoundingClientRect().height;
      const relativeScroll = current - sectionTop;

      /* animation trigger points:
       * Scroll down:
       * - trigger: when the Projects section is close to the top (relative scroll in -40% to 0%)
       * - reset: when the scroll is over 90% of the Projects section
       *
       * Scroll up:
       * - trigger: when the Projects section is re-entered from the bottom (relative scroll in 40% to 90%)
       * - reset: when the Projects section is completely out of the viewport
       */

      if (direction === 'down') {
        // when the Projects section enters the bottom 20% of the viewport, trigger the animation
        if (relativeScroll >= -sectionHeight * 0.4 && relativeScroll <= 0) {
          setIsAnimating(true);
        }
        // when the Projects section is completely out of the viewport, reset
        else if (relativeScroll > sectionHeight * 0.9) {
          setIsAnimating(false);
        }
      } else {
        // scroll up
        // when the Projects section is re-entered from the bottom, show
        if (relativeScroll >= sectionHeight * 0.4 && relativeScroll <= sectionHeight * 0.9) {
          setIsAnimating(true);
        }
        // when the Projects section is completely out of the viewport, reset
        else if (relativeScroll < -sectionHeight * 0.4) {
          setIsAnimating(false);
        }
      }

      lastScrollY = current;
    });

    return () => unsubscribe();
  }, [scrollY, isMobile]);

  const [activeExpandedIndex, setActiveExpandedIndex] = useState<number | null>(null);

  return (
    <div
      id="work"
      ref={ref}
      className="px-4 lg:px-12 py-12 lg:pt-28 lg:pb-48 bg-[#efeee9]"
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
          <div className="grid grid-cols-12 pl-3 lg:pl-0 pr-4 lg:px-4 pb-4 border-b border-[#333] w-full">
            {[
              { text: 'PROJECT', span: 'col-start-1 col-end-5 pl-0 lg:pl-4' },
              { text: 'CATEGORY', span: 'col-start-6 lg:col-start-5 col-end-9 pl-0 lg:pl-2' },
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
                text: 'LIVE',
                span: 'col-start-12 col-end-13 mr-0 sm:mr-0 lg:mr-4 ',
                align: 'text-right',
              },
            ].map(({ text, span, align = '', className = '' }) => (
              <h3
                key={text}
                className={`${span} lg:text-base text-xxs font-normal ${align} text-[#333] ${className}`}
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
                    activeExpandedIndex={activeExpandedIndex}
                    setActiveExpandedIndex={setActiveExpandedIndex}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </motion.div>

        <Rounded
          onClick={handleToggleProjects}
          className="!w-[140px] !h-[40px] sm:!w-[180px] sm:!h-[40px] lg:!w-[230px] lg:!h-[65px] 
                    rounded-full mt-2 lg:mt-12 mb-12 lg:mb-16 
                    !border-[1px] !border-[#333] hover:!border-[#E6E5DF] hover:bg-[#E6E5DF] group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <p
            className="relative z-10 group-hover:text-[#E6E5DF] dark:group-hover:text-[#E6E5DF]
                      text-base sm:text-sm lg:text-base font-normal tracking-wider"
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
            className="aspect-[5/3] w-[250px] lg:w-[500px] fixed top-1/2 left-1/2 pointer-events-none overflow-hidden z-[3] rounded-xl"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div
              style={{ top: `${index * -100}%` }}
              className="h-full w-full relative transition-[top] duration-500 ease-custom-bezier"
            >
              {projects.map((project, i) => (
                <div
                  key={`modal_${i}`}
                  className="w-full aspect-[5/3] relative"
                >
                  <Image
                    src={`/images/${project.src}`}
                    fill
                    alt={`${project.title} preview`}
                    className="object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 768px) 250px, 500px"
                    priority={i === 0}
                  />
                  {/* {project.images && project.images[0] && project.images[0].caption && (
                    <span className="absolute top-2 left-2 inline-block px-2 py-1 text-xxs lg:text-xs font-light text-[#333] bg-[#EFEEE9] border border-[#EFEEE9] rounded-full z-10">
                      {project.images[0].caption}
                    </span>
                  )} */}
                </div>
              ))}
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
    </div>
  );
}
