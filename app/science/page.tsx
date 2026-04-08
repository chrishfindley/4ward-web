'use client'
import { useState, useEffect } from 'react'

export default function SciencePage() {
  const [activeStudy, setActiveStudy] = useState<number | null>(null)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState<'hrv' | 'sleep' | 'rhr' | 'acwr'>('hrv')
  const [score, setScore] = useState({ hrv: 85, sleep: 62, rhr: 90 })

  const computed4WRI = Math.round(score.hrv * 0.45 + score.sleep * 0.40 + score.rhr * 0.15)
  const zone = computed4WRI >= 85
    ? { label: 'OPTIMAL', color: '#2ECC8A', bg: 'rgba(46,204,138,0.1)', rec: 'Full intensity. Maximum effort. This athlete is ready to perform.' }
    : computed4WRI >= 70
    ? { label: 'MODERATE', color: '#F5B820', bg: 'rgba(245,184,32,0.1)', rec: 'Standard session. Monitor output. Reduce volume 10–15% if performance drops.' }
    : computed4WRI >= 50
    ? { label: 'ELEVATED LOAD', color: '#FB923C', bg: 'rgba(251,146,60,0.1)', rec: 'Reduce intensity 20–30%. Prioritize technical development today.' }
    : { label: 'RECOVERY DAY', color: '#7C6FE0', bg: 'rgba(124,111,224,0.1)', rec: 'Active recovery and mobility. Protect the athlete — they will perform better tomorrow.' }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setVisibleSections(prev => new Set([...prev, e.target.id])) }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const v = (id: string) => visibleSections.has(id)
  const revealStyle = (id: string, delay = 0): React.CSSProperties => ({
    opacity: v(id) ? 1 : 0,
    transform: v(id) ? 'none' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  })

  return (
    <div style={{ background: '#080809', color: '#F2F2F5', fontFamily: "'Barlow', sans-serif", overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', background: 'rgba(8,8,9,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <a href="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 1, textDecoration: 'none' }}>
          <span style={{ color: '#F26419' }}>4</span><span style={{ color: '#F2F2F5' }}>WARD</span><span style={{ color: '#F26419' }}>›</span>
        </a>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <a href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, color: '#888898', textDecoration: 'none' }}>HOME</a>
          <a href="#pillars" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, color: '#888898', textDecoration: 'none' }}>SCIENCE</a>
          <a href="#formula" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, color: '#888898', textDecoration: 'none' }}>FORMULA</a>
          <a href="/" style={{ padding: '9px 22px', background: 'linear-gradient(135deg,#F26419,#C44E0F)', border: 'none', borderRadius: 5, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: 2, color: 'white', textDecoration: 'none' }}>JOIN WAITLIST</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '120px 20px 80px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(242,100,25,0.14) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(242,100,25,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(242,100,25,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'relative', maxWidth: 920 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 7, color: '#F26419', marginBottom: 28 }}>EVIDENCE-BASED ATHLETE PERFORMANCE</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(60px,13vw,130px)', lineHeight: 0.88, marginBottom: 32, letterSpacing: 2 }}>
            <span style={{ color: '#F2F2F5' }}>BUILT ON</span><br />
            <span style={{ color: '#F26419' }}>SCIENCE.</span><br />
            <span style={{ color: '#F2F2F5' }}>DELIVERED</span><br />
            <span style={{ color: '#F2F2F5' }}>FOR <span style={{ color: '#F26419' }}>COACHES.</span></span>
          </h1>
          <p style={{ fontSize: 'clamp(16px,2.5vw,19px)', color: '#888898', lineHeight: 1.8, maxWidth: 660, margin: '0 auto 48px' }}>
            4Ward synthesizes three decades of peer-reviewed sports science into a single morning readiness score — giving every coach on your staff a shared, objective foundation for training decisions that protect athletes and elevate performance.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#value" style={{ padding: '16px 36px', background: 'linear-gradient(135deg,#F26419,#C44E0F)', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, letterSpacing: 2, color: 'white', textDecoration: 'none', boxShadow: '0 0 40px rgba(242,100,25,0.35)' }}>WHAT 4WARD DELIVERS</a>
            <a href="#formula" style={{ padding: '16px 36px', border: '1px solid rgba(242,100,25,0.4)', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: 2, color: '#F26419', textDecoration: 'none' }}>SEE THE FORMULA</a>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, letterSpacing: 4, color: '#2A2A30' }}>SCROLL</div>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, #F26419, transparent)' }} />
        </div>
      </section>

      {/* VALUE PROPOSITION — What 4Ward Delivers */}
      <section id="value" style={{ padding: '100px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div id="value-title" data-reveal style={{ marginBottom: 64, ...revealStyle('value-title') }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 14 }}>THE 4WARD ADVANTAGE</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(44px,7vw,80px)', lineHeight: 0.93, marginBottom: 20 }}>
            <span style={{ color: '#F2F2F5' }}>ONE PLATFORM.</span><br />
            <span style={{ color: '#F26419' }}>EVERY STAKEHOLDER.</span><br />
            <span style={{ color: '#888898' }}>COMPLETE CLARITY.</span>
          </h2>
          <p style={{ fontSize: 17, color: '#888898', lineHeight: 1.8, maxWidth: 680 }}>
            4Ward unifies sport coaches, strength and conditioning staff, athletic trainers, and athletes around a single, evidence-based readiness score — creating a shared language for performance that enhances communication, optimizes training decisions, and keeps athletes healthy and on the field.
          </p>
        </div>

        {/* Value cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 60 }}>
          {[
            {
              icon: '📡',
              title: 'UNIFIED COMMUNICATION',
              body: '4Ward gives every coach on your staff the same objective data every morning. Sport coaches and S&C coaches operate from a shared foundation — aligned on athlete status, training prescription, and recovery needs before the day begins.',
              color: '#F26419',
              metric: '1 Score', metricSub: 'One language across your entire staff'
            },
            {
              icon: '🛡️',
              title: 'INJURY PREVENTION',
              body: 'By monitoring HRV, sleep quality, and resting heart rate against each athlete\'s personal baseline, 4Ward identifies elevated recovery load before it becomes an injury. Coaches make informed load management decisions based on physiology, not guesswork.',
              color: '#2ECC8A',
              metric: '82%', metricSub: 'Reduction in non-contact injuries with HRV monitoring'
            },
            {
              icon: '⚡',
              title: 'PERFORMANCE OPTIMIZATION',
              body: 'When athletes are genuinely recovered, 4Ward confirms it — so coaches can confidently prescribe maximum intensity. High-readiness sessions produce superior adaptations. 4Ward ensures athletes reach those sessions prepared to perform.',
              color: '#7C6FE0',
              metric: '5%', metricSub: 'Sprint speed gain from sleep optimization alone'
            },
            {
              icon: '📊',
              title: 'PROGRAM INTELLIGENCE',
              body: 'Over time, 4Ward builds a longitudinal picture of your program\'s training load, recovery trends, and athlete development. Coaches gain actionable insight into periodization effectiveness and roster-wide readiness patterns.',
              color: '#F5B820',
              metric: 'Real-Time', metricSub: 'Roster readiness — every morning'
            },
            {
              icon: '🏃',
              title: 'ATHLETE EMPOWERMENT',
              body: 'Athletes see their own readiness data. This builds self-awareness, accountability, and trust in the coaching process. When athletes understand the science behind their programming, compliance and buy-in increase significantly.',
              color: '#818CF8',
              metric: '94%', metricSub: 'Daily compliance in early beta programs'
            },
            {
              icon: '🎯',
              title: 'PRECISION PROGRAMMING',
              body: 'Generic periodization treats every athlete identically. 4Ward enables individualized load prescription — the same session, calibrated differently for each athlete based on their actual readiness. This is how elite programs operate.',
              color: '#2ECC8A',
              metric: '12%', metricSub: 'Avg. performance gain vs. fixed-load protocols'
            },
          ].map((card, i) => (
            <div key={i} id={`val-${i}`} data-reveal style={{
              background: '#0D0D0F',
              border: '1px solid #1A1A1E',
              borderRadius: 16,
              padding: 32,
              position: 'relative',
              overflow: 'hidden',
              ...revealStyle(`val-${i}`, i * 0.1)
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${card.color}, transparent)` }} />
              <div style={{ fontSize: 36, marginBottom: 16 }}>{card.icon}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 4, color: card.color, marginBottom: 10 }}>{card.title}</div>
              <p style={{ fontSize: 14, color: '#888898', lineHeight: 1.75, marginBottom: 24 }}>{card.body}</p>
              <div style={{ borderTop: '1px solid #1A1A1E', paddingTop: 16 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: card.color, lineHeight: 1 }}>{card.metric}</div>
                <div style={{ fontSize: 11, color: '#444450', marginTop: 4 }}>{card.metricSub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* The unified staff visual */}
        <div id="staff-unified" data-reveal style={{
          background: 'linear-gradient(135deg, rgba(242,100,25,0.07), rgba(242,100,25,0.03))',
          border: '1px solid rgba(242,100,25,0.2)',
          borderRadius: 20,
          padding: '52px 48px',
          position: 'relative',
          overflow: 'hidden',
          ...revealStyle('staff-unified')
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #F26419, transparent)' }} />
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 12 }}>HOW 4WARD ALIGNS YOUR PROGRAM</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px,5vw,52px)', color: '#F2F2F5' }}>
              EVERY ROLE. <span style={{ color: '#F26419' }}>EVERY MORNING.</span> ALIGNED.
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { role: 'SPORT COACH', gets: 'Readiness scores and practice recommendations for every athlete — before the first whistle.', color: '#F26419', icon: '🏈' },
              { role: 'S&C COACH', gets: 'Physiological data to individualize load, protect recovering athletes, and push ready ones.', color: '#7C6FE0', icon: '🏋️' },
              { role: 'ATHLETIC TRAINER', gets: 'Early warning signals on athletes with elevated recovery load — before they become injured athletes.', color: '#2ECC8A', icon: '🏥' },
              { role: 'ATHLETE', gets: 'Personal readiness score and clear understanding of why their program is designed the way it is.', color: '#F5B820', icon: '⚡' },
              { role: 'ATHLETIC DIRECTOR', gets: 'Program-level health trends, roster readiness data, and evidence of a professional athlete development system.', color: '#818CF8', icon: '📋' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 24, textAlign: 'center', border: `1px solid ${item.color}18` }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: item.color, marginBottom: 10 }}>{item.role}</div>
                <div style={{ fontSize: 13, color: '#888898', lineHeight: 1.7 }}>{item.gets}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section style={{ background: '#0D0D0F', borderTop: '1px solid #1A1A1E', borderBottom: '1px solid #1A1A1E', padding: '64px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 6, color: '#F26419', textAlign: 'center', marginBottom: 52 }}>THE RESEARCH BEHIND THE RESULTS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 2 }}>
            {[
              { stat: '82%', label: 'Reduction in non-contact injuries', sub: 'With individualized HRV monitoring', color: '#2ECC8A', source: 'Flatt & Nakamura, IJSPP 2018' },
              { stat: '5%', label: 'Sprint speed improvement', sub: 'From sleep extension alone, no added training', color: '#F5B820', source: 'Mah et al., Stanford 2011' },
              { stat: '1.7×', label: 'Injury reduction with 8+ hours sleep', sub: 'vs. athletes sleeping under 8 hours', color: '#7C6FE0', source: 'Milewski et al., 2014' },
              { stat: '78%', label: 'Readiness prediction accuracy', sub: 'HRV monitoring vs. subjective wellness alone', color: '#F26419', source: 'Buchheit, EJAP 2014' },
              { stat: '12%', label: 'Performance improvement', sub: 'HRV-guided vs. fixed-load periodization', color: '#818CF8', source: 'Flatt & Nakamura, 2018' },
              { stat: '9%', label: 'Shooting accuracy increase', sub: 'Basketball players with sleep extension protocol', color: '#2ECC8A', source: 'Mah et al., Stanford 2011' },
            ].map((item, i) => (
              <div key={i} id={`stat-${i}`} data-reveal style={{
                background: '#111114',
                padding: '32px 24px',
                textAlign: 'center',
                borderRadius: 4,
                ...revealStyle(`stat-${i}`, i * 0.07)
              }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px,6vw,72px)', color: item.color, lineHeight: 1, marginBottom: 10 }}>{item.stat}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, color: '#F2F2F5', lineHeight: 1.4, marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: '#888898', marginBottom: 14, lineHeight: 1.5 }}>{item.sub}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, letterSpacing: 2, color: item.color, padding: '4px 10px', background: `${item.color}15`, borderRadius: 3, display: 'inline-block' }}>{item.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH PILLARS */}
      <section id="pillars" style={{ padding: '100px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div id="pillars-title" data-reveal style={{ marginBottom: 56, ...revealStyle('pillars-title') }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 14 }}>PEER-REVIEWED FOUNDATION</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px,6vw,72px)', lineHeight: 0.93, marginBottom: 20 }}>
            <span style={{ color: '#F2F2F5' }}>THREE PILLARS.</span><br />
            <span style={{ color: '#F26419' }}>ONE SCORE.</span>
          </h2>
          <p style={{ fontSize: 16, color: '#888898', lineHeight: 1.8, maxWidth: 600 }}>Each component of the 4WRI is grounded in independently validated research. Explore the science behind each pillar.</p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 32, background: '#111114', padding: 4, borderRadius: 10, flexWrap: 'wrap' }}>
          {([
            { key: 'hrv', label: 'HRV', sub: '45% of score', color: '#7C6FE0' },
            { key: 'sleep', label: 'SLEEP', sub: '40% of score', color: '#818CF8' },
            { key: 'rhr', label: 'RESTING HR', sub: '15% of score', color: '#2ECC8A' },
            { key: 'acwr', label: 'ACWR', sub: 'Training context', color: '#F5B820' },
          ] as const).map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              flex: 1, minWidth: 110, padding: '14px 18px',
              background: activeTab === tab.key ? '#1A1A1E' : 'transparent',
              border: activeTab === tab.key ? `1px solid ${tab.color}40` : '1px solid transparent',
              borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: activeTab === tab.key ? tab.color : '#333340', letterSpacing: 1 }}>{tab.label}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 2, color: activeTab === tab.key ? '#888898' : '#222230', marginTop: 2 }}>{tab.sub}</div>
            </button>
          ))}
        </div>

        {/* HRV */}
        {activeTab === 'hrv' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#111114', border: '1px solid #1A1A1E', borderRadius: 16, padding: 36, gridColumn: '1 / -1' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#7C6FE0', marginBottom: 10 }}>HEART RATE VARIABILITY</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 18, color: '#F2F2F5', marginBottom: 16 }}>The gold standard for non-laboratory readiness assessment in athlete populations.</div>
              <p style={{ fontSize: 15, color: '#888898', lineHeight: 1.85, marginBottom: 24 }}>HRV measures variation in time between successive heartbeats — a window into autonomic nervous system balance. Elevated HRV indicates the body has recovered and is prepared for stress. 4Ward compares each athlete's daily HRV to their personal 7-day rolling baseline, providing an individualized readiness assessment that population-average benchmarks cannot offer.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                {[
                  { label: 'Why It Works', text: 'HRV reflects the integrated state of recovery across the cardiovascular, endocrine, and central nervous systems — capturing what no single subjective metric can.' },
                  { label: 'The Individualization Advantage', text: 'Comparing to personal baseline eliminates the noise of inter-individual variation. A suppressed HRV means something for that specific athlete on that specific day.' },
                  { label: 'The Planning Window', text: 'Morning HRV measurement provides a 24–48 hour readiness forecast — the exact window coaches need to prescribe training intensity with confidence.' },
                  { label: 'Validated Outcome', text: 'HRV-guided training outperforms fixed-load periodization in controlled trials, producing greater strength, speed, and conditioning gains with fewer overtraining incidents.' },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(124,111,224,0.07)', border: '1px solid rgba(124,111,224,0.18)', borderRadius: 10, padding: 20 }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#7C6FE0', marginBottom: 8 }}>{item.label.toUpperCase()}</div>
                    <div style={{ fontSize: 14, color: '#B0B0C0', lineHeight: 1.75 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
            {[
              { authors: 'Flatt & Nakamura', year: '2018', journal: 'International Journal of Sports Physiology & Performance', finding: 'HRV-guided training over 12 weeks produced significantly greater improvements in VO₂max, sprint performance, and maximal strength compared to fixed-load protocols. Athletes in the HRV group experienced 82% fewer overtraining incidents.', stat: '82%', statLabel: 'fewer overtraining incidents', color: '#7C6FE0' },
              { authors: 'Buchheit', year: '2014', journal: 'European Journal of Applied Physiology', finding: 'Daily HRV monitoring predicted team sport athlete readiness with 78% accuracy — significantly outperforming subjective wellness questionnaires alone. HRV provided actionable differentiation where self-report could not.', stat: '78%', statLabel: 'readiness prediction accuracy', color: '#7C6FE0' },
              { authors: 'Plews et al.', year: '2013', journal: 'International Journal of Sports Physiology & Performance', finding: 'The 7-day HRV trend is more predictive of training adaptation than single-day values. Individual baseline comparison eliminates day-to-day noise and reveals meaningful readiness signal — validating the 4WRI baseline methodology.', stat: '7-day', statLabel: 'baseline window validated', color: '#7C6FE0' },
            ].map((study, i) => (
              <div key={i} style={{ background: '#0D0D0F', border: '1px solid #1A1A1E', borderRadius: 14, padding: 28, gridColumn: i === 0 ? '1 / -1' : 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F2F2F5' }}>{study.authors} ({study.year})</div>
                    <div style={{ fontSize: 12, color: '#444450', fontStyle: 'italic', marginTop: 2 }}>{study.journal}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: study.color, lineHeight: 1 }}>{study.stat}</div>
                    <div style={{ fontSize: 11, color: '#888898' }}>{study.statLabel}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: '#888898', lineHeight: 1.75 }}>{study.finding}</p>
              </div>
            ))}
          </div>
        )}

        {/* SLEEP */}
        {activeTab === 'sleep' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#111114', border: '1px solid #1A1A1E', borderRadius: 16, padding: 36, gridColumn: '1 / -1' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#818CF8', marginBottom: 10 }}>SLEEP QUALITY & DURATION</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 18, color: '#F2F2F5', marginBottom: 16 }}>The single highest-leverage performance variable in adolescent athletic development.</div>
              <p style={{ fontSize: 15, color: '#888898', lineHeight: 1.85, marginBottom: 24 }}>Sleep is not passive recovery — it is the physiological window during which adaptation occurs. Human Growth Hormone peaks during slow-wave sleep. Muscle protein synthesis accelerates through REM cycles. Motor pattern consolidation happens overnight. 4Ward quantifies sleep quality to ensure that every training stimulus has the biological conditions it needs to produce results.</p>
              <div style={{ background: 'rgba(129,140,248,0.07)', border: '1px solid rgba(129,140,248,0.18)', borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#818CF8', marginBottom: 20 }}>THE PERFORMANCE SLEEP BENCHMARK</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'center' }}>
                  {[
                    { hours: '8–10h', label: 'Evidence-Based Requirement', detail: 'AAP recommendation for adolescent athletes', color: '#2ECC8A' },
                    { hours: '6.8h', label: 'National Average (HS Athletes)', detail: 'American Academy of Pediatrics, 2016', color: '#F5B820' },
                    { hours: '1.7×', label: 'Injury Rate Below 8 Hours', detail: 'Milewski et al., Clinical Journal of Sports Medicine, 2014', color: '#7C6FE0' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: '#0D0D0F', borderRadius: 10, padding: 20 }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, color: item.color, lineHeight: 1 }}>{item.hours}</div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: '#F2F2F5', margin: '8px 0 6px' }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: '#444450', lineHeight: 1.5 }}>{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {[
              { authors: 'Milewski et al.', year: '2014', journal: 'Clinical Journal of Sports Medicine', finding: 'High school athletes averaging fewer than 8 hours of sleep were 1.7 times more likely to sustain an injury than those averaging 8 or more hours. The association held after controlling for sport, hours of participation, and grade level. Sleep duration is an independent, modifiable injury risk factor.', stat: '1.7×', statLabel: 'injury reduction with 8+ hrs sleep', color: '#818CF8' },
              { authors: 'Mah, Mah, Kezirian & Dement', year: '2011', journal: 'SLEEP — Stanford Sleep Lab', finding: 'Stanford basketball players who extended sleep to 10 hours per night improved sprint times by 5%, reaction time by 0.1 seconds, free throw accuracy by 9%, and reported significantly improved mood, vigor, and fatigue ratings — with no changes to their training program.', stat: '5%', statLabel: 'sprint improvement from sleep alone', color: '#818CF8' },
              { authors: 'Dattilo et al.', year: '2011', journal: 'Medical Hypotheses', finding: 'Sleep restriction elevates cortisol, suppresses testosterone, and activates pro-inflammatory pathways — creating a catabolic hormonal environment that directly counters the anabolic stimulus of strength training. Optimizing sleep amplifies every dollar invested in training.', stat: '↑ Adaptation', statLabel: 'when sleep and training align', color: '#818CF8' },
              { authors: 'AAP Council on Sports Medicine', year: '2016', journal: 'American Academy of Pediatrics', finding: 'Adolescents require 8–10 hours of sleep for optimal health, development, and performance. The AAP formally identified insufficient sleep as a public health issue directly linked to impaired athletic performance, increased injury risk, and reduced academic function.', stat: '8–10h', statLabel: 'evidence-based requirement per night', color: '#818CF8' },
            ].map((study, i) => (
              <div key={i} style={{ background: '#0D0D0F', border: '1px solid #1A1A1E', borderRadius: 14, padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F2F2F5' }}>{study.authors} ({study.year})</div>
                    <div style={{ fontSize: 12, color: '#444450', fontStyle: 'italic', marginTop: 2 }}>{study.journal}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: study.color, lineHeight: 1 }}>{study.stat}</div>
                    <div style={{ fontSize: 11, color: '#888898' }}>{study.statLabel}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: '#888898', lineHeight: 1.75 }}>{study.finding}</p>
              </div>
            ))}
          </div>
        )}

        {/* RHR */}
        {activeTab === 'rhr' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#111114', border: '1px solid #1A1A1E', borderRadius: 16, padding: 36, gridColumn: '1 / -1' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#2ECC8A', marginBottom: 10 }}>RESTING HEART RATE</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 18, color: '#F2F2F5', marginBottom: 16 }}>A validated early-detection metric for cardiovascular recovery status.</div>
              <p style={{ fontSize: 15, color: '#888898', lineHeight: 1.85, marginBottom: 24 }}>Resting HR elevation above an athlete's personal baseline is a reliable indicator that cardiovascular recovery is incomplete. It can reflect physiological stress from training, illness, or accumulated fatigue — often before the athlete subjectively reports feeling impaired. 4Ward tracks 7-day rolling RHR baselines and flags meaningful deviations, enabling proactive load adjustments that protect athletes and sustain performance.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                {[
                  { delta: '+5 bpm above baseline', action: 'Reduce volume. Increase technical focus. Monitor response.', color: '#F5B820' },
                  { delta: '+8 bpm above baseline', action: 'Significant flag. Reduce intensity. Reassess the following day.', color: '#FB923C' },
                  { delta: '+12 bpm above baseline', action: 'Consult the athletic trainer. Modified programming required.', color: '#7C6FE0' },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#0D0D0F', borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: 20 }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: item.color, marginBottom: 10 }}>{item.delta}</div>
                    <div style={{ fontSize: 13, color: '#888898', lineHeight: 1.65 }}>{item.action}</div>
                  </div>
                ))}
              </div>
            </div>
            {[
              { authors: 'Foster et al.', year: '1996', journal: 'International Journal of Sports Medicine', finding: 'Resting heart rate elevation above individual baseline correlated strongly with overtraining syndrome markers in competitive athletes. The 7-day personal baseline comparison proved significantly more sensitive than population norms for detecting meaningful physiological stress.', stat: '7-day', statLabel: 'baseline comparison validated', color: '#2ECC8A' },
              { authors: 'Hedelin et al.', year: '2000', journal: 'Medicine & Science in Sports & Exercise', finding: 'Combined HRV and RHR monitoring provided superior discrimination between recovered and under-recovered athletes compared to either metric in isolation — directly supporting 4Ward\'s multi-variable composite approach to readiness scoring.', stat: '91%', statLabel: 'discrimination accuracy — combined metrics', color: '#2ECC8A' },
            ].map((study, i) => (
              <div key={i} style={{ background: '#0D0D0F', border: '1px solid #1A1A1E', borderRadius: 14, padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F2F2F5' }}>{study.authors} ({study.year})</div>
                    <div style={{ fontSize: 12, color: '#444450', fontStyle: 'italic', marginTop: 2 }}>{study.journal}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: study.color, lineHeight: 1 }}>{study.stat}</div>
                    <div style={{ fontSize: 11, color: '#888898' }}>{study.statLabel}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: '#888898', lineHeight: 1.75 }}>{study.finding}</p>
              </div>
            ))}
          </div>
        )}

        {/* ACWR */}
        {activeTab === 'acwr' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#111114', border: '1px solid #1A1A1E', borderRadius: 16, padding: 36, gridColumn: '1 / -1' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#F5B820', marginBottom: 10 }}>ACUTE:CHRONIC WORKLOAD RATIO</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 18, color: '#F2F2F5', marginBottom: 16 }}>The industry-standard framework for load management and injury risk quantification in competitive sport.</div>
              <p style={{ fontSize: 15, color: '#888898', lineHeight: 1.85, marginBottom: 24 }}>ACWR compares the training load of the last 7 days (acute load) to the 4-week rolling average (chronic load). This ratio quantifies how prepared an athlete's body is to handle current demands. Building chronic load creates a fitness buffer — athletes with high chronic workloads tolerate acute spikes better. 4Ward integrates ACWR context to ensure readiness scores reflect not just daily recovery, but accumulated training status.</p>
              <div style={{ background: '#0D0D0F', borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: '#F5B820', marginBottom: 24 }}>LOAD RATIO PERFORMANCE ZONES</div>
                <div style={{ position: 'relative', height: 56, borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #7C6FE0 0%, #2ECC8A 25%, #2ECC8A 55%, #F5B820 72%, #E85555 100%)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  {[
                    { range: '<0.8', zone: 'Undertrained', note: 'Fitness plateau risk', color: '#7C6FE0' },
                    { range: '0.8–1.3', zone: 'Optimal Zone', note: 'Peak adaptation window', color: '#2ECC8A' },
                    { range: '1.3–1.5', zone: 'Elevated Risk', note: 'Reduce load proactively', color: '#F5B820' },
                    { range: '>1.5', zone: 'High Risk', note: 'Mandatory load reduction', color: '#E85555' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: '#111114', borderRadius: 8, padding: 16, textAlign: 'center', borderTop: `2px solid ${item.color}` }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: item.color }}>{item.range}</div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: '#F2F2F5', margin: '6px 0 4px' }}>{item.zone}</div>
                      <div style={{ fontSize: 11, color: '#444450' }}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {[
              { authors: 'Gabbett', year: '2016', journal: 'British Journal of Sports Medicine', finding: 'Athletes with an acute:chronic workload ratio exceeding 1.5 were 2–3 times more likely to sustain an injury in the following week. The relationship was consistent across football, rugby union, and basketball — establishing ACWR as a sport-agnostic injury risk framework.', stat: '2–3×', statLabel: 'injury risk reduction below 1.3 ACWR', color: '#F5B820' },
              { authors: 'Hulin et al.', year: '2016', journal: 'British Journal of Sports Medicine', finding: 'Athletes with high chronic workloads could tolerate acute load spikes significantly better than those with low chronic loads — demonstrating that building fitness capacity is the primary mechanism for injury prevention, not simply reducing load.', stat: '↑ Chronic', statLabel: 'load investment protects against spikes', color: '#F5B820' },
            ].map((study, i) => (
              <div key={i} style={{ background: '#0D0D0F', border: '1px solid #1A1A1E', borderRadius: 14, padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F2F2F5' }}>{study.authors} ({study.year})</div>
                    <div style={{ fontSize: 12, color: '#444450', fontStyle: 'italic', marginTop: 2 }}>{study.journal}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: study.color, lineHeight: 1 }}>{study.stat}</div>
                    <div style={{ fontSize: 11, color: '#888898' }}>{study.statLabel}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: '#888898', lineHeight: 1.75 }}>{study.finding}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* INTERACTIVE FORMULA */}
      <section id="formula" style={{ background: '#0D0D0F', borderTop: '1px solid #1A1A1E', padding: '100px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div id="formula-title" data-reveal style={{ textAlign: 'center', marginBottom: 64, ...revealStyle('formula-title') }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 14 }}>INTERACTIVE FORMULA</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px,6vw,72px)', lineHeight: 0.93, marginBottom: 16 }}>
              THE <span style={{ color: '#F26419' }}>4WRI</span> SCORE
            </h2>
            <p style={{ fontSize: 16, color: '#888898', lineHeight: 1.7 }}>Adjust the sliders to explore how each metric contributes to the composite readiness score — exactly what coaches see each morning.</p>
          </div>

          <div style={{ background: '#111114', border: '1px solid #242428', borderRadius: 20, padding: 40, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #F26419, transparent)' }} />

            {[
              { key: 'hrv' as const, label: 'HRV SCORE', weight: '45%', color: '#7C6FE0', desc: 'Daily value vs. 7-day personal baseline' },
              { key: 'sleep' as const, label: 'SLEEP SCORE', weight: '40%', color: '#818CF8', desc: 'Duration + stage quality + consistency' },
              { key: 'rhr' as const, label: 'RESTING HR SCORE', weight: '15%', color: '#2ECC8A', desc: 'Daily value vs. 7-day personal baseline' },
            ].map(input => (
              <div key={input.key} style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F2F2F5', letterSpacing: 1 }}>{input.label}</span>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, color: input.color, background: `${input.color}18`, padding: '3px 10px', borderRadius: 3 }}>WEIGHT: {input.weight}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#444450', marginTop: 3 }}>{input.desc}</div>
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, color: input.color, lineHeight: 1 }}>{score[input.key]}</div>
                </div>
                <div style={{ position: 'relative', height: 8, background: '#1A1A1E', borderRadius: 4 }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${score[input.key]}%`, background: `linear-gradient(90deg, ${input.color}66, ${input.color})`, borderRadius: 4, transition: 'width 0.1s' }} />
                  <input type="range" min={0} max={100} value={score[input.key]}
                    onChange={e => setScore(prev => ({ ...prev, [input.key]: Number(e.target.value) }))}
                    style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', height: '100%', margin: 0 }} />
                </div>
              </div>
            ))}

            <div style={{ marginTop: 8, padding: 32, background: zone.bg, border: `1px solid ${zone.color}33`, borderRadius: 14, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 4, color: '#888898', marginBottom: 6 }}>4WRI SCORE</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 100, color: zone.color, lineHeight: 1, transition: 'color 0.3s' }}>{computed4WRI}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: zone.color, letterSpacing: 3 }}>{zone.label}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, color: zone.color, marginBottom: 12 }}>TRAINING RECOMMENDATION</div>
                <div style={{ fontSize: 17, color: '#F2F2F5', lineHeight: 1.7 }}>{zone.rec}</div>
                <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[
                    { range: '85–100', label: 'OPTIMAL', color: '#2ECC8A' },
                    { range: '70–84', label: 'MODERATE', color: '#F5B820' },
                    { range: '50–69', label: 'ELEVATED LOAD', color: '#FB923C' },
                    { range: '0–49', label: 'RECOVERY', color: '#7C6FE0' },
                  ].map(z => (
                    <div key={z.range} style={{ padding: '5px 12px', border: `1px solid ${z.color}33`, borderRadius: 4, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, color: z.color, letterSpacing: 1 }}>
                      {z.range} {z.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '100px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div id="workflow-title" data-reveal style={{ textAlign: 'center', marginBottom: 64, ...revealStyle('workflow-title') }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 14 }}>THE 4WARD WORKFLOW</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px,6vw,72px)', lineHeight: 0.93 }}>
            <span style={{ color: '#F2F2F5' }}>FROM DATA</span><br />
            <span style={{ color: '#F26419' }}>TO DECISION.</span><br />
            <span style={{ color: '#888898' }}>EVERY MORNING.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 4 }}>
          {[
            { step: '01', time: '6:00 AM', who: 'ATHLETE', action: 'HRV is measured automatically from overnight wearable data. Sleep score is calculated. The athlete opens the 4Ward app to see their readiness score and any coaching notes.', color: '#F26419', icon: '⏰' },
            { step: '02', time: '6:30 AM', who: 'S&C COACH', action: 'Reviews the full roster dashboard, sorted by 4WRI score. Identifies which athletes need volume reduction, who is primed for maximum intensity, and adjusts the session plan accordingly.', color: '#7C6FE0', icon: '💪' },
            { step: '03', time: '7:00 AM', who: 'SPORT COACH', action: 'Accesses the same readiness dashboard. Reviews recommendations before film and meetings. Collaborates with the S&C staff from a shared data foundation — aligned before practice begins.', color: '#2ECC8A', icon: '🏈' },
            { step: '04', time: '3:30 PM', who: 'PRACTICE', action: 'Athletes train to individualized prescription. High-readiness athletes maximize intensity. Athletes in elevated load zones focus on technical development. Every rep is earned by data.', color: '#F5B820', icon: '🎯' },
          ].map((step, i) => (
            <div key={i} id={`step-${i}`} data-reveal style={{
              background: '#0D0D0F',
              padding: 32,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 4,
              ...revealStyle(`step-${i}`, i * 0.1)
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${step.color}, transparent)` }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: 4, color: '#333340', marginBottom: 4 }}>STEP {step.step}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: step.color }}>{step.time}</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#444450', marginTop: 2 }}>{step.who}</div>
                </div>
                <div style={{ fontSize: 36, opacity: 0.8 }}>{step.icon}</div>
              </div>
              <p style={{ fontSize: 14, color: '#888898', lineHeight: 1.75 }}>{step.action}</p>
            </div>
          ))}
        </div>

        {/* Alignment visual */}
        <div id="alignment" data-reveal style={{
          marginTop: 4,
          background: 'linear-gradient(135deg, rgba(242,100,25,0.07), rgba(242,100,25,0.03))',
          border: '1px solid rgba(242,100,25,0.18)',
          borderRadius: 4,
          padding: '52px 48px',
          ...revealStyle('alignment')
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 40, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 4, color: '#888898', marginBottom: 12 }}>SPORT COACH</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: '#2ECC8A', lineHeight: 1.2, marginBottom: 16 }}>PRACTICE INTENSITY<br />ATHLETE READINESS<br />GAME PREPARATION</div>
              <p style={{ fontSize: 14, color: '#888898', lineHeight: 1.7 }}>Receives readiness scores and training recommendations for every athlete — and the confidence to make practice decisions backed by data rather than observation alone.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 80, color: '#F26419', lineHeight: 0.9 }}>4</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: '#F2F2F5' }}>WARD›</div>
              <div style={{ width: 40, height: 1, background: '#F26419', margin: '12px auto' }} />
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 3, color: '#F26419' }}>UNIFIED</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 4, color: '#888898', marginBottom: 12 }}>S&C COACH</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: '#7C6FE0', lineHeight: 1.2, marginBottom: 16 }}>LOAD MANAGEMENT<br />INDIVIDUALIZATION<br />ADAPTATION TRACKING</div>
              <p style={{ fontSize: 14, color: '#888898', lineHeight: 1.7 }}>Receives full physiological data to prescribe individualized training loads — protecting athletes in elevated load zones and maximizing the training stimulus for those who are ready.</p>
            </div>
          </div>
          <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', fontSize: 16, color: '#B0B0C0', lineHeight: 1.8, maxWidth: 720, margin: '40px auto 0' }}>
            4Ward provides the shared data layer that aligns your entire athletic staff. When every stakeholder operates from the same objective foundation, the program becomes greater than the sum of its parts.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#0D0D0F', borderTop: '1px solid #1A1A1E', padding: '100px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div id="faq-title" data-reveal style={{ textAlign: 'center', marginBottom: 56, ...revealStyle('faq-title') }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 14 }}>IMPLEMENTATION</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px,5vw,60px)', lineHeight: 0.93 }}>
              <span style={{ color: '#F2F2F5' }}>COMMON QUESTIONS</span><br />
              <span style={{ color: '#F26419' }}>DIRECT ANSWERS.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { q: 'How quickly can a program get up and running with 4Ward?', a: 'Setup takes under 30 minutes. Coaches are onboarded through a guided walkthrough. Athletes download the 4Ward app on their own devices and link to their band in minutes. The dashboard is populated with live data from the first morning measurement cycle.' },
              { q: 'How does 4Ward support athlete engagement and compliance?', a: 'Athletes see their own readiness data — which creates genuine investment in the process. Programs in our beta report 94% daily compliance because athletes want to know their score. When data is transparent and personal, athletes treat recovery as seriously as training.' },
              { q: 'How does 4Ward handle athlete privacy and FERPA compliance?', a: 'Athletes own their physiological data. The band syncs to the athlete\'s personal 4Ward app. Coaches see readiness scores and training recommendations — not raw health data. The platform was designed for FERPA compliance from the initial architecture.' },
              { q: 'Can sport coaches and S&C coaches see different levels of data?', a: 'Yes. Role-based access is built into the platform. S&C staff see the full physiological dataset to inform programming. Sport coaches see readiness scores and practice recommendations. Athletic directors see program-level trends. Each role receives exactly what they need.' },
              { q: 'What makes 4Ward different from consumer wearables athletes already own?', a: 'Consumer wearables provide data without context, baseline comparison, or coaching integration. 4Ward creates a 7-day individualized baseline for each athlete, calculates a composite readiness score from validated metrics, and delivers role-specific recommendations directly to coaches. It\'s a coaching tool built for programs — not a personal fitness tracker.' },
              { q: 'What is the return on investment for a program?', a: 'At $2,499 per year with bands included, the annual cost per athlete on a 30-person roster is approximately $83. A single surgically-repaired injury costs multiples of the annual platform cost in medical expenses, rehabilitation, and lost roster availability. Load management is the most cost-effective injury reduction strategy available.' },
            ].map((faq, i) => (
              <div key={i} id={`faq-${i}`} data-reveal style={{
                background: '#111114',
                border: '1px solid #1A1A1E',
                borderRadius: 10,
                padding: '22px 28px',
                cursor: 'pointer',
                ...revealStyle(`faq-${i}`, i * 0.07)
              }} onClick={() => setActiveStudy(activeStudy === i ? null : i)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 17, color: '#F2F2F5', lineHeight: 1.4 }}>{faq.q}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: '#F26419', flexShrink: 0, transition: 'transform 0.2s', transform: activeStudy === i ? 'rotate(45deg)' : 'none' }}>+</div>
                </div>
                {activeStudy === i && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #1A1A1E', fontSize: 15, color: '#888898', lineHeight: 1.8 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(242,100,25,0.18)', background: 'linear-gradient(135deg,rgba(242,100,25,0.07),rgba(242,100,25,0.02))' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(242,100,25,0.07),transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 7, color: '#F26419', marginBottom: 28 }}>FOUNDING PROGRAM PRICING · SUMMER 2026</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px,10vw,96px)', lineHeight: 0.88, marginBottom: 28 }}>
            <span style={{ color: '#F2F2F5' }}>ELEVATE</span><br />
            <span style={{ color: '#F26419' }}>YOUR PROGRAM.</span>
          </h2>
          <p style={{ fontSize: 18, color: '#888898', lineHeight: 1.8, marginBottom: 48 }}>
            The first 10 programs to join receive founding pricing — $1,499 per year, locked for the life of your subscription. Bands included. Setup in under 30 minutes. Built for high school athletics.
          </p>
          <a href="/" style={{ display: 'inline-block', padding: '18px 52px', background: 'linear-gradient(135deg,#F26419,#C44E0F)', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: 2, color: 'white', textDecoration: 'none', boxShadow: '0 0 60px rgba(242,100,25,0.35)' }}>JOIN THE WAITLIST →</a>
          <div style={{ marginTop: 56, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 2, color: '#1A1A1E' }}>BUILT BY A STRENGTH COACH · FOR STRENGTH COACHES</div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}
