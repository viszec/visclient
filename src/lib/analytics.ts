// analytics.ts - Analytics and tracking utilities
import CookieService from '@/services/cookieService';

/**
 * Tracks a page view if user has consented to marketing cookies
 * @param url - The URL of the page being viewed
 */
export const trackPageView = (url: string) => {
  // Only track if we have consent for marketing cookies
  if (typeof window !== 'undefined' && CookieService.hasConsent('marketing')) {
    try {
      // Facebook Pixel pageview
      if (window.fbq) {
        window.fbq('track', 'PageView');
        console.log('Tracked page view:', url);
      }

      // Add other analytics services here if needed
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }
};

/**
 * Tracks a custom event if user has consented to marketing cookies
 * @param eventName - Name of the event to track
 * @param eventData - Additional data to include with the event
 */
export const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
  // Only track if we have consent for marketing cookies
  if (typeof window !== 'undefined' && CookieService.hasConsent('marketing')) {
    try {
      // Facebook Pixel custom event
      if (window.fbq) {
        window.fbq('track', eventName, eventData);
        console.log('Tracked event:', eventName, eventData);
      }

      // Add other analytics services here if needed
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }
};
