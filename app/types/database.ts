export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      announcements: {
        Row: {
          id: number
          text: string
          char_count: number
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          text: string
          char_count?: number
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          text?: string
          char_count?: number
          created_at?: string
          updated_at?: string | null
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
          score: number
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
          reward_amount: number
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
          updated_at: string | null
        }
        Insert: {
          id?: number
          name: string
          description: string
          url: string
          is_active?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string
          url?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string | null
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
          balance: number
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}