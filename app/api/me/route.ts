import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 })
  }
  const user = await verifySessionToken(token)
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 200 })
  }
  return NextResponse.json({ authenticated: true, user }, { status: 200 })
}
