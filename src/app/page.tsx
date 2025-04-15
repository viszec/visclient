'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import SlideImage from '@/components/sections/SlideImage';
import PreloaderAnimation from '@/components/sections/PreloaderAnimation';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setShowHeader(true);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 1000);

      return () => {
        locomotiveScroll.destroy();
      };
    })();
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading && showHeader && <Header />}

      <main className="min-h-screen">
        {isLoading ? (
          <PreloaderAnimation onComplete={handlePreloaderComplete} />
        ) : (
          <>
            <Hero isVisible={true} />
            <About />
            <Projects />
            <Services />
            {/* <SlideImage /> */}
            <Contact />
          </>
        )}
      </main>
      {!isLoading && <Footer />}
    </>
  );
}
