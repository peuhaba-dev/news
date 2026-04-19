import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

/**
 * Supabase client for static generation (generateStaticParams, generateSitemap, etc.)
 * No cookies needed — uses anon key directly.
 * Returns null if env vars are missing (build-time safety).
 */
export function createStaticSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return null
  }

  return createClient<Database>(url, key)
}