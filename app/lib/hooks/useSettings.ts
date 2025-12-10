import { useState, useEffect } from 'react'

export interface Settings {
  themeColor: string
  fontFamily: string
  logoUrl: string
  backgroundImageUrl: string
  adminAccessMode: 'admins' | 'owner'
  frontendEditMode: boolean
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    themeColor: '#0f172a', // slate-900
    fontFamily: 'Inter, sans-serif',
    logoUrl: 'https://example.com/logo.png',
    backgroundImageUrl: 'https://example.com/bg.png',
    adminAccessMode: 'owner',
    frontendEditMode: false
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