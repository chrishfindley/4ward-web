'use client'

import { useState } from 'react'
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

const CITATIONS = [
  'Plews 2013',
  'Flatt & Nakamura',
  'Mah 2011',
  'Milewski 2014',
  'Foster 1996',
  'Gabbett 2016',
]

function Placeholder({ children }: { children: string }) {
  return (
    <span
      className="rounded-sm border border-dashed px-1.5 py-0.5"
      style={{ borderColor: HAIRLINE, color: SOFT, background: 'rgba(222, 222, 218, 0.35)' }}
    >
      {children}
    </span>
  )
}

function BandImage({
  src,
  alt,
  label,
  className = '',
  hero = false,
}: {
  src: string
  alt: string
  label: string
  className?: string
  hero?: boolean
}) {
  const [failed, setFailed] = useState(false)

  const shellClass = hero
    ? `relative h-full w-full ${className}`
    : `relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border ${className}`

  return (
    <div
      className={shellClass}
      style={hero ? undefined : { borderColor: HAIRLINE, background: '#EEEEE9' }}
    >
      {failed ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <div
            className="flex h-24 w-40 items-center justify-center rounded-xl border border-dashed"
            style={{ borderColor: SILVER, color: SILVER }}
          >
            band image
          </div>
          <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: SILVER }}>
            {label}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain p-6"
          sizes={hero ? '288px' : '(max-width: 768px) 100vw, 400px'}
          onError={() => setFailed(true)}
        />
      )}
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
      <style>{`
        @keyframes band-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(1.2deg); }
        }
        .band-float {
          animation: band-float 7s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .band-float { animation: none; }
        }
      `}</style>

      {/* Nav */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(245, 245, 242, 0.82)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 py-3.5 pl-20 pr-5 sm:pl-28 sm:pr-8 md:pl-36">
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
        <section
          className="flex min-h-[calc(100svh-57px)] flex-col items-center justify-center px-5 pb-16 pt-10 text-center sm:px-8 sm:pb-24 sm:pt-14"
        >
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
            className="mt-16 max-w-sm px-2 text-lg font-bold leading-snug sm:hidden"
            style={{ color: SOFT }}
          >
            4Ward tracks daily athlete readiness,
            <br />
            and gives you the platform to act on it.
          </p>
          <p
            className="mt-16 hidden max-w-4xl whitespace-nowrap text-[clamp(1.05rem,2.8vw,1.375rem)] font-bold leading-snug sm:mt-20 sm:block"
            style={{ color: SOFT }}
          >
            4Ward tracks daily athlete readiness, and gives you the platform to act on it.
          </p>

          <div className="band-float relative mx-auto mt-10 h-44 w-56 sm:mt-14 sm:h-56 sm:w-72">
            <BandImage
              src="/band-grey.png"
              alt="4Ward band"
              label="/public/band-grey.png"
              hero
            />
          </div>

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
              style={{ borderColor: HAIRLINE, color: SOFT }}
            >
              For coaches
            </Link>
          </div>
        </section>

        {/* What it is */}
        <section id="what-it-is" className="border-t px-5 py-20 sm:px-8 sm:py-28" style={{ borderColor: HAIRLINE }}>
          <div className="mx-auto max-w-3xl">
            <p
              className="mb-4 text-xs uppercase tracking-[0.18em]"
              style={{ fontFamily: 'var(--font-mono)', color: SILVER }}
            >
              What it is
            </p>
            <h2
              className="mb-8 text-3xl tracking-tight sm:text-4xl"
              style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}
            >
              one number<span style={{ color: ACCENT }}>.</span> every morning<span style={{ color: ACCENT }}>.</span>
            </h2>
            <p className="text-base leading-relaxed sm:text-lg" style={{ color: SOFT }}>
              <Placeholder>{'{{WHATIS_COPY — coach-voice paragraph, to be written}}'}</Placeholder>
            </p>
          </div>
        </section>

        {/* 4WRI Score */}
        <section className="border-t px-5 py-20 sm:px-8 sm:py-28" style={{ borderColor: HAIRLINE }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <p
                className="mb-4 text-xs uppercase tracking-[0.18em]"
                style={{ fontFamily: 'var(--font-mono)', color: SILVER }}
              >
                The 4WRI score
              </p>
              <h2
                className="mb-8 text-3xl tracking-tight sm:text-4xl"
                style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}
              >
                readiness you can act on<span style={{ color: ACCENT }}>.</span>
              </h2>
              <p className="text-base leading-relaxed sm:text-lg" style={{ color: SOFT }}>
                <Placeholder>{'{{SCORE_COPY placeholder}}'}</Placeholder>
              </p>
            </div>

            <div className="flex flex-col items-center gap-8">
              <div
                className="relative h-52 w-52 rounded-full sm:h-56 sm:w-56"
                style={{
                  background: `conic-gradient(${READY} 0deg, ${READY} ${78 * 3.6}deg, ${HAIRLINE} ${78 * 3.6}deg, ${HAIRLINE} 360deg)`,
                }}
              >
                <div
                  className="absolute inset-[14px] flex flex-col items-center justify-center rounded-full"
                  style={{ background: BG }}
                >
                  <span
                    className="text-5xl leading-none sm:text-6xl"
                    style={{ fontFamily: 'var(--font-chivo)', letterSpacing: '-0.02em' }}
                  >
                    78
                  </span>
                  <span
                    className="mt-1 text-xs uppercase tracking-[0.16em]"
                    style={{ fontFamily: 'var(--font-mono)', color: SOFT }}
                  >
                    Ready
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {['HRV 50%', 'Sleep 35%', 'RHR 15%', '+ load adjusts it'].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border px-3 py-1.5 text-xs"
                    style={{ borderColor: HAIRLINE, color: SOFT, fontFamily: 'var(--font-mono)' }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
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
              <Placeholder>{'{{BANDS_COPY placeholder}}'}</Placeholder>
            </p>

            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <BandImage src="/band-grey.png" alt="Grey colorway" label="Grey · /public/band-grey.png" />
                <p className="mt-4 text-sm" style={{ color: SOFT }}>Grey</p>
              </div>
              <div>
                <BandImage src="/band-black.jpg" alt="Black colorway" label="Black · /public/band-black.jpg" />
                <p className="mt-4 text-sm" style={{ color: SOFT }}>Black</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coaches / Athletes */}
        <section className="border-t px-5 py-20 sm:px-8 sm:py-28" style={{ borderColor: HAIRLINE }}>
          <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 lg:grid-cols-2">
            <div
              className="flex flex-col justify-between rounded-2xl border p-8 sm:p-10"
              style={{ borderColor: HAIRLINE, background: 'rgba(255,255,255,0.35)' }}
            >
              <div>
                <p
                  className="mb-3 text-xs uppercase tracking-[0.18em]"
                  style={{ fontFamily: 'var(--font-mono)', color: SILVER }}
                >
                  For coaches
                </p>
                <p className="mb-8 text-base leading-relaxed" style={{ color: SOFT }}>
                  <Placeholder>{'{{COACHES_COPY placeholder}}'}</Placeholder>
                </p>
              </div>
              <Link href="/team" className="text-sm font-semibold no-underline" style={{ color: INK }}>
                Explore for teams →
              </Link>
            </div>

            <div
              className="flex flex-col justify-between rounded-2xl border p-8 sm:p-10"
              style={{ borderColor: HAIRLINE, background: 'rgba(255,255,255,0.35)' }}
            >
              <div>
                <p
                  className="mb-3 text-xs uppercase tracking-[0.18em]"
                  style={{ fontFamily: 'var(--font-mono)', color: SILVER }}
                >
                  For athletes
                </p>
                <p className="mb-8 text-base leading-relaxed" style={{ color: SOFT }}>
                  <Placeholder>{'{{ATHLETES_COPY placeholder}}'}</Placeholder>
                </p>
              </div>
              <Link href="/individual" className="text-sm font-semibold no-underline" style={{ color: INK }}>
                Explore for athletes →
              </Link>
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
              <Placeholder>{'{{VALIDATION_COPY placeholder}}'}</Placeholder>
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
              <Placeholder>{'{{FOOTER_TAGLINE placeholder}}'}</Placeholder>
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
