'use client'

import { useEffect } from 'react'
import { setupRevealAndNav } from '@/lib/revealAndNav'

export default function Home() {
  useEffect(() => setupRevealAndNav(), [])

  const linkStyle: React.CSSProperties = {
    color: 'var(--text-light)',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(54px, 10vw, 112px)',
    lineHeight: 0.9,
    letterSpacing: '-0.01em',
    textDecoration: 'none',
  }

  const renderLetters = (word: string) => (
    word.split('').map((letter, index) => (
      <span
        key={`${word}-${letter}-${index}`}
        style={{
          display: 'inline-block',
          opacity: 0,
          animation: `letterPhase 2.4s ease ${5.2 + index * 0.42}s forwards`,
        }}
      >
        {letter}
      </span>
    ))
  )

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--black)', padding: '28px' }}>
      <style>{`
        @keyframes phaseIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes letterPhase {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ display: 'grid', gap: 'clamp(36px, 7vw, 72px)', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-light)', fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(78px, 18vw, 190px)', lineHeight: 0.86, letterSpacing: '-0.01em', animation: 'phaseIn 4.4s ease 0.8s both' }}>
          <span style={{ color: 'var(--maroon)' }}>4</span>WARD
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(28px, 7vw, 96px)', flexWrap: 'wrap' }}>
          <a
            href="/team"
            style={linkStyle}
          >
            {renderLetters('TEAM')}<span style={{ color: 'var(--maroon)', opacity: 0, animation: 'phaseIn 1.8s ease 7.3s forwards' }}>&gt;</span>
          </a>
          <a
            href="/individual"
            style={linkStyle}
          >
            {renderLetters('INDIVIDUAL')}<span style={{ color: 'var(--maroon)', opacity: 0, animation: 'phaseIn 1.8s ease 9.6s forwards' }}>&gt;</span>
          </a>
        </div>
      </div>
    </main>
  )
}
