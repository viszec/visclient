export interface RouteItem {
  title: string;
  href: string;
  label: string;
  description?: string;
  isSection?: boolean;
  scrollTarget?: string;
}

export const ROUTES: RouteItem[] = [
  {
    title: 'Home',
    href: '/',
    label: 'Home',
    description: 'Back to homepage',
  },
  {
    title: 'About',
    href: '/about',
    label: 'About',
    description: 'Learn more about me',
    isSection: true,
    scrollTarget: 'about',
  },
  {
    title: 'Work',
    href: '/work',
    label: 'Work',
    description: 'View my projects',
    isSection: true,
    scrollTarget: 'work',
  },
  {
    title: 'Services',
    href: '/services',
    label: 'Services',
    description: 'View my services',
    isSection: true,
    scrollTarget: 'services',
  },
  {
    title: 'Contact',
    href: '/contact',
    label: 'Contact',
    description: 'Get in touch',
    isSection: true,
    scrollTarget: 'contact',
  },
];
