'use client'
import { useState } from 'react'

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
      {modalOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="modal-box">
            <button className="modal-close" onClick={closeModal}>×</button>
            {success ? (
              <div className="form-success">
                <div className="form-success-icon">🏈</div>
                <div className="form-success-title">YOU'RE IN.</div>
                <div className="form-success-sub">
                  We'll be in touch before launch. You're one of the first coaches to know about 4Ward.
                  <br /><br />
                  — Chris
                </div>
              </div>
            ) : (
              <>
                <div className="modal-logo"><span>4</span>WARD›</div>
                <div className="modal-title">Join the Waitlist</div>
                <div className="modal-sub">
                  Launching summer 2026. First 10 programs get founding pricing — $1,499/year locked forever. Tell us about your program.
                </div>
                <form className="modal-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">FIRST NAME</label>
                      <input className="form-input" placeholder="Chris" required value={form.first_name}
                        onChange={e => setForm({...form, first_name: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">LAST NAME</label>
                      <input className="form-input" placeholder="Smith" required value={form.last_name}
                        onChange={e => setForm({...form, last_name: e.target.value})} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">EMAIL</label>
                    <input className="form-input" type="email" placeholder="coach@school.edu" required value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">SCHOOL NAME</label>
                    <input className="form-input" placeholder="Keller High School" required value={form.school_name}
                      onChange={e => setForm({...form, school_name: e.target.value})} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">SPORT(S)</label>
                      <input className="form-input" placeholder="Football, Basketball..." value={form.sports}
                        onChange={e => setForm({...form, sports: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">YOUR ROLE</label>
                      <select className="form-select" value={form.role}
                        onChange={e => setForm({...form, role: e.target.value})}>
                        <option value="coach">Head Coach</option>
                        <option value="sc">S&C Coach</option>
                        <option value="assistant">Assistant Coach</option>
                        <option value="ad">Athletic Director</option>
                        <option value="trainer">Athletic Trainer</option>
                      </select>
                    </div>
                  </div>
                  {error && <div className="form-error">{error}</div>}
                  <button className="form-submit" type="submit" disabled={loading}>
                    {loading ? 'SUBMITTING...' : 'JOIN THE WAITLIST →'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <div dangerouslySetInnerHTML={{ __html: marketingHTML(openModal) }} />

      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('click', function(e) {
          if (e.target.matches('.open-waitlist') || e.target.closest('.open-waitlist')) {
            window.__openWaitlist && window.__openWaitlist();
          }
        });
      `}} />
    </>
  )
}

function marketingHTML(openModal: () => void) {
  if (typeof window !== 'undefined') {
    (window as any).__openWaitlist = openModal
  }
  return MARKETING_HTML
}

const MARKETING_HTML = `
<style>
:root{--o:#F26419;--od:#C44E0F;--o2:#FF7A30;--bk:#080809;--dk:#0D0D0F;--sf:#141416;--cd:#1A1A1E;--br:#242428;--wh:#F2F2F5;--gr:#888898;--gl:#B0B0C0;--gn:#2ECC8A;--rd:#E85555;--yl:#F5B820;--pu:#7C6FE0;--bl:#2563EB}
nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:16px 24px;background:rgba(8,8,9,0.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.05)}
.nav-logo{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:1px}
.nav-logo .four{color:var(--o)}.nav-logo .ward{color:var(--wh)}.nav-logo .chev{color:var(--o)}
.nav-cta{padding:9px 22px;border-radius:5px;border:none;cursor:pointer;background:linear-gradient(135deg,var(--o),var(--od));color:white;font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:13px;letter-spacing:2px;box-shadow:0 0 20px rgba(242,100,25,0.3)}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:40px 20px}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(242,100,25,0.18) 0%,transparent 70%),radial-gradient(ellipse 60% 40% at 80% 100%,rgba(242,100,25,0.08) 0%,transparent 60%)}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(242,100,25,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(242,100,25,0.04) 1px,transparent 1px);background-size:60px 60px}
.hero-content{position:relative;z-index:2;text-align:center;max-width:900px}
.hero-eyebrow{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:6px;color:var(--o);margin-bottom:24px;opacity:0;animation:fadeUp .6s ease .2s forwards}
.hero-logo{font-family:'Bebas Neue',sans-serif;font-size:clamp(80px,18vw,180px);line-height:.9;letter-spacing:4px;opacity:0;animation:fadeUp .7s ease .3s forwards}
.hero-logo .four{color:var(--o)}.hero-logo .ward{color:var(--wh)}.hero-logo .chev{color:var(--o);display:inline-block;transform:scaleX(0.6);margin-left:-8px}
.hero-sub{font-family:'Barlow Condensed',sans-serif;font-weight:300;font-size:clamp(16px,3vw,22px);color:var(--gl);letter-spacing:3px;margin-top:12px;opacity:0;animation:fadeUp .7s ease .5s forwards}
.hero-tagline{font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,7vw,72px);color:var(--wh);line-height:1;margin-top:40px;opacity:0;animation:fadeUp .7s ease .7s forwards}
.hero-tagline em{color:var(--o);font-style:normal}
.hero-desc{font-size:clamp(14px,2.5vw,17px);color:var(--gr);line-height:1.7;max-width:600px;margin:24px auto 0;opacity:0;animation:fadeUp .7s ease .9s forwards}
.hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:40px;opacity:0;animation:fadeUp .7s ease 1.1s forwards}
.btn-fire{padding:16px 40px;border-radius:6px;border:none;cursor:pointer;background:linear-gradient(135deg,var(--o),var(--od));color:white;font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:16px;letter-spacing:2px;box-shadow:0 0 40px rgba(242,100,25,0.4),0 4px 20px rgba(0,0,0,0.4);transition:all .25s}
.btn-fire:hover{transform:translateY(-2px);box-shadow:0 0 60px rgba(242,100,25,0.6),0 8px 30px rgba(0,0,0,0.4)}
.btn-ghost-fire{padding:16px 40px;border-radius:6px;border:1px solid rgba(242,100,25,0.4);cursor:pointer;background:transparent;color:var(--o);font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:16px;letter-spacing:2px;transition:all .25s}
.btn-ghost-fire:hover{background:rgba(242,100,25,0.1);border-color:var(--o)}
.section{padding:80px 20px;max-width:1100px;margin:0 auto}
.section-label{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:11px;letter-spacing:5px;color:var(--o);margin-bottom:12px}
.section-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,6vw,72px);line-height:1;color:var(--wh);margin-bottom:8px}
.section-title span{color:var(--o)}
.section-sub{font-size:15px;color:var(--gr);margin-bottom:48px;max-width:500px}
.posts-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
.post-card{border-radius:16px;overflow:hidden;position:relative;cursor:pointer;transition:transform .3s ease,box-shadow .3s ease;aspect-ratio:1;display:flex;flex-direction:column;justify-content:flex-end}
.post-card:hover{transform:translateY(-6px) scale(1.01)}
.post-1{background:#06060A;box-shadow:0 8px 40px rgba(0,0,0,0.6)}.post-1:hover{box-shadow:0 20px 60px rgba(242,100,25,0.25)}
.post-1-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px}
.post-1-num{font-family:'Bebas Neue',sans-serif;font-size:130px;line-height:.85;color:white;letter-spacing:-4px;position:relative}
.post-1-num::after{content:'';position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);width:60%;height:3px;background:var(--o)}
.post-1-label{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:3px;color:var(--gr);margin-top:20px;text-align:center}
.post-1-label strong{color:var(--o)}
.post-1-source{font-size:10px;color:rgba(255,255,255,0.3);margin-top:16px;letter-spacing:1px}
.post-1-logo{position:absolute;top:20px;right:20px;font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:1px}
.post-2{background:linear-gradient(145deg,#0A0A12,#12121E);border:1px solid var(--br);box-shadow:0 8px 40px rgba(0,0,0,0.5)}
.post-2:hover{box-shadow:0 20px 60px rgba(124,111,224,0.2);border-color:rgba(124,111,224,0.3)}
.post-2-content{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;padding:28px}
.post-2-q{font-family:'Bebas Neue',sans-serif;font-size:42px;line-height:1.05;color:var(--wh)}
.post-2-q em{color:var(--o);font-style:normal}
.post-2-icon{font-size:64px;text-align:center;margin:10px 0}
.post-2-answer{background:rgba(242,100,25,0.1);border-left:3px solid var(--o);border-radius:4px;padding:12px 14px;font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:15px;color:var(--gl);line-height:1.5}
.post-3{background:#050508;box-shadow:0 8px 40px rgba(0,0,0,0.6);border:1px solid var(--br)}
.post-3:hover{box-shadow:0 20px 60px rgba(46,204,138,0.15);border-color:rgba(46,204,138,0.2)}
.post-3-content{position:absolute;inset:0;padding:28px;display:flex;flex-direction:column;justify-content:space-between}
.post-3-header{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:11px;letter-spacing:4px;color:var(--gn)}
.post-3-title{font-family:'Bebas Neue',sans-serif;font-size:34px;line-height:1.05;color:var(--wh);margin-top:4px}
.post-3-rules{display:flex;flex-direction:column;gap:10px;flex:1;justify-content:center}
.post-3-rule{display:flex;align-items:flex-start;gap:12px}
.rule-num{font-family:'Bebas Neue',sans-serif;font-size:32px;color:var(--o);line-height:1;flex-shrink:0;width:28px}
.rule-text{font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:14px;color:var(--gl);line-height:1.4;padding-top:4px}
.rule-text strong{color:var(--wh)}
.post-4{background:#040406;box-shadow:0 8px 40px rgba(242,100,25,0.15);border:1px solid rgba(242,100,25,0.15)}
.post-4:hover{box-shadow:0 20px 60px rgba(242,100,25,0.3);border-color:rgba(242,100,25,0.3)}
.post-4-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center}
.post-4-glow{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(242,100,25,0.12),transparent)}
.post-4-eyebrow{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:10px;letter-spacing:5px;color:var(--o);margin-bottom:20px;position:relative}
.post-4-logo{font-family:'Bebas Neue',sans-serif;font-size:72px;line-height:.9;letter-spacing:2px;position:relative}
.post-4-logo .four{color:var(--o)}.post-4-logo .ward{color:var(--wh)}
.post-4-question{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:18px;color:var(--gl);letter-spacing:1px;margin-top:20px;position:relative}
.post-4-sub{font-size:12px;color:var(--gr);margin-top:8px;position:relative}
.science-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-top:32px}
.sci-card{background:var(--cd);border:1px solid var(--br);border-radius:14px;padding:24px;position:relative;overflow:hidden;transition:all .3s}
.sci-card:hover{transform:translateY(-4px);border-color:var(--o)}
.sci-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--o),transparent)}
.sci-stat{font-family:'Bebas Neue',sans-serif;font-size:56px;color:var(--o);line-height:1;margin-bottom:8px}
.sci-stat-unit{font-size:22px;color:var(--gr)}
.sci-desc{font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:15px;color:var(--wh);line-height:1.5;margin-bottom:12px}
.sci-source{font-size:10px;color:var(--gr);letter-spacing:0.5px;border-top:1px solid var(--br);padding-top:10px;margin-top:10px}
.sci-source strong{color:var(--o)}
.formula-card{background:linear-gradient(135deg,#0D0D0F,#13131A);border:1px solid var(--br);border-radius:20px;padding:40px;position:relative;overflow:hidden;margin-top:32px}
.formula-card::before{content:'';position:absolute;top:-100px;right:-100px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(242,100,25,0.12),transparent)}
.formula-title{font-family:'Bebas Neue',sans-serif;font-size:48px;color:var(--wh);margin-bottom:8px}
.formula-title span{color:var(--o)}
.formula-sub{font-size:13px;color:var(--gr);margin-bottom:32px;max-width:500px}
.formula-eq{display:flex;flex-direction:column;gap:12px}
.formula-row{display:flex;align-items:center;gap:16px}
.formula-weight{font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--o);width:50px;text-align:right;flex-shrink:0}
.formula-metric{background:rgba(255,255,255,0.04);border:1px solid var(--br);border-radius:8px;padding:10px 16px;flex:1;display:flex;align-items:center;justify-content:space-between}
.formula-metric-name{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:16px;color:var(--wh);letter-spacing:1px}
.formula-metric-detail{font-size:11px;color:var(--gr)}
.formula-bar{height:3px;border-radius:2px;margin-top:8px}
.formula-result{margin-top:24px;padding-top:24px;border-top:1px solid var(--br);display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.formula-result-label{font-family:'Bebas Neue',sans-serif;font-size:16px;color:var(--gr);letter-spacing:2px}
.score-zones{display:flex;gap:8px;flex-wrap:wrap}
.zone-chip{padding:6px 14px;border-radius:20px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:1px}
.acr-card{background:var(--cd);border:1px solid var(--br);border-radius:20px;padding:36px;margin-top:20px;position:relative;overflow:hidden}
.acr-title{font-family:'Bebas Neue',sans-serif;font-size:40px;color:var(--wh);margin-bottom:4px}
.acr-title span{color:var(--o)}
.acr-sub{font-size:13px;color:var(--gr);margin-bottom:32px}
.acr-bar-wrap{position:relative;height:40px;border-radius:8px;overflow:hidden;margin-bottom:8px}
.acr-bar-fill{position:absolute;inset:0;background:linear-gradient(90deg,var(--pu) 0%,var(--gn) 30%,var(--gn) 55%,var(--yl) 72%,var(--rd) 100%)}
.acr-labels{display:flex;justify-content:space-between;margin-top:6px}
.acr-label{font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:11px;color:var(--gr)}
.acr-zones-row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:24px}
.acr-zone{background:rgba(255,255,255,0.03);border:1px solid var(--br);border-radius:10px;padding:14px 12px;text-align:center}
.acr-zone-val{font-family:'Bebas Neue',sans-serif;font-size:18px;margin-bottom:4px}
.acr-zone-name{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:10px;letter-spacing:1px;color:var(--gr)}
.compare-section{background:linear-gradient(135deg,#0A0A0E,#0E0E14);border-radius:24px;padding:48px 40px;border:1px solid var(--br);margin-top:20px;position:relative;overflow:hidden}
.compare-section::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--o),transparent)}
.compare-title{font-family:'Bebas Neue',sans-serif;font-size:48px;color:var(--wh);text-align:center;margin-bottom:8px}
.compare-title span{color:var(--o)}
.compare-sub{font-size:14px;color:var(--gr);text-align:center;margin-bottom:40px}
.compare-grid{display:grid;grid-template-columns:1fr auto 1fr;gap:20px;align-items:center}
.compare-col{display:flex;flex-direction:column;gap:10px}
.compare-header{font-family:'Bebas Neue',sans-serif;font-size:24px;margin-bottom:8px;padding-bottom:12px;border-bottom:2px solid}
.compare-item{display:flex;align-items:center;gap:8px;font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:14px;color:var(--gl)}
.compare-icon{font-size:16px;flex-shrink:0}
.vs-badge{font-family:'Bebas Neue',sans-serif;font-size:48px;color:var(--o);text-align:center;opacity:0.6}
.price-callout{text-align:center;margin-top:40px;padding:28px;background:rgba(242,100,25,0.08);border-radius:16px;border:1px solid rgba(242,100,25,0.2)}
.price-callout-label{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:4px;color:var(--o);margin-bottom:12px}
.price-nums{display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap}
.price-item{text-align:center}
.price-amount{font-family:'Bebas Neue',sans-serif;font-size:52px;line-height:1}
.price-period{font-size:12px;color:var(--gr);margin-top:2px}
.price-divider{font-family:'Bebas Neue',sans-serif;font-size:32px;color:var(--br)}
.band-section{text-align:center;padding:60px 20px;position:relative}
.band-visual{width:200px;height:200px;margin:0 auto 32px;position:relative;display:flex;align-items:center;justify-content:center}
.band-ring{position:absolute;border-radius:50%;border:1px solid rgba(242,100,25,0.2);animation:ringPulse 3s ease-in-out infinite}
.band-center{width:100px;height:100px;border-radius:50%;background:radial-gradient(circle at 40% 40%,#222226,#0D0D0F);border:2px solid rgba(242,100,25,0.5);display:flex;align-items:center;justify-content:center;box-shadow:0 0 40px rgba(242,100,25,0.25),inset 0 0 20px rgba(242,100,25,0.05);position:relative;z-index:1}
.band-logo-inner{font-family:'Bebas Neue',sans-serif;font-size:20px}
.band-logo-inner .four{color:var(--o)}.band-logo-inner .ward{color:var(--wh)}
.band-specs{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:24px}
.band-spec{padding:8px 16px;background:var(--cd);border:1px solid var(--br);border-radius:20px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;color:var(--gl);letter-spacing:1px}
.footer-cta{background:linear-gradient(135deg,rgba(242,100,25,0.1),rgba(242,100,25,0.05));border-top:1px solid rgba(242,100,25,0.2);padding:80px 20px;text-align:center;position:relative;overflow:hidden}
.footer-cta::before{content:'';position:absolute;top:-50%;left:50%;transform:translateX(-50%);width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(242,100,25,0.08),transparent)}
.footer-big{font-family:'Bebas Neue',sans-serif;font-size:clamp(48px,10vw,100px);line-height:.9;color:var(--wh);position:relative}
.footer-big span{color:var(--o)}
.footer-sub{font-family:'Barlow Condensed',sans-serif;font-weight:300;font-size:18px;color:var(--gr);letter-spacing:4px;margin-top:16px;position:relative}
.footer-handles{display:flex;justify-content:center;gap:20px;margin-top:32px;flex-wrap:wrap;position:relative}
.handle{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;color:var(--o);letter-spacing:1px;padding:8px 20px;border:1px solid rgba(242,100,25,0.3);border-radius:4px}
.ticker-wrap{overflow:hidden;border-top:1px solid var(--br);border-bottom:1px solid var(--br);padding:14px 0;background:var(--dk)}
.ticker-track{display:flex;gap:0;animation:ticker 30s linear infinite;width:max-content}
.ticker-item{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:2px;color:var(--gr);padding:0 32px;white-space:nowrap;display:flex;align-items:center;gap:12px}
.ticker-dot{width:4px;height:4px;border-radius:50%;background:var(--o);flex-shrink:0}
.reveal{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
.divider{height:1px;background:linear-gradient(90deg,transparent,var(--br),transparent);margin:20px 0}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes ringPulse{0%,100%{opacity:0.3;transform:scale(1)}50%{opacity:0.6;transform:scale(1.05)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media(max-width:600px){.compare-grid{grid-template-columns:1fr}.vs-badge{display:none}.acr-zones-row{grid-template-columns:repeat(2,1fr)}.posts-grid{grid-template-columns:1fr}.post-card{aspect-ratio:1}.formula-card{padding:24px}.compare-section{padding:32px 20px}}
</style>

<nav>
  <div class="nav-logo"><span class="four">4</span><span class="ward">WARD</span><span class="chev">›</span></div>
  <button class="nav-cta open-waitlist">JOIN WAITLIST</button>
</nav>

<div class="hero">
  <div class="hero-bg"></div>
  <div class="hero-grid"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">BUILT BY A COACH · FOR COACHES · ANY SPORT</div>
    <div class="hero-logo"><span class="four">4</span><span class="ward">WARD</span><span class="chev">›</span></div>
    <div class="hero-sub">ATHLETE PERFORMANCE PLATFORM</div>
    <div class="hero-tagline">Stop <em>guessing.</em><br/>Start <em>knowing.</em></div>
    <div class="hero-desc">The first wearable recovery platform built specifically for high school coaches. HRV. Sleep. Training load. One score. Every athlete. Every morning. Any sport.</div>
    <div class="hero-ctas">
      <button class="btn-fire open-waitlist">JOIN THE WAITLIST</button>
      <button class="btn-ghost-fire">SEE THE SCIENCE</button>
    </div>
  </div>
</div>

<div class="ticker-wrap"><div class="ticker-track" id="ticker"></div></div>

<div class="section">
  <div class="reveal">
    <div class="section-label">SOCIAL MEDIA KIT — DAY 1</div>
    <div class="section-title">FOUR POSTS.<br/><span>ONE DAY.</span></div>
    <div class="section-sub">Every post ready to publish. Science-backed. Coach talking to coaches.</div>
  </div>
  <div class="posts-grid reveal">
    <div class="post-card post-1">
      <div class="post-1-content">
        <div style="position:absolute;top:20px;left:20px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:10px;letter-spacing:3px;color:var(--o);">7AM · SCIENCE STAT</div>
        <div class="post-1-logo"><span style="color:var(--o);">4</span><span style="color:rgba(255,255,255,0.3);">WARD›</span></div>
        <div class="post-1-num">6.8</div>
        <div class="post-1-label">Average hours of sleep for a<br/><strong>high school athlete</strong><br/>Recommended: 9 hours</div>
        <div class="post-1-source">SOURCE: AMERICAN ACADEMY OF PEDIATRICS, 2016</div>
      </div>
    </div>
    <div class="post-card post-2">
      <div class="post-2-content">
        <div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:10px;letter-spacing:3px;color:var(--pu);margin-bottom:8px;">12PM · PAIN POINT</div>
          <div class="post-2-q">Do you know how your athletes <em>slept</em> last night?</div>
        </div>
        <div class="post-2-icon">😴</div>
        <div class="post-2-answer">"The lift is just the stimulus. Sleep is where the adaptation actually happens. We've been ignoring half the equation."</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:20px;"><span style="color:var(--o);">4</span><span style="color:rgba(255,255,255,0.5);">WARD›</span></div>
          <div style="font-size:10px;color:var(--gr);">📱 TALKING HEAD · 60s</div>
        </div>
      </div>
    </div>
    <div class="post-card post-3">
      <div class="post-3-content">
        <div>
          <div class="post-3-header">4PM · COACHING TIP</div>
          <div class="post-3-title">Your athlete slept 5 hours.<br/>Here's what to do.</div>
        </div>
        <div class="post-3-rules">
          <div class="post-3-rule"><div class="rule-num">1</div><div class="rule-text"><strong>Reduce intensity 20–30%.</strong> The nervous system isn't recovered.</div></div>
          <div class="post-3-rule"><div class="rule-num">2</div><div class="rule-text"><strong>Cut volume, keep quality.</strong> One heavy set beats three bad ones.</div></div>
          <div class="post-3-rule"><div class="rule-num">3</div><div class="rule-text"><strong>No max effort today.</strong> Protect the athlete.</div></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:10px;color:var(--gn);font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:2px;">SAVE THIS</div>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:18px;"><span style="color:var(--o);">4</span><span style="color:rgba(255,255,255,0.4);">WARD›</span></div>
        </div>
      </div>
    </div>
    <div class="post-card post-4">
      <div class="post-4-glow"></div>
      <div class="post-4-content">
        <div class="post-4-eyebrow">8PM · PRODUCT TEASE</div>
        <div class="post-4-logo"><div class="four">4</div><div class="ward">WARD</div></div>
        <div class="post-4-question">What if you knew exactly which athletes needed to pull back — before they walked in?</div>
        <div class="post-4-sub">We're building it. Coming summer 2026.</div>
        <div style="margin-top:20px;width:40px;height:2px;background:var(--o);border-radius:1px;"></div>
      </div>
    </div>
  </div>
</div>

<div class="divider"></div>

<div class="section">
  <div class="reveal">
    <div class="section-label">THE RESEARCH · PEER-REVIEWED</div>
    <div class="section-title">THE SCIENCE<br/><span>IS REAL.</span></div>
    <div class="section-sub">Every post cites actual research. That's what separates 4Ward from every other wearable brand online.</div>
  </div>
  <div class="science-grid">
    <div class="sci-card reveal"><div class="sci-stat">1.7<span class="sci-stat-unit">×</span></div><div class="sci-desc">Athletes sleeping under 8 hours are 1.7x more likely to be injured.</div><div class="sci-source"><strong>SOURCE:</strong> Milewski et al. Clinical Journal of Sports Medicine, 2014</div></div>
    <div class="sci-card reveal"><div class="sci-stat">5<span class="sci-stat-unit">%</span></div><div class="sci-desc">Basketball players who extended sleep to 10 hours improved sprint speed 5% with no other training changes.</div><div class="sci-source"><strong>SOURCE:</strong> Mah et al. Stanford Sleep Lab, 2011</div></div>
    <div class="sci-card reveal"><div class="sci-stat">1.3</div><div class="sci-desc">Acute:Chronic Workload Ratio above 1.3 significantly elevates injury risk. Above 1.5 is the danger zone.</div><div class="sci-source"><strong>SOURCE:</strong> Gabbett. British Journal of Sports Medicine, 2016</div></div>
    <div class="sci-card reveal"><div class="sci-stat">HRV</div><div class="sci-desc">Individualized HRV tracking compared to personal baseline is the strongest non-lab readiness marker available.</div><div class="sci-source"><strong>SOURCE:</strong> Flatt & Nakamura. IJSPP, 2018</div></div>
    <div class="sci-card reveal"><div class="sci-stat">9h</div><div class="sci-desc">The AAP recommends 8–10 hours of sleep for teenagers. The average high school athlete gets 6.8 hours.</div><div class="sci-source"><strong>SOURCE:</strong> American Academy of Pediatrics, 2016</div></div>
    <div class="sci-card reveal"><div class="sci-stat">CMJ</div><div class="sci-desc">Countermovement jump height correlates strongly with neuromuscular readiness. Video-based measurement accurate to ±1–2cm.</div><div class="sci-source"><strong>SOURCE:</strong> Balsalobre-Fernandez et al. 2015</div></div>
  </div>
</div>

<div class="divider"></div>

<div class="section">
  <div class="reveal">
    <div class="section-label">THE FORMULA · TRANSPARENT BY DESIGN</div>
    <div class="section-title">THE <span>4WARD</span><br/>RECOVERY INDEX</div>
    <div class="section-sub">Not a black box. A formula you can explain to any coach, parent, or athletic director.</div>
  </div>
  <div class="formula-card reveal">
    <div class="formula-title">4WRI <span>v1</span></div>
    <div class="formula-sub">Three peer-reviewed inputs. One readiness score. Recalculated every morning before your athletes walk in.</div>
    <div class="formula-eq">
      <div class="formula-row"><div class="formula-weight">×0.45</div><div class="formula-metric"><div><div class="formula-metric-name">HRV SCORE</div><div class="formula-metric-detail">Today vs 7-day personal baseline · Flatt & Nakamura</div><div class="formula-bar" style="background:var(--pu);width:80%;"></div></div><div style="font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--pu);">89</div></div></div>
      <div class="formula-row"><div class="formula-weight">×0.40</div><div class="formula-metric"><div><div class="formula-metric-name">SLEEP SCORE</div><div class="formula-metric-detail">Duration + consistency penalty · Mah Stanford / AAP</div><div class="formula-bar" style="background:#818CF8;width:60%;"></div></div><div style="font-family:'Bebas Neue',sans-serif;font-size:28px;color:#818CF8;">60</div></div></div>
      <div class="formula-row"><div class="formula-weight">×0.15</div><div class="formula-metric"><div><div class="formula-metric-name">RHR SCORE</div><div class="formula-metric-detail">Today vs 7-day personal baseline · Foster et al.</div><div class="formula-bar" style="background:var(--gn);width:90%;"></div></div><div style="font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--gn);">92</div></div></div>
    </div>
    <div class="formula-result">
      <div class="formula-result-label">FINAL SCORE →</div>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:52px;color:var(--yl);line-height:1;">78</div>
      <div class="score-zones">
        <div class="zone-chip" style="background:rgba(52,211,153,0.15);color:var(--gn);">85–100 OPTIMAL</div>
        <div class="zone-chip" style="background:rgba(251,191,36,0.15);color:var(--yl);">70–84 MODERATE</div>
        <div class="zone-chip" style="background:rgba(251,146,60,0.15);color:#FB923C;">50–69 ELEVATED</div>
        <div class="zone-chip" style="background:rgba(248,113,113,0.15);color:var(--rd);">&lt;50 HIGH RISK</div>
      </div>
    </div>
  </div>
</div>

<div class="divider"></div>

<div class="section">
  <div class="reveal">
    <div class="section-label">POSITIONING · MARKET GAP</div>
    <div class="section-title">BUILT FOR <span>YOU.</span><br/>NOT THEM.</div>
  </div>
  <div class="compare-section reveal">
    <div class="compare-title">4WARD <span>VS</span> THE FIELD</div>
    <div class="compare-sub">The same data elite programs pay $15,000+ a year for. Built for your budget.</div>
    <div class="compare-grid">
      <div class="compare-col">
        <div class="compare-header" style="color:var(--rd);border-color:rgba(232,85,85,0.3);">CATAPULT / TEAMWORKS</div>
        <div class="compare-item"><span class="compare-icon">❌</span> $15,000–50,000/year</div>
        <div class="compare-item"><span class="compare-icon">❌</span> Built for college/pro programs</div>
        <div class="compare-item"><span class="compare-icon">❌</span> Requires IT support to deploy</div>
        <div class="compare-item"><span class="compare-icon">❌</span> No high school pricing tier</div>
        <div class="compare-item"><span class="compare-icon">❌</span> Hardware sold separately</div>
      </div>
      <div class="vs-badge">VS</div>
      <div class="compare-col">
        <div class="compare-header" style="color:var(--o);border-color:rgba(242,100,25,0.4);">4WARD</div>
        <div class="compare-item"><span class="compare-icon">✅</span> From $2,499/year — bands included</div>
        <div class="compare-item"><span class="compare-icon">✅</span> Built specifically for high school</div>
        <div class="compare-item"><span class="compare-icon">✅</span> Set up in under 30 minutes</div>
        <div class="compare-item"><span class="compare-icon">✅</span> Any sport. Any program.</div>
        <div class="compare-item"><span class="compare-icon">✅</span> Athletes keep their bands forever</div>
      </div>
    </div>
    <div class="price-callout">
      <div class="price-callout-label">THE PRICE COMPARISON</div>
      <div class="price-nums">
        <div class="price-item"><div class="price-amount" style="color:var(--rd);text-decoration:line-through;opacity:0.5;">$50,000</div><div class="price-period">Catapult / year</div></div>
        <div class="price-divider">→</div>
        <div class="price-item"><div class="price-amount" style="color:var(--o);">$2,499</div><div class="price-period">4Ward / year (bands included)</div></div>
        <div class="price-divider">=</div>
        <div class="price-item"><div class="price-amount" style="color:var(--gn);">$208</div><div class="price-period">per athlete / year</div></div>
      </div>
    </div>
  </div>
</div>

<div class="divider"></div>

<div class="band-section reveal">
  <div class="section-label">THE HARDWARE</div>
  <div class="band-visual">
    <div class="band-ring" style="width:200px;height:200px;animation-delay:0s;"></div>
    <div class="band-ring" style="width:160px;height:160px;animation-delay:.5s;"></div>
    <div class="band-ring" style="width:120px;height:120px;animation-delay:1s;"></div>
    <div class="band-center" style="animation:float 4s ease-in-out infinite;"><div class="band-logo-inner"><span class="four">4</span><span class="ward">W›</span></div></div>
  </div>
  <div style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,6vw,56px);color:var(--wh);margin-bottom:8px;">THE <span style="color:var(--o);">4WARD BAND</span></div>
  <div style="font-size:14px;color:var(--gr);max-width:500px;margin:0 auto 24px;line-height:1.7;">Worn 24/7. Built for athletes. Silicone band, 24hr HRV + sleep monitoring. Athletes keep it when they graduate. One price — bands included.</div>
  <div class="band-specs">
    <div class="band-spec">24HR HRV</div><div class="band-spec">SLEEP STAGES</div><div class="band-spec">SPO2</div><div class="band-spec">BLE 5.2</div><div class="band-spec">LONG BATTERY</div><div class="band-spec">FIND MY BAND</div><div class="band-spec">WHITE LABEL</div><div class="band-spec">ATHLETES KEEP IT</div>
  </div>
</div>

<div class="divider"></div>

<div class="footer-cta">
  <div class="footer-big">MOVE<br/><span>FORWARD.</span></div>
  <div class="footer-sub">LAUNCHING SUMMER 2026 · ANY SPORT · ANY PROGRAM</div>
  <div style="margin-top:32px;position:relative;">
    <button class="btn-fire open-waitlist" style="font-size:18px;padding:18px 48px;">JOIN THE WAITLIST</button>
  </div>
  <div class="footer-handles">
    <div class="handle">@4WardPerformance</div>
    <div class="handle">TikTok · Instagram · X</div>
  </div>
  <div style="margin-top:40px;font-family:'Barlow Condensed',sans-serif;font-size:11px;color:rgba(255,255,255,0.15);letter-spacing:2px;">BUILT BY A STRENGTH COACH · FOR STRENGTH COACHES · FORT WORTH, TEXAS</div>
</div>

<script>
const items=["HRV MONITORING","SLEEP TRACKING","AI WEEKLY REPORTS","COACH DASHBOARD","ATHLETE ACCOUNTABILITY","FROM $2,499/YR — BANDS INCLUDED","BUILT FOR HIGH SCHOOL","ANY SPORT · ANY PROGRAM","MOVE FORWARD","FIND MY BAND","FORT WORTH, TEXAS"];
const track=document.getElementById('ticker');
if(track){const doubled=[...items,...items].map(t=>'<div class="ticker-item"><div class="ticker-dot"></div>'+t+'</div>').join('');track.innerHTML=doubled;}
const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
reveals.forEach(r=>observer.observe(r));
</script>
`
