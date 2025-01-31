'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Instagram, Linkedin } from 'lucide-react';

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    icon: <Github />,
    url: "https://github.com/viszec"
  },
  {
    name: "Instagram",
    icon: <Instagram />,
    url: "https://www.instagram.com/viis.ma"
  },
  {
    name: "Linkedin",
    icon: <Linkedin />,
    url: "https://www.linkedin.com/in/imavisma/"
  }
];

export default function NavSocials() {
  return (
    <motion.div 
      className="flex w-1/3 pl-0 pr-10 lg:pt-2 justify-between text-xs lg:text-sm font-light gap-3 lg:gap-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {SOCIAL_LINKS.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-30"
          aria-label={link.name}
        >
          <div className="flex w-5 h-5 lg:w-7 lg:h-7 text-white/80 hover:text-white transition-colors duration-300">
            {link.icon}
          </div>
        </Link>
      ))}
    </motion.div>
  );
} 