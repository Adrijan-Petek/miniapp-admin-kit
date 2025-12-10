import { useState } from 'react'

export interface LevelReward {
  level: number
  reward: number | null
}

export function useLevelRewards() {
  const [rewards, setRewards] = useState<LevelReward[]>(Array.from({ length: 1000 }, (_, i) => ({
    level: i + 1,
    reward: i + 1 === 15 ? 10000 : i + 1 === 20 ? 15000 : i + 1 === 30 ? 15000 : null
  })))

  const [pendingChanges, setPendingChanges] = useState<LevelReward[]>([])

  const setReward = (level: number, reward: number) => {
    setPendingChanges(prev => {
      const existing = prev.find(p => p.level === level)
      if (existing) {
        return prev.map(p => p.level === level ? { ...p, reward } : p)
      } else {
        return [...prev, { level, reward }]
      }
    })
  }

  const removePending = (level: number) => {
    setPendingChanges(prev => prev.filter(p => p.level !== level))
  }

  const saveRewards = () => {
    setRewards(prev => prev.map(r => {
      const pending = pendingChanges.find(p => p.level === r.level)
      return pending ? { ...r, reward: pending.reward } : r
    }))
    setPendingChanges([])
  }

  const clearAll = () => {
    setRewards(prev => prev.map(r => ({ ...r, reward: null })))
    setPendingChanges([])
  }

  const getStats = () => {
    const levelsWithRewards = rewards.filter(r => r.reward !== null).length
    const totalRewards = rewards.reduce((sum, r) => sum + (r.reward || 0), 0)
    const highestLevel = Math.max(...rewards.filter(r => r.reward !== null).map(r => r.level), 0)
    return { levelsWithRewards, totalRewards, highestLevel }
  }

  return {
    rewards,
    pendingChanges,
    setReward,
    removePending,
    saveRewards,
    clearAll,
    getStats
  }
}