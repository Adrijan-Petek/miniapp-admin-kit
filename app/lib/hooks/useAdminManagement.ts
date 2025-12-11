import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { userSchema, type UserInput, type UserRole } from '../validation'

export interface User {
  id: number
  username: string
  email: string
  role: UserRole
  is_active: boolean
  last_login?: string
  created_at: string
  updated_at: string
}

export function useAdminManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await (supabase as any)
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  // Create new user
  const createUser = async (userData: Omit<UserInput, 'id'>) => {
    try {
      const validatedData = userSchema.omit({ id: true }).parse(userData)
      const { data, error } = await (supabase as any)
        .from('users')
        .insert([validatedData])
        .select()
        .single()

      if (error) throw error
      setUsers(prev => [data, ...prev])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user')
      throw err
    }
  }

  // Update user
  const updateUser = async (id: number, updates: Partial<UserInput>) => {
    try {
      const validatedUpdates = userSchema.partial().parse(updates)
      const { data, error } = await (supabase as any)
        .from('users')
        .update(validatedUpdates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setUsers(prev => prev.map(user => user.id === id ? data : user))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user')
      throw err
    }
  }

  // Delete user
  const deleteUser = async (id: number) => {
    try {
      const { error } = await (supabase as any)
        .from('users')
        .delete()
        .eq('id', id)

      if (error) throw error
      setUsers(prev => prev.filter(user => user.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user')
      throw err
    }
  }

  // Check if user has admin role
  const isAdmin = (user: User) => {
    return ['super_admin', 'admin'].includes(user.role)
  }

  // Check if user can perform action
  const canPerformAction = (user: User, action: string) => {
    switch (action) {
      case 'manage_users':
        return user.role === 'super_admin'
      case 'manage_announcements':
        return ['super_admin', 'admin', 'moderator'].includes(user.role)
      case 'manage_leaderboard':
        return ['super_admin', 'admin', 'moderator'].includes(user.role)
      case 'manage_miniapps':
        return ['super_admin', 'admin'].includes(user.role)
      case 'manage_rewards':
        return ['super_admin', 'admin'].includes(user.role)
      case 'manage_treasury':
        return ['super_admin', 'admin'].includes(user.role)
      case 'manage_settings':
        return ['super_admin', 'admin'].includes(user.role)
      case 'view_analytics':
        return ['super_admin', 'admin', 'moderator', 'viewer'].includes(user.role)
      default:
        return false
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    isAdmin,
    canPerformAction,
  }
}