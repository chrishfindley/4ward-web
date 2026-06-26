'use client'

import { useState, useRef, useCallback, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Chivo, Archivo, Sometype_Mono } from 'next/font/google'

const chivo = Chivo({
  weight: '900',
  subsets: ['latin'],
  variable: '--font-chivo',
})

const archivo = Archivo({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-archivo',
})

const sometypeMono = Sometype_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
})

const INK = '#1A1A1C'
const SOFT = '#54555A'
const SILVER = '#A8A9AD'
const HAIRLINE = '#DEDEDA'
const BG = '#F5F5F2'
const ACCENT = '#A8253A'
const READY = '#2ECC8A'

const HERO_ATHLETE = '/athletes/IMG_6034.png'
const BAND_ATHLETE_TRAINING = '/athletes/IMG_6033.png'
const BAND_ATHLETE_CLOSEUP = '/athletes/IMG_6035.png'

const CITATIONS = [
  'Plews 2013',
  'Flatt & Nakamura',
  'Mah 2011',
  'Milewski 2014',
  'Foster 1996',
  'Gabbett 2016',
]

const GOLD = '#F5B820'
const WARNING = '#FB923C'
const CHARCOAL = '#141518'

function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="mx-auto w-full max-w-[300px] rounded-[32px] border p-2"
      style={{
        borderColor: HAIRLINE,
        background: '#FFFFFF',
        boxShadow: '0 36px 72px rgba(26, 26, 28, 0.13), 0 0 0 1px rgba(26, 26, 28, 0.05)',
      }}
    >
      <div
        className="overflow-hidden rounded-[26px] p-5"
        style={{
          background: 'linear-gradient(180deg, #FAFAF8 0%, #FFFFFF 52%, #EEEDEA 100%)',
          minHeight: 360,
        }}
      >
        {children}
      </div>
    </div>
  )
}

function BrowserShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="mx-auto w-full overflow-hidden rounded-xl border"
      style={{
        borderColor: HAIRLINE,
        background: '#FFFFFF',
        boxShadow: '0 36px 72px rgba(26, 26, 28, 0.13), 0 0 0 1px rgba(26, 26, 28, 0.05)',
      }}
    >
      <div
        className="flex items-center gap-1.5 border-b px-4 py-3"
        style={{ borderColor: HAIRLINE, background: '#F8F8F6' }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: HAIRLINE }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: HAIRLINE }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: HAIRLINE }} />
      </div>
      <div style={{ minHeight: 360 }}>{children}</div>
    </div>
  )
}

function MockLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: SILVER }}>
      {children}
    </p>
  )
}

function MetricTile({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: HAIRLINE, background: '#FFFFFF' }}>
      <MockLabel>{label}</MockLabel>
      <p
        className="mt-2 text-3xl leading-none"
        style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em', color: highlight ? ACCENT : INK }}
      >
        {value}
      </p>
    </div>
  )
}

function PhoneHeader() {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div>
        <MockLabel>Today</MockLabel>
        <p className="mt-1 text-2xl leading-none" style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}>
          Ready
        </p>
      </div>
      <div
        className="flex h-11 w-11 items-center justify-center rounded-[14px] text-sm font-bold"
        style={{ background: INK, color: BG, fontFamily: 'var(--font-chivo)' }}
      >
        4W
      </div>
    </div>
  )
}

function ReadinessMock() {
  return (
    <PhoneShell>
      <PhoneHeader />
      <div className="rounded-[22px] p-5" style={{ background: INK, color: BG }}>
        <MockLabel>4W Readiness</MockLabel>
        <div className="mt-2 flex items-end justify-between gap-4">
          <p className="text-[5.5rem] leading-[0.84]" style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}>
            78
          </p>
          <div className="pb-2 text-right">
            <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ fontFamily: 'var(--font-mono)', color: READY }}>
              Push
            </p>
            <p className="mt-1 text-xs" style={{ color: SILVER }}>Full session OK</p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <MetricTile label="Sleep" value="8.2h" />
        <MetricTile label="HRV" value="+6%" highlight />
      </div>
    </PhoneShell>
  )
}

