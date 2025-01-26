"use client";

import { useRef, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SliderText() {
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const xPercentRef = useRef(0);
  const directionRef = useRef<number>(1);

  const animate = useCallback(() => {
    if (xPercentRef.current < -100) {
      xPercentRef.current = 0;
    } else if (xPercentRef.current > 0) {
      xPercentRef.current = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercentRef.current });
    gsap.set(secondText.current, { xPercent: xPercentRef.current });
    requestAnimationFrame(animate);
    xPercentRef.current += 0.1 * directionRef.current;
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.15,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => {
          directionRef.current = e.direction * -1;
        },
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, [animate]);

  return (
    <div className="absolute top-[calc(100vh-180px)]">
      <div ref={slider} className="relative whitespace-nowrap">
        <p
          ref={firstText}
          className="relative m-0 text-black text-4xl lg:text-[150px] font-normal lg:font-medium pr-12"
        >
          INNÖVATION <span className="dot">*</span>
        </p>
        <p
          ref={secondText}
          className="absolute left-full top-0 m-0 text-black/90 text-4xl lg:text-[150px] font-normal lg:font-medium pr-12"
        >
          CReATiVITY <span className="dot">•</span>
        </p>
      </div>
    </div>
  );
}
