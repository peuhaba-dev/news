import { NextResponse } from 'next/server'

export async function GET() {
  const res = NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL || 'https://berita.meureno.com'))
  res.cookies.set('admin_token', '', { maxAge: 0, path: '/' })
  res.cookies.set('cms_token', '', { maxAge: 0, path: '/' })
  return res
}
