import fs from 'fs'
import path from 'path'
import { hashPassword, Role } from './auth'

export interface User {
  id: string
  email: string
  name: string
  passwordHash: string
  role: Role
  createdAt: string
  updatedAt: string
}

const DATA_DIR  = path.join(process.cwd(), 'data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf-8')
  }
}

export function readUsers(): User[] {
  ensureFile()
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as User[]
  } catch {
    return []
  }
}

function writeUsers(users: User[]) {
  ensureFile()
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8')
}

export function getUserById(id: string): User | null {
  return readUsers().find((u) => u.id === id) ?? null
}

export function getUserByEmail(email: string): User | null {
  return readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null
}

export async function createUser(data: {
  email: string
  name: string
  password: string
  role: Role
}): Promise<User> {
  const users = readUsers()
  if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error('Email sudah terdaftar.')
  }
  const now = new Date().toISOString()
  const user: User = {
    id: crypto.randomUUID(),
    email: data.email.trim().toLowerCase(),
    name: data.name.trim(),
    passwordHash: await hashPassword(data.password),
    role: data.role,
    createdAt: now,
    updatedAt: now,
  }
  writeUsers([...users, user])
  return user
}

export async function updateUser(
  id: string,
  data: Partial<{ name: string; email: string; password: string; role: Role }>
): Promise<User> {
  const users = readUsers()
  const idx = users.findIndex((u) => u.id === id)
  if (idx === -1) throw new Error('User tidak ditemukan.')

  const updated = { ...users[idx], updatedAt: new Date().toISOString() }
  if (data.name)     updated.name  = data.name.trim()
  if (data.email)    updated.email = data.email.trim().toLowerCase()
  if (data.role)     updated.role  = data.role
  if (data.password) updated.passwordHash = await hashPassword(data.password)

  users[idx] = updated
  writeUsers(users)
  return updated
}

export function deleteUser(id: string): boolean {
  const users = readUsers()
  const filtered = users.filter((u) => u.id !== id)
  if (filtered.length === users.length) return false
  writeUsers(filtered)
  return true
}

// Strip password hash for API responses
export function safeUser(u: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...safe } = u
  return safe
}

// ─── SEED default super admin if no users exist ───────────────────────────────
export async function seedDefaultAdmin() {
  const users = readUsers()
  if (users.length > 0) return // already seeded

  const password = process.env.ADMIN_PASSWORD || 'meureno2026admin'
  await createUser({
    email: 'admin@meureno.com',
    name: 'Super Admin',
    password,
    role: 'SUPER_ADMIN',
  })
  console.log('[CMS] Default super admin seeded → admin@meureno.com')
}
