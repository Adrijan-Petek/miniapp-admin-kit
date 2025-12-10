import { useState } from 'react'

export interface TreasuryData {
  ethBalance: string
  joybBalance: string
  multiTokenBalances: { [key: string]: string }
}

export function useTreasury() {
  const [data, setData] = useState<TreasuryData>({
    ethBalance: '0.000439140473808207',
    joybBalance: '3471290.277121303637073074',
    multiTokenBalances: {
      'adrijan': '1096175'
    }
  })

  const withdrawETH = (amount: string) => {
    // Mock withdraw
    console.log('Withdraw ETH:', amount)
  }

  const withdrawJOYB = (amount: string) => {
    // Mock withdraw
    console.log('Withdraw JOYB:', amount)
  }

  const withdrawToken = (tokenAddress: string, amount: string) => {
    // Mock withdraw
    console.log('Withdraw token:', tokenAddress, amount)
  }

  return {
    data,
    withdrawETH,
    withdrawJOYB,
    withdrawToken
  }
}