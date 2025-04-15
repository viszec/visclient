"use client";

import React, { useEffect, useRef, useState } from 'react';
import '../../styles/styles.css';
import HeroSection from './Hero';

type HeaderItem = {
  text?: string;
  type?: string;
  dataText?: string;
};

// 添加props接口
interface PreloaderAnimationProps {
  onComplete?: () => void;
}

export default function PreloaderAnimation({ onComplete }: PreloaderAnimationProps) {
  const animationCompletedRef = useRef(false);
  const [showHeroSection, setShowHeroSection] = useState(false);

  useEffect(() => {
    // Import GSAP dynamically
    import('gsap').then((gsapModule) => {
      const gsap = gsapModule.default;

      // Create timeline animation
      const tl = gsap.timeline({ paused: false });

      // Text animation and button display
      tl.to(`.header > h1`, 2, {
        top: 0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.3,
        },
      });

      // After text animation completes, add delay, then show button
      tl.to(`.pre-loader-btn`, {
        opacity: 1,
        duration: 0.5,
        delay: 1.5, // Reduce delay time from 4 seconds to 1.5 seconds
        onComplete: function () {
          animationCompletedRef.current = true;
          const btnElement = document.querySelector(`.pre-loader-btn`) as HTMLElement;
          if (btnElement) btnElement.style.pointerEvents = 'auto';
        }
      });

      // Initialize click area
      const preLoaderBtn = document.querySelector(`.pre-loader-btn`) as HTMLElement;
      if (preLoaderBtn) preLoaderBtn.style.pointerEvents = 'none';
    });

    // Cleanup function
    return () => {
      // Import GSAP to kill animations on unmount
      import('gsap').then((gsapModule) => {
        const gsap = gsapModule.default;
        // Kill all GSAP animations if component unmounts
        gsap.killTweensOf(`.header > h1`);
        gsap.killTweensOf(`.pre-loader-btn`);
      });
    };
  }, []);

  const revealSite = () => {
    if (!animationCompletedRef.current) return;

    // Import GSAP when needed
    import('gsap').then((gsapModule) => {
      const gsap = gsapModule.default;
      const tl2 = gsap.timeline();

      // Fade out preloader
      tl2.to(`.pre-loader`, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: function () {
          const preLoader = document.querySelector(`.pre-loader`) as HTMLElement;
          if (preLoader) preLoader.style.display = "none";
          setShowHeroSection(true);

          // 调用父组件传递的onComplete回调
          if (onComplete) onComplete();
        }
      });

      // After setting showHeroSection to true, we can animate the hero section
      setTimeout(() => {
        import('gsap').then((gsapModule) => {
          const gsap = gsapModule.default;

          // Show main content (now in HeroSection)
          gsap.to(".header-row", 0.8, {
            top: 0,
            ease: "power4.inOut",
            stagger: {
              amount: 0.2,
            },
            delay: 0.2
          });

          gsap.from(".navbar, .footer", 2, {
            opacity: 0,
            y: 20,
            ease: "power4.inOut",
            delay: 0.5
          });
        });
      }, 1000);
    });
  };

  // Create header content function
  const createHeader = (content: HeaderItem[]) => {
    return (
      <div className="header">
        {content.map((item, index) => (
          item.type === 'space' ?
            <h1 key={index} className="word-space"></h1> :
            <h1 key={index} data-text={item.dataText || undefined}>{item.text}</h1>
        ))}
        <div className="header-wrapper"></div>
      </div>
    );
  };

  // Header contents data
  const headerContents: HeaderItem[][] = [
    [
      { text: 'Between' }, { type: 'space' }, { text: 'yesterday\'s' }, { type: 'space' }, { text: 'echoes' }
    ],
    [
      { text: 'and' }, { type: 'space' }, { text: 'to' }, { text: 'M', dataText: 'M' }, { text: 'orrow\'s' },
      { type: 'space' }, { text: 'whispers,' }
    ],
    [
      { text: 'only' }, { type: 'space' }, { text: 'tod' }, { text: 'A', dataText: 'A' }, { text: 'y\'s' },
      { type: 'space' }, { text: 'V', dataText: 'V' }, { text: 'ital' }
    ],
    [
      { text: 'transform' }, { text: 'I', dataText: 'I' }, { text: 'on' }, { type: 'space' },
      { text: 'S', dataText: 'S' }, { text: 'peaks' }
    ],
    [
      { text: 'authentic' }, { type: 'space' }, { text: 'M', dataText: 'M' }, { text: 'etamorphosis' },
      { text: '.', dataText: '.' }
    ]
  ];

  return (
    <>
      <HeroSection isVisible={showHeroSection} />

      <div className="pre-loader" style={{
        position: 'fixed',
        width: '100%',
        minHeight: '100vh', // 改为 minHeight 而非 height
        height: '100%',     // 确保填充整个可见区域
        top: 0,
        left: 0,
        zIndex: 1000,
        overflow: 'hidden' // 防止内容溢出造成滚动条
      }}>
        <div className="pre-loader-container">
          <div className="pre-loader-header text-center font-roslindale tracking-wider">
            {headerContents.map((content, i) => (
              <React.Fragment key={i}>
                {createHeader(content)}
              </React.Fragment>
            ))}
          </div>
          <div className="pre-loader-btn">
            <div className="btn" id="enter-btn" onClick={(e) => {
              e.stopPropagation();
              revealSite();
            }}>
              <span className="text-sm font-light">Click anywhere</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 10">
                <path fill="#e2e2dd" d="M59.2,9.6V6.2h-58v-2c0,0,0,0,0,0h58V0.7L67,5.1L59.2,9.6z"></path>
              </svg>
              <span className="text-sm font-light">to enable my world</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 