import { MetadataRoute } from 'next';

import { siteConfig } from '@/config/seo';

// Generate robots.txt for the site
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow API endpoints and dynamically generated project pages
      // that may not exist as actual routes in the Next.js app
      disallow: [
        '/api/*',
        '/work/*', // Disallow crawling individual project pages if they're modal-based
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
