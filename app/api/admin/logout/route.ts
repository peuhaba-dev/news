import { NextResponse } from 'next/server'

export async function GET() {
  const response = NextResponse.redirect(
    new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL || 'https://berita.meureno.com')
  )
  response.cookies.delete('admin_token')
  return response
}
