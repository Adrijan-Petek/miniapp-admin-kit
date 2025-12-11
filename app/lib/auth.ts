import { SignJWT, jwtVerify } from 'jose'
import { userRoleSchema, permissionsSchema, type UserRole, type Permissions } from './validation' // eslint-disable-line @typescript-eslint/no-unused-vars

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change_me_dev_secret')

export interface AuthUser {
  id: number
  username: string
  email: string
  role: UserRole
  permissions: Permissions
}

export interface JWTPayload {
  userId: number
  username: string
  email: string
  role: UserRole
  permissions: Permissions
}

// Role-based permissions mapping
const rolePermissions: Record<UserRole, Permissions> = {
  super_admin: {
    can_manage_users: true,
    can_manage_announcements: true,
    can_manage_leaderboard: true,
    can_manage_miniapps: true,
    can_manage_rewards: true,
    can_manage_treasury: true,
    can_manage_settings: true,
    can_view_analytics: true,
  },
  admin: {
    can_manage_users: false,
    can_manage_announcements: true,
    can_manage_leaderboard: true,
    can_manage_miniapps: true,
    can_manage_rewards: true,
    can_manage_treasury: true,
    can_manage_settings: true,
    can_view_analytics: true,
  },
  moderator: {
    can_manage_users: false,
    can_manage_announcements: true,
    can_manage_leaderboard: true,
    can_manage_miniapps: false,
    can_manage_rewards: false,
    can_manage_treasury: false,
    can_manage_settings: false,
    can_view_analytics: true,
  },
  viewer: {
    can_manage_users: false,
    can_manage_announcements: false,
    can_manage_leaderboard: false,
    can_manage_miniapps: false,
    can_manage_rewards: false,
    can_manage_treasury: false,
    can_manage_settings: false,
    can_view_analytics: true,
  },
}

export function getRolePermissions(role: UserRole): Permissions {
  return rolePermissions[role]
}

export async function createSessionToken(user: AuthUser): Promise<string> {
  const token = await new SignJWT({
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret)
  return token
}

export async function verifySessionToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret) as { payload: JWTPayload }
    return {
      id: payload.userId,
      username: payload.username,
      email: payload.email,
      role: payload.role,
      permissions: payload.permissions,
    }
  } catch {
    return null
  }
}

export function hasPermission(user: AuthUser, permission: keyof Permissions): boolean {
  return user.permissions[permission] === true
}

export function canAccessResource(user: AuthUser, resource: string): boolean {
  switch (resource) {
    case 'users':
      return user.permissions.can_manage_users
    case 'announcements':
      return user.permissions.can_manage_announcements
    case 'leaderboard':
      return user.permissions.can_manage_leaderboard
    case 'miniapps':
      return user.permissions.can_manage_miniapps
    case 'rewards':
      return user.permissions.can_manage_rewards
    case 'treasury':
      return user.permissions.can_manage_treasury
    case 'settings':
      return user.permissions.can_manage_settings
    case 'analytics':
      return user.permissions.can_view_analytics
    default:
      return false
  }
}
