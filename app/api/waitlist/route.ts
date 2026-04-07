import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    const body = await request.json()
    const { first_name, last_name, email, school_name, sports, role } = body

    if (!first_name || !last_name || !email || !school_name) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([{ first_name, last_name, email, school_name, sports, role: role || 'coach' }])

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waitlist.' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
