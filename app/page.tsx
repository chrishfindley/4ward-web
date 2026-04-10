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
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', school_name: '', sports: '', role: 'coach' })

  const openModal = () => { setModalOpen(true); setMenuOpen(false); setSuccess(false); setError('') }
  const closeModal = () => { setModalOpen(false); setError(''); setSuccess(false) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return }
      setSuccess(true)
      setForm({ first_name: '', last_name: '', email: '', school_name: '', sports: '', role: 'coach' })
    } catch { setError('Connection error. Please try again.') } finally { setLoading(false) }
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 14px', background: '#0C0C0E', border: '1px solid #242428', borderRadius: 6, color: '#F2F2F5', fontFamily: "'Barlow', sans-serif", fontSize: 15, outline: 'none', boxSizing: 'border-box' }
  const labelStyle: React.CSSProperties = { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, color: '#555560', display: 'block', marginBottom: 6 }

  return (
    <>
      {/* MODAL */}
      {modalOpen && (
        <div onClick={(e) => { if (e.target === e.currentTarget) closeModal() }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '16px', backdropFilter: 'blur(8px)', overflowY: 'auto' }}>
          <div style={{ background: '#0D0D0F', border: '1px solid #242428', borderRadius: 12, padding: 'clamp(24px,5vw,40px) clamp(20px,5vw,36px)', maxWidth: 460, width: '100%', position: 'relative', margin: 'auto' }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', color: '#555560', fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>×</button>
            {success ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: '#F26419', marginBottom: 12 }}>YOU'RE IN.</div>
                <div style={{ fontSize: 15, color: '#888898', lineHeight: 1.8 }}>We'll reach out before launch. You're among the first coaches to join 4Ward.<br /><br />— Chris</div>
              </div>
            ) : (
              <>
                <Logo size={24} style={{ marginBottom: 20 }} />
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(22px,5vw,28px)', color: '#F2F2F5', marginBottom: 6 }}>BECOME A FOUNDING TEAM</div>
                <div style={{ fontSize: 14, color: '#555560', marginBottom: 28, lineHeight: 1.7 }}>We are selecting a small number of programs to partner with before launch. Founding teams lock in founding pricing — permanently.</div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="form-row-2">
                    {[{ label: 'FIRST NAME', key: 'first_name', placeholder: 'Chris' }, { label: 'LAST NAME', key: 'last_name', placeholder: 'Smith' }].map(f => (
                      <div key={f.key}><label style={labelStyle}>{f.label}</label><input required placeholder={f.placeholder} value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={inputStyle} /></div>
                    ))}
                  </div>
                  {[{ label: 'EMAIL', key: 'email', placeholder: 'coach@school.edu', type: 'email' }, { label: 'SCHOOL', key: 'school_name', placeholder: 'Keller High School' }].map(f => (
                    <div key={f.key}><label style={labelStyle}>{f.label}</label><input required type={f.type || 'text'} placeholder={f.placeholder} value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={inputStyle} /></div>
                  ))}
                  <div className="form-row-2">
                    <div><label style={labelStyle}>SPORT(S)</label><input placeholder="Football, Track..." value={form.sports} onChange={e => setForm({ ...form, sports: e.target.value })} style={inputStyle} /></div>
                    <div><label style={labelStyle}>YOUR ROLE</label><select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ ...inputStyle, appearance: 'none' }}><option value="coach">Head Coach</option><option value="sc">S&C Coach</option><option value="assistant">Assistant Coach</option><option value="ad">Athletic Director</option><option value="trainer">Athletic Trainer</option></select></div>
                  </div>
                  {error && <div style={{ fontSize: 13, color: '#E85555', padding: 10, background: 'rgba(232,85,85,0.08)', borderRadius: 6, textAlign: 'center' }}>{error}</div>}
                  <button type="submit" disabled={loading} style={{ padding: '15px 0', background: loading ? '#1A1A1E' : '#F26419', color: 'white', border: 'none', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, letterSpacing: 2, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}>{loading ? 'SUBMITTING...' : 'BECOME A FOUNDING TEAM →'}</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,8,9,0.98)', zIndex: 99, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
          <Link href="/science" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#555560', textDecoration: 'none', letterSpacing: 3 }}>SEE THE SCIENCE</Link>
          <Link href="/story" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#555560', textDecoration: 'none', letterSpacing: 3 }}>OUR STORY</Link>
          <button onClick={openModal} style={{ padding: '16px 48px', borderRadius: 4, border: '2px solid #F26419', cursor: 'pointer', background: 'transparent', color: '#F26419', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, letterSpacing: 3 }}>FOUNDING TEAMS</button>
        </div>
      )}

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px clamp(16px,4vw,36px)', background: 'rgba(8,8,9,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #111114' }}>
        <Logo size={26} />
        <div className="nav-desktop">
          <Link href="/science" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, color: '#555560', textDecoration: 'none', marginRight: 32 }}>SEE THE SCIENCE</Link>
          <Link href="/story" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, color: '#555560', textDecoration: 'none', marginRight: 32 }}>OUR STORY</Link>
          <button onClick={openModal} style={{ padding: '9px 24px', borderRadius: 4, border: '1px solid #F26419', cursor: 'pointer', background: 'transparent', color: '#F26419', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 12, letterSpacing: 3 }}>FOUNDING TEAMS</button>
        </div>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={menuOpen ? 'ham-line ham-top open' : 'ham-line ham-top'} />
          <span className={menuOpen ? 'ham-line ham-mid open' : 'ham-line ham-mid'} />
          <span className={menuOpen ? 'ham-line ham-bot open' : 'ham-line ham-bot'} />
        </button>
      </nav>