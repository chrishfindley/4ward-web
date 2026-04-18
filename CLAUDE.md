# 4Ward — Project Context for Claude

This file is the source of truth for any Claude instance working on this repo. Read it before doing anything.

---

## Who I am

I'm Chris Findley, founder of 4Ward. 13 years as a high school strength & conditioning coach and math teacher in Fort Worth, TX. BS Exercise Science, MS Human Performance. I'm also head coach for the Gadsden City Titans basketball program — that's the beta partner.

GitHub: `chrishfindley`
Repo: `github.com/chrishfindley/4ward-web`
Live site: `4wardperformance.com`
Deployment: Vercel auto-deploys on push to `main`

## How to talk to me

- Radical honesty. No hedging. Tell me when I'm wrong or about to waste money.
- Profanity-natural. Don't censor the response for my benefit.
- Short confirmations are fine. Don't pad responses.
- When I push back on something, check if I'm right before defending the original position.
- I change my mind often during iteration. That's the process, not a problem.

---

## What 4Ward is

Athlete performance platform for high school strength & conditioning programs. Launching summer 2026.

**The product:**
- White-label smart band (JCVital 2208A OEM from J-Style, Shenzhen) tracking HRV, sleep, RHR, SpO2
- iOS/Android athlete app + coach dashboard
- Proprietary 4WRI (4Ward Recovery Index) — daily readiness score per athlete
- Live Workout Mode for lifting (prototype at /public/prototype/workout.html)
- Phase 2: GPS pod for external load

**The pitch:** Same recovery science WHOOP uses, built for coaches managing rosters, priced for high school budgets.

**Positioning vs competitors:**
- WHOOP: individual consumer, expensive, no coach dashboard
- Catapult: pro/D1 external load, way too expensive for HS
- 4Ward: WHOOP-tier internal load science + coach-first design + HS-affordable economics

---

## 4WRI v2 formula

HRV (30%) + Sleep (25%) + RHR (15%) + Wellness subjective (20%) + Load ACWR (10%)

Based on:
- Milewski 2014 (J. Pediatric Orthopaedics) — HS sleep <8hrs → 1.7× injury risk
- Watson 2017 (BJSM) — wellness + training load predict youth injury/illness
- Saw 2016 (BJSM systematic review) — subjective measures match/beat objective biomarkers
- Plews & Buchheit 2012 (IJSPP) — 7-day rolling HRV > single-day
- Mah 2011 (SLEEP) — Stanford basketball sleep extension study

Nocturnal HRV captured during deep sleep — cleanest physiological window, same approach as WHOOP.

---

## Hardware

**Confirmed supplier: JCVital 2208A from J-Style / Jointcorp (Shenzhen)**

Specs:
- Screenless (LED indicator only)
- HR + SpO2 PPG sensor, skin temp sensor, 3D accelerometer
- IP68, 5ATM, 95mAh battery, 7+ day life
- BLE 5.0 + OTA firmware
- 30-day onboard data memory
- HRV output via SDK — needs confirmation that RMSSD is accessible via BLE GATT (not just cloud API)
- ISO 13485 factory, CE/FCC/RoHS certified

**Validation plan:** Order 2-3 Polar H10 chest straps (~$90 each). Wear simultaneously with 2208A on 5-10 Gadsden City athletes for 14 nights. Target RMSSD correlation r > 0.85 against research-grade ECG. This becomes the moat — published validation data WHOOP/Oura don't have for HS-tier pricing.

**Legal positioning:** Wellness/performance tool. Not a medical device. Same positioning as Fitbit/WHOOP. Never use diagnostic language. FERPA addressed via parent consent at onboarding.

---

## Pricing — NOT LOCKED

Current thinking is a team-tier subscription with first-10 founding schools locked in at a discount. The specific dollar amounts are in flux. Ask me before generating pricing pages or marketing that quotes prices.

---

## Tech stack

- Next.js (App Router)
- TypeScript, inline styles (no Tailwind — everything in-file JSX styles)
- Supabase (auth + Postgres) — not wired up yet, planned
- Vercel (auto-deploy on push to main)
- Hosted at 4wardperformance.com

