// Cookie consent types
export type ConsentType = 'accepted' | 'rejected' | 'essential' | null;

// Cookie categories for more granular control
export type CookieCategory = 'essential' | 'analytics' | 'marketing' | 'preferences';

// Define type for Facebook pixel function
type FbqFunction = (...args: unknown[]) => void;

// Cookie service for managing cookie consent
const CookieService = {
  // Get cookie consent status
  getConsent: (): ConsentType => {
    if (typeof window === 'undefined') return null;

    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted' || consent === 'rejected' || consent === 'essential') {
      return consent;
    }
    return null;
  },

  // Set cookie consent status
  setConsent: (type: ConsentType): void => {
    if (typeof window === 'undefined' || !type) return;

    localStorage.setItem('cookieConsent', type);

    // Initialize or clean up cookies based on consent choice
    if (type === 'accepted') {
      // Initialize tracking cookies like Facebook Pixel
      CookieService.initializeFacebookPixel();
    } else if (type === 'rejected') {
      // This is where you would clear any non-essential cookies
      CookieService.cleanupTrackingCookies();
    }
  },

  // Check if user has given consent for specific cookie types
  hasConsent: (type?: CookieCategory): boolean => {
    if (typeof window === 'undefined') return false;

    const consent = localStorage.getItem('cookieConsent');

    if (consent === 'accepted') {
      return true;
    }

    if (consent === 'essential') {
      // Only essential cookies allowed, so return true only for essential cookies
      return type === 'essential';
    }

    return false;
  },

  // Initialize Facebook Pixel
  initializeFacebookPixel: (): void => {
    if (typeof window === 'undefined') return;

    // Only initialize if consent was given
    if (CookieService.hasConsent('marketing')) {
      // Facebook Pixel code
      // This is a placeholder - replace with actual Facebook Pixel ID
      const FACEBOOK_PIXEL_ID = 'YOUR_FACEBOOK_PIXEL_ID';

      // Add Facebook Pixel code to the page
      // This would be replaced with actual implementation in production
      console.log('Initializing Facebook Pixel with ID:', FACEBOOK_PIXEL_ID);

      // Example implementation
      if (!window.fbq) {
        window.fbq = function (...args: unknown[]) {
          window._fbq.push(args);
        };

        window._fbq = (window._fbq || []) as unknown[];

        // Load the Facebook Pixel script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        document.head.appendChild(script);

        // Initialize the Pixel
        window.fbq('init', FACEBOOK_PIXEL_ID);
        window.fbq('track', 'PageView');
      }
    }
  },

  // Clean up tracking cookies
  cleanupTrackingCookies: (): void => {
    if (typeof window === 'undefined') return;

    // Clear Facebook Pixel cookies if they exist
    document.cookie.split(';').forEach((cookie) => {
      const [name] = cookie.split('=').map((c) => c.trim());
      if (name.startsWith('_fb') || name.startsWith('fr') || name.startsWith('_fbc')) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });

    // Clear other tracking cookies as needed
  },

  // Clear all consent
  clearConsent: (): void => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('cookieConsent');
    CookieService.cleanupTrackingCookies();
  },
};

// Declare fbq for TypeScript
declare global {
  interface Window {
    fbq: FbqFunction;
    _fbq: unknown[];
  }
}

export default CookieService;
