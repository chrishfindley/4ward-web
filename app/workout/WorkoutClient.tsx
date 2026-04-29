'use client'

import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'

type LoggedSet = {
  weight: number
  reps: number
  at: number
}

type Exercise = {
  name: string
  sets: number
  reps: number
  weight: number
  restSeconds: number
  lastTime: string
  adjustedNote?: string
}

type WorkoutState = {
  exerciseIndex: number
  setIndex: number
  loggedSets: Record<string, LoggedSet[]>
  notes: string[]
  complete: boolean
}

const storageKey = '4ward-workout-lower-power-v1'

const workout = {
  name: 'Lower Power',
  readiness: 86,
  exercises: [
    { name: 'Box Jump', sets: 3, reps: 5, weight: 0, restSeconds: 75, lastTime: 'bodyweight x 5' },
    { name: 'Back Squat', sets: 4, reps: 5, weight: 245, restSeconds: 150, lastTime: '235 x 5' },
    {
      name: 'Bench Press',
      sets: 4,
      reps: 6,
      weight: 185,
      restSeconds: 120,
      lastTime: '180 x 6',
      adjustedNote: "Adjusted for today's readiness: dropped working weight by 10%, added warmup set",
    },
    { name: 'Romanian Deadlift', sets: 3, reps: 8, weight: 205, restSeconds: 120, lastTime: '205 x 8' },
    { name: 'Split Squat', sets: 3, reps: 8, weight: 55, restSeconds: 90, lastTime: '50 x 8' },
    { name: 'Hamstring Curl', sets: 3, reps: 10, weight: 90, restSeconds: 75, lastTime: '90 x 10' },
    { name: 'Calf Raise', sets: 3, reps: 12, weight: 135, restSeconds: 60, lastTime: '135 x 12' },
    { name: 'Core Carry', sets: 2, reps: 40, weight: 70, restSeconds: 60, lastTime: '70 x 40 yd' },
  ] satisfies Exercise[],
}

const initialState: WorkoutState = {
  exerciseIndex: 2,
  setIndex: 1,
  loggedSets: {},
  notes: [],
  complete: false,
}

// AI_PROMPT for set-level adaptive suggestion:
// "Athlete just completed: {weight} lbs x {reps} reps for
// {exercise}. Prescription was: {prescribed_weight} x
// {prescribed_reps}. Athlete's readiness today: {readiness}.
// Their typical performance: {historical_avg}. Should we
// suggest adjusting the next set? If yes, what adjustment
// and why? Respond in JSON: {suggest_adjustment: bool,
// type: 'weight'|'reps'|'rest'|'add_set', delta: number,
// message: string}"

// AI_PROMPT for post-workout summary:
// "Athlete completed workout: {workout_name}. Total volume:
// {volume}. Performance vs prescription: {pct}. Performance
// vs personal best: {pct_vs_pb}. Today's readiness:
// {readiness}. Generate a 2-3 sentence summary that's
// specific about what they did well, calls out any notable
// performance, and gives a brief recovery recommendation
// for tonight. No fluff, no generic praise."

