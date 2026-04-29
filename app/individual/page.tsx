'use client'

import { useEffect } from 'react'
import Logo from '@/components/Logo'
import { setupRevealAndNav } from '@/lib/revealAndNav'

function PhoneMockup() {
  return (
    <div className="phone-frame" style={{ maxWidth: 360, margin: '0 auto', background: '#FFFFFF', borderColor: 'var(--border-light)', boxShadow: '0 42px 120px rgba(8,8,9,0.18)' }}>
      <div className="phone-screen" style={{ background: 'linear-gradient(180deg, #FAFAF7 0%, #FFFFFF 54%, #F0EEE8 100%)', padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 2.4, color: 'var(--maroon)', textTransform: 'uppercase' }}>Today</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, lineHeight: 1, color: 'var(--text-dark)' }}>Ready</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--black)', color: 'white', display: 'grid', placeItems: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: 18 }}>4W</div>
        </div>

        <div style={{ background: 'var(--black)', color: 'white', borderRadius: 26, padding: 24, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 2.6, color: 'var(--silver)', textTransform: 'uppercase', marginBottom: 8 }}>4W Readiness</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 18 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 108, lineHeight: 0.84, color: 'var(--maroon-bright)' }}>86</div>
            <div style={{ textAlign: 'right', paddingBottom: 8 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: 2, color: 'var(--green)', textTransform: 'uppercase' }}>Push</div>
              <div style={{ fontSize: 13, color: 'var(--silver)' }}>Full session OK</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <MetricTile label="Sleep" value="8.1h" />
          <MetricTile label="HRV" value="+7%" maroon />
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 22, padding: 18, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: 2.3, textTransform: 'uppercase', color: 'var(--silver-dark)', marginBottom: 10 }}>Today&apos;s Call</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, lineHeight: 1, color: 'var(--text-dark)', marginBottom: 8 }}>Train as planned</div>
          <div style={{ fontSize: 14, color: 'var(--silver-dark)' }}>Sleep and HRV are above your baseline. Keep intensity.</div>
        </div>

        {['Start Workout', 'Log Recovery', 'View Pattern'].map((item, index) => (
          <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: index === 0 ? 'var(--maroon)' : 'rgba(123,16,32,0.07)', borderRadius: 14, padding: '13px 15px', color: index === 0 ? 'white' : 'var(--text-dark)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 10 }}>
            <span>{item}</span>
            <span>→</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MetricTile({ label, value, maroon = false }: { label: string; value: string; maroon?: boolean }) {
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 16, padding: 16 }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--silver-dark)', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 38, lineHeight: 1, color: maroon ? 'var(--maroon)' : 'var(--text-dark)' }}>{value}</div>
    </div>
  )
}

function InputCard({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="feature-card reveal">
      <div className="feature-num">{num}</div>
      <div className="feature-title">{title}</div>
      <div className="feature-body">{body}</div>
    </div>
  )
}

function DarkCard({ title, body, delay }: { title: string; body: string; delay: string }) {
  return (
    <div className={`feature-card reveal ${delay}`} style={{ background: 'var(--charcoal)', borderColor: 'var(--border-dark)' }}>
      <div className="feature-title">{title}</div>
      <div className="feature-body">{body}</div>
    </div>
  )
}

function MiniScreen({ type }: { type: 'dashboard' | 'workout' | 'progress' | 'coach' }) {
  const labels = {
    dashboard: ['86', 'Push', 'Sleep + HRV up'],
    workout: ['4x5', 'Squat', 'Load OK'],
    progress: ['+12%', 'Trend', '8 week view'],
    coach: ['Share', 'Coach', 'Send snapshot'],
  }
  const [big, title, detail] = labels[type]

  return (
    <div style={{ background: type === 'dashboard' ? 'var(--black)' : '#F0F0EC', border: '1px solid var(--border-light)', borderRadius: 16, padding: 16, minHeight: 150, display: 'grid', alignContent: 'space-between' }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: type === 'dashboard' ? 'var(--silver)' : 'var(--silver-dark)' }}>{title}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, lineHeight: 1, color: type === 'dashboard' ? 'var(--maroon-bright)' : 'var(--maroon)' }}>{big}</div>
      <div style={{ fontSize: 13, color: type === 'dashboard' ? 'var(--silver-light)' : 'var(--silver-dark)' }}>{detail}</div>
    </div>
  )
}

