import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { getUserById } from '@/lib/users'

/**
 * Extracts and verifies the JWT from request cookies.
 * Returns the decoded payload or null if invalid.
 */
export function getTokenFromRequest(req: NextRequest) {
  const token = req.cookies.get('cms_token')?.value
  if (!token) return null
  return verifyJWT(token)
}

/**
 * Server-side helper for API route handlers.
 * Returns a 401 response if not authenticated.
 */
export function requireAuth(req: NextRequest) {
  const user = getTokenFromRequest(req)
  if (!user) {
    return { user: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  return { user, error: null }
}

/**
 * Server-side helper that also checks role.
 */
export function requireRole(req: NextRequest, role: 'SUPER_ADMIN' | 'EDITOR' | 'WRITER') {
  const { user, error } = requireAuth(req)
  if (error) return { user: null, error }

  const WEIGHTS = { SUPER_ADMIN: 3, EDITOR: 2, WRITER: 1 }
  if (WEIGHTS[user!.role] < WEIGHTS[role]) {
    return {
      user: null,
      error: NextResponse.json({ error: 'Forbidden: insufficient role' }, { status: 403 }),
    }
  }
  return { user, error: null }
}

/**
 * Utility: auto-seed admin on first call (idempotent)
 */
let seeded = false
export async function ensureSeeded() {
  if (seeded) return
  const { seedDefaultAdmin } = await import('@/lib/users')
  await seedDefaultAdmin()
  seeded = true
}
