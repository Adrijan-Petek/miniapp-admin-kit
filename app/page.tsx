import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifySessionToken } from '../lib/auth'

export default async function HomePage() {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_session')?.value

  if (token) {
    const user = await verifySessionToken(token).catch(() => null)
    if (user) {
      redirect('/admin')
    }
  }

  redirect('/login')
}
