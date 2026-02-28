import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

/** Lazy factory — creates client on first call, safe during Next.js build. */
let _client: SupabaseClient<Database> | null = null

export function getSupabase(): SupabaseClient<Database> {
    if (!_client) {
        _client = createClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
    }
    return _client
}