function loadState(): WorkoutState {
  if (typeof window === 'undefined') return initialState
  try {
    const raw = window.localStorage.getItem(storageKey)
    return raw ? { ...initialState, ...JSON.parse(raw) } : initialState
  } catch {
    return initialState
  }
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${String(secs).padStart(2, '0')}`
}

function beep() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)
    osc.start()
    osc.stop(ctx.currentTime + 0.24)
  } catch {}
}

function BigStepper({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (value: number) => void; step?: number }) {
  function update(next: number) {
    onChange(Math.max(0, next))
  }

  return (
    <label style={{ display: 'grid', gap: 10 }}>
      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--silver)' }}>{label}</span>
      <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr 64px', gap: 8, alignItems: 'stretch' }}>
        <button type="button" onClick={() => update(value - step)} style={stepButtonStyle}>−</button>
        <input
          inputMode="numeric"
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => update(Number(event.target.value) || 0)}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'ArrowUp') update(value + step)
            if (event.key === 'ArrowDown') update(value - step)
          }}
          style={numberInputStyle}
        />
        <button type="button" onClick={() => update(value + step)} style={stepButtonStyle}>+</button>
      </div>
    </label>
  )
}

const stepButtonStyle = {
  minHeight: 66,
  border: '1px solid var(--border-dark)',
  borderRadius: 14,
  background: 'var(--charcoal)',
  color: 'var(--text-light)',
  fontSize: 32,
  fontWeight: 800,
} satisfies React.CSSProperties

const numberInputStyle = {
  width: '100%',
  minHeight: 66,
  border: '1px solid var(--border-dark)',
  borderRadius: 14,
  background: 'var(--black)',
  color: 'var(--text-light)',
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 52,
  lineHeight: 1,
  textAlign: 'center',
} satisfies React.CSSProperties

function getInitialWorkoutState() {
  if (typeof window === 'undefined') return initialState
  return loadState()
}

export default function WorkoutClient() {
  const [state, setState] = useState<WorkoutState>(getInitialWorkoutState)
  const [hydrated, setHydrated] = useState(false)
  const initialExercise = workout.exercises[state.exerciseIndex] ?? workout.exercises[0]
  const [weight, setWeight] = useState(initialExercise.weight)
  const [reps, setReps] = useState(initialExercise.reps)
  const [restRemaining, setRestRemaining] = useState(0)
  const [restEndsAt, setRestEndsAt] = useState<number | null>(null)
  const [suggestion, setSuggestion] = useState<{ message: string; kind: 'drop' | 'add' } | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [noteDraft, setNoteDraft] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [effort, setEffort] = useState(7)
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)

  const currentExercise = workout.exercises[state.exerciseIndex]
  const loggedForExercise = state.loggedSets[currentExercise.name] ?? []
  const lastSet = loggedForExercise.at(-1)
  const totalExercises = workout.exercises.length

  const volume = useMemo(() => {
    return Object.values(state.loggedSets).flat().reduce((sum, set) => sum + set.weight * set.reps, 0)
  }, [state.loggedSets])

  useEffect(() => {
    setHydrated(true)

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {})
    }

    navigator.wakeLock?.request('screen').then((lock) => {
      wakeLockRef.current = lock
    }).catch(() => {})

    return () => {
      wakeLockRef.current?.release().catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(storageKey, JSON.stringify(state))
    // TODO: sync logged set/workout state to backend after each mutation.
  }, [hydrated, state])

  useEffect(() => {
    if (!restEndsAt) return
    const interval = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((restEndsAt - Date.now()) / 1000))
      setRestRemaining(remaining)
      if (remaining === 0) {
        window.clearInterval(interval)
        setRestEndsAt(null)
        beep()
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Rest complete', { body: `${currentExercise.name}: next set is ready.` })
        }
      }
    }, 250)
    return () => window.clearInterval(interval)
  }, [currentExercise.name, restEndsAt])

  function startRest(seconds: number) {
    setRestRemaining(seconds)
    setRestEndsAt(Date.now() + seconds * 1000)
  }

  function logSet() {
    const completedSet: LoggedSet = { weight, reps, at: Date.now() }
    const prescribedDrop = weight < currentExercise.weight * 0.9 || reps <= currentExercise.reps - 2
    const crushed = weight > currentExercise.weight || reps >= currentExercise.reps + 2

    setState((prev) => {
      const currentLogs = prev.loggedSets[currentExercise.name] ?? []
      const nextLogs = [...currentLogs, completedSet]
      const finishedExercise = nextLogs.length >= currentExercise.sets
      const isWorkoutComplete = finishedExercise && prev.exerciseIndex >= workout.exercises.length - 1
      const nextExerciseIndex = finishedExercise && !isWorkoutComplete ? prev.exerciseIndex + 1 : prev.exerciseIndex
      const nextExercise = workout.exercises[nextExerciseIndex]

      if (finishedExercise && !isWorkoutComplete) {
        setConfirmation(`${currentExercise.name} complete`)
        window.setTimeout(() => setConfirmation(''), 1400)
        setWeight(nextExercise.weight)
        setReps(nextExercise.reps)
      }

      return {
        ...prev,
        exerciseIndex: nextExerciseIndex,
        setIndex: finishedExercise ? 0 : prev.setIndex + 1,
        complete: isWorkoutComplete,
        loggedSets: {
          ...prev.loggedSets,
          [currentExercise.name]: nextLogs,
        },
      }
    })

    if (!state.complete) {
      startRest(currentExercise.restSeconds)
    }

    if (prescribedDrop) {
      setSuggestion({ kind: 'drop', message: "Last set looked tough. Want to drop next set's weight by 5%?" })
    } else if (crushed) {
      setSuggestion({ kind: 'add', message: "Today's hitting different. Want to add a set?" })
    } else {
      setSuggestion(null)
    }
  }

  function acceptSuggestion() {
    if (!suggestion) return
    if (suggestion.kind === 'drop') {
      setWeight(Math.round(weight * 0.95))
    } else {
      setState((prev) => ({
        ...prev,
        loggedSets: {
          ...prev.loggedSets,
          [currentExercise.name]: prev.loggedSets[currentExercise.name] ?? [],
        },
      }))
    }
    setSuggestion(null)
  }

  function addNote() {
    const trimmed = noteDraft.trim()
    if (!trimmed) return
    setState((prev) => ({ ...prev, notes: [...prev.notes, trimmed] }))
    setNoteDraft('')
    setNotesOpen(false)
  }

  if (state.complete) {
    return (
      <main style={pageStyle}>
        <section style={{ ...panelStyle, minHeight: '100vh', display: 'grid', alignContent: 'center', gap: 22, textAlign: 'center' }}>
          <div style={eyebrowStyle}>Workout Complete</div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(72px, 18vw, 132px)', lineHeight: 0.86, color: 'var(--text-light)' }}>Saved.</h1>
          <p style={bodyStyle}>
            Strong session. You hit all prescribed weights and added 5 lb on bench from last time.
            Recovery focus tonight: get to bed early, your body just did real work.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <Stat label="Volume" value={`${volume.toLocaleString()} lb`} />
            <Stat label="TUT" value="31m" />
            <Stat label="Done" value={`${totalExercises}/${totalExercises}`} />
          </div>
          <label style={{ display: 'grid', gap: 10, color: 'var(--silver-light)', textAlign: 'left' }}>
            <span style={eyebrowStyle}>Subjective effort: {effort}/10</span>
            <input type="range" min="1" max="10" value={effort} onChange={(event) => setEffort(Number(event.target.value))} />
          </label>
          <a href="/dashboard" style={primaryButtonStyle}>Save and return to dashboard</a>
        </section>
      </main>
    )
  }

  return (
    <main style={pageStyle}>
      <div style={topBarStyle}>
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, lineHeight: 1 }}>{workout.name}</div>
          <div style={{ fontSize: 12, color: 'var(--silver)', marginTop: 2 }}>Exercise {state.exerciseIndex + 1} of {totalExercises}</div>
        </div>
        <button type="button" onClick={() => setNotesOpen(true)} style={topButtonStyle}>Notes</button>
        {restRemaining > 0 && <div style={timerStyle}>{formatTime(restRemaining)}</div>}
      </div>

      {confirmation && <div style={confirmStyle}>{confirmation}</div>}

      <section style={{ ...panelStyle, paddingTop: 88 }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(72px, 20vw, 128px)', lineHeight: 0.86, color: 'var(--text-light)', marginBottom: 12 }}>
          {currentExercise.name}
        </h1>

        {currentExercise.adjustedNote && (
          <p style={{ color: 'var(--silver)', fontSize: 14, fontStyle: 'italic', marginBottom: 24 }}>
            {currentExercise.adjustedNote}
          </p>
        )}

        <div style={{ ...eyebrowStyle, marginBottom: 16 }}>Set {state.setIndex + 1} of {currentExercise.sets}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
          <BigStepper label="Weight" value={weight} onChange={setWeight} step={5} />
          <BigStepper label="Reps" value={reps} onChange={setReps} />
        </div>

        <div style={{ display: 'grid', gap: 8, color: 'var(--silver)', fontSize: 14, marginBottom: 22 }}>
          <div>Last set: {lastSet ? `${lastSet.weight} x ${lastSet.reps}` : 'none yet'}</div>
          <div>Target: {currentExercise.weight} x {currentExercise.reps}</div>
          <div>Last time you did this: {currentExercise.lastTime}</div>
        </div>

        {suggestion && (
          <div style={{ background: 'rgba(168,37,58,0.16)', border: '1px solid rgba(168,37,58,0.42)', borderRadius: 16, padding: 16, marginBottom: 18 }}>
            <div style={{ color: 'var(--text-light)', marginBottom: 12 }}>{suggestion.message}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button type="button" onClick={acceptSuggestion} style={secondaryButtonStyle}>{suggestion.kind === 'drop' ? 'Yes, adjust' : 'Add set'}</button>
              <button type="button" onClick={() => setSuggestion(null)} style={secondaryButtonStyle}>{suggestion.kind === 'drop' ? 'No, keep going' : 'Stick to plan'}</button>
            </div>
          </div>
        )}

        {restRemaining > 0 ? (
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 88, lineHeight: 1, color: 'var(--maroon-bright)', textAlign: 'center' }}>{formatTime(restRemaining)}</div>
            <button type="button" onClick={() => { setRestRemaining(0); setRestEndsAt(null) }} style={secondaryButtonStyle}>Skip Rest</button>
          </div>
        ) : (
          <button type="button" onClick={logSet} style={primaryButtonStyle}>Log Set</button>
        )}
      </section>

      <button type="button" onClick={() => setDrawerOpen(true)} style={drawerButtonStyle}>Workout List ↑</button>

      {drawerOpen && (
        <div style={overlayStyle} onClick={() => setDrawerOpen(false)}>
          <div style={drawerStyle} onClick={(event) => event.stopPropagation()}>
            <div style={{ ...eyebrowStyle, marginBottom: 18 }}>Full Workout</div>
            {workout.exercises.map((exercise, index) => {
              const completed = (state.loggedSets[exercise.name]?.length ?? 0) >= exercise.sets
              const current = index === state.exerciseIndex
              return (
                <button
                  key={exercise.name}
                  type="button"
                  onClick={() => {
                    if (index > state.exerciseIndex && !window.confirm('Jump forward? Current progress is saved.')) return
                    setState((prev) => ({ ...prev, exerciseIndex: index, setIndex: state.loggedSets[exercise.name]?.length ?? 0 }))
                    setWeight(exercise.weight)
                    setReps(exercise.reps)
                    setDrawerOpen(false)
                  }}
                  style={{ display: 'grid', gridTemplateColumns: '1fr auto', width: '100%', gap: 12, textAlign: 'left', background: current ? 'rgba(123,16,32,0.24)' : 'transparent', color: 'var(--text-light)', border: '1px solid var(--border-dark)', borderRadius: 12, padding: 14, marginBottom: 8 }}
                >
                  <span>{completed ? '✓ ' : current ? '● ' : ''}{exercise.name}</span>
                  <span>{exercise.sets} x {exercise.reps}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {notesOpen && (
        <div style={overlayStyle} onClick={() => setNotesOpen(false)}>
          <div style={drawerStyle} onClick={(event) => event.stopPropagation()}>
            <div style={{ ...eyebrowStyle, marginBottom: 14 }}>Workout Notes</div>
            <textarea
              value={noteDraft}
              onChange={(event) => setNoteDraft(event.target.value)}
              placeholder="Felt strong today / lower back tight / etc."
              style={{ width: '100%', minHeight: 130, borderRadius: 12, background: 'var(--black)', color: 'var(--text-light)', border: '1px solid var(--border-dark)', padding: 14, font: 'inherit', marginBottom: 12 }}
            />
            <button type="button" onClick={addNote} style={primaryButtonStyle}>Save Note</button>
          </div>
        </div>
      )}
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: 'var(--black)', border: '1px solid var(--border-dark)', borderRadius: 12, padding: 14 }}>
      <div style={{ color: 'var(--silver)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.8 }}>{label}</div>
      <div style={{ color: 'var(--text-light)', fontFamily: "'Bebas Neue', sans-serif", fontSize: 30 }}>{value}</div>
    </div>
  )
}

const pageStyle = {
  minHeight: '100vh',
  background: 'var(--black)',
  color: 'var(--text-light)',
  padding: '0 14px 84px',
} satisfies React.CSSProperties

const panelStyle = {
  maxWidth: 560,
  margin: '0 auto',
  padding: '24px 0',
} satisfies React.CSSProperties

const topBarStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 40,
  display: 'grid',
  gridTemplateColumns: '1fr auto auto',
  gap: 10,
  alignItems: 'center',
  minHeight: 72,
  padding: '10px 14px',
  background: 'rgba(8,8,9,0.96)',
  borderBottom: '1px solid var(--border-dark)',
} satisfies React.CSSProperties

const timerStyle = {
  minWidth: 76,
  minHeight: 52,
  display: 'grid',
  placeItems: 'center',
  borderRadius: 12,
  background: 'var(--maroon)',
  color: 'white',
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 34,
} satisfies React.CSSProperties

const topButtonStyle = {
  minHeight: 52,
  border: '1px solid var(--border-dark)',
  borderRadius: 12,
  padding: '0 14px',
  background: 'var(--charcoal)',
  color: 'var(--text-light)',
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 800,
  letterSpacing: 1.8,
  textTransform: 'uppercase',
} satisfies React.CSSProperties

const primaryButtonStyle = {
  minHeight: 64,
  width: '100%',
  border: 0,
  borderRadius: 14,
  display: 'grid',
  placeItems: 'center',
  background: 'var(--maroon)',
  color: 'white',
  textDecoration: 'none',
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 800,
  fontSize: 17,
  letterSpacing: 2.2,
  textTransform: 'uppercase',
} satisfies React.CSSProperties

const secondaryButtonStyle = {
  minHeight: 58,
  border: '1px solid var(--border-dark)',
  borderRadius: 14,
  background: 'var(--charcoal)',
  color: 'var(--text-light)',
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 800,
  letterSpacing: 1.8,
  textTransform: 'uppercase',
} satisfies React.CSSProperties

const drawerButtonStyle = {
  position: 'fixed',
  bottom: 14,
  left: 14,
  right: 14,
  zIndex: 35,
  maxWidth: 560,
  minHeight: 58,
  margin: '0 auto',
  border: '1px solid var(--border-dark)',
  borderRadius: 16,
  background: 'var(--charcoal)',
  color: 'var(--text-light)',
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 800,
  letterSpacing: 2,
  textTransform: 'uppercase',
} satisfies React.CSSProperties

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 60,
  background: 'rgba(0,0,0,0.62)',
  display: 'grid',
  alignItems: 'end',
} satisfies React.CSSProperties

const drawerStyle = {
  width: '100%',
  maxWidth: 620,
  margin: '0 auto',
  maxHeight: '82vh',
  overflow: 'auto',
  borderRadius: '24px 24px 0 0',
  background: 'var(--charcoal)',
  border: '1px solid var(--border-dark)',
  padding: 18,
} satisfies React.CSSProperties

const confirmStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 70,
  display: 'grid',
  placeItems: 'center',
  background: 'rgba(8,8,9,0.78)',
  color: 'var(--text-light)',
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 'clamp(52px, 12vw, 98px)',
  textAlign: 'center',
  animation: 'none',
} satisfies React.CSSProperties

const eyebrowStyle = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 800,
  fontSize: 13,
  letterSpacing: 2.4,
  textTransform: 'uppercase',
  color: 'var(--maroon-bright)',
} satisfies React.CSSProperties

const bodyStyle = {
  color: 'var(--silver-light)',
  lineHeight: 1.6,
  fontSize: 17,
} satisfies React.CSSProperties
