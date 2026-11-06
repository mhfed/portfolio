import { Kanit } from 'next/font/google'
import type React from 'react'
import './globals.css'

const kanit = Kanit({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-kanit',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`dark ${kanit.variable}`} suppressHydrationWarning>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='icon' href='/brand-mark.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/icon-192x192.png' />
        <meta name='theme-color' content='#0C0C0C' />
      </head>
      <body>{children}</body>
    </html>
  )
}
