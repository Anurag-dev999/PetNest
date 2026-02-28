import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const SUPABASE_URL = "https://zlqetxxbubqiwsqtdmme.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpscWV0eHhidWJxaXdzcXRkbW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNTk0MTIsImV4cCI6MjA4NzgzNTQxMn0.M6OYIhsYJjtzKaSs3HFeT6Y97F4epPgzWNpWFhC9hc4"

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
