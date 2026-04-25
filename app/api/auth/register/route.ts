import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/middleware'
import { createUser, safeUser } from '@/lib/users'
import { Role } from '@/lib/auth'

// POST /api/auth/register — SUPER_ADMIN only
export async function POST(req: NextRequest) {
  const { user, error } = requireRole(req, 'SUPER_ADMIN')
  if (error) return error

  try {
    const { email, name, password, role } = await req.json()

    if (!email || !name || !password || !role) {
      return NextResponse.json({ error: 'Semua field wajib diisi.' }, { status: 400 })
    }

    const validRoles: Role[] = ['SUPER_ADMIN', 'EDITOR', 'WRITER']
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: 'Role tidak valid.' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password minimal 6 karakter.' }, { status: 400 })
    }

    const created = await createUser({ email, name, password, role })
    return NextResponse.json({ success: true, user: safeUser(created) }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Gagal membuat user.' }, { status: 400 })
  }
}
