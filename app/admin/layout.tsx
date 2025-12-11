import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionToken } from '@/lib/auth'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('admin_session')?.value
  const user = token ? await verifySessionToken(token) : null

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex bg-slate-950">
      <aside className="w-64 border-r border-slate-800 bg-slate-950/60 flex flex-col">
        <div className="px-4 py-4 border-b border-slate-800">
          <div className="text-sm font-semibold">MiniApp Admin</div>
          <div className="text-[11px] text-slate-400">Signed in as {user.username}</div>
        </div>
        <nav className="flex-1 px-2 py-3 text-sm space-y-1">
          <Link href="/" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-800 text-blue-400 hover:text-blue-300">
            🏠 Back to Main Page
          </Link>
          <Link href="/admin" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-800">
            📊 Dashboard
          </Link>
          <Link href="/admin/announcements" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-800">
            📢 Announcements
          </Link>
          <Link href="/admin/rewards" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-800">
            🎁 Rewards
          </Link>
          <Link href="/admin/miniapps" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-800">
            🎮 Mini Apps
          </Link>
          <Link href="/admin/treasury" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-800">
            💰 Treasury
          </Link>
          <Link href="/admin/leaderboard" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-800">
            🏆 Leaderboard
          </Link>
          <Link href="/admin/settings" className="block px-2.5 py-1.5 rounded-lg hover:bg-slate-800">
            ⚙️ Settings
          </Link>
        </nav>
        <div className="px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
          <span>MiniApp Admin Kit • Created by Adrijan Petek</span>
          <a href="/api/logout" className="text-slate-400 hover:text-slate-200">Logout</a>
        </div>
      </aside>
      <main className="flex-1 min-h-screen bg-slate-900/40">
        <div className="max-w-5xl mx-auto px-6 py-5">{children}</div>
      </main>
    </div>
  )
}
