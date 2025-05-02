'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useNavigation } from '@/context/NavigationContext';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function PrivacyNoticePage() {
  const [showPage, setShowPage] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hasVisitedSite, isNavigatingBetweenPages } = useNavigation();

  useEffect(() => {
    // Show content with a slight delay for smooth transition
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Page transition variants
  const pageTransitionVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
      className={isNavigatingBetweenPages ? 'pointer-events-none' : ''}
    >
      <Header />

      <motion.main
        className="min-h-screen bg-[#efeee9] pt-24 md:pt-32 pb-20"
        initial="hidden"
        animate={showPage ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <div className="container mx-auto px-6 md:px-10 lg:px-16 2xl:px-32 max-w-screen-xl">
          <motion.div
            variants={childVariants}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center text-[#333] hover:text-[#333]/60 transition-colors"
            >
              <ArrowLeft
                size={16}
                className="mr-2"
              />
              <span className="text-sm font-halenoir">Back to home</span>
            </Link>
          </motion.div>

          <motion.h1
            variants={childVariants}
            className="text-2xl md:text-3xl lg:text-5xl font-medium font-roslindale text-[#333] mb-4 md:mb-14"
          >
            Privacy Notice
          </motion.h1>
          <motion.section
            variants={childVariants}
            className="pb-6"
          >
            <p className="text-[#333]/60 font-halenoir text-sm italic">Last Updated: June 15, 2024</p>
          </motion.section>

          <div className="space-y-8 md:space-y-12">
            <motion.section
              variants={childVariants}
              className="space-y-4"
            >
              <h2 className="text-xl md:text-2xl font-medium font-roslindale text-[#333]">Introduction</h2>
              <p className="text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                This Privacy Notice outlines how Mavis M. (&ldquo;me&rdquo;, &ldquo;my&rdquo;, or &ldquo;her&rdquo;)
                collects, uses, and protects your information when you visit my website. I respect your privacy and am
                committed to protecting your personal data.
              </p>
            </motion.section>

            <motion.section
              variants={childVariants}
              className="space-y-4"
            >
              <h2 className="text-xl md:text-2xl font-medium font-roslindale text-[#333]">Information We Collect</h2>
              <p className="text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                This website may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                <li>
                  <span className="font-medium text-[#333]">Personal Information:</span> Name, email address, and phone
                  number, if you provide them through our contact forms.
                </li>
                <li>
                  <span className="font-medium text-[#333]">Usage Data:</span> Information about how you use my website,
                  including your IP address, browser type, device information, pages visited, and time spent on the
                  site.
                </li>
                <li>
                  <span className="font-medium text-[#333]">Cookies and Tracking Technologies:</span> This website uses
                  cookies to enhance your browsing experience and collect information about how you interact with my
                  site.
                </li>
              </ul>
            </motion.section>

            <motion.section
              variants={childVariants}
              className="space-y-4"
            >
              <h2 className="text-xl md:text-2xl font-medium font-roslindale text-[#333]">
                How We Use Your Information
              </h2>
              <p className="text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                This website uses the collected information for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                <li>To provide and maintain my website</li>
                <li>To notify you about changes to my website</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To analyze how my website is used to improve its functionality</li>
                <li>To deliver relevant content and personalized experiences</li>
                <li>To detect, prevent, and address technical issues</li>
              </ul>
            </motion.section>

            <motion.section
              variants={childVariants}
              className="space-y-4"
            >
              <h2 className="text-xl md:text-2xl font-medium font-roslindale text-[#333]">Cookie Policy</h2>
              <p className="text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                This website uses cookies to enhance your browsing experience. You can set your browser to refuse all or
                some browser cookies, or to alert you when websites set or access cookies. However, if you disable or
                refuse cookies, some parts of my website may become inaccessible or not function properly.
              </p>
              <p className="text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                This website uses the following types of cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                <li>
                  <span className="font-medium text-[#333]">Essential Cookies:</span> Required for the website to
                  function properly.
                </li>
                <li>
                  <span className="font-medium text-[#333]">Analytical/Performance Cookies:</span> Allow this website to
                  recognize and count visitors and see how they move around my website.
                </li>
                <li>
                  <span className="font-medium text-[#333]">Functionality Cookies:</span> Used to recognize you when you
                  return to my website.
                </li>
                <li>
                  <span className="font-medium text-[#333]">Targeting Cookies:</span> Record your visit to our website,
                  the pages you have visited, and the links you have followed.
                </li>
              </ul>
            </motion.section>

            <motion.section
              variants={childVariants}
              className="space-y-4"
            >
              <h2 className="text-xl md:text-2xl font-medium font-roslindale text-[#333]">
                Data Sharing and Disclosure
              </h2>
              <p className="text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                This website may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                <li>Service providers who perform services on my behalf</li>
                <li>Business partners with whom this website jointly offer products or services</li>
                <li>Legal authorities when required by law or to protect my rights</li>
              </ul>
            </motion.section>

            <motion.section
              variants={childVariants}
              className="space-y-4"
            >
              <h2 className="text-xl md:text-2xl font-medium font-roslindale text-[#333]">Your Privacy Rights</h2>
              <p className="text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                Depending on your location, you may have various rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                <li>The right to access your personal data</li>
                <li>The right to correct inaccurate or incomplete data</li>
                <li>The right to delete your personal data</li>
                <li>The right to restrict processing of your data</li>
                <li>The right to data portability</li>
                <li>The right to object to processing of your data</li>
              </ul>
              <p className="text-[#333]/80 font-halenoir text-base md:text-lg leading-relaxed">
                To exercise these rights, please contact us using the details provided below.
              </p>
            </motion.section>

            <motion.section
              variants={childVariants}
              className="space-y-4"
            >
              <h2 className="text-xl md:text-2xl font-medium font-roslindale text-[#333]">Security Measures</h2>
              <p className="text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                This website implements appropriate security measures to protect your personal information from
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
                Internet or electronic storage is 100% secure, and this website cannot guarantee absolute security.
              </p>
            </motion.section>

            <motion.section
              variants={childVariants}
              className="space-y-4"
            >
              <h2 className="text-xl md:text-2xl font-medium font-roslindale text-[#333]">
                Changes to This Privacy Notice
              </h2>
              <p className="text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                This website may update its Privacy Notice from time to time. This website will notify you of any
                changes by posting the new Privacy Notice on this page and updating the &ldquo;Last Updated&rdquo; date.
                You are advised to review this Privacy Notice periodically for any changes.
              </p>
            </motion.section>

            <motion.section
              variants={childVariants}
              className="space-y-4"
            >
              <h2 className="text-xl md:text-2xl font-medium font-roslindale text-[#333]">Contact</h2>
              <p className="text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                If you have any questions about this Privacy Notice, please contact me:
              </p>
              <div className="pl-2 text-[#333]/80 font-halenoir text-sm md:text-lg leading-tight">
                <p>Email: imavisma@gmail.com</p>
                <p>By visiting the contact section on my website</p>
              </div>
            </motion.section>
          </div>
        </div>
      </motion.main>

      <Footer />
    </motion.div>
  );
}
