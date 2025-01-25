'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Curve() {
  const [path, setPath] = useState({
    initial: '',
    target: ''
  });

  useEffect(() => {
    setPath({
      initial: `M100 0 L100 ${window.innerHeight} Q-100 ${window.innerHeight/2} 100 0`,
      target: `M100 0 L100 ${window.innerHeight} Q100 ${window.innerHeight/2} 100 0`
    });
  }, []);

  const curve = {
    initial: {
      d: path.initial
    },
    enter: {
      d: path.target,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: path.initial,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <svg 
      className="absolute top-0 -left-[99px] w-[60px] h-full fill-[#292929] stroke-none
                 lg:top-0 lg:-left-[99px] lg:w-[100px] lg:h-full"
      aria-hidden="true"
    >
      {path.initial && (
        <motion.path 
          variants={curve} 
          initial="initial" 
          animate="enter" 
          exit="exit"
        />
      )}
    </svg>
  );
} 