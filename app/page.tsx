'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo, { ChevronMark } from '@/components/Logo'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    school_name: '', sports: '', role: 'coach'
  })

  const openModal = () => { setModalOpen(true); setMenuOpen(false); setSuccess(false); setError('') }
  const closeModal = () => { setModalOpen(false); setError(''); setSuccess(false) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return }
      setSuccess(true)
      setForm({ first_name: '', last_name: '', email: '', school_name: '', sports: '', role: 'coach' })
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', background: '#0C0C0E',
    border: '1px solid #242428', borderRadius: 6, color: '#F2F2F5',
    fontFamily: "'Barlow', sans-serif", fontSize: 15, outline: 'none', boxSizing: 'border-box'
  }
  const labelStyle: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
    fontSize: 11, letterSpacing: 2, color: '#555560', display: 'block', marginBottom: 6
  }

  return (
    <>
      {/* MODAL */}
      {modalOpen && (
        <div onClick={(e) => { if (e.target === e.currentTarget) closeModal() }} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '16px',
          backdropFilter: 'blur(8px)', overflowY: 'auto'
        }}>
          <div style={{
            background: '#0D0D0F', border: '1px solid #242428', borderRadius: 12,
            padding: 'clamp(24px,5vw,40px) clamp(20px,5vw,36px)',
            maxWidth: 460, width: '100%', position: 'relative', margin: 'auto'
          }}>
            <button onClick={closeModal} style={{
              position: 'absolute', top: 16, right: 20, background: 'none', border: 'none',
              color: '#555560', fontSize: 24, cursor: 'pointer', lineHeight: 1
            }}>×</button>
            {success ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: '#F26419', marginBottom: 12 }}>YOU'RE IN.</div>
                <div style={{ fontSize: 15, color: '#888898', lineHeight: 1.8 }}>
                  We'll reach out before launch. You're among the first coaches to join 4Ward.<br /><br />— Chris
                </div>
              </div>
            ) : (
              <>
                <Logo size={24} style={{ marginBottom: 20 }} />
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(22px,5vw,28px)', color: '#F2F2F5', marginBottom: 6 }}>BECOME A FOUNDING TEAM</div>
                <div style={{ fontSize: 14, color: '#555560', marginBottom: 28, lineHeight: 1.7 }}>
                  We are selecting a small number of programs to partner with before launch. Founding teams lock in founding pricing — permanently.
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="form-row-2">
                    {[
                      { label: 'FIRST NAME', key: 'first_name', placeholder: 'Chris' },
                      { label: 'LAST NAME', key: 'last_name', placeholder: 'Smith' },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={labelStyle}>{f.label}</label>
                        <input required placeholder={f.placeholder} value={(form as any)[f.key]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          style={inputStyle} />
                      </div>
                    ))}
                  </div>
                  {[
                    { label: 'EMAIL', key: 'email', placeholder: 'coach@school.edu', type: 'email' },
                    { label: 'SCHOOL', key: 'school_name', placeholder: 'Keller High School' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={labelStyle}>{f.label}</label>
                      <input required type={f.type || 'text'} placeholder={f.placeholder} value={(form as any)[f.key]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        style={inputStyle} />
                    </div>
                  ))}
                  <div className="form-row-2">
                    <div>
                      <label style={labelStyle}>SPORT(S)</label>
                      <input placeholder="Football, Track..." value={form.sports}
                        onChange={e => setForm({ ...form, sports: e.target.value })}
                        style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>YOUR ROLE</label>
                      <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ ...inputStyle, appearance: 'none' }}>
                        <option value="coach">Head Coach</option>
                        <option value="sc">S&C Coach</option>
                        <option value="assistant">Assistant Coach</option>
                        <option value="ad">Athletic Director</option>
                        <option value="trainer">Athletic Trainer</option>
                      </select>
                    </div>
                  </div>
                  {error && <div style={{ fontSize: 13, color: '#E85555', padding: 10, background: 'rgba(232,85,85,0.08)', borderRadius: 6, textAlign: 'center' }}>{error}</div>}
                  <button type="submit" disabled={loading} style={{
                    padding: '15px 0', background: loading ? '#1A1A1E' : '#F26419',
                    color: 'white', border: 'none', borderRadius: 6,
                    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
                    fontSize: 16, letterSpacing: 2, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4
                  }}>
                    {loading ? 'SUBMITTING...' : 'BECOME A FOUNDING TEAM →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(8,8,9,0.98)', zIndex: 99,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40
        }}>
          <Link href="/science" onClick={() => setMenuOpen(false)} style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#555560', textDecoration: 'none', letterSpacing: 3
          }}>SEE THE SCIENCE</Link>
          <Link href="/story" onClick={() => setMenuOpen(false)} style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#555560', textDecoration: 'none', letterSpacing: 3
          }}>OUR STORY</Link>
          <button onClick={openModal} style={{
            padding: '16px 48px', borderRadius: 4, border: '2px solid #F26419', cursor: 'pointer',
            background: 'transparent', color: '#F26419',
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, letterSpacing: 3
          }}>FOUNDING TEAMS</button>
        </div>
      )}

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px clamp(16px,4vw,36px)', background: 'rgba(8,8,9,0.95)',
        backdropFilter: 'blur(20px)', borderBottom: '1px solid #111114'
      }}>
        <Logo size={26} />
        <div className="nav-desktop">
          <Link href="/science" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, color: '#555560', textDecoration: 'none', marginRight: 32 }}>SEE THE SCIENCE</Link>
          <Link href="/story" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, color: '#555560', textDecoration: 'none', marginRight: 32 }}>OUR STORY</Link>
          <button onClick={openModal} style={{
            padding: '9px 24px', borderRadius: 4, border: '1px solid #F26419', cursor: 'pointer',
            background: 'transparent', color: '#F26419',
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 12, letterSpacing: 3
          }}>FOUNDING TEAMS</button>
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
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 860, width: '100%' }}>

          {/* Eyebrow — slightly bigger */}
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(11px,2vw,13px)', letterSpacing: 'clamp(4px,1.5vw,7px)', color: '#F26419', marginBottom: 32 }}>ATHLETE PERFORMANCE PLATFORM · LAUNCHING SUMMER 2026</div>

          {/* Hero logo with locked chevron values */}
          <div className="hero-logo-wrap">
            <span className="hero-logo-text" style={{ color: '#F26419' }}>4</span>
            <span className="hero-logo-text" style={{ color: '#F2F2F5' }}>WARD</span>
            <ChevronMark size="0.64em" style={{ marginLeft: '0em', verticalAlign: 'middle', marginBottom: '0em' }} />
          </div>

          {/* Tagline — bigger, one line at a time */}
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(28px,5.5vw,58px)', color: '#F2F2F5', lineHeight: 1.05, marginTop: 36 }}>
            <div>RESEARCH-PROVEN DATA.</div>
            <div style={{ color: '#F26419' }}>ACTIONABLE INSIGHTS.</div>
            <div>ONE PLATFORM.</div>
          </div>

          {/* Body — slightly bigger, slightly lighter grey that's still readable */}
          <div style={{ fontSize: 'clamp(15px,2vw,18px)', color: '#888898', fontWeight: 500, lineHeight: 1.85, maxWidth: 580, margin: '28px auto 0' }}>
            4Ward uses a research-proven approach to determine recovery and readiness, gives coaches insights into their athletes' readiness level, and provides the platform to put the data to use.
          </div>

          {/* Single CTA — orange SEE THE SCIENCE */}
          <div style={{ marginTop: 48 }}>
            <Link href="/science" style={{
              padding: 'clamp(13px,2vw,15px) clamp(32px,5vw,48px)', borderRadius: 4,
              background: '#F26419', color: 'white', border: 'none',
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
              fontSize: 'clamp(13px,2vw,14px)', letterSpacing: 3,
              textDecoration: 'none', display: 'inline-block'
            }}>SEE THE SCIENCE</Link>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom,transparent,#242428)' }} />
        </div>
      </section>

      {/* 4WRI SCORE — DASHBOARD VIEW */}
      <section style={{ borderTop: '1px solid #111114', padding: 'clamp(60px,10vw,100px) clamp(16px,4vw,20px)', background: '#0D0D0F' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 6, color: '#F26419', marginBottom: 20 }}>THE 4WRI FORMULA</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px,6vw,68px)', color: '#F2F2F5', lineHeight: 0.95, marginBottom: 12 }}>
            ONE SCORE.<br /><span style={{ color: '#F26419' }}>EVERY MORNING.</span>
          </div>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', color: '#888898', fontWeight: 500, lineHeight: 1.8, maxWidth: 540, margin: '0 auto 48px' }}>
            Every morning, each athlete receives a readiness score built from three research-validated inputs. Coaches see every athlete's status the moment they open the app.
          </div>

          {/* Mock dashboard card */}
          <div style={{ background: '#080809', border: '1px solid #1A1A1E', borderRadius: 12, padding: 'clamp(24px,4vw,40px)', maxWidth: 680, margin: '0 auto' }}>

            {/* Dashboard header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#555560' }}>COACH DASHBOARD</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#F2F2F5', marginTop: 2 }}>TUESDAY · APR 15</div>
              </div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, color: '#2ECC8A', background: 'rgba(46,204,138,0.08)', border: '1px solid rgba(46,204,138,0.2)', borderRadius: 4, padding: '6px 14px' }}>18 ATHLETES SYNCED</div>
            </div>

            {/* Athlete rows */}
            {[
              { name: 'J. HARRIS', score: 91, status: 'OPTIMAL', color: '#2ECC8A', inputs: ['HRV ↑', 'SLEEP 8.5h', 'RHR —'] },
              { name: 'M. TORRES', score: 74, status: 'MODERATE', color: '#F5B820', inputs: ['HRV —', 'SLEEP 6.9h', 'RHR ↑'] },
              { name: 'D. WALKER', score: 51, status: 'ELEVATED', color: '#FB923C', inputs: ['HRV ↓', 'SLEEP 5.2h', 'RHR ↑↑'] },
            ].map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 'clamp(12px,3vw,20px)',
                padding: 'clamp(12px,2vw,16px) clamp(12px,2vw,16px)',
                background: '#0D0D0F', borderRadius: 6, marginBottom: 6,
                borderLeft: `2px solid ${a.color}`
              }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(28px,4vw,40px)', color: a.color, lineHeight: 1, minWidth: 'clamp(40px,6vw,56px)' }}>{a.score}</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(13px,2vw,15px)', color: '#F2F2F5', letterSpacing: 1 }}>{a.name}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                    {a.inputs.map((inp, j) => (
                      <span key={j} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 1, color: '#555560' }}>{inp}</span>
                    ))}
                  </div>
                </div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, color: a.color }}>{a.status}</div>
              </div>
            ))}

            {/* Inputs legend */}
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #111114', display: 'flex', gap: 'clamp(12px,3vw,24px)', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { label: 'HRV', desc: 'Heart rate variability vs. personal baseline' },
                { label: 'SLEEP', desc: 'Duration, staging, and consistency' },
                { label: 'RHR', desc: 'Resting heart rate vs. personal baseline' },
              ].map((inp, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 2, color: '#F26419' }}>{inp.label}</div>
                  <div style={{ fontSize: 11, color: '#2A2A30', marginTop: 2, maxWidth: 140 }}>{inp.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone key */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 24 }}>
            {[
              { label: '85–100 OPTIMAL', color: '#2ECC8A' },
              { label: '70–84 MODERATE', color: '#F5B820' },
              { label: '50–69 ELEVATED', color: '#FB923C' },
              { label: '0–49 RECOVERY', color: '#7C6FE0' },
            ].map((z, i) => (
              <div key={i} style={{ padding: '5px 12px', border: `1px solid ${z.color}33`, borderRadius: 3, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, color: z.color, letterSpacing: 1 }}>{z.label}</div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKOUT MODE */}
      <section style={{ borderTop: '1px solid #111114', padding: 'clamp(60px,10vw,100px) clamp(16px,4vw,20px)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 6, color: '#F26419', marginBottom: 20, textAlign: 'center' }}>WORKOUT MODE</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px,6vw,68px)', color: '#F2F2F5', lineHeight: 0.95, marginBottom: 16, textAlign: 'center' }}>
            PUSH THE PROGRAM.<br /><span style={{ color: '#F26419' }}>TRACK EVERY REP.</span>
          </div>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', color: '#888898', fontWeight: 500, lineHeight: 1.85, maxWidth: 620, margin: '0 auto 56px', textAlign: 'center' }}>
            Coaches build or select programs inside 4Ward — with exact weights, sets, reps, and rest periods — then push them directly to every athlete's app with one tap. Adjustments based on readiness scores can be applied automatically or manually, individually or across the entire roster.
          </div>

          {/* Two mock views side by side */}
          <div className="workout-grid">

            {/* Athlete view */}
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#555560', marginBottom: 12, textAlign: 'center' }}>ATHLETE VIEW</div>
              <div style={{ background: '#0D0D0F', border: '1px solid #1A1A1E', borderRadius: 12, padding: 'clamp(20px,3vw,28px)' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, color: '#F26419', marginBottom: 4 }}>WORKOUT MODE</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#F2F2F5', marginBottom: 20 }}>TUESDAY LIFT</div>
                {[
                  { exercise: 'Back Squat', sets: '4', reps: '5', weight: '285 lbs', rest: '3:00', done: true },
                  { exercise: 'Romanian Deadlift', sets: '3', reps: '8', weight: '185 lbs', rest: '2:00', done: false, active: true },
                  { exercise: 'Leg Press', sets: '3', reps: '10', weight: '360 lbs', rest: '90s', done: false },
                ].map((ex, i) => (
                  <div key={i} style={{
                    padding: '12px 14px', borderRadius: 6, marginBottom: 6,
                    background: ex.active ? '#0C0C0E' : '#080809',
                    border: ex.active ? '1px solid #F26419' : '1px solid #111114',
                    opacity: ex.done ? 0.4 : 1
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, color: ex.active ? '#F26419' : '#F2F2F5', letterSpacing: 1 }}>{ex.exercise}</div>
                        <div style={{ fontSize: 12, color: '#555560', marginTop: 2 }}>{ex.sets} sets × {ex.reps} reps · {ex.weight}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        {ex.done && <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 1, color: '#2ECC8A' }}>DONE</div>}
                        {ex.active && <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 1, color: '#F26419' }}>REST {ex.rest}</div>}
                        {!ex.done && !ex.active && <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 1, color: '#2A2A30' }}>UP NEXT</div>}
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 16, padding: '10px 0', borderTop: '1px solid #111114', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 2, color: '#333340', textAlign: 'center' }}>INDIVIDUAL MODE · COACH MONITORING</div>
              </div>
            </div>

            {/* Coach view */}
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#555560', marginBottom: 12, textAlign: 'center' }}>COACH VIEW</div>
              <div style={{ background: '#0D0D0F', border: '1px solid #1A1A1E', borderRadius: 12, padding: 'clamp(20px,3vw,28px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, color: '#F26419', marginBottom: 2 }}>LIVE WORKOUT</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#F2F2F5' }}>TUESDAY LIFT</div>
                  </div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 2, color: '#2ECC8A', background: 'rgba(46,204,138,0.08)', border: '1px solid rgba(46,204,138,0.2)', borderRadius: 4, padding: '5px 10px' }}>16 / 18 ACTIVE</div>
                </div>

                {/* Alert */}
                <div style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.3)', borderRadius: 6, padding: '12px 14px', marginBottom: 14 }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, color: '#FB923C', marginBottom: 4 }}>⚠ ATHLETE LEFT WORKOUT MODE</div>
                  <div style={{ fontSize: 13, color: '#888898' }}>K. JOHNSON exited at 10:14 AM — Romanian Deadlift, Set 2</div>
                </div>

                {/* Load adjustment */}
                <div style={{ background: '#080809', borderRadius: 6, padding: '14px', marginBottom: 14 }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, color: '#F2F2F5', marginBottom: 10 }}>READINESS-BASED LOAD ADJUSTMENT</div>
                  <div style={{ fontSize: 13, color: '#555560', marginBottom: 12 }}>3 athletes flagged ELEVATED. Reduce their training load?</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button style={{ padding: '8px 16px', background: '#F26419', border: 'none', borderRadius: 4, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 12, letterSpacing: 2, color: 'white', cursor: 'pointer' }}>APPLY TO ALL 3 →</button>
                    <button style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #242428', borderRadius: 4, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 2, color: '#555560', cursor: 'pointer' }}>REVIEW INDIVIDUALLY</button>
                  </div>
                </div>

                <div style={{ padding: '10px 0', borderTop: '1px solid #111114', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 2, color: '#333340', textAlign: 'center' }}>GROUP MODE ALSO AVAILABLE · ONE DEVICE PER GROUP</div>
              </div>
            </div>
          </div>

          {/* Feature callouts */}
          <div className="feature-grid" style={{ marginTop: 40 }}>
            {[
              { title: 'PUSH ANY PROGRAM', body: 'Use built-in 4Ward programs or build your own. Exact weights, reps, sets, and rest periods pushed directly to every athlete.' },
              { title: 'ONE-CLICK ADJUSTMENTS', body: 'Apply readiness-based load reductions or increases to individual athletes or the entire roster with a single tap.' },
              { title: 'INDIVIDUAL & GROUP MODE', body: 'Athletes can work through their program independently, or a group can share one device during training blocks.' },
              { title: 'WEEKLY REPORTS', body: 'Every athlete gets a weekly summary of their readiness trends, training volume, and recovery data. Coaches see program-wide insights and individual progression.' },
            ].map((f, i) => (
              <div key={i} style={{ padding: 'clamp(20px,3vw,24px)', background: '#0D0D0F', borderLeft: '2px solid #F26419' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, color: '#F26419', marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 'clamp(13px,1.8vw,14px)', color: '#888898', fontWeight: 500, lineHeight: 1.75 }}>{f.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDING TEAMS CTA */}
      <section style={{ borderTop: '1px solid #111114', padding: 'clamp(72px,12vw,120px) clamp(16px,4vw,20px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px,10vw,96px)', lineHeight: 0.88, color: '#F2F2F5', marginBottom: 28 }}>
            BECOME A<br /><span style={{ color: '#F26419' }}>FOUNDING TEAM.</span>
          </div>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', color: '#888898', fontWeight: 500, lineHeight: 1.85, marginBottom: 48, maxWidth: 480, margin: '0 auto 48px' }}>
            We are selecting a limited number of programs to partner with before launch. Founding teams will shape the product, validate the platform, and lock in founding pricing — permanently.
          </div>
          <button onClick={openModal} style={{
            padding: 'clamp(14px,2vw,16px) clamp(32px,5vw,48px)', background: '#F26419', color: 'white',
            border: 'none', borderRadius: 4, cursor: 'pointer',
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
            fontSize: 'clamp(13px,2vw,15px)', letterSpacing: 3,
            width: '100%', maxWidth: 400
          }}>BECOME A FOUNDING TEAM →</button>
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
        .hero-logo-wrap { display:inline-flex; align-items:center; line-height:0.88; font-family:'Bebas Neue',sans-serif; font-size:clamp(64px,18vw,172px); }
        .hero-logo-text { line-height:0.88; }

        .nav-desktop { display:flex; align-items:center; }
        .nav-hamburger { display:none; background:none; border:none; cursor:pointer; padding:4px; flex-direction:column; gap:5px; align-items:center; justify-content:center; }
        .ham-line { display:block; width:22px; height:2px; background:#F2F2F5; transition:transform 0.25s, opacity 0.25s, background 0.25s; transform-origin:center; }
        .ham-line.open { background:#F26419; }
        .ham-top.open { transform:rotate(45deg) translateY(7px); }
        .ham-mid.open { opacity:0; }
        .ham-bot.open { transform:rotate(-45deg) translateY(-7px); }

        .form-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

        .workout-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(16px,3vw,32px); }
        .feature-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; }

        @media (max-width:680px) {
          .nav-desktop { display:none; }
          .nav-hamburger { display:flex; }
          .form-row-2 { grid-template-columns:1fr; }
          .workout-grid { grid-template-columns:1fr; }
          .feature-grid { grid-template-columns:1fr; }
          footer { flex-direction:column; align-items:center; text-align:center; }
        }
      `}</style>
    </>
  )
}
