import { NextRequest, NextResponse } from 'next/server'
import { comparePassword, signJWT } from '@/lib/auth'
import { getUserByEmail, seedDefaultAdmin } from '@/lib/users'

// Legacy login route — redirects to new auth system
// Kept for backwards compatibility
let seeded = false

export async function POST(req: NextRequest) {
  if (!seeded) { await seedDefaultAdmin(); seeded = true }

  try {
    const body = await req.json()

    // Support both old (password-only) and new (email+password) formats
    const email = body.email || 'admin@meureno.com'
    const password = body.password

    if (!password) {
      return NextResponse.json({ error: 'Password wajib diisi.' }, { status: 400 })
    }

    // Try new auth system first
    const user = getUserByEmail(email)
    if (user) {
      const valid = await comparePassword(password, user.passwordHash)
      if (valid) {
        const token = signJWT({ id: user.id, email: user.email, name: user.name, role: user.role })
        const res = NextResponse.json({ success: true })

        res.cookies.set('cms_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        })
        res.cookies.set('admin_token', process.env.ADMIN_SECRET!, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        })
        return res
      }
    }

    // Fallback to legacy password check
    if (password === process.env.ADMIN_PASSWORD) {
      const res = NextResponse.json({ success: true })
      res.cookies.set('admin_token', process.env.ADMIN_SECRET!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })
      return res
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
