'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Curve() {
  const [path, setPath] = useState({
    initial: '',
    target: ''
  });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const curveWidth = isMobile ? 40 : 100;
    const curveOffset = isMobile ? -30 : -100;
    
    setPath({
      initial: `M${curveWidth} 0 L${curveWidth} ${window.innerHeight} Q${curveOffset} ${window.innerHeight/2} ${curveWidth} 0`,
      target: `M${curveWidth} 0 L${curveWidth} ${window.innerHeight} Q${curveWidth} ${window.innerHeight/2} ${curveWidth} 0`
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
      className="absolute top-0 w-[40px] h-full fill-black/85 stroke-none -left-[39px]
                 lg:w-[100px] lg:h-full lg:-left-[99px]"
      viewBox={`0 0 ${window.innerWidth < 768 ? 40 : 100} ${window.innerHeight}`}
      preserveAspectRatio="none"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        zIndex: 2
      }}
    >
      {path.initial && (
        <motion.path 
          variants={curve} 
          initial="initial" 
          animate="enter" 
          exit="exit"
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        />
      )}
    </svg>
  );
} 