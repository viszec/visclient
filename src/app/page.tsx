"use client";

//import { useEffect, useState } from "react";
//import { AnimatePresence } from "framer-motion";
import HeroSection from "@/components/Section/HeroSection";
//import Preloader from "@/components/Section/Preloader";
import About from "@/components/Section/About";
import Projects from "@/components/Section/Projects";
import SlideImage from "@/components/Section/SlideImage";
//import Skills from "@/components/Section/Skills";
import Contact from "@/components/Section/Contact";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function Home() {
  /* const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);

      return () => {
        locomotiveScroll.destroy();
      };
    })();
  }, []);
  */

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/*<AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>*/}
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
