import { useState } from 'react'

export interface SupportedToken {
  address: string
  symbol: string
  imageUrl?: string
}

export function useTokenManagement() {
  const [supportedTokens, setSupportedTokens] = useState<SupportedToken[]>([
    {
      address: '0xC732932cA7Db558cF1bACc17b4f4F7E149E0Eb07',
      symbol: 'TOKEN',
      imageUrl: 'https://example.com/token.png'
    },
    {
      address: '0xf348930442f3afB04F1f1bbE473C5F57De7b26eb',
      symbol: 'adrijan',
      imageUrl: 'https://example.com/adrijan.png'
    }
  ])

  const addToken = (address: string, symbol: string, imageUrl?: string) => {
    setSupportedTokens(prev => [...prev, { address, symbol, imageUrl }])
  }

  const removeToken = (address: string) => {
    setSupportedTokens(prev => prev.filter(t => t.address !== address))
  }

  const creditReward = (playerAddress: string, tokenAddress: string, amount: string) => {
    // Mock credit
    console.log('Crediting reward:', playerAddress, tokenAddress, amount)
  }

  const syncToFarcaster = () => {
    // Mock sync
    console.log('Syncing token metadata to Farcaster')
  }

  return {
    supportedTokens,
    addToken,
    removeToken,
    creditReward,
    syncToFarcaster
  }
}