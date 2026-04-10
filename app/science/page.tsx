'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function SciencePage() {
  const [activeTab, setActiveTab] = useState<'hrv'|'sleep'|'rhr'>('hrv')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ background: '#080809', color: '#F2F2F5', fontFamily: "'Barlow', sans-serif", overflowX: 'hidden' }}>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(8,8,9,0.98)', zIndex: 99,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40
        }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#555560', textDecoration: 'none', letterSpacing: 3
          }}>HOME</Link>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{
            padding: '16px 48px', borderRadius: 4, border: '2px solid #F26419', cursor: 'pointer',
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, letterSpacing: 3,
            color: '#F26419', textDecoration: 'none'
          }}>FOUNDING TEAMS</Link>
        </div>
      )}

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px clamp(16px,4vw,36px)', background: 'rgba(8,8,9,0.95)',
        backdropFilter: 'blur(20px)', borderBottom: '1px solid #111114'
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}><Logo size={26} /></Link>
        <div className="nav-desktop">
          <Link href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, color: '#555560', textDecoration: 'none', marginRight: 32 }}>HOME</Link>
          <Link href="/" style={{ padding: '9px 24px', borderRadius: 4, border: '1px solid #F26419', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 12, letterSpacing: 3, color: '#F26419', textDecoration: 'none' }}>FOUNDING TEAMS</Link>
        </div>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'ham-line ham-top open' : 'ham-line ham-top'} />
          <span className={menuOpen ? 'ham-line ham-mid open' : 'ham-line ham-mid'} />
          <span className={menuOpen ? 'ham-line ham-bot open' : 'ham-line ham-bot'} />
        </button>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(100px,15vw,140px) clamp(16px,4vw,20px) clamp(60px,10vw,80px)',
        textAlign: 'center', position: 'relative'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
        <div style={{ position: 'relative', maxWidth: 820, width: '100%' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 7, color: '#F26419', marginBottom: 32 }}>THE SCIENCE BEHIND THE SCORE</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px,12vw,120px)', lineHeight: 0.88, marginBottom: 36 }}>
            <span style={{ color: '#F2F2F5' }}>BUILT ON</span><br />
            <span style={{ color: '#F26419' }}>RESEARCH.</span>
          </div>
          <p style={{ fontSize: 'clamp(14px,2vw,17px)', color: '#555560', lineHeight: 1.85, maxWidth: 560, margin: '0 auto 48px' }}>
            Every metric in the 4WRI is grounded in peer-reviewed sports science. Not marketing claims. Not proprietary black boxes. Research you can read, cite, and trust.
          </p>
          <a href="#stats" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, color: '#555560', textDecoration: 'none' }}>SEE THE DATA ↓</a>
        </div>
      </section>

      {/* 3 BIG STATS */}
      <section id="stats" style={{ borderTop: '1px solid #111114' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>

          {/* Stat 1 */}
          <div className="stat-block" style={{ borderBottom: '1px solid #111114' }}>
            <div className="stat-number-col" style={{ borderRight: '1px solid #111114' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(80px,16vw,180px)', color: '#F26419', lineHeight: 0.82 }}>1.7×</div>
            </div>
            <div className="stat-text-col">
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(24px,4vw,44px)', color: '#F2F2F5', lineHeight: 1, marginBottom: 20 }}>FEWER INJURIES<br />WITH PROPER SLEEP.</div>
              <p style={{ fontSize: 'clamp(14px,2vw,15px)', color: '#555560', lineHeight: 1.85, marginBottom: 24 }}>
                High school athletes averaging 8 or more hours of sleep are 1.7 times less likely to sustain an injury than their under-rested peers — even after controlling for sport, practice volume, and grade level.
              </p>
              <p style={{ fontSize: 'clamp(14px,2vw,15px)', color: '#555560', lineHeight: 1.85, marginBottom: 24 }}>
                4Ward quantifies sleep quality every morning, turning it from a guess into a coaching variable. When you know an athlete slept 5.5 hours, you coach them differently. That decision used to be intuition. Now it's data.
              </p>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 2, color: '#2A2A30' }}>MILEWSKI ET AL. — CLINICAL JOURNAL OF SPORTS MEDICINE, 2014</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="stat-block stat-block-reverse" style={{ borderBottom: '1px solid #111114', background: '#0D0D0F' }}>
            <div className="stat-text-col">
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(24px,4vw,44px)', color: '#F2F2F5', lineHeight: 1, marginBottom: 20 }}>LESS OVERTRAINING.<br />MORE ADAPTATION.</div>
              <p style={{ fontSize: 'clamp(14px,2vw,15px)', color: '#555560', lineHeight: 1.85, marginBottom: 24 }}>
                When training load is guided by individual HRV data rather than a fixed program, athletes experience 82% fewer overtraining incidents — and make greater gains in strength, speed, and conditioning over the same period.
              </p>
              <p style={{ fontSize: 'clamp(14px,2vw,15px)', color: '#555560', lineHeight: 1.85, marginBottom: 24 }}>
                The 4WRI uses each athlete's 7-day personal baseline to determine readiness — not population averages. A score that means full intensity for one athlete means protection for another. That individualization is the difference.
              </p>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 2, color: '#2A2A30' }}>FLATT & NAKAMURA — INTERNATIONAL JOURNAL OF SPORTS PHYSIOLOGY & PERFORMANCE, 2018</div>
            </div>
            <div className="stat-number-col stat-number-right" style={{ borderLeft: '1px solid #111114' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(80px,16vw,180px)', color: '#F2F2F5', lineHeight: 0.82 }}>82%</div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="stat-block">
            <div className="stat-number-col" style={{ borderRight: '1px solid #111114' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(80px,16vw,180px)', color: '#F26419', lineHeight: 0.82 }}>5%</div>
            </div>
            <div className="stat-text-col">
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(24px,4vw,44px)', color: '#F2F2F5', lineHeight: 1, marginBottom: 20 }}>FASTER SPRINTS.<br />ZERO EXTRA TRAINING.</div>
              <p style={{ fontSize: 'clamp(14px,2vw,15px)', color: '#555560', lineHeight: 1.85, marginBottom: 24 }}>
                Stanford basketball players who extended their sleep to 10 hours improved sprint times by 5%, reaction time by 0.1 seconds, and shooting accuracy by 9% — with no changes whatsoever to their training program.
              </p>
              <p style={{ fontSize: 'clamp(14px,2vw,15px)', color: '#555560', lineHeight: 1.85, marginBottom: 24 }}>
                Recovery is not passive. It is the mechanism through which training produces results. 4Ward ensures your athletes show up to every session with the physiological conditions to actually adapt.
              </p>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 2, color: '#2A2A30' }}>MAH ET AL. — STANFORD SLEEP LAB / SLEEP JOURNAL, 2011</div>
            </div>
          </div>

        </div>
      </section>

      {/* THE THREE PILLARS — TABS */}
      <section style={{ borderTop: '1px solid #111114', padding: 'clamp(60px,10vw,100px) clamp(16px,4vw,20px)', background: '#0D0D0F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 6, color: '#F26419', marginBottom: 16 }}>THE THREE INPUTS</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px,5vw,60px)', color: '#F2F2F5', lineHeight: 0.95, marginBottom: 48 }}>
            WHAT 4WARD<br /><span style={{ color: '#F26419' }}>MEASURES.</span>
          </div>

          {/* Tab selector */}
          <div style={{ display: 'flex', borderBottom: '1px solid #111114', marginBottom: 48 }}>
            {([
              { key: 'hrv', label: 'HRV', weight: '45%' },
              { key: 'sleep', label: 'SLEEP', weight: '40%' },
              { key: 'rhr', label: 'RESTING HR', weight: '15%' },
            ] as const).map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                flex: 1, padding: 'clamp(12px,2vw,16px) clamp(8px,2vw,20px)', background: 'none', cursor: 'pointer',
                border: 'none', borderBottom: activeTab === tab.key ? '2px solid #F26419' : '2px solid transparent',
                textAlign: 'left'
              }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(18px,3vw,22px)', color: activeTab === tab.key ? '#F2F2F5' : '#333340', letterSpacing: 1 }}>{tab.label}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(9px,1.5vw,11px)', letterSpacing: 2, color: activeTab === tab.key ? '#F26419' : '#242428', marginTop: 2 }}>{tab.weight} OF SCORE</div>
              </button>
            ))}
          </div>

          {/* HRV */}
          {activeTab === 'hrv' && (
            <div className="tab-grid">
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(28px,4vw,36px)', color: '#F2F2F5', marginBottom: 16 }}>HEART RATE VARIABILITY</div>
                <p style={{ fontSize: 'clamp(14px,2vw,15px)', color: '#555560', lineHeight: 1.85, marginBottom: 20 }}>HRV measures the variation in time between successive heartbeats — a direct window into autonomic nervous system balance. Elevated HRV indicates readiness. Suppressed HRV indicates the body is still recovering from stress.</p>
                <p style={{ fontSize: 'clamp(14px,2vw,15px)', color: '#555560', lineHeight: 1.85, marginBottom: 20 }}>4Ward compares each athlete's daily HRV to their personal 7-day rolling baseline. An absolute HRV number means nothing without context. The comparison is everything.</p>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 2, color: '#2A2A30', marginTop: 8 }}>FLATT & NAKAMURA, IJSPP 2018 · BUCHHEIT, EJAP 2014 · PLEWS ET AL., IJSPP 2013</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'WHY IT MATTERS', text: 'HRV reflects the integrated recovery state of the cardiovascular, endocrine, and central nervous systems simultaneously.' },
                  { label: 'THE BASELINE', text: 'Comparing to personal baseline eliminates inter-individual noise. A suppressed HRV means something specific for that athlete on that day.' },
                  { label: 'THE WINDOW', text: "Morning HRV gives a 24–48 hour readiness forecast — exactly what coaches need to prescribe today's session." },
                ].map((item, i) => (
                  <div key={i} style={{ padding: 'clamp(16px,2vw,20px) clamp(16px,2vw,24px)', background: '#080809', borderLeft: '2px solid #F26419' }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#F26419', marginBottom: 8 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: '#555560', lineHeight: 1.7 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLEEP */}
          {activeTab === 'sleep' && (
            <div className="tab-grid">
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(28px,4vw,36px)', color: '#F2F2F5', marginBottom: 16 }}>SLEEP QUALITY & DURATION</div>
                <p style={{ fontSize: 'clamp(14px,2vw,15px)', color: '#555560', lineHeight: 1.85, marginBottom: 20 }}>Sleep is not passive recovery. Human growth hormone peaks during slow-wave sleep. Muscle protein synthesis accelerates through REM cycles. Motor pattern consolidation happens overnight. The adaptation from training does not occur in the gym — it occurs during sleep.</p>
                <p style={{ fontSize: 'clamp(14px,2vw,15px)', color: '#555560', lineHeight: 1.85, marginBottom: 20 }}>The AAP recommends 8–10 hours for adolescent athletes. The national average is 6.8 hours. 4Ward makes that gap visible and actionable every morning.</p>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 2, color: '#2A2A30', marginTop: 8 }}>MAH ET AL., 2011 · MILEWSKI ET AL., 2014 · AAP, 2016 · DATTILO ET AL., 2011</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'THE EVIDENCE', text: 'Athletes sleeping under 8 hours are 1.7× more likely to be injured. Sprint speed improves 5% from sleep extension alone.' },
                  { label: 'WHAT 4WARD TRACKS', text: 'Sleep duration, stage breakdown (light, deep, REM), efficiency, and consistency are all factored into the daily sleep score.' },
                  { label: 'THE HORMONAL CONSEQUENCE', text: 'Sleep restriction elevates cortisol, suppresses testosterone, and creates a catabolic environment that works directly against the training stimulus.' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: 'clamp(16px,2vw,20px) clamp(16px,2vw,24px)', background: '#080809', borderLeft: '2px solid #F2F2F5' }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#F2F2F5', marginBottom: 8 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: '#555560', lineHeight: 1.7 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RHR */}
          {activeTab === 'rhr' && (
            <div className="tab-grid">
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(28px,4vw,36px)', color: '#F2F2F5', marginBottom: 16 }}>RESTING HEART RATE</div>
                <p style={{ fontSize: 'clamp(14px,2vw,15px)', color: '#555560', lineHeight: 1.85, marginBottom: 20 }}>Resting HR elevation above an athlete's personal baseline is a reliable early signal that cardiovascular recovery is incomplete. It detects physiological stress — from training, illness, or accumulated fatigue — often before the athlete subjectively reports feeling impaired.</p>
                <p style={{ fontSize: 'clamp(14px,2vw,15px)', color: '#555560', lineHeight: 1.85, marginBottom: 20 }}>Combined with HRV, resting HR provides superior discrimination between recovered and under-recovered athletes than either metric in isolation.</p>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 2, color: '#2A2A30', marginTop: 8 }}>FOSTER ET AL., IJSM 1996 · HEDELIN ET AL., MSSE 2000</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: '+5 BPM ABOVE BASELINE', text: 'Reduce volume. Increase technical focus. Monitor response throughout session.', color: '#F5B820' },
                  { label: '+8 BPM ABOVE BASELINE', text: 'Significant flag. Reduce intensity substantially. Reassess the following morning.', color: '#FB923C' },
                  { label: '+12 BPM ABOVE BASELINE', text: 'Consult athletic trainer. Modified programming required. Something is wrong.', color: '#E85555' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: 'clamp(16px,2vw,20px) clamp(16px,2vw,24px)', background: '#080809', borderLeft: `2px solid ${item.color}` }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: item.color, marginBottom: 8 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: '#555560', lineHeight: 1.7 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOUNDING TEAMS CTA */}
      <section style={{ borderTop: '1px solid #111114', padding: 'clamp(72px,12vw,120px) clamp(16px,4vw,20px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 7, color: '#F26419', marginBottom: 28 }}>NOW ACCEPTING APPLICATIONS</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(44px,9vw,84px)', lineHeight: 0.88, color: '#F2F2F5', marginBottom: 28 }}>
            BECOME A<br /><span style={{ color: '#F26419' }}>FOUNDING TEAM.</span>
          </div>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', color: '#555560', lineHeight: 1.85, marginBottom: 48 }}>
            We are selecting a limited number of programs to partner with before launch. Founding teams will help shape the platform and lock in founding pricing — permanently.
          </div>
          <Link href="/" style={{
            display: 'inline-block', padding: 'clamp(14px,2vw,16px) clamp(32px,5vw,48px)',
            background: '#F26419', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer',
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
            fontSize: 'clamp(13px,2vw,14px)', letterSpacing: 3, textDecoration: 'none',
            width: '100%', maxWidth: 360, boxSizing: 'border-box', textAlign: 'center'
          }}>APPLY NOW →</Link>
          <div style={{ marginTop: 24, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 3, color: '#2A2A30' }}>ANY SPORT · ANY PROGRAM · SUMMER 2026</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #111114', padding: 'clamp(24px,4vw,32px) clamp(16px,4vw,36px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <Logo size={20} />
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 3, color: '#2A2A30' }}>© 2026 4WARD ATHLETE PERFORMANCE</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 2, color: '#2A2A30' }}>@4WARDPERFORMANCE</div>
      </footer>

      <style>{`
        /* Nav */
        .nav-desktop { display:flex; align-items:center; }
        .nav-hamburger { display:none; background:none; border:none; cursor:pointer; padding:4px; flex-direction:column; gap:5px; align-items:center; justify-content:center; }
        .ham-line { display:block; width:22px; height:2px; background:#F2F2F5; transition:transform 0.25s, opacity 0.25s, background 0.25s; transform-origin:center; }
        .ham-line.open { background:#F26419; }
        .ham-top.open { transform:rotate(45deg) translateY(7px); }
        .ham-mid.open { opacity:0; }
        .ham-bot.open { transform:rotate(-45deg) translateY(-7px); }

        /* Stat blocks — 2 col desktop, stacked mobile */
        .stat-block { display:grid; grid-template-columns:1fr 1fr; }
        .stat-number-col { padding:clamp(48px,8vw,80px) clamp(24px,5vw,60px); display:flex; align-items:center; justify-content:flex-start; }
        .stat-number-right { justify-content:flex-end; }
        .stat-text-col { padding:clamp(48px,8vw,80px) clamp(24px,5vw,60px); display:flex; flex-direction:column; justify-content:center; }

        /* Tab content grid */
        .tab-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; }

        /* Footer */
        footer { border-top:1px solid #111114; }

        @media (max-width:680px) {
          /* Nav */
          .nav-desktop { display:none; }
          .nav-hamburger { display:flex; }

          /* Stat blocks — number on top, text below */
          .stat-block { grid-template-columns:1fr; }
          .stat-block-reverse { display:flex; flex-direction:column-reverse; }
          .stat-number-col { padding:clamp(40px,8vw,60px) clamp(20px,5vw,40px); border-right:none !important; border-left:none !important; border-bottom:1px solid #111114; justify-content:flex-start; }
          .stat-number-right { justify-content:flex-start; }
          .stat-text-col { padding:clamp(32px,6vw,48px) clamp(20px,5vw,40px); }

          /* Tab grid — stack */
          .tab-grid { grid-template-columns:1fr; gap:32px; }

          /* Footer */
          footer { flex-direction:column; align-items:center; text-align:center; }
        }
      `}</style>

    </div>
  )
}
