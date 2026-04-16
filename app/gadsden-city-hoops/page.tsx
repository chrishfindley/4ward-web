import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4WARD × Gadsden City Titans Basketball",
  description: "Science-based athlete monitoring for Titan Basketball — HRV, sleep, readiness data that changes how you train.",
};

/* ── SVG Titans Double-T Mark ────────────────────────────────── */
function TitansMark({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lightning bolt slash */}
      <path d="M72 8 L42 58 L58 58 L38 112 L82 52 L64 52 Z" fill="#606265" opacity="0.7"/>
      {/* Left T bar */}
      <rect x="8" y="14" width="44" height="14" rx="2" fill="#9B1B2A"/>
      {/* Left T stem */}
      <rect x="22" y="28" width="16" height="70" rx="2" fill="#9B1B2A"/>
      {/* Right T bar */}
      <rect x="52" y="14" width="60" height="14" rx="2" fill="#9B1B2A"/>
      {/* Right T stem */}
      <rect x="74" y="28" width="16" height="70" rx="2" fill="#9B1B2A"/>
      {/* Silver outline accents */}
      <rect x="8" y="14" width="44" height="3" rx="1" fill="#A8A9AD" opacity="0.5"/>
      <rect x="52" y="14" width="60" height="3" rx="1" fill="#A8A9AD" opacity="0.5"/>
    </svg>
  );
}

