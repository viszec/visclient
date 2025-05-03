'use client';

import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Cookie } from 'lucide-react';

// Small floating button that appears in the corner of the screen after a delay
// When clicked, it opens the cookie preferences dialog
const CookieManager = () => {
  const [showButton, setShowButton] = useState(false);

  // Show the button after a delay if the user has already set cookie preferences
  useEffect(() => {
    const hasConsent = typeof window !== 'undefined' ? localStorage.getItem('cookieConsent') : null;

    // Only show the cookie manager button if the user has already set cookie preferences
    if (hasConsent) {
      const timer = setTimeout(() => {
        setShowButton(false); // Changed to false to hide the floating button
      }, 5000); // Show after 5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  // Handle opening cookie preferences
  const handleOpenCookiePreferences = () => {
    if (typeof window !== 'undefined' && window.showCookieManager) {
      window.showCookieManager();
      // Hide the button after opening preferences
      setShowButton(false);
    }
  };

  // 保留代码和功能，但默认不显示悬浮按钮
  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={handleOpenCookiePreferences}
          className="fixed bottom-4 right-4 bg-[#adaca7] text-[#efeee9] p-2 rounded-full shadow-lg z-[9998] hover:bg-[#adaca7]/80 transition-colors"
          aria-label="Manage cookie preferences"
        >
          <Cookie size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default CookieManager;
