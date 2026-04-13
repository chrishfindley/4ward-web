/**
 * 4WRI — 4Ward Recovery Index
 * Core algorithm for athlete readiness scoring
 *
 * Research basis:
 * - HRV: lnRMSSD with 7-day individual baseline (Plews et al. 2012, Buchheit 2014)
 * - Sleep quality correction via HRV when staging is unreliable (Altini & Kinnunen 2021)
 * - Z-score normalization with SWC = 0.5 × within-athlete SD (Plews et al. 2014)
 * - Sleep deprivation → HRV suppression: SMD = 1.15 (meta-analysis 2025)
 * - RHR + HRV combined superior to either alone (Marin-Jimenez et al. 2025)
 * - CV of lnRMSSD for accumulated fatigue: >8-10% = non-functional overreaching
 */

// ─── TYPES ───────────────────────────────────────────────────────────────────

/** Raw data from the band SDK — accept whatever the band provides */
export interface BandReading {
  athleteId: string
  date: string                    // ISO date: "2026-05-01"
  timestamp: number               // Unix ms

  // HRV — accept either raw RMSSD or pre-computed lnRMSSD
  rmssd?: number                  // ms — raw RMSSD from band
  lnRmssd?: number                // if band provides log-transformed directly
  sdnn?: number                   // ms — optional, used as fallback
  pnn50?: number                  // % — optional, improves composite model

  // RHR — morning or overnight minimum
  restingHR: number               // bpm

  // Sleep — PPG staging is unreliable; duration is most accurate
  sleepDurationMinutes: number    // total sleep time in minutes
  sleepEfficiency?: number        // 0-100 — percentage, unreliable from PPG
  deepSleepMinutes?: number       // UNRELIABLE from PPG bands — used cautiously
  remSleepMinutes?: number        // UNRELIABLE from PPG bands — used cautiously
  lightSleepMinutes?: number      // UNRELIABLE from PPG bands
  awakenings?: number             // number of awakenings, also unreliable

  // Optional overnight HRV trajectory (if SDK exposes time-series)
  overnightHrvMean?: number       // mean RMSSD during sleep window
  overnightHrvVariance?: number   // variance — high = fragmented; low SWS = also low
  hrv30minPostSleep?: number      // HRV in first 30min — captures initial vagal surge

  // Device quality flags
  wornDuringSleep?: boolean       // compliance check
  signalQuality?: number          // 0-100 if band provides
}

/** Historical readings used to build individual baseline */
export interface AthleteHistory {
  athleteId: string
  readings: BandReading[]         // most recent first, ideally 14+ days
  calibrated: boolean             // false until 7+ valid readings exist
}

/** Per-metric baseline derived from rolling window */
export interface AthleteBaseline {
  athleteId: string
  windowDays: number              // how many days used (7-14)
  calibrated: boolean

  lnRmssd: { mean: number; sd: number; cv: number }
  restingHR: { mean: number; sd: number }
  sleepDuration: { mean: number; sd: number }

  // 7-day trend (positive = improving, negative = declining)
  lnRmssdTrend: number            // slope per day
  restingHRTrend: number

  // Accumulated fatigue signal
  lnRmssdCv7Day: number           // CV% of lnRMSSD over last 7 days
  // Reference: <3% = stable, 5-6% = functional overreaching, >8-10% = non-functional
}

/** Processed metrics after normalization */
export interface NormalizedMetrics {
  // Raw values
  lnRmssd: number
  restingHR: number
  sleepDurationMinutes: number

  // Z-scores (today vs individual baseline)
  lnRmssdZ: number
  restingHRZ: number
  sleepDurationZ: number

  // Meaningful change flags (Smallest Worthwhile Change = 0.5 × SD)
  lnRmssdChange: 'suppressed' | 'normal' | 'elevated'
  restingHRChange: 'elevated' | 'normal' | 'suppressed'
  sleepChange: 'short' | 'normal' | 'extended'

  // HRV-derived sleep quality correction
  // Overrides unreliable PPG staging when HRV conflicts
  hvSleepQualityEstimate: number        // 0-100, HRV-derived
  stagingReliabilityConfidence: number  // 0-100, how much to trust band staging
  correctedSleepScore: number           // final sleep score after HRV correction

  // Accumulated fatigue
  accumulatedFatigueFlag: boolean
  cvPercent: number
}

/** The final 4WRI readiness score and coaching output */
export interface AthleteReadinessScore {
  athleteId: string
  date: string
  timestamp: number

  // Core score
  score: number                   // 0-100
  zone: 'OPTIMAL' | 'MODERATE' | 'ELEVATED' | 'RECOVERY'
  zoneColor: string               // hex for UI

  // Component scores (0-100 each)
  hrvScore: number
  sleepScore: number
  rhrScore: number

  // Key flags for coach dashboard
  flags: ReadinessFlag[]

  // Recommended action
  recommendation: TrainingRecommendation

