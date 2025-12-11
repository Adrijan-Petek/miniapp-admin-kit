'use client'

import { useAnnouncements } from '@/lib/hooks/useAnnouncements'
import { useSettings } from '@/lib/hooks/useSettings'
import { useTheme } from '@/lib/hooks/useTheme'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SplashScreen from './SplashScreen'

export default function HomePage() {
  const { announcements } = useAnnouncements()
  const { settings } = useSettings()

  // Handle SSR - theme might not be available during server rendering
  let theme = 'dark'
  let toggleTheme = () => {}
  try {
    const themeContext = useTheme()
    theme = themeContext.theme
    toggleTheme = themeContext.toggleTheme
  } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
    // Theme context not available during SSR, use default
  }

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [showSplash, setShowSplash] = useState(true)
  const [logoClickCount, setLogoClickCount] = useState(0) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const router = useRouter()

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  const handleLogoClick = () => {
    setLogoClickCount(prev => {
      const newCount = prev + 1
      if (newCount >= 5) {
        setShowAdminLogin(true)
        return 0 // Reset counter
      }
      return newCount
    })
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminCredentials),
      })

      const data = await response.json()

      if (response.ok && data.ok) {
        // Login successful, redirect to admin
        router.push('/admin')
      } else {
        setLoginError(data.error || 'Login failed')
      }
    } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      setLoginError('Network error. Please try again.')
    }
  }

  useEffect(() => {
    // Check if logged in by calling API
    fetch('/api/me')
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.authenticated)
      })
      .catch(() => setIsLoggedIn(false))
  }, [])

  // Safety check - if settings is not loaded yet, show loading
  if (!settings || !settings.appName) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: '#0f172a', // Default dark background
          color: '#f1f5f9' // Default text color
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  const scrollingText = announcements?.map(a => `📢 ${a.text}`).join(' • ') || ''

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 dark:bg-white dark:text-gray-900"
      style={{
        fontFamily: settings.fontFamily,
        backgroundColor: theme === 'dark' ? (settings.heroBackgroundColor || '#0f172a') : (settings.heroBackgroundColor || '#ffffff'),
        color: theme === 'dark' ? (settings.heroTextColor || '#f1f5f9') : (settings.heroTextColor || '#1f2937')
      }}
    >
      {/* Header */}
      {settings.showHeader && (
        <header
          className={`shadow-sm border-b border-slate-800 dark:border-gray-200 ${settings.headerShadow ? 'shadow-md' : ''}`}
          style={{
            backgroundColor: theme === 'dark' ? (settings.headerBackgroundColor || '#1e293b') : (settings.headerBackgroundColor || '#f9fafb'),
            color: theme === 'dark' ? (settings.headerTextColor || '#f1f5f9') : (settings.headerTextColor || '#1f2937'),
            height: settings.headerHeight
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
              {settings.showLogo && settings.logoUrl && (
                <img src={settings.logoUrl} alt="Logo" className="h-10 w-auto" />
              )}
              <span className={`ml-3 text-xl font-bold text-slate-100 dark:text-gray-900`} style={{ color: theme === 'dark' ? (settings.headerTextColor || '#f1f5f9') : (settings.headerTextColor || '#1f2937') }}>
                {settings.appName}
              </span>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-8">
              {settings.menuItems?.filter(item => item.enabled && (!item.adminOnly || isLoggedIn)).map(item => (
                <a
                  key={item.id}
                  href={item.url}
                  className="px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2 text-slate-300 dark:text-gray-600 hover:text-blue-400 dark:hover:text-blue-600"
                  style={{ color: theme === 'dark' ? (settings.headerTextColor || '#cbd5e1') : '#6b7280' }}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </a>
              ))}
            </nav>

            {/* Theme Toggle & Admin Login */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-colors duration-200 hover:bg-slate-700 dark:hover:bg-gray-200"
                style={{ color: settings.headerTextColor || '#cbd5e1' }}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Admin Login Button */}
              {settings.showAdminLogin && (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden border-t border-slate-800 dark:border-gray-200`}>
            <nav className="px-4 py-3 space-y-1">
              {settings.menuItems?.filter(item => item.enabled && (!item.adminOnly || isLoggedIn)).map(item => (
                <a
                  key={item.id}
                  href={item.url}
                  className="block px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center space-x-2 text-slate-300 dark:text-gray-600 hover:text-blue-400 dark:hover:text-blue-600"
                  style={{ color: theme === 'dark' ? (settings.headerTextColor || '#cbd5e1') : '#6b7280' }}
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
            <h1 className={`text-4xl md:text-6xl font-bold mb-4 text-slate-100 dark:text-gray-900`} style={{ color: theme === 'dark' ? (settings.heroTextColor || '#f1f5f9') : (settings.heroTextColor || '#1f2937') }}>
              {settings.heroTitle}
            </h1>
            <p className={`text-lg md:text-xl mb-8 text-slate-300 dark:text-gray-600`} style={{ color: theme === 'dark' ? (settings.heroTextColor || '#cbd5e1') : '#6b7280' }}>
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
          <h1 className={`text-4xl font-bold mb-4 text-slate-100 dark:text-gray-900`}>{settings.appName}</h1>
          <p className={`text-lg text-slate-300 dark:text-gray-600 mb-8`}>{settings.appDescription}</p>
          {settings.showAnnouncements && scrollingText && (
            <div className={`p-4 rounded-lg max-w-2xl mx-auto mb-8 border bg-slate-800 dark:bg-gray-50 border-slate-700 dark:border-gray-200`}>
              <div className={`text-sm whitespace-nowrap overflow-hidden text-yellow-400 dark:text-yellow-600`}>
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
              {settings.menuItems?.filter(item => item.enabled && (!item.adminOnly || isLoggedIn)).map(item => (
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
          className={`mt-auto py-8 px-4 border-t border-slate-800 dark:border-gray-200`}
          style={{
            backgroundColor: theme === 'dark' ? (settings.footerBackgroundColor || '#1e293b') : (settings.footerBackgroundColor || '#f9fafb'),
            color: theme === 'dark' ? (settings.footerTextColor || '#cbd5e1') : '#6b7280'
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

            <div className={`mt-8 pt-8 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} text-center text-sm opacity-80`}>
              {settings.footerCopyright}
            </div>
          </div>
        </footer>
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className={`border rounded-xl p-6 w-full max-w-md mx-4 ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Admin Access</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Enter your administrator credentials</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Username</label>
                <input
                  type="text"
                  value={adminCredentials.username}
                  onChange={(e) => setAdminCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-500 ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className={`block text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Password</label>
                <input
                  type="password"
                  value={adminCredentials.password}
                  onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-500 ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                  placeholder="Enter password"
                  required
                />
              </div>

              {loginError && (
                <div className="text-red-400 text-sm text-center">
                  {loginError}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminLogin(false)
                    setAdminCredentials({ username: '', password: '' })
                    setLoginError('')
                  }}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded transition-colors ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                >
                  Login
                </button>
              </div>
            </form>

            <div className={`mt-4 text-center text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>
              Click the logo 5 times to access admin panel
            </div>
          </div>
        </div>
      )}
    </div>
  )
}