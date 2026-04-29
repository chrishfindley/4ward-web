'use client'

import { useEffect, useState } from 'react'
import Logo from '@/components/Logo'
import { setupRevealAndNav } from '@/lib/revealAndNav'

type Path = 'team' | 'individual'

export default function Home() {
  const [activePath, setActivePath] = useState<Path>('team')

  useEffect(() => setupRevealAndNav(), [])

  const pathCopy = {
    team: {
      label: 'Team',
      eyebrow: 'For programs',
      line: 'Roster-wide readiness, recovery trends, and training decisions for coaches.',
      href: '/team',
    },
    individual: {
      label: 'Individual',
      eyebrow: 'For athletes',
      line: 'A mobile-first training home built around readiness, workouts, and recovery.',
      href: '/individual',
    },
  }

  const pathStyle = (path: Path): React.CSSProperties => ({
    display: 'grid',
    gap: 14,
    minHeight: 240,
    alignContent: 'space-between',
    padding: 'clamp(24px, 4vw, 36px)',
    color: 'var(--text-light)',
    textDecoration: 'none',
    borderTop: activePath === path ? '2px solid var(--maroon-bright)' : '1px solid rgba(245,245,242,0.16)',
    background: activePath === path ? 'rgba(245,245,242,0.055)' : 'transparent',
    transition: 'background 0.18s ease, border-color 0.18s ease, transform 0.18s ease',
    transform: activePath === path ? 'translateY(-3px)' : 'translateY(0)',
  })

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--black)', padding: 'clamp(24px, 5vw, 56px)' }}>
      <div className="section-inner" style={{ display: 'grid', gap: 'clamp(48px, 8vw, 96px)' }}>
        <div className="reveal" style={{ display: 'grid', gap: 28, maxWidth: 980 }}>
          <Logo size={34} />
          <h1 style={{ margin: 0, maxWidth: 900, color: 'var(--text-light)', fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(68px, 13vw, 156px)', lineHeight: 0.84, letterSpacing: '-0.018em', fontWeight: 400 }}>
            Recovery intelligence for the way you train.
          </h1>
          <p className="body-lg" style={{ maxWidth: 620, color: 'var(--silver-light)' }}>
            4Ward turns HRV, sleep, resting heart rate, and training signals into clear daily decisions.
          </p>
        </div>

        <div className="reveal delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'clamp(18px, 4vw, 34px)' }}>
          {(['team', 'individual'] as Path[]).map((path) => (
            <a
              key={path}
              href={pathCopy[path].href}
              style={pathStyle(path)}
              onMouseEnter={() => setActivePath(path)}
              onFocus={() => setActivePath(path)}
            >
              <div>
                <div className="eyebrow" style={{ color: activePath === path ? 'var(--maroon-bright)' : 'var(--silver)' }}>{pathCopy[path].eyebrow}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 10vw, 124px)', lineHeight: 0.86, letterSpacing: '-0.01em' }}>
                  {pathCopy[path].label}
                </div>
              </div>
              <p className="body" style={{ maxWidth: 360, color: 'var(--silver-light)' }}>
                {pathCopy[path].line}
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
