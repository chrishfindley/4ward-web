'use client'
import { useEffect } from 'react'
import Logo from '@/components/Logo'

export default function Home() {
  useEffect(() => {
    const root = document.documentElement
    const nav = document.querySelector('.nav') as HTMLElement | null
    const setNavHeight = () => {
      if (!nav) return
      root.style.setProperty('--nav-height', `${Math.ceil(nav.getBoundingClientRect().height)}px`)
    }

    setNavHeight()
    requestAnimationFrame(setNavHeight)
    window.addEventListener('resize', setNavHeight)

    const navResizeObserver = nav && typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(setNavHeight)
      : null
    if (nav && navResizeObserver) {
      navResizeObserver.observe(nav)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        e.target.classList.toggle('visible', e.isIntersecting)
      })
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -8% 0px',
    })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => {
      observer.disconnect()
      navResizeObserver?.disconnect()
      window.removeEventListener('resize', setNavHeight)
    }
  }, [])

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Logo size={22} />
          <div className="nav-links">
            <a href="/science">Science</a>
            <a href="/story">Our Story</a>
            <a href="#founding" className="btn btn-primary" style={{padding:'10px 20px', fontSize:12}}>Founding Teams</a>
          </div>
        </div>
      </nav>

      <section className="section hero-section section-dark" style={{textAlign:'center'}}>
        <div className="section-narrow">
          <div className="eyebrow reveal" style={{color:'var(--maroon-bright)'}}>
            Athlete Performance Platform · Launching Summer 2026
          </div>
          <h1 className="display reveal delay-1" style={{marginBottom:32}}>
            Research-proven data.<br />
            <span className="accent">Actionable insights.</span><br />
            One platform.
          </h1>
          <p className="body-lg reveal delay-2" style={{margin:'0 auto 40px'}}>
            4Ward gives coaches a daily readiness score for every athlete — built from HRV,
            sleep, and resting heart rate — so you know who can absorb today&apos;s practice
            before it starts.
          </p>
          <div className="reveal delay-3" style={{display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap'}}>
            <a href="#founding" className="btn btn-primary">Become a Founding Team →</a>
            <a href="/science" className="btn btn-ghost">See the Science</a>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="section-inner grid-2">
          <div className="reveal">
            <div className="eyebrow">The Dashboard</div>
            <h2 className="title" style={{marginBottom:24}}>
              See every athlete.<br />
              <span className="accent">Every morning.</span>
            </h2>
            <p className="body-lg">
              Each athlete gets a readiness score built from three research-validated inputs.
              Coaches see the full roster&apos;s status the moment they open the app — before the
              first athlete even walks in.
            </p>
          </div>
          <div className="reveal delay-1">
            <div className="browser-frame">
              <div className="browser-chrome">
                <div className="browser-dot"></div>
                <div className="browser-dot"></div>
                <div className="browser-dot"></div>
              </div>
              <div style={{padding:'20px', background:'var(--black)'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18}}>
                  <div>
                    <div style={{fontFamily:"'Barlow Condensed', sans-serif", fontSize:11, letterSpacing:2, color:'var(--silver-dark)', fontWeight:800}}>COACH DASHBOARD</div>
                    <div style={{fontFamily:"'Bebas Neue', sans-serif", fontSize:18, color:'var(--off-white)', marginTop:2}}>TUESDAY · APR 15</div>
                  </div>
                  <div style={{fontFamily:"'Barlow Condensed', sans-serif", fontSize:10, letterSpacing:2, fontWeight:800, color:'var(--green)', border:'1px solid rgba(46,204,138,0.3)', padding:'4px 10px', borderRadius:3}}>18 SYNCED</div>
                </div>
                <div className="athlete-row optimal">
                  <div className="athlete-score optimal">91</div>
                  <div>
                    <div className="athlete-name">J. Harris</div>
                    <div className="athlete-meta">HRV ↑ · Sleep 8.5h · RHR —</div>
                  </div>
                  <div className="athlete-status optimal">Optimal</div>
                </div>
                <div className="athlete-row moderate">
                  <div className="athlete-score moderate">74</div>
                  <div>
                    <div className="athlete-name">M. Torres</div>
                    <div className="athlete-meta">HRV — · Sleep 6.9h · RHR ↑</div>
                  </div>
                  <div className="athlete-status moderate">Moderate</div>
                </div>
                <div className="athlete-row elevated" style={{marginBottom:0}}>
                  <div className="athlete-score elevated">51</div>
                  <div>
                    <div className="athlete-name">D. Walker</div>
                    <div className="athlete-meta">HRV ↓ · Sleep 5.2h · RHR ↑↑</div>
                  </div>
                  <div className="athlete-status elevated">Elevated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-narrow" style={{textAlign:'center', marginBottom:80}}>
          <div className="eyebrow reveal">The Foundation</div>
          <h2 className="title reveal delay-1" style={{marginBottom:24}}>
            Built on science. <span className="accent">Not guesses.</span>
          </h2>
          <p className="body-lg reveal delay-2" style={{margin:'0 auto'}}>
            The 4Ward Recovery Index uses the same physiological markers validated in
            decades of peer-reviewed research — the same science behind the leading
            athlete recovery platforms, packaged for high school programs.
          </p>
        </div>
        <div className="section-inner grid-3">
          <div className="feature-card reveal">
            <div className="feature-num">01</div>
            <div className="feature-title">Nocturnal HRV</div>
            <div className="feature-body">
              Heart rate variability measured during deep sleep — the cleanest physiological
              window into recovery. Tracked nightly, compared against each athlete&apos;s personal
              baseline.
            </div>
          </div>
          <div className="feature-card reveal delay-1">
            <div className="feature-num">02</div>
            <div className="feature-title">Sleep Quality</div>
            <div className="feature-body">
              Duration, consistency, and efficiency. High school athletes who average under 8
              hours are 1.7× more likely to sustain injuries in their sport (Milewski, J. Pediatric Orthopaedics, 2014).
            </div>
          </div>
          <div className="feature-card reveal delay-2">
            <div className="feature-num">03</div>
            <div className="feature-title">Resting Heart Rate</div>
            <div className="feature-body">
              Elevated morning RHR is one of the earliest physiological signals of
              inadequate recovery, accumulating training stress, or illness onset — often before athletes feel it themselves.
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="section-inner grid-2">
          <div className="reveal" style={{order:2}}>
            <div className="phone-frame" style={{maxWidth:320, margin:'0 auto'}}>
              <div className="phone-screen" style={{padding:'24px 18px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18}}>
                  <div style={{fontFamily:"'Barlow Condensed', sans-serif", fontWeight:800, fontSize:11, letterSpacing:3, color:'var(--maroon-bright)'}}>WORKOUT MODE</div>
                  <div style={{fontFamily:"'Bebas Neue', sans-serif", fontSize:13, color:'var(--off-white)'}}>4WARD</div>
                </div>
                <div style={{fontFamily:"'Barlow Condensed', sans-serif", fontSize:10, letterSpacing:2, color:'var(--silver)', marginBottom:16}}>MONDAY · FULL WORKOUT</div>
                <div style={{borderTop:'1px solid var(--border-dark)', paddingTop:20}}>
                  <div style={{fontFamily:"'Barlow Condensed', sans-serif", fontSize:10, letterSpacing:3, color:'var(--silver)', fontWeight:800, marginBottom:4}}>EXERCISE</div>
                  <div style={{fontFamily:"'Bebas Neue', sans-serif", fontSize:34, color:'var(--off-white)', lineHeight:1}}>Bench Press</div>
                  <div style={{display:'inline-block', marginTop:8, fontFamily:"'Barlow Condensed', sans-serif", fontSize:10, letterSpacing:2, fontWeight:800, color:'var(--maroon-bright)', background:'rgba(168,37,58,0.12)', padding:'3px 10px', borderRadius:2}}>SET 1 OF 4</div>
                </div>
                <div style={{marginTop:28, textAlign:'center'}}>
                  <div style={{fontFamily:"'Barlow Condensed', sans-serif", fontSize:10, letterSpacing:3, color:'var(--silver)', fontWeight:800, marginBottom:6}}>WEIGHT</div>
                  <div style={{fontFamily:"'Bebas Neue', sans-serif", fontSize:56, color:'var(--off-white)', lineHeight:1}}>225</div>
                  <div style={{fontFamily:"'Barlow Condensed', sans-serif", fontSize:11, letterSpacing:2, color:'var(--silver-dark)', marginTop:4}}>LBS</div>
                </div>
                <div style={{marginTop:20, textAlign:'center'}}>
                  <div style={{fontFamily:"'Barlow Condensed', sans-serif", fontSize:10, letterSpacing:3, color:'var(--silver)', fontWeight:800, marginBottom:6}}>REPS</div>
                  <div style={{fontFamily:"'Bebas Neue', sans-serif", fontSize:56, color:'var(--off-white)', lineHeight:1}}>8</div>
                </div>
                <div style={{marginTop:28, height:46, background:'var(--maroon)', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Bebas Neue', sans-serif", fontSize:17, letterSpacing:3, color:'white'}}>LOG SET</div>
              </div>
            </div>
          </div>
          <div className="reveal delay-1" style={{order:1}}>
            <div className="eyebrow">Live Workout Mode</div>
            <h2 className="title" style={{marginBottom:24}}>
              Track every rep.<br />
              <span className="accent">Not just wear a band.</span>
            </h2>
            <p className="body-lg" style={{marginBottom:24}}>
              Coaches program workouts and push them to every athlete&apos;s app. Athletes
              log sets with a swipe. AI adjusts the prescription based on how Set 1 went
              and today&apos;s readiness.
            </p>
            <p className="body">
              Every rep, every set, every workout flows back into the platform — giving
              coaches a complete training picture alongside the recovery data. No other
              high school platform does both.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-charcoal">
        <div className="section-inner">
          <div style={{textAlign:'center', marginBottom:64}}>
            <div className="eyebrow reveal">The Field</div>
            <h2 className="title reveal delay-1">How 4Ward compares.</h2>
          </div>
          <div className="compare-wrap reveal delay-2">
            <table className="compare">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="us">4Ward</th>
                  <th>WHOOP</th>
                  <th>Catapult</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Internal recovery monitoring (HRV, sleep, RHR)</td><td className="us"><span className="compare-yes">✓</span></td><td><span className="compare-yes">✓</span></td><td><span className="compare-no">✗</span></td></tr>
                <tr><td>Peer-reviewed methodology</td><td className="us"><span className="compare-yes">✓</span></td><td><span className="compare-yes">✓</span></td><td><span className="compare-partial">Contested</span></td></tr>
                <tr><td>Nocturnal HRV during deep sleep</td><td className="us"><span className="compare-yes">✓</span></td><td><span className="compare-yes">✓</span></td><td><span className="compare-no">✗</span></td></tr>
                <tr><td>Daily readiness score per athlete</td><td className="us"><span className="compare-yes">✓</span></td><td><span className="compare-yes">✓</span></td><td><span className="compare-no">✗</span></td></tr>
                <tr><td>Coach-facing team dashboard</td><td className="us"><span className="compare-yes">✓</span></td><td><span className="compare-no">✗</span></td><td><span className="compare-yes">✓</span></td></tr>
                <tr><td>External load tracking (GPS, accel)</td><td className="us"><span className="compare-partial">Phase 2</span></td><td><span className="compare-partial">Partial</span></td><td><span className="compare-yes">✓</span></td></tr>
                <tr><td>Injury risk flagging</td><td className="us"><span className="compare-partial">Planned</span></td><td><span className="compare-partial">Partial</span></td><td><span className="compare-yes">✓</span></td></tr>
                <tr><td>Designed for high school budgets</td><td className="us"><span className="compare-yes">✓</span></td><td><span className="compare-no">✗</span></td><td><span className="compare-no">✗</span></td></tr>
                <tr><td>Hardware included — no per-athlete subscription</td><td className="us"><span className="compare-yes">✓</span></td><td><span className="compare-no">✗</span></td><td><span className="compare-no">✗</span></td></tr>
                <tr><td>No sports science staff required</td><td className="us"><span className="compare-yes">✓</span></td><td><span className="compare-partial">N/A</span></td><td><span className="compare-no">✗</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="founding" className="section section-light" style={{textAlign:'center'}}>
        <div className="section-narrow">
          <div className="eyebrow reveal">Founding Teams · Summer 2026</div>
          <h2 className="title reveal delay-1" style={{marginBottom:24}}>
            Be the first program<br />
            in your <span className="accent">region.</span>
          </h2>
          <p className="body-lg reveal delay-2" style={{margin:'0 auto 40px'}}>
            Founding partners get lifetime locked-in pricing, direct input on product
            direction, and the recognition of being first in their state. Limited to 10
            schools for the 2026 season.
          </p>
          <div className="reveal delay-3">
            <a href="mailto:chris@4wardperformance.com" className="btn btn-primary">Become a Founding Team →</a>
          </div>
          <div className="reveal delay-4" style={{marginTop:24, fontFamily:"'Barlow Condensed', sans-serif", fontSize:12, letterSpacing:2, color:'var(--silver-dark)', fontWeight:700}}>
            ANY SPORT · ANY PROGRAM · SUMMER 2026
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <Logo size={18} />
          <div style={{color:'var(--silver-dark)', fontSize:12, letterSpacing:1}}>© 2026 4Ward Performance · Fort Worth, TX</div>
        </div>
      </footer>
    </>
  )
}
