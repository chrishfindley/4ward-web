'use client'

import { useState } from 'react'
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type Period = 'Week' | 'Month' | '3 Months' | '6 Months' | 'All Time'

type ReadinessDay = {
  date: string
  score: number
  workout?: boolean
  event?: string
  reason?: string
}

const periods: Period[] = ['Week', 'Month', '3 Months', '6 Months', 'All Time']
const coachConnected = true

const readinessData: ReadinessDay[] = [
  { date: 'Apr 1', score: 72, workout: true },
  { date: 'Apr 2', score: 76 },
  { date: 'Apr 3', score: 81, workout: true },
  { date: 'Apr 4', score: 79 },
  { date: 'Apr 5', score: 68, workout: true },
  { date: 'Apr 6', score: 63, event: 'travel', reason: 'travel + short sleep' },
  { date: 'Apr 7', score: 70 },
  { date: 'Apr 8', score: 74, workout: true },
  { date: 'Apr 9', score: 77 },
  { date: 'Apr 10', score: 82, workout: true },
  { date: 'Apr 11', score: 84 },
  { date: 'Apr 12', score: 80, workout: true },
  { date: 'Apr 13', score: 78, event: 'game' },
  { date: 'Apr 14', score: 73 },
  { date: 'Apr 15', score: 75, workout: true },
  { date: 'Apr 16', score: 83 },
  { date: 'Apr 17', score: 86, workout: true },
  { date: 'Apr 18', score: 79 },
  { date: 'Apr 19', score: 74, workout: true },
  { date: 'Apr 20', score: 69, event: 'illness', reason: 'illness tag' },
  { date: 'Apr 21', score: 71 },
  { date: 'Apr 22', score: 76, workout: true },
  { date: 'Apr 23', score: 82 },
  { date: 'Apr 24', score: 85, workout: true },
  { date: 'Apr 25', score: 81 },
  { date: 'Apr 26', score: 77, workout: true },
  { date: 'Apr 27', score: 72 },
  { date: 'Apr 28', score: 74, workout: true },
]

const weeklyVolume = [
  { week: 'W1', volume: 18200 },
  { week: 'W2', volume: 20100 },
  { week: 'W3', volume: 22600 },
  { week: 'W4', volume: 23600 },
]

const sleepData = [
  { date: 'Apr 1', sleep: 7.1 },
  { date: 'Apr 5', sleep: 6.9 },
  { date: 'Apr 9', sleep: 7.4 },
  { date: 'Apr 13', sleep: 7.8 },
  { date: 'Apr 17', sleep: 8.2 },
  { date: 'Apr 21', sleep: 7.3 },
  { date: 'Apr 25', sleep: 7.6 },
  { date: 'Apr 28', sleep: 7.0 },
]

const hrvData = [
  { date: 'Apr 1', hrv: -3 },
  { date: 'Apr 5', hrv: -1 },
  { date: 'Apr 9', hrv: 2 },
  { date: 'Apr 13', hrv: 4 },
  { date: 'Apr 17', hrv: 8 },
  { date: 'Apr 21', hrv: 1 },
  { date: 'Apr 25', hrv: 5 },
  { date: 'Apr 28', hrv: 3 },
]

const goals = [
  { name: 'Average readiness above 75', progress: 78, target: '78 / 75' },
  { name: 'Sleep before 11pm', progress: 64, target: '18 / 28 nights' },
  { name: 'Squat 1RM goal', progress: 82, target: '315 / 365 lb' },
]

const defaultSummary = 'Strong month. Your readiness trended upward (+6 points), driven by more consistent sleep (avg 7.6h vs 7.3h last month) and a stable training load. You hit all programmed sessions. One thing to watch: your sleep dropped in the last 5 days of the month — likely tied to your trip last week. Worth catching up this week.'

// AI_PROMPT for monthly summary:
// "Generate a 4-6 sentence summary of this athlete's progress
// over the selected time period. Use the data provided. Lead
// with what's notable (positive or negative). Be specific
// about numbers. Acknowledge what worked and what to adjust.
// Avoid generic praise. Avoid hedging. Sound like a coach
// who actually read the data, not a generic AI summary.
// Data: {full_period_data}"

