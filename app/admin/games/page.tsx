'use client'

import { useState } from 'react'

export default function GamesPage() {
  const [gameSettings, setGameSettings] = useState({
    // Match-3 Game
    match3PlayFee: 0.000005,
    match3HammerSingle: 0.00001,
    match3ShuffleSingle: 0.00002,
    match3BombSingle: 0.00004,
    match3HammerPack: 0.00005,
    match3ShufflePack: 0.0001,
    match3BombPack: 0.0002,

    // Card Game
    cardPlayFee: 0.000072,
    cardWinReward: 2000,

    // Daily Claim
    dailyBaseReward: 30,
    dailyStreakBonus: 5
  })

  const updateGameSetting = (key: string, value: number) => {
    setGameSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const updateAllBoosterPrices = () => {
    // This would typically save to backend
    console.log('Updating all booster prices:', gameSettings)
    alert('All booster prices updated successfully!')
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold mb-1">🎮 Game Management</h1>
        <p className="text-xs text-slate-400">
          Configure pricing, rewards, and game parameters for your mini-app ecosystem.
        </p>
      </header>

      {/* Match-3 Game Settings */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-4">🎮 Match-3 Game</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1 font-medium">Paid Play Fee (ETH)</label>
              <input
                type="number"
                step="0.000001"
                value={gameSettings.match3PlayFee}
                onChange={(e) => updateGameSetting('match3PlayFee', parseFloat(e.target.value) || 0)}
                className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-xs"
              />
              <p className="text-xs text-slate-500 mt-1">Current: {gameSettings.match3PlayFee} ETH</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium mb-3">Booster Prices (ETH)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs mb-1">Hammer (single)</label>
                <input
                  type="number"
                  step="0.000001"
                  value={gameSettings.match3HammerSingle}
                  onChange={(e) => updateGameSetting('match3HammerSingle', parseFloat(e.target.value) || 0)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Shuffle (single)</label>
                <input
                  type="number"
                  step="0.000001"
                  value={gameSettings.match3ShuffleSingle}
                  onChange={(e) => updateGameSetting('match3ShuffleSingle', parseFloat(e.target.value) || 0)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Color Bomb (single)</label>
                <input
                  type="number"
                  step="0.000001"
                  value={gameSettings.match3BombSingle}
                  onChange={(e) => updateGameSetting('match3BombSingle', parseFloat(e.target.value) || 0)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Hammer Pack (x5)</label>
                <input
                  type="number"
                  step="0.000001"
                  value={gameSettings.match3HammerPack}
                  onChange={(e) => updateGameSetting('match3HammerPack', parseFloat(e.target.value) || 0)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Shuffle Pack (x5)</label>
                <input
                  type="number"
                  step="0.000001"
                  value={gameSettings.match3ShufflePack}
                  onChange={(e) => updateGameSetting('match3ShufflePack', parseFloat(e.target.value) || 0)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Bomb Pack (x5)</label>
                <input
                  type="number"
                  step="0.000001"
                  value={gameSettings.match3BombPack}
                  onChange={(e) => updateGameSetting('match3BombPack', parseFloat(e.target.value) || 0)}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={updateAllBoosterPrices}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-xs font-medium rounded transition-colors"
              >
                Update All Booster Prices
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Card Game Settings */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-4">🃏 Card Game</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1 font-medium">Play Fee (ETH)</label>
            <input
              type="number"
              step="0.000001"
              value={gameSettings.cardPlayFee}
              onChange={(e) => updateGameSetting('cardPlayFee', parseFloat(e.target.value) || 0)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-xs"
            />
            <p className="text-xs text-slate-500 mt-1">Current: {gameSettings.cardPlayFee} ETH</p>
          </div>
          <div>
            <label className="block text-xs mb-1 font-medium">Win Reward (TOKEN)</label>
            <input
              type="number"
              value={gameSettings.cardWinReward}
              onChange={(e) => updateGameSetting('cardWinReward', parseInt(e.target.value) || 0)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-xs"
            />
            <p className="text-xs text-slate-500 mt-1">Current: {gameSettings.cardWinReward} TOKEN</p>
          </div>
        </div>
      </section>

      {/* Daily Claim Settings */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-4">📅 Daily Claim</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1 font-medium">Base Reward (TOKEN)</label>
            <input
              type="number"
              value={gameSettings.dailyBaseReward}
              onChange={(e) => updateGameSetting('dailyBaseReward', parseInt(e.target.value) || 0)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-xs"
            />
            <p className="text-xs text-slate-500 mt-1">Current: {gameSettings.dailyBaseReward} TOKEN</p>
          </div>
          <div>
            <label className="block text-xs mb-1 font-medium">Streak Bonus (TOKEN/day)</label>
            <input
              type="number"
              value={gameSettings.dailyStreakBonus}
              onChange={(e) => updateGameSetting('dailyStreakBonus', parseInt(e.target.value) || 0)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-xs"
            />
            <p className="text-xs text-slate-500 mt-1">Current: {gameSettings.dailyStreakBonus} TOKEN per streak day</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
          <p className="text-xs text-slate-400">
            💡 Total reward = Base + (Streak × Bonus). Streak continues if claimed within 48h.
          </p>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-xs font-medium rounded transition-colors">
          Reset to Defaults
        </button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-xs font-medium rounded transition-colors">
          Save All Settings
        </button>
      </div>
    </div>
  )
}