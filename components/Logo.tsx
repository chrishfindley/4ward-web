import React from 'react'

interface LogoProps {
  size?: number | string
  style?: React.CSSProperties
  textOnly?: boolean
  markOnly?: boolean
}

export function ChevronMark({ size = 28, color = '#7B1020', style }: { size?: number | string, color?: string, style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 80 80"
      height={size}
      width={size}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
      aria-hidden="true"
    >
      <polyline
        points="8,7 51,40 8,73"
        fill="none"
        stroke={color}
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Logo({ size = 28, style, textOnly = false, markOnly = false }: LogoProps) {
  const numSize = typeof size === 'string' ? parseInt(size) : size
  if (markOnly) return <ChevronMark size={size} />
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1, ...style }}>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: numSize, letterSpacing: Math.round(numSize * 0.04), color: '#7B1020', lineHeight: 1 }}>4</span>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: numSize, letterSpacing: Math.round(numSize * 0.04), color: '#F2F2F5', lineHeight: 1 }}>WARD</span>
      {!textOnly && <ChevronMark size={numSize * 0.65} style={{ marginLeft: 0, marginBottom: Math.max(2, numSize * 0.08) }} />}
    </span>
  )
}
