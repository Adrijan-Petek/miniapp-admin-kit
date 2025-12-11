import { useState, useEffect } from 'react'

export interface CustomPage {
  id: number
  title: string
  slug: string
  content: string
  published: boolean
}

export interface Settings {
  // Theme & Branding
  themeColor: string
  fontFamily: string
  logoUrl: string
  backgroundImageUrl: string
  faviconUrl: string

  // App Information
  appName: string
  appDescription: string
  appVersion: string
  contactEmail: string
  supportUrl: string

  // Social & Links
  twitterUrl: string
  discordUrl: string
  telegramUrl: string
  websiteUrl: string

  // Features & Access
  adminAccessMode: 'admins' | 'owner'
  frontendEditMode: boolean
  maintenanceMode: boolean
  registrationEnabled: boolean

  // Analytics & Tracking
  googleAnalyticsId: string
  enableAnalytics: boolean

  // SEO & Meta
  metaTitle: string
  metaDescription: string
  metaKeywords: string

  // Privacy & Terms
  privacyPolicyUrl: string
  termsOfServiceUrl: string
  cookiePolicyUrl: string

  // Notifications
  emailNotifications: boolean
  pushNotifications: boolean
  maintenanceMessage: string

  // Public Page Display
  showLogo: boolean
  showAnnouncements: boolean
  showGames: boolean
  showAdminLogin: boolean
  customPages: CustomPage[]
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    // Theme & Branding
    themeColor: '#0f172a',
    fontFamily: 'Inter, sans-serif',
    logoUrl: 'https://example.com/logo.png',
    backgroundImageUrl: 'https://example.com/bg.png',
    faviconUrl: 'https://example.com/favicon.ico',

    // App Information
    appName: 'MiniApp',
    appDescription: 'Play games, earn rewards, and claim your tokens!',
    appVersion: '1.0.0',
    contactEmail: 'support@example.com',
    supportUrl: 'https://example.com/support',

    // Social & Links
    twitterUrl: '',
    discordUrl: '',
    telegramUrl: '',
    websiteUrl: '',

    // Features & Access
    adminAccessMode: 'owner',
    frontendEditMode: false,
    maintenanceMode: false,
    registrationEnabled: true,

    // Analytics & Tracking
    googleAnalyticsId: '',
    enableAnalytics: false,

    // SEO & Meta
    metaTitle: 'MiniApp - Play Games & Earn Rewards',
    metaDescription: 'Play games, earn rewards, and claim your tokens in our mini app ecosystem.',
    metaKeywords: 'games, rewards, tokens, mini app',

    // Privacy & Terms
    privacyPolicyUrl: '',
    termsOfServiceUrl: '',
    cookiePolicyUrl: '',

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    maintenanceMessage: 'We are currently performing maintenance. Please check back soon.',

    // Public Page Display
    showLogo: true,
    showAnnouncements: true,
    showGames: true,
    showAdminLogin: true,
    customPages: [
      {
        id: 1,
        title: 'About Us',
        slug: 'about',
        content: 'Welcome to our mini app! Learn more about our mission and vision.',
        published: true
      },
      {
        id: 2,
        title: 'Help & Support',
        slug: 'help',
        content: 'Need help? Check out our FAQ and contact information.',
        published: false
      }
    ]
  })

  useEffect(() => {
    const saved = localStorage.getItem('miniapp-settings')
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse settings', e)
      }
    }
  }, [])

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value }
      localStorage.setItem('miniapp-settings', JSON.stringify(newSettings))
      return newSettings
    })
  }

  return {
    settings,
    updateSetting
  }
}