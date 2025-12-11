import { useState, useEffect } from 'react'

export interface CustomPage {
  id: number
  title: string
  slug: string
  content: string
  published: boolean
}

export interface MenuItem {
  id: string
  title: string
  description: string
  icon: string
  url: string
  enabled: boolean
}

export interface Settings {
  // Theme & Branding
  themeColor: string
  fontFamily: string
  logoUrl: string
  backgroundImageUrl: string
  faviconUrl: string
  primaryColor: string
  secondaryColor: string
  accentColor: string

  // App Information
  appName: string
  appDescription: string
  appVersion: string
  contactEmail: string
  supportUrl: string
  tagline: string

  // Social & Links
  twitterUrl: string
  discordUrl: string
  telegramUrl: string
  websiteUrl: string
  githubUrl: string
  instagramUrl: string

  // Features & Access
  adminAccessMode: 'admins' | 'owner'
  frontendEditMode: boolean
  maintenanceMode: boolean
  registrationEnabled: boolean

  // Analytics & Tracking
  googleAnalyticsId: string
  enableAnalytics: boolean
  enableTracking: boolean

  // SEO & Meta
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  ogImageUrl: string

  // Privacy & Terms
  privacyPolicyUrl: string
  termsOfServiceUrl: string
  cookiePolicyUrl: string

  // Notifications
  emailNotifications: boolean
  pushNotifications: boolean
  maintenanceMessage: string

  // Header Settings
  showHeader: boolean
  headerBackgroundColor: string
  headerTextColor: string
  headerHeight: string
  headerShadow: boolean

  // Hero Section
  showHero: boolean
  heroTitle: string
  heroSubtitle: string
  heroBackgroundColor: string
  heroTextColor: string
  heroImageUrl: string
  heroButtonText: string
  heroButtonUrl: string
  heroButtonColor: string

  // Menu/Card Settings
  menuLayout: 'grid' | 'list' | 'carousel'
  menuColumns: number
  menuCardBackground: string
  menuCardHoverColor: string
  menuCardBorderRadius: string
  menuCardShadow: boolean
  menuIconSize: string
  menuTitleColor: string
  menuDescriptionColor: string

  // Public Page Display
  showLogo: boolean
  showAnnouncements: boolean
  showGames: boolean
  showAdminLogin: boolean
  showFooter: boolean
  showSocialLinks: boolean
  showContactInfo: boolean
  menuItems: MenuItem[]
  customPages: CustomPage[]

  // Footer Settings
  footerBackgroundColor: string
  footerTextColor: string
  footerCopyright: string
  footerLinks: Array<{ title: string; url: string }>

  // Advanced
  customCSS: string
  customJS: string
  enableAnimations: boolean
  animationSpeed: 'slow' | 'normal' | 'fast'
  splashAnimation: 'bounce' | 'fade' | 'slide' | 'zoom' | 'rotate' | 'pulse' | 'shake' | 'flip' | 'glow' | 'wave'
  splashLogoUrl: string
  splashLogoSize: 'small' | 'medium' | 'large'

  // Database Configuration
  databaseProvider: 'vercel-postgres' | 'supabase' | 'planetscale' | 'mongodb-atlas' | 'railway' | 'neon' | 'cockroachdb' | 'custom'
  databaseUrl: string
  databaseName: string
  databaseHost: string
  databasePort: string
  databaseUsername: string
  databasePassword: string
  enableDatabaseConnection: boolean
  databaseConnectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error'
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    // Theme & Branding
    themeColor: '#0f172a',
    fontFamily: 'Inter, sans-serif',
    logoUrl: 'https://example.com/logo.png',
    backgroundImageUrl: 'https://example.com/bg.png',
    faviconUrl: 'https://example.com/favicon.ico',
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    accentColor: '#f59e0b',

    // App Information
    appName: 'MiniApp',
    appDescription: 'Play games, earn rewards, and claim your tokens!',
    appVersion: '1.0.0',
    contactEmail: 'support@example.com',
    supportUrl: 'https://example.com/support',
    tagline: 'Your Ultimate Gaming Experience',

