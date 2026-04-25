import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/middleware'
import { getUserById, safeUser } from '@/lib/users'

// GET /api/auth/me — returns current logged-in user
export async function GET(req: NextRequest) {
  const { user, error } = requireAuth(req)
  if (error) return error

  const full = getUserById(user!.id)
  if (!full) return NextResponse.json({ error: 'User tidak ditemukan.' }, { status: 404 })

  return NextResponse.json({ user: safeUser(full) })
}
