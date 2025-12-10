'use client'

import { useState } from 'react'
import { useLevelRewards } from '@/lib/hooks/useLevelRewards'

export default function RewardsPage() {
  const { rewards, pendingChanges, setReward, removePending, saveRewards, clearAll, getStats } = useLevelRewards()
  const [selectedLevel, setSelectedLevel] = useState(1)
  const [rewardAmount, setRewardAmount] = useState('')

  const stats = getStats()

  const handleSetReward = () => {
    const amount = parseFloat(rewardAmount)
    if (!isNaN(amount) && amount > 0) {
      setReward(selectedLevel, amount)
      setRewardAmount('')
    }
  }

  const renderLevelGrid = (start: number, end: number, title: string, emoji: string) => (
    <div>
      <h3 className="text-xs font-semibold mb-2">{emoji} {title}</h3>
      <div className="grid grid-cols-10 gap-1 text-[10px]">
        {Array.from({ length: end - start + 1 }, (_, i) => {
          const level = start + i
          const reward = rewards.find(r => r.level === level)?.reward
          const pending = pendingChanges.find(p => p.level === level)
          return (
            <div key={level} className="text-center p-1 border border-slate-700 rounded">
              <div className="font-semibold">Lv.{level}</div>
              <div className={reward || pending ? 'text-emerald-400' : 'text-slate-500'}>
                {pending ? `${pending.reward} 💎✏️` : reward ? `${reward} 💎` : '—'}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold mb-1">Level Rewards Manager</h1>
        <p className="text-xs text-slate-400">
          Configure TOKEN rewards for player levels.
        </p>
      </header>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">📋 Current Level Rewards Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>{stats.levelsWithRewards} Levels with Rewards</div>
          <div>{stats.totalRewards.toFixed(0)} Total TOKEN Rewards</div>
          <div>{stats.highestLevel} Highest Level</div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🏆 Levels 1-250</h2>
        {renderLevelGrid(1, 250, 'Levels 1-250', '💎')}
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">💎 Levels 251-500</h2>
        {renderLevelGrid(251, 500, 'Levels 251-500', '💎')}
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">👑 Levels 501-750</h2>
        {renderLevelGrid(501, 750, 'Levels 501-750', '👑')}
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🔥 Levels 751-1000</h2>
        {renderLevelGrid(751, 1000, 'Levels 751-1000', '🔥')}
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">⚙️ Set Level Reward</h2>
        <div className="flex gap-3 items-center">
          <div>
            <label className="block text-xs mb-1">Level (1-1000)</label>
            <input
              type="number"
              min="1"
              max="1000"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(parseInt(e.target.value) || 1)}
              className="rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs w-20"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">TOKEN Reward Amount</label>
            <input
              type="number"
              step="0.01"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              className="rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs w-32"
              placeholder="e.g., 100, 250.5"
            />
          </div>
          <button
            onClick={handleSetReward}
            className="mt-5 px-3 py-1.5 rounded bg-emerald-500 text-slate-950 text-xs font-semibold"
          >
            Set Reward
          </button>
        </div>
        <p className="text-xs text-slate-300 mt-2">
          Level {selectedLevel}: {rewards.find(r => r.level === selectedLevel)?.reward ? `${rewards.find(r => r.level === selectedLevel)?.reward} TOKEN` : 'Not set'}
        </p>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">⏳ Pending Changes</h2>
        <div className="space-y-1">
          {pendingChanges.map((change) => (
            <div key={change.level} className="flex justify-between items-center text-xs">
              <span>Level {change.level}: {change.reward} TOKEN</span>
              <button
                onClick={() => removePending(change.level)}
                className="text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="flex gap-3">
          <button
            onClick={saveRewards}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold"
          >
            💾 Save Rewards
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-slate-950 text-xs font-semibold"
          >
            🗑️ Clear All
          </button>
        </div>
      </section>
    </div>
  )
}
