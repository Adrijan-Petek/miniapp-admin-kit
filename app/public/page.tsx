'use client'

import { useAnnouncements } from '@/lib/hooks/useAnnouncements'
import { useSettings } from '@/lib/hooks/useSettings'

export default function PublicPage() {
  const { announcements } = useAnnouncements()
  const { settings } = useSettings()

  const scrollingText = announcements.map(a => `📢 ${a.text}`).join(' • ')

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundColor: settings.themeColor,
        fontFamily: settings.fontFamily,
        backgroundImage: settings.backgroundImageUrl ? `url(${settings.backgroundImageUrl})` : undefined,
        backgroundSize: 'cover'
      }}
    >
      {settings.logoUrl && (
        <img src={settings.logoUrl} alt="Logo" className="mb-8 max-w-xs" />
      )}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to MiniApp</h1>
        <p className="text-lg text-gray-200 mb-8">Play games, earn rewards, and claim your tokens!</p>
        <div className="bg-black/50 p-4 rounded-lg max-w-2xl">
          <div className="text-sm text-yellow-300 whitespace-nowrap overflow-hidden">
            <div className="animate-marquee">
              {scrollingText}
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-white">🎮 Match-3</h3>
            <p className="text-gray-300">Classic puzzle game</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-white">🃏 Card Game</h3>
            <p className="text-gray-300">Fun card matching</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-white">📅 Daily Claim</h3>
            <p className="text-gray-300">Daily rewards</p>
          </div>
        </div>
        <div className="mt-8">
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
          >
            Admin Login
          </a>
        </div>
      </div>
    </div>
  )
}