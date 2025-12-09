import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'change_me_dev_secret')

export interface AdminUser {
  username: string
}

export async function createSessionToken(user: AdminUser): Promise<string> {
  const token = await new SignJWT({ username: user.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret)
  return token
}

export async function verifySessionToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    if (typeof payload.username === 'string') {
      return { username: payload.username }
    }
    return null
  } catch {
    return null
  }
}
