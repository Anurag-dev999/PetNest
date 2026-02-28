import { createClient } from '@supabase/supabase-js'
import { Database } from './client'

export const createServerClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  // Without auth context, we use the standard client on the server for public operations
  return createClient<Database>(supabaseUrl, supabaseKey)
}
