'use client'
import { useState, useEffect, useRef } from 'react'

export default function SciencePage() {
  const [activeStudy, setActiveStudy] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState<'hrv' | 'sleep' | 'rhr' | 'acwr'>('hrv')
  const [score, setScore] = useState({ hrv: 85, sleep: 62, rhr: 90 })

  const computed4WRI = Math.round(score.hrv * 0.45 + score.sleep * 0.40 + score.rhr * 0.15)
  const zone = computed4WRI >= 85 ? { label: 'OPTIMAL', color: '#2ECC8A', bg: 'rgba(46,204,138,0.12)', rec: 'Full intensity. Max effort day. Push.' } :
               computed4WRI >= 70 ? { label: 'MODERATE', color: '#F5B820', bg: 'rgba(245,184,32,0.12)', rec: 'Normal session. Monitor output. Reduce volume 10-15% if sluggish.' } :
               computed4WRI >= 50 ? { label: 'ELEVATED RISK', color: '#FB923C', bg: 'rgba(251,146,60,0.12)', rec: 'Reduce intensity 20-30%. Technical work only. No max effort.' } :
               { label: 'HIGH RISK', color: '#E85555', bg: 'rgba(232,85,85,0.12)', rec: 'Active recovery only. Movement, mobility. Protect the athlete.' }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, e.target.id]))
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const isVisible = (id: string) => visibleSections.has(id)

  return (
    <div style={{ background: '#080809', color: '#F2F2F5', fontFamily: "'Barlow', sans-serif", overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', background: 'rgba(8,8,9,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <a href="/" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 1, textDecoration: 'none' }}>
          <span style={{ color: '#F26419' }}>4</span><span style={{ color: '#F2F2F5' }}>WARD</span><span style={{ color: '#F26419' }}>›</span>
        </a>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, color: '#888898', textDecoration: 'none' }}>HOME</a>
          <a href="#formula" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, color: '#888898', textDecoration: 'none' }}>FORMULA</a>
          <a href="#research" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2, color: '#888898', textDecoration: 'none' }}>RESEARCH</a>
          <a href="/" style={{ padding: '9px 22px', background: 'linear-gradient(135deg,#F26419,#C44E0F)', border: 'none', borderRadius: 5, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: 2, color: 'white', textDecoration: 'none', cursor: 'pointer' }}>JOIN WAITLIST</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '100px 20px 60px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(242,100,25,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(242,100,25,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(242,100,25,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'relative', maxWidth: 900 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 24 }}>THE SCIENCE BEHIND THE SCORE</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px,12vw,120px)', lineHeight: 0.9, marginBottom: 24, letterSpacing: 2 }}>
            <span style={{ color: '#F2F2F5' }}>DATA DOESN'T</span><br />
            <span style={{ color: '#F26419' }}>LIE.</span><br />
            <span style={{ color: '#F2F2F5' }}>GUESSING</span><br />
            <span style={{ color: '#888898' }}>DOES.</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px,2.5vw,20px)', color: '#888898', lineHeight: 1.7, maxWidth: 640, margin: '0 auto 40px' }}>
            Every claim on this page is backed by peer-reviewed research. This isn't wearable marketing. This is the physiology your athletes' performance depends on — and the gap between sport coaches and S&C coaches that's costing teams wins and injuring athletes.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#gap" style={{ padding: '16px 36px', background: 'linear-gradient(135deg,#F26419,#C44E0F)', border: 'none', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 16, letterSpacing: 2, color: 'white', textDecoration: 'none', boxShadow: '0 0 40px rgba(242,100,25,0.4)' }}>THE REAL PROBLEM</a>
            <a href="#formula" style={{ padding: '16px 36px', border: '1px solid rgba(242,100,25,0.4)', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: 2, color: '#F26419', textDecoration: 'none', background: 'transparent' }}>SEE THE FORMULA</a>
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, letterSpacing: 4, color: '#444450' }}>SCROLL</div>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, #F26419, transparent)' }} />
        </div>
      </section>

      {/* THE REAL PROBLEM SECTION */}
      <section id="gap" data-reveal style={{ padding: '100px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div id="gap-title" data-reveal style={{ marginBottom: 64, opacity: isVisible('gap-title') ? 1 : 0, transform: isVisible('gap-title') ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 12 }}>THE PROBLEM NO ONE TALKS ABOUT</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px,7vw,80px)', lineHeight: 0.95, marginBottom: 20 }}>
            <span style={{ color: '#F2F2F5' }}>THE SPORT COACH</span><br />
            <span style={{ color: '#888898' }}>AND THE S&C COACH</span><br />
            <span style={{ color: '#F26419' }}>AREN'T TALKING.</span>
          </h2>
          <p style={{ fontSize: 17, color: '#888898', lineHeight: 1.8, maxWidth: 680 }}>
            Every high school strength program has this problem. The sport coach wants to run practice hard. The S&C coach knows athlete #34 slept 5 hours and his HRV is in the tank. No one has the data. No one has the conversation. Someone gets hurt.
          </p>
        </div>

        {/* The Gap Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 60 }}>
          {[
            { icon: '🏈', role: 'SPORT COACH', pain: '"Why is my linebacker dragging in practice today? He was fine yesterday."', reality: 'He slept 5.5 hours, played 48 minutes Friday night, and his HRV is 23% below baseline. He is not fine.', color: '#E85555' },
            { icon: '🏋️', role: 'S&C COACH', pain: '"I programmed a max effort squat session but I have no idea which athletes actually recovered from the game."', reality: 'You\'re flying blind. Pushing an under-recovered athlete to a max effort is how you blow out a knee.', color: '#FB923C' },
            { icon: '🏥', role: 'THE ATHLETE', pain: '"I feel tired but I don\'t want to say anything. Coach will think I\'m soft."', reality: 'Culture silences symptoms. Data doesn\'t have a culture problem. The number is the number.', color: '#F26419' },
          ].map((card, i) => (
            <div key={i} id={`gap-card-${i}`} data-reveal style={{
              background: '#111114',
              border: `1px solid ${card.color}33`,
              borderRadius: 16,
              padding: 32,
              position: 'relative',
              overflow: 'hidden',
              opacity: isVisible(`gap-card-${i}`) ? 1 : 0,
              transform: isVisible(`gap-card-${i}`) ? 'none' : 'translateY(40px)',
              transition: `all 0.7s ease ${i * 0.15}s`
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${card.color}, transparent)` }} />
              <div style={{ fontSize: 40, marginBottom: 16 }}>{card.icon}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 4, color: card.color, marginBottom: 12 }}>{card.role}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 18, color: '#F2F2F5', lineHeight: 1.4, marginBottom: 16, fontStyle: 'italic' }}>"{card.pain}"</div>
              <div style={{ height: 1, background: '#1A1A1E', marginBottom: 16 }} />
              <div style={{ fontSize: 14, color: '#888898', lineHeight: 1.7 }}><span style={{ color: card.color, fontWeight: 700 }}>The reality: </span>{card.reality}</div>
            </div>
          ))}
        </div>

        {/* The Bridge */}
        <div id="bridge" data-reveal style={{
          background: 'linear-gradient(135deg, rgba(242,100,25,0.08), rgba(242,100,25,0.04))',
          border: '1px solid rgba(242,100,25,0.25)',
          borderRadius: 20,
          padding: '48px 40px',
          position: 'relative',
          overflow: 'hidden',
          opacity: isVisible('bridge') ? 1 : 0,
          transform: isVisible('bridge') ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #F26419, transparent)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 32, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 4, color: '#888898', marginBottom: 8 }}>WITHOUT 4WARD</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: '#E85555', lineHeight: 1.1 }}>ASSUMPTIONS<br />ARGUMENTS<br />INJURIES</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: '#F26419', lineHeight: 1 }}>4</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: '#F2F2F5' }}>WARD›</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 3, color: '#F26419', marginTop: 4 }}>THE BRIDGE</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 4, color: '#888898', marginBottom: 8 }}>WITH 4WARD</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: '#2ECC8A', lineHeight: 1.1 }}>ONE NUMBER<br />ONE LANGUAGE<br />ONE TEAM</div>
            </div>
          </div>
          <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 16, color: '#888898', lineHeight: 1.8, textAlign: 'center', maxWidth: 700, margin: '32px auto 0' }}>
            4Ward gives both coaches the same number every morning. The sport coach doesn't have to guess. The S&C coach doesn't have to argue. The athlete doesn't have to hide. Everyone moves forward from the same starting line.
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section style={{ background: '#0D0D0F', borderTop: '1px solid #1A1A1E', borderBottom: '1px solid #1A1A1E', padding: '60px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 6, color: '#F26419', textAlign: 'center', marginBottom: 48 }}>THE NUMBERS THAT DEMAND ACTION</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
            {[
              { stat: '6.8h', label: 'Average sleep for a high school athlete', sub: 'Recommended: 9 hours', color: '#E85555', source: 'AAP 2016' },
              { stat: '1.7×', label: 'More likely to be injured sleeping <8hrs', sub: 'vs. well-rested peers', color: '#FB923C', source: 'Milewski et al. 2014' },
              { stat: '5%', label: 'Sprint speed increase from sleep extension alone', sub: 'No other training changes', color: '#F5B820', source: 'Mah et al. Stanford 2011' },
              { stat: '68%', label: 'Of coaches report not tracking athlete readiness', sub: 'Before each session', color: '#7C6FE0', source: 'NSCA Survey 2019' },
              { stat: '3×', label: 'Higher injury rate during fixture congestion', sub: 'Without load management', color: '#F26419', source: 'Gabbett BJSports 2016' },
              { stat: '82%', label: 'Reduction in non-contact injuries with HRV monitoring', sub: 'Individualized vs. group protocols', color: '#2ECC8A', source: 'Flatt & Nakamura IJSPP 2018' },
            ].map((item, i) => (
              <div key={i} id={`stat-${i}`} data-reveal style={{
                background: '#111114',
                padding: '32px 24px',
                textAlign: 'center',
                borderRadius: 4,
                opacity: isVisible(`stat-${i}`) ? 1 : 0,
                transform: isVisible(`stat-${i}`) ? 'none' : 'translateY(20px)',
                transition: `all 0.6s ease ${i * 0.08}s`,
                cursor: 'default'
              }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px,6vw,72px)', color: item.color, lineHeight: 1, marginBottom: 12 }}>{item.stat}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, color: '#F2F2F5', lineHeight: 1.4, marginBottom: 8 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: '#888898', marginBottom: 12 }}>{item.sub}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, letterSpacing: 2, color: item.color, padding: '4px 10px', background: `${item.color}18`, borderRadius: 3, display: 'inline-block' }}>{item.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH DEEP DIVE */}
      <section id="research" style={{ padding: '100px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div id="research-title" data-reveal style={{ marginBottom: 64, opacity: isVisible('research-title') ? 1 : 0, transform: isVisible('research-title') ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 12 }}>PEER-REVIEWED RESEARCH</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px,6vw,72px)', lineHeight: 0.95, marginBottom: 20 }}>
            <span style={{ color: '#F2F2F5' }}>THE THREE PILLARS</span><br />
            <span style={{ color: '#F26419' }}>OF READINESS</span>
          </h2>
          <p style={{ fontSize: 16, color: '#888898', lineHeight: 1.8, maxWidth: 600 }}>Click each pillar to see the full research breakdown.</p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 32, background: '#111114', padding: 4, borderRadius: 10, flexWrap: 'wrap' }}>
          {([
            { key: 'hrv', label: 'HRV', sub: '45% weight', color: '#7C6FE0' },
            { key: 'sleep', label: 'SLEEP', sub: '40% weight', color: '#818CF8' },
            { key: 'rhr', label: 'RESTING HR', sub: '15% weight', color: '#2ECC8A' },
            { key: 'acwr', label: 'ACWR', sub: 'Context', color: '#F5B820' },
          ] as const).map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              flex: 1,
              minWidth: 120,
              padding: '14px 20px',
              background: activeTab === tab.key ? '#1A1A1E' : 'transparent',
              border: activeTab === tab.key ? `1px solid ${tab.color}44` : '1px solid transparent',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: activeTab === tab.key ? tab.color : '#444450', letterSpacing: 1 }}>{tab.label}</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 2, color: activeTab === tab.key ? '#888898' : '#2A2A30', marginTop: 2 }}>{tab.sub}</div>
            </button>
          ))}
        </div>

        {/* HRV Panel */}
        {activeTab === 'hrv' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#111114', border: '1px solid #242428', borderRadius: 16, padding: 36, gridColumn: '1 / -1' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#7C6FE0', marginBottom: 8 }}>HEART RATE VARIABILITY</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 18, color: '#F2F2F5', marginBottom: 16 }}>The single most powerful non-lab readiness marker available to coaches.</div>
              <p style={{ fontSize: 15, color: '#888898', lineHeight: 1.8, marginBottom: 20 }}>HRV measures the variation in time between consecutive heartbeats. A higher HRV indicates the autonomic nervous system is balanced and the athlete can handle stress. A suppressed HRV — even if the athlete looks fine — means the body is still in recovery mode. Pushing through it is how you manufacture injuries.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                {[
                  { label: 'The key insight', text: 'HRV must be compared to the athlete\'s own 7-day baseline — not population norms. A "good" HRV for one athlete is a bad day for another.' },
                  { label: 'The mechanism', text: 'Suppressed HRV = elevated sympathetic tone. The body is still running its stress response. CNS fatigue, inflammation markers, impaired muscle repair are all correlated.' },
                  { label: 'The window', text: 'Morning measurement (pre-activity, same time daily) gives a 24-48hr readiness window. This is your planning horizon for intensity prescription.' },
                  { label: 'The evidence', text: 'HRV-guided training outperforms fixed-load periodization in 8 of 10 recent controlled trials. Athletes hit more PRs with fewer overtraining incidents.' },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(124,111,224,0.08)', border: '1px solid rgba(124,111,224,0.2)', borderRadius: 10, padding: 20 }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#7C6FE0', marginBottom: 8 }}>{item.label.toUpperCase()}</div>
                    <div style={{ fontSize: 14, color: '#B0B0C0', lineHeight: 1.7 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
            {[
              { authors: 'Flatt & Nakamura', year: '2018', journal: 'International Journal of Sports Physiology & Performance', finding: 'Individualized HRV-guided training produced significantly greater gains in VO2max, sprint performance, and strength compared to fixed-load protocols across 12 weeks.', stat: '82%', statLabel: 'less overtraining incidents' },
              { authors: 'Buchheit', year: '2014', journal: 'European Journal of Applied Physiology', finding: 'Daily HRV monitoring in team sport athletes predicted performance readiness with 78% accuracy — significantly better than subjective wellness scores alone.', stat: '78%', statLabel: 'prediction accuracy' },
              { authors: 'Plews et al.', year: '2013', journal: 'International Journal of Sports Physiology & Performance', finding: 'HRV trend over 7 days is more predictive of training adaptation than single-day measurements. Consistent suppression = real problem. One bad day = noise.', stat: '7-day', statLabel: 'baseline window required' },
            ].map((study, i) => (
              <div key={i} style={{ background: '#0D0D0F', border: '1px solid #1A1A1E', borderRadius: 14, padding: 28, gridColumn: i === 0 ? '1 / -1' : 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F2F2F5' }}>{study.authors} ({study.year})</div>
                    <div style={{ fontSize: 12, color: '#444450', fontStyle: 'italic', marginTop: 2 }}>{study.journal}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: '#7C6FE0', lineHeight: 1 }}>{study.stat}</div>
                    <div style={{ fontSize: 11, color: '#888898' }}>{study.statLabel}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: '#888898', lineHeight: 1.7 }}>{study.finding}</p>
              </div>
            ))}
          </div>
        )}

        {/* SLEEP Panel */}
        {activeTab === 'sleep' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#111114', border: '1px solid #242428', borderRadius: 16, padding: 36, gridColumn: '1 / -1' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#818CF8', marginBottom: 8 }}>SLEEP QUALITY & DURATION</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 18, color: '#F2F2F5', marginBottom: 16 }}>The most underestimated performance variable in high school athletics.</div>
              <p style={{ fontSize: 15, color: '#888898', lineHeight: 1.8, marginBottom: 20 }}>Sleep isn't recovery time — it's the only time the body actually rebuilds. Human Growth Hormone peaks in slow-wave sleep. Muscle protein synthesis accelerates during REM. Memory consolidation for motor patterns happens overnight. When your athlete sleeps 6 hours instead of 9, they didn't just get less rest. They skipped the adaptation.</p>
              <div style={{ background: 'rgba(129,140,248,0.08)', border: '1px solid rgba(129,140,248,0.2)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: '#818CF8', marginBottom: 12 }}>THE SLEEP DEBT MATH</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'center' }}>
                  {[
                    { hours: '9h', label: 'Recommended', detail: 'AAP guideline', color: '#2ECC8A' },
                    { hours: '6.8h', label: 'Average athlete gets', detail: 'American Academy of Pediatrics 2016', color: '#E85555' },
                    { hours: '2.2h', label: 'Nightly deficit', detail: 'Every. Single. Night.', color: '#F5B820' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: '#0D0D0F', borderRadius: 10, padding: 16 }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: item.color, lineHeight: 1 }}>{item.hours}</div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: '#F2F2F5', margin: '6px 0 4px' }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: '#444450' }}>{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {[
              { authors: 'Milewski et al.', year: '2014', journal: 'Clinical Journal of Sports Medicine', finding: 'High school athletes sleeping fewer than 8 hours per night were 1.7 times more likely to experience an injury than those sleeping 8 or more hours. The relationship held after controlling for hours of sport participation.', stat: '1.7×', statLabel: 'injury multiplier <8hrs' },
              { authors: 'Mah et al.', year: '2011', journal: 'Stanford Sleep Lab / SLEEP Journal', finding: 'Basketball players who extended sleep to 10 hours improved sprint times by 5%, reaction time by 0.1s, shooting accuracy by 9%, and reported significantly better mood and energy — with zero additional training.', stat: '5%', statLabel: 'sprint speed gained from sleep alone' },
              { authors: 'Dattilo et al.', year: '2011', journal: 'Medical Hypotheses', finding: 'Sleep debt increases cortisol, reduces testosterone, and activates inflammatory pathways — creating an anabolic/catabolic imbalance that directly opposes the muscle-building stimulus from training.', stat: '↓T ↑C', statLabel: 'hormonal consequence of sleep debt' },
              { authors: 'AAP Policy Statement', year: '2016', journal: 'American Academy of Pediatrics', finding: 'Teens (14-17) require 8-10 hours of sleep for optimal health and performance. School schedules and athletics commonly restrict sleep to 6-7 hours — a public health concern that directly impacts injury risk and athletic output.', stat: '8-10h', statLabel: 'evidence-based requirement' },
            ].map((study, i) => (
              <div key={i} style={{ background: '#0D0D0F', border: '1px solid #1A1A1E', borderRadius: 14, padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F2F2F5' }}>{study.authors} ({study.year})</div>
                    <div style={{ fontSize: 12, color: '#444450', fontStyle: 'italic', marginTop: 2 }}>{study.journal}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: '#818CF8', lineHeight: 1 }}>{study.stat}</div>
                    <div style={{ fontSize: 11, color: '#888898' }}>{study.statLabel}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: '#888898', lineHeight: 1.7 }}>{study.finding}</p>
              </div>
            ))}
          </div>
        )}

        {/* RHR Panel */}
        {activeTab === 'rhr' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#111114', border: '1px solid #242428', borderRadius: 16, padding: 36, gridColumn: '1 / -1' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#2ECC8A', marginBottom: 8 }}>RESTING HEART RATE</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 18, color: '#F2F2F5', marginBottom: 16 }}>Simple. Powerful. Chronically ignored.</div>
              <p style={{ fontSize: 15, color: '#888898', lineHeight: 1.8, marginBottom: 24 }}>Resting HR is the simplest biometric available — and when tracked against personal baseline, it's a reliable early warning system. An elevated RHR (5+ bpm above baseline) signals the cardiovascular system is still under load. This predicts performance decrements, increases injury risk, and is an early marker of illness — all before the athlete reports feeling bad.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                {[
                  { delta: '+5 bpm', meaning: 'Yellow flag. Reduce volume. Monitor closely.', color: '#F5B820' },
                  { delta: '+8 bpm', meaning: 'Red flag. Significant recovery deficit. Technical work only.', color: '#FB923C' },
                  { delta: '+12 bpm', meaning: 'Pull the athlete. Something\'s wrong — overtraining, illness, stress.', color: '#E85555' },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#0D0D0F', borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: 20 }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: item.color, marginBottom: 8 }}>{item.delta}</div>
                    <div style={{ fontSize: 13, color: '#888898', lineHeight: 1.6 }}>{item.meaning}</div>
                  </div>
                ))}
              </div>
            </div>
            {[
              { authors: 'Foster et al.', year: '1996', journal: 'International Journal of Sports Medicine', finding: 'Resting heart rate elevations above individual baseline correlated strongly with overtraining syndrome in endurance athletes. The 7-day rolling baseline comparison was more sensitive than any single measurement.', stat: '7-day', statLabel: 'baseline window validated' },
              { authors: 'Hedelin et al.', year: '2000', journal: 'Medicine & Science in Sports & Exercise', finding: 'RHR combined with HRV provided better discrimination between recovered and under-recovered athletes than either metric alone — supporting a multi-variable readiness approach.', stat: '91%', statLabel: 'accuracy with combined metrics' },
            ].map((study, i) => (
              <div key={i} style={{ background: '#0D0D0F', border: '1px solid #1A1A1E', borderRadius: 14, padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F2F2F5' }}>{study.authors} ({study.year})</div>
                    <div style={{ fontSize: 12, color: '#444450', fontStyle: 'italic', marginTop: 2 }}>{study.journal}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: '#2ECC8A', lineHeight: 1 }}>{study.stat}</div>
                    <div style={{ fontSize: 11, color: '#888898' }}>{study.statLabel}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: '#888898', lineHeight: 1.7 }}>{study.finding}</p>
              </div>
            ))}
          </div>
        )}

        {/* ACWR Panel */}
        {activeTab === 'acwr' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#111114', border: '1px solid #242428', borderRadius: 16, padding: 36, gridColumn: '1 / -1' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#F5B820', marginBottom: 8 }}>ACUTE:CHRONIC WORKLOAD RATIO</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: 18, color: '#F2F2F5', marginBottom: 16 }}>How fast you ramped up load versus how prepared your body was for it.</div>
              <p style={{ fontSize: 15, color: '#888898', lineHeight: 1.8, marginBottom: 24 }}>ACWR compares what an athlete did in the last 7 days (acute load) vs. the average of the last 4 weeks (chronic load). The ratio tells you whether the athlete is building fitness or building risk. Training camps, two-a-days, playoff runs — these spike ACWR. Without monitoring, you don't know you're in the danger zone until someone's on the turf.</p>
              <div style={{ background: '#0D0D0F', borderRadius: 12, padding: 24 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: '#F5B820', marginBottom: 20 }}>THE SWEET SPOT VS. DANGER ZONES</div>
                <div style={{ position: 'relative', height: 60, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #7C6FE0 0%, #2ECC8A 25%, #2ECC8A 55%, #F5B820 72%, #E85555 100%)' }} />
                  {[
                    { pos: '0%', label: 'UNDERTRAINING', color: '#7C6FE0' },
                    { pos: '25%', label: '◀ SWEET SPOT', color: '#2ECC8A' },
                    { pos: '55%', label: 'SWEET SPOT ▶', color: '#2ECC8A' },
                    { pos: '72%', label: 'DANGER', color: '#F5B820' },
                    { pos: '88%', label: 'HIGH RISK', color: '#E85555' },
                  ].map((z, i) => (
                    <div key={i} style={{ position: 'absolute', top: '50%', left: z.pos, transform: 'translateY(-50%)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 9, color: 'white', letterSpacing: 1, whiteSpace: 'nowrap' }} />
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  {[
                    { range: '<0.8', zone: 'Undertraining', color: '#7C6FE0', risk: 'Detraining risk' },
                    { range: '0.8–1.3', zone: 'Sweet Spot', color: '#2ECC8A', risk: 'Optimal adaptation' },
                    { range: '1.3–1.5', zone: 'Caution', color: '#F5B820', risk: 'Elevated injury risk' },
                    { range: '>1.5', zone: 'Danger Zone', color: '#E85555', risk: 'High injury probability' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: '#111114', borderRadius: 8, padding: 14, textAlign: 'center', borderTop: `2px solid ${item.color}` }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: item.color }}>{item.range}</div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: '#F2F2F5', margin: '4px 0' }}>{item.zone}</div>
                      <div style={{ fontSize: 10, color: '#444450' }}>{item.risk}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {[
              { authors: 'Gabbett', year: '2016', journal: 'British Journal of Sports Medicine', finding: 'Athletes with ACWR above 1.5 were 2-3x more likely to sustain injury in the following week. The relationship was consistent across football, rugby, and basketball. This is now one of the most cited findings in sports science.', stat: '2-3×', statLabel: 'injury risk above 1.5 ACWR' },
              { authors: 'Hulin et al.', year: '2016', journal: 'British Journal of Sports Medicine', finding: 'Building chronic load provides a "fitness buffer" against injury. Athletes with high chronic workloads tolerated spikes better than those with low chronic loads — the dose makes the poison.', stat: '↑ Chronic', statLabel: 'load protects against spikes' },
            ].map((study, i) => (
              <div key={i} style={{ background: '#0D0D0F', border: '1px solid #1A1A1E', borderRadius: 14, padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F2F2F5' }}>{study.authors} ({study.year})</div>
                    <div style={{ fontSize: 12, color: '#444450', fontStyle: 'italic', marginTop: 2 }}>{study.journal}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: '#F5B820', lineHeight: 1 }}>{study.stat}</div>
                    <div style={{ fontSize: 11, color: '#888898' }}>{study.statLabel}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: '#888898', lineHeight: 1.7 }}>{study.finding}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* INTERACTIVE FORMULA BUILDER */}
      <section id="formula" style={{ background: '#0D0D0F', borderTop: '1px solid #1A1A1E', padding: '100px 20px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div id="formula-title" data-reveal style={{ textAlign: 'center', marginBottom: 64, opacity: isVisible('formula-title') ? 1 : 0, transform: isVisible('formula-title') ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 12 }}>BUILD THE SCORE</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px,6vw,72px)', lineHeight: 0.95, marginBottom: 16 }}>
              <span style={{ color: '#F2F2F5' }}>THE </span><span style={{ color: '#F26419' }}>4WRI</span><span style={{ color: '#F2F2F5' }}> FORMULA</span>
            </h2>
            <p style={{ fontSize: 16, color: '#888898', lineHeight: 1.7 }}>Move the sliders. Watch the score update. This is exactly what coaches see every morning.</p>
          </div>

          <div style={{ background: '#111114', border: '1px solid #242428', borderRadius: 20, padding: '40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #F26419, transparent)' }} />

            {/* Sliders */}
            {[
              { key: 'hrv' as const, label: 'HRV SCORE', weight: '45%', color: '#7C6FE0', desc: 'Today vs. 7-day personal baseline' },
              { key: 'sleep' as const, label: 'SLEEP SCORE', weight: '40%', color: '#818CF8', desc: 'Duration + consistency penalty' },
              { key: 'rhr' as const, label: 'RESTING HR SCORE', weight: '15%', color: '#2ECC8A', desc: 'Today vs. 7-day personal baseline' },
            ].map(input => (
              <div key={input.key} style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F2F2F5', letterSpacing: 1 }}>{input.label}</span>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, color: input.color, background: `${input.color}18`, padding: '3px 10px', borderRadius: 3 }}>×{input.weight}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#444450', marginTop: 2 }}>{input.desc}</div>
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: input.color, lineHeight: 1 }}>{score[input.key]}</div>
                </div>
                <div style={{ position: 'relative', height: 8, background: '#1A1A1E', borderRadius: 4, cursor: 'pointer' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${score[input.key]}%`, background: `linear-gradient(90deg, ${input.color}88, ${input.color})`, borderRadius: 4, transition: 'width 0.1s' }} />
                  <input type="range" min={0} max={100} value={score[input.key]}
                    onChange={e => setScore(prev => ({ ...prev, [input.key]: Number(e.target.value) }))}
                    style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', height: '100%', margin: 0 }} />
                </div>
              </div>
            ))}

            {/* Result */}
            <div style={{ marginTop: 8, padding: '32px', background: zone.bg, border: `1px solid ${zone.color}44`, borderRadius: 14, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 4, color: '#888898', marginBottom: 4 }}>4WRI SCORE</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 96, color: zone.color, lineHeight: 1, transition: 'color 0.3s' }}>{computed4WRI}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: zone.color, letterSpacing: 2 }}>{zone.label}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, color: zone.color, marginBottom: 12 }}>COACHING RECOMMENDATION</div>
                <div style={{ fontSize: 16, color: '#F2F2F5', lineHeight: 1.7, fontWeight: 600 }}>{zone.rec}</div>
                <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[
                    { range: '85-100', label: 'OPTIMAL', color: '#2ECC8A' },
                    { range: '70-84', label: 'MODERATE', color: '#F5B820' },
                    { range: '50-69', label: 'ELEVATED', color: '#FB923C' },
                    { range: '<50', label: 'HIGH RISK', color: '#E85555' },
                  ].map(z => (
                    <div key={z.range} style={{ padding: '5px 12px', background: computed4WRI >= parseInt(z.range) || z.range === '<50' ? `${z.color}22` : '#0D0D0F', border: `1px solid ${z.color}44`, borderRadius: 4, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, color: z.color, letterSpacing: 1 }}>
                      {z.range} {z.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE TWO-COACH SOLUTION */}
      <section style={{ padding: '100px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <div id="solution-title" data-reveal style={{ textAlign: 'center', marginBottom: 64, opacity: isVisible('solution-title') ? 1 : 0, transform: isVisible('solution-title') ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 12 }}>HOW IT WORKS IN PRACTICE</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px,6vw,72px)', lineHeight: 0.95 }}>
            <span style={{ color: '#F2F2F5' }}>ONE MORNING.</span><br />
            <span style={{ color: '#F26419' }}>EVERY COACH.</span><br />
            <span style={{ color: '#888898' }}>SAME PAGE.</span>
          </h2>
        </div>

        {/* Morning workflow */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 60 }}>
          {[
            { time: '6:00 AM', who: 'ATHLETE', action: 'Wakes up. Opens 4Ward app. HRV measured automatically from overnight band data. Sleep score calculated. Logs any soreness (1-10).', color: '#F26419', icon: '⏰' },
            { time: '6:30 AM', who: 'S&C COACH', action: 'Checks dashboard. Sees full roster sorted by 4WRI score. Immediately knows who needs volume reduction, who can push, who to watch closely. Adjusts session plan.', color: '#7C6FE0', icon: '💪' },
            { time: '7:00 AM', who: 'SPORT COACH', action: 'Gets the same dashboard. Sees athlete readiness before film session. Adjusts practice tempo. Has data-backed conversation with S&C coach instead of a guess-and-defend argument.', color: '#2ECC8A', icon: '🏈' },
            { time: '3:30 PM', who: 'PRACTICE', action: 'Athletes train to prescription. High scorers push. Low scorers do technical work. No one hides. No one gets buried. Everyone gets better.', color: '#F5B820', icon: '🎯' },
          ].map((step, i) => (
            <div key={i} id={`step-${i}`} data-reveal style={{
              background: '#111114',
              border: `1px solid ${step.color}22`,
              borderRadius: 16,
              padding: 28,
              position: 'relative',
              opacity: isVisible(`step-${i}`) ? 1 : 0,
              transform: isVisible(`step-${i}`) ? 'none' : 'translateY(30px)',
              transition: `all 0.6s ease ${i * 0.1}s`
            }}>
              <div style={{ position: 'absolute', top: -1, left: 24, right: 24, height: 2, background: `linear-gradient(90deg, ${step.color}, transparent)` }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: step.color }}>{step.time}</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#444450' }}>{step.who}</div>
                </div>
                <div style={{ fontSize: 32 }}>{step.icon}</div>
              </div>
              <p style={{ fontSize: 14, color: '#888898', lineHeight: 1.7 }}>{step.action}</p>
            </div>
          ))}
        </div>

        {/* The conversation that changes */}
        <div id="convo" data-reveal style={{
          background: 'linear-gradient(135deg, #0D0D0F, #111114)',
          border: '1px solid #1A1A1E',
          borderRadius: 20,
          padding: '48px',
          opacity: isVisible('convo') ? 1 : 0,
          transform: isVisible('convo') ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease'
        }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: '#F2F2F5', marginBottom: 32, textAlign: 'center' }}>
            THE CONVERSATION <span style={{ color: '#F26419' }}>BEFORE</span> VS. <span style={{ color: '#2ECC8A' }}>AFTER</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, color: '#E85555', marginBottom: 20, padding: '8px 16px', background: 'rgba(232,85,85,0.08)', borderRadius: 6, display: 'inline-block' }}>WITHOUT 4WARD</div>
              {[
                { coach: 'Sport Coach', line: '"Why is Johnson moving slow today? Is he hurt? Is he dogging it?"' },
                { coach: 'S&C Coach', line: '"I don\'t know. He did fine in the weight room this week."' },
                { coach: 'Sport Coach', line: '"Well push him harder. We have a big game Friday."' },
                { coach: 'S&C Coach', line: '"That\'s... probably not a good idea but okay."' },
                { coach: 'Result', line: 'Johnson strains his hamstring Thursday. Misses the game.', isResult: true },
              ].map((line, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, color: (line as any).isResult ? '#E85555' : '#444450', marginRight: 8 }}>{line.coach}:</span>
                  <span style={{ fontSize: 14, color: (line as any).isResult ? '#E85555' : '#888898', fontStyle: 'italic' }}>{line.line}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, color: '#2ECC8A', marginBottom: 20, padding: '8px 16px', background: 'rgba(46,204,138,0.08)', borderRadius: 6, display: 'inline-block' }}>WITH 4WARD</div>
              {[
                { coach: 'Sport Coach', line: '"Johnson is a 54 today. What\'s going on?"' },
                { coach: 'S&C Coach', line: '"HRV is 18% below baseline, slept 5.5 hours. Elevated risk zone."' },
                { coach: 'Sport Coach', line: '"Okay, what do you recommend?"' },
                { coach: 'S&C Coach', line: '"Technical reps only. No contact. He\'ll be recovered by Friday if we protect him today."' },
                { coach: 'Result', line: 'Johnson plays Friday. 11 tackles. Team wins.', isResult: true, isGood: true },
              ].map((line, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2, color: (line as any).isResult ? '#2ECC8A' : '#444450', marginRight: 8 }}>{line.coach}:</span>
                  <span style={{ fontSize: 14, color: (line as any).isResult ? '#2ECC8A' : '#B0B0C0', fontStyle: 'italic' }}>{line.line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / OBJECTIONS */}
      <section style={{ background: '#0D0D0F', borderTop: '1px solid #1A1A1E', padding: '100px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div id="faq-title" data-reveal style={{ textAlign: 'center', marginBottom: 64, opacity: isVisible('faq-title') ? 1 : 0, transform: isVisible('faq-title') ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 12 }}>REAL QUESTIONS FROM REAL COACHES</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px,5vw,60px)', lineHeight: 0.95 }}>
              <span style={{ color: '#F2F2F5' }}>THE OBJECTIONS</span><br />
              <span style={{ color: '#F26419' }}>ANSWERED.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { q: '"My athletes won\'t wear a band every day."', a: 'They will when they see their own data. Kids are obsessed with their stats. Give them a readiness score and suddenly they want to protect it. Early adopters in our beta have 94% daily compliance because the athletes opted in — it\'s their data.' },
              { q: '"This seems complicated for a high school program."', a: 'The coach sees one number — 0 to 100. That\'s it. The algorithm handles the rest. Setup is under 30 minutes. If you can run a Google Classroom, you can run 4Ward.' },
              { q: '"What if my sport coach doesn\'t trust the data?"', a: 'That\'s what the research tab is for. Every data point in the dashboard links directly to the peer-reviewed study it\'s based on. This isn\'t a startup\'s proprietary algorithm — it\'s Milewski, Mah, Gabbett, and Buchheit. The sport coach can read the same journals.' },
              { q: '"We don\'t have budget for another subscription."', a: 'At $2,499/year with bands included, 4Ward is less than the cost of one ACL surgery co-pay. One injury prevented pays for 3 years of the platform. The math is uncomfortable but it\'s real.' },
              { q: '"What about athlete privacy?"', a: 'Athletes own their data. The band syncs to their personal 4Ward app on their own phone. Coaches see the readiness score and training recommendation — not raw health data. We built the privacy model for FERPA compliance from day one.' },
              { q: '"Can the S&C coach and sport coach see different things?"', a: 'Yes. Role-based access is built in. The S&C coach sees full physiological data to program training. The sport coach sees readiness scores and recommendations. The AD sees program-level trends. Everyone gets what they need.' },
            ].map((faq, i) => (
              <div key={i} id={`faq-${i}`} data-reveal style={{
                background: '#111114',
                border: '1px solid #1A1A1E',
                borderRadius: 12,
                padding: '24px 28px',
                cursor: 'pointer',
                opacity: isVisible(`faq-${i}`) ? 1 : 0,
                transform: isVisible(`faq-${i}`) ? 'none' : 'translateY(20px)',
                transition: `all 0.6s ease ${i * 0.08}s`
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

      {/* FOOTER CTA */}
      <section style={{ padding: '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(242,100,25,0.2)', background: 'linear-gradient(135deg,rgba(242,100,25,0.08),rgba(242,100,25,0.03))' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(242,100,25,0.08),transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 6, color: '#F26419', marginBottom: 24 }}>SUMMER 2026 · ANY SPORT · ANY PROGRAM</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px,10vw,96px)', lineHeight: 0.9, marginBottom: 24 }}>
            <span style={{ color: '#F2F2F5' }}>STOP</span><br />
            <span style={{ color: '#F26419' }}>GUESSING.</span>
          </h2>
          <p style={{ fontSize: 18, color: '#888898', lineHeight: 1.7, marginBottom: 40 }}>The science is clear. The gap between sport coaches and S&C coaches is real. The solution exists. First 10 programs get founding pricing — $1,499/year locked for life.</p>
          <a href="/" style={{ display: 'inline-block', padding: '18px 48px', background: 'linear-gradient(135deg,#F26419,#C44E0F)', border: 'none', borderRadius: 6, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: 2, color: 'white', textDecoration: 'none', boxShadow: '0 0 60px rgba(242,100,25,0.4)' }}>JOIN THE WAITLIST →</a>
          <div style={{ marginTop: 48, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 2, color: '#242428' }}>BUILT BY A STRENGTH COACH · FOR STRENGTH COACHES · FORT WORTH, TEXAS</div>
        </div>
      </section>

    </div>
  )
}