    // Social & Links
    twitterUrl: '',
    discordUrl: '',
    telegramUrl: '',
    websiteUrl: '',
    githubUrl: '',
    instagramUrl: '',

    // Features & Access
    adminAccessMode: 'owner',
    frontendEditMode: false,
    maintenanceMode: false,
    registrationEnabled: true,

    // Analytics & Tracking
    googleAnalyticsId: '',
    enableAnalytics: false,
    enableTracking: false,

    // SEO & Meta
    metaTitle: 'MiniApp - Play Games & Earn Rewards',
    metaDescription: 'Play games, earn rewards, and claim your tokens in our mini app ecosystem.',
    metaKeywords: 'games, rewards, tokens, mini app',
    ogImageUrl: 'https://example.com/og-image.png',

    // Privacy & Terms
    privacyPolicyUrl: '',
    termsOfServiceUrl: '',
    cookiePolicyUrl: '',

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    maintenanceMessage: 'We are currently performing maintenance. Please check back soon.',

    // Header Settings
    showHeader: true,
    headerBackgroundColor: '#1e293b',
    headerTextColor: '#f1f5f9',
    headerHeight: '4rem',
    headerShadow: true,

    // Hero Section
    showHero: true,
    heroTitle: 'Welcome to MiniApp',
    heroSubtitle: 'Play games, earn rewards, and claim your tokens!',
    heroBackgroundColor: '#0f172a',
    heroTextColor: '#f1f5f9',
    heroImageUrl: '',
    heroButtonText: 'Get Started',
    heroButtonUrl: '/login',
    heroButtonColor: '#3b82f6',

    // Menu/Card Settings
    menuLayout: 'grid',
    menuColumns: 3,
    menuCardBackground: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    menuCardHoverColor: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
    menuCardBorderRadius: '0.75rem',
    menuCardShadow: true,
    menuIconSize: '3rem',
    menuTitleColor: '#f1f5f9',
    menuDescriptionColor: '#cbd5e1',

    // Public Page Display
    showLogo: true,
    showAnnouncements: true,
    showGames: true,
    showAdminLogin: true,
    showFooter: true,
    showSocialLinks: true,
    showContactInfo: true,
    menuItems: [
      {
        id: '1',
        title: '🎮 Match-3',
        description: 'Classic puzzle game',
        icon: '🎮',
        url: '/games/match3',
        enabled: true
      },
      {
        id: '2',
        title: '🃏 Card Game',
        description: 'Fun card matching',
        icon: '🃏',
        url: '/games/cards',
        enabled: true
      },
      {
        id: '3',
        title: '📅 Daily Claim',
        description: 'Daily rewards',
        icon: '📅',
        url: '/daily',
        enabled: true
      }
    ],
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
    ],

    // Footer Settings
    footerBackgroundColor: '#1e293b',
    footerTextColor: '#cbd5e1',
    footerCopyright: '© 2025 MiniApp. All rights reserved.',
    footerLinks: [
      { title: 'Privacy Policy', url: '/privacy' },
      { title: 'Terms of Service', url: '/terms' },
      { title: 'Contact', url: '/contact' }
    ],

    // Advanced
    customCSS: '',
    customJS: '',
    enableAnimations: true,
    animationSpeed: 'normal',
    splashAnimation: 'bounce',
    splashLogoUrl: '',
    splashLogoSize: 'medium',

    // Database Configuration
    databaseProvider: 'vercel-postgres',
    databaseUrl: '',
    databaseName: '',
    databaseHost: '',
    databasePort: '',
    databaseUsername: '',
    databasePassword: '',
    enableDatabaseConnection: false,
    databaseConnectionStatus: 'disconnected'
  })

  useEffect(() => {
    const saved = localStorage.getItem('miniapp-settings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Merge with defaults to ensure all properties exist
        setSettings(prev => ({ ...prev, ...parsed }))
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