function SleepMock() {
  return (
    <PhoneShell>
      <PhoneHeader />
      <div className="rounded-[22px] border p-5" style={{ borderColor: HAIRLINE, background: '#FFFFFF' }}>
        <MockLabel>Sleep score</MockLabel>
        <p className="mt-2 text-5xl leading-none" style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}>
          8.2<span className="text-2xl" style={{ color: SOFT }}>h</span>
        </p>
        <div className="mt-5 space-y-3">
          {[
            { label: 'Deep sleep', pct: 72 },
            { label: 'REM', pct: 58 },
            { label: 'Efficiency', pct: 91 },
          ].map(({ label, pct }) => (
            <div key={label}>
              <div className="mb-1 flex justify-between text-xs" style={{ color: SOFT }}>
                <span>{label}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: HAIRLINE }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: INK }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-xs leading-relaxed" style={{ color: SOFT }}>
        Above your 7-day baseline · recovery trending up
      </p>
    </PhoneShell>
  )
}

function WorkoutMock() {
  return (
    <PhoneShell>
      <PhoneHeader />
      <div className="rounded-[22px] border p-4" style={{ borderColor: HAIRLINE, background: '#FFFFFF' }}>
        <MockLabel>Workout mode</MockLabel>
        <p className="mt-2 text-xl font-bold" style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}>
          Lower body · Week 3
        </p>
        <div className="mt-4 space-y-2">
          {[
            { lift: 'Back Squat', sets: '4 × 5', load: '275 lb', active: true },
            { lift: 'RDL', sets: '3 × 8', load: '185 lb', active: false },
            { lift: 'Split Squat', sets: '3 × 10', load: 'DB 50s', active: false },
          ].map((row) => (
            <div
              key={row.lift}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-sm"
              style={{
                background: row.active ? INK : 'rgba(26,26,28,0.04)',
                color: row.active ? BG : INK,
              }}
            >
              <span className="font-semibold">{row.lift}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: row.active ? BG : SOFT }}>
                {row.sets} · {row.load}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className="mt-4 flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-[0.12em]"
        style={{ background: INK, color: BG, fontFamily: 'var(--font-mono)' }}
      >
        <span>Start set</span>
        <span>→</span>
      </div>
    </PhoneShell>
  )
}

function DailyMessageMock() {
  return (
    <PhoneShell>
      <PhoneHeader />
      <div className="rounded-[22px] border p-5" style={{ borderColor: HAIRLINE, background: '#FFFFFF' }}>
        <MockLabel>Today&apos;s call</MockLabel>
        <p className="mt-3 text-2xl font-bold leading-snug" style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}>
          Your sleep and readiness is high.
        </p>
        <p className="mt-2 text-base font-semibold" style={{ color: SOFT }}>
          Let&apos;s crush it today!
        </p>
      </div>
      <div className="mt-4 space-y-2">
        {['Start Workout', 'Log Recovery', 'View Pattern'].map((item, i) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-[0.1em]"
            style={{
              background: i === 0 ? INK : 'rgba(26,26,28,0.05)',
              color: i === 0 ? BG : INK,
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>{item}</span>
            <span>→</span>
          </div>
        ))}
      </div>
    </PhoneShell>
  )
}

function TeamRosterMock() {
  const rows = [
    { name: 'J. Harris', score: 91, status: 'Optimal', color: READY, meta: 'HRV ↑ · Sleep 8.5h · RHR —' },
    { name: 'M. Torres', score: 74, status: 'Moderate', color: GOLD, meta: 'HRV — · Sleep 6.9h · RHR ↑' },
    { name: 'D. Walker', score: 51, status: 'Elevated', color: WARNING, meta: 'HRV ↓ · Sleep 5.2h · RHR ↑↑' },
  ]
  return (
    <BrowserShell>
      <div className="p-5" style={{ background: CHARCOAL }}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <MockLabel>Coach dashboard</MockLabel>
            <p className="mt-1 text-sm font-semibold" style={{ color: BG }}>Tuesday · Apr 15</p>
          </div>
          <span
            className="rounded border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ borderColor: 'rgba(46,204,138,0.35)', color: READY, fontFamily: 'var(--font-mono)' }}
          >
            18 synced
          </span>
        </div>
        <div className="space-y-2">
          {rows.map((row) => (
            <div
              key={row.name}
              className="grid grid-cols-[48px_1fr_auto] items-center gap-3 rounded-sm px-3 py-3"
              style={{ background: 'rgba(255,255,255,0.06)', borderLeft: `3px solid ${row.color}` }}
            >
              <span className="text-3xl leading-none" style={{ fontFamily: 'var(--font-chivo)', color: row.color }}>
                {row.score}
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: BG }}>{row.name}</p>
                <p className="mt-0.5 text-xs" style={{ color: SILVER }}>{row.meta}</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ fontFamily: 'var(--font-mono)', color: row.color }}>
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BrowserShell>
  )
}

