import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: '4WARD — Athlete Performance Platform',
  description: 'HRV-based athlete readiness monitoring for high school coaches. Any sport. Bands included.',
  openGraph: {
    title: '4WARD — Athlete Performance Platform',
    description: 'One readiness score. Every athlete. Every morning.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: '#080809', color: '#F2F2F5' }}>{children}</body>
    </html>
  )
}