// AI_PROMPT for pattern detection:
// "Analyze this athlete's data over the past {period} and
// identify 3-5 specific patterns. Each pattern must be
// supported by data with specific numbers. Patterns should
// be useful — actionable insights they couldn't easily
// see themselves. Avoid trivial patterns. Format as
// JSON array: [{pattern: string, evidence: string,
// recommendation: string}]"

function scoreColor(score: number) {
  if (score >= 80) return '#2ECC8A'
  if (score >= 60) return '#F5B820'
  if (score >= 40) return '#FB923C'
  return '#A8253A'
}

function Card({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <section
      style={{
        background: dark ? 'var(--charcoal)' : '#FFFFFF',
        border: `1px solid ${dark ? 'var(--border-dark)' : 'var(--border-light)'}`,
        borderRadius: 18,
        boxShadow: dark ? 'none' : '0 14px 38px rgba(8,8,9,0.07)',
        padding: 22,
        color: dark ? 'var(--text-light)' : 'var(--text-dark)',
      }}
    >
      {children}
    </section>
  )
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 800,
        fontSize: 12,
        letterSpacing: 2.4,
        textTransform: 'uppercase',
        color: dark ? 'var(--maroon-bright)' : 'var(--maroon)',
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  )
}

function StatCard({ label, value, delta, tone = '#2ECC8A' }: { label: string; value: string; delta: string; tone?: string }) {
  return (
    <Card>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--silver-dark)', marginBottom: 10 }}>{label}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(42px, 8vw, 62px)', lineHeight: 1, color: 'var(--text-dark)' }}>{value}</div>
      <div style={{ color: tone, fontSize: 13, marginTop: 6 }}>{delta}</div>
    </Card>
  )
}

function EmptyState() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--paper)', color: 'var(--text-dark)', padding: 24, display: 'grid', placeItems: 'center' }}>
      <div style={{ maxWidth: 620, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(54px, 12vw, 104px)', lineHeight: 0.9, marginBottom: 18 }}>
          Your trends start in 7 days.
        </div>
        <p className="body-lg" style={{ color: 'var(--silver-dark)', margin: '0 auto 28px' }}>
          Log workouts, sync your wearable, and check readiness each morning. Once there&apos;s enough data, this page will show what&apos;s improving and what needs work.
        </p>
        <a href="/dashboard" className="btn btn-primary">Back to Dashboard →</a>
      </div>
    </main>
  )
}

