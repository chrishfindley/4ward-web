'use client';

import Link from 'next/link';
import { useState } from 'react';

function ChevronMark({ size = '1em', color = '#F26419' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      style={{ width: size, height: size, display: 'inline-block', verticalAlign: 'middle' }}
      fill="none"
    >
      <polyline
        points="12,71 52,29 92,71"
        stroke={color}
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(90, 50, 50)"
      />
    </svg>
  );
}

function Logo({ style }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em', ...style }}>
      <span style={{ color: '#F26419' }}>4</span>
      <span style={{ color: '#F2F2F5' }}>WARD</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '0em' }}>
        <ChevronMark size="0.64em" color="#F26419" />
      </span>
    </span>
  );
}

export default function OurStory() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D0D0F; color: #F2F2F5; font-family: 'Barlow', sans-serif; -webkit-font-smoothing: antialiased; }
        .story-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: clamp(16px, 2.5vw, 28px) clamp(20px, 5vw, 60px); background: rgba(13,13,15,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(242,242,245,0.06); }
        .story-nav-links { display: flex; gap: 32px; align-items: center; }
        .story-nav-links a { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 13px; letter-spacing: 0.12em; color: #888898; text-decoration: none; text-transform: uppercase; transition: color 0.2s; }
        .story-nav-links a:hover { color: #F2F2F5; }
        .nav-cta { font-family: 'Barlow Condensed', sans-serif !important; font-weight: 700 !important; font-size: 12px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; color: #F2F2F5 !important; background: #F26419; padding: 10px 20px; text-decoration: none !important; }
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; flex-direction: column; gap: 5px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: #F2F2F5; }
        .mobile-menu { position: fixed; inset: 0; z-index: 200; background: #0D0D0F; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px; }
        .mobile-menu a { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 10vw, 56px); letter-spacing: 0.06em; color: #F2F2F5; text-decoration: none; }
        .mobile-close { position: absolute; top: 24px; right: 24px; background: none; border: none; color: #F2F2F5; font-size: 32px; cursor: pointer; }
        .story-hero { padding: clamp(120px, 16vw, 180px) clamp(20px, 8vw, 120px) clamp(60px, 8vw, 100px); max-width: 860px; }
        .story-eyebrow { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(11px, 1.2vw, 13px); font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #F26419; margin-bottom: 24px; }
        .story-headline { font-family: 'Bebas Neue', sans-serif; font-size: clamp(52px, 9vw, 110px); line-height: 0.95; letter-spacing: 0.02em; color: #F2F2F5; }
        .story-divider { width: 48px; height: 3px; background: #F26419; margin: clamp(40px, 5vw, 60px) clamp(20px, 8vw, 120px); }
        .mission-block { padding: 0 clamp(20px, 8vw, 120px) clamp(80px, 10vw, 120px); max-width: 900px; }
        .mission-label { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #F26419; margin-bottom: 28px; }
        .mission-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(28px, 4vw, 44px); letter-spacing: 0.04em; color: #F2F2F5; margin-bottom: 32px; line-height: 1.1; }
        .mission-body { font-family: 'Barlow', sans-serif; font-size: clamp(16px, 1.6vw, 19px); font-weight: 400; line-height: 1.75; color: #888898; }
        .mission-body p + p { margin-top: 24px; }
        .mission-close { font-family: 'Barlow', sans-serif; font-size: clamp(16px, 1.6vw, 19px); font-weight: 500; line-height: 1.75; color: #F2F2F5; margin-top: 36px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .story-footer { border-top: 1px solid rgba(242,242,245,0.08); padding: clamp(32px, 4vw, 48px) clamp(20px, 8vw, 120px); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
        .footer-copy { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #555560; }
        .footer-cta { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #F2F2F5; background: #F26419; padding: 12px 24px; text-decoration: none; }
        .footer-cta:hover { opacity: 0.88; }
        @media (max-width: 640px) { .story-nav-links { display: none; } .hamburger { display: flex; } .story-footer { justify-content: center; text-align: center; } }
      `}</style>

      <nav className="story-nav">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo style={{ fontSize: 'clamp(22px, 3vw, 28px)' }} />
        </Link>
        <div className="story-nav-links">
          <Link href="/">Home</Link>
          <Link href="/science">See the Science</Link>
          <Link href="/story" style={{ color: '#F2F2F5' }}>Our Story</Link>
          <Link href="/#founding" className="nav-cta">Become a Founding Team</Link>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <button className="mobile-close" onClick={() => setMenuOpen(false)}>x</button>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/science" onClick={() => setMenuOpen(false)}>See the Science</Link>
          <Link href="/story" onClick={() => setMenuOpen(false)}>Our Story</Link>
          <Link href="/#founding" onClick={() => setMenuOpen(false)}>Founding Teams</Link>
        </div>
      )}

      <section className="story-hero">
        <p className="story-eyebrow">Our Story</p>
        <h1 className="story-headline">Built by a Coach.<br />Built for Coaches.</h1>
      </section>

      <div className="story-divider" />

      <section className="mission-block">
        <p className="mission-label">Our Mission</p>
        <h2 className="mission-title">Why Recovery Data Changes Everything</h2>
        <div className="mission-body">
          <p>Our mission at 4Ward is to give every high school strength and conditioning program access to the same actionable, research-backed insights that have long been reserved for professional and collegiate athletics — and to make those insights simple enough that any coach can act on them before practice starts.</p>
          <p>The research is clear: athletes who train based on how their body is actually recovering perform better, get injured less, and adapt faster. Across nine randomized controlled trials, HRV-guided training produced superior performance gains while requiring up to 25% fewer high-intensity sessions — meaning coaches who adjust training based on recovery data get more out of their athletes by demanding less at the wrong times. Adolescent athletes sleeping fewer than eight hours are 1.7 times more likely to get injured, and when poor sleep coincides with a spike in training load, that risk more than doubles. These are not fringe findings. They are the consensus of sport science, replicated across endurance athletes, team sport athletes, and collegiate programs for nearly two decades.</p>
          <p>The problem has never been the science. It has been access. 4Ward puts HRV, sleep quality, and resting heart rate into a single readiness score, delivered to your entire staff before the first athlete walks through the door. Not raw data to interpret. A decision you can act on.</p>
        </div>
        <div className="mission-close">
          Everyone in your program, pushing in the same direction.&nbsp;
          <Logo style={{ fontSize: 'clamp(18px, 2.2vw, 22px)' }} />
        </div>
      </section>

      <footer className="story-footer">
        <span className="footer-copy">2026 4Ward Athlete Performance</span>
        <Link href="/#founding" className="footer-cta">Become a Founding Team</Link>
      </footer>
    </>
  );
            }
