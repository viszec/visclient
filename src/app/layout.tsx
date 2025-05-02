import type { Metadata } from 'next';
import { Inter, Just_Me_Again_Down_Here } from 'next/font/google';
import Script from 'next/script';

import { siteConfig } from '@/config/seo';
import { AppProvider } from '@/context/AppContext';
import { NavigationProvider } from '@/context/NavigationContext';

import CookieConsent from '@/components/common/CookieConsent';
import CookieManager from '@/components/common/CookieManager';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const justMe = Just_Me_Again_Down_Here({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-just-me-again',
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords.join(', '),
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.defaultOGImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.defaultOGImage}`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${justMe.variable}`}
    >
      <body className={inter.className}>
        <NavigationProvider>
          <AppProvider>
            {children}
            <Toaster />
            <CookieConsent privacyUrl="/privacy-notice" />
            <CookieManager />

            {/* Facebook Pixel - Will only activate if consent is given */}
            <Script
              id="facebook-pixel-consent-checker"
              strategy="afterInteractive"
            >
              {`
                function initFacebookPixel() {
                  if(typeof window !== 'undefined') {
                    // Only initialize if consent was given for marketing cookies
                    const consent = localStorage.getItem('cookieConsent');
                    if(consent === 'accepted') {
                      // Facebook Pixel Initialization - Replace YOUR_PIXEL_ID with actual ID
                      !function(f,b,e,v,n,t,s)
                      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                      n.queue=[];t=b.createElement(e);t.async=!0;
                      t.src=v;s=b.getElementsByTagName(e)[0];
                      s.parentNode.insertBefore(t,s)}(window, document,'script',
                      'https://connect.facebook.net/en_US/fbevents.js');
                      fbq('init', 'YOUR_PIXEL_ID');
                      fbq('track', 'PageView');
                      console.log('Facebook Pixel initialized');
                    }
                  }
                }
                
                // Run on initial load
                initFacebookPixel();
                
                // Also listen for storage events (when consent changes)
                window.addEventListener('storage', function(e) {
                  if(e.key === 'cookieConsent') {
                    initFacebookPixel();
                  }
                });
              `}
            </Script>
          </AppProvider>
        </NavigationProvider>
      </body>
    </html>
  );
}
