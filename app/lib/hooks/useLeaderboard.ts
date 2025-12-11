import { useState, useEffect } from 'react'
import { dbHelpers } from '../supabase'

export interface LeaderboardPlayer {
  id?: number
  rank: number
  address: string
  score: number
  created_at?: string
  updated_at?: string
}

export function useLeaderboard() {
  const [topPlayers, setTopPlayers] = useState<LeaderboardPlayer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load leaderboard from database
  useEffect(() => {
    loadTop10()
  }, [])

  const loadTop10 = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await dbHelpers.getLeaderboard(10)
      const playersWithRank = data.map((player, index) => ({
        id: player.id,
        rank: index + 1,
        address: player.address,
        score: player.score,
        created_at: player.created_at,
        updated_at: player.updated_at
      }))
      setTopPlayers(playersWithRank)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
      console.error('Error loading leaderboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const addPlayer = async (address: string, score: number) => {
    try {
      setError(null)
      const newPlayer = await dbHelpers.updatePlayerScore(address, score)
      // Refresh the leaderboard to get updated ranks
      await loadTop10()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add player')
      console.error('Error adding player:', err)
    }
  }

  const updatePlayerScore = async (address: string, score: number) => {
    try {
      setError(null)
      await dbHelpers.updatePlayerScore(address, score)
      // Refresh the leaderboard to get updated ranks
      await loadTop10()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update player score')
      console.error('Error updating player score:', err)
    }
  }

  const removePlayer = async (address: string) => {
    try {
      setError(null)
      // Note: This would require a delete operation in the database
      // For now, we'll set their score to 0
      await dbHelpers.updatePlayerScore(address, 0)
      // Refresh the leaderboard
      await loadTop10()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove player')
      console.error('Error removing player:', err)
    }
  }

  const creditRewards = async () => {
    try {
      setError(null)
      // This would typically trigger a reward distribution process
      // For now, we'll just log it
      console.log('Crediting rewards to top players')
      // You could implement actual reward crediting logic here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to credit rewards')
      console.error('Error crediting rewards:', err)
    }
  }

  const syncLeaderboard = async () => {
    try {
      setError(null)
      // This would sync with external systems like Farcaster
      console.log('Syncing leaderboard with external systems')
      await loadTop10() // Refresh after sync
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sync leaderboard')
      console.error('Error syncing leaderboard:', err)
    }
  }

  return {
    topPlayers,
    loading,
    error,
    loadTop10,
    addPlayer,
    updatePlayerScore,
    removePlayer,
    creditRewards,
    syncLeaderboard,
    refresh: loadTop10
  }
}