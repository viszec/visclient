import type { Metadata } from 'next';
import { Inter, Just_Me_Again_Down_Here } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const justMe = Just_Me_Again_Down_Here({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-just-me-again',
});

export const metadata: Metadata = {
  title: 'Mavis M. -> Creative Web Developer & Designer | Melbourne AU',
  description:
    'Greetings! I am a creative Web Developer and Designer based in Melbourne, Australia. I specialize in creating memorable web experiences for forward-thinking brands.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${justMe.variable}`}
    >
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}