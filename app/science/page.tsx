'use client'
import { useEffect } from 'react'
import Logo from '@/components/Logo'

export default function Science() {
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

    const navResizeObserver = nav ? new ResizeObserver(setNavHeight) : null
    navResizeObserver?.observe(nav)

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
          <a href="/" style={{textDecoration:'none'}}><Logo size={22} /></a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/story">Our Story</a>
            <a href="mailto:chris@4wardperformance.com" className="btn btn-primary" style={{padding:'10px 20px', fontSize:12}}>Contact</a>
          </div>
        </div>
      </nav>

      <section className="section hero-section section-dark" style={{textAlign:'center'}}>
        <div className="section-narrow">
          <div className="eyebrow reveal" style={{color:'var(--maroon-bright)'}}>The Science</div>
          <h1 className="display reveal delay-1" style={{marginBottom:32}}>
            Internal load beats<br />
            <span className="accent">external load.</span>
          </h1>
          <p className="body-lg reveal delay-2" style={{margin:'0 auto'}}>
            A 2016 systematic review in the British Journal of Sports Medicine found that
            internal-load markers — HRV, sleep, and subjective wellness — consistently
            outperform external-load measures like GPS distance for predicting how an
            athlete responds to training.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="section-narrow">
          <div className="eyebrow reveal">The 4WRI Formula</div>
          <h2 className="title reveal delay-1" style={{marginBottom:40}}>
            Four inputs. <span className="accent">One score.</span>
          </h2>
          <div style={{display:'grid', gap:24}}>
            <div className="feature-card reveal">
              <div className="feature-num">30%</div>
              <div className="feature-title">HRV (7-day rolling average)</div>
              <div className="feature-body">
                Heart rate variability captured nightly during deep sleep. The single most
                sensitive daily recovery marker in the research literature. Compared against
                each athlete&apos;s personal baseline — not population averages.
              </div>
            </div>
            <div className="feature-card reveal delay-1">
              <div className="feature-num">25%</div>
              <div className="feature-title">Sleep Quality &amp; Consistency</div>
              <div className="feature-body">
                Duration matters. Consistency matters more. Adolescent athletes who sleep
                under 8 hours are 1.7× more likely to sustain injuries (Milewski, 2014, n=112).
              </div>
            </div>
            <div className="feature-card reveal delay-2">
              <div className="feature-num">15%</div>
              <div className="feature-title">Resting Heart Rate</div>
              <div className="feature-body">
                Elevated morning RHR is one of the earliest physiological signals of
                inadequate recovery, accumulating stress, or impending illness — often before
                athletes consciously feel it.
              </div>
            </div>
            <div className="feature-card reveal delay-3">
              <div className="feature-num">30%</div>
              <div className="feature-title">Subjective Wellness + Load</div>
              <div className="feature-body">
                A short morning check-in and training load trend (acute:chronic ratio).
                Saw et al. (2016, BJSM systematic review) found subjective markers
                consistently match or outperform objective biomarkers.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-charcoal">
        <div className="section-narrow">
          <div className="eyebrow reveal">Citations</div>
          <h2 className="title reveal delay-1" style={{marginBottom:32}}>
            The research.
          </h2>
          <div className="body reveal delay-2" style={{lineHeight:1.9}}>
            <p style={{marginBottom:12}}><strong style={{color:'var(--off-white)'}}>Milewski et al.</strong> — J. Pediatric Orthopaedics, 2014. Chronic sleep deprivation and injury risk in adolescent athletes (n=112).</p>
            <p style={{marginBottom:12}}><strong style={{color:'var(--off-white)'}}>Watson et al.</strong> — British Journal of Sports Medicine, 2017. Wellness and training load as predictors of injury and illness in youth athletes (n=75, 20-week prospective).</p>
            <p style={{marginBottom:12}}><strong style={{color:'var(--off-white)'}}>Saw, Main, Gastin</strong> — British Journal of Sports Medicine, 2016. Systematic review: subjective vs objective measures for monitoring athlete response.</p>
            <p style={{marginBottom:12}}><strong style={{color:'var(--off-white)'}}>Mah et al.</strong> — SLEEP, 2011. Effects of sleep extension on athletic performance (Stanford men&apos;s basketball).</p>
            <p style={{marginBottom:12}}><strong style={{color:'var(--off-white)'}}>Plews &amp; Buchheit</strong> — IJSPP, 2012. Evaluating training adaptation with HRV: rolling averages vs single-day measures.</p>
            <p><strong style={{color:'var(--off-white)'}}>Williams et al.</strong> — Journal of Sports Sciences, 2017. HRV and training load as combined predictors of injury risk.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <Logo size={18} />
          <div style={{color:'var(--silver-dark)', fontSize:12}}>© 2026 4Ward Performance · Fort Worth, TX</div>
        </div>
      </footer>
    </>
  )
}
