import { useState, useEffect } from 'react'
import { dbHelpers } from '../supabase'

export interface MiniApp {
  id: number
  name: string
  description: string
  url: string
  status: 'active' | 'inactive'
  category?: string
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

export function useMiniApps() {
  const [miniApps, setMiniApps] = useState<MiniApp[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load mini apps from database
  useEffect(() => {
    loadMiniApps()
  }, [])

  const loadMiniApps = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await dbHelpers.getMiniApps()
      setMiniApps(data.map(app => ({
        id: app.id,
        name: app.name,
        description: app.description,
        url: app.url,
        status: app.is_active ? 'active' : 'inactive',
        is_active: app.is_active,
        created_at: app.created_at,
        updated_at: app.updated_at
      })))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load mini apps')
      console.error('Error loading mini apps:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateMiniApp = async (id: number, updates: Partial<MiniApp>) => {
    try {
      setError(null)
      const dbUpdates: any = {}
      if (updates.name !== undefined) dbUpdates.name = updates.name
      if (updates.description !== undefined) dbUpdates.description = updates.description
      if (updates.url !== undefined) dbUpdates.url = updates.url
      if (updates.status !== undefined) dbUpdates.is_active = updates.status === 'active'

      const updated = await dbHelpers.updateMiniApp(id, dbUpdates)
      setMiniApps(prev => prev.map(app =>
        app.id === id
          ? {
              ...app,
              ...updates,
              is_active: updated.is_active,
              updated_at: updated.updated_at
            }
          : app
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update mini app')
      console.error('Error updating mini app:', err)
    }
  }

  const addMiniApp = async (miniApp: Omit<MiniApp, 'id'>) => {
    try {
      setError(null)
      const newApp = await dbHelpers.createMiniApp(
        miniApp.name,
        miniApp.description,
        miniApp.url
      )
      setMiniApps(prev => [...prev, {
        id: newApp.id,
        name: newApp.name,
        description: newApp.description,
        url: newApp.url,
        status: newApp.is_active ? 'active' : 'inactive',
        is_active: newApp.is_active,
        created_at: newApp.created_at,
        updated_at: newApp.updated_at
      }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add mini app')
      console.error('Error adding mini app:', err)
    }
  }

  const removeMiniApp = async (id: number) => {
    try {
      setError(null)
      // Note: This would require a delete operation in the database
      // For now, we'll deactivate the app
      await dbHelpers.updateMiniApp(id, { is_active: false })
      setMiniApps(prev => prev.map(app =>
        app.id === id ? { ...app, status: 'inactive', is_active: false } : app
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove mini app')
      console.error('Error removing mini app:', err)
    }
  }

  const toggleStatus = async (id: number) => {
    try {
      setError(null)
      const app = miniApps.find(a => a.id === id)
      if (!app) return

      const newStatus = app.status === 'active' ? 'inactive' : 'active'
      await updateMiniApp(id, { status: newStatus })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle status')
      console.error('Error toggling status:', err)
    }
  }

  return {
    miniApps,
    loading,
    error,
    updateMiniApp,
    addMiniApp,
    removeMiniApp,
    toggleStatus,
    refresh: loadMiniApps
  }
}