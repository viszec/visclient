import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{css}',
    './src/app/fonts/**/*.{ttf,otf}',
  ],
  theme: {
    screens: {
      sm: '640px',     // mobile
      md: '1024px',    // tablet
      lg: '1280px',    // laptop
      xl: '1440px',    // desktop
      '2xl': '1680px', // large desktop
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
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
        'sm': '640px',
        'md': '1025px',
        'lg': '1280px',
        'xl': '1440px',
        '2xl': '1680px',
      },
      fontSize: {
        xxs: '0.6rem',
        xs: '0.7rem',
      },
      zIndex: {
        '3': '3',
      },
      transitionTimingFunction: {
        'custom-bezier': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'smooth-bezier': 'cubic-bezier(0, 0, 0, 1)',
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
        floating: 'floating 3s infinite ease-in-out',
        'fill': 'fill 2s cubic-bezier(0.6,0,0.4,1) forwards'
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        hidden: 'hidden',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'gradient-border':
          'linear-gradient(35deg, rgba(247,202,201,1) 0%, rgba(255,255,255,1) 15%, rgba(146,168,209,1) 30%, rgba(255,255,255,1) 45%, rgba(136,176,169,1) 60%, rgba(255,255,255,1) 75%, rgba(245,230,202,1) 100%)',
        'metallic-gradient': 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
        holographic: 'linear-gradient(225deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
      },
      fontFamily: {
        instrument: ['"Instrument Serif"', 'serif'],
        'just-another-hand': ['"Just Another Hand"', 'cursive'],
        'just-me-again': ['var(--font-just-me-again)', 'cursive'],
        azeretMono: ['AzeretMono', 'monospace'],
        halenoir: ['Halenoir', 'sans-serif'],
        'roslindale': ['"Roslindale Display Condensed"', 'serif'],
        'baskervville': ['"Baskervville"', 'serif'],
        'ppneuemontreal': ['"PP Neue Montreal"', 'sans-serif'],
        'neuemontreal': ['"Neue Montreal"', 'sans-serif'],
        'ppeditorialold': ['"PP Editorial Old"', 'serif'],
        'ppeditorialoldultralight': ['"PP Editorial Old UltraLight"', 'serif'],
      },
      keyframes: {
        fill: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
    },
  },
  plugins: [animate],
};

export default config;