function PillarCard({ title, body, type, delay }: { title: string; body: string; type: 'dashboard' | 'workout' | 'progress' | 'coach'; delay: string }) {
  return (
    <div className={`reveal ${delay}`} style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 18, padding: 22, display: 'grid', gap: 18 }}>
      <MiniScreen type={type} />
      <div>
        <div className="feature-title">{title}</div>
        <div className="feature-body">{body}</div>
      </div>
    </div>
  )
}

function PriceCard({ name, price, items, featured = false }: { name: string; price: string; items: string[]; featured?: boolean }) {
  return (
    <div className="reveal" style={{ background: featured ? 'rgba(123,16,32,0.22)' : 'var(--charcoal)', border: `1px solid ${featured ? 'rgba(168,37,58,0.6)' : 'var(--border-dark)'}`, borderRadius: 20, padding: 30 }}>
      <div className="eyebrow" style={{ color: featured ? 'var(--maroon-bright)' : 'var(--silver)' }}>{name}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 8vw, 86px)', lineHeight: 1, color: 'var(--text-light)', marginBottom: 22 }}>{price}</div>
      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((item) => (
          <div key={item} className="body" style={{ display: 'flex', gap: 10, color: 'var(--silver-light)' }}>
            <span style={{ color: 'var(--maroon-bright)' }}>✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="reveal" style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 14, padding: '18px 20px' }}>
      <summary style={{ cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-dark)' }}>{question}</summary>
      <p className="body" style={{ marginTop: 14 }}>{answer}</p>
    </details>
  )
}

