import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

/**
 * Lazy factory for the Supabase server client.
 * Robustly handles build-time invocation where headers/cookies might be 
 * restricted and environment variables might be missing.
 */
export async function getSupabaseServerClient() {
  const cookieStore = await cookies().catch(() => null)
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore?.getAll() ?? []
      },
      setAll(cookiesToSet) {
        if (!cookieStore) return
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Ignore set errors in server components
        }
      }
    }
  })
}
