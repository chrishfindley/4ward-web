'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo, { ChevronMark } from '@/components/Logo'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    school_name: '', sports: '', role: 'coach'
  })

  const openModal = () => { setModalOpen(true); setSuccess(false); setError('') }
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

  return (
    <>
      {/* MODAL */}
      {modalOpen && (
        <div onClick={(e) => { if (e.target === e.currentTarget) closeModal() }} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
          backdropFilter: 'blur(6px)'
        }}>
          <div style={{
            background: '#111114', border: '1px solid #F26419', borderRadius: 16,
            padding: 40, maxWidth: 480, width: '100%', position: 'relative'
          }}>
            <button onClick={closeModal} style={{
              position: 'absolute', top: 16, right: 20, background: 'none', border: 'none',
              color: '#888898', fontSize: 28, cursor: 'pointer', lineHeight: 1
            }}>×</button>

            {success ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 52, marginBottom: 20 }}>🏈</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#2ECC8A', marginBottom: 12 }}>YOU'RE IN.</div>
                <div style={{ fontSize: 15, color: '#888898', lineHeight: 1.7 }}>
                  We'll be in touch before launch. You're among the first coaches to join 4Ward.<br /><br />— Chris
                </div>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 4 }}>
                  <Logo size={32} />
                </div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, color: '#F2F2F5', marginBottom: 8 }}>Join the Waitlist</div>
                <div style={{ fontSize: 14, color: '#888898', marginBottom: 28, lineHeight: 1.6 }}>
                  Launching summer 2026. First 10 programs receive founding pricing — $1,499/year, locked for life.
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                      { label: 'FIRST NAME', key: 'first_name', placeholder: 'Chris' },
                      { label: 'LAST NAME', key: 'last_name', placeholder: 'Smith' },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, color: '#888898', display: 'block', marginBottom: 6 }}>{f.label}</label>
                        <input required placeholder={f.placeholder} value={(form as any)[f.key]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          style={{ width: '100%', padding: '12px 14px', background: '#0C0C0E', border: '1px solid #242428', borderRadius: 6, color: '#F2F2F5', fontFamily: "'Barlow', sans-serif", fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    ))}
                  </div>
                  {[
                    { label: 'EMAIL', key: 'email', placeholder: 'coach@school.edu', type: 'email' },
                    { label: 'SCHOOL NAME', key: 'school_name', placeholder: 'Keller High School' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, color: '#888898', display: 'block', marginBottom: 6 }}>{f.label}</label>
                      <input required type={f.type || 'text'} placeholder={f.placeholder} value={(form as any)[f.key]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', background: '#0C0C0E', border: '1px solid #242428', borderRadius: 6, color: '#F2F2F5', fontFamily: "'Barlow', sans-serif", fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, color: '#888898', display: 'block', marginBottom: 6 }}>SPORT(S)</label>
                      <input placeholder="Football, Basketball..." value={form.sports}
                        onChange={e => setForm({ ...form, sports: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', background: '#0C0C0E', border: '1px solid #242428', borderRadius: 6, color: '#F2F2F5', fontFamily: "'Barlow', sans-serif", fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, color: '#888898', display: 'block', marginBottom: 6 }}>YOUR ROLE</label>
                      <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', background: '#0C0C0E', border: '1px solid #242428', borderRadius: 6, color: '#F2F2F5', fontFamily: "'Barlow', sans-serif", fontSize: 15, outline: 'none', appearance: 'none', boxSizing: 'border-box' }}>
                        <option value="coach">Head Coach</option>
                        <option value="sc">S&C Coach</option>
                        <option value="assistant">Assistant Coach</option>
                        <option value="ad">Athletic Director</option>
                        <option value="trainer">Athletic Trainer</option>
                      </select>
                    </div>
                  </div>
                  {error && <div style={{ fontSize: 13, color: '#E85555', padding: 10, background: 'rgba(232,85,85,0.1)', borderRadius: 6, textAlign: 'center' }}>{error}</div>}
                  <button type="submit" disabled={loading} style={{
                    padding: 16, background: 'linear-gradient(135deg,#F26419,#C44E0F)', color: 'white',
                    border: 'none', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900, fontSize: 17, letterSpacing: 1.5, cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1, marginTop: 4
                  }}>
                    {loading ? 'SUBMITTING...' : 'JOIN THE WAITLIST →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 32px', background: 'rgba(8,8,9,0.92)',
        backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 1 }}>
          <Logo size={28} />
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Link href="/science" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, color: '#888898', textDecoration: 'none' }}>THE SCIENCE</Link>
          <button onClick={openModal} style={{
            padding: '9px 22px', borderRadius: 5, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#F26419,#C44E0F)', color: 'white',
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: 2,
            boxShadow: '0 0 20px rgba(242,100,25,0.3)'
          }}>JOIN WAITLIST</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', padding: '100px 20px 60px', textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(242,100,25,0.18) 0%,transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(242,100,25,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(242,100,25,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 24 }}>BUILT FOR HIGH SCHOOL COACHES · ANY SPORT</div>
          <div className="hero-logo-wrap">
            <span className="hero-logo-text" style={{ color: '#F26419' }}>4</span>
            <span className="hero-logo-text" style={{ color: '#F2F2F5' }}>WARD</span>
            <ChevronMark size="1em" style={{ marginLeft: '0.04em', verticalAlign: 'middle', marginBottom: '0.05em' }} />
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 300, fontSize: 'clamp(16px,3vw,22px)', color: '#B0B0C0', letterSpacing: 3, marginTop: 12 }}>ATHLETE PERFORMANCE PLATFORM</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px,7vw,72px)', color: '#F2F2F5', lineHeight: 1, marginTop: 40 }}>
            BETTER DATA. <span style={{ color: '#F26419' }}>BETTER PERFORMANCE.</span>
          </div>
          <div style={{ fontSize: 'clamp(15px,2.5vw,18px)', color: '#888898', lineHeight: 1.75, maxWidth: 600, margin: '24px auto 0' }}>
            HRV. Sleep. Resting heart rate. One readiness score for every athlete on your roster — delivered to every coach on your staff before the day begins.
          </div>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
            <button onClick={openModal} style={{
              padding: '16px 40px', borderRadius: 6, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#F26419,#C44E0F)', color: 'white',
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, letterSpacing: 2,
              boxShadow: '0 0 40px rgba(242,100,25,0.4)'
            }}>JOIN THE WAITLIST</button>
            <Link href="/science" style={{
              padding: '16px 40px', borderRadius: 6, border: '1px solid rgba(242,100,25,0.4)',
              background: 'transparent', color: '#F26419',
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: 2, textDecoration: 'none', display: 'inline-flex', alignItems: 'center'
            }}>SEE THE SCIENCE</Link>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid #1A1A1E', borderBottom: '1px solid #1A1A1E', padding: '14px 0', background: '#0D0D0F' }}>
        <div style={{ display: 'flex', animation: 'ticker 30s linear infinite', width: 'max-content' }}>
          {[...Array(2)].map((_, rep) => (
            ['HRV MONITORING', 'SLEEP TRACKING', 'AI WEEKLY REPORTS', 'COACH DASHBOARD', 'ATHLETE ACCOUNTABILITY', 'FROM $2,499/YR — BANDS INCLUDED', 'BUILT FOR HIGH SCHOOL', 'ANY SPORT · ANY PROGRAM', 'FOUNDING PRICING AVAILABLE', 'LAUNCHING SUMMER 2026'].map((item, i) => (
              <div key={`${rep}-${i}`} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, color: '#888898', padding: '0 32px', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#F26419', flexShrink: 0 }} />
                {item}
              </div>
            ))
          ))}
        </div>
      </div>

      {/* STATS */}
      <section style={{ padding: '80px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 5, color: '#F26419', marginBottom: 12 }}>THE RESEARCH</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px,6vw,72px)', lineHeight: 1, color: '#F2F2F5', marginBottom: 8 }}>
            THE SCIENCE IS <span style={{ color: '#F26419' }}>REAL.</span>
          </div>
          <div style={{ fontSize: 15, color: '#888898', maxWidth: 500 }}>Every data point sourced from peer-reviewed research. Transparent by design.</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
          {[
            { stat: '1.7×', desc: 'Athletes averaging 8+ hours of sleep experience 1.7× fewer injuries than peers averaging less.', source: 'Milewski et al. — Clinical Journal of Sports Medicine, 2014', color: '#2ECC8A' },
            { stat: '5%', desc: 'Sprint speed improved 5% through sleep optimization alone — with no changes to the training program.', source: 'Mah et al. — Stanford Sleep Lab, 2011', color: '#F5B820' },
            { stat: '82%', desc: 'Individualized HRV-guided training produced 82% fewer overtraining incidents vs. fixed-load protocols.', source: 'Flatt & Nakamura — IJSPP, 2018', color: '#7C6FE0' },
            { stat: '78%', desc: 'Daily HRV monitoring predicts athlete readiness with 78% accuracy — outperforming subjective wellness scores.', source: 'Buchheit — European Journal of Applied Physiology, 2014', color: '#F26419' },
            { stat: '9h', desc: 'The AAP recommends 8–10 hours of sleep for adolescent athletes. 4Ward makes sleep a measurable coaching variable.', source: 'American Academy of Pediatrics, 2016', color: '#818CF8' },
            { stat: '12%', desc: 'HRV-guided periodization delivers 12% greater performance gains vs. traditional fixed-load programming.', source: 'Flatt & Nakamura — IJSPP, 2018', color: '#2ECC8A' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0D0D0F', border: '1px solid #1A1A1E', borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${item.color},transparent)` }} />
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, color: item.color, lineHeight: 1, marginBottom: 10 }}>{item.stat}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 15, color: '#F2F2F5', lineHeight: 1.5, marginBottom: 12 }}>{item.desc}</div>
              <div style={{ fontSize: 10, color: '#444450', letterSpacing: 0.5 }}>{item.source}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <Link href="/science" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 2, color: '#F26419', textDecoration: 'none', borderBottom: '1px solid rgba(242,100,25,0.3)', paddingBottom: 2 }}>VIEW THE FULL RESEARCH BREAKDOWN →</Link>
        </div>
      </section>

      {/* FORMULA */}
      <section style={{ background: '#0D0D0F', borderTop: '1px solid #1A1A1E', borderBottom: '1px solid #1A1A1E', padding: '80px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 5, color: '#F26419', marginBottom: 12 }}>THE FORMULA · TRANSPARENT BY DESIGN</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px,6vw,72px)', lineHeight: 1, color: '#F2F2F5', marginBottom: 8 }}>
              THE <span style={{ color: '#F26419' }}>4WARD</span> RECOVERY INDEX
            </div>
            <div style={{ fontSize: 15, color: '#888898', maxWidth: 500 }}>Three validated inputs. One readiness score. Recalculated every morning before your athletes walk in.</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg,#0D0D0F,#13131A)', border: '1px solid #242428', borderRadius: 20, padding: 40, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(242,100,25,0.1),transparent)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {[
                { weight: '×0.45', name: 'HRV SCORE', detail: 'Today vs. 7-day personal baseline · Flatt & Nakamura, 2018', barW: '80%', barC: '#7C6FE0', val: 89 },
                { weight: '×0.40', name: 'SLEEP SCORE', detail: 'Duration + consistency · Mah et al. / AAP', barW: '60%', barC: '#818CF8', val: 60 },
                { weight: '×0.15', name: 'RESTING HR SCORE', detail: 'Today vs. 7-day personal baseline · Foster et al., 1996', barW: '90%', barC: '#2ECC8A', val: 92 },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: '#F26419', width: 52, textAlign: 'right', flexShrink: 0 }}>{row.weight}</div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #242428', borderRadius: 8, padding: '10px 16px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, color: '#F2F2F5', letterSpacing: 1 }}>{row.name}</div>
                      <div style={{ fontSize: 11, color: '#888898', marginTop: 2 }}>{row.detail}</div>
                      <div style={{ height: 3, background: '#1A1A1E', borderRadius: 2, marginTop: 8 }}>
                        <div style={{ height: '100%', width: row.barW, background: row.barC, borderRadius: 2 }} />
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: row.barC, flexShrink: 0 }}>{row.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 24, borderTop: '1px solid #1A1A1E', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: '#888898', letterSpacing: 2 }}>FINAL SCORE →</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 60, color: '#F5B820', lineHeight: 1 }}>78</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { label: '85–100 OPTIMAL', bg: 'rgba(46,204,138,0.12)', color: '#2ECC8A' },
                  { label: '70–84 MODERATE', bg: 'rgba(245,184,32,0.12)', color: '#F5B820' },
                  { label: '50–69 ELEVATED LOAD', bg: 'rgba(251,146,60,0.12)', color: '#FB923C' },
                  { label: '0–49 RECOVERY DAY', bg: 'rgba(124,111,224,0.12)', color: '#7C6FE0' },
                ].map((z, i) => (
                  <div key={i} style={{ padding: '6px 14px', borderRadius: 20, background: z.bg, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 1, color: z.color }}>{z.label}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{ padding: '80px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 5, color: '#F26419', marginBottom: 12 }}>POSITIONING</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px,6vw,72px)', lineHeight: 1, color: '#F2F2F5', marginBottom: 8 }}>
            BUILT FOR <span style={{ color: '#F26419' }}>YOUR PROGRAM.</span>
          </div>
          <div style={{ fontSize: 15, color: '#888898', maxWidth: 500 }}>The same data elite programs pay $15,000+ a year for. Built for high school athletics.</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg,#0A0A0E,#0E0E14)', borderRadius: 24, padding: '48px 40px', border: '1px solid #1A1A1E', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#F26419,transparent)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 32, alignItems: 'center', marginBottom: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#888898', marginBottom: 8, paddingBottom: 12, borderBottom: '2px solid #1A1A1E' }}>ENTERPRISE PLATFORMS</div>
              {['$15,000–$50,000/year', 'Designed for college and pro programs', 'Requires dedicated IT support', 'No high school pricing tier', 'Hardware sold separately'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 15, color: '#444450' }}>
                  <span>—</span> {item}
                </div>
              ))}
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: '#F26419', textAlign: 'center', opacity: 0.5 }}>VS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#F26419', marginBottom: 8, paddingBottom: 12, borderBottom: '2px solid rgba(242,100,25,0.3)' }}>4WARD</div>
              {['From $2,499/year — bands included', 'Built specifically for high school', 'Setup in under 30 minutes', 'Any sport. Any program.', 'Athletes keep their bands.'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 15, color: '#F2F2F5' }}>
                  <span style={{ color: '#2ECC8A' }}>✓</span> {item}
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: 28, background: 'rgba(242,100,25,0.07)', borderRadius: 16, border: '1px solid rgba(242,100,25,0.18)' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 4, color: '#F26419', marginBottom: 16 }}>THE VALUE COMPARISON</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
              {[
                { amount: '$50,000', period: 'Enterprise / year', color: '#444450', strike: true },
                { amount: '→', period: '', color: '#888898', plain: true },
                { amount: '$2,499', period: '4Ward / year — bands included', color: '#F26419' },
                { amount: '=', period: '', color: '#888898', plain: true },
                { amount: '$83', period: 'per athlete / year', color: '#2ECC8A' },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: item.plain ? 32 : 48, color: item.color, lineHeight: 1, textDecoration: item.strike ? 'line-through' : 'none', opacity: item.strike ? 0.4 : 1 }}>{item.amount}</div>
                  {item.period && <div style={{ fontSize: 12, color: '#888898', marginTop: 4 }}>{item.period}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BAND */}
      <section style={{ background: '#0D0D0F', borderTop: '1px solid #1A1A1E', padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ width: 160, height: 160, margin: '0 auto 32px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {[160, 120, 80].map((size, i) => (
              <div key={i} style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', border: '1px solid rgba(242,100,25,0.2)', animation: `ringPulse 3s ease-in-out ${i * 0.5}s infinite` }} />
            ))}
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%,#222226,#0D0D0F)', border: '2px solid rgba(242,100,25,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(242,100,25,0.2)', position: 'relative', zIndex: 1 }}>
              <Logo size={16} />
            </div>
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px,6vw,52px)', color: '#F2F2F5', marginBottom: 8 }}>THE <span style={{ color: '#F26419' }}>4WARD BAND</span></div>
          <div style={{ fontSize: 15, color: '#888898', lineHeight: 1.75, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>24-hour HRV and sleep monitoring. Worn daily. Athletes keep it when they graduate. One program price — bands included for your entire roster.</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {['24HR HRV', 'SLEEP STAGES', 'SpO2', 'BLE 5.2', 'LONG BATTERY LIFE', 'FIND MY BAND', 'WHITE LABEL READY', 'ATHLETES KEEP IT'].map((spec, i) => (
              <div key={i} style={{ padding: '8px 16px', background: '#1A1A1E', border: '1px solid #242428', borderRadius: 20, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: '#B0B0C0', letterSpacing: 1 }}>{spec}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ background: 'linear-gradient(135deg,rgba(242,100,25,0.1),rgba(242,100,25,0.04))', borderTop: '1px solid rgba(242,100,25,0.2)', padding: '80px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(242,100,25,0.07),transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px,10vw,100px)', lineHeight: 0.9, color: '#F2F2F5', marginBottom: 20 }}>
            MOVE<br /><span style={{ color: '#F26419' }}>FORWARD.</span>
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 300, fontSize: 18, color: '#888898', letterSpacing: 4, marginBottom: 40 }}>LAUNCHING SUMMER 2026 · ANY SPORT · ANY PROGRAM</div>
          <button onClick={openModal} style={{
            padding: '18px 52px', border: 'none', borderRadius: 6, cursor: 'pointer',
            background: 'linear-gradient(135deg,#F26419,#C44E0F)', color: 'white',
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: 2,
            boxShadow: '0 0 60px rgba(242,100,25,0.4)'
          }}>JOIN THE WAITLIST</button>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 32, flexWrap: 'wrap' }}>
            {['@4WardPerformance', 'TikTok · Instagram · X'].map((h, i) => (
              <div key={i} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, color: '#F26419', letterSpacing: 1, padding: '8px 20px', border: '1px solid rgba(242,100,25,0.3)', borderRadius: 4 }}>{h}</div>
            ))}
          </div>
          <div style={{ marginTop: 48, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.1)', letterSpacing: 2 }}>BUILT BY A STRENGTH COACH · FOR STRENGTH COACHES</div>
        </div>
      </section>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes ringPulse { 0%,100% { opacity:0.3; transform:scale(1); } 50% { opacity:0.6; transform:scale(1.05); } }
        .hero-logo-wrap { display:inline-flex; align-items:center; line-height:0.9; letter-spacing:4px; font-family:'Bebas Neue',sans-serif; font-size:clamp(80px,18vw,180px); }
        .hero-logo-text { line-height:0.9; }
      `}</style>
    </>
  )
}
