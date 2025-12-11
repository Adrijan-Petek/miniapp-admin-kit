import { useState, useEffect } from 'react'
import { dbHelpers } from '../supabase'

export interface TreasuryData {
  ethBalance: string
  joybBalance: string
  multiTokenBalances: { [key: string]: string }
  treasuryBalance?: number
}

export function useTreasury() {
  const [data, setData] = useState<TreasuryData>({
    ethBalance: '0.000439140473808207',
    joybBalance: '3471290.277121303637073074',
    multiTokenBalances: {
      'adrijan': '1096175'
    },
    treasuryBalance: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load treasury balance from database
  useEffect(() => {
    loadTreasuryBalance()
  }, [])

  const loadTreasuryBalance = async () => {
    try {
      setLoading(true)
      setError(null)
      const balance = await dbHelpers.getTreasuryBalance()
      setData(prev => ({ ...prev, treasuryBalance: balance }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load treasury balance')
      console.error('Error loading treasury balance:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateTreasuryBalance = async (balance: number) => {
    try {
      setError(null)
      await dbHelpers.updateTreasuryBalance(balance)
      setData(prev => ({ ...prev, treasuryBalance: balance }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update treasury balance')
      console.error('Error updating treasury balance:', err)
    }
  }

  const withdrawETH = (amount: string) => {
    // Mock withdraw - in real implementation, this would interact with blockchain
    console.log('Withdraw ETH:', amount)
  }

  const withdrawJOYB = (amount: string) => {
    // Mock withdraw - in real implementation, this would interact with blockchain
    console.log('Withdraw JOYB:', amount)
  }

  const withdrawToken = (tokenAddress: string, amount: string) => {
    // Mock withdraw - in real implementation, this would interact with blockchain
    console.log('Withdraw token:', tokenAddress, amount)
  }

  return {
    data,
    loading,
    error,
    updateTreasuryBalance,
    withdrawETH,
    withdrawJOYB,
    withdrawToken,
    refresh: loadTreasuryBalance
  }
}