'use client'

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, slideUp } from '@/types/animation';

interface Dimension {
  width: number;
  height: number;
}

interface PreloaderProps {
  words?: string[];
  backgroundColor?: string;
  textColor?: string;
  dotColor?: string;
  initialDelay?: number;
  wordDelay?: number;
  onComplete?: () => void;
}

export default function Preloader({
  //words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"],
  words = ["Creative", "Solid", "Design", "Engineering", "Is", "Awesome"],
  backgroundColor = "#00000A",
  textColor = "white",
  dotColor = "white",
  initialDelay = 1000,
  wordDelay = 120,
  onComplete
}: PreloaderProps) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState<Dimension>({ width: 0, height: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const updateDimension = useCallback(() => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  useEffect(() => {
    updateDimension();
    window.addEventListener('resize', updateDimension);
    return () => window.removeEventListener('resize', updateDimension);
  }, [updateDimension]);

  useEffect(() => {
    if (index === words.length - 1) {
      const timeout = setTimeout(() => {
        setIsComplete(true);
        onComplete?.();
      }, 1000);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? initialDelay : wordDelay);

    return () => clearTimeout(timeout);
  }, [index, words.length, initialDelay, wordDelay, onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isComplete && dimension.width > 0 && (
        <motion.div 
          variants={slideUp} 
          initial="initial" 
          exit="exit"
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ backgroundColor }}
        >
          <motion.p 
            variants={opacity} 
            initial="initial" 
            animate="enter"
            className="flex items-center absolute z-[1] text-3xl lg:text-[58px]"
            style={{ color: textColor }}
          >
            <span 
              className="block w-2.5 h-2.5 rounded-full mr-2.5"
              style={{ backgroundColor: dotColor }}
            />
            {words[index]}
          </motion.p>
          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              style={{ fill: backgroundColor }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}