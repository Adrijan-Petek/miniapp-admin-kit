'use client'

import { useAnnouncements } from '@/lib/hooks/useAnnouncements'
import { useSettings } from '@/lib/hooks/useSettings'

interface PublicPageProps {
  isLoggedIn?: boolean | null
}

export default function PublicPage({ isLoggedIn }: PublicPageProps) {
  const { announcements } = useAnnouncements()
  const { settings } = useSettings()

  const scrollingText = announcements.map(a => `📢 ${a.text}`).join(' • ')

  return (
    <div
      className="min-h-screen bg-white text-black"
      style={{
        fontFamily: settings.fontFamily
      }}
    >
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              {settings.showLogo && settings.logoUrl && (
                <img src={settings.logoUrl} alt="Logo" className="h-10 w-auto" />
              )}
              <span className="ml-3 text-xl font-bold text-gray-900">{settings.appName}</span>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-8">
              {settings.menuItems.filter(item => item.enabled).map(item => (
                <a
                  key={item.id}
                  href={item.url}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </a>
              ))}
            </nav>

            {/* Admin Actions */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <a
                  href="/admin"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Admin Panel
                </a>
              ) : (
                settings.showAdminLogin && (
                  <a
                    href="/login"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Admin Login
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <nav className="px-4 py-3 space-y-1">
            {settings.menuItems.filter(item => item.enabled).map(item => (
              <a
                key={item.id}
                href={item.url}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center p-4 pt-12">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 text-black">{settings.appName}</h1>
          <p className="text-lg text-gray-600 mb-8">{settings.appDescription}</p>
          {settings.showAnnouncements && (
            <div className="bg-gray-200 p-4 rounded-lg max-w-2xl mx-auto mb-8">
              <div className="text-sm text-yellow-600 whitespace-nowrap overflow-hidden">
                <div className="animate-marquee">
                  {scrollingText}
                </div>
              </div>
            </div>
          )}
          {settings.showGames && settings.menuItems.filter(item => item.enabled).length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {settings.menuItems.filter(item => item.enabled).map(item => (
                <a
                  key={item.id}
                  href={item.url}
                  className="bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-200"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-black mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}