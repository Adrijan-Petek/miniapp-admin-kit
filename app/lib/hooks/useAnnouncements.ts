import { useState } from 'react'

export interface Announcement {
  id: number
  text: string
  charCount: number
}

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      text: 'Reach Level 15 for 10,000 Tokens, Level 20 for 15,000 Tokens, and Level 30 for a massive 30,000 Tokens. Claim everything directly from your profile.',
      charCount: 142
    },
    {
      id: 2,
      text: 'You get 1 free Match-3 and 1 free Card Game play every day - use them before they reset!',
      charCount: 88
    },
    {
      id: 3,
      text: 'Boosters are live in Match-3! Use Hammer, Shuffle, and Color Bomb to chase higher scores and more Tokens.',
      charCount: 103
    },
    {
      id: 4,
      text: 'New leaderboard season is coming - play Match-3 and Card Game now to secure your spot and earn Token prizes.',
      charCount: 107
    },
    {
      id: 5,
      text: 'Play games, earn Tokens, and claim your rewards directly from your profile. More Token utilities coming soon!',
      charCount: 106
    }
  ])

  const updateAnnouncement = (id: number, text: string) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, text, charCount: text.length } : a))
  }

  const clearAll = () => {
    setAnnouncements([])
  }

  const saveAndPublish = () => {
    // Mock save
    console.log('Saved announcements:', announcements)
  }

  return {
    announcements,
    updateAnnouncement,
    clearAll,
    saveAndPublish
  }
}