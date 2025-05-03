import { MetadataRoute } from 'next';

import { siteConfig } from '@/config/seo';
import { projects } from '@/types/projects';

// Generate sitemap for the site
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Get current date for lastModified
  const lastModified = new Date();

  // Define pages in the sitemap
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy-notice`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Add sections as anchors on the main page
  // These are sections within the homepage that can be directly linked
  const sections = [
    {
      name: 'about',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      name: 'work', // Project section ID is 'work'
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      name: 'services',
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      name: 'contact',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Add sections to routes
  sections.forEach((section) => {
    routes.push({
      url: `${baseUrl}/#${section.name}`,
      lastModified,
      changeFrequency: section.changeFrequency,
      priority: section.priority,
    });
  });

  return routes;
}
