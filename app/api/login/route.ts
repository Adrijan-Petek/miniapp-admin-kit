import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, getRolePermissions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { loginSchema, validateData } from '@/lib/validation'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
  try {
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

    // Verify password (assuming passwords are hashed with bcrypt)
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id)

    // Create session token
    const permissions = getRolePermissions(user.role)
    const authUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      permissions,
    }

    const token = await createSessionToken(authUser)

    // Create response with user info (excluding sensitive data)
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      permissions,
      last_login: user.last_login,
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
