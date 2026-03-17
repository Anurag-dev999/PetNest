import { Database } from './supabase'

export type Product = Database['public']['Tables']['products']['Row']
