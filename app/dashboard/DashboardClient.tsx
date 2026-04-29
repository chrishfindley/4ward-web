'use client'

import { CSSProperties, TouchEvent, useMemo, useState } from 'react'

const readiness = {
  score: 86,
  status: 'OPTIMAL',
  color: '#2ECC8A',
  workoutName: 'Lower Power',
  adjusted: false,
  syncedAt: '6:42 AM',
}

const metrics = [
  {
    label: 'Sleep',
    value: '8.1h',
    note: 'Above your 7-day average',
    data: [6.4, 6.9, 7.2, 6.8, 7.5, 7.7, 8.1],
    href: '/dashboard/sleep',
  },
  {
    label: 'HRV',
    value: '+7%',
    note: 'vs 7-day baseline',
    data: [52, 49, 51, 54, 55, 57, 59],
    href: '/dashboard/hrv',
  },
  {
    label: 'Resting HR',
    value: '52',
    note: 'At baseline',
    data: [55, 54, 53, 54, 52, 53, 52],
    href: '/dashboard/rhr',
  },
]

const quickActions = [
  ['Log workout manually', '/workout/manual'],
  ['Sync wearable', '/dashboard/sync'],
  ['Check progress', '/dashboard/progress'],
  ['Message coach', '/dashboard/coach'],
]

// AI_PROMPT for daily insight:
// "You are an evidence-based athletic recovery coach. Given
// the following data for an athlete, generate a 2-3 sentence
// insight explaining their readiness score, what changed from
// yesterday, and what kind of training fits today. Be specific
// about data, not vague. Don't add motivation or fluff. Data:
// readiness_score: {score}, hrv_delta: {hrv}, sleep_hours:
// {sleep}, sleep_avg: {sleep_avg}, rhr: {rhr}, rhr_baseline:
// {rhr_baseline}, scheduled_workout: {workout_name}"
const dailyInsight =
  'Your HRV is up 7% from your 7-day average. You slept 8.1 hours — above your average, and RHR is at baseline. Your nervous system is primed for high-intensity work today. If you have heavy lifting or sprint work programmed, today is the day.'

// AI_PROMPT for long-term pattern insights:
// "You are an evidence-based athletic recovery coach. Given 30-90 days
// of athlete readiness, sleep, HRV, resting heart rate, workout type,
// training load, soreness, mood, nutrition timing, and game/practice
// schedule data, identify 1-3 specific patterns worth knowing. Each
// insight must include the pattern, the evidence, and the practical
// training implication. Keep each insight to 1-2 sentences. Don't add
// motivation or generic wellness advice. Data: {athlete_history}"
const patternInsights = [
  'You slept under 7 hours 4 of the last 5 nights. Your readiness has dropped each day. Tonight’s bedtime matters.',
  'Your HRV is 18% higher on days you eat dinner before 7pm. That pattern is strong enough to keep testing.',
]

function Card({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <section
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-light)',
        borderRadius: 18,
        boxShadow: '0 14px 38px rgba(8, 8, 9, 0.07)',
        padding: 22,
        ...style,
      }}
    >
      {children}
    </section>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 800,
        fontSize: 12,
        letterSpacing: 2.4,
        textTransform: 'uppercase',
        color: 'var(--maroon)',
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  )
}

function Sparkline({ values, color = 'var(--maroon)' }: { values: number[]; color?: string }) {
  const points = useMemo(() => {
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min || 1
    return values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * 96 + 2
        const y = 34 - ((value - min) / range) * 28 + 2
        return `${x},${y}`
      })
      .join(' ')
  }, [values])

  return (
    <svg viewBox="0 0 100 40" width="100%" height="40" aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MetricCard({ metric }: { metric: (typeof metrics)[number] }) {
  return (
    <a
      href={metric.href}
      style={{
        display: 'grid',
        gap: 8,
        textDecoration: 'none',
        color: 'var(--text-dark)',
        background: '#FAFAF7',
        border: '1px solid var(--border-light)',
        borderRadius: 14,
        padding: 14,
      }}
    >
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--silver-dark)' }}>
        {metric.label}
      </div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, lineHeight: 1, color: metric.label === 'HRV' ? 'var(--maroon)' : 'var(--text-dark)' }}>
        {metric.value}
      </div>
      <div style={{ minHeight: 36 }}>
        <Sparkline values={metric.data} color={metric.label === 'Resting HR' ? 'var(--silver-dark)' : 'var(--maroon)'} />
      </div>
      <div style={{ fontSize: 12, color: 'var(--silver-dark)', lineHeight: 1.35 }}>{metric.note}</div>
    </a>
  )
}

function BottomNav() {
  const items = [
    ['Home', '/dashboard'],
    ['Workouts', '/workout'],
    ['Progress', '/dashboard/progress'],
    ['Profile', '/dashboard/profile'],
  ]

  return (
    <nav className="dashboard-bottom-nav" aria-label="Dashboard navigation">
      {items.map(([label, href]) => (
        <a
          key={label}
          href={href}
          style={{
            display: 'grid',
            gap: 4,
            justifyItems: 'center',
            color: label === 'Home' ? 'var(--maroon)' : 'var(--silver-dark)',
            textDecoration: 'none',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: 1.4,
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: label === 'Home' ? 'var(--maroon)' : 'transparent' }} />
          {label}
        </a>
      ))}
    </nav>
  )
}

