'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '@/types/animation';
import NavLink from '@/components/Layout/Link';
import Curve from '@/components/Layout/Curve';
import NavFooter from '@/components/Layout/NavFooter';
import { ROUTES } from '@/config/routes';

const containerVariants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1 
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1 
    }
  }
};

export default function SidebarNav() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState<string>(pathname);
  //const [isVisible, setIsVisible] = useState(true);
  

  useEffect(() => {
    setSelectedIndicator(pathname);
  }, [pathname]);

  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit"
      className="h-screen bg-[#292929] fixed right-0 top-0 text-white z-[3] lg:z-[3]
                 shadow-[-10px_0_30px_rgba(0,0,0,0.1)]"
    >
      <div className="box-border h-full p-12 lg:p-[100px] flex flex-col justify-between">
        <motion.div 
          variants={containerVariants}
          className="flex flex-col text-4xl gap-3 mt-10 lg:mt-20"
        >
          <div className="text-[#999999] border-b border-[#999999] uppercase text-sm lg:text-lg font-light mb-10">
            <p className="tracking-wider">Mavis M. -{'>'} Portfolio</p>
          </div>
          <AnimatePresence mode="wait">
            {ROUTES.map((item, index) => (
              <NavLink 
                key={index}
                data={{...item, index}}
                isActive={selectedIndicator === item.href}
                setSelectedIndicator={setSelectedIndicator}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        <NavFooter />
      </div>
      <Curve />
    </motion.div>
  );
} 