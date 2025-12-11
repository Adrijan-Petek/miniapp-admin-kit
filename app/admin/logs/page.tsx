'use client'

import { useState } from 'react'

interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'security'
  category: string
  message: string
  user?: string
  ip?: string
  details?: string
}

export default function LogsPage() {
  const [filterLevel, setFilterLevel] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock log data
  const [logs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: '2025-12-11T14:30:00Z',
      level: 'security',
      category: 'Authentication',
      message: 'Admin login successful',
      user: 'admin',
      ip: '192.168.1.100',
      details: 'JWT token issued for admin session'
    },
    {
      id: '2',
      timestamp: '2025-12-11T14:25:00Z',
      level: 'info',
      category: 'Game',
      message: 'Match-3 game completed',
      user: 'crypto_trader_99',
      ip: '192.168.1.101',
      details: 'Score: 15420, Time: 3m 45s'
    },
    {
      id: '3',
      timestamp: '2025-12-11T14:20:00Z',
      level: 'warning',
      category: 'Payment',
      message: 'Payment verification failed',
      user: 'nft_collector',
      ip: '192.168.1.102',
      details: 'Transaction hash: 0x1234...abcd, Amount: 0.05 ETH'
    },
    {
      id: '4',
      timestamp: '2025-12-11T14:15:00Z',
      level: 'error',
      category: 'API',
      message: 'Rate limit exceeded',
      ip: '192.168.1.103',
      details: 'Endpoint: /api/games/play, Requests: 150/min'
    },
    {
      id: '5',
      timestamp: '2025-12-11T14:10:00Z',
      level: 'info',
      category: 'User',
      message: 'New user registration',
      user: 'new_user_123',
      ip: '192.168.1.104',
      details: 'Email verification sent'
    },
    {
      id: '6',
      timestamp: '2025-12-11T14:05:00Z',
      level: 'security',
      category: 'Access',
      message: 'Unauthorized access attempt',
      ip: '192.168.1.105',
      details: 'Attempted access to /admin/users without authentication'
    },
    {
      id: '7',
      timestamp: '2025-12-11T14:00:00Z',
      level: 'info',
      category: 'Contract',
      message: 'Contract interaction successful',
      user: 'defi_whale',
      details: 'Contract: TokenManager, Method: transfer, Amount: 1000 TOKENS'
    },
    {
      id: '8',
      timestamp: '2025-12-11T13:55:00Z',
      level: 'warning',
      category: 'System',
      message: 'High memory usage detected',
      details: 'Memory usage: 85%, Recommended action: Restart services'
    }
  ])

  const filteredLogs = logs.filter(log => {
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory
    const matchesSearch = searchTerm === '' ||
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.user && log.user.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesLevel && matchesCategory && matchesSearch
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-400 bg-red-400/10'
      case 'warning': return 'text-yellow-400 bg-yellow-400/10'
      case 'security': return 'text-orange-400 bg-orange-400/10'
      case 'info': return 'text-blue-400 bg-blue-400/10'
      default: return 'text-slate-400 bg-slate-400/10'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold mb-1">📋 System Logs</h1>
        <p className="text-xs text-slate-400">
          Monitor system activity, security events, and audit trail.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-xs flex-1"
        />

        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-xs"
        >
          <option value="all">All Levels</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
          <option value="security">Security</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-xs"
        >
          <option value="all">All Categories</option>
          <option value="Authentication">Authentication</option>
          <option value="Game">Game</option>
          <option value="Payment">Payment</option>
          <option value="API">API</option>
          <option value="User">User</option>
          <option value="Access">Access</option>
          <option value="Contract">Contract</option>
          <option value="System">System</option>
        </select>

        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-xs font-medium rounded">
          Export Logs
        </button>
      </div>

      {/* Log Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="text-lg font-semibold text-blue-400">{logs.filter(l => l.level === 'info').length}</div>
          <div className="text-xs text-slate-400">Info</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="text-lg font-semibold text-yellow-400">{logs.filter(l => l.level === 'warning').length}</div>
          <div className="text-xs text-slate-400">Warnings</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="text-lg font-semibold text-red-400">{logs.filter(l => l.level === 'error').length}</div>
          <div className="text-xs text-slate-400">Errors</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="text-lg font-semibold text-orange-400">{logs.filter(l => l.level === 'security').length}</div>
          <div className="text-xs text-slate-400">Security</div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Level</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Message</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3 text-xs text-slate-300 font-mono">
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">
                    {log.category}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-slate-300 max-w-xs truncate" title={log.message}>
                      {log.message}
                    </div>
                    {log.details && (
                      <div className="text-xs text-slate-500 mt-1 max-w-xs truncate" title={log.details}>
                        {log.details}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">
                    {log.user || '-'}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300 font-mono">
                    {log.ip || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Details Modal Placeholder */}
      <div className="text-xs text-slate-500 text-center py-4">
        Click on any log entry to view full details and context
      </div>
    </div>
  )
}