  // Confidence in score (low during calibration period)
  confidence: 'calibrating' | 'low' | 'moderate' | 'high'
  calibrationDaysRemaining: number

  // Raw data preserved for audit/research
  rawMetrics: NormalizedMetrics
  baseline: AthleteBaseline
}

export interface ReadinessFlag {
  severity: 'info' | 'warning' | 'alert'
  metric: 'hrv' | 'sleep' | 'rhr' | 'trend' | 'fatigue'
  message: string
  value?: number
  baseline?: number
  deviation?: number
}

export interface TrainingRecommendation {
  intensity: 'full' | 'reduced' | 'light' | 'rest'
  loadMultiplier: number          // 1.0 = normal, 0.7 = reduced, 0.4 = light, 0.0 = rest
  coachNote: string
  autoApply: boolean              // true if deviation > 1 SD (coach can override)
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const CALIBRATION_MIN_DAYS = 7
const CALIBRATION_IDEAL_DAYS = 14
const BASELINE_WINDOW_DAYS = 7
const SWC_MULTIPLIER = 0.5        // Smallest Worthwhile Change = 0.5 × SD (Plews 2014)

// Zone thresholds
const ZONE_OPTIMAL_MIN = 85
const ZONE_MODERATE_MIN = 70
const ZONE_ELEVATED_MIN = 50

// Scoring weights — HRV carries most weight per Altini + WHOOP architecture
// HRV reflects integrated physiological state; sleep and RHR are confirmatory
const WEIGHT_HRV = 0.50
const WEIGHT_SLEEP = 0.30
const WEIGHT_RHR = 0.20

// Sleep quality correction weights
// When staging conflicts with HRV, weight HRV-derived quality more heavily
const SLEEP_STAGING_WEIGHT = 0.35      // how much PPG staging influences sleep score
const SLEEP_HRV_CORRECTION_WEIGHT = 0.40  // how much HRV corrects staging
const SLEEP_DURATION_WEIGHT = 0.25    // duration is most reliable from wearables

// Adolescent/young adult sleep targets (AAP: 8-10 hrs for adolescents)
const SLEEP_OPTIMAL_MINUTES = 480     // 8 hours
const SLEEP_ADEQUATE_MINUTES = 420    // 7 hours
const SLEEP_INSUFFICIENT_MINUTES = 360 // 6 hours

// RHR alert thresholds (above personal baseline)
const RHR_FLAG_MODERATE = 5    // +5 bpm: reduce volume
const RHR_FLAG_SIGNIFICANT = 8 // +8 bpm: reduce intensity substantially
const RHR_FLAG_ALERT = 12      // +12 bpm: consult trainer, something is wrong

// HRV CV thresholds (Plews et al. 2012)
const HRV_CV_STABLE = 3        // <3%: stable adaptation
const HRV_CV_FUNCTIONAL = 6    // 5-6%: functional overreaching
const HRV_CV_NONFUNCTIONAL = 9 // >8-10%: non-functional overreaching

// ─── UTILITIES ───────────────────────────────────────────────────────────────

/**
 * Natural log transform of RMSSD
 * Normalizes the right-skewed distribution of raw RMSSD
 * Standard in sports science: Plews 2012, Buchheit 2014
 */
export function toLnRmssd(rmssd: number): number {
  if (rmssd <= 0) throw new Error(`Invalid RMSSD: ${rmssd}`)
  return Math.log(rmssd) * 20  // multiply by 20 to produce readable scale (Esco & Flatt 2014)
}

/** Convert lnRMSSD back to RMSSD ms */
export function fromLnRmssd(lnRmssd: number): number {
  return Math.exp(lnRmssd / 20)
}

/** Get the best available lnRMSSD from a reading */
function extractLnRmssd(reading: BandReading): number | null {
  if (reading.lnRmssd !== undefined && reading.lnRmssd > 0) {
    return reading.lnRmssd
  }
  if (reading.rmssd !== undefined && reading.rmssd > 0) {
    return toLnRmssd(reading.rmssd)
  }
  // Fallback: estimate from SDNN if available (SDNN ≈ RMSSD * 1.0-1.3 during sleep)
  if (reading.sdnn !== undefined && reading.sdnn > 0) {
    return toLnRmssd(reading.sdnn * 0.85)
  }
  return null
}

function mean(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((a, b) => a + b, 0) / values.length
}

function standardDeviation(values: number[], avg?: number): number {
  if (values.length < 2) return 0
  const m = avg ?? mean(values)
  const variance = values.reduce((sum, v) => sum + Math.pow(v - m, 2), 0) / (values.length - 1)
  return Math.sqrt(variance)
}

function coefficientOfVariation(values: number[]): number {
  const m = mean(values)
  if (m === 0) return 0
  return (standardDeviation(values, m) / m) * 100
}

/** Linear regression slope — positive = improving trend */
function trendSlope(values: number[]): number {
  const n = values.length
  if (n < 2) return 0
  const xMean = (n - 1) / 2
  const yMean = mean(values)
  let num = 0, den = 0
  for (let i = 0; i < n; i++) {
    num += (i - xMean) * (values[i] - yMean)
    den += Math.pow(i - xMean, 2)
  }
  return den === 0 ? 0 : num / den
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function zScore(value: number, mean: number, sd: number): number {
  if (sd === 0) return 0
  return (value - mean) / sd
}

// ─── BASELINE ENGINE ─────────────────────────────────────────────────────────

/**
 * Build individual baseline from rolling window of readings
 * Uses last BASELINE_WINDOW_DAYS valid readings
 * Requires CALIBRATION_MIN_DAYS before producing confident scores
 */
export function buildBaseline(history: AthleteHistory): AthleteBaseline {
  const sorted = [...history.readings]
    .filter(r => r.wornDuringSleep !== false)         // exclude nights band wasn't worn
    .filter(r => extractLnRmssd(r) !== null)          // must have valid HRV
    .filter(r => r.restingHR > 30 && r.restingHR < 120)  // sanity check
    .sort((a, b) => b.timestamp - a.timestamp)        // most recent first

  const window = sorted.slice(0, BASELINE_WINDOW_DAYS)
  const calibrated = sorted.length >= CALIBRATION_MIN_DAYS

  if (window.length === 0) {
    // Return uncalibrated placeholder
    return {
      athleteId: history.athleteId,
      windowDays: 0,
      calibrated: false,
      lnRmssd: { mean: 0, sd: 0, cv: 0 },
      restingHR: { mean: 0, sd: 0 },
      sleepDuration: { mean: 480, sd: 60 },
      lnRmssdTrend: 0,
      restingHRTrend: 0,
      lnRmssdCv7Day: 0
    }
  }

  const lnRmssdValues = window.map(r => extractLnRmssd(r)!).filter(Boolean)
  const rhrValues = window.map(r => r.restingHR)
  const sleepValues = window.map(r => r.sleepDurationMinutes)

  const lnMean = mean(lnRmssdValues)
  const lnSd = standardDeviation(lnRmssdValues, lnMean)
  const lnCv = coefficientOfVariation(lnRmssdValues)

  const rhrMean = mean(rhrValues)
  const rhrSd = standardDeviation(rhrValues, rhrMean)

  const sleepMean = mean(sleepValues)
  const sleepSd = standardDeviation(sleepValues, sleepMean)

  // Trend: values ordered oldest to newest for slope calculation
  const lnRmssdChron = [...lnRmssdValues].reverse()
  const rhrChron = [...rhrValues].reverse()

  return {
    athleteId: history.athleteId,
    windowDays: window.length,
    calibrated,
    lnRmssd: { mean: lnMean, sd: Math.max(lnSd, 0.5), cv: lnCv },
    restingHR: { mean: rhrMean, sd: Math.max(rhrSd, 1.0) },
    sleepDuration: { mean: sleepMean, sd: Math.max(sleepSd, 15) },
    lnRmssdTrend: trendSlope(lnRmssdChron),
    restingHRTrend: trendSlope(rhrChron),
    lnRmssdCv7Day: lnCv
  }
}

// ─── SLEEP QUALITY CORRECTOR ─────────────────────────────────────────────────

/**
 * HRV-based sleep quality correction
 *
 * PPG sleep staging is unreliable, especially for deep sleep (28-68% accuracy).
 * We use HRV signals as independent physiological validators:
 * - Suppressed overnight HRV = poor recovery regardless of what staging says
 * - Elevated morning RHR = incomplete cardiac recovery = poor sleep quality
 * - HRV-derived quality overrides staging when signals conflict
 *
 * Research: Altini & Kinnunen 2021 (HRV adds +16pp to staging accuracy)
 * Research: Cosgrave & Wulff 2021 (poor sleepers: higher HR, blunted vagal recovery)
 * Research: Schlagintweit 2023 (restriction → HRV suppression; fragmentation → no HRV change)
 */
function computeSleepQualityCorrection(
  reading: BandReading,
  baseline: AthleteBaseline,
  lnRmssdZ: number,
  rhrZ: number
): { hvSleepQualityEstimate: number; stagingReliabilityConfidence: number; correctedSleepScore: number } {

  // HRV-derived sleep quality estimate (0-100)
  // Based on: overnight HRV relative to baseline, morning RHR deviation
  // Key insight: lnRMSSD suppression = body didn't recover during sleep = poor quality
  // regardless of what the staging algorithm reported

  // HRV component: convert z-score to 0-100
  // z > +1: excellent recovery (score ~90-100)
  // z 0 to +1: normal (score ~65-85)
  // z -0.5 to 0: slightly suppressed (score ~50-65)
  // z < -1: significantly suppressed (score ~20-50)
  // z < -2: very suppressed (score <20)
  const hrvQualityComponent = clamp(
    50 + (lnRmssdZ * 20),  // linear mapping centered at 50
    0, 100
  )

  // RHR component: inverse relationship — elevated RHR = poor recovery
  // RHR elevation reflects incomplete cardiac parasympathetic recovery
  // Reference: +5 bpm = meaningful flag; +12 bpm = alert
  const rhrQualityComponent = clamp(
    50 - (rhrZ * 20),  // inverted — elevated RHR lowers quality estimate
    0, 100
  )

  // Duration component: hours slept vs target
  const durationQuality = computeSleepDurationScore(reading.sleepDurationMinutes)

  // HRV-derived sleep quality estimate
  // Weights: HRV 50%, RHR 30%, duration 20%
  const hvSleepQualityEstimate = clamp(
    (hrvQualityComponent * 0.50) +
    (rhrQualityComponent * 0.30) +
    (durationQuality * 0.20),
    0, 100
  )

  // Staging reliability confidence: how much should we trust the band's staging?
  // High confidence: HRV and staging tell consistent story
  // Low confidence: HRV suppressed but staging reports good sleep (conflict)
  let stagingReliabilityConfidence = 70  // base confidence for PPG staging

  if (reading.deepSleepMinutes !== undefined) {
    // Check for classic conflict: good staging, suppressed HRV
    const stagingReportsGoodSleep = (reading.deepSleepMinutes / reading.sleepDurationMinutes) > 0.15
    const hrvSuppressed = lnRmssdZ < -0.5

    if (stagingReportsGoodSleep && hrvSuppressed) {
      // Staging and physiology conflict — trust HRV more
      stagingReliabilityConfidence = 30
    } else if (!stagingReportsGoodSleep && lnRmssdZ > 0.5) {
      // Staging says poor sleep but HRV is elevated — staging likely wrong
      stagingReliabilityConfidence = 35
    } else {
      // Consistent story — staging more reliable
      stagingReliabilityConfidence = 75
    }
  }

  // Corrected sleep score: blend staging-based and HRV-derived estimates
  // When confidence is low, lean heavily on HRV correction
  const stagingWeight = stagingReliabilityConfidence / 100 * SLEEP_STAGING_WEIGHT
  const hvWeight = (1 - stagingReliabilityConfidence / 100) * SLEEP_HRV_CORRECTION_WEIGHT + (SLEEP_HRV_CORRECTION_WEIGHT * 0.5)

  // Staging score from band (only if available)
  let stagingScore = 70  // default when staging unavailable
  if (reading.deepSleepMinutes !== undefined && reading.remSleepMinutes !== undefined) {
    const deepPct = (reading.deepSleepMinutes / reading.sleepDurationMinutes) * 100
    const remPct = (reading.remSleepMinutes / reading.sleepDurationMinutes) * 100
    // Healthy adult targets: deep ~20%, REM ~25% — reference: Walker 2017
    const deepScore = clamp(deepPct / 20 * 100, 0, 100)
    const remScore = clamp(remPct / 25 * 100, 0, 100)
    stagingScore = (deepScore * 0.6) + (remScore * 0.4)
  }

  const correctedSleepScore = clamp(
    (stagingScore * stagingWeight) +
    (hvSleepQualityEstimate * hvWeight) +
    (durationQuality * SLEEP_DURATION_WEIGHT),
    0, 100
  )

  return { hvSleepQualityEstimate, stagingReliabilityConfidence, correctedSleepScore }
}

function computeSleepDurationScore(minutes: number): number {
  if (minutes >= SLEEP_OPTIMAL_MINUTES) {
    // Optimal or extended — cap benefit of extra sleep at 10 hours (600 min)
    return clamp(100 - Math.max(0, (minutes - 600) / 3), 90, 100)
  }
  if (minutes >= SLEEP_ADEQUATE_MINUTES) {
    // 7-8 hours: good but not optimal
    const pct = (minutes - SLEEP_ADEQUATE_MINUTES) / (SLEEP_OPTIMAL_MINUTES - SLEEP_ADEQUATE_MINUTES)
    return 70 + (pct * 20)
  }
  if (minutes >= SLEEP_INSUFFICIENT_MINUTES) {
    // 6-7 hours: below adequate
    const pct = (minutes - SLEEP_INSUFFICIENT_MINUTES) / (SLEEP_ADEQUATE_MINUTES - SLEEP_INSUFFICIENT_MINUTES)
    return 40 + (pct * 30)
  }
  // Under 6 hours: significantly insufficient
  return clamp((minutes / SLEEP_INSUFFICIENT_MINUTES) * 40, 0, 40)
}

// ─── NORMALIZER ──────────────────────────────────────────────────────────────

/**
 * Normalize today's reading against individual baseline
 * Produces z-scores and meaningful change classification
 */
export function normalizeReading(
  reading: BandReading,
  baseline: AthleteBaseline
): NormalizedMetrics {

  const lnRmssd = extractLnRmssd(reading) ?? baseline.lnRmssd.mean

  // Z-scores
  const lnRmssdZ = baseline.calibrated
    ? zScore(lnRmssd, baseline.lnRmssd.mean, baseline.lnRmssd.sd)
    : 0

  const restingHRZ = baseline.calibrated
    ? zScore(reading.restingHR, baseline.restingHR.mean, baseline.restingHR.sd)
    : 0

  const sleepZ = baseline.calibrated
    ? zScore(reading.sleepDurationMinutes, baseline.sleepDuration.mean, baseline.sleepDuration.sd)
    : 0

  // Meaningful change classification using Smallest Worthwhile Change (0.5 × SD)
  const swc = SWC_MULTIPLIER

  const lnRmssdChange: NormalizedMetrics['lnRmssdChange'] =
    lnRmssdZ < -swc ? 'suppressed' :
    lnRmssdZ > swc ? 'elevated' : 'normal'

  const restingHRChange: NormalizedMetrics['restingHRChange'] =
    restingHRZ > swc ? 'elevated' :
    restingHRZ < -swc ? 'suppressed' : 'normal'

  const sleepChange: NormalizedMetrics['sleepChange'] =
    sleepZ < -swc ? 'short' :
    sleepZ > swc ? 'extended' : 'normal'

  // Sleep quality correction
  const sleepCorrection = computeSleepQualityCorrection(reading, baseline, lnRmssdZ, restingHRZ)

  // Accumulated fatigue check
  const cvPercent = baseline.lnRmssdCv7Day
  const accumulatedFatigueFlag = cvPercent >= HRV_CV_FUNCTIONAL

  return {
    lnRmssd,
    restingHR: reading.restingHR,
    sleepDurationMinutes: reading.sleepDurationMinutes,
    lnRmssdZ,
    restingHRZ,
    sleepDurationZ: sleepZ,
    lnRmssdChange,
    restingHRChange,
    sleepChange,
    hvSleepQualityEstimate: sleepCorrection.hvSleepQualityEstimate,
    stagingReliabilityConfidence: sleepCorrection.stagingReliabilityConfidence,
    correctedSleepScore: sleepCorrection.correctedSleepScore,
    accumulatedFatigueFlag,
    cvPercent
  }
}

// ─── COMPONENT SCORERS ───────────────────────────────────────────────────────

/**
 * HRV Score (0-100)
 * Anchored to individual baseline z-score
 * Calibrated period uses population-relative estimate
 */
function computeHrvScore(metrics: NormalizedMetrics, baseline: AthleteBaseline): number {
  if (!baseline.calibrated) {
    // During calibration: score based on absolute lnRMSSD value
    // Average athlete lnRMSSD: ~68-98 ms (Altini & Plews 2021)
    // Use conservative midpoint for scoring
    const absScore = clamp((metrics.lnRmssd - 30) / 50 * 100, 20, 80)
    return absScore
  }

  // Post-calibration: z-score based individual scoring
  // Center at 50 for z=0, scale ±20 per SD
  // z > +1.5: 80-100 (significantly elevated — well recovered)
  // z +0.5 to +1.5: 65-80 (elevated — good recovery)
  // z -0.5 to +0.5: 45-65 (normal — typical recovery)
  // z -1.5 to -0.5: 25-45 (suppressed — monitor)
  // z < -1.5: 0-25 (significantly suppressed — flag for coach)
  const baseScore = 50 + (metrics.lnRmssdZ * 18)

  // Bonus for positive trend (improving fitness over training block)
  const trendBonus = clamp(baseline.lnRmssdTrend * 5, -5, 5)

  return clamp(baseScore + trendBonus, 0, 100)
}

/**
 * RHR Score (0-100) — inversely scored
 * Elevated RHR above baseline = stress/incomplete recovery
 * Reference thresholds: +5/+8/+12 bpm above baseline
 */
function computeRhrScore(metrics: NormalizedMetrics, baseline: AthleteBaseline): number {
  if (!baseline.calibrated) {
    // Absolute scoring during calibration
    // Average resting HR for fit adolescents: 55-75 bpm
    if (metrics.restingHR <= 55) return 90
    if (metrics.restingHR <= 65) return 75
    if (metrics.restingHR <= 75) return 60
    if (metrics.restingHR <= 85) return 40
    return 20
  }

  // Deviation from personal baseline in bpm
  const bpmDeviation = metrics.restingHR - baseline.restingHR.mean

  if (bpmDeviation <= -2) return clamp(90 + (Math.abs(bpmDeviation) * 2), 90, 100)  // below baseline = great
  if (bpmDeviation <= 0) return 80
  if (bpmDeviation < RHR_FLAG_MODERATE) {
    // 0 to +5 bpm: linear decline
    return clamp(80 - (bpmDeviation / RHR_FLAG_MODERATE * 30), 50, 80)
  }
  if (bpmDeviation < RHR_FLAG_SIGNIFICANT) {
    // +5 to +8 bpm: moderate concern
    return clamp(50 - ((bpmDeviation - RHR_FLAG_MODERATE) / (RHR_FLAG_SIGNIFICANT - RHR_FLAG_MODERATE) * 20), 30, 50)
  }
  if (bpmDeviation < RHR_FLAG_ALERT) {
    // +8 to +12 bpm: significant flag
    return clamp(30 - ((bpmDeviation - RHR_FLAG_SIGNIFICANT) / (RHR_FLAG_ALERT - RHR_FLAG_SIGNIFICANT) * 20), 10, 30)
  }
  // +12+ bpm: alert
  return clamp(10 - (bpmDeviation - RHR_FLAG_ALERT), 0, 10)
}

// ─── FLAG GENERATOR ──────────────────────────────────────────────────────────

function generateFlags(
  reading: BandReading,
  metrics: NormalizedMetrics,
  baseline: AthleteBaseline
): ReadinessFlag[] {
  const flags: ReadinessFlag[] = []
  const bpmDev = reading.restingHR - baseline.restingHR.mean

  // HRV flags
  if (metrics.lnRmssdZ < -2.0) {
    flags.push({
      severity: 'alert',
      metric: 'hrv',
      message: `HRV significantly suppressed — ${((1 - Math.exp(-metrics.lnRmssdZ / 20)) * 100).toFixed(0)}% below baseline. Recovery priority today.`,
      value: metrics.lnRmssd,
      baseline: baseline.lnRmssd.mean,
      deviation: metrics.lnRmssdZ
    })
  } else if (metrics.lnRmssdZ < -1.0) {
    flags.push({
      severity: 'warning',
      metric: 'hrv',
      message: `HRV below personal baseline. Reduce training intensity.`,
      value: metrics.lnRmssd,
      baseline: baseline.lnRmssd.mean,
      deviation: metrics.lnRmssdZ
    })
  } else if (metrics.lnRmssdZ > 1.0) {
    flags.push({
      severity: 'info',
      metric: 'hrv',
      message: `HRV elevated above baseline — strong recovery. Athlete ready for high intensity.`,
      deviation: metrics.lnRmssdZ
    })
  }

  // RHR flags
  if (baseline.calibrated) {
    if (bpmDev >= RHR_FLAG_ALERT) {
      flags.push({
        severity: 'alert',
        metric: 'rhr',
        message: `RHR ${bpmDev.toFixed(0)} bpm above baseline. Consult athletic trainer — possible illness or severe overreaching.`,
        value: reading.restingHR,
        baseline: baseline.restingHR.mean,
        deviation: bpmDev
      })
    } else if (bpmDev >= RHR_FLAG_SIGNIFICANT) {
      flags.push({
        severity: 'warning',
        metric: 'rhr',
        message: `RHR ${bpmDev.toFixed(0)} bpm above baseline. Reduce intensity substantially. Reassess tomorrow.`,
        value: reading.restingHR,
        baseline: baseline.restingHR.mean,
        deviation: bpmDev
      })
    } else if (bpmDev >= RHR_FLAG_MODERATE) {
      flags.push({
        severity: 'warning',
        metric: 'rhr',
        message: `RHR ${bpmDev.toFixed(0)} bpm above baseline. Reduce volume. Increase technical focus.`,
        value: reading.restingHR,
        baseline: baseline.restingHR.mean,
        deviation: bpmDev
      })
    }
  }

  // Sleep flags
  if (reading.sleepDurationMinutes < SLEEP_INSUFFICIENT_MINUTES) {
    flags.push({
      severity: 'alert',
      metric: 'sleep',
      message: `Only ${(reading.sleepDurationMinutes / 60).toFixed(1)} hours of sleep. Injury risk elevated. Consider modified load.`,
      value: reading.sleepDurationMinutes / 60
    })
  } else if (reading.sleepDurationMinutes < SLEEP_ADEQUATE_MINUTES) {
    flags.push({
      severity: 'warning',
      metric: 'sleep',
      message: `${(reading.sleepDurationMinutes / 60).toFixed(1)} hours of sleep — below recommended 8 hours. Monitor closely.`,
      value: reading.sleepDurationMinutes / 60
    })
  }

  // HRV-staging conflict flag (low sleep staging reliability)
  if (metrics.stagingReliabilityConfidence < 40) {
    flags.push({
      severity: 'info',
      metric: 'sleep',
      message: `Band sleep staging inconsistent with HRV data. Sleep score adjusted using physiological signals.`,
      value: metrics.stagingReliabilityConfidence
    })
  }

  // Accumulated fatigue flag
  if (metrics.accumulatedFatigueFlag) {
    const severity = metrics.cvPercent >= HRV_CV_NONFUNCTIONAL ? 'alert' : 'warning'
    flags.push({
      severity,
      metric: 'fatigue',
      message: metrics.cvPercent >= HRV_CV_NONFUNCTIONAL
        ? `HRV instability (CV ${metrics.cvPercent.toFixed(1)}%) indicates non-functional overreaching. Reduce training load for 3-5 days.`
        : `HRV variability (CV ${metrics.cvPercent.toFixed(1)}%) suggests functional overreaching. Monitor closely.`,
      value: metrics.cvPercent
    })
  }

  // Positive trend flag
  if (baseline.lnRmssdTrend > 0.05 && !flags.find(f => f.metric === 'hrv')) {
    flags.push({
      severity: 'info',
      metric: 'trend',
      message: `HRV trending upward over last 7 days — athlete adapting well to current training load.`
    })
  }

  return flags
}

// ─── RECOMMENDATION ENGINE ───────────────────────────────────────────────────

function generateRecommendation(
  score: number,
  metrics: NormalizedMetrics,
  flags: ReadinessFlag[],
  baseline: AthleteBaseline
): TrainingRecommendation {

  const hasAlert = flags.some(f => f.severity === 'alert')
  const hasWarning = flags.some(f => f.severity === 'warning')
  const rhrAlert = flags.find(f => f.metric === 'rhr' && f.severity === 'alert')
  const hrvAlert = flags.find(f => f.metric === 'hrv' && f.severity === 'alert')

  // Auto-apply when deviation is significant (>1 SD on primary metrics)
  // Coach can always override
  const autoApply = baseline.calibrated && (
    Math.abs(metrics.lnRmssdZ) > 1.0 ||
    Math.abs(metrics.restingHRZ) > 1.0
  )

  if (score >= ZONE_OPTIMAL_MIN) {
    return {
      intensity: 'full',
      loadMultiplier: 1.0,
      coachNote: 'Athlete recovered and ready. Full training load appropriate.',
      autoApply: false
    }
  }

  if (score >= ZONE_MODERATE_MIN) {
    if (hasWarning) {
      return {
        intensity: 'reduced',
        loadMultiplier: 0.80,
        coachNote: 'Moderate readiness with flags. Reduce volume ~20%. Prioritize quality over quantity.',
        autoApply
      }
    }
    return {
      intensity: 'full',
      loadMultiplier: 0.90,
      coachNote: 'Moderate readiness. Slight load reduction optional. Monitor response during session.',
      autoApply: false
    }
  }

  if (score >= ZONE_ELEVATED_MIN) {
    if (rhrAlert || hrvAlert) {
      return {
        intensity: 'light',
        loadMultiplier: 0.50,
        coachNote: 'Elevated stress markers. Light technical work or active recovery only. No high intensity.',
        autoApply
      }
    }
    return {
      intensity: 'reduced',
      loadMultiplier: 0.65,
      coachNote: 'Elevated fatigue. Reduce intensity and volume significantly. Technical focus.',
      autoApply
    }
  }

  // Recovery zone (0-49)
  if (rhrAlert && flags.find(f => f.metric === 'rhr' && (f.deviation ?? 0) >= RHR_FLAG_ALERT)) {
    return {
      intensity: 'rest',
      loadMultiplier: 0.0,
      coachNote: `RHR ${(flags.find(f => f.metric === 'rhr')?.deviation ?? 0).toFixed(0)} bpm above baseline. Rest day recommended. Consult athletic trainer.`,
      autoApply
    }
  }

  return {
    intensity: 'light',
    loadMultiplier: 0.30,
    coachNote: 'Recovery zone. Active recovery only — light movement, mobility, no training load.',
    autoApply
  }
}

// ─── MAIN SCORING FUNCTION ───────────────────────────────────────────────────

/**
 * Compute the 4WRI readiness score for an athlete
 *
 * @param reading - Today's band data
 * @param history - Historical readings for this athlete (minimum 7 for calibration)
 * @returns Full readiness score with zone, flags, and recommendation
 */
export function compute4WRI(
  reading: BandReading,
  history: AthleteHistory
): AthleteReadinessScore {

  // Build baseline from history
  const baseline = buildBaseline(history)

  // Normalize today's reading against baseline
  const metrics = normalizeReading(reading, baseline)

  // Component scores (0-100 each)
  const hrvScore = computeHrvScore(metrics, baseline)
  const sleepScore = metrics.correctedSleepScore
  const rhrScore = computeRhrScore(metrics, baseline)

  // Weighted composite score
  const rawScore = (
    (hrvScore * WEIGHT_HRV) +
    (sleepScore * WEIGHT_SLEEP) +
    (rhrScore * WEIGHT_RHR)
  )

  const score = Math.round(clamp(rawScore, 0, 100))

  // Zone classification
  const zone: AthleteReadinessScore['zone'] =
    score >= ZONE_OPTIMAL_MIN ? 'OPTIMAL' :
    score >= ZONE_MODERATE_MIN ? 'MODERATE' :
    score >= ZONE_ELEVATED_MIN ? 'ELEVATED' : 'RECOVERY'

  const zoneColor =
    zone === 'OPTIMAL' ? '#2ECC8A' :
    zone === 'MODERATE' ? '#F5B820' :
    zone === 'ELEVATED' ? '#FB923C' : '#7C6FE0'

  // Flags and recommendation
  const flags = generateFlags(reading, metrics, baseline)
  const recommendation = generateRecommendation(score, metrics, flags, baseline)

  // Confidence level
  const validReadings = history.readings.filter(r =>
    r.wornDuringSleep !== false && extractLnRmssd(r) !== null
  ).length

  const confidence: AthleteReadinessScore['confidence'] =
    validReadings < CALIBRATION_MIN_DAYS ? 'calibrating' :
    validReadings < CALIBRATION_IDEAL_DAYS ? 'low' :
    baseline.lnRmssd.sd < 1.0 ? 'moderate' : 'high'

  const calibrationDaysRemaining = Math.max(0, CALIBRATION_MIN_DAYS - validReadings)

  return {
    athleteId: reading.athleteId,
    date: reading.date,
    timestamp: reading.timestamp,
    score,
    zone,
    zoneColor,
    hrvScore: Math.round(hrvScore),
    sleepScore: Math.round(sleepScore),
    rhrScore: Math.round(rhrScore),
    flags,
    recommendation,
    confidence,
    calibrationDaysRemaining,
    rawMetrics: metrics,
    baseline
  }
}

// ─── TEAM AGGREGATOR ─────────────────────────────────────────────────────────

/**
 * Compute readiness scores for all athletes on a team
 * Returns sorted by score ascending (most at-risk first)
 */
export function computeTeamReadiness(
  readings: BandReading[],
  histories: Map<string, AthleteHistory>
): AthleteReadinessScore[] {

  const scores: AthleteReadinessScore[] = []

  for (const reading of readings) {
    const history = histories.get(reading.athleteId)
    if (!history) continue

    try {
      const score = compute4WRI(reading, history)
      scores.push(score)
    } catch (err) {
      // Log error but don't break team view
      console.error(`4WRI error for athlete ${reading.athleteId}:`, err)
    }
  }

  // Sort: alerts first, then by score ascending (most at-risk visible first)
  return scores.sort((a, b) => {
    const aAlerts = a.flags.filter(f => f.severity === 'alert').length
    const bAlerts = b.flags.filter(f => f.severity === 'alert').length
    if (aAlerts !== bAlerts) return bAlerts - aAlerts
    return a.score - b.score
  })
}

// ─── TEAM SUMMARY ────────────────────────────────────────────────────────────

export interface TeamReadinessSummary {
  date: string
  totalAthletes: number
  synced: number
  notSynced: number

  // Zone distribution
  optimal: number
  moderate: number
  elevated: number
  recovery: number

  // Average score
  teamAvgScore: number
  teamAvgHrv: number
  teamAvgSleep: number

  // Action required
  requiresAttention: number   // alerts or recovery zone
  autoAdjusted: number        // will have load auto-reduced

  // Trend vs yesterday
  avgScoreDelta?: number
}

export function computeTeamSummary(
  scores: AthleteReadinessScore[],
  totalRoster: number,
  date: string,
  yesterdayAvg?: number
): TeamReadinessSummary {
  const synced = scores.length

  const zoneCount = scores.reduce((acc, s) => {
    acc[s.zone] = (acc[s.zone] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const avgScore = synced > 0 ? mean(scores.map(s => s.score)) : 0
  const avgHrv = synced > 0 ? mean(scores.map(s => s.rawMetrics.lnRmssd)) : 0
  const avgSleep = synced > 0 ? mean(scores.map(s => s.rawMetrics.sleepDurationMinutes / 60)) : 0

  const requiresAttention = scores.filter(s =>
    s.flags.some(f => f.severity === 'alert') || s.zone === 'RECOVERY'
  ).length

  const autoAdjusted = scores.filter(s => s.recommendation.autoApply).length

  return {
    date,
    totalAthletes: totalRoster,
    synced,
    notSynced: totalRoster - synced,
    optimal: zoneCount['OPTIMAL'] || 0,
    moderate: zoneCount['MODERATE'] || 0,
    elevated: zoneCount['ELEVATED'] || 0,
    recovery: zoneCount['RECOVERY'] || 0,
    teamAvgScore: Math.round(avgScore),
    teamAvgHrv: Math.round(avgHrv * 10) / 10,
    teamAvgSleep: Math.round(avgSleep * 10) / 10,
    requiresAttention,
    autoAdjusted,
    avgScoreDelta: yesterdayAvg !== undefined ? Math.round(avgScore - yesterdayAvg) : undefined
  }
}
