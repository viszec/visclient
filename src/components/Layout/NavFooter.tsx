'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

interface SocialLink {
  name: string;
  url: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://instagram.com/yourusername"
  },
  {
    name: "Facebook",
    url: "https://facebook.com/yourusername"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername"
  }
];

export default function NavFooter() {
  return (
    
    <motion.div 
      className="flex w-full justify-between text-xs gap-10"
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
          className="text-white/70 hover:text-white transition-colors duration-300"
        >
          {link.name}
        </Link>
      ))}
    </motion.div>
  );
} 