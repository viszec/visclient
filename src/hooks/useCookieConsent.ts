'use client';

import { useEffect, useState } from 'react';

import CookieService, { ConsentType } from '@/services/cookieService';

/**
 * Custom hook for managing cookie consent throughout the application
 */
export default function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentType>(null);

  useEffect(() => {
    // Initialize consent state from storage
    setConsent(CookieService.getConsent());

    // Listen for storage changes (in case consent is updated in another tab)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'cookieConsent') {
        const newValue = event.newValue as ConsentType;
        setConsent(newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Function to update consent
  const updateConsent = (newConsent: ConsentType) => {
    CookieService.setConsent(newConsent);
    setConsent(newConsent);
  };

  // Function to check if specific cookie type is allowed
  const isAllowed = (type?: 'analytics' | 'marketing' | 'preferences'): boolean => {
    if (consent === 'accepted') return true;
    if (consent === 'essential' || consent === 'rejected') return false;
    return false;
  };

  // Function to reset consent
  const resetConsent = () => {
    CookieService.clearConsent();
    setConsent(null);
  };

  return {
    consent,
    isAllowed,
    updateConsent,
    resetConsent,
    hasConsented: consent !== null,
  };
}
