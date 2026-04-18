'use client'
import { useEffect } from 'react'
import Logo from '@/components/Logo'
import { setupRevealAndNav } from '@/lib/revealAndNav'

export default function Story() {
  useEffect(() => setupRevealAndNav(), [])

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" style={{textDecoration:'none'}}><Logo size={22} /></a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/science">Science</a>
            <a href="mailto:chris@4wardperformance.com" className="btn btn-primary" style={{padding:'10px 20px', fontSize:12}}>Contact</a>
          </div>
        </div>
      </nav>

      <section className="section hero-section section-dark" style={{textAlign:'center'}}>
        <div className="section-narrow">
          <div className="eyebrow reveal" style={{color:'var(--maroon-bright)'}}>Our Story</div>
          <h1 className="display reveal delay-1" style={{marginBottom:32}}>
            Built by a coach.<br />
            <span className="accent">Built for coaches.</span>
          </h1>
        </div>
      </section>

      <section className="section section-light">
        <div className="section-narrow body-lg reveal" style={{fontSize:'clamp(18px, 2vw, 20px)', lineHeight:1.75}}>
          <p style={{marginBottom:28}}>
            4Ward was built by someone who&apos;s actually done the job. Thirteen years as a
            math teacher and strength coach in Texas high schools. A BS in Exercise
            Science and an MS in Human Performance. And a daily frustration that the
            athletes we care about are training with decades-old tools while the pros
            have platforms built specifically for their recovery.
          </p>
          <p style={{marginBottom:28}}>
            The science isn&apos;t new. Elite programs have been using HRV, sleep, and
            resting heart rate for over a decade to guide their training decisions.
            What&apos;s been missing is a platform designed for coaches who also teach four
            classes — not for sports science staff with PhDs and six-figure budgets.
          </p>
          <p style={{marginBottom:28}}>
            4Ward&apos;s goal is simple: take the same science trusted by the leading athlete
            recovery platforms and make it work for the programs that need it most.
            High schools. Club teams. Small-college athletics. The programs where one
            person is doing the job of five.
          </p>
          <p>
            If you coach, you know the moment — the moment right before practice when
            you have to make a decision about load, intensity, and which athletes can
            handle what. 4Ward is built to make that moment a little less of a guess.
          </p>
        </div>
      </section>

      <section className="section section-charcoal" style={{textAlign:'center'}}>
        <div className="section-narrow">
          <div className="eyebrow reveal">Get In Touch</div>
          <h2 className="title reveal delay-1" style={{marginBottom:32}}>
            Want to talk?
          </h2>
          <div className="reveal delay-2">
            <a href="mailto:chris@4wardperformance.com" className="btn btn-primary">chris@4wardperformance.com</a>
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
