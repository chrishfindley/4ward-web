import Link from 'next/link'
import Logo from '@/components/Logo'

export default function StoryPage() {
  return (
    <div style={{ background: '#080809', color: '#F2F2F5', fontFamily: "'Barlow', sans-serif", overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px clamp(16px,4vw,36px)', background: 'rgba(8,8,9,0.95)',
        backdropFilter: 'blur(20px)', borderBottom: '1px solid #111114'
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}><Logo size={26} /></Link>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Link href="/science" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, color: '#A8A9AD', textDecoration: 'none' }}>SEE THE SCIENCE</Link>
          <Link href="/" style={{ padding: '9px 24px', borderRadius: 4, border: '1px solid #7B1020', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 12, letterSpacing: 3, color: '#7B1020', textDecoration: 'none' }}>FOUNDING TEAMS</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '80vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(120px,18vw,180px) clamp(16px,4vw,20px) clamp(60px,8vw,80px)',
        textAlign: 'center', position: 'relative'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
        <div style={{ position: 'relative', maxWidth: 720, width: '100%' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 7, color: '#7B1020', marginBottom: 28 }}>OUR STORY</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px,10vw,96px)', lineHeight: 0.9, color: '#F2F2F5' }}>
            BUILT BY A COACH.<br /><span style={{ color: '#7B1020' }}>BUILT FOR COACHES.</span>
          </div>
        </div>
      </section>

      {/* MISSION STATEMENT */}
      <section style={{ borderTop: '1px solid #111114', padding: 'clamp(72px,12vw,120px) clamp(16px,4vw,20px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 6, color: '#7B1020', marginBottom: 40 }}>THE MISSION</div>

          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(26px,3.5vw,38px)', color: '#F2F2F5', lineHeight: 1.1, marginBottom: 40 }}>
            WHY RECOVERY DATA CHANGES EVERYTHING
          </div>

          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: '#888898', fontWeight: 500, lineHeight: 1.9, marginBottom: 28 }}>
            Our mission at 4Ward is to give every high school strength and conditioning program access to the same actionable, research-backed insights that have long been reserved for professional and collegiate athletics — and to make those insights simple enough that any coach can act on them before practice starts.
          </p>

          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: '#888898', fontWeight: 500, lineHeight: 1.9, marginBottom: 28 }}>
            The research is clear: athletes who train based on how their body is actually recovering perform better, get injured less, and adapt faster. Across nine randomized controlled trials, HRV-guided training produced superior performance gains while requiring up to 25% fewer high-intensity sessions — meaning coaches who adjust training based on recovery data get more out of their athletes by demanding less at the wrong times. Adolescent athletes sleeping fewer than eight hours are 1.7 times more likely to get injured, and when poor sleep coincides with a spike in training load, that risk more than doubles. These aren't fringe findings. They're the consensus of sport science, replicated across endurance athletes, team sport athletes, and collegiate programs for nearly two decades.
          </p>

          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: '#888898', fontWeight: 500, lineHeight: 1.9, marginBottom: 48 }}>
            The problem has never been the science. It's been access. 4Ward puts HRV, sleep quality, and resting heart rate into a single readiness score, delivered to your entire staff before the first athlete walks through the door. Not raw data to interpret. A decision you can act on. Everyone in your program, pushing in the same direction.
          </p>

          {/* Closing line with logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 24, borderTop: '1px solid #111114' }}>
            <Logo size={22} />
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #111114', padding: 'clamp(24px,4vw,32px) clamp(16px,4vw,36px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <Logo size={20} />
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 3, color: '#888898' }}>© 2026 4WARD ATHLETE PERFORMANCE</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: 2, color: '#888898' }}>@4WARDPERFORMANCE</div>
      </footer>

    </div>
  )
}