function TeamAlertsMock() {
  return (
    <BrowserShell>
      <div className="p-5" style={{ background: CHARCOAL }}>
        <MockLabel>Needs attention</MockLabel>
        <p className="mt-2 mb-4 text-sm" style={{ color: SILVER }}>2 athletes flagged before today&apos;s session</p>
        <div className="space-y-3">
          {[
            { name: 'D. Walker', note: 'Sleep 5.2h · HRV ↓22%', flag: 'Pull back volume' },
            { name: 'K. Nguyen', note: 'RHR ↑8 bpm · 3-day trend', flag: 'Check in before lift' },
          ].map((item) => (
            <div key={item.name} className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <p className="text-sm font-semibold" style={{ color: BG }}>{item.name}</p>
              <p className="mt-1 text-xs" style={{ color: SILVER }}>{item.note}</p>
              <p className="mt-2 text-xs font-bold" style={{ color: WARNING }}>{item.flag}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserShell>
  )
}

function TeamLiveWorkoutMock() {
  return (
    <BrowserShell>
      <div className="p-5" style={{ background: CHARCOAL }}>
        <MockLabel>Live workout</MockLabel>
        <p className="mt-2 mb-4 text-sm font-semibold" style={{ color: BG }}>Squat day · Rack assignments</p>
        <div className="space-y-2">
          {[
            { athlete: 'J. Harris', lift: '275 lb', set: 'Set 3 of 4', status: 'On track', color: READY },
            { athlete: 'M. Torres', lift: '225 lb', set: 'Set 2 of 4', status: 'Resting', color: GOLD },
            { athlete: 'A. Reed', lift: '185 lb', set: 'Set 4 of 4', status: 'PR attempt', color: READY },
          ].map((row) => (
            <div key={row.athlete} className="rounded-lg px-4 py-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="flex justify-between">
                <span className="text-sm font-semibold" style={{ color: BG }}>{row.athlete}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ fontFamily: 'var(--font-mono)', color: row.color }}>
                  {row.status}
                </span>
              </div>
              <p className="mt-1 text-xs" style={{ color: SILVER }}>{row.lift} · {row.set}</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserShell>
  )
}

function TeamTrendsMock() {
  return (
    <BrowserShell>
      <div className="flex h-full flex-col p-5" style={{ background: CHARCOAL, minHeight: 360 }}>
        <MockLabel>Team trends</MockLabel>
        <p className="mt-2 mb-6 text-sm" style={{ color: SILVER }}>Roster avg readiness · last 7 days</p>
        <div className="flex flex-1 items-end justify-between gap-2 pb-2">
          {[62, 71, 68, 74, 79, 77, 82].map((val, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-sm"
                style={{ height: `${val * 1.1}px`, background: i === 6 ? READY : 'rgba(255,255,255,0.14)' }}
              />
              <span className="text-[9px]" style={{ fontFamily: 'var(--font-mono)', color: SILVER }}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs font-semibold" style={{ color: READY }}>
          ↑ 8% vs last week
        </p>
      </div>
    </BrowserShell>
  )
}

const INDIVIDUAL_SCREENS = [
  { label: 'Readiness', content: <ReadinessMock /> },
  { label: 'Sleep', content: <SleepMock /> },
  { label: 'Workout', content: <WorkoutMock /> },
  { label: 'Daily call', content: <DailyMessageMock /> },
]

const TEAM_SCREENS = [
  { label: 'Roster', content: <TeamRosterMock /> },
  { label: 'Alerts', content: <TeamAlertsMock /> },
  { label: 'Live workout', content: <TeamLiveWorkoutMock /> },
  { label: 'Trends', content: <TeamTrendsMock /> },
]

const PRODUCT_SCREENS = INDIVIDUAL_SCREENS

function SwipeDeck({
  screens,
  ariaLabel,
}: {
  screens: { label: string; content: ReactNode }[]
  ariaLabel: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || el.clientWidth === 0) return
    setActive(Math.round(el.scrollLeft / el.clientWidth))
  }, [])

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }}
        aria-label={ariaLabel}
      >
        {screens.map((screen) => (
          <div key={screen.label} className="w-full shrink-0 snap-center py-2">
            {screen.content}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        <div className="flex gap-1.5">
          {screens.map((screen, i) => (
            <button
              key={screen.label}
              type="button"
              aria-label={`Show ${screen.label}`}
              onClick={() => {
                scrollRef.current?.scrollTo({ left: i * (scrollRef.current?.clientWidth ?? 0), behavior: 'smooth' })
                setActive(i)
              }}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === active ? 20 : 6,
                background: i === active ? INK : HAIRLINE,
              }}
            />
          ))}
        </div>
        <span className="text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: 'var(--font-mono)', color: SILVER }}>
          {screens[active]?.label}
        </span>
      </div>
    </div>
  )
}

function AudienceSwipeCard({
  eyebrow,
  screens,
  href,
  linkText,
  ariaLabel,
}: {
  eyebrow: string
  screens: { label: string; content: ReactNode }[]
  href: string
  linkText: string
  ariaLabel: string
}) {
  return (
    <article
      className="flex flex-col rounded-2xl border p-6 sm:p-8"
      style={{ borderColor: HAIRLINE, background: 'rgba(255,255,255,0.35)' }}
    >
      <p
        className="mb-5 text-xs uppercase tracking-[0.18em]"
        style={{ fontFamily: 'var(--font-mono)', color: SILVER }}
      >
        {eyebrow}
      </p>
      <SwipeDeck screens={screens} ariaLabel={ariaLabel} />
      <Link href={href} className="mt-6 text-sm font-semibold no-underline" style={{ color: INK }}>
        {linkText}
      </Link>
    </article>
  )
}

function AthletePhoto({
  src,
  alt,
  className = '',
  aspect = 'aspect-[4/5]',
}: {
  src: string
  alt: string
  className?: string
  aspect?: string
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${aspect} ${className}`}
      style={{ border: `1px solid ${HAIRLINE}` }}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 560px" />
    </div>
  )
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [waitlistMsg, setWaitlistMsg] = useState<string | null>(null)

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setWaitlistMsg(null)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: 'Waitlist',
          last_name: 'Signup',
          email: email.trim(),
          school_name: 'TBD',
          role: 'coach',
        }),
      })
      if (res.ok) {
        setWaitlistMsg("You're on the list.")
        setEmail('')
      } else {
        const data = await res.json()
        setWaitlistMsg(data.error ?? 'Something went wrong.')
      }
    } catch {
      setWaitlistMsg('Something went wrong.')
    }
  }

  return (
    <div
      className={`${chivo.variable} ${archivo.variable} ${sometypeMono.variable} min-h-screen`}
      style={{ background: BG, color: INK, fontFamily: 'var(--font-archivo), sans-serif' }}
    >
      {/* Nav */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(245, 245, 242, 0.82)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          paddingLeft: 'clamp(3.5rem, 12vw, 9rem)',
          paddingRight: 'clamp(1.25rem, 5vw, 3rem)',
        }}
      >
        <div className="flex w-full items-center justify-between gap-4 py-3.5">
          <Link
            href="/"
            className="text-lg tracking-tight no-underline sm:text-xl"
            style={{
              fontFamily: 'var(--font-chivo)',
              color: INK,
              letterSpacing: '-0.02em',
            }}
          >
            4WARD<span style={{ color: ACCENT }}>&gt;</span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-7">
            <div className="flex items-center gap-2.5 sm:gap-7">
              <Link href="/team" className="text-[11px] no-underline transition-opacity hover:opacity-70 sm:text-sm" style={{ color: SOFT }}>
                <span className="sm:hidden">Teams</span>
                <span className="hidden sm:inline">For Teams</span>
              </Link>
              <Link href="/individual" className="text-[11px] no-underline transition-opacity hover:opacity-70 sm:text-sm" style={{ color: SOFT }}>
                <span className="sm:hidden">Athletes</span>
                <span className="hidden sm:inline">For Athletes</span>
              </Link>
              <Link href="/science" className="text-[11px] no-underline transition-opacity hover:opacity-70 sm:text-sm" style={{ color: SOFT }}>
                Science
              </Link>
            </div>
            <Link
              href="/login"
              className="rounded-full border px-4 py-2 text-sm no-underline transition-colors"
              style={{ borderColor: HAIRLINE, color: INK, background: 'rgba(255,255,255,0.45)' }}
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative flex min-h-[calc(100svh-57px)] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-10 text-center sm:px-8 sm:pb-24 sm:pt-14">
          <Image
            src={HERO_ATHLETE}
            alt=""
            fill
            priority
            className="object-cover object-[center_20%] sm:object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(245,245,242,0.94) 0%, rgba(245,245,242,0.78) 42%, rgba(245,245,242,0.9) 100%)',
            }}
          />
          <div className="relative z-10 flex flex-col items-center">
          <h1
            className="max-w-5xl leading-[0.92] tracking-tight"
            style={{
              fontFamily: 'var(--font-chivo)',
              fontSize: 'clamp(2.75rem, 11vw, 7.5rem)',
              letterSpacing: '-0.02em',
              color: INK,
            }}
          >
            Train. Recover.
            <br />
            Repeat<span style={{ color: ACCENT }}>.</span>
          </h1>

          <p
            className="max-w-sm px-2 text-lg font-bold leading-snug sm:hidden"
            style={{ color: SOFT, marginTop: 'clamp(3.5rem, 8vw, 5.5rem)' }}
          >
            4Ward tracks daily athlete readiness,
            <br />
            and gives you the platform to act on it.
          </p>
          <p
            className="hidden max-w-4xl whitespace-nowrap text-[clamp(1.05rem,2.8vw,1.375rem)] font-bold leading-snug sm:block"
            style={{ color: SOFT, marginTop: 'clamp(4rem, 9vw, 6.5rem)' }}
          >
            4Ward tracks daily athlete readiness, and gives you the platform to act on it.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-4">
            <a
              href="#what-it-is"
              className="rounded-full px-7 py-3.5 text-sm font-semibold no-underline transition-opacity hover:opacity-85"
              style={{ background: INK, color: BG }}
            >
              See how it works
            </a>
            <Link
              href="/team"
              className="rounded-full border px-7 py-3.5 text-sm font-medium no-underline transition-colors"
              style={{ borderColor: HAIRLINE, color: SOFT, background: 'rgba(255,255,255,0.5)' }}
            >
              For coaches
            </Link>
          </div>
          </div>
        </section>

        {/* What it is */}
        <section id="what-it-is" className="border-t px-5 py-20 sm:px-8 sm:py-28" style={{ borderColor: HAIRLINE }}>
          <div className="mx-auto max-w-6xl">
            <h2
              className="mb-10 max-w-3xl text-3xl tracking-tight sm:mb-12 sm:text-4xl"
              style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}
            >
              Built for Teams or Individual Athletes<span style={{ color: ACCENT }}>.</span>
            </h2>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
              <AudienceSwipeCard
                eyebrow="For teams"
                screens={TEAM_SCREENS}
                href="/team"
                linkText="Explore for teams →"
                ariaLabel="Team platform features"
              />
              <AudienceSwipeCard
                eyebrow="For individual athletes"
                screens={INDIVIDUAL_SCREENS}
                href="/individual"
                linkText="Explore for athletes →"
                ariaLabel="Individual athlete platform features"
              />
            </div>

            <p
              className="mt-6 text-center text-xs uppercase tracking-[0.16em]"
              style={{ fontFamily: 'var(--font-mono)', color: SILVER }}
            >
              Swipe each card to explore →
            </p>
          </div>
        </section>

        {/* 4WRI Score */}
        <section className="border-t px-5 py-20 sm:px-8 sm:py-28" style={{ borderColor: HAIRLINE }}>
          <div className="mx-auto max-w-md">
            <p
              className="mb-4 text-xs uppercase tracking-[0.18em]"
              style={{ fontFamily: 'var(--font-mono)', color: SILVER }}
            >
              The 4WRI score
            </p>
            <h2
              className="mb-6 text-3xl tracking-tight sm:mb-8 sm:text-4xl"
              style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}
            >
              readiness you can act on<span style={{ color: ACCENT }}>.</span>
            </h2>
            <p className="mb-10 text-base leading-relaxed sm:text-lg" style={{ color: SOFT }}>
              4Ward tracks HRV, Sleep and RHR to determine your daily readiness and gives you a platform that adapts to your recovery and readiness level.
            </p>

            <div
              className="rounded-2xl border p-4 sm:p-5"
              style={{ borderColor: HAIRLINE, background: 'rgba(255,255,255,0.4)' }}
            >
              <SwipeDeck screens={PRODUCT_SCREENS} ariaLabel="4WRI product features" />
            </div>
          </div>
        </section>

        {/* The bands */}
        <section className="border-t px-5 py-20 sm:px-8 sm:py-28" style={{ borderColor: HAIRLINE }}>
          <div className="mx-auto max-w-6xl">
            <p
              className="mb-4 text-xs uppercase tracking-[0.18em]"
              style={{ fontFamily: 'var(--font-mono)', color: SILVER }}
            >
              The bands
            </p>
            <h2
              className="mb-4 max-w-2xl text-3xl tracking-tight sm:text-4xl"
              style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}
            >
              same band<span style={{ color: ACCENT }}>.</span> your colors<span style={{ color: ACCENT }}>.</span>
            </h2>
            <p className="mb-12 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: SOFT }}>
              One band tracks HRV, sleep, and resting heart rate for every athlete. Pick a colorway that fits your program — same hardware, your look in the lockeroom.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <AthletePhoto
                  src={BAND_ATHLETE_TRAINING}
                  alt="Athlete training with 4Ward band"
                />
                <p className="mt-4 text-sm" style={{ color: SOFT }}>In training</p>
              </div>
              <div>
                <AthletePhoto
                  src={BAND_ATHLETE_CLOSEUP}
                  alt="4Ward band on wrist"
                  aspect="aspect-[4/5] sm:aspect-[3/4]"
                />
                <p className="mt-4 text-sm" style={{ color: SOFT }}>On your wrist</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why trust the number */}
        <section className="border-t px-5 py-20 sm:px-8 sm:py-28" style={{ borderColor: HAIRLINE }}>
          <div className="mx-auto max-w-6xl">
            <p
              className="mb-4 text-xs uppercase tracking-[0.18em]"
              style={{ fontFamily: 'var(--font-mono)', color: SILVER }}
            >
              Why trust the number
            </p>
            <h2
              className="mb-8 max-w-2xl text-3xl tracking-tight sm:text-4xl"
              style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}
            >
              built on published research<span style={{ color: ACCENT }}>.</span>
            </h2>
            <p className="mb-10 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: SOFT }}>
              The 4WRI score combines nocturnal HRV, sleep duration, and resting heart rate — markers validated in decades of peer-reviewed sports science. We&apos;re validating head-to-head against research-grade chest straps with our beta schools.
            </p>

            <div className="flex flex-wrap gap-2">
              {CITATIONS.map((cite) => (
                <span
                  key={cite}
                  className="rounded-full border px-4 py-2 text-xs"
                  style={{ borderColor: HAIRLINE, color: SOFT, fontFamily: 'var(--font-mono)' }}
                >
                  {cite}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="border-t px-5 py-20 sm:px-8 sm:py-28" style={{ borderColor: HAIRLINE }}>
          <div className="mx-auto max-w-xl">
            <p
              className="mb-4 text-xs uppercase tracking-[0.18em]"
              style={{ fontFamily: 'var(--font-mono)', color: SILVER }}
            >
              Pricing
            </p>
            <div
              className="rounded-2xl border p-8 text-center sm:p-10"
              style={{ borderColor: HAIRLINE, background: 'rgba(255,255,255,0.4)' }}
            >
              <h2
                className="mb-3 text-2xl tracking-tight sm:text-3xl"
                style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}
              >
                coming soon<span style={{ color: ACCENT }}>.</span>
              </h2>
              <p className="mb-8 text-sm" style={{ color: SOFT }}>
                Team pricing is in progress. Get notified when it launches.
              </p>

              <form onSubmit={handleWaitlist} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="you@school.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-full border px-5 py-3 text-sm outline-none"
                  style={{ borderColor: HAIRLINE, color: INK, background: BG }}
                />
                <button
                  type="submit"
                  className="rounded-full px-6 py-3 text-sm font-semibold"
                  style={{ background: INK, color: BG }}
                >
                  Get on the list
                </button>
              </form>
              {waitlistMsg && (
                <p className="mt-4 text-sm" style={{ color: SOFT }}>
                  {waitlistMsg}
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t px-5 py-12 sm:px-8" style={{ borderColor: HAIRLINE }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="text-lg tracking-tight"
              style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}
            >
              4WARD<span style={{ color: ACCENT }}>&gt;</span>
            </p>
            <p className="mt-2 text-sm" style={{ color: SOFT }}>
              Daily readiness for every athlete on your roster.
            </p>
          </div>
          <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: SILVER }}>
            Wellness & performance tool · not a medical device
          </p>
        </div>
      </footer>
    </div>
  )
}
