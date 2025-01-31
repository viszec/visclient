'use client'

import React, { useEffect, useRef, ReactElement } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactElement;
  strength?: number;
  dampening?: number;
}

export default function Magnetic({ 
  children, 
  strength = 0.35, 
  dampening = 0.3 
}: MagneticProps) {
  const magnetic = useRef<HTMLElement>(null);

  useEffect(() => {
    const xTo = gsap.quickTo(magnetic.current, "x", {
      duration: 1,
      ease: `elastic.out(1, ${dampening})`
    });
    
    const yTo = gsap.quickTo(magnetic.current, "y", {
      duration: 1,
      ease: `elastic.out(1, ${dampening})`
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const element = magnetic.current;
      
      if (!element) return;

      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const element = magnetic.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [strength, dampening]);

  return React.cloneElement(children, { ref: magnetic });
}