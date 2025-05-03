'use client';

import { useEffect, useState } from 'react';

import { useAppContext } from '@/context/AppContext';
import { useNavigation } from '@/context/NavigationContext';

import { ChatbotButton } from '@/components/chatbot';
//import { AnimatePresence } from 'framer-motion';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Hero from '@/components/sections/Hero';
import Preloader from '@/components/sections/Preloader';
//import SlideImage from '@/components/sections/SlideImage';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';

// Local storage key, used to record if user has visited site
const HAS_VISITED_KEY = 'mavis_has_visited_site';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(false);
  const { setPreloaderComplete, setLandingPageReady } = useAppContext();
  const { hasVisitedSite } = useNavigation();

  // Check if user has visited site and set state accordingly
  useEffect(() => {
    if (hasVisitedSite) {
      // User has visited before, skip preloader
      console.log('User has visited before, skipping preloader');
      setIsLoading(false);
      setShowHeader(true);
      setPreloaderComplete(true);
      setLandingPageReady(true);

      // Initialize LocomotiveScroll (no waiting, because we skipped preloader)
      import('locomotive-scroll').then(({ default: LocomotiveScroll }) => {
        const locomotiveScroll = new LocomotiveScroll();
        // Scroll to top can be placed here
        window.scrollTo(0, 0);
        document.body.style.cursor = 'default';
      });
    }
  }, [hasVisitedSite, setPreloaderComplete, setLandingPageReady]);

  // Only initialize LocomotiveScroll when preloader is needed (first visit to site)
  useEffect(() => {
    if (isLoading || hasVisitedSite) {
      return; // If still loading or user has visited, do not initialize
    }

    (async () => {
      // Initialize LocomotiveScroll when preloader is complete (first visit to site)
      if (!showHeader) {
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
      }
    })();
  }, [isLoading, showHeader, hasVisitedSite]);

  // Listen for page load status
  useEffect(() => {
    if (!isLoading) {
      console.log('Page is not loading, setting landing page ready');
      // Ensure all content is loaded after preloader completes
      setTimeout(() => {
        setLandingPageReady(true);
      }, 500);
    }
  }, [isLoading, setLandingPageReady]);

  const handlePreloaderComplete = () => {
    console.log('Preloader complete, updating state');
    setIsLoading(false);

    // Use a short delay to ensure components have completed state transition
    setTimeout(() => {
      console.log('Setting preloader complete in context');
      // Notify AppContext that preloader has completed
      setPreloaderComplete(true);
    }, 300);
  };

  const handleSendMessage = async (message: string, language = 'en') => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language }),
    });

    const data = await response.json();
    return data;
  };

  return (
    <>
      {!isLoading && showHeader && <Header />}

      <main className="min-h-screen">
        {isLoading ? (
          <Preloader onComplete={handlePreloaderComplete} />
        ) : (
          <>
            <Hero isVisible={true} />
            <About />
            <Projects />
            <Services />
            {/* <SlideImage /> */}
            <Contact />
            <ChatbotButton onSendMessage={handleSendMessage} />
          </>
        )}
      </main>
      {!isLoading && <Footer />}
    </>
  );
}
