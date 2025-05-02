'use client';

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { useNavigation } from './NavigationContext';

// Define context type
interface AppContextType {
  isPreloaderComplete: boolean;
  setPreloaderComplete: (isComplete: boolean) => void;
  showCookieConsent: boolean;
  setShowCookieConsent: (show: boolean) => void;
  isLandingPageReady: boolean;
  setLandingPageReady: (isReady: boolean) => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isLandingPageReady, setLandingPageReady] = useState(false);
  const { hasVisitedSite } = useNavigation();

  // When user has visited site, automatically set preloader complete and landing page ready state
  useEffect(() => {
    if (hasVisitedSite) {
      setIsPreloaderComplete(true);
      setLandingPageReady(true);
    }
  }, [hasVisitedSite]);

  // Check localStorage when component mounts
  useEffect(() => {
    // Only execute on client
    if (typeof window !== 'undefined') {
      const hasConsent = localStorage.getItem('cookieConsent');
      // If user has not set cookie preferences, we will show cookie dialog after preloader completes
      console.log('AppProvider initialized, hasConsent:', hasConsent);
    }
  }, []);

  // Listen for landing page ready state
  useEffect(() => {
    if (isLandingPageReady && isPreloaderComplete) {
      console.log('Landing page ready and preloader complete');

      // Check if there is already saved consent status
      const hasConsent = typeof window !== 'undefined' ? localStorage.getItem('cookieConsent') : null;

      if (!hasConsent) {
        // Show cookie consent dialog after landing page fully loads
        setTimeout(() => {
          console.log('Showing cookie consent dialog on landing page');
          setShowCookieConsent(true);
        }, 2000); // Delay 2 seconds to show
      }
    }
  }, [isLandingPageReady, isPreloaderComplete]);

  const setPreloaderCompleteHandler = (isComplete: boolean) => {
    console.log('Setting preloader complete:', isComplete);
    setIsPreloaderComplete(isComplete);
  };

  return (
    <AppContext.Provider
      value={{
        isPreloaderComplete,
        setPreloaderComplete: setPreloaderCompleteHandler,
        showCookieConsent,
        setShowCookieConsent,
        isLandingPageReady,
        setLandingPageReady,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook, convenient to use in components
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