export default function ProgressClient() {
  const [period, setPeriod] = useState<Period>('Month')
  const [summaryCache, setSummaryCache] = useState<Record<string, { value: string; savedAt: number }>>({})

  const hasEnoughData = readinessData.length >= 7
  const summary = summaryCache[period]?.value ?? defaultSummary

  function selectPeriod(nextPeriod: Period) {
    setPeriod(nextPeriod)
    setSummaryCache((cache) => {
      const cached = cache[nextPeriod]
      if (cached && Date.now() - cached.savedAt < 24 * 60 * 60 * 1000) return cache
      return {
        ...cache,
        [nextPeriod]: { value: defaultSummary, savedAt: Date.now() },
      }
    })
  }

  if (!hasEnoughData) return <EmptyState />

  const scores = readinessData.map((day) => day.score)
  const avg = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
  const min = Math.min(...scores)
  const max = Math.max(...scores)
  const stressed = readinessData.reduce((lowest, day) => (day.score < lowest.score ? day : lowest), readinessData[0])

  return (
    <main style={{ minHeight: '100vh', background: 'var(--paper)', color: 'var(--text-dark)', padding: '20px 16px 72px' }}>
      <style>{`
        .progress-shell {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          gap: 18px;
        }
        .progress-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .progress-stat-grid,
        .progress-four-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }
        .progress-two-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        .progress-chart {
          width: 100%;
          height: 340px;
        }
        .progress-mini-chart {
          width: 100%;
          height: 160px;
        }
        @keyframes progressIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .progress-shell section {
          animation: progressIn 0.5s ease both;
        }
        @media (max-width: 820px) {
          .progress-stat-grid,
          .progress-four-grid,
          .progress-two-grid {
            grid-template-columns: 1fr;
          }
          .progress-chart {
            height: 280px;
          }
        }
      `}</style>

      <div className="progress-shell">
        <header style={{ display: 'grid', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16 }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, lineHeight: 1 }}>
                <span style={{ color: 'var(--maroon)' }}>4</span>WARD Progress
              </div>
              <div style={{ color: 'var(--silver-dark)', fontSize: 14 }}>What changed. What worked. What to fix.</div>
            </div>
          </div>
          <div className="progress-tabs" role="tablist" aria-label="Time period">
            {periods.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => selectPeriod(item)}
                style={{
                  minHeight: 44,
                  padding: '0 18px',
                  borderRadius: 999,
                  border: `1px solid ${period === item ? 'var(--maroon)' : 'var(--border-light)'}`,
                  background: period === item ? 'var(--maroon)' : '#FFFFFF',
                  color: period === item ? '#FFFFFF' : 'var(--text-dark)',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  letterSpacing: 1.6,
                  textTransform: 'uppercase',
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </header>

        <section>
          <div className="progress-stat-grid">
            <StatCard label="Avg Readiness" value="78" delta="↑ +6 vs last period" />
            <StatCard label="Workouts Completed" value="12" delta="✓ 100% adherence" />
            <StatCard label="Total Volume" value="84,500 lb" delta="↑ +12% vs last period" />
            <StatCard label="Sleep Average" value="7.6h" delta="↓ -0.3h vs last period" tone="#F5B820" />
          </div>
        </section>

        <Card>
          <Eyebrow>AI Summary</Eyebrow>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-dark)' }}>{summary}</p>
        </Card>

        <Card>
          <Eyebrow>Readiness Over Time</Eyebrow>
          <div className="progress-chart">
            <ResponsiveContainer minWidth={1} minHeight={1}>
              <LineChart data={readinessData} margin={{ top: 22, right: 16, left: -18, bottom: 8 }}>
                <CartesianGrid stroke="rgba(96,98,101,0.18)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#606265' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#606265' }} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#7B1020" strokeWidth={3} dot={({ cx, cy, payload }) => (
                  <circle cx={cx} cy={cy} r={5} fill={scoreColor((payload as ReadinessDay).score)} stroke="#FFFFFF" strokeWidth={2} />
                )} />
                {readinessData.map((day) => day.workout && (
                  <ReferenceDot key={`${day.date}-workout`} x={day.date} y={Math.min(day.score + 8, 100)} r={3} fill="#080809" stroke="none" />
                ))}
                {readinessData.map((day) => day.event && (
                  <ReferenceDot key={`${day.date}-event`} x={day.date} y={Math.max(day.score - 8, 0)} r={4} fill="#A8253A" stroke="none" />
                ))}
                <Brush dataKey="date" height={24} stroke="#7B1020" travellerWidth={10} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="progress-three" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 14 }}>
            <Info label="Min / Max / Average" value={`${min} / ${max} / ${avg}`} />
            <Info label="Most stressed day" value={`${stressed.date} — ${stressed.reason ?? 'low readiness'}`} />
            <Info label="Best recovery streak" value="5 days above 75" />
          </div>
        </Card>

        <Card>
          <Eyebrow>Training Volume</Eyebrow>
          <div className="progress-chart">
            <ResponsiveContainer minWidth={1} minHeight={1}>
              <BarChart data={weeklyVolume} margin={{ top: 18, right: 12, left: -12, bottom: 8 }}>
                <CartesianGrid stroke="rgba(96,98,101,0.18)" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#606265' }} />
                <YAxis tick={{ fontSize: 12, fill: '#606265' }} />
                <Tooltip />
                <Bar dataKey="volume" radius={[8, 8, 0, 0]}>
                  {weeklyVolume.map((entry) => (
                    <Cell key={entry.week} fill="#7B1020" />
                  ))}
                </Bar>
                <Brush dataKey="week" height={24} stroke="#7B1020" travellerWidth={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'grid', gap: 8, color: 'var(--silver-dark)' }}>
            <div>Total sessions: 12</div>
            <div>Total volume: 84,500 lb</div>
            <div>PRs hit: Bench Press +5 lb on Apr 17; Split Squat +5 lb on Apr 24</div>
            <div>Adherence rate: 100% of programmed sessions completed</div>
          </div>
        </Card>

        <section className="progress-two-grid">
          <Card>
            <Eyebrow>Sleep</Eyebrow>
            <Info label="Average" value="7.6h" />
            <Info label="Consistency score" value="81 / 100" />
            <Info label="Best / Worst night" value="8.6h / 5.9h" />
            <div className="progress-mini-chart">
              <ResponsiveContainer minWidth={1} minHeight={1}>
                <LineChart data={sleepData}>
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={[5, 9]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="sleep" stroke="#7B1020" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <Eyebrow>HRV</Eyebrow>
            <Info label="Average deviation" value="+3.1% vs baseline" />
            <Info label="Trend" value="Improving" />
            <Info label="Best / Worst day" value="+8% / -3%" />
            <div className="progress-mini-chart">
              <ResponsiveContainer minWidth={1} minHeight={1}>
                <LineChart data={hrvData}>
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={[-10, 10]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="hrv" stroke="#A8253A" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        <Card>
          <Eyebrow>Patterns Detected</Eyebrow>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['Sunday sleep dip', 'You sleep an average of 47 minutes less on Sunday nights. Your Monday readiness is 8 points lower than Tuesday-Friday.', 'Protect Sunday bedtime if Monday training matters.'],
              ['Lower-body rebound', 'Your HRV peaks 2-3 days after lower-body sessions and recovers slower from upper-body sessions.', 'Upper-body days may need more recovery spacing than you think.'],
              ['Fast logging matters', 'Workouts you log within 30 minutes have higher avg volume than workouts you log retroactively.', 'Log in the gym, not later.'],
              ['Saturday miss rate', "You've never missed a Wednesday workout. You miss 18% of Saturday workouts.", 'Move Saturday work earlier or reduce friction that morning.'],
            ].map(([pattern, evidence, recommendation]) => (
              <a key={pattern} href={`/progress/patterns/${pattern.toLowerCase().replaceAll(' ', '-')}`} style={{ display: 'grid', gap: 6, textDecoration: 'none', color: 'var(--text-dark)', borderLeft: '3px solid var(--maroon)', paddingLeft: 14 }}>
                <strong>{pattern}</strong>
                <span style={{ color: 'var(--silver-dark)' }}>{evidence}</span>
                <span style={{ color: 'var(--maroon)' }}>{recommendation}</span>
              </a>
            ))}
          </div>
        </Card>

        <Card>
          <Eyebrow>Goals</Eyebrow>
          {goals.length > 0 ? (
            <div style={{ display: 'grid', gap: 16 }}>
              {goals.map((goal) => (
                <div key={goal.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                    <strong>{goal.name}</strong>
                    <span style={{ color: 'var(--silver-dark)' }}>{goal.target}</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 999, background: '#E4E4E2', overflow: 'hidden' }}>
                    <div style={{ width: `${goal.progress}%`, height: '100%', background: 'var(--maroon)', borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="body" style={{ marginBottom: 16 }}>No goals set yet. Pick one thing worth tracking.</p>
              <a href="/progress/goals/new" className="btn btn-primary">Set a Goal</a>
            </div>
          )}
        </Card>

        {coachConnected && (
          <Card dark>
            <Eyebrow dark>Share With Coach</Eyebrow>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, lineHeight: 1, marginBottom: 16 }}>Show the work.</h2>
            <p style={{ color: 'var(--silver-light)', marginBottom: 20 }}>Generate a summary Coach Ramirez can review before next week&apos;s training plan.</p>
            <a href="/progress/share" className="btn btn-primary">Share monthly summary with Coach Ramirez</a>
          </Card>
        )}
      </div>
    </main>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--silver-dark)' }}>{label}</div>
      <div style={{ color: 'var(--text-dark)' }}>{value}</div>
    </div>
  )
}
