/**
 * lib/supabase.ts
 *
 * Re-exports HANYA browser client.
 * Aman di-import dari Client Components ('use client').
 *
 * Untuk Server Components / Server Actions / Route Handlers,
 * import dari '@/lib/supabase-server':
 *   import { createServerSupabaseClient } from '@/lib/supabase-server'
 */
export { createBrowserSupabaseClient } from './supabase-browser'
