import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()

  // Use the request origin (works on any domain — localhost, staging, production)
  const origin = request.nextUrl.origin
  return NextResponse.redirect(new URL('/', origin))
}
