import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          image_url: string
          category: string
          pet_type: string
          stock: number
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['products']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<
          Database['public']['Tables']['products']['Insert']
        >
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          email: string
          total: number
          status: string
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['orders']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<
          Database['public']['Tables']['orders']['Insert']
        >
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['order_items']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<
          Database['public']['Tables']['order_items']['Insert']
        >
      }
    }
  }
}
