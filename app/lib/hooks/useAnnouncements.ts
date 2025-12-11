import { useState, useEffect } from 'react'
import { dbHelpers } from '../supabase'
import { announcementSchema, validateData, type AnnouncementInput } from '../validation'

export interface Announcement {
  id: number
  text: string
  charCount: number
  created_at?: string
  updated_at?: string
}

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load announcements from database
  useEffect(() => {
    loadAnnouncements()
  }, [])

  const loadAnnouncements = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await dbHelpers.getAnnouncements()
      setAnnouncements(data.map(item => ({
        id: item.id,
        text: item.text,
        charCount: item.char_count,
        created_at: item.created_at,
        updated_at: item.updated_at
      })))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load announcements')
      console.error('Error loading announcements:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateAnnouncement = async (id: number, text: string) => {
    try {
      setError(null)

      // Validate input
      const validation = validateData(announcementSchema.pick({ text: true }), { text })
      if (!validation.success) {
        throw new Error(`Validation failed: ${validation.errors.issues.map(i => i.message).join(', ')}`)
      }

      const updated = await dbHelpers.updateAnnouncement(id, text)
      setAnnouncements(prev => prev.map(a =>
        a.id === id
          ? { ...a, text, charCount: text.length, updated_at: updated.updated_at }
          : a
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update announcement')
      console.error('Error updating announcement:', err)
    }
  }

  const createAnnouncement = async (text: string) => {
    try {
      setError(null)

      // Validate input
      const validation = validateData(announcementSchema.pick({ text: true }), { text })
      if (!validation.success) {
        throw new Error(`Validation failed: ${validation.errors.issues.map(i => i.message).join(', ')}`)
      }

      const newAnnouncement = await dbHelpers.createAnnouncement(text)
      setAnnouncements(prev => [...prev, {
        id: newAnnouncement.id,
        text: newAnnouncement.text,
        charCount: newAnnouncement.char_count,
        created_at: newAnnouncement.created_at,
        updated_at: newAnnouncement.updated_at
      }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create announcement')
      console.error('Error creating announcement:', err)
    }
  }

  const deleteAnnouncement = async (id: number) => {
    try {
      setError(null)

      // Validate ID
      if (!id || id <= 0) {
        throw new Error('Invalid announcement ID')
      }

      await dbHelpers.deleteAnnouncement(id)
      setAnnouncements(prev => prev.filter(a => a.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete announcement')
      console.error('Error deleting announcement:', err)
    }
  }

  const clearAll = async () => {
    try {
      setError(null)
      // Delete all announcements from database
      for (const announcement of announcements) {
        await dbHelpers.deleteAnnouncement(announcement.id)
      }
      setAnnouncements([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear announcements')
      console.error('Error clearing announcements:', err)
    }
  }

  const saveAndPublish = async () => {
    try {
      setError(null)
      // All changes are already saved to database in real-time
      console.log('All announcements are up to date')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save announcements')
      console.error('Error saving announcements:', err)
    }
  }

  return {
    announcements,
    loading,
    error,
    updateAnnouncement,
    createAnnouncement,
    deleteAnnouncement,
    clearAll,
    saveAndPublish,
    refresh: loadAnnouncements
  }
}