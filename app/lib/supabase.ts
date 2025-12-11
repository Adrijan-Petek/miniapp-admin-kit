import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}) as any

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// Database types and utilities
export type Tables = Database['public']['Tables']
export type Enums = Database['public']['Enums']

// Helper functions for common database operations
export const dbHelpers = {
  // Announcements
  async getAnnouncements(): Promise<Tables['announcements']['Row'][]> {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createAnnouncement(text: string): Promise<Tables['announcements']['Row']> {
    const { data, error } = await supabase
      .from('announcements')
      .insert({
        text,
        char_count: text.length
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateAnnouncement(id: number, text: string): Promise<Tables['announcements']['Row']> {
    const { data, error } = await supabase
      .from('announcements')
      .update({ text, char_count: text.length, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteAnnouncement(id: number): Promise<void> {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Leaderboard
  async getLeaderboard(limit = 10): Promise<Tables['leaderboard']['Row'][]> {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  async updatePlayerScore(address: string, score: number): Promise<Tables['leaderboard']['Row']> {
    const { data, error } = await supabase
      .from('leaderboard')
      .upsert(
        { address, score, updated_at: new Date().toISOString() },
        { onConflict: 'address' }
      )
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Mini Apps
  async getMiniApps(): Promise<Tables['mini_apps']['Row'][]> {
    const { data, error } = await supabase
      .from('mini_apps')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async createMiniApp(name: string, description: string, url: string): Promise<Tables['mini_apps']['Row']> {
    const { data, error } = await supabase
      .from('mini_apps')
      .insert({
        name,
        description,
        url
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateMiniApp(id: number, updates: Partial<{ name: string; description: string; url: string; is_active: boolean }>): Promise<Tables['mini_apps']['Row']> {
    const { data, error } = await supabase
      .from('mini_apps')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Treasury
  async getTreasuryBalance(): Promise<number> {
    const { data, error } = await supabase
      .from('treasury')
      .select('balance')
      .single()

    if (error) throw error
    return data?.balance || 0
  },

  async updateTreasuryBalance(balance: number): Promise<Tables['treasury']['Row']> {
    const { data, error } = await supabase
      .from('treasury')
      .upsert(
        { id: 1, balance, updated_at: new Date().toISOString() },
        { onConflict: 'id' }
      )
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Level Rewards
  async getLevelRewards(): Promise<Tables['level_rewards']['Row'][]> {
    const { data, error } = await supabase
      .from('level_rewards')
      .select('*')
      .order('level', { ascending: true })

    if (error) throw error
    return data || []
  },

  async updateLevelReward(level: number, reward_amount: number): Promise<Tables['level_rewards']['Row']> {
    const { data, error } = await supabase
      .from('level_rewards')
      .upsert(
        { level, reward_amount, updated_at: new Date().toISOString() },
        { onConflict: 'level' }
      )
      .select()
      .single()

    if (error) throw error
    return data
  }
}