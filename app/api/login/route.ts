import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, getRolePermissions } from '@/lib/auth'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { loginSchema, validateData } from '@/lib/validation'
import bcrypt from 'bcrypt'

interface DatabaseUser {
  id: number
  username: string
  email: string
  password_hash: string
  role: string
  is_active: boolean
  last_login?: string
}

export async function POST(req: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }

    const body = await req.json().catch(() => null)

    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    // Validate input
    const validation = validateData(loginSchema, body)
    if (!validation.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: validation.errors.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      }, { status: 400 })
    }

    const { username, password } = validation.data

    // Fetch user from database
    const { data: user, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('is_active', true)
      .single()

    if (dbError || !user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const dbUser = user as DatabaseUser

    // Verify password (assuming passwords are hashed with bcrypt)
    const isValidPassword = await bcrypt.compare(password, dbUser.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Update last login
    await (supabase
      .from('users') as any)
      .update({ last_login: new Date().toISOString() })
      .eq('id', dbUser.id)

    // Create session token
    const permissions = getRolePermissions(dbUser.role as any)
    const authUser = {
      id: dbUser.id,
      username: dbUser.username,
      email: dbUser.email,
      role: dbUser.role as any,
      permissions,
    }

    const token = await createSessionToken(authUser)

    // Create response with user info (excluding sensitive data)
    const userResponse = {
      id: dbUser.id,
      username: dbUser.username,
      email: dbUser.email,
      role: dbUser.role,
      permissions,
      last_login: dbUser.last_login,
    }

    const res = NextResponse.json({
      ok: true,
      user: userResponse
    })

    // Set secure HTTP-only cookie
    res.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 2, // 2 hours
    })

    return res

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
