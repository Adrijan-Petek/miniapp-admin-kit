import { useState } from 'react'

export interface GameSettings {
  match3PlayFee: string
  match3BoosterPrices: {
    hammer: string
    shuffle: string
    colorBomb: string
    hammerPack: string
    shufflePack: string
    bombPack: string
  }
  cardPlayFee: string
  cardWinReward: number
  dailyBaseReward: number
  dailyStreakBonus: number
}

export function useGameSettings() {
  const [settings, setSettings] = useState<GameSettings>({
    match3PlayFee: '0.000005',
    match3BoosterPrices: {
      hammer: '0.00001',
      shuffle: '0.00002',
      colorBomb: '0.00004',
      hammerPack: '0.00005',
      shufflePack: '0.0001',
      bombPack: '0.0002'
    },
    cardPlayFee: '0.000072',
    cardWinReward: 2000,
    dailyBaseReward: 30,
    dailyStreakBonus: 5
  })

  const updateMatch3PlayFee = (fee: string) => {
    setSettings(prev => ({ ...prev, match3PlayFee: fee }))
  }

  const updateBoosterPrices = (prices: Partial<GameSettings['match3BoosterPrices']>) => {
    setSettings(prev => ({ ...prev, match3BoosterPrices: { ...prev.match3BoosterPrices, ...prices } }))
  }

  const updateCardPlayFee = (fee: string) => {
    setSettings(prev => ({ ...prev, cardPlayFee: fee }))
  }

  const updateCardWinReward = (reward: number) => {
    setSettings(prev => ({ ...prev, cardWinReward: reward }))
  }

  const updateDailyBaseReward = (reward: number) => {
    setSettings(prev => ({ ...prev, dailyBaseReward: reward }))
  }

  const updateDailyStreakBonus = (bonus: number) => {
    setSettings(prev => ({ ...prev, dailyStreakBonus: bonus }))
  }

  return {
    settings,
    updateMatch3PlayFee,
    updateBoosterPrices,
    updateCardPlayFee,
    updateCardWinReward,
    updateDailyBaseReward,
    updateDailyStreakBonus
  }
}