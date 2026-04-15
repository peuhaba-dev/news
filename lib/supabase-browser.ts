import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Browser client — gunakan di Client Components ('use client').
 * Aman di-import dari mana saja, tidak ada next/headers.
 */
export function createClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnon)
}
