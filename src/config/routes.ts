export interface RouteItem {
  title: string;
  href: string;
  label: string;
  description?: string;
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
    href: '/#about',
    label: 'About',
    description: 'Learn more about me',
  },
  {
    title: 'Work',
    href: '/#work',
    label: 'Work',
    description: 'View my projects',
  },
  {
    title: 'Contact',
    href: '/#contact',
    label: 'Contact',
    description: 'Get in touch',
  },
];
