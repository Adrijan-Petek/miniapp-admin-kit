import { useState } from 'react'

export interface MiniApp {
  id: number
  name: string
  description: string
  url: string
  status: 'active' | 'inactive'
  category: string
}

export function useMiniApps() {
  const [miniApps, setMiniApps] = useState<MiniApp[]>([
    {
      id: 1,
      name: 'Match-3 Game',
      description: 'Classic match-3 puzzle game with boosters and leaderboards',
      url: '/games/match3',
      status: 'active',
      category: 'Games'
    },
    {
      id: 2,
      name: 'Card Game',
      description: 'Strategic card game with daily rewards',
      url: '/games/cards',
      status: 'active',
      category: 'Games'
    },
    {
      id: 3,
      name: 'Token Shop',
      description: 'Purchase in-game items and boosts with tokens',
      url: '/shop',
      status: 'active',
      category: 'Commerce'
    },
    {
      id: 4,
      name: 'Profile Manager',
      description: 'Manage your profile, rewards, and achievements',
      url: '/profile',
      status: 'active',
      category: 'Utility'
    }
  ])

  const updateMiniApp = (id: number, updates: Partial<MiniApp>) => {
    setMiniApps(prev => prev.map(app => app.id === id ? { ...app, ...updates } : app))
  }

  const addMiniApp = (miniApp: Omit<MiniApp, 'id'>) => {
    const newId = Math.max(...miniApps.map(app => app.id)) + 1
    setMiniApps(prev => [...prev, { ...miniApp, id: newId }])
  }

  const removeMiniApp = (id: number) => {
    setMiniApps(prev => prev.filter(app => app.id !== id))
  }

  const toggleStatus = (id: number) => {
    setMiniApps(prev => prev.map(app =>
      app.id === id ? { ...app, status: app.status === 'active' ? 'inactive' : 'active' } : app
    ))
  }

  return {
    miniApps,
    updateMiniApp,
    addMiniApp,
    removeMiniApp,
    toggleStatus
  }
}