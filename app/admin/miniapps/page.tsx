'use client'

import { useState } from 'react'
import { useMiniApps, MiniApp } from '@/lib/hooks/useMiniApps'

export default function MiniAppsPage() {
  const { miniApps, updateMiniApp, addMiniApp, removeMiniApp, toggleStatus } = useMiniApps()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newApp, setNewApp] = useState({
    name: '',
    description: '',
    url: '',
    category: '',
    status: 'active' as const
  })

  const handleAdd = () => {
    if (newApp.name && newApp.url) {
      addMiniApp(newApp)
      setNewApp({ name: '', description: '', url: '', category: '', status: 'active' })
      setShowAddForm(false)
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-semibold mb-1">Mini Apps Manager</h1>
          <p className="text-xs text-slate-400">
            Manage and configure mini apps in your ecosystem.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-xs font-medium rounded-lg"
        >
          + Add Mini App
        </button>
      </header>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Mini App</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="App Name"
                value={newApp.name}
                onChange={(e) => setNewApp(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm"
              />
              <input
                type="text"
                placeholder="Description"
                value={newApp.description}
                onChange={(e) => setNewApp(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm"
              />
              <input
                type="text"
                placeholder="URL Path (e.g., /games/match3)"
                value={newApp.url}
                onChange={(e) => setNewApp(prev => ({ ...prev, url: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm"
              />
              <input
                type="text"
                placeholder="Category (e.g., Games, Commerce)"
                value={newApp.category}
                onChange={(e) => setNewApp(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAdd}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded"
              >
                Add App
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-800 text-sm font-medium rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-4">🎮 Active Mini Apps ({miniApps.filter(app => app.status === 'active').length})</h2>
        <div className="space-y-3">
          {miniApps.filter(app => app.status === 'active').map((app) => (
            <div key={app.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex-1">
                <div className="font-medium text-sm">{app.name}</div>
                <div className="text-xs text-slate-400">{app.description}</div>
                <div className="text-xs text-slate-500">{app.url} • {app.category}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(app.id)}
                  className="px-2 py-1 bg-yellow-600 hover:bg-yellow-700 text-xs rounded"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => removeMiniApp(app.id)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 text-xs rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-4">🚫 Inactive Mini Apps ({miniApps.filter(app => app.status === 'inactive').length})</h2>
        <div className="space-y-3">
          {miniApps.filter(app => app.status === 'inactive').map((app) => (
            <div key={app.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg opacity-60">
              <div className="flex-1">
                <div className="font-medium text-sm">{app.name}</div>
                <div className="text-xs text-slate-400">{app.description}</div>
                <div className="text-xs text-slate-500">{app.url} • {app.category}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(app.id)}
                  className="px-2 py-1 bg-green-600 hover:bg-green-700 text-xs rounded"
                >
                  Activate
                </button>
                <button
                  onClick={() => removeMiniApp(app.id)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 text-xs rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}