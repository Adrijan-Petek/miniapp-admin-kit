import { useState } from 'react'

export interface LeaderboardPlayer {
  rank: number
  address: string
  amount: string
}

export function useLeaderboard() {
  const [topPlayers, setTopPlayers] = useState<LeaderboardPlayer[]>([
    { rank: 1, address: '0x...', amount: '' },
    { rank: 2, address: '0x...', amount: '' },
    { rank: 3, address: '0x...', amount: '' },
    { rank: 4, address: '0x...', amount: '' },
    { rank: 5, address: '0x...', amount: '' },
    { rank: 6, address: '0x...', amount: '' },
    { rank: 7, address: '0x...', amount: '' },
    { rank: 8, address: '0x...', amount: '' },
    { rank: 9, address: '0x...', amount: '' },
    { rank: 10, address: '0x...', amount: '' }
  ])

  const loadTop10 = () => {
    // Mock load
    console.log('Loading top 10 players')
  }

  const addPlayer = (address: string, amount: string) => {
    setTopPlayers(prev => [...prev, { rank: prev.length + 1, address, amount }])
  }

  const removePlayer = (rank: number) => {
    setTopPlayers(prev => prev.filter(p => p.rank !== rank))
  }

  const creditRewards = () => {
    // Mock credit
    console.log('Crediting rewards to players')
  }

  const syncLeaderboard = () => {
    // Mock sync
    console.log('Syncing leaderboard with Farcaster')
  }

  return {
    topPlayers,
    loadTop10,
    addPlayer,
    removePlayer,
    creditRewards,
    syncLeaderboard
  }
}