import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

export const createServerClient = (): SupabaseClient<Database> => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

  // Without auth context, we use the standard client on the server for public operations
  return createClient<Database>(supabaseUrl, supabaseKey)
}
