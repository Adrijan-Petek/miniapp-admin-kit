'use client'

import { useTreasury } from '@/lib/hooks/useTreasury'
import { useAnnouncements } from '@/lib/hooks/useAnnouncements'
import { useLevelRewards } from '@/lib/hooks/useLevelRewards'
import { useGameSettings } from '@/lib/hooks/useGameSettings'

export default function AdminDashboardPage() {
  const { data: treasury } = useTreasury()
  const { announcements } = useAnnouncements()
  const { getStats } = useLevelRewards()
  const { settings: gameSettings } = useGameSettings() // eslint-disable-line @typescript-eslint/no-unused-vars

  const rewardStats = getStats()

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold mb-1">Dashboard</h1>
        <p className="text-xs text-slate-400">
          Overview of your mini app admin kit. Use the sidebar to manage different modules.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
          <div className="text-xs text-slate-400 mb-1">Announcements</div>
          <div className="text-lg font-semibold">{announcements.length}</div>
          <div className="text-[11px] text-slate-500">Active mini app announcements</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
          <div className="text-xs text-slate-400 mb-1">Level Rewards</div>
          <div className="text-lg font-semibold">{rewardStats.levelsWithRewards}</div>
          <div className="text-[11px] text-slate-500">Configured level templates</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
          <div className="text-xs text-slate-400 mb-1">Mini Apps</div>
          <div className="text-lg font-semibold">2</div>
          <div className="text-[11px] text-slate-500">Match-3, Card Game (example)</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
          <div className="text-xs text-slate-400 mb-1">Treasury ETH</div>
          <div className="text-lg font-semibold">{treasury.ethBalance.slice(0, 8)}...</div>
          <div className="text-[11px] text-slate-500">ETH Balance</div>
        </div>
      </div>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-2">Getting started</h2>
        <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
          <li>Set <code>ADMIN_USERNAME</code>, <code>ADMIN_PASSWORD</code>, and <code>ADMIN_JWT_SECRET</code> in your env.</li>
          <li>Wire the Announcements module to your storage (Upstash, DB, etc.).</li>
          <li>Connect the Rewards module to your Treasury / smart contracts backend.</li>
          <li>Deploy as a private admin panel (e.g. Vercel / private URL).</li>
        </ul>
      </section>
    </div>
  )
}