**Key files:**
- `app/page.tsx` — homepage
- `app/science/page.tsx` — science page
- `app/story/page.tsx` — founder story page
- `app/gadsden-city-hoops/page.tsx` — the GCity demo page (customer-facing, do not break)
- `app/globals.css` — design system
- `components/Logo.tsx` — shared logo with maroon chevron
- `public/prototype/workout.html` — workout mode prototype (standalone HTML, not JSX)

---

## Brand & design system

**Palette — LOCKED:**
- Cardinal Maroon `#7B1020` — primary, buttons, logo
- Brighter maroon `#A8253A` — small text on black (18px and under)
- Silver `#A8A9AD` — secondary text
- Light silver `#D4D5D8` — body text on dark
- Silver dark `#606265` — muted text on light
- Black `#080809` — dark sections
- Charcoal `#141518` — alt dark sections
- Off-white `#F5F5F2` — text on dark, subtle accents
- Paper `#FAFAF7` — light sections

**Status colors — SEMANTIC, DO NOT CHANGE:**
- `#2ECC8A` green — READY/OPTIMAL
- `#F5B820` gold — MODERATE
- `#FB923C` orange — ELEVATED (warning)
- `#7C6FE0` purple — RECOVERY NEEDED

**Do not use:**
- Orange `#F26419` (old brand color, fully removed)
- Any shade of orange except `#FB923C` for the ELEVATED status

**Typography:**
- Bebas Neue — display, title, hero type
- Barlow Condensed — eyebrows, UI labels, buttons
- Barlow — body text

**Design rules:**
- Alternate section backgrounds (dark → light → dark → light) for visual rhythm
- Max 4 type sizes on a page (display / title / body-lg / body)
- Maroon usage restraint — primary CTA, logo, one accent word per section, status indicators only
- Massive whitespace between sections (clamp 80-160px vertical)
- Scroll-triggered fade-ins via IntersectionObserver (already built into globals.css `.reveal` class)

---

## Current state of each page

- **Homepage** (`app/page.tsx`) — Phase 1 redesign complete. Alternating dark/light sections, reduced maroon, reveal animations. Live on main.
- **Science page** (`app/science/page.tsx`) — Phase 1 redesign complete.
- **Story page** (`app/story/page.tsx`) — Phase 1 redesign complete.
- **Gadsden City page** (`app/gadsden-city-hoops/page.tsx`) — Customer-facing demo page. Uses its own inline styling, not the global system. Works well as-is. Be cautious about breaking it during global changes.
- **Workout mode prototype** — standalone HTML at `/public/prototype/workout.html`. Maroon palette, horizontal swipe picker, cancel button. Responsive. Live at `4wardperformance.com/prototype/workout.html`.

---

## Known issues to fix next

1. Mobile nav overlaps hero text on phone viewports — content needs top-padding equal to nav height
2. Comparison table disappears into horizontal-scroll void on narrow screens — needs fade hint or reflow
3. Reveal animations occasionally don't trigger on fast mobile scrolls
4. Hero display type wraps "RESEARCH-PROVEN DATA" awkwardly on mid-width viewports

---

## Deployment workflow

```bash
# Make changes, then:
git add . && git commit -m "v## brief description" && git push origin main
```

Vercel auto-deploys in ~60 seconds. No preview branches unless specifically requested — push straight to main and iterate from there.

Commit message convention: `v<number>: <short description>` (we're on v13+ currently)

---

## Things to avoid

- Don't use the word "diagnostic" or anything medical-sounding (legal positioning)
- Don't reference FERPA risk in public-facing copy (it's addressed via parent consent, we don't need to open the conversation)
- Don't commit GitHub tokens to the repo
- Don't create new dependencies (npm install) without asking — the stack is intentionally minimal
- Don't rewrite the Gadsden City page without explicit confirmation
- Don't add orange anywhere except the `#FB923C` status color
- Don't hedge. Don't pad. Don't over-apologize when something fails — just fix it.

---

## What's next / upcoming work

- Workout mode build-out (React Native via Expo, post-prototype)
- Supabase wiring for auth + athlete/coach data
- Validation study with Polar H10 + JCVital 2208A (May/June 2026)
- Sales outreach: cold AD conversations, 2-3 per week
- Possibly: Framer rebuild of marketing site for faster iteration cycle (under consideration)

