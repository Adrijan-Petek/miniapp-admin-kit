'use client'

import { useState } from 'react'

export default function ContractsPage() {
  const [contracts, setContracts] = useState({
    treasury: '0x1234567890123456789012345678901234567890',
    match3Game: '0x2345678901234567890123456789012345678901',
    cardGame: '0x3456789012345678901234567890123456789012',
    dailyClaim: '0x4567890123456789012345678901234567890123',
    token: '0x5678901234567890123456789012345678901234'
  })

  const handleUpdateContract = (key: string, value: string) => {
    setContracts(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold mb-1">📋 Smart Contract Addresses</h1>
        <p className="text-xs text-slate-400">
          Manage blockchain contract addresses for your mini-app ecosystem.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Contracts */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="text-sm font-semibold mb-4">🏦 Core Contracts</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs mb-1 font-medium">Treasury Contract</label>
              <input
                type="text"
                value={contracts.treasury}
                onChange={(e) => handleUpdateContract('treasury', e.target.value)}
                className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-xs font-mono"
                placeholder="0x..."
              />
              <p className="text-xs text-slate-500 mt-1">Handles token distribution and treasury management</p>
            </div>

            <div>
              <label className="block text-xs mb-1 font-medium">Token Contract</label>
              <input
                type="text"
                value={contracts.token}
                onChange={(e) => handleUpdateContract('token', e.target.value)}
                className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-xs font-mono"
                placeholder="0x..."
              />
              <p className="text-xs text-slate-500 mt-1">ERC20 token contract for rewards</p>
            </div>
          </div>
        </section>

        {/* Game Contracts */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="text-sm font-semibold mb-4">🎮 Game Contracts</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs mb-1 font-medium">Match-3 Game</label>
              <input
                type="text"
                value={contracts.match3Game}
                onChange={(e) => handleUpdateContract('match3Game', e.target.value)}
                className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-xs font-mono"
                placeholder="0x..."
              />
              <p className="text-xs text-slate-500 mt-1">Match-3 puzzle game contract</p>
            </div>

            <div>
              <label className="block text-xs mb-1 font-medium">Card Game</label>
              <input
                type="text"
                value={contracts.cardGame}
                onChange={(e) => handleUpdateContract('cardGame', e.target.value)}
                className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-xs font-mono"
                placeholder="0x..."
              />
              <p className="text-xs text-slate-500 mt-1">Card matching game contract</p>
            </div>

            <div>
              <label className="block text-xs mb-1 font-medium">Daily Claim</label>
              <input
                type="text"
                value={contracts.dailyClaim}
                onChange={(e) => handleUpdateContract('dailyClaim', e.target.value)}
                className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-xs font-mono"
                placeholder="0x..."
              />
              <p className="text-xs text-slate-500 mt-1">Daily reward claiming contract</p>
            </div>
          </div>
        </section>
      </div>

      {/* Contract Status */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-4">🔍 Contract Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-400">Treasury</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Active & Verified</p>
          </div>

          <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-400">Token</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">ERC20 Compliant</p>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-xs font-medium text-yellow-400">Games</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Testing Phase</p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-xs font-medium rounded transition-colors">
          Validate Contracts
        </button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-xs font-medium rounded transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  )
}