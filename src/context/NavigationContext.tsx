'use client';

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { trackPageView } from '@/lib/analytics';

// Local storage key name, used to record if user has visited site
export const HAS_VISITED_KEY = 'mavis_has_visited_site';

// Define context type
interface NavigationContextType {
  hasVisitedSite: boolean;
  setHasVisitedSite: (hasVisited: boolean) => void;
  isNavigatingBetweenPages: boolean;
  setIsNavigatingBetweenPages: (isNavigating: boolean) => void;
  currentPath: string;
  previousPath: string | null;
}

// Create context
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Provider component
export function NavigationProvider({ children }: { children: ReactNode }) {
  const [hasVisitedSite, setHasVisitedSite] = useState(false);
  const [isNavigatingBetweenPages, setIsNavigatingBetweenPages] = useState(false);
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);

  // Listen for route changes
  useEffect(() => {
    if (pathname !== currentPath) {
      setPreviousPath(currentPath);
      setCurrentPath(pathname);

      // Track page view when navigation completes
      if (typeof window !== 'undefined') {
        trackPageView(pathname);
      }

      // Set navigation state, can be used for page transition animation
      setIsNavigatingBetweenPages(true);
      const timer = setTimeout(() => {
        setIsNavigatingBetweenPages(false);
      }, 500); // Set transition time

      return () => clearTimeout(timer);
    }
  }, [pathname, currentPath]);

  // Check localStorage when component mounts
  useEffect(() => {
    // Only execute on client
    if (typeof window !== 'undefined') {
      const hasVisited = localStorage.getItem(HAS_VISITED_KEY) === 'true';
      setHasVisitedSite(hasVisited);

      // If it's the first visit, set the flag
      if (!hasVisited) {
        localStorage.setItem(HAS_VISITED_KEY, 'true');
      }

      // Track the initial page view
      trackPageView(pathname);
    }
  }, [pathname]);

  // Listen for changes in hasVisitedSite, update localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && hasVisitedSite) {
      localStorage.setItem(HAS_VISITED_KEY, 'true');
    }
  }, [hasVisitedSite]);

  return (
    <NavigationContext.Provider
      value={{
        hasVisitedSite,
        setHasVisitedSite,
        isNavigatingBetweenPages,
        setIsNavigatingBetweenPages,
        currentPath,
        previousPath,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

// Custom hook, convenient to use in components
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
