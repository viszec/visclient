'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useAppContext } from '@/context/AppContext';
import { useNavigation } from '@/context/NavigationContext';
import CookieService, { CookieCategory } from '@/services/cookieService';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, Settings, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface CookieConsentProps {
  privacyUrl?: string;
}

const CookieConsent = ({ privacyUrl = '/privacy-notice' }: CookieConsentProps) => {
  const [localShowConsent, setLocalShowConsent] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const { showCookieConsent, setShowCookieConsent, isPreloaderComplete, isLandingPageReady } = useAppContext();
  const { hasVisitedSite } = useNavigation();

  // Cookie preferences state
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always enabled
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Initialize preferences from existing consent
  useEffect(() => {
    const consent = CookieService.getConsent();

    if (consent === 'accepted') {
      setCookiePreferences({
        essential: true,
        analytics: true,
        marketing: true,
        preferences: true,
      });
    } else if (consent === 'essential') {
      setCookiePreferences({
        essential: true,
        analytics: false,
        marketing: false,
        preferences: false,
      });
    }
  }, []);

  // On landing page ready, show cookie consent
  useEffect(() => {
    // Ensure page is ready and preloader is complete
    if (isLandingPageReady && showCookieConsent) {
      console.log('Landing page ready and showCookieConsent is true');

      // Check if user has already set cookie preferences
      const hasConsent = typeof window !== 'undefined' ? localStorage.getItem('cookieConsent') : null;

      if (!hasConsent) {
        console.log('No consent found and landing page ready, showing cookie dialog');

        // Only show cookie dialog immediately if user has visited site, otherwise give them a moment to browse
        if (hasVisitedSite) {
          // User has visited site, show cookie consent immediately
          setLocalShowConsent(true);
        } else {
          // First visit, delay cookie consent popup
          setTimeout(() => {
            setLocalShowConsent(true);
          }, 1500);
        }
      }
    }
  }, [isLandingPageReady, showCookieConsent, hasVisitedSite]);

  const handleAccept = () => {
    CookieService.setConsent('accepted');
    setLocalShowConsent(false);
    setShowPreferences(false);
    setShowCookieConsent(false);
  };

  const handleReject = () => {
    CookieService.setConsent('rejected');
    setLocalShowConsent(false);
    setShowPreferences(false);
    setShowCookieConsent(false);
  };

  const handleClose = () => {
    CookieService.setConsent('essential');
    setLocalShowConsent(false);
    setShowPreferences(false);
    setShowCookieConsent(false);
  };

  const handlePreferencesToggle = (category: CookieCategory) => {
    // Cannot disable essential cookies
    if (category === 'essential') return;

    setCookiePreferences((prev) => ({
      ...prev,
      [category]: !prev[category as keyof typeof prev],
    }));
  };

  const handleSavePreferences = () => {
    // If any non-essential cookie is enabled, treat as accepted
    // Otherwise, treat as essential only
    const hasNonEssentialCookies =
      cookiePreferences.analytics || cookiePreferences.marketing || cookiePreferences.preferences;

    CookieService.setConsent(hasNonEssentialCookies ? 'accepted' : 'essential');
    setLocalShowConsent(false);
    setShowPreferences(false);
    setShowCookieConsent(false);
  };

  // Toggle cookie preferences view
  const togglePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  // Show cookie manager (can be triggered from elsewhere)
  const showCookieManager = () => {
    setLocalShowConsent(true);
    setShowPreferences(true);
  };

  // Add to window object so it can be called from anywhere
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.showCookieManager = showCookieManager;
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete window.showCookieManager;
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {localShowConsent && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-0 right-0 mx-auto w-[calc(100%-2rem)] max-w-[400px] md:max-w-[600px] lg:max-w-[700px] bg-[#adaca7] text-[#333] p-4 md:p-6 rounded-lg shadow-lg z-[9999]"
        >
          {!showPreferences ? (
            // Main Cookie Consent View
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base md:text-lg lg:text-lg font-medium text-[#EFEEE9]">Cookie Preferences</h3>
                <button
                  onClick={handleClose}
                  aria-label="Close cookie consent"
                  className="text-[#333] hover:text-white transition-colors duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-xs md:text-sm lg:text-sm mb-4 text-[#EFEEE9] ">
                This website uses cookies to enhance your browsing experience and provide personalized content. You can
                choose your preferences or continue with essential cookies only.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Link
                    href={privacyUrl}
                    className="text-xs lg:text-sm text-[#EFEEE9] underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Notice
                  </Link>

                  <button
                    onClick={togglePreferences}
                    className="text-xs lg:text-sm text-[#EFEEE9] underline flex items-center"
                    aria-label="Customize cookie preferences"
                  >
                    <Settings
                      size={14}
                      className="mr-1"
                    />
                    Customize
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={handleAccept}
                    className="py-2 text-xs lg:text-sm bg-transparent border-2 border-[#efeee9] hover:bg-[#efeee9] text-[#efeee9] hover:text-[#333] rounded transition-colors font-medium duration-300"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={handleReject}
                    className="py-2 text-xs lg:text-sm bg-transparent border-2 border-[#efeee9] hover:bg-[#efeee9] text-[#efeee9] hover:text-[#333] rounded transition-colors font-medium duration-300"
                  >
                    Reject All
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Detailed Preferences View
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base md:text-lg lg:text-lg font-medium text-[#EFEEE9]">
                  <Cookie
                    size={18}
                    className="inline mr-2"
                  />
                  Manage Cookie Preferences
                </h3>
                <button
                  onClick={togglePreferences}
                  aria-label="Back to cookie consent"
                  className="text-[#333] hover:text-white transition-colors duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-4">
                {/* Essential Cookies - Always enabled */}
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-[#EFEEE9]">Essential Cookies</h4>
                    <p className="text-xs text-[#EFEEE9]/80">
                      Required for basic website functionality. Cannot be disabled.
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    disabled={true}
                    aria-label="Essential cookies switch (always enabled)"
                  />
                </div>

                {/* Analytics Cookies */}
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-[#EFEEE9]">Analytics Cookies</h4>
                    <p className="text-xs text-[#EFEEE9]/80">Help me understand how you use my website.</p>
                  </div>
                  <Switch
                    checked={cookiePreferences.analytics}
                    onCheckedChange={() => handlePreferencesToggle('analytics')}
                    aria-label="Analytics cookies switch"
                  />
                </div>

                {/* Marketing Cookies */}
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-[#EFEEE9]">Marketing Cookies</h4>
                    <p className="text-xs text-[#EFEEE9]/80">Used for personalized advertisements and content.</p>
                  </div>
                  <Switch
                    checked={cookiePreferences.marketing}
                    onCheckedChange={() => handlePreferencesToggle('marketing')}
                    aria-label="Marketing cookies switch"
                  />
                </div>

                {/* Preferences Cookies */}
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-[#EFEEE9]">Preference Cookies</h4>
                    <p className="text-xs text-[#EFEEE9]/80">Remember your settings and preferences.</p>
                  </div>
                  <Switch
                    checked={cookiePreferences.preferences}
                    onCheckedChange={() => handlePreferencesToggle('preferences')}
                    aria-label="Preference cookies switch"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Link
                  href={privacyUrl}
                  className="text-xs text-[#EFEEE9] underline self-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Notice
                </Link>

                <Button
                  onClick={handleSavePreferences}
                  className="py-2 px-4 text-xs bg-[#efeee9] text-[#333] hover:bg-[#efeee9]/80 rounded transition-colors font-medium duration-300"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Add showCookieManager to window type
declare global {
  interface Window {
    showCookieManager?: () => void;
  }
}

export default CookieConsent;
