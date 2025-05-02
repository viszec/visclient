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

  // Add only the live URLs of projects to the sitemap
  // This includes external websites that the portfolio links to
  projects.forEach((project) => {
    if (project.liveURL && project.liveURL.includes('http')) {
      // Only include external URLs (not relative paths)
      routes.push({
        url: project.liveURL,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    }

    // If project has an app URL, add it as well
    if (project.appURL && project.appURL.includes('http')) {
      routes.push({
        url: project.appURL,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    }
  });

  return routes;
}
