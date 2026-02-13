import type { Metadata, Viewport } from 'next'
import { Dancing_Script, Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dancing = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing' })

export const metadata: Metadata = {
  title: 'Queres ser a minha Valentine?',
  description: 'Um convite muito especial para ti',
}

export const viewport: Viewport = {
  themeColor: '#333333',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} ${dancing.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
