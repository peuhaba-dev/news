import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/middleware'
import { getUserById, updateUser, deleteUser, safeUser } from '@/lib/users'
import { Role } from '@/lib/auth'

// GET /api/users/:id — SUPER_ADMIN only
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = requireRole(req, 'SUPER_ADMIN')
  if (error) return error

  const { id } = await params
  const user = getUserById(id)
  if (!user) return NextResponse.json({ error: 'User tidak ditemukan.' }, { status: 404 })

  return NextResponse.json({ user: safeUser(user) })
}

// PUT /api/users/:id — SUPER_ADMIN only
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = requireRole(req, 'SUPER_ADMIN')
  if (error) return error

  const { id } = await params
  try {
    const body = await req.json()
    const { name, email, password, role } = body

    if (role) {
      const validRoles: Role[] = ['SUPER_ADMIN', 'EDITOR', 'WRITER']
      if (!validRoles.includes(role)) {
        return NextResponse.json({ error: 'Role tidak valid.' }, { status: 400 })
      }
    }

    if (password && password.length < 6) {
      return NextResponse.json({ error: 'Password minimal 6 karakter.' }, { status: 400 })
    }

    const updated = await updateUser(id, {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password }),
      ...(role && { role }),
    })

    return NextResponse.json({ success: true, user: safeUser(updated) })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Gagal update user.' }, { status: 400 })
  }
}

// DELETE /api/users/:id — SUPER_ADMIN only
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, error } = requireRole(req, 'SUPER_ADMIN')
  if (error) return error

  const { id } = await params

  // Prevent self-deletion
  if (user!.id === id) {
    return NextResponse.json({ error: 'Tidak bisa menghapus akun sendiri.' }, { status: 400 })
  }

  const deleted = deleteUser(id)
  if (!deleted) return NextResponse.json({ error: 'User tidak ditemukan.' }, { status: 404 })

  return NextResponse.json({ success: true })
}
