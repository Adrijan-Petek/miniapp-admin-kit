'use client'

import { useState } from 'react'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')

  // Mock analytics data
  const analytics = {
    overview: {
      totalUsers: 15420,
      activeUsers: 8920,
      totalRevenue: 45.67,
      totalGames: 128450
    },
    userGrowth: [
      { date: '2025-12-01', users: 12000 },
      { date: '2025-12-02', users: 12500 },
      { date: '2025-12-03', users: 13200 },
      { date: '2025-12-04', users: 13800 },
      { date: '2025-12-05', users: 14200 },
      { date: '2025-12-06', users: 14900 },
      { date: '2025-12-07', users: 15420 }
    ],
    gameStats: {
      match3: { plays: 45230, revenue: 12.45 },
      card: { plays: 32150, revenue: 8.92 },
      total: { plays: 77380, revenue: 21.37 }
    },
    topMiniApps: [
      { name: 'Crypto Trader Pro', users: 5200, revenue: 15.23 },
      { name: 'NFT Gallery', users: 3800, revenue: 12.45 },
      { name: 'DeFi Dashboard', users: 2900, revenue: 8.76 },
      { name: 'Game Hub', users: 2100, revenue: 6.12 },
      { name: 'Wallet Manager', users: 1420, revenue: 3.11 }
    ]
  }

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`
  const formatNumber = (num: number) => num.toLocaleString()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold mb-1">📊 Analytics Dashboard</h1>
        <p className="text-xs text-slate-400">
          Comprehensive insights into your mini-app ecosystem performance.
        </p>
      </header>

      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs rounded ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-xs font-medium rounded">
          Export Report
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Total Users</p>
              <p className="text-lg font-semibold">{formatNumber(analytics.overview.totalUsers)}</p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
          <p className="text-xs text-green-400 mt-2">+12.5% from last week</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Active Users</p>
              <p className="text-lg font-semibold">{formatNumber(analytics.overview.activeUsers)}</p>
            </div>
            <div className="text-2xl">🔥</div>
          </div>
          <p className="text-xs text-green-400 mt-2">+8.3% from last week</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Total Revenue</p>
              <p className="text-lg font-semibold">{formatCurrency(analytics.overview.totalRevenue)}</p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
          <p className="text-xs text-green-400 mt-2">+15.2% from last week</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Games Played</p>
              <p className="text-lg font-semibold">{formatNumber(analytics.overview.totalGames)}</p>
            </div>
            <div className="text-2xl">🎮</div>
          </div>
          <p className="text-xs text-green-400 mt-2">+22.1% from last week</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <h3 className="text-sm font-semibold mb-4">📈 User Growth</h3>
          <div className="h-48 flex items-end justify-between space-x-2">
            {analytics.userGrowth.map((data, index) => {
              const maxUsers = Math.max(...analytics.userGrowth.map(d => d.users))
              const height = (data.users / maxUsers) * 100
              return (
                <div key={data.date} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-600 rounded-t min-h-[4px]"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-slate-400 mt-2">
                    {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Game Performance */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <h3 className="text-sm font-semibold mb-4">🎯 Game Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs">Match-3 Game</span>
              <div className="text-right">
                <div className="text-xs font-medium">{formatNumber(analytics.gameStats.match3.plays)} plays</div>
                <div className="text-xs text-green-400">{formatCurrency(analytics.gameStats.match3.revenue)}</div>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '58%' }}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs">Card Game</span>
              <div className="text-right">
                <div className="text-xs font-medium">{formatNumber(analytics.gameStats.card.plays)} plays</div>
                <div className="text-xs text-green-400">{formatCurrency(analytics.gameStats.card.revenue)}</div>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Mini Apps */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h3 className="text-sm font-semibold mb-4">🏆 Top Performing Mini Apps</h3>
        <div className="space-y-3">
          {analytics.topMiniApps.map((app, index) => (
            <div key={app.name} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <div>
                  <div className="text-xs font-medium">{app.name}</div>
                  <div className="text-xs text-slate-400">{formatNumber(app.users)} users</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-green-400">{formatCurrency(app.revenue)}</div>
                <div className="text-xs text-slate-400">revenue</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h3 className="text-sm font-semibold mb-4">📋 Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <div className="text-xs font-medium">New user registration</div>
              <div className="text-xs text-slate-400">User #15421 joined the platform</div>
            </div>
            <div className="text-xs text-slate-500">2 min ago</div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <div className="text-xs font-medium">Game completed</div>
              <div className="text-xs text-slate-400">Match-3 game finished with high score</div>
            </div>
            <div className="text-xs text-slate-500">5 min ago</div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <div className="text-xs font-medium">Payment processed</div>
              <div className="text-xs text-slate-400">0.05 ETH received for booster purchase</div>
            </div>
            <div className="text-xs text-slate-500">12 min ago</div>
          </div>
        </div>
      </div>
    </div>
  )
}