export default function DashboardClient() {
  const [pullStart, setPullStart] = useState<number | null>(null)
  const [syncedAt, setSyncedAt] = useState(readiness.syncedAt)
  const [refreshCount, setRefreshCount] = useState(0)

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    if (window.scrollY === 0) {
      setPullStart(event.touches[0].clientY)
    }
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (pullStart === null) return
    const distance = event.changedTouches[0].clientY - pullStart
    if (distance > 70) {
      const now = new Date()
      setSyncedAt(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
      setRefreshCount((count) => count + 1)
      // TODO: re-run daily insight generation after real data refresh completes.
    }
    setPullStart(null)
  }

  return (
    <main
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        minHeight: '100vh',
        background: 'var(--paper)',
        color: 'var(--text-dark)',
        padding: '18px 16px 96px',
      }}
    >
      <style>{`
        .dashboard-shell {
          max-width: 760px;
          margin: 0 auto;
          display: grid;
          gap: 16px;
        }
        .dashboard-metric-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }
        .dashboard-actions-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        .dashboard-bottom-nav {
          position: fixed;
          left: 50%;
          bottom: 12px;
          transform: translateX(-50%);
          width: min(calc(100% - 24px), 520px);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid var(--border-light);
          border-radius: 18px;
          box-shadow: 0 16px 42px rgba(8, 8, 9, 0.16);
          backdrop-filter: blur(18px);
          z-index: 50;
        }
        @media (max-width: 520px) {
          .dashboard-metric-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="dashboard-shell">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '4px 2px 2px' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, lineHeight: 1 }}>
            <span style={{ color: 'var(--maroon)' }}>4</span>WARD
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 12, letterSpacing: 1.8, textTransform: 'uppercase', color: 'var(--silver-dark)' }}>
            synced {syncedAt}
          </div>
        </header>

        <Card
          style={{
            textAlign: 'center',
            background: 'var(--black)',
            color: 'var(--text-light)',
            borderColor: 'var(--border-dark)',
            padding: '30px 22px',
          }}
        >
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(112px, 28vw, 190px)', lineHeight: 0.82, color: readiness.color }}>
            {readiness.score}
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: 3, color: readiness.color, marginTop: 12 }}>
            {readiness.status}
          </div>
          <p style={{ maxWidth: 580, margin: '22px auto 0', color: 'var(--silver-light)', fontSize: 17, lineHeight: 1.55 }}>
            {dailyInsight}
          </p>
          {refreshCount > 0 && (
            <div style={{ marginTop: 14, fontSize: 12, color: 'var(--silver)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: 1.8, textTransform: 'uppercase' }}>
              refreshed {refreshCount}x
            </div>
          )}
        </Card>

        <Card>
          <Eyebrow>Today</Eyebrow>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, lineHeight: 1, color: 'var(--text-dark)', marginBottom: 10 }}>
            {readiness.workoutName}
          </h1>
          <p style={{ color: 'var(--silver-dark)', lineHeight: 1.55, fontSize: 16, marginBottom: 18 }}>
            Heavy hinge, jumps, and posterior-chain strength. Keep the top sets fast.
            If bar speed drops early, cut one set instead of grinding.
          </p>
          <a
            href="/workout"
            style={{
              display: 'grid',
              placeItems: 'center',
              height: 52,
              borderRadius: 12,
              background: 'var(--maroon)',
              color: 'white',
              textDecoration: 'none',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Start Workout
          </a>
          {readiness.adjusted && (
            <div style={{ marginTop: 10, color: 'var(--silver-dark)', fontSize: 13 }}>
              Adjusted for today&apos;s readiness
            </div>
          )}
        </Card>

        <Card>
          <Eyebrow>Your Numbers</Eyebrow>
          <div className="dashboard-metric-grid">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </Card>

        <Card>
          <Eyebrow>Patterns we&apos;ve noticed</Eyebrow>
          <div style={{ display: 'grid', gap: 12 }}>
            {patternInsights.map((insight) => (
              <div key={insight} style={{ borderLeft: '3px solid var(--maroon)', paddingLeft: 14, color: 'var(--silver-dark)', lineHeight: 1.55 }}>
                {insight}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <Eyebrow>Quick Actions</Eyebrow>
          <div className="dashboard-actions-grid">
            {quickActions.map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  minHeight: 74,
                  display: 'grid',
                  placeItems: 'center',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'var(--text-dark)',
                  background: '#FAFAF7',
                  border: '1px solid var(--border-light)',
                  borderRadius: 14,
                  padding: 12,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  letterSpacing: 1.4,
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </Card>
      </div>

      <BottomNav />
    </main>
  )
}
