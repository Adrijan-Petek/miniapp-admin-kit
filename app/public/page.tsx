'use client'

import { useAnnouncements } from '@/lib/hooks/useAnnouncements'
import { useSettings } from '@/lib/hooks/useSettings'

export default function PublicPage() {
  const { announcements } = useAnnouncements()
  const { settings } = useSettings()

  const scrollingText = announcements.map(a => `📢 ${a.text}`).join(' • ')

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 !bg-white text-black"
      style={{
        fontFamily: settings.fontFamily
      }}
    >
      {settings.showLogo && settings.logoUrl && (
        <img src={settings.logoUrl} alt="Logo" className="mb-8 max-w-xs" />
      )}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-black">{settings.appName}</h1>
        <p className="text-lg text-gray-600 mb-8">{settings.appDescription}</p>
        {settings.showAnnouncements && (
          <div className="bg-gray-200 p-4 rounded-lg max-w-2xl">
            <div className="text-sm text-yellow-600 whitespace-nowrap overflow-hidden">
              <div className="animate-marquee">
                {scrollingText}
              </div>
            </div>
          </div>
        )}
        {settings.showGames && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-black">🎮 Match-3</h3>
              <p className="text-gray-600">Classic puzzle game</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-black">🃏 Card Game</h3>
              <p className="text-gray-600">Fun card matching</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-black">📅 Daily Claim</h3>
              <p className="text-gray-600">Daily rewards</p>
            </div>
          </div>
        )}
        {settings.showAdminLogin && (
          <div className="mt-8">
            <a
              href="/login"
              className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
            >
              Admin Login
            </a>
          </div>
        )}
      </div>
    </div>
  )
}