'use client'

import { useEffect } from 'react'
import Logo from '@/components/Logo'
import { setupRevealAndNav } from '@/lib/revealAndNav'

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 16, padding: 18 }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 2.4, textTransform: 'uppercase', color: 'var(--silver-dark)', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, lineHeight: 1, color: tone }}>{value}</div>
    </div>
  )
}

export default function Individual() {
  useEffect(() => setupRevealAndNav(), [])

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" style={{ textDecoration: 'none' }}><Logo size={22} /></a>
          <div className="nav-links">
            <a href="/team">Team</a>
            <a href="/login">Login</a>
          </div>
        </div>
      </nav>

      <section className="section hero-section" style={{ background: 'var(--paper)', color: 'var(--text-dark)', minHeight: '100vh' }}>
        <div className="section-inner grid-2">
          <div className="reveal">
            <div className="eyebrow" style={{ color: 'var(--maroon)' }}>Individual Training</div>
            <h1 className="display" style={{ color: 'var(--text-dark)', marginBottom: 28 }}>
              Your training day,<br />
              <span className="accent">made obvious.</span>
            </h1>
            <p className="body-lg" style={{ color: 'var(--silver-dark)', marginBottom: 34 }}>
              4Ward gives individual athletes a mobile-first home for readiness, workouts,
              recovery, and progress. Wake up, check the signal, train with confidence.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="/login" className="btn btn-primary">Start Free →</a>
              <a href="#preview" className="btn btn-ghost">See Preview</a>
            </div>
          </div>

          <div id="preview" className="reveal delay-1">
            <div style={{ maxWidth: 390, margin: '0 auto', background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 34, padding: 14, boxShadow: '0 34px 90px rgba(8,8,9,0.16)' }}>
              <div style={{ background: 'linear-gradient(180deg, #FAFAF7 0%, #FFFFFF 45%, #F3F0EC 100%)', borderRadius: 26, padding: 22, minHeight: 620 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 2.4, color: 'var(--maroon)', textTransform: 'uppercase' }}>Today</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: 'var(--text-dark)', lineHeight: 1 }}>Ready to Train</div>
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--black)', color: 'white', display: 'grid', placeItems: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: 18 }}>4W</div>
                </div>

                <div style={{ background: 'var(--black)', color: 'white', borderRadius: 24, padding: 24, marginBottom: 16 }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 2.6, color: 'var(--silver)', textTransform: 'uppercase', marginBottom: 8 }}>Readiness Score</div>
                  <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 18 }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 92, lineHeight: 0.86, color: 'var(--maroon-bright)' }}>86</div>
                    <div style={{ textAlign: 'right', paddingBottom: 8 }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: 2, color: 'var(--green)', textTransform: 'uppercase' }}>High</div>
                      <div style={{ fontSize: 13, color: 'var(--silver)' }}>Push strength today</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <Metric label="Sleep" value="8.1h" tone="var(--text-dark)" />
                  <Metric label="HRV" value="+7%" tone="var(--maroon)" />
                </div>

                <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 22, padding: 20, marginBottom: 16 }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 2.4, textTransform: 'uppercase', color: 'var(--silver-dark)', marginBottom: 12 }}>Today&apos;s Session</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, lineHeight: 1, color: 'var(--text-dark)', marginBottom: 8 }}>Lower Power</div>
                  <div style={{ fontSize: 14, color: 'var(--silver-dark)', marginBottom: 18 }}>Squat, jump work, posterior chain, core finisher.</div>
                  <div style={{ height: 46, borderRadius: 12, background: 'var(--maroon)', color: 'white', display: 'grid', placeItems: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>Start Workout</div>
                </div>

                <div style={{ display: 'grid', gap: 10 }}>
                  {['Mobility: 8 min', 'Hydration target: 90 oz', 'Recovery note: legs fresh'].map((item) => (
                    <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(123,16,32,0.06)', borderRadius: 14, padding: '12px 14px', color: 'var(--text-dark)', fontSize: 14 }}>
                      <span>{item}</span>
                      <span style={{ color: 'var(--maroon)', fontWeight: 700 }}>→</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="section-inner grid-3">
          <div className="feature-card reveal">
            <div className="feature-num">01</div>
            <div className="feature-title">Readiness First</div>
            <div className="feature-body">Know whether today is a push, maintain, or recover day before you start training.</div>
          </div>
          <div className="feature-card reveal delay-1">
            <div className="feature-num">02</div>
            <div className="feature-title">Workouts That Adapt</div>
            <div className="feature-body">Training sessions can shift around recovery, soreness, sleep, and performance signals.</div>
          </div>
          <div className="feature-card reveal delay-2">
            <div className="feature-num">03</div>
            <div className="feature-title">Progress You Can See</div>
            <div className="feature-body">Track readiness, strength work, recovery habits, and daily consistency in one place.</div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#FFFFFF', color: 'var(--text-dark)', textAlign: 'center' }}>
        <div className="section-narrow reveal">
          <div className="eyebrow">Built For The Mobile Web</div>
          <h2 className="title" style={{ color: 'var(--text-dark)', marginBottom: 24 }}>
            App feel now.<br />
            Native app later.
          </h2>
          <p className="body-lg" style={{ color: 'var(--silver-dark)', margin: '0 auto 36px' }}>
            The individual experience starts as a fast mobile site and grows into the full
            4Ward athlete app over time.
          </p>
          <a href="/login" className="btn btn-primary">Create Account →</a>
        </div>
      </section>
    </>
  )
}
