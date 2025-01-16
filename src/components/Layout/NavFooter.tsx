'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

interface SocialLink {
  name: string;
  url: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/viszec"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/viis.ma"
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/imavisma/"
  }
];

export default function NavFooter() {
  return (
    
    <motion.div 
      className="flex w-full justify-between text-sm font-light gap-10"
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
          className="text-white/60 hover:text-white transition-colors duration-300"
        >
          {link.name}
        </Link>
      ))}
    </motion.div>
  );
} 