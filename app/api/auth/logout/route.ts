import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ success: true })
  res.cookies.set('cms_token', '', { maxAge: 0, path: '/' })
  res.cookies.set('admin_token', '', { maxAge: 0, path: '/' })
  return res
}

// Support GET for simple link-based logout
export async function GET() {
  const res = NextResponse.redirect(new URL('/admin/login', 'https://berita.meureno.com'))
  res.cookies.set('cms_token', '', { maxAge: 0, path: '/' })
  res.cookies.set('admin_token', '', { maxAge: 0, path: '/' })
  return res
}
