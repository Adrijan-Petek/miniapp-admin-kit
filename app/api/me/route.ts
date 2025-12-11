import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/middleware'

export async function GET(req: NextRequest) {
  try {
    const authenticatedReq = await authenticateRequest(req)
    const user = authenticatedReq.user

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    // Return user info without sensitive data
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      }
    }, { status: 200 })

  } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
    return NextResponse.json({ authenticated: false }, { status: 200 })
  }
}
