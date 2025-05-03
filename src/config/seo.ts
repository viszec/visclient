// SEO Configuration
export const siteConfig = {
  // Basic Site Information
  name: 'Mavis M.',
  title: 'Mavis M. → Creative Web Developer & Designer | Melbourne AU',
  description:
    'Creative Web Developer and Designer based in Melbourne, Australia. Specializing in creating memorable web experiences for forward-thinking brands.',
  url: 'https://mavism.me', // Changed from mavisma.com to mavism.me

  // Contact Information
  email: 'imavisma@gmail.com',

  // Social Media Links
  social: {
    github: 'https://github.com/viszec',
    instagram: 'https://www.instagram.com/viis.ma',
    linkedin: 'https://www.linkedin.com/in/imavisma/',
  },

  // Primary Keywords
  keywords: [
    'software engineer',
    'vibe coding',
    'creative web developer',
    'digital marketing',
    'seo specialist',
    'web developer',
    'web designer',
    'nextjs',
    'typescript',
    'web designer',
    'frontend developer',
    'UI designer',
    'Melbourne',
    'Australia',
    'creative developer',
    'portfolio',
    'React developer',
    'Next.js developer',
    'responsive design',
    'web applications',
    'interactive websites',
    'user experience',
    'UX design',
    'digital design',
    'website developer Melbourne',
    'creative coder',
    'visual designer',
  ],

  // Default OG Image for social sharing
  defaultOGImage: '/images/og-image.jpg', // Create and add this image to your public directory
};

// Default SEO metadata for pages that don't override
export const defaultSEO = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.defaultOGImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    handle: '@mavisma', // Replace with your Twitter handle (if applicable)
    site: '@mavisma',
    cardType: 'summary_large_image',
  },
};

// Type definitions for page-specific SEO
export type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
};
