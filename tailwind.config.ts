import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      transitionDuration: {
        '400': '400ms',
      },
      spacing: {
        '18': '4.5rem',
        '20': '5rem',
        '24': '6rem',
        '100': '25rem',
        '120': '30rem',
        '160': '40rem',
        '200': '50rem',
      },
      maxWidth: {
        '1400': '1400px',
      },
      zIndex: {
        '3': '3',
      },
      transitionTimingFunction: {
        'custom-bezier': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      backgroundColor: {
        'modal-blue': '#455CE9',
      },
      height: {
        '350': '350px',
        '400': '400px',
      },
      width: {
        '400': '400px',
      },
      margin: {
        '300': '300px',
      },
      padding: {
        '200': '200px',
      },
      animation: {
        'floating': 'floating 3s infinite ease-in-out',
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      }
    },
  },
  plugins: [],
};

export default config;
