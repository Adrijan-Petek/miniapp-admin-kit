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
          Comprehensive configuration for your mini app ecosystem.
        </p>
      </header>

      {/* General Settings */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">📱 General Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">App Name</label>
            <input
              value={settings.appName}
              onChange={(e) => updateSetting('appName', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="MiniApp"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">App Version</label>
            <input
              value={settings.appVersion}
              onChange={(e) => updateSetting('appVersion', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="1.0.0"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs mb-1">App Description</label>
            <textarea
              value={settings.appDescription}
              onChange={(e) => updateSetting('appDescription', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              rows={2}
              placeholder="Description of your mini app"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => updateSetting('contactEmail', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="support@example.com"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Support URL</label>
            <input
              type="url"
              value={settings.supportUrl}
              onChange={(e) => updateSetting('supportUrl', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="https://example.com/support"
            />
          </div>
        </div>
      </section>

      {/* Branding & Theme */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🎨 Branding & Theme</h2>
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
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Open Sans, sans-serif">Open Sans</option>
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
            <label className="block text-xs mb-1">Favicon URL</label>
            <input
              value={settings.faviconUrl}
              onChange={(e) => updateSetting('faviconUrl', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="https://example.com/favicon.ico"
            />
          </div>
          <div className="md:col-span-2">
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

      {/* Public Page Display */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🏠 Public Page Display</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showLogo}
                onChange={(e) => updateSetting('showLogo', e.target.checked)}
                className="rounded border-slate-600 bg-slate-900"
              />
              <span className="text-xs">Show Logo</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showAnnouncements}
                onChange={(e) => updateSetting('showAnnouncements', e.target.checked)}
                className="rounded border-slate-600 bg-slate-900"
              />
              <span className="text-xs">Show Announcements</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showGames}
                onChange={(e) => updateSetting('showGames', e.target.checked)}
                className="rounded border-slate-600 bg-slate-900"
              />
              <span className="text-xs">Show Game Previews</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showAdminLogin}
                onChange={(e) => updateSetting('showAdminLogin', e.target.checked)}
                className="rounded border-slate-600 bg-slate-900"
              />
              <span className="text-xs">Show Admin Login Button</span>
            </label>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🔗 Social Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Twitter URL</label>
            <input
              value={settings.twitterUrl}
              onChange={(e) => updateSetting('twitterUrl', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="https://twitter.com/username"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Discord URL</label>
            <input
              value={settings.discordUrl}
              onChange={(e) => updateSetting('discordUrl', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="https://discord.gg/invite"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Telegram URL</label>
            <input
              value={settings.telegramUrl}
              onChange={(e) => updateSetting('telegramUrl', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="https://t.me/username"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Website URL</label>
            <input
              value={settings.websiteUrl}
              onChange={(e) => updateSetting('websiteUrl', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </section>

      {/* SEO & Meta */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🔍 SEO & Meta Tags</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs mb-1">Meta Title</label>
            <input
              value={settings.metaTitle}
              onChange={(e) => updateSetting('metaTitle', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="Page title for SEO"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Meta Description</label>
            <textarea
              value={settings.metaDescription}
              onChange={(e) => updateSetting('metaDescription', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              rows={2}
              placeholder="Page description for SEO"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Meta Keywords</label>
            <input
              value={settings.metaKeywords}
              onChange={(e) => updateSetting('metaKeywords', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
        </div>
      </section>

      {/* Privacy & Legal */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">📋 Privacy & Legal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Privacy Policy URL</label>
            <input
              value={settings.privacyPolicyUrl}
              onChange={(e) => updateSetting('privacyPolicyUrl', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="https://example.com/privacy"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Terms of Service URL</label>
            <input
              value={settings.termsOfServiceUrl}
              onChange={(e) => updateSetting('termsOfServiceUrl', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="https://example.com/terms"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Cookie Policy URL</label>
            <input
              value={settings.cookiePolicyUrl}
              onChange={(e) => updateSetting('cookiePolicyUrl', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="https://example.com/cookies"
            />
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">📊 Analytics & Tracking</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-xs mb-2">
              <input
                type="checkbox"
                checked={settings.enableAnalytics}
                onChange={(e) => updateSetting('enableAnalytics', !settings.enableAnalytics)}
                className="mr-2"
              />
              Enable Analytics
            </label>
          </div>
          {settings.enableAnalytics && (
            <div>
              <label className="block text-xs mb-1">Google Analytics ID</label>
              <input
                value={settings.googleAnalyticsId}
                onChange={(e) => updateSetting('googleAnalyticsId', e.target.value)}
                className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                placeholder="GA-XXXXXXXXXX"
              />
            </div>
          )}
        </div>
      </section>

      {/* Access & Security */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🔐 Access & Security</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs mb-1">Admin Access Mode</label>
            <select
              value={settings.adminAccessMode}
              onChange={(e) => updateSetting('adminAccessMode', e.target.value as 'admins' | 'owner')}
              className="rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            >
              <option value="owner">Owner Only</option>
              <option value="admins">Admins</option>
            </select>
          </div>
          <div>
            <label className="flex items-center text-xs">
              <input
                type="checkbox"
                checked={settings.frontendEditMode}
                onChange={(e) => updateSetting('frontendEditMode', !settings.frontendEditMode)}
                className="mr-2"
              />
              Enable Frontend Edit Mode
            </label>
          </div>
          <div>
            <label className="flex items-center text-xs">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => updateSetting('maintenanceMode', !settings.maintenanceMode)}
                className="mr-2"
              />
              Maintenance Mode
            </label>
          </div>
          {settings.maintenanceMode && (
            <div>
              <label className="block text-xs mb-1">Maintenance Message</label>
              <textarea
                value={settings.maintenanceMessage}
                onChange={(e) => updateSetting('maintenanceMessage', e.target.value)}
                className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                rows={2}
                placeholder="Site is under maintenance"
              />
            </div>
          )}
          <div>
            <label className="flex items-center text-xs">
              <input
                type="checkbox"
                checked={settings.registrationEnabled}
                onChange={(e) => updateSetting('registrationEnabled', !settings.registrationEnabled)}
                className="mr-2"
              />
              Enable User Registration
            </label>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🔔 Notifications</h2>
        <div className="space-y-3">
          <div>
            <label className="flex items-center text-xs">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => updateSetting('emailNotifications', !settings.emailNotifications)}
                className="mr-2"
              />
              Email Notifications
            </label>
          </div>
          <div>
            <label className="flex items-center text-xs">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => updateSetting('pushNotifications', !settings.pushNotifications)}
                className="mr-2"
              />
              Push Notifications
            </label>
          </div>
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