export default function Individual() {
  useEffect(() => setupRevealAndNav(), [])

  return (
    <>
      <nav className="nav" style={{ minHeight: 40, paddingTop: 2, paddingBottom: 2, display: 'flex', alignItems: 'center' }}>
        <div className="nav-inner" style={{ alignItems: 'center', width: '100%' }}>
          <a href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}><Logo size={22} /></a>
          <div className="nav-links">
            <a href="/login">Login</a>
          </div>
        </div>
      </nav>

      <section className="section hero-section section-light">
        <div className="section-inner grid-2">
          <div className="reveal">
            <div className="eyebrow" style={{ color: 'var(--maroon)' }}>Individual Athletes</div>
            <h1 className="display" style={{ color: 'var(--text-dark)', marginBottom: 30 }}>
              Train with intent.<br />
              <span className="accent">Not vibes.</span>
            </h1>
            <p className="body-lg" style={{ marginBottom: 36 }}>
              4Ward gives you a daily readiness score built from your sleep, HRV, and resting heart rate — so you stop guessing whether to push, hold, or back off.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="/signup" className="btn btn-primary">Start Free →</a>
              <a href="#problem" className="btn btn-ghost">How It Works</a>
            </div>
          </div>
          <div className="reveal delay-1">
            <PhoneMockup />
          </div>
        </div>
      </section>

      <section id="problem" className="section section-dark">
        <div className="section-narrow">
          <div className="eyebrow reveal" style={{ color: 'var(--maroon-bright)' }}>The Problem</div>
          <h2 className="display reveal delay-1" style={{ marginBottom: 34 }}>
            Most athletes<br />
            <span className="accent">train blind.</span>
          </h2>
          <div className="body-lg reveal delay-2" style={{ display: 'grid', gap: 22, maxWidth: 780 }}>
            <p>You woke up tired, but you don&apos;t know if it&apos;s recovery debt or last night&apos;s bad pizza.</p>
            <p>Your coach pushes hard on Monday. By Wednesday you&apos;re fried, but you can&apos;t tell if you should grind through or pull back.</p>
            <p>Sleep tracker apps tell you “you slept 6 hours.” That&apos;s not insight — that&apos;s data. You need to know what to do with it.</p>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="section-inner">
          <div className="section-narrow" style={{ textAlign: 'center', marginBottom: 58 }}>
            <div className="eyebrow reveal">The Solution</div>
            <h2 className="title reveal delay-1" style={{ marginBottom: 24 }}>
              One score. Every morning.<br />
              <span className="accent">Built from real science.</span>
            </h2>
          </div>
          <div className="grid-3" style={{ marginBottom: 42 }}>
            <InputCard num="01" title="Nocturnal HRV" body="Captured during sleep and compared against your baseline. It tells you how your nervous system is responding." />
            <InputCard num="02" title="Sleep Quality" body="Duration, consistency, and recovery context. Bad sleep changes what your body can absorb today." />
            <InputCard num="03" title="Resting Heart Rate" body="Elevated morning RHR can signal stress, fatigue, illness, or incomplete recovery before you feel it." />
          </div>
          <p className="body-lg reveal delay-3" style={{ margin: '0 auto', textAlign: 'center', color: 'var(--silver-dark)' }}>
            These three signals form your daily Readiness Score (4WRI) — the same methodology our team partners use. Fully transparent. <a href="/science" style={{ color: 'var(--maroon)', fontWeight: 700 }}>See the math →</a>
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-inner">
          <div className="section-narrow" style={{ textAlign: 'center', marginBottom: 58 }}>
            <div className="eyebrow reveal" style={{ color: 'var(--maroon-bright)' }}>Intelligence Built In</div>
            <h2 className="title reveal delay-1">
              AI that reads your data,<br />
              <span className="accent">not your mood.</span>
            </h2>
          </div>
          <div className="grid-3">
            <DarkCard title="Daily Insight" body="Your readiness isn't just a number. We tell you why your score is what it is, what changed since yesterday, and what kind of training fits today." delay="" />
            <DarkCard title="Adaptive Workouts" body="When your coach pushes a heavy session and your readiness is low, we adjust on the fly — keeping the goal of the session intact while protecting you from injury." delay="delay-1" />
            <DarkCard title="Pattern Recognition" body="Over weeks and months, we surface patterns you'd never catch. “Your HRV drops 12% in the 48 hours after games.” “You sleep best when you eat dinner before 7pm.”" delay="delay-2" />
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="section-inner">
          <div className="section-narrow" style={{ textAlign: 'center', marginBottom: 58 }}>
            <h2 className="title reveal" style={{ color: 'var(--text-dark)' }}>Everything in one place.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20 }}>
            <PillarCard title="Daily Dashboard" body="Your score, inputs, and training recommendation before the day starts." type="dashboard" delay="" />
            <PillarCard title="Workout Mode" body="Log sets, reps, load, and how the session actually felt." type="workout" delay="delay-1" />
            <PillarCard title="Progress Tracking" body="Watch readiness, training load, and recovery patterns move over time." type="progress" delay="delay-2" />
            <PillarCard title="Coach Connect" body="Share snapshots when you need help deciding how hard to train." type="coach" delay="delay-3" />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-inner">
          <div className="section-narrow" style={{ textAlign: 'center', marginBottom: 58 }}>
            <div className="eyebrow reveal" style={{ color: 'var(--maroon-bright)' }}>Pricing</div>
            <h2 className="title reveal delay-1">
              Start free. Upgrade<br />
              <span className="accent">when you&apos;re ready.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
            <PriceCard name="Free" price="$0" items={['Daily readiness score', 'Basic workout logging', '30-day history', 'Use your existing wearable']} />
            <PriceCard featured name="Pro" price="$9.99/mo" items={['Everything in Free', '4Ward band included (or BYO wearable)', 'Adaptive AI workouts', 'Unlimited history', 'Advanced patterns and insights', 'Priority support']} />
          </div>
          <div className="body reveal delay-2" style={{ textAlign: 'center', marginTop: 18 }}>$89/year available on Pro.</div>
        </div>
      </section>

      <section className="section section-light">
        <div className="section-narrow">
          <div className="eyebrow reveal">FAQ</div>
          <h2 className="title reveal delay-1" style={{ color: 'var(--text-dark)', marginBottom: 34 }}>Good questions.</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            <FAQItem question="Do I need a 4Ward band, or can I use my Apple Watch / Whoop / Garmin / Oura?" answer="You can start with your existing wearable when supported. The 4Ward band is for athletes who want the cleanest setup without buying into another expensive ecosystem." />
            <FAQItem question="How is this different from Whoop?" answer="Whoop is built for individual health and lifestyle tracking. 4Ward is built around training decisions: push, hold, or back off, with workout context tied to recovery." />
            <FAQItem question="What if my school already uses 4Ward?" answer="Great. Your individual account can connect into that team environment when your coach enables it." />
            <FAQItem question="Is my data private?" answer="Yes. Your data is treated as performance data, not public content. You control what gets shared outside your account." />
            <FAQItem question="Can my coach see my data?" answer="Only when you are connected to a team or choose to share it. Individual use stays individual." />
          </div>
        </div>
      </section>

      <section className="section section-dark" style={{ textAlign: 'center' }}>
        <div className="section-narrow reveal">
          <h2 className="display" style={{ marginBottom: 34 }}>
            Train with intent.<br />
            <span className="accent">Starting today.</span>
          </h2>
          <a href="/signup" className="btn btn-primary">Start Free →</a>
          <div className="body" style={{ marginTop: 18 }}>No credit card. No hardware required to start.</div>
        </div>
      </section>
    </>
  )
}
