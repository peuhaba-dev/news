import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export type Role = 'SUPER_ADMIN' | 'EDITOR' | 'WRITER'

export interface AdminUser {
  id: string
  email: string
  name: string
  role: Role
}

export interface JWTPayload {
  id: string
  email: string
  name: string
  role: Role
  iat?: number
  exp?: number
}

const JWT_SECRET = process.env.JWT_SECRET || process.env.ADMIN_SECRET || 'fallback-secret-change-me'
const JWT_EXPIRES = '7d'

// ─── JWT ──────────────────────────────────────────────────────────────────────

export function signJWT(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

// ─── PASSWORD ─────────────────────────────────────────────────────────────────

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12)
}

export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed)
}

// ─── ROLE CHECKS ──────────────────────────────────────────────────────────────

export const ROLE_WEIGHTS: Record<Role, number> = {
  SUPER_ADMIN: 3,
  EDITOR: 2,
  WRITER: 1,
}

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  return ROLE_WEIGHTS[userRole] >= ROLE_WEIGHTS[requiredRole]
}

export function canManagePost(user: JWTPayload, authorId: string): boolean {
  if (user.role === 'WRITER') return user.id === authorId
  return true // EDITOR and SUPER_ADMIN can manage all posts
}
