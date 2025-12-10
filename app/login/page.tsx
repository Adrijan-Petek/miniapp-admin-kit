'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }
      router.push('/admin')
    } catch (err) {
      console.error(err)
      setError('Network error')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white border border-gray-300 rounded-2xl p-6 shadow-xl">
        <h1 className="text-xl font-semibold mb-2 text-black">MiniApp Admin Login</h1>
        <p className="text-xs text-gray-600 mb-4">
          Sign in with your admin credentials to manage announcements, rewards, and mini app settings.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs mb-1 text-slate-300">Username</label>
            <input
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label className="block text-xs mb-1 text-gray-700">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          {error && <div className="text-xs text-red-600">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm py-2 transition disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <p className="text-[10px] text-gray-500 mt-2">
            Credentials are verified against environment variables <code>ADMIN_USERNAME</code> and <code>ADMIN_PASSWORD</code>.
          </p>
        </form>
      </div>
    </div>
  )
}
