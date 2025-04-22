export interface ProjectType {
  title: string;
  coverImage: string;
  category: string;
  client: string;
  year: string;
  liveURL: string;
  appURL?: string;
  overview?: string;
  stacks?: string[];
  images?: {
    src?: string;
    caption?: string;
  }[];
  solution?: string[];
}

export const projects: ProjectType[] = [
  {
    title: 'HiveStream',
    coverImage: 'hiveStream/Dashboard.webp',
    category: 'Front-end Development',
    client: 'HiveStream',
    year: '2025',
    liveURL: 'https://hivestream.au/',
    appURL: 'https://app.hivestream.au/',
    overview:
      'An AI-powered LinkedIn automation platform that helps businesses and professionals streamline engagement, optimize content posting, and generate quality leads through intelligent analytics and personalized interactions.',
    solution: [
      'Developed responsive React dashboards to streamline time-consuming manual posting processes, significantly improving marketers productivity.',
      'Implemented real-time analytics with TypeScript and Redux to enable data-driven content decisions previously impossible with existing tools.',
      'Created an intuitive UI with Tailwind CSS that maintains authentic user engagement through automated interactions without constant monitoring.',
    ],
    stacks: ['React', 'TypeScript', 'Next.js', 'Redux', 'Styled Components', 'Tailwind CSS', 'Stripe'],
    images: [
      { src: '/images/hiveStream/Dashboard.webp', caption: 'App Analytics Dashboard' },
      { src: '/images/hiveStream/Sections.webp', caption: 'App Features' },
      { src: '/images/hiveStream/Landing.webp', caption: 'Landing Page' },
    ],
  },
  {
    title: 'Acorn Ledger',
    coverImage: 'acornLedger/Dashboard.webp',
    category: 'Full-stack Development',
    client: 'Freelance',
    year: '2025',
    liveURL: 'https://acornledger.io/',
    appURL: 'https://acornledger.vercel.app/sign-in',
    overview:
      'A modern full-stack financial management platform built with Next.js, enabling seamless cross-bank integration and real-time analytics. The platform offers bank-grade security, unified account management, and intelligent financial insights through an elegant dashboard interface.',
    solution: [
      'Built responsive dashboard UI with Next.js and Radix UI components for unified financial management.',
      'Implemented secure backend APIs with Zod validation and TypeScript for robust data handling.',
      'Developed real-time data synchronization using React Hook Form and Redux for state management.',
      'Integrated bank-grade security protocols with enterprise authentication system.',
    ],
    stacks: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Appwrite',
      'Radix UI',
      'Zod',
      'Chart.js',
      'Sentry',
      'Plaid',
      'Dwolla',
    ],
    images: [
      { src: '/images/acornLedger/Dashboard.webp', caption: 'Financial Dashboard' },
      { src: '/images/acornLedger/Landing.webp', caption: 'Landing Page' },
      { src: '/images/acornLedger/Sections.webp', caption: 'App Features' },
    ],
  },
  {
    title: 'CognixAI',
    coverImage: 'cognix/Landing.webp',
    category: 'Front-end Development',
    client: 'CognixAI',
    year: '2024',
    liveURL: 'https://cognix.au/',
    overview:
      'A pioneering AI-driven software development company specializing in transforming raw data into actionable intelligence. We build custom data pipelines with advanced AI models to deliver structured, clean data solutions. Our platform empowers businesses with precisely tailored insights while maintaining the highest standards of data security.',
    solution: [
      'Built advanced SEO landing UI with Next.js and TypeScript.',
      'Enhanced user engagement with intuitive product pathways.',
      'Integrated Docusaurus for lightweight API documentation with light and dark mode.',
      'Enabled fluid navigation without performance loss.',
    ],
    stacks: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Docusaurus'],
    images: [
      { src: '/images/cognix/Landing.webp', caption: 'Landing Page' },
      { src: '/images/cognix/Docs.webp', caption: 'API Documentation' },
    ],
  },
  {
    title: 'NestEase',
    coverImage: 'nestease.webp',
    category: 'Full-stack Development',
    client: 'Freelance',
    year: '2024',
    liveURL: 'https://viszec.github.io/nestease/',
    overview:
      'A comprehensive property booking and management web application inspired by Airbnb. NestEase streamlines the process of listing, discovering, and managing rental properties with an intuitive interface and robust backend functionality.',
    solution: [
      'Developed responsive UI with Next.js and Tailwind CSS for seamless property browsing experience.',
      'Implemented secure user authentication and booking system with TypeScript and MongoDB.',
      'Created an intuitive property management dashboard for hosts to track bookings and analytics.',
    ],
    stacks: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
  },
  {
    title: 'Palette Picker',
    coverImage: 'pp.webp',
    category: 'Web Development',
    client: 'Freelance',
    year: '2024',
    liveURL: 'https://viszec.github.io/palettepicker/',
    overview:
      'An interactive color palette generation tool that allows users to create, save, and download custom color schemes. The application features image color extraction, style-based palette generation, and downloadable color swatches for design projects.',
    solution: [
      'Built color generation algorithms with React and TypeScript for creating harmonious palettes.',
      'Integrated image upload and color extraction functionality using web APIs.',
      'Designed intuitive UI for palette management with export capabilities to various formats.',
    ],
    stacks: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Context API', 'Canvas API'],
  },
  {
    title: 'Brighton ELC',
    coverImage: 'brightonelc.webp',
    category: 'Web Design & Development',
    client: 'Brighton ELC',
    year: '2022',
    liveURL: 'https://www.brightonelc.com.au/',
    overview:
      'A complete redesign and migration from WordPress to Wix for Brighton Early Learning Centre. The project focused on enhancing business content visibility, improving user engagement, and streamlining the enrollment process, resulting in a 65% increase in enrollment applications.',
    solution: [
      'Restructured website architecture to improve content visibility and user navigation.',
      'Implemented waiting list management system to streamline enrollment process.',
      'Redesigned UI/UX with clear content segmentation to highlight key business offerings.',
      'Created engaging interactive elements to increase visitor engagement and retention.',
    ],
    stacks: ['Wix', 'UX/UI Design', 'SEO', 'Content Strategy', 'Custom Forms', 'Google Analytics'],
  },
  {
    title: 'Oak Park CC',
    coverImage: 'opcc.webp',
    category: 'Web Design & Development',
    client: 'OPCC',
    year: '2021',
    liveURL: 'https://oakparkchildrenscentre.com.au/',
    overview:
      "A custom WordPress website built using Elementor for Oak Park Children's Centre. The site features an intuitive navigation system, integrated booking functionality, and responsive design to effectively showcase the centre's facilities and programs to prospective parents.",
    solution: [
      'Developed custom WordPress theme with Elementor for flexible content management.',
      'Created mobile-responsive layouts optimized for various device sizes.',
      'Integrated booking and contact systems to improve parent engagement.',
      'Implemented SEO best practices to improve local search visibility.',
    ],
    stacks: ['WordPress', 'Elementor', 'PHP', 'CSS', 'JavaScript', 'SEO'],
  },
  {
    title: 'Logo Design',
    coverImage: 'logodesign.webp',
    category: 'Logo Design',
    client: 'Freelance',
    year: '2021',
    liveURL: 'https://drive.google.com/file/d/1jLR7BtkqjAyDGzEnu9hRrQ_spjmi8sdQ/view',
  },
  {
    title: 'Astra Early Learning',
    coverImage: 'astra.webp',
    category: 'Web Design & Development',
    client: 'Astra Early Learning',
    year: '2020',
    liveURL: 'https://pm.astraearlylearning.com.au/',
    overview: 'A web application that allows users to manage their Nest Thermostat settings and schedules.',
    solution: [
      'Developed a user-friendly interface with Tailwind CSS and React.',
      'Implemented Nest.js for server-side logic and MongoDB for database storage.',
    ],
    stacks: ['Wix', 'UX/UI Design', 'SEO', 'Content Writing', 'Google Analytics'],
  },
];
