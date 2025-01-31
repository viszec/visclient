"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import Preloader from "@/components/sections/Preloader";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import SlideImage from "@/components/sections/SlideImage";
//import Skills from "@/components/Section/Skills";
import Contact from "@/components/sections/Contact";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        setShowHeader(true);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);

      return () => {
        locomotiveScroll.destroy();
      };
    })();
  }, []);

  return (
    <>
      {showHeader && <Header />}
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
        <HeroSection />
        <About />
        <Projects />
        <SlideImage />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
