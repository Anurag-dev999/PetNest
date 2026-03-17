import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'

/**
 * Lazy factory for the Supabase browser client.
 * Ensures the client is only initialized when needed on the client-side,
 * avoiding environment variable issues during static generation.
 */
export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return null
  }

  return createBrowserClient<Database>(url, key)
}
