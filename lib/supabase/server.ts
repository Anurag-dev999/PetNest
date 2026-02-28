import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

export function createServerClient(): SupabaseClient<Database> {
  // Variables are read per-call, not baked at module init time
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient<Database>(url, key)
}
