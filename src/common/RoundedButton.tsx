'use client'

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import Magnetic from "@/common/Magnetic";

interface RoundedButtonProps {
  children: ReactNode;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
  onClick?: () => void;
}

export default function RoundedButton({
  children,
  backgroundColor = "#EB7A40",
  className = "",
  onClick,
  ...props
}: RoundedButtonProps) {
  const circle = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    // Initialize the circle mask
    if (circle.current) {
      gsap.set(circle.current, {
        top: "100%",
        width: "100%"
      });
    }

    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(circle.current, {
        top: "-25%",
        width: "150%",
        duration: 0.4,
        ease: "power3.in"
      }, "enter")
      .to(circle.current, {
        top: "-150%",
        width: "125%",
        duration: 0.25
      }, "exit");

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeline.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current?.tweenFromTo('enter', 'exit');
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current?.play();
    }, 300);
  };

  return (
    <Magnetic>
      <div
        onClick={onClick}
        className={`
          relative overflow-hidden cursor-pointer
          rounded-full border-[1px] border-gray-400
          flex items-center justify-center
          px-[15px] py-[15px]
          ${className}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <span className="relative z-[1] transition-colors duration-400 whitespace-nowrap">
          {children}
        </span>
        <div
          ref={circle}
          className="absolute h-[150%] rounded-[50%]"
          style={{ 
            backgroundColor,
            left: "-25%",
            width: "150%"
          }}
        />
      </div>
    </Magnetic>
  );
}