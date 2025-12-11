import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types and utilities
export type Tables = Database['public']['Tables']
export type Enums = Database['public']['Enums']

// Helper functions for common database operations
export const dbHelpers = {
  // Announcements
  async getAnnouncements() {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async createAnnouncement(text: string) {
    const { data, error } = await supabase
      .from('announcements')
      .insert([{ text, char_count: text.length }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateAnnouncement(id: number, text: string) {
    const { data, error } = await supabase
      .from('announcements')
      .update({ text, char_count: text.length, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteAnnouncement(id: number) {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Leaderboard
  async getLeaderboard(limit = 10) {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  async updatePlayerScore(address: string, score: number) {
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
  async getMiniApps() {
    const { data, error } = await supabase
      .from('mini_apps')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async createMiniApp(name: string, description: string, url: string) {
    const { data, error } = await supabase
      .from('mini_apps')
      .insert([{ name, description, url }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateMiniApp(id: number, updates: Partial<{ name: string; description: string; url: string; is_active: boolean }>) {
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
  async getTreasuryBalance() {
    const { data, error } = await supabase
      .from('treasury')
      .select('balance')
      .single()

    if (error) throw error
    return data?.balance || 0
  },

  async updateTreasuryBalance(balance: number) {
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
  async getLevelRewards() {
    const { data, error } = await supabase
      .from('level_rewards')
      .select('*')
      .order('level', { ascending: true })

    if (error) throw error
    return data
  },

  async updateLevelReward(level: number, reward_amount: number) {
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