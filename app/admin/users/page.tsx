'use client'

import { useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  status: 'active' | 'inactive' | 'banned'
  joinDate: string
  lastActive: string
  totalSpent: number
  gamesPlayed: number
  level: number
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // Mock user data
  const [users] = useState<User[]>([
    {
      id: '1',
      username: 'crypto_trader_99',
      email: 'trader@example.com',
      status: 'active',
      joinDate: '2025-11-15',
      lastActive: '2025-12-11',
      totalSpent: 2.45,
      gamesPlayed: 156,
      level: 12
    },
    {
      id: '2',
      username: 'nft_collector',
      email: 'nft@example.com',
      status: 'active',
      joinDate: '2025-10-22',
      lastActive: '2025-12-10',
      totalSpent: 5.67,
      gamesPlayed: 89,
      level: 8
    },
    {
      id: '3',
      username: 'game_master',
      email: 'games@example.com',
      status: 'inactive',
      joinDate: '2025-09-08',
      lastActive: '2025-11-28',
      totalSpent: 1.23,
      gamesPlayed: 234,
      level: 15
    },
    {
      id: '4',
      username: 'spam_account',
      email: 'spam@example.com',
      status: 'banned',
      joinDate: '2025-12-01',
      lastActive: '2025-12-05',
      totalSpent: 0,
      gamesPlayed: 3,
      level: 1
    },
    {
      id: '5',
      username: 'defi_whale',
      email: 'whale@example.com',
      status: 'active',
      joinDate: '2025-08-14',
      lastActive: '2025-12-11',
      totalSpent: 12.89,
      gamesPlayed: 67,
      level: 20
    }
  ])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleUserAction = (action: string, userId: string) => {
    console.log(`${action} user ${userId}`)
    // In a real app, this would make API calls
    alert(`${action} action performed on user`)
  }

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      alert('Please select users first')
      return
    }
    console.log(`${action} ${selectedUsers.length} users`)
    alert(`${action} performed on ${selectedUsers.length} users`)
    setSelectedUsers([])
  }

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10'
      case 'inactive': return 'text-yellow-400 bg-yellow-400/10'
      case 'banned': return 'text-red-400 bg-red-400/10'
      default: return 'text-slate-400 bg-slate-400/10'
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold mb-1">👥 User Management</h1>
        <p className="text-xs text-slate-400">
          Manage users, monitor activity, and maintain platform security.
        </p>
      </header>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-xs w-64"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-xs"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleBulkAction('Ban')}
            disabled={selectedUsers.length === 0}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-600 text-xs font-medium rounded"
          >
            Ban Selected ({selectedUsers.length})
          </button>
          <button
            onClick={() => handleBulkAction('Unban')}
            disabled={selectedUsers.length === 0}
            className="px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-xs font-medium rounded"
          >
            Unban Selected ({selectedUsers.length})
          </button>
          <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-xs font-medium rounded">
            Export Users
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(u => u.id))
                      } else {
                        setSelectedUsers([])
                      }
                    }}
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    className="rounded border-slate-600 bg-slate-900"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Joined</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Last Active</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Spent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Games</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Level</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/30">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="rounded border-slate-600 bg-slate-900"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-xs font-medium">{user.username}</div>
                      <div className="text-xs text-slate-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">
                    {new Date(user.lastActive).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-xs font-medium text-green-400">
                    ${user.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">
                    {user.gamesPlayed}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">
                    {user.level}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleUserAction('View', user.id)}
                        className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-xs rounded"
                      >
                        View
                      </button>
                      {user.status === 'banned' ? (
                        <button
                          onClick={() => handleUserAction('Unban', user.id)}
                          className="px-2 py-1 bg-green-600 hover:bg-green-700 text-xs rounded"
                        >
                          Unban
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUserAction('Ban', user.id)}
                          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-xs rounded"
                        >
                          Ban
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="text-2xl mb-2">👥</div>
          <div className="text-lg font-semibold">{users.length}</div>
          <div className="text-xs text-slate-400">Total Users</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="text-2xl mb-2">🔥</div>
          <div className="text-lg font-semibold">{users.filter(u => u.status === 'active').length}</div>
          <div className="text-xs text-slate-400">Active Users</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="text-2xl mb-2">🚫</div>
          <div className="text-lg font-semibold">{users.filter(u => u.status === 'banned').length}</div>
          <div className="text-xs text-slate-400">Banned Users</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="text-2xl mb-2">💰</div>
          <div className="text-lg font-semibold">${users.reduce((sum, u) => sum + u.totalSpent, 0).toFixed(2)}</div>
          <div className="text-xs text-slate-400">Total Revenue</div>
        </div>
      </div>
    </div>
  )
}