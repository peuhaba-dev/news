import { NextRequest, NextResponse } from 'next/server'
import { comparePassword } from '@/lib/auth'
import { getUserByEmail, seedDefaultAdmin } from '@/lib/users'
import { signJWT } from '@/lib/auth'

// Ensure default admin exists on first call
let seeded = false

export async function POST(req: NextRequest) {
  if (!seeded) { await seedDefaultAdmin(); seeded = true }

  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password wajib diisi.' }, { status: 400 })
    }

    const user = getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: 'Email atau password salah.' }, { status: 401 })
    }

    const valid = await comparePassword(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Email atau password salah.' }, { status: 401 })
    }

    const token = signJWT({ id: user.id, email: user.email, name: user.name, role: user.role })

    const res = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    })

    res.cookies.set('cms_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    // Keep old cookie for backwards compatibility
    res.cookies.set('admin_token', process.env.ADMIN_SECRET!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return res
  } catch (err) {
    console.error('[auth/login]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
