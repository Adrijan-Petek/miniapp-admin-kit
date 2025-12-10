'use client'

import { useSettings } from '@/lib/hooks/useSettings'
import { useGameSettings } from '@/lib/hooks/useGameSettings'

export default function SettingsPage() {
  const { settings, updateSetting } = useSettings()
  const {
    settings: gameSettings,
    updateMatch3PlayFee,
    updateBoosterPrices,
    updateCardPlayFee,
    updateCardWinReward,
    updateDailyBaseReward,
    updateDailyStreakBonus
  } = useGameSettings()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold mb-1">Settings</h1>
        <p className="text-xs text-slate-400">
          Configure theme, branding, and game parameters.
        </p>
      </header>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🎨 Theme Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Theme Color</label>
            <input
              type="color"
              value={settings.themeColor}
              onChange={(e) => updateSetting('themeColor', e.target.value)}
              className="w-full h-10 rounded border border-slate-600 bg-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Font Family</label>
            <select
              value={settings.fontFamily}
              onChange={(e) => updateSetting('fontFamily', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Arial, sans-serif">Arial</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Times New Roman, serif">Times New Roman</option>
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1">Logo URL</label>
            <input
              value={settings.logoUrl}
              onChange={(e) => updateSetting('logoUrl', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="https://example.com/logo.png"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Background Image URL</label>
            <input
              value={settings.backgroundImageUrl}
              onChange={(e) => updateSetting('backgroundImageUrl', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="https://example.com/bg.png"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🔐 Admin Panel Access</h2>
        <div>
          <label className="block text-xs mb-1">Access Mode</label>
          <select
            value={settings.adminAccessMode}
            onChange={(e) => updateSetting('adminAccessMode', e.target.value as 'admins' | 'owner')}
            className="rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
          >
            <option value="owner">Owner Only</option>
            <option value="admins">Admins</option>
          </select>
        </div>
        <div className="mt-3">
          <label className="flex items-center text-xs">
            <input
              type="checkbox"
              checked={settings.frontendEditMode}
              onChange={(e) => updateSetting('frontendEditMode', !settings.frontendEditMode)}
              className="mr-2"
            />
            Enable Frontend Edit Mode (Admin can edit pages directly)
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🎮 Match-3 Game</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-xs mb-1">Paid Play Fee (ETH)</label>
            <input
              value={gameSettings.match3PlayFee}
              onChange={(e) => updateMatch3PlayFee(e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            />
            <p className="text-xs text-slate-500 mt-1">Current: {gameSettings.match3PlayFee} ETH</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold mb-2">Booster Prices (ETH)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div>
                <label className="block text-xs mb-1">Hammer (single)</label>
                <input
                  value={gameSettings.match3BoosterPrices.hammer}
                  onChange={(e) => updateBoosterPrices({ hammer: e.target.value })}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Shuffle (single)</label>
                <input
                  value={gameSettings.match3BoosterPrices.shuffle}
                  onChange={(e) => updateBoosterPrices({ shuffle: e.target.value })}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Color Bomb (single)</label>
                <input
                  value={gameSettings.match3BoosterPrices.colorBomb}
                  onChange={(e) => updateBoosterPrices({ colorBomb: e.target.value })}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Hammer Pack (x5)</label>
                <input
                  value={gameSettings.match3BoosterPrices.hammerPack}
                  onChange={(e) => updateBoosterPrices({ hammerPack: e.target.value })}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Shuffle Pack (x5)</label>
                <input
                  value={gameSettings.match3BoosterPrices.shufflePack}
                  onChange={(e) => updateBoosterPrices({ shufflePack: e.target.value })}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Bomb Pack (x5)</label>
                <input
                  value={gameSettings.match3BoosterPrices.bombPack}
                  onChange={(e) => updateBoosterPrices({ bombPack: e.target.value })}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
                />
              </div>
            </div>
            <button
              onClick={() => {/* update all */}}
              className="mt-3 px-3 py-1.5 rounded bg-emerald-500 text-slate-950 text-xs font-semibold"
            >
              Update All Booster Prices
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🃏 Card Game</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Play Fee (ETH)</label>
            <input
              value={gameSettings.cardPlayFee}
              onChange={(e) => updateCardPlayFee(e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            />
            <p className="text-xs text-slate-500 mt-1">Current: {gameSettings.cardPlayFee} ETH</p>
          </div>
          <div>
            <label className="block text-xs mb-1">Win Reward (TOKEN)</label>
            <input
              type="number"
              value={gameSettings.cardWinReward}
              onChange={(e) => updateCardWinReward(parseInt(e.target.value) || 0)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            />
            <p className="text-xs text-slate-500 mt-1">Current: {gameSettings.cardWinReward} TOKEN</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">📅 Daily Claim</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Base Reward (TOKEN)</label>
            <input
              type="number"
              value={gameSettings.dailyBaseReward}
              onChange={(e) => updateDailyBaseReward(parseInt(e.target.value) || 0)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            />
            <p className="text-xs text-slate-500 mt-1">Current: {gameSettings.dailyBaseReward} TOKEN</p>
          </div>
          <div>
            <label className="block text-xs mb-1">Streak Bonus (TOKEN/day)</label>
            <input
              type="number"
              value={gameSettings.dailyStreakBonus}
              onChange={(e) => updateDailyStreakBonus(parseInt(e.target.value) || 0)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            />
            <p className="text-xs text-slate-500 mt-1">Current: {gameSettings.dailyStreakBonus} TOKEN per streak day</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2">💡 Total reward = Base + (Streak × Bonus). Streak continues if claimed within 48h.</p>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">📋 Contract Addresses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>Treasury: 0x91F67245cE0ad7AFB5301EE5d8eaE29Db69078Af</div>
          <div>Match3Game: 0x72cC365b09D7cB4bE3416279407655cA9BBdc532</div>
          <div>CardGame: 0xa59Fd0ffE17D446157430E13db2d133DD2DfF3da</div>
          <div>DailyClaim: 0x6A27938E353Be8f25ECD7dEd90A47221e93F2941</div>
          <div>Token: 0xc732932ca7db558cf1bacc17b4f4f7e149e0eb07</div>
        </div>
      </section>
    </div>
  )
}
