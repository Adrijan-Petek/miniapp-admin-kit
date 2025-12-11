'use client'

import { useEffect, useState } from 'react'
import { useSettings } from '@/lib/hooks/useSettings'

interface SplashScreenProps {
  onComplete: () => void
  duration?: number
}

export default function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const { settings } = useSettings()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(interval)
        setTimeout(onComplete, 500) // Small delay after reaching 100%
      }
    }, 50)

    return () => clearInterval(interval)
  }, [duration, onComplete])

  const getLogoSize = () => {
    switch (settings.splashLogoSize) {
      case 'small': return 'w-16 h-16'
      case 'large': return 'w-32 h-32'
      default: return 'w-24 h-24'
    }
  }

  const getAnimationClass = () => {
    const baseClasses = "transition-all duration-1000 ease-out"
    switch (settings.splashAnimation) {
      case 'bounce': return `${baseClasses} animate-bounce`
      case 'fade': return `${baseClasses} opacity-100`
      case 'slide': return `${baseClasses} translate-x-0`
      case 'zoom': return `${baseClasses} scale-100`
      case 'rotate': return `${baseClasses} rotate-0`
      case 'pulse': return `${baseClasses} animate-pulse`
      case 'shake': return `${baseClasses} animate-pulse` // Using pulse as shake alternative
      case 'flip': return `${baseClasses} rotate-y-0`
      case 'glow': return `${baseClasses} shadow-lg shadow-blue-500/50`
      case 'wave': return `${baseClasses} animate-pulse`
      default: return `${baseClasses} animate-bounce`
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Logo/Icon */}
        <div className="mb-8">
          {settings.splashLogoUrl ? (
            <img
              src={settings.splashLogoUrl}
              alt="Logo"
              className={`${getLogoSize()} mx-auto mb-4 rounded-2xl shadow-2xl ${getAnimationClass()}`}
              onError={(e) => {
                // Fallback to emoji if image fails to load
                e.currentTarget.style.display = 'none'
                const fallback = document.createElement('div')
                fallback.className = `${getLogoSize()} mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl ${getAnimationClass()}`
                fallback.innerHTML = '🎮'
                e.currentTarget.parentNode?.appendChild(fallback)
              }}
            />
          ) : (
            <div className={`${getLogoSize()} mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl ${getAnimationClass()}`}>
              <span className="text-4xl">🎮</span>
            </div>
          )}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            {settings.appName || 'MiniApp Hub'}
          </h1>
          <p className="text-slate-400 text-sm">{settings.tagline || 'Your Gaming Ecosystem'}</p>
        </div>

        {/* Loading Animation */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            <div className={`w-3 h-3 bg-blue-500 rounded-full ${settings.splashAnimation === 'bounce' ? 'animate-bounce' : 'animate-pulse'}`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-3 h-3 bg-purple-500 rounded-full ${settings.splashAnimation === 'bounce' ? 'animate-bounce' : 'animate-pulse'}`} style={{ animationDelay: '150ms' }}></div>
            <div className={`w-3 h-3 bg-cyan-500 rounded-full ${settings.splashAnimation === 'bounce' ? 'animate-bounce' : 'animate-pulse'}`} style={{ animationDelay: '300ms' }}></div>
          </div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all ${
                settings.animationSpeed === 'slow' ? 'duration-1000' :
                settings.animationSpeed === 'fast' ? 'duration-300' : 'duration-500'
              } ease-out`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">Loading your experience...</p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto text-center">
          <div className="bg-slate-800/50 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-xs text-slate-300">Games</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl mb-1">💰</div>
            <div className="text-xs text-slate-300">Rewards</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 backdrop-blur-sm">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-xs text-slate-300">Leaderboards</div>
          </div>
        </div>

        {/* Version Info */}
        <div className="mt-8 text-xs text-slate-600">
          v{settings.appVersion || '2.1.0'} • Powered by Blockchain
        </div>
      </div>
    </div>
  )
}