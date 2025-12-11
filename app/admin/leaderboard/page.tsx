'use client'

import { useState } from 'react'
import { useLeaderboard } from '@/lib/hooks/useLeaderboard'
import { useTokenManagement } from '@/lib/hooks/useTokenManagement'

export default function LeaderboardPage() {
  const { topPlayers, loadTop10, addPlayer, removePlayer, creditRewards, syncLeaderboard } = useLeaderboard()
  const { supportedTokens } = useTokenManagement()

  const [newPlayerAddress, setNewPlayerAddress] = useState('')
  const [newPlayerAmount, setNewPlayerAmount] = useState('')
  const [selectedToken, setSelectedToken] = useState('')

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold mb-1">Leaderboard</h1>
        <p className="text-xs text-slate-400">
          Manage leaderboard rewards and sync with Farcaster profiles.
        </p>
      </header>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🔄 Leaderboard Sync</h2>
        <button
          onClick={syncLeaderboard}
          className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-slate-950 text-xs font-semibold"
        >
          🔄 Sync Leaderboard
        </button>
        <p className="text-xs text-slate-500 mt-2">⚠️ This may take several minutes for large leaderboards.</p>
        <p className="text-xs text-slate-500">Sync Farcaster usernames and profile pictures for all leaderboard players.</p>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🏆 Leaderboard Rewards</h2>
        <p className="text-xs text-slate-400 mb-3">Credit TOKEN rewards to top leaderboard players (they can claim later)</p>
        <button
          onClick={loadTop10}
          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold mb-3"
        >
          📊 Load Top 10 Players
        </button>
        <div className="space-y-2">
          {topPlayers.map((player) => (
            <div key={player.rank} className="flex items-center gap-3 p-2 rounded-lg border border-slate-700 bg-slate-950/60">
              <span className="text-xs font-semibold">#{player.rank}</span>
              <input
                value={player.address}
                onChange={(e) => {/* update player address */}} // eslint-disable-line @typescript-eslint/no-unused-vars
                className="flex-1 rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
                placeholder="Player address (0x...)"
              />
              <input
                value={player.score}
                onChange={(e) => {/* update score */}} // eslint-disable-line @typescript-eslint/no-unused-vars
                className="w-24 rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
                placeholder="Score"
              />
              <button
                onClick={() => removePlayer(player.address)}
                className="text-red-400 hover:text-red-300 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-3 p-2 rounded-lg border border-slate-700 bg-slate-950/60">
          <span className="text-xs font-semibold">+</span>
          <input
            value={newPlayerAddress}
            onChange={(e) => setNewPlayerAddress(e.target.value)}
            className="flex-1 rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
            placeholder="Player address (0x...)"
          />
          <input
            value={newPlayerAmount}
            onChange={(e) => setNewPlayerAmount(e.target.value)}
            className="w-24 rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
            placeholder="TOKEN amount"
          />
          <button
            onClick={() => { addPlayer(newPlayerAddress, parseInt(newPlayerAmount) || 0); setNewPlayerAddress(''); setNewPlayerAmount('') }}
            className="text-emerald-400 hover:text-emerald-300 text-xs"
          >
            + Add Player
          </button>
        </div>
        <button
          onClick={creditRewards}
          className="mt-3 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold"
        >
          Credit Rewards
        </button>
        <p className="text-xs text-slate-500 mt-2">💡 Credits rewards to player profiles - they can claim later from their profile page</p>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🪙 Multi-Token Leaderboard Rewards</h2>
        <p className="text-xs text-slate-400 mb-3">Credit rewards in any supported token to top leaderboard players (they can claim later)</p>
        <button
          onClick={loadTop10}
          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold mb-3"
        >
          📊 Load Top 10 Players
        </button>
        <div className="mb-3">
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
          >
            <option value="">Select Token</option>
            {supportedTokens.map((token) => (
              <option key={token.address} value={token.address}>{token.symbol}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          {topPlayers.map((player) => (
            <div key={player.rank} className="flex items-center gap-3 p-2 rounded-lg border border-slate-700 bg-slate-950/60">
              <span className="text-xs font-semibold">#{player.rank}</span>
              <input
                value={player.address}
                onChange={(e) => {/* update player address */}} // eslint-disable-line @typescript-eslint/no-unused-vars
                className="flex-1 rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
                placeholder="Player address (0x...)"
              />
              <input
                value={player.score}
                onChange={(e) => {/* update score */}} // eslint-disable-line @typescript-eslint/no-unused-vars
                className="w-24 rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
                placeholder="Score"
              />
              <button
                onClick={() => removePlayer(player.address)}
                className="text-red-400 hover:text-red-300 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-3 p-2 rounded-lg border border-slate-700 bg-slate-950/60">
          <span className="text-xs font-semibold">+</span>
          <input
            value={newPlayerAddress}
            onChange={(e) => setNewPlayerAddress(e.target.value)}
            className="flex-1 rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
            placeholder="Player address (0x...)"
          />
          <input
            value={newPlayerAmount}
            onChange={(e) => setNewPlayerAmount(e.target.value)}
            className="w-24 rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
            placeholder="Amount"
          />
          <button
            onClick={() => { addPlayer(newPlayerAddress, parseInt(newPlayerAmount) || 0); setNewPlayerAddress(''); setNewPlayerAmount('') }}
            className="text-emerald-400 hover:text-emerald-300 text-xs"
          >
            + Add Player
          </button>
        </div>
        <button
          onClick={creditRewards}
          className="mt-3 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold"
        >
          Credit Multi-Token Rewards
        </button>
        <p className="text-xs text-slate-500 mt-2">💡 Credits rewards in selected tokens to player profiles - they can claim later from their profile page</p>
      </section>
    </div>
  )
}