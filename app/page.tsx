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
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(22px,5vw,28px)', color: '#F2F2F5', marginBottom: 6 }}>APPLY AS A FOUNDING TEAM</div>
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
                        <option value="sc">S&amp;C Coach</option>
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
                    {loading ? 'SUBMITTING...' : 'APPLY NOW →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(8,8,9,0.98)', zIndex: 99,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40
        }}>
          <Link href="/science" onClick={() => setMenuOpen(false)} style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#555560', textDecoration: 'none', letterSpacing: 3
          }}>THE SCIENCE</Link>
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
          <Link href="/science" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, color: '#555560', textDecoration: 'none', marginRight: 32 }}>THE SCIENCE</Link>
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
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(9px,2.5vw,11px)', letterSpacing: 'clamp(3px,1.5vw,7px)', color: '#F26419', marginBottom: 32 }}>ATHLETE PERFORMANCE PLATFORM · LAUNCHING SUMMER 2026</div>
          <div className="hero-logo-wrap">
            <span className="hero-logo-text" style={{ color: '#F26419' }}>4</span>
            <span className="hero-logo-text" style={{ color: '#F2F2F5' }}>WARD</span>
            <ChevronMark size="0.58em" style={{ marginLeft: '0.04em', verticalAlign: 'middle', marginBottom: '0.06em' }} />
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(28px,6vw,60px)', color: '#F2F2F5', lineHeight: 1.05, marginTop: 36 }}>
            BETTER DATA.<br /><span style={{ color: '#F26419' }}>BETTER PERFORMANCE.</span>
          </div>
          <div style={{ fontSize: 'clamp(14px,2vw,17px)', color: '#555560', lineHeight: 1.85, maxWidth: 520, margin: '28px auto 0' }}>
            HRV. Sleep. Resting heart rate. One readiness score — delivered to every coach on your staff before the day begins.
          </div>
          <div className="hero-btns">
            <button onClick={openModal} className="btn-primary hero-btn">APPLY AS A FOUNDING TEAM</button>
            <Link href="/science" className="btn-secondary hero-btn">SEE THE SCIENCE</Link>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom,transparent,#242428)' }} />
        </div>
      </section>

      {/* THREE STATS */}
      <section style={{ borderTop: '1px solid #111114', padding: 'clamp(60px,10vw,100px) clamp(16px,4vw,20px)' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 6, color: '#F26419', marginBottom: 20, textAlign: 'center' }}>PEER-REVIEWED RESEARCH</div>
          <div className="stats-grid">
            {[
              { stat: '1.7×', headline: 'FEWER INJURIES.', body: "Athletes averaging 8 or more hours of sleep sustain 1.7 times fewer injuries than those who don't. 4Ward makes sleep a measurable, coachable variable.", source: 'Milewski et al. — Clinical Journal of Sports Medicine, 2014', color: '#F26419', bg: '#080809' },
              { stat: '82%', headline: 'LESS OVERTRAINING.', body: 'Individualized HRV-guided training produced 82% fewer overtraining incidents compared to fixed-load protocols. Your athletes adapt more. Break down less.', source: 'Flatt & Nakamura — IJSPP, 2018', color: '#F2F2F5', bg: '#0D0D0F' },
              { stat: '5%', headline: 'FASTER. NO EXTRA TRAINING.', body: 'Stanford athletes who extended sleep improved sprint speed by 5% with zero changes to their training program. Recovery is training.', source: 'Mah et al. — Stanford Sleep Lab, 2011', color: '#F26419', bg: '#080809' },
            ].map((item, i) => (
              <div key={i} className="stat-card" style={{ padding: 'clamp(36px,6vw,56px) clamp(24px,4vw,40px)', background: item.bg }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(72px,12vw,120px)', color: item.color, lineHeight: 0.85, marginBottom: 20 }}>{item.stat}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(22px,3vw,26px)', color: '#F2F2F5', letterSpacing: 1, marginBottom: 16 }}>{item.headline}</div>
                <div style={{ fontSize: 'clamp(14px,2vw,15px)', color: '#555560', lineHeight: 1.8, marginBottom: 20 }}>{item.body}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 2, color: '#2A2A30' }}>{item.source}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/science" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, color: '#555560', textDecoration: 'none' }}>VIEW THE FULL RESEARCH →</Link>
          </div>
        </div>
      </section>

      {/* THE SCORE */}
      <section style={{ borderTop: '1px solid #111114', padding: 'clamp(60px,10vw,100px) clamp(16px,4vw,20px)', background: '#0D0D0F' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 6, color: '#F26419', marginBottom: 20 }}>THE 4WRI FORMULA</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px,6vw,68px)', color: '#F2F2F5', lineHeight: 0.95, marginBottom: 48 }}>
            ONE SCORE.<br /><span style={{ color: '#F26419' }}>EVERY MORNING.</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { weight: '45%', name: 'HRV SCORE', detail: 'Compared to personal 7-day baseline', color: '#F26419' },
              { weight: '40%', name: 'SLEEP SCORE', detail: 'Duration, staging, and consistency', color: '#F2F2F5' },
              { weight: '15%', name: 'RESTING HEART RATE', detail: 'Compared to personal 7-day baseline', color: '#888898' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px,3vw,24px)', padding: 'clamp(16px,3vw,20px) clamp(16px,3vw,24px)', background: '#080809', borderLeft: `2px solid ${row.color}` }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(26px,4vw,32px)', color: row.color, width: 'clamp(44px,8vw,56px)', flexShrink: 0 }}>{row.weight}</div>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(13px,2vw,16px)', color: '#F2F2F5', letterSpacing: 1 }}>{row.name}</div>
                  <div style={{ fontSize: 'clamp(11px,1.5vw,12px)', color: '#555560', marginTop: 2 }}>{row.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 2, padding: 'clamp(16px,3vw,24px)', background: '#080809' }}>
            <div className="score-row">
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, color: '#555560' }}>DAILY SCORE →</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px,8vw,64px)', color: '#F26419', lineHeight: 1 }}>78</div>
            </div>
            <div className="zone-badges">
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
        </div>
      </section>

      {/* FOUNDING TEAMS CTA */}
      <section style={{ borderTop: '1px solid #111114', padding: 'clamp(72px,12vw,120px) clamp(16px,4vw,20px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 7, color: '#F26419', marginBottom: 28 }}>NOW ACCEPTING APPLICATIONS</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px,10vw,96px)', lineHeight: 0.88, color: '#F2F2F5', marginBottom: 28 }}>
            FOUNDING<br /><span style={{ color: '#F26419' }}>TEAMS.</span>
          </div>
          <div style={{ fontSize: 'clamp(14px,2vw,16px)', color: '#555560', lineHeight: 1.85, marginBottom: 48, maxWidth: 480, margin: '0 auto 48px' }}>
            We are selecting a limited number of programs to partner with before launch. Founding teams will shape the product, validate the platform, and lock in founding pricing — permanently.
          </div>
          <button onClick={openModal} style={{
            padding: 'clamp(14px,2vw,16px) clamp(32px,5vw,48px)', background: '#F26419', color: 'white',
            border: 'none', borderRadius: 4, cursor: 'pointer',
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
            fontSize: 'clamp(13px,2vw,15px)', letterSpacing: 3,
            width: '100%', maxWidth: 360
          }}>APPLY NOW →</button>
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
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .hero-logo-wrap { display:inline-flex; align-items:center; line-height:0.88; font-family:'Bebas Neue',sans-serif; font-size:clamp(64px,18vw,172px); }
        .hero-logo-text { line-height:0.88; }

        .hero-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:48px; }
        .hero-btn { box-sizing:border-box; }
        .btn-primary { padding:15px 40px; border-radius:4px; border:none; cursor:pointer; background:#F26419; color:white; font-family:'Barlow Condensed',sans-serif; font-weight:900; font-size:clamp(13px,2vw,14px); letter-spacing:3px; }
        .btn-secondary { padding:15px 40px; border-radius:4px; border:1px solid #242428; background:transparent; color:#888898; font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:clamp(13px,2vw,14px); letter-spacing:3px; text-decoration:none; display:inline-flex; align-items:center; }

        .stats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; }
        .stat-card + .stat-card { border-left:1px solid #111114; }

        .score-row { display:flex; align-items:center; gap:20px; flex-wrap:wrap; margin-bottom:12px; }
        .zone-badges { display:flex; gap:6px; flex-wrap:wrap; }

        .form-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

        .nav-desktop { display:flex; align-items:center; }
        .nav-hamburger { display:none; background:none; border:none; cursor:pointer; padding:4px; flex-direction:column; gap:5px; align-items:center; justify-content:center; }
        .ham-line { display:block; width:22px; height:2px; background:#F2F2F5; transition:transform 0.25s, opacity 0.25s, background 0.25s; transform-origin:center; }
        .ham-line.open { background:#F26419; }
        .ham-top.open { transform:rotate(45deg) translateY(7px); }
        .ham-mid.open { opacity:0; }
        .ham-bot.open { transform:rotate(-45deg) translateY(-7px); }

        @media (max-width:680px) {
          .stats-grid { grid-template-columns:1fr; }
          .stat-card + .stat-card { border-left:none; border-top:1px solid #111114; }
          .form-row-2 { grid-template-columns:1fr; }
          .nav-desktop { display:none; }
          .nav-hamburger { display:flex; }
          .hero-btns { flex-direction:column; align-items:stretch; padding:0 4px; }
          .hero-btn { width:100%; justify-content:center; text-align:center; }
          .btn-primary { padding:16px 24px; }
          .btn-secondary { padding:16px 24px; justify-content:center; }
          footer { flex-direction:column; align-items:center; text-align:center; }
          .zone-badges { flex-direction:column; }
        }

        @media (max-width:400px) {
          .hero-logo-wrap { font-size:clamp(52px,16vw,80px); }
        }
      `}</style>
    </>
  )
}
