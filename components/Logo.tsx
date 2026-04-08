import React from 'react'

// The SVG chevron scales to 1em height — always matches cap height of surrounding font
// Usage: <Logo size={28} /> for nav, <Logo size={120} /> for hero, etc.

interface LogoProps {
  size?: number | string
  style?: React.CSSProperties
  textOnly?: boolean  // just 4WARD without chevron
  markOnly?: boolean  // just the › chevron mark alone
}

export function ChevronMark({ size = 28, color = '#F26419', style }: { size?: number | string, color?: string, style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 100 130"
      height={size}
      width={typeof size === 'number' ? size * 0.77 : `calc(${size} * 0.77)`}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
      aria-hidden="true"
    >
      <polyline
        points="15,10 85,65 15,120"
        fill="none"
        stroke={color}
        strokeWidth="22"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

export default function Logo({ size = 28, style, textOnly = false, markOnly = false }: LogoProps) {
  const numSize = typeof size === 'string' ? parseInt(size) : size

  if (markOnly) {
    return <ChevronMark size={size} />
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1, ...style }}>
      <span style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: numSize,
        letterSpacing: Math.round(numSize * 0.04),
        color: '#F26419',
        lineHeight: 1,
      }}>4</span>
      <span style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: numSize,
        letterSpacing: Math.round(numSize * 0.04),
        color: '#F2F2F5',
        lineHeight: 1,
      }}>WARD</span>
      {!textOnly && (
        <ChevronMark
          size={numSize * 0.72}
          style={{ marginLeft: numSize * 0.04 }}
        />
      )}
    </span>
  )
}
