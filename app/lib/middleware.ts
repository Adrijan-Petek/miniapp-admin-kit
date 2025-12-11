import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, canAccessResource, type AuthUser } from '@/lib/auth'
import { cookies } from 'next/headers'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: number
    username: string
    email: string
    role: string
    permissions: Record<string, boolean>
  }
}

export async function authenticateRequest(req: NextRequest): Promise<AuthenticatedRequest> {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_session')?.value

  if (!token) {
    throw new Error('No authentication token provided')
  }

  const user = await verifySessionToken(token)
  if (!user) {
    throw new Error('Invalid or expired token')
  }

  // Add user to request object
  ;(req as AuthenticatedRequest).user = user
  return req as AuthenticatedRequest
}

export function requireAuth(resource?: string) {
  return async function authMiddleware(req: NextRequest) {
    try {
      const authenticatedReq = await authenticateRequest(req)

      // If a specific resource is required, check permissions
      if (resource && authenticatedReq.user) {
        if (!canAccessResource(authenticatedReq.user as AuthUser, resource)) {
          return NextResponse.json(
            { error: 'Insufficient permissions' },
            { status: 403 }
          )
        }
      }

      return authenticatedReq
    } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
  }
}

export function requireRole(allowedRoles: string[]) {
  return async function roleMiddleware(req: NextRequest) {
    try {
      const authenticatedReq = await authenticateRequest(req)

      if (!authenticatedReq.user || !allowedRoles.includes(authenticatedReq.user.role)) {
        return NextResponse.json(
          { error: 'Insufficient role permissions' },
          { status: 403 }
        )
      }

      return authenticatedReq
    } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
  }
}