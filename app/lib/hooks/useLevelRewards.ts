import { useState, useEffect } from 'react'
import { dbHelpers } from '../supabase'

export interface LevelReward {
  id?: number
  level: number
  reward: number | null
  reward_amount?: number
  created_at?: string
  updated_at?: string
}

export function useLevelRewards() {
  const [rewards, setRewards] = useState<LevelReward[]>([])
  const [pendingChanges, setPendingChanges] = useState<LevelReward[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load level rewards from database
  useEffect(() => {
    loadLevelRewards()
  }, [])

  const loadLevelRewards = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await dbHelpers.getLevelRewards()
      const rewardsMap = new Map(data.map(r => [r.level, r]))

      // Create rewards array for levels 1-1000, using database data where available
      const allRewards = Array.from({ length: 1000 }, (_, i) => {
        const level = i + 1
        const dbReward = rewardsMap.get(level)
        return dbReward ? {
          id: dbReward.id,
          level: dbReward.level,
          reward: dbReward.reward_amount,
          reward_amount: dbReward.reward_amount,
          created_at: dbReward.created_at,
          updated_at: dbReward.updated_at
        } : {
          level,
          reward: null
        }
      })

      setRewards(allRewards)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load level rewards')
      console.error('Error loading level rewards:', err)
    } finally {
      setLoading(false)
    }
  }

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

  const saveRewards = async () => {
    try {
      setError(null)
      // Save all pending changes to database
      for (const change of pendingChanges) {
        await dbHelpers.updateLevelReward(change.level, change.reward || 0)
      }

      // Update local state
      setRewards(prev => prev.map(r => {
        const pending = pendingChanges.find(p => p.level === r.level)
        return pending ? { ...r, reward: pending.reward } : r
      }))

      setPendingChanges([])
      // Refresh from database to get latest data
      await loadLevelRewards()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save rewards')
      console.error('Error saving rewards:', err)
    }
  }

  const clearAll = async () => {
    try {
      setError(null)
      // Note: This would require deleting all records or setting them to 0
      // For now, we'll just clear pending changes and local state
      setPendingChanges([])
      // You could implement actual clearing logic here
      console.log('Clear all rewards - implement database clearing logic')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear rewards')
      console.error('Error clearing rewards:', err)
    }
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
    loading,
    error,
    setReward,
    removePending,
    saveRewards,
    clearAll,
    getStats,
    refresh: loadLevelRewards
  }
}