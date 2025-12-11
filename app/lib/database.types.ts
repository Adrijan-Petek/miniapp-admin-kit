// Supabase Database Types
// This file defines the types for our custom database schema

export interface Database {
  public: {
    Tables: {
      announcements: {
        Row: {
          id: number
          text: string
          char_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          text: string
          char_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          text?: string
          char_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      leaderboard: {
        Row: {
          id: number
          address: string
          score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          address: string
          score?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          address?: string
          score?: number
          created_at?: string
          updated_at?: string
        }
      }
      level_rewards: {
        Row: {
          id: number
          level: number
          reward_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          level: number
          reward_amount?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          level?: number
          reward_amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      mini_apps: {
        Row: {
          id: number
          name: string
          description: string
          url: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          url: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          url?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      treasury: {
        Row: {
          id: number
          balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          balance?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          balance?: number
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: number
          username: string
          email: string
          password_hash: string
          role: 'super_admin' | 'admin' | 'moderator' | 'viewer'
          is_active: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          username: string
          email: string
          password_hash: string
          role: 'super_admin' | 'admin' | 'moderator' | 'viewer'
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          username?: string
          email?: string
          password_hash?: string
          role?: 'super_admin' | 'admin' | 'moderator' | 'viewer'
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      api_keys: {
        Row: {
          id: number
          name: string
          key: string
          permissions: Record<string, any>
          is_active: boolean
          created_by: number
          expires_at: string | null
          last_used: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          key: string
          permissions?: Record<string, any>
          is_active?: boolean
          created_by: number
          expires_at?: string | null
          last_used?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          key?: string
          permissions?: Record<string, any>
          is_active?: boolean
          created_by?: number
          expires_at?: string | null
          last_used?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: number
          user_id: number | null
          action: string
          resource: string
          resource_id: string | null
          details: Record<string, any> | null
          ip_address: string | null
          user_agent: string | null
          timestamp: string
        }
        Insert: {
          id?: number
          user_id?: number | null
          action: string
          resource: string
          resource_id?: string | null
          details?: Record<string, any> | null
          ip_address?: string | null
          user_agent?: string | null
          timestamp?: string
        }
        Update: {
          id?: number
          user_id?: number | null
          action?: string
          resource?: string
          resource_id?: string | null
          details?: Record<string, any> | null
          ip_address?: string | null
          user_agent?: string | null
          timestamp?: string
        }
      }
      sessions: {
        Row: {
          id: string
          user_id: number
          token: string
          expires_at: string
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: number
          token: string
          expires_at: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: number
          token?: string
          expires_at?: string
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}