/* ── 4Ward Logo ──────────────────────────────────────────────── */
function FourWardMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size * 2.2} height={size} viewBox="0 0 88 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="26" fontFamily="'Bebas Neue', sans-serif" fontSize="30" letterSpacing="2" fill="white">
        <tspan fill="#F26419">4</tspan>WARD
      </text>
      {/* chevron */}
      <polyline points="78,8 85,16 78,24" stroke="#A8A9AD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export default function GadsdenCityHoopsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');
        .gc-root *,
        .gc-root *::before,
        .gc-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .gc-root {
          background: #080809;
          color: #F5F5F2;
          font-family: 'Barlow', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }
        /* nav override — hide site nav on this page */
        header, nav { display: none !important; }

        /* ── TOKENS ── */
        .gc-root { --c: #9B1B2A; --cl: #C42535; --cd: #6B0F1A; --s: #A8A9AD; --sd: #606265; --sl: #D4D5D8; --blk: #080809; --n: #111214; --su: #181A1C; --su2: #1E2022; --w: #F5F5F2; --ln: #1A1A1E; }

        /* ── TOP BAR ── */
        .gc-bar {
          position: sticky; top: 0; z-index: 50;
          background: #080809;
          border-bottom: 1px solid #1A1A1E;
          padding: 14px clamp(20px,5vw,60px);
          display: flex; justify-content: space-between; align-items: center;
        }
        .gc-bar-left { display: flex; align-items: center; gap: 16px; }
        .gc-divider { width: 1px; height: 28px; background: #1A1A1E; }
        .gc-school-name { font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 4px; color: #606265; }
        .gc-school-team { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 3px; color: #C42535; line-height: 1; }
        .gc-founding { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 10px; letter-spacing: 4px; color: #C42535; display: flex; align-items: center; gap: 8px; }
        .gc-dot { width: 6px; height: 6px; background: #C42535; border-radius: 50%; animation: gc-blink 2s infinite; }
        @keyframes gc-blink { 0%,100%{opacity:1}50%{opacity:.3} }

        /* ── HERO ── */
        .gc-hero {
          min-height: 92vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: clamp(60px,10vw,120px) clamp(20px,6vw,80px) clamp(60px,8vw,100px);
          position: relative; overflow: hidden;
        }
        .gc-hero-slash {
          position: absolute; top: -10%; right: -8%;
          width: 48%; height: 120%;
          background: #6B0F1A;
          transform: skewX(-10deg);
          opacity: 0.14; z-index: 0;
        }
        .gc-hero-wm {
          position: absolute; top: 50%; right: clamp(-60px,-8vw,-20px);
          transform: translateY(-50%);
          opacity: 0.04; z-index: 0; pointer-events: none;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(240px,32vw,480px);
          color: #9B1B2A; line-height: 1;
          white-space: nowrap;
        }
        .gc-hero-stripe {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #9B1B2A, #A8A9AD 50%, #9B1B2A);
        }
        .gc-hero-content { position: relative; z-index: 2; max-width: 820px; }
        .gc-eyebrow {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 11px; letter-spacing: 6px; color: #C42535;
          text-transform: uppercase; margin-bottom: 20px;
        }
        .gc-h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(64px,11vw,130px);
          line-height: 0.87; color: #F5F5F2;
          margin-bottom: clamp(20px,3vw,32px);
        }
        .gc-h1 .s { color: #A8A9AD; }
        .gc-h1 .r { color: #C42535; }
        .gc-hero-body {
          font-size: clamp(15px,2vw,19px);
          color: rgba(245,245,242,0.65);
          line-height: 1.8; font-weight: 500;
          max-width: 620px;
          margin-bottom: clamp(36px,5vw,56px);
        }
        .gc-hero-body strong { color: #F5F5F2; }
        .gc-kpis { display: flex; flex-wrap: wrap; gap: clamp(24px,4vw,56px); }
        .gc-kpi-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(40px,6vw,60px); color: #C42535; line-height: 1; margin-bottom: 4px;
        }
        .gc-kpi-lbl {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 10px; letter-spacing: 2px; color: #606265;
          text-transform: uppercase; max-width: 120px; line-height: 1.4;
        }

        /* ── SECTION BASE ── */
        .gc-sec {
          padding: clamp(60px,10vw,100px) clamp(20px,6vw,80px);
          border-top: 1px solid #1A1A1E;
        }
        .gc-sec-inner { max-width: 1100px; margin: 0 auto; }
        .gc-sec.dark { background: #111214; }
        .gc-sec.cardinal { background: #6B0F1A; }
        .gc-lbl {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 10px; letter-spacing: 6px; color: #C42535;
          text-transform: uppercase; margin-bottom: 14px;
        }
        .gc-lbl.silver { color: rgba(245,245,242,0.4); }
        .gc-h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px,6vw,72px); line-height: 0.9;
          margin-bottom: 20px;
        }
        .gc-h2 .s { color: #A8A9AD; }
        .gc-h2 .r { color: #C42535; }
        .gc-h2 .w { color: #F5F5F2; }
        .gc-body {
          font-size: clamp(14px,1.8vw,16px); color: #888;
          line-height: 1.85; font-weight: 500; max-width: 660px;
        }

        /* ── SCIENCE CARDS ── */
        .gc-stats {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr));
          gap: 2px; margin-top: clamp(32px,5vw,52px);
        }
        .gc-stat {
          padding: clamp(28px,4vw,44px) clamp(20px,3vw,36px);
          background: #181A1C; border-top: 3px solid #9B1B2A;
        }
        .gc-stat:nth-child(2) { background: #1E2022; border-top-color: #A8A9AD; }
        .gc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(64px,9vw,96px); line-height: 0.82; margin-bottom: 12px;
          color: #C42535;
        }
        .gc-stat:nth-child(2) .gc-stat-num { color: #D4D5D8; }
        .gc-stat-hed {
          font-family: 'Bebas Neue', sans-serif; font-size: clamp(17px,2.2vw,22px);
          letter-spacing: 1px; color: #F5F5F2; margin-bottom: 10px;
        }
        .gc-stat-body { font-size: 13px; color: #666; line-height: 1.75; margin-bottom: 10px; }
        .gc-stat-cite {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 10px; letter-spacing: 1px; color: #2a2a2a; text-transform: uppercase;
        }

        /* ── SIGNAL SECTION ── */
        .gc-signal-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 2px; margin-top: clamp(28px,4vw,44px);
        }
        @media(max-width:680px) { .gc-signal-grid { grid-template-columns: 1fr; } }
        .gc-panel {
          background: #1E2022; padding: clamp(20px,3vw,32px);
        }
        .gc-panel.light { background: #181A1C; border-top: 2px solid #606265; }
        .gc-panel.hot { border-top: 2px solid #9B1B2A; }
        .gc-panel-lbl {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 10px; letter-spacing: 4px; color: #606265;
          text-transform: uppercase; margin-bottom: 14px;
        }
        .gc-panel-lbl.red { color: #C42535; }
        .gc-panel-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(18px,3vw,26px); letter-spacing: 1px;
          color: #A8A9AD; line-height: 1; margin-bottom: 18px;
        }
        .gc-panel-title.w { color: #F5F5F2; }
        .gc-athletes { display: flex; flex-direction: column; gap: 5px; }
        .gc-athlete {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 10px; background: #111214; border-radius: 3px;
        }
        .gc-ascore {
          font-family: 'Bebas Neue', sans-serif; font-size: 22px; line-height: 1; min-width: 36px;
        }
        .gc-aname {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 12px; letter-spacing: 1px; color: #F5F5F2; flex: 1;
        }
        .gc-atag {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 10px; letter-spacing: 2px; white-space: nowrap;
        }
        .gc-actions { display: flex; flex-direction: column; gap: 8px; }
        .gc-action {
          padding: 10px 14px; border-left: 2px solid #9B1B2A;
          background: rgba(155,27,42,0.1);
        }
        .gc-action.mod { border-left-color: #606265; background: rgba(96,98,101,0.08); }
        .gc-action-who {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 11px; letter-spacing: 2px; color: #C42535; margin-bottom: 3px;
        }
        .gc-action-who.s { color: #A8A9AD; }
        .gc-action-what { font-size: 12px; color: #A8A9AD; line-height: 1.55; }
        .gc-callout {
          border-left: 3px solid #9B1B2A; padding: 20px 24px;
          background: #111214; margin-top: 2px;
        }
        .gc-callout-lbl {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 10px; letter-spacing: 4px; color: #C42535; margin-bottom: 6px;
        }
        .gc-callout-txt { font-size: 14px; color: #A8A9AD; line-height: 1.7; }
        .gc-callout-txt strong { color: #F5F5F2; }

        /* ── DASHBOARD ── */
        .gc-mock {
          background: #0D0F10; border: 1px solid #1e2022;
          border-radius: 6px; overflow: hidden; margin-top: clamp(28px,4vw,44px);
        }
        .gc-mhdr {
          background: #111314; padding: clamp(12px,2vw,18px) clamp(14px,2vw,24px);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 8px; border-bottom: 1px solid #1A1A1E;
        }
        .gc-mtitle {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 11px; letter-spacing: 3px; color: #A8A9AD; text-transform: uppercase;
        }
        .gc-mdate {
          font-family: 'Bebas Neue', sans-serif; font-size: 17px; color: #F5F5F2; margin-top: 2px;
        }
        .gc-sync {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 2px;
          color: #2ECC8A; background: rgba(46,204,138,.07); border: 1px solid rgba(46,204,138,.18);
          border-radius: 3px; padding: 4px 10px;
        }
        .gc-mbody { padding: 10px; display: flex; flex-direction: column; gap: 4px; }
        .gc-arow {
          display: flex; align-items: center; gap: clamp(10px,2vw,16px);
          padding: clamp(9px,1.5vw,13px) clamp(10px,1.5vw,15px);
          background: #111314; border-radius: 3px;
        }
        .gc-asc {
          font-family: 'Bebas Neue', sans-serif; font-size: clamp(24px,4vw,34px);
          line-height: 1; min-width: clamp(32px,5vw,44px);
        }
        .gc-ainf { flex: 1; min-width: 0; }
        .gc-anm {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: clamp(11px,1.8vw,13px); letter-spacing: 1px; color: #F5F5F2;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .gc-ainp { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 2px; }
        .gc-inp {
          font-family: 'Barlow Condensed', sans-serif; font-size: 11px; letter-spacing: 1px; color: #444;
        }
        .gc-ast {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 11px; letter-spacing: 2px; white-space: nowrap;
        }
        .gc-zrow {
          padding: 10px 14px; display: flex; flex-wrap: wrap; gap: 6px;
          border-top: 1px solid #1A1A1E;
        }
        .gc-zpill {
          padding: 4px 9px; border-radius: 3px;
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 10px; letter-spacing: 1px;
        }

        /* ── FORMULA ── */
        .gc-formula {
          background: #111214; border: 1px solid #1A1A1E;
          padding: clamp(24px,4vw,40px); margin-top: clamp(28px,4vw,44px);
        }
        .gc-formula-lbl {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 10px; letter-spacing: 5px; color: #C42535;
          text-transform: uppercase; margin-bottom: 20px;
        }
        .gc-formula-eq {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(18px,3vw,28px); color: #F5F5F2; letter-spacing: 2px;
          line-height: 1.4; margin-bottom: 20px; word-break: break-word;
        }
        .gc-formula-eq .r { color: #C42535; }
        .gc-formula-eq .s { color: #A8A9AD; }
        .gc-formula-inputs {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 2px;
        }
        .gc-fi {
          padding: 14px 16px; background: #1A1A1C;
        }
        .gc-fi-pct {
          font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: #C42535; line-height: 1;
        }
        .gc-fi:nth-child(2) .gc-fi-pct { color: #C42535; }
        .gc-fi:nth-child(3) .gc-fi-pct { color: #A8A9AD; }
        .gc-fi:nth-child(4) .gc-fi-pct { color: #A8A9AD; }
        .gc-fi-name {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 11px; letter-spacing: 2px; color: #606265;
          text-transform: uppercase; margin-top: 2px;
        }
        .gc-fi-desc { font-size: 11px; color: #444; margin-top: 4px; line-height: 1.5; }

        /* ── PROGRAMS TABLE ── */
        .gc-programs { margin-top: clamp(24px,4vw,40px); position: relative; z-index: 2; }
        .gc-prog-row {
          display: flex; align-items: center; gap: 12px;
          padding: clamp(11px,2vw,15px) clamp(14px,2vw,18px);
          background: rgba(0,0,0,0.28); border-left: 2px solid rgba(196,37,53,0.5);
          margin-bottom: 2px;
        }
        .gc-prog-name {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: clamp(11px,1.8vw,13px); letter-spacing: 2px; color: #F5F5F2;
          flex: 1; text-transform: uppercase;
        }
        .gc-prog-count {
          font-family: 'Bebas Neue', sans-serif; font-size: clamp(16px,2.5vw,22px); color: #D4D5D8;
        }
        .gc-prog-total {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 10px; padding: clamp(12px,2vw,16px) clamp(14px,2vw,18px);
          background: rgba(155,27,42,0.5); border: 1px solid rgba(196,37,53,0.35); margin-top: 2px;
        }
        .gc-pt-lbl {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 11px; letter-spacing: 3px; color: rgba(255,255,255,.4); text-transform: uppercase;
        }
        .gc-pt-note {
          font-family: 'Barlow Condensed', sans-serif; font-size: 10px; letter-spacing: 1px;
          color: rgba(255,255,255,.22); margin-top: 3px; text-transform: uppercase; font-weight: 700;
        }
        .gc-pt-val {
          font-family: 'Bebas Neue', sans-serif; font-size: clamp(20px,3.5vw,30px); color: #F5F5F2;
        }

        /* ── CTA ── */
        .gc-cta { text-align: center; padding: clamp(80px,12vw,140px) clamp(20px,6vw,80px); }
        .gc-cta-hed {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px,10vw,108px); line-height: 0.88; margin-bottom: 24px;
        }
        .gc-cta-body { font-size: clamp(14px,1.8vw,17px); color: #666; line-height: 1.85; margin-bottom: 36px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .gc-cta-who { font-family: 'Bebas Neue', sans-serif; font-size: clamp(18px,3vw,26px); color: #F5F5F2; letter-spacing: 2px; }
        .gc-cta-detail { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 2px; color: #606265; margin-top: 4px; }
        .gc-cta-site { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 2px; color: #C42535; margin-top: 2px; }

        /* ── FOOTER ── */
        .gc-footer {
          border-top: 1px solid #1A1A1E;
          padding: clamp(16px,3vw,24px) clamp(20px,6vw,80px);
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;
        }
        .gc-fb { font-family: 'Bebas Neue', sans-serif; font-size: 17px; letter-spacing: 2px; color: #282828; }
        .gc-fb .r { color: #9B1B2A; }
        .gc-ft { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 10px; letter-spacing: 3px; color: #1e1e1e; text-transform: uppercase; }

        @media(max-width:600px) {
          .gc-ti { flex-direction: column; gap: 24px; }
        }
      `}</style>

      <div className="gc-root">

        {/* TOP BAR */}
        <div className="gc-bar">
          <div className="gc-bar-left">
            <svg width="80" height="24" viewBox="0 0 88 28" fill="none">
              <text x="0" y="22" fontFamily="'Bebas Neue', sans-serif" fontSize="26" letterSpacing="2" fill="white">
                <tspan fill="#F26419">4</tspan>WARD
              </text>
            </svg>
            <div className="gc-divider"/>
            <div>
              <div className="gc-school-name">GADSDEN CITY</div>
              <div className="gc-school-team">TITANS</div>
            </div>
          </div>
          <div className="gc-founding">
            <div className="gc-dot"/>
            PROPOSED FOUNDING PARTNER · PROGRAM #1
          </div>
        </div>

        {/* HERO */}
        <div className="gc-hero">
          <div className="gc-hero-slash"/>
          <div className="gc-hero-wm" aria-hidden>TITANS</div>
          <div className="gc-hero-stripe"/>
          <div className="gc-hero-content">
            <div className="gc-eyebrow">Athlete Performance Platform · Basketball</div>
            <div className="gc-h1">
              23 WINS.<br/>
              <span className="s">ONE BLIND</span><br/>
              <span className="r">SPOT.</span>
            </div>
            <div className="gc-hero-body">
              Titan Basketball went 23-2 this season. The data to protect that roster — sleep, recovery, autonomic readiness — exists. <strong>Every morning before practice, 4Ward shows you exactly which athletes can be pushed and which ones need to be managed.</strong> Not a gut call. A score backed by peer-reviewed research.
            </div>
            <div className="gc-kpis">
              <div>
                <div className="gc-kpi-num">23-2</div>
                <div className="gc-kpi-lbl">Titan Boys Basketball 2025-26</div>
              </div>
              <div>
                <div className="gc-kpi-num">6A</div>
                <div className="gc-kpi-lbl">AHSAA — Highest Level</div>
              </div>
              <div>
                <div className="gc-kpi-num">#1</div>
                <div className="gc-kpi-lbl">First Program in Alabama on 4Ward</div>
              </div>
            </div>
          </div>
        </div>

        {/* SCIENCE */}
        <div className="gc-sec dark">
          <div className="gc-sec-inner">
            <div className="gc-lbl">Peer-Reviewed Evidence</div>
            <div className="gc-h2">THE SCIENCE<br/><span className="s">YOUR PROGRAM</span><br/><span className="r">IS MISSING.</span></div>
            <div className="gc-body">This research has been published for over a decade. It applies directly to high school basketball programs. No one built the tools to act on it — until now.</div>
            <div className="gc-stats">
              <div className="gc-stat">
                <div className="gc-stat-num">1.7×</div>
                <div className="gc-stat-hed">MORE LIKELY TO GET HURT.</div>
                <div className="gc-stat-body">Athletes sleeping under 8 hours are 1.7 times more likely to sustain a sports injury — controlling for sport, grade level, and training volume. When poor sleep combines with a spike in training load, that hazard ratio climbs to 2.25×. Your athletes don&apos;t tell you they slept 4 hours the night before a hard practice. The band does.</div>
                <div className="gc-stat-cite">Milewski et al. — J. Pediatric Orthopaedics, 2014 · Von Rosen et al. — Scand. J. Med. Sci. Sports, 2017</div>
              </div>
              <div className="gc-stat">
                <div className="gc-stat-num">25%</div>
                <div className="gc-stat-hed">FEWER HARD SESSIONS. BETTER OUTCOMES.</div>
                <div className="gc-stat-body">Athletes in HRV-guided training programs performed 25% fewer high-intensity sessions than teams on fixed programs — and outperformed them. Negative responders (athletes who got worse): 11% in data-guided groups vs. 50% in fixed programs. Less hard work on the wrong days means more adaptation from the right ones.</div>
                <div className="gc-stat-cite">Vesterinen et al. — Med. Sci. Sports Exerc., 2016 · Manresa-Rocamora et al. — IJERPH, 2021</div>
              </div>
              <div className="gc-stat">
                <div className="gc-stat-num">5%</div>
                <div className="gc-stat-hed">FASTER SPRINTS. NOTHING ELSE CHANGED.</div>
                <div className="gc-stat-body">Stanford varsity basketball players who extended sleep by two hours improved sprint speed by 5%, free throw percentage by 9%, and three-point shooting by 9.2% — with zero changes to training. Sleep is not passive recovery. It is the adaptation. 4Ward makes it measurable and coachable for the first time at the high school level.</div>
                <div className="gc-stat-cite">Mah et al. — Sleep Journal, 2011 · Stanford Sleep Lab</div>
              </div>
            </div>
          </div>
        </div>

        {/* SIGNAL */}
        <div className="gc-sec">
          <div className="gc-sec-inner">
            <div className="gc-lbl">The Platform in Action</div>
            <div className="gc-h2">THE SIGNAL<br/><span className="s">IS ALREADY THERE.</span></div>
            <div className="gc-body">High-stakes stretches — tournament weeks, back-to-back travel, rivalry games — create physiological stress your athletes carry into practice whether you can see it or not. HRV drops. Sleep fragments. Resting heart rate climbs. 4Ward shows you who is carrying that load before the first drill.</div>
            <div className="gc-signal-grid" style={{marginTop: "clamp(28px,4vw,44px)"}}>
              <div className="gc-panel light">
                <div className="gc-panel-lbl">What the data shows</div>
                <div className="gc-panel-title">GAME-WEEK WEDNESDAY</div>
                <div className="gc-athletes">
                  <div className="gc-athlete">
                    <div className="gc-ascore" style={{color:"#7C6FE0"}}>38</div>
                    <div className="gc-aname">J. HARRIS · PG</div>
                    <div className="gc-atag" style={{color:"#7C6FE0"}}>RECOVERY</div>
                  </div>
                  <div className="gc-athlete">
                    <div className="gc-ascore" style={{color:"#FB923C"}}>54</div>
                    <div className="gc-aname">M. JOHNSON · SF</div>
                    <div className="gc-atag" style={{color:"#FB923C"}}>ELEVATED</div>
                  </div>
                  <div className="gc-athlete">
                    <div className="gc-ascore" style={{color:"#7C6FE0"}}>41</div>
                    <div className="gc-aname">D. THOMAS · PF</div>
                    <div className="gc-atag" style={{color:"#7C6FE0"}}>RECOVERY</div>
                  </div>
                  <div className="gc-athlete">
                    <div className="gc-ascore" style={{color:"#FB923C"}}>61</div>
                    <div className="gc-aname">A. WILLIAMS · SG</div>
                    <div className="gc-atag" style={{color:"#FB923C"}}>ELEVATED</div>
                  </div>
                  <div className="gc-athlete">
                    <div className="gc-ascore" style={{color:"#2ECC8A"}}>88</div>
                    <div className="gc-aname">T. WORTHY · C</div>
                    <div className="gc-atag" style={{color:"#2ECC8A"}}>OPTIMAL</div>
                  </div>
                </div>
              </div>
              <div className="gc-panel hot">
                <div className="gc-panel-lbl red">What you do with it</div>
                <div className="gc-panel-title w">COACH&apos;S CALL</div>
                <div className="gc-actions">
                  <div className="gc-action">
                    <div className="gc-action-who">HARRIS + THOMAS</div>
                    <div className="gc-action-what">Recovery day. Skill work, film, shooting. No live defense. Protect the legs before game day.</div>
                  </div>
                  <div className="gc-action">
                    <div className="gc-action-who">JOHNSON + WILLIAMS</div>
                    <div className="gc-action-what">Reduced intensity. No max sprints. Controlled contact only. Monitor during session.</div>
                  </div>
                  <div className="gc-action mod">
                    <div className="gc-action-who s">WORTHY</div>
                    <div className="gc-action-what">Full session as prescribed. Check in post-practice.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gc-callout">
              <div className="gc-callout-lbl">What this changes</div>
              <div className="gc-callout-txt">You still practice. The work still gets done. But <strong>you are not hammering athletes who cannot absorb it</strong> — and you are not guessing which ones those are. The adjustment takes 30 seconds. The difference it makes could be a season.</div>
            </div>
          </div>
        </div>

        {/* DASHBOARD */}
        <div className="gc-sec dark">
          <div className="gc-sec-inner">
            <div className="gc-lbl">The Coach Dashboard</div>
            <div className="gc-h2">YOUR ROSTER.<br/><span className="s">EVERY MORNING.</span><br/><span className="r">BEFORE PRACTICE.</span></div>
            <div className="gc-body">Athletes wear the band overnight. Data syncs automatically. You walk into the gym already knowing — no check-ins, no questionnaires, no guesswork. One screen, every player, every day.</div>
            <div className="gc-mock">
              <div className="gc-mhdr">
                <div>
                  <div className="gc-mtitle">Coach Dashboard · Gadsden City Basketball</div>
                  <div className="gc-mdate">THURSDAY · PRE-PRACTICE</div>
                </div>
                <div className="gc-sync">12 ATHLETES SYNCED</div>
              </div>
              <div className="gc-mbody">
                <div className="gc-arow" style={{borderLeft:"2px solid #2ECC8A"}}>
                  <div className="gc-asc" style={{color:"#2ECC8A"}}>91</div>
                  <div className="gc-ainf">
                    <div className="gc-anm">T. WORTHY · C · #34</div>
                    <div className="gc-ainp"><span className="gc-inp">HRV ↑</span><span className="gc-inp">SLEEP 8.9h</span><span className="gc-inp">RHR ↓</span></div>
                  </div>
                  <div className="gc-ast" style={{color:"#2ECC8A"}}>OPTIMAL</div>
                </div>
                <div className="gc-arow" style={{borderLeft:"2px solid #F5B820"}}>
                  <div className="gc-asc" style={{color:"#F5B820"}}>74</div>
                  <div className="gc-ainf">
                    <div className="gc-anm">A. WILLIAMS · SG · #3</div>
                    <div className="gc-ainp"><span className="gc-inp">HRV —</span><span className="gc-inp">SLEEP 7.1h</span><span className="gc-inp">RHR ↑</span></div>
                  </div>
                  <div className="gc-ast" style={{color:"#F5B820"}}>MODERATE</div>
                </div>
                <div className="gc-arow" style={{borderLeft:"2px solid #FB923C"}}>
                  <div className="gc-asc" style={{color:"#FB923C"}}>58</div>
                  <div className="gc-ainf">
                    <div className="gc-anm">M. JOHNSON · SF · #23</div>
                    <div className="gc-ainp"><span className="gc-inp">HRV ↓</span><span className="gc-inp">SLEEP 5.8h</span><span className="gc-inp">RHR ↑↑</span></div>
                  </div>
                  <div className="gc-ast" style={{color:"#FB923C"}}>ELEVATED</div>
                </div>
                <div className="gc-arow" style={{borderLeft:"2px solid #7C6FE0"}}>
                  <div className="gc-asc" style={{color:"#7C6FE0"}}>38</div>
                  <div className="gc-ainf">
                    <div className="gc-anm">J. HARRIS · PG · #1</div>
                    <div className="gc-ainp"><span className="gc-inp">HRV ↓↓</span><span className="gc-inp">SLEEP 4.6h</span><span className="gc-inp">RHR ↑↑</span></div>
                  </div>
                  <div className="gc-ast" style={{color:"#7C6FE0"}}>RECOVERY</div>
                </div>
                <div className="gc-arow" style={{borderLeft:"2px solid #2ECC8A", opacity:0.75}}>
                  <div className="gc-asc" style={{color:"#2ECC8A"}}>88</div>
                  <div className="gc-ainf">
                    <div className="gc-anm">D. THOMAS · PF · #11</div>
                    <div className="gc-ainp"><span className="gc-inp">HRV ↑</span><span className="gc-inp">SLEEP 8.2h</span><span className="gc-inp">RHR —</span></div>
                  </div>
                  <div className="gc-ast" style={{color:"#2ECC8A"}}>OPTIMAL</div>
                </div>
              </div>
              <div className="gc-zrow">
                <div className="gc-zpill" style={{background:"rgba(46,204,138,.08)",color:"#2ECC8A",border:"1px solid rgba(46,204,138,.2)"}}>85–100 OPTIMAL</div>
                <div className="gc-zpill" style={{background:"rgba(245,184,32,.08)",color:"#F5B820",border:"1px solid rgba(245,184,32,.2)"}}>70–84 MODERATE</div>
                <div className="gc-zpill" style={{background:"rgba(251,146,60,.08)",color:"#FB923C",border:"1px solid rgba(251,146,60,.2)"}}>50–69 ELEVATED</div>
                <div className="gc-zpill" style={{background:"rgba(124,111,224,.08)",color:"#7C6FE0",border:"1px solid rgba(124,111,224,.2)"}}>0–49 RECOVERY</div>
              </div>
            </div>

            {/* Formula */}
            <div className="gc-formula">
              <div className="gc-formula-lbl">The 4WRI Score — How It&apos;s Built</div>
              <div className="gc-formula-eq">
                <span className="r">4WRI</span> = <span className="r">HRV</span> ×0.35 + <span className="s">SLEEP</span> ×0.30 + <span className="s">RHR</span> ×0.15 + LOAD ×0.20
              </div>
              <div className="gc-formula-inputs">
                <div className="gc-fi">
                  <div className="gc-fi-pct">35%</div>
                  <div className="gc-fi-name">Heart Rate Variability</div>
                  <div className="gc-fi-desc">Autonomic nervous system recovery — the most sensitive daily readiness marker in the literature</div>
                </div>
                <div className="gc-fi">
                  <div className="gc-fi-pct">30%</div>
                  <div className="gc-fi-name">Sleep Duration &amp; Quality</div>
                  <div className="gc-fi-desc">The single strongest independent predictor of injury in adolescent athletes (Milewski 2014)</div>
                </div>
                <div className="gc-fi">
                  <div className="gc-fi-pct">15%</div>
                  <div className="gc-fi-name">Resting Heart Rate</div>
                  <div className="gc-fi-desc">Compared to each athlete&apos;s personal 7-day rolling baseline — not population averages</div>
                </div>
                <div className="gc-fi">
                  <div className="gc-fi-pct">20%</div>
                  <div className="gc-fi-name">Training Load</div>
                  <div className="gc-fi-desc">Acute:chronic workload ratio — flags dangerous load spikes before injury risk accumulates</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TITANS SECTION */}
        <div className="gc-sec cardinal" style={{position:"relative", overflow:"hidden"}}>
          <div style={{position:"absolute",top:"-20px",right:"-10px",fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(140px,28vw,280px)",color:"rgba(0,0,0,0.18)",lineHeight:1,pointerEvents:"none",userSelect:"none"}}>TITANS</div>
          <div className="gc-sec-inner" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(24px,5vw,72px)",alignItems:"start",position:"relative",zIndex:2}} >
            <div>
              <div className="gc-lbl silver">Built for Gadsden City</div>
              <div className="gc-h2" style={{color:"#F5F5F2"}}>30+ PROGRAMS.<br/>ONE FOUNDING PARTNER.</div>
              <div className="gc-body" style={{color:"rgba(245,245,242,0.65)"}}>Gadsden City competes at the 6A level across more than 30 boys&apos; and girls&apos; programs. As a Founding Partner, every sport locks in founding pricing permanently. Bands included. No per-athlete fees. Rate never changes.</div>
            </div>
            <div>
              <div className="gc-programs">
                {[
                  ["Basketball (Boys)","~15"],
                  ["Basketball (Girls)","~15"],
                  ["Football","~80"],
                  ["Baseball","~20"],
                  ["Softball","~20"],
                  ["Track & Field","~50"],
                  ["Volleyball / Soccer / Wrestling","~20 ea"],
                ].map(([name, count]) => (
                  <div key={name} className="gc-prog-row">
                    <div className="gc-prog-name">{name}</div>
                    <div className="gc-prog-count">{count}</div>
                  </div>
                ))}
                <div className="gc-prog-total">
                  <div>
                    <div className="gc-pt-lbl">Founding Partner Package</div>
                    <div className="gc-pt-note">All programs · Bands included · Locked permanently</div>
                  </div>
                  <div className="gc-pt-val">LET&apos;S TALK</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="gc-cta">
          <div className="gc-lbl" style={{justifyContent:"center",display:"flex"}}>The Offer</div>
          <div className="gc-cta-hed">
            <span style={{color:"#C42535"}}>FIRST</span> IN<br/>
            <span style={{color:"#A8A9AD"}}>ALABAMA.</span>
          </div>
          <div className="gc-cta-body">I&apos;m a high school strength coach who built this because nothing else did what we actually need. Ten minutes, live demo, no deck. I&apos;ll show you the platform on a real roster and tell you straight if it&apos;s not a fit.</div>
          <div className="gc-cta-who">CHRIS FINDLEY · FOUNDER</div>
          <div className="gc-cta-detail">BS Exercise Science · MS Human Performance · 13-Year Coach &amp; Educator</div>
          <div className="gc-cta-site">chris@4wardperformance.com</div>
          <div className="gc-cta-site">4wardperformance.com</div>
        </div>

        {/* FOOTER */}
        <div className="gc-footer">
          <div className="gc-fb"><span className="r">4</span>WARD × TITANS</div>
          <div className="gc-ft">© 2026 4Ward Athlete Performance</div>
          <div className="gc-ft">4wardperformance.com/gadsden-city-hoops</div>
        </div>

      </div>
    </>
  );
}
