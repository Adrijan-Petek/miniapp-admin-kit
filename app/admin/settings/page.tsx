'use client'

import { useSettings } from '@/lib/hooks/useSettings'
import { useDatabase } from '@/lib/database'
import { useGameSettings } from '@/lib/hooks/useGameSettings'

export default function SettingsPage() {
  const { settings, updateSetting } = useSettings()
  const { connect, disconnect, testConnection, getConnectionStatus, getProviderInfo } = useDatabase()
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

      {/* Menu Management */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🍽️ Menu Management</h2>
        <div className="space-y-4">
          {settings.menuItems.map((item, index) => (
            <div key={item.id} className="border border-slate-700 rounded-lg p-3 bg-slate-800/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1">Title</label>
                  <input
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...settings.menuItems]
                      newItems[index].title = e.target.value
                      updateSetting('menuItems', newItems)
                    }}
                    className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                    placeholder="Menu Item Title"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Icon (emoji)</label>
                  <input
                    value={item.icon}
                    onChange={(e) => {
                      const newItems = [...settings.menuItems]
                      newItems[index].icon = e.target.value
                      updateSetting('menuItems', newItems)
                    }}
                    className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                    placeholder="🎮"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Description</label>
                  <input
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...settings.menuItems]
                      newItems[index].description = e.target.value
                      updateSetting('menuItems', newItems)
                    }}
                    className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                    placeholder="Short description"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">URL</label>
                  <input
                    value={item.url}
                    onChange={(e) => {
                      const newItems = [...settings.menuItems]
                      newItems[index].url = e.target.value
                      updateSetting('menuItems', newItems)
                    }}
                    className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                    placeholder="/games/match3"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={(e) => {
                      const newItems = [...settings.menuItems]
                      newItems[index].enabled = e.target.checked
                      updateSetting('menuItems', newItems)
                    }}
                    className="rounded border-slate-600 bg-slate-900"
                  />
                  <span className="text-xs">Enabled</span>
                </label>
                <button
                  onClick={() => {
                    const newItems = settings.menuItems.filter((_, i) => i !== index)
                    updateSetting('menuItems', newItems)
                  }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const newItem = {
                id: Date.now().toString(),
                title: 'New Menu Item',
                description: 'Description',
                icon: '⭐',
                url: '/',
                enabled: true
              }
              updateSetting('menuItems', [...settings.menuItems, newItem])
            }}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
          >
            Add Menu Item
          </button>
        </div>
      </section>

      {/* Header Settings */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">📋 Header Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showHeader}
                onChange={(e) => updateSetting('showHeader', e.target.checked)}
                className="rounded border-slate-600 bg-slate-900"
              />
              <span className="text-xs">Show Header</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.headerShadow}
                onChange={(e) => updateSetting('headerShadow', e.target.checked)}
                className="rounded border-slate-600 bg-slate-900"
              />
              <span className="text-xs">Header Shadow</span>
            </label>
          </div>
          <div>
            <label className="block text-xs mb-1">Header Background Color</label>
            <input
              type="color"
              value={settings.headerBackgroundColor}
              onChange={(e) => updateSetting('headerBackgroundColor', e.target.value)}
              className="w-full h-10 rounded border border-slate-600 bg-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Header Text Color</label>
            <input
              type="color"
              value={settings.headerTextColor}
              onChange={(e) => updateSetting('headerTextColor', e.target.value)}
              className="w-full h-10 rounded border border-slate-600 bg-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Header Height</label>
            <select
              value={settings.headerHeight}
              onChange={(e) => updateSetting('headerHeight', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            >
              <option value="3rem">Small (3rem)</option>
              <option value="4rem">Medium (4rem)</option>
              <option value="5rem">Large (5rem)</option>
              <option value="6rem">Extra Large (6rem)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🎯 Hero Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showHero}
                onChange={(e) => updateSetting('showHero', e.target.checked)}
                className="rounded border-slate-600 bg-slate-900"
              />
              <span className="text-xs">Show Hero Section</span>
            </label>
          </div>
          <div>
            <label className="block text-xs mb-1">Hero Background Color</label>
            <input
              type="color"
              value={settings.heroBackgroundColor}
              onChange={(e) => updateSetting('heroBackgroundColor', e.target.value)}
              className="w-full h-10 rounded border border-slate-600 bg-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Hero Text Color</label>
            <input
              type="color"
              value={settings.heroTextColor}
              onChange={(e) => updateSetting('heroTextColor', e.target.value)}
              className="w-full h-10 rounded border border-slate-600 bg-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Button Color</label>
            <input
              type="color"
              value={settings.heroButtonColor}
              onChange={(e) => updateSetting('heroButtonColor', e.target.value)}
              className="w-full h-10 rounded border border-slate-600 bg-slate-900"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs mb-1">Hero Title</label>
            <input
              value={settings.heroTitle}
              onChange={(e) => updateSetting('heroTitle', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="Welcome to MiniApp"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs mb-1">Hero Subtitle</label>
            <textarea
              value={settings.heroSubtitle}
              onChange={(e) => updateSetting('heroSubtitle', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              rows={2}
              placeholder="Play games, earn rewards, and claim your tokens!"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Button Text</label>
            <input
              value={settings.heroButtonText}
              onChange={(e) => updateSetting('heroButtonText', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="Get Started"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Button URL</label>
            <input
              value={settings.heroButtonUrl}
              onChange={(e) => updateSetting('heroButtonUrl', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="/login"
            />
          </div>
        </div>
      </section>

      {/* Menu/Card Styling */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🎨 Menu/Card Styling</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1">Menu Layout</label>
            <select
              value={settings.menuLayout}
              onChange={(e) => updateSetting('menuLayout', e.target.value as 'grid' | 'list' | 'carousel')}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            >
              <option value="grid">Grid</option>
              <option value="list">List</option>
              <option value="carousel">Carousel</option>
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1">Grid Columns</label>
            <select
              value={settings.menuColumns}
              onChange={(e) => updateSetting('menuColumns', parseInt(e.target.value))}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            >
              <option value={1}>1 Column</option>
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
              <option value={4}>4 Columns</option>
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1">Card Background</label>
            <input
              value={settings.menuCardBackground}
              onChange={(e) => updateSetting('menuCardBackground', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Card Hover Color</label>
            <input
              value={settings.menuCardHoverColor}
              onChange={(e) => updateSetting('menuCardHoverColor', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Border Radius</label>
            <select
              value={settings.menuCardBorderRadius}
              onChange={(e) => updateSetting('menuCardBorderRadius', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            >
              <option value="0.5rem">Small (0.5rem)</option>
              <option value="0.75rem">Medium (0.75rem)</option>
              <option value="1rem">Large (1rem)</option>
              <option value="1.5rem">Extra Large (1.5rem)</option>
            </select>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.menuCardShadow}
                onChange={(e) => updateSetting('menuCardShadow', e.target.checked)}
                className="rounded border-slate-600 bg-slate-900"
              />
              <span className="text-xs">Card Shadow</span>
            </label>
          </div>
          <div>
            <label className="block text-xs mb-1">Icon Size</label>
            <select
              value={settings.menuIconSize}
              onChange={(e) => updateSetting('menuIconSize', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            >
              <option value="2rem">Small (2rem)</option>
              <option value="2.5rem">Medium (2.5rem)</option>
              <option value="3rem">Large (3rem)</option>
              <option value="3.5rem">Extra Large (3.5rem)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1">Title Color</label>
            <input
              type="color"
              value={settings.menuTitleColor}
              onChange={(e) => updateSetting('menuTitleColor', e.target.value)}
              className="w-full h-10 rounded border border-slate-600 bg-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Description Color</label>
            <input
              type="color"
              value={settings.menuDescriptionColor}
              onChange={(e) => updateSetting('menuDescriptionColor', e.target.value)}
              className="w-full h-10 rounded border border-slate-600 bg-slate-900"
            />
          </div>
        </div>
      </section>

      {/* Footer Settings */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">📄 Footer Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showFooter}
                onChange={(e) => updateSetting('showFooter', e.target.checked)}
                className="rounded border-slate-600 bg-slate-900"
              />
              <span className="text-xs">Show Footer</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showSocialLinks}
                onChange={(e) => updateSetting('showSocialLinks', e.target.checked)}
                className="rounded border-slate-600 bg-slate-900"
              />
              <span className="text-xs">Show Social Links</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showContactInfo}
                onChange={(e) => updateSetting('showContactInfo', e.target.checked)}
                className="rounded border-slate-600 bg-slate-900"
              />
              <span className="text-xs">Show Contact Info</span>
            </label>
          </div>
          <div>
            <label className="block text-xs mb-1">Footer Background Color</label>
            <input
              type="color"
              value={settings.footerBackgroundColor}
              onChange={(e) => updateSetting('footerBackgroundColor', e.target.value)}
              className="w-full h-10 rounded border border-slate-600 bg-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Footer Text Color</label>
            <input
              type="color"
              value={settings.footerTextColor}
              onChange={(e) => updateSetting('footerTextColor', e.target.value)}
              className="w-full h-10 rounded border border-slate-600 bg-slate-900"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs mb-1">Footer Copyright</label>
            <input
              value={settings.footerCopyright}
              onChange={(e) => updateSetting('footerCopyright', e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
              placeholder="© 2025 MiniApp. All rights reserved."
            />
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
        <h2 className="text-sm font-semibold mb-3">📋 Contract Addresses (Mockup)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>Treasury: 0x1234567890123456789012345678901234567890</div>
          <div>Match3Game: 0x2345678901234567890123456789012345678901</div>
          <div>CardGame: 0x3456789012345678901234567890123456789012</div>
          <div>DailyClaim: 0x4567890123456789012345678901234567890123</div>
          <div>Token: 0x5678901234567890123456789012345678901234</div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🎭 Advanced Settings</h2>
        <div className="space-y-4">
          {/* Splash Screen Settings */}
          <div>
            <h3 className="text-xs font-medium mb-2 text-slate-300">Splash Screen</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Logo URL</label>
                <input
                  type="url"
                  value={settings.splashLogoUrl}
                  onChange={(e) => updateSetting('splashLogoUrl', e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Logo Size</label>
                <select
                  value={settings.splashLogoSize}
                  onChange={(e) => updateSetting('splashLogoSize', e.target.value as 'small' | 'medium' | 'large')}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                >
                  <option value="small">Small (64px)</option>
                  <option value="medium">Medium (96px)</option>
                  <option value="large">Large (128px)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Animation Settings */}
          <div>
            <h3 className="text-xs font-medium mb-2 text-slate-300">Animations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Enable Animations</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.enableAnimations}
                    onChange={(e) => updateSetting('enableAnimations', e.target.checked)}
                    className="rounded border-slate-600 bg-slate-900"
                  />
                  <span className="text-xs text-slate-400">Enable hover and transition effects</span>
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1">Animation Speed</label>
                <select
                  value={settings.animationSpeed}
                  onChange={(e) => updateSetting('animationSpeed', e.target.value as 'slow' | 'normal' | 'fast')}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                >
                  <option value="slow">Slow</option>
                  <option value="normal">Normal</option>
                  <option value="fast">Fast</option>
                </select>
              </div>
            </div>
          </div>

          {/* Splash Animation Selection */}
          <div>
            <label className="block text-xs mb-2">Splash Screen Animation</label>
            <select
              value={settings.splashAnimation}
              onChange={(e) => updateSetting('splashAnimation', e.target.value as any)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            >
              <option value="bounce">🎈 Bounce - Playful bouncing effect</option>
              <option value="fade">🌟 Fade - Smooth fade in/out</option>
              <option value="slide">📱 Slide - Slide from sides</option>
              <option value="zoom">🔍 Zoom - Scale in/out effect</option>
              <option value="rotate">🔄 Rotate - Spinning entrance</option>
              <option value="pulse">💓 Pulse - Heartbeat-like pulsing</option>
              <option value="shake">🌊 Shake - Gentle shaking motion</option>
              <option value="flip">🎭 Flip - 3D flip animation</option>
              <option value="glow">✨ Glow - Glowing border effect</option>
              <option value="wave">🌊 Wave - Waving motion</option>
            </select>
            <p className="text-xs text-slate-500 mt-1">Choose the animation style for your splash screen</p>
          </div>

          {/* Custom CSS */}
          <div>
            <label className="block text-xs mb-1">Custom CSS</label>
            <textarea
              value={settings.customCSS}
              onChange={(e) => updateSetting('customCSS', e.target.value)}
              placeholder="Enter custom CSS rules..."
              rows={4}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs font-mono"
            />
          </div>

          {/* Custom JS */}
          <div>
            <label className="block text-xs mb-1">Custom JavaScript</label>
            <textarea
              value={settings.customJS}
              onChange={(e) => updateSetting('customJS', e.target.value)}
              placeholder="Enter custom JavaScript code..."
              rows={4}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs font-mono"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🗄️ Database Configuration</h2>
        <div className="space-y-4">
          {/* Database Provider Selection */}
          <div>
            <label className="block text-xs mb-2">Database Provider</label>
            <select
              value={settings.databaseProvider}
              onChange={(e) => updateSetting('databaseProvider', e.target.value as any)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
            >
              <option value="vercel-postgres">🟢 Vercel Postgres (Free tier available)</option>
              <option value="supabase">🔥 Supabase (Free tier with 500MB)</option>
              <option value="planetscale">🌍 PlanetScale (Free tier with 1 database)</option>
              <option value="mongodb-atlas">🍃 MongoDB Atlas (Free tier with 512MB)</option>
              <option value="railway">🚂 Railway (Free tier with PostgreSQL)</option>
              <option value="neon">⚡ Neon (Free tier with 512MB)</option>
              <option value="cockroachdb">🪳 CockroachDB (Free tier available)</option>
              <option value="custom">🔧 Custom Connection</option>
            </select>
            <p className="text-xs text-slate-500 mt-1">Choose your database provider. Free tiers are highlighted.</p>
          </div>

          {/* Connection Toggle */}
          <div>
            <label className="flex items-center space-x-2 text-xs">
              <input
                type="checkbox"
                checked={settings.enableDatabaseConnection}
                onChange={(e) => updateSetting('enableDatabaseConnection', e.target.checked)}
                className="rounded border-slate-600 bg-slate-900"
              />
              <span>Enable Database Connection</span>
            </label>
            <p className="text-xs text-slate-500 mt-1">Toggle database connectivity on/off</p>
          </div>

          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              getConnectionStatus() === 'connected' ? 'bg-green-500' :
              getConnectionStatus() === 'connecting' ? 'bg-yellow-500 animate-pulse' :
              getConnectionStatus() === 'error' ? 'bg-red-500' : 'bg-gray-500'
            }`}></div>
            <span className="text-xs capitalize">{getConnectionStatus()}</span>
          </div>

          {/* Database URL (for most providers) */}
          <div>
            <label className="block text-xs mb-1">Database URL</label>
            <input
              type="url"
              value={settings.databaseUrl}
              onChange={(e) => updateSetting('databaseUrl', e.target.value)}
              placeholder="postgresql://username:password@host:port/database"
              className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs font-mono"
            />
            <p className="text-xs text-slate-500 mt-1">Connection string for your database</p>
          </div>

          {/* Individual Fields (for custom connections) */}
          {settings.databaseProvider === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Host</label>
                <input
                  type="text"
                  value={settings.databaseHost}
                  onChange={(e) => updateSetting('databaseHost', e.target.value)}
                  placeholder="localhost"
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Port</label>
                <input
                  type="text"
                  value={settings.databasePort}
                  onChange={(e) => updateSetting('databasePort', e.target.value)}
                  placeholder="5432"
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Database Name</label>
                <input
                  type="text"
                  value={settings.databaseName}
                  onChange={(e) => updateSetting('databaseName', e.target.value)}
                  placeholder="myapp"
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Username</label>
                <input
                  type="text"
                  value={settings.databaseUsername}
                  onChange={(e) => updateSetting('databaseUsername', e.target.value)}
                  placeholder="postgres"
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs mb-1">Password</label>
                <input
                  type="password"
                  value={settings.databasePassword}
                  onChange={(e) => updateSetting('databasePassword', e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-2 text-xs"
                />
              </div>
            </div>
          )}

          {/* Provider-specific information */}
          <div className="bg-slate-800/50 rounded-lg p-3">
            <h4 className="text-xs font-medium mb-2">📋 Provider Information</h4>
            <div className="text-xs text-slate-400 space-y-1">
              <p className="font-medium text-slate-300">{getProviderInfo().name}</p>
              <p>• Free tier: {getProviderInfo().freeTier}</p>
              {getProviderInfo().features.map((feature, index) => (
                <p key={index}>• {feature}</p>
              ))}
            </div>
          </div>

          {/* Test Connection Button */}
          <div className="flex gap-2">
            <button
              onClick={testConnection}
              disabled={!settings.enableDatabaseConnection}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-xs font-medium rounded"
            >
              Test Connection
            </button>
            <button
              onClick={disconnect}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-xs font-medium rounded"
            >
              Disconnect
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
