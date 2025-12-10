import { useState } from 'react'

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

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return {
    settings,
    updateSetting
  }
}