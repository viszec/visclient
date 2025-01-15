import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mavis M. | Portfolio - Web Developer & Designer in Melbourne, AU',
  description: 'Greetings! I am a web developer and designer based in Melbourne, Canada. I specialize in creating memorable web experiences for forward-thinking brands.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
