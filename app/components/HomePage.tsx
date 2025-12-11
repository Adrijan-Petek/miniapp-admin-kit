'use client'

import { useAnnouncements } from '@/lib/hooks/useAnnouncements'
import { useSettings } from '@/lib/hooks/useSettings'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { announcements } = useAnnouncements()
  const { settings } = useSettings()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if logged in by calling API
    fetch('/api/me')
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.authenticated)
      })
      .catch(() => setIsLoggedIn(false))
  }, [])

  const scrollingText = announcements?.map(a => `📢 ${a.text}`).join(' • ') || ''

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100"
      style={{
        fontFamily: settings.fontFamily,
        backgroundColor: settings.heroBackgroundColor || '#0f172a',
        color: settings.heroTextColor || '#f1f5f9'
      }}
    >
      {/* Header */}
      {settings.showHeader && (
        <header
          className={`shadow-sm border-b border-slate-800 ${settings.headerShadow ? 'shadow-md' : ''}`}
          style={{
            backgroundColor: settings.headerBackgroundColor || '#1e293b',
            color: settings.headerTextColor || '#f1f5f9',
            height: settings.headerHeight
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              {settings.showLogo && settings.logoUrl && (
                <img src={settings.logoUrl} alt="Logo" className="h-10 w-auto" />
              )}
              <span className="ml-3 text-xl font-bold text-slate-100" style={{ color: settings.headerTextColor || '#f1f5f9' }}>
                {settings.appName}
              </span>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-8">
              {settings.menuItems?.filter(item => item.enabled).map(item => (
                <a
                  key={item.id}
                  href={item.url}
                  className="px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2 text-slate-300 hover:text-blue-400"
                  style={{ color: settings.headerTextColor || '#cbd5e1' }}
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
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  style={{
                    backgroundColor: settings.primaryColor,
                    color: 'white'
                  }}
                >
                  Admin Panel
                </a>
              ) : (
                settings.showAdminLogin && (
                  <a
                    href="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    style={{
                      backgroundColor: settings.secondaryColor,
                      color: 'white'
                    }}
                  >
                    Admin Login
                  </a>
                )
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-slate-800">
            <nav className="px-4 py-3 space-y-1">
              {settings.menuItems?.filter(item => item.enabled).map(item => (
                <a
                  key={item.id}
                  href={item.url}
                  className="block px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center space-x-2 text-slate-300 hover:text-blue-400"
                  style={{ color: settings.headerTextColor || '#cbd5e1' }}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </header>
      )}

      {/* Hero Section */}
      {settings.showHero && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-slate-100" style={{ color: settings.heroTextColor || '#f1f5f9' }}>
              {settings.heroTitle}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-slate-300" style={{ color: settings.heroTextColor || '#cbd5e1' }}>
              {settings.heroSubtitle}
            </p>
            {settings.heroButtonText && (
              <a
                href={settings.heroButtonUrl}
                className="inline-block px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
                style={{
                  backgroundColor: settings.heroButtonColor,
                  color: 'white'
                }}
              >
                {settings.heroButtonText}
              </a>
            )}
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center p-4 pt-12">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 text-slate-100">{settings.appName}</h1>
          <p className="text-lg text-slate-300 mb-8">{settings.appDescription}</p>
          {settings.showAnnouncements && scrollingText && (
            <div className="bg-slate-800 p-4 rounded-lg max-w-2xl mx-auto mb-8 border border-slate-700">
              <div className="text-sm text-yellow-400 whitespace-nowrap overflow-hidden">
                <div className="animate-marquee">
                  {scrollingText}
                </div>
              </div>
            </div>
          )}
          {settings.showGames && settings.menuItems?.filter(item => item.enabled).length > 0 && (
            <div
              className={`mt-8 gap-4 ${
                settings.menuLayout === 'grid'
                  ? `grid grid-cols-1 md:grid-cols-${Math.min(settings.menuColumns, 4)}`
                  : settings.menuLayout === 'list'
                  ? 'flex flex-col space-y-4'
                  : 'flex overflow-x-auto space-x-4 pb-4'
              }`}
            >
              {settings.menuItems?.filter(item => item.enabled).map(item => (
                <a
                  key={item.id}
                  href={item.url}
                  className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-700 ${
                    settings.enableAnimations ? 'transform hover:scale-105' : ''
                  }`}
                  style={{
                    background: settings.menuCardBackground || 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                    borderRadius: settings.menuCardBorderRadius,
                    boxShadow: settings.menuCardShadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : 'none',
                    minWidth: settings.menuLayout === 'carousel' ? '250px' : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    if (settings.menuCardHoverColor) {
                      e.currentTarget.style.background = settings.menuCardHoverColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = settings.menuCardBackground || 'linear-gradient(135deg, #1e293b 0%, #334155 100%)';
                  }}
                >
                  <div className="mb-2" style={{ fontSize: settings.menuIconSize }}>{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-1 text-slate-100" style={{ color: settings.menuTitleColor || '#f1f5f9' }}>{item.title}</h3>
                  <p className="text-sm text-slate-300" style={{ color: settings.menuDescriptionColor || '#cbd5e1' }}>{item.description}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      {settings.showFooter && (
        <footer
          className="mt-auto py-8 px-4 border-t border-slate-800"
          style={{
            backgroundColor: settings.footerBackgroundColor || '#1e293b',
            color: settings.footerTextColor || '#cbd5e1'
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Brand */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{settings.appName}</h3>
                <p className="text-sm opacity-80">{settings.appDescription}</p>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {settings.footerLinks?.map((link, index) => (
                    <li key={index}>
                      <a href={link.url} className="text-sm hover:opacity-80 transition-opacity">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social & Contact */}
              {settings.showSocialLinks && (
                <div>
                  <h4 className="text-lg font-semibold mb-4">Connect</h4>
                  <div className="flex space-x-4">
                    {settings.twitterUrl && (
                      <a href={settings.twitterUrl} className="text-2xl hover:opacity-80">🐦</a>
                    )}
                    {settings.discordUrl && (
                      <a href={settings.discordUrl} className="text-2xl hover:opacity-80">💬</a>
                    )}
                    {settings.telegramUrl && (
                      <a href={settings.telegramUrl} className="text-2xl hover:opacity-80">✈️</a>
                    )}
                  </div>
                  {settings.showContactInfo && settings.contactEmail && (
                    <p className="text-sm mt-4">
                      <a href={`mailto:${settings.contactEmail}`} className="hover:opacity-80">
                        {settings.contactEmail}
                      </a>
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700 text-center text-sm opacity-80">
              {settings.footerCopyright}
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}