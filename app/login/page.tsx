'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Logo from '@/components/Logo'

type Mode = 'login' | 'signup'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) return null
    return createClient(supabaseUrl, supabaseAnonKey)
  }, [])

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('mode') === 'signup') {
      setMode('signup')
    }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    if (!supabase) {
      setError('Sign up is not configured yet. Supabase environment variables are missing.')
      setLoading(false)
      return
    }

    const trimmedEmail = email.trim()

    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            data: { name: name.trim() },
            emailRedirectTo: `${window.location.origin}/login`,
          },
        })

        if (signUpError) throw signUpError

        setMessage(
          data.session
            ? 'Account created. You are signed in.'
            : 'Account created. Check your email to finish confirming your account.'
        )
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        })

        if (signInError) throw signInError
        setMessage('You are signed in.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" style={{ textDecoration: 'none' }}><Logo size={22} /></a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/science">Science</a>
            <a href="/story">Our Story</a>
          </div>
        </div>
      </nav>

      <section className="section hero-section section-dark" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="section-inner" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(340px, 420px)', gap: 'clamp(40px, 7vw, 96px)', alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--maroon-bright)' }}>4Ward Access</div>
            <h1 className="display" style={{ marginBottom: 28 }}>
              Readiness in.<br />
              <span className="accent">Training decided.</span>
            </h1>
            <p className="body-lg">
              Sign in or create your account to access readiness, recovery signals, and training
              decisions built around how your body is responding.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ background: 'var(--charcoal)', border: '1px solid var(--border-dark)', borderRadius: 12, padding: 32, boxShadow: '0 30px 80px rgba(0, 0, 0, 0.35)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 28 }}>
              <button type="button" onClick={() => setMode('login')} className="btn" style={{ justifyContent: 'center', padding: '12px 16px', fontSize: 12, background: mode === 'login' ? 'var(--maroon)' : 'transparent', color: 'white', border: '1px solid var(--border-dark)' }}>
                Login
              </button>
              <button type="button" onClick={() => setMode('signup')} className="btn" style={{ justifyContent: 'center', padding: '12px 16px', fontSize: 12, background: mode === 'signup' ? 'var(--maroon)' : 'transparent', color: 'white', border: '1px solid var(--border-dark)' }}>
                Sign Up
              </button>
            </div>

            <div className="eyebrow" style={{ marginBottom: 14 }}>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</div>

            {mode === 'signup' && (
              <label style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
                <span className="athlete-meta" style={{ letterSpacing: 1, textTransform: 'uppercase' }}>Full Name</span>
                <input value={name} onChange={(event) => setName(event.target.value)} required style={{ width: '100%', padding: '14px 16px', borderRadius: 4, border: '1px solid var(--border-dark)', background: 'var(--black)', color: 'var(--off-white)', font: 'inherit' }} />
              </label>
            )}

            <label style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
              <span className="athlete-meta" style={{ letterSpacing: 1, textTransform: 'uppercase' }}>Email</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required style={{ width: '100%', padding: '14px 16px', borderRadius: 4, border: '1px solid var(--border-dark)', background: 'var(--black)', color: 'var(--off-white)', font: 'inherit' }} />
            </label>

            <label style={{ display: 'grid', gap: 8, marginBottom: 22 }}>
              <span className="athlete-meta" style={{ letterSpacing: 1, textTransform: 'uppercase' }}>Password</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required style={{ width: '100%', padding: '14px 16px', borderRadius: 4, border: '1px solid var(--border-dark)', background: 'var(--black)', color: 'var(--off-white)', font: 'inherit' }} />
            </label>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.65 : 1 }}>
              {loading ? 'Working...' : mode === 'login' ? 'Login' : 'Create Account'}
            </button>

            {message && <p className="body" style={{ marginTop: 18, color: 'var(--green)' }}>{message}</p>}
            {error && <p className="body" style={{ marginTop: 18, color: 'var(--warning)' }}>{error}</p>}
          </form>
        </div>
      </section>
    </>
  )
}
