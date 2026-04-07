import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '4WARD — Athlete Performance Platform',
  description: 'HRV-based athlete recovery monitoring for high school coaches. Any sport. Bands included.',
  openGraph: {
    title: '4WARD — Athlete Performance Platform',
    description: 'The same data college programs pay $15,000 a year for. Built for high school coaches at $2,499/year. Bands included.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
