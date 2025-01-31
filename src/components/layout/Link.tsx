'use client'

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { scale } from '@/types/animation';

interface NavLinkProps {
  data: {
    title: string;
    href: string;
    index: number;
  };
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
}

const linkVariants = {
  initial: { opacity: 0, x: -20 },
  enter: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.1 * i,
      ease: [0.76, 0, 0.24, 1]
    }
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.5,
      delay: 0.1 * i,
      ease: [0.76, 0, 0.24, 1]
    }
  })
};

export default function NavLink({ data, isActive, setSelectedIndicator }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { title, href, index } = data;

  return (
    <motion.div 
      className="relative flex items-center group"
      onMouseEnter={() => {
        setSelectedIndicator(href);
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      custom={index}
      variants={linkVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div 
        variants={scale}
        animate={isActive || isHovered ? "open" : "closed"}
        className="w-1 h-1 lg:w-2 lg:h-2 bg-white rounded-full absolute -left-[20px] lg:-left-[30px]
                   transition-transform duration-200 ease-out
                   transform scale-0 group-hover:scale-100"
      />
      <Link 
        href={href}
        className="text-white/80 hover:text-white font-light py-4 text-base lg:text-3xl transition-colors duration-200
                   relative after:content-[''] after:absolute after:bottom-0 
                   after:left-0 after:w-0 after:h-[1px] after:bg-white 
                   after:transition-all after:duration-300
                   hover:after:w-full"
      >
        {title}
      </Link>
    </motion.div>
  );
} 