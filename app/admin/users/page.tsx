'use client'

import { useEffect, useState } from 'react'
import { useAuth, ROLE_LABELS, ROLE_COLORS } from '@/components/admin/AuthProvider'

type Role = 'SUPER_ADMIN' | 'EDITOR' | 'WRITER'

interface UserItem {
  id: string
  email: string
  name: string
  role: Role
  createdAt: string
}

export default function AdminUsersPage() {
  const { user: me } = useAuth()
  const [users, setUsers] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(true)

  // Form state
  const [showForm, setShowForm] = useState(false)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPassword, setFormPassword] = useState('')
  const [formRole, setFormRole] = useState<Role>('WRITER')
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Edit state
  const [editId, setEditId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editRole, setEditRole] = useState<Role>('WRITER')
  const [editPassword, setEditPassword] = useState('')

  useEffect(() => { fetchUsers() }, [])

  async function fetchUsers() {
    setLoading(true)
    try {
      const res = await fetch('/api/users')
      if (res.ok) {
        const data = await res.json()
        setUsers(data.users || [])
      }
    } catch {}
    setLoading(false)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setFormError(null)
    setFormSuccess(null)

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          password: formPassword,
          role: formRole,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setFormSuccess(`User "${formName}" berhasil dibuat.`)
        setFormName(''); setFormEmail(''); setFormPassword(''); setFormRole('WRITER')
        setShowForm(false)
        fetchUsers()
      } else {
        setFormError(data.error || 'Gagal membuat user.')
      }
    } catch {
      setFormError('Terjadi kesalahan.')
    }
    setSubmitting(false)
  }

  async function handleUpdate(id: string) {
    setSubmitting(true)
    try {
      const body: any = { name: editName, email: editEmail, role: editRole }
      if (editPassword) body.password = editPassword
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setEditId(null)
        setFormSuccess('User berhasil diperbarui.')
        fetchUsers()
      } else {
        const data = await res.json()
        setFormError(data.error || 'Gagal update user.')
      }
    } catch {
      setFormError('Terjadi kesalahan.')
    }
    setSubmitting(false)
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Hapus user "${name}"? Tindakan ini tidak bisa dibatalkan.`)) return
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setFormSuccess(`User "${name}" berhasil dihapus.`)
        fetchUsers()
      } else {
        const data = await res.json()
        setFormError(data.error || 'Gagal menghapus user.')
      }
    } catch {
      setFormError('Terjadi kesalahan.')
    }
  }

  function startEdit(u: UserItem) {
    setEditId(u.id)
    setEditName(u.name)
    setEditEmail(u.email)
    setEditRole(u.role)
    setEditPassword('')
  }

  if (me?.role !== 'SUPER_ADMIN') {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">🔒</p>
        <p className="text-gray-500 text-sm mt-2">Anda tidak memiliki akses ke halaman ini.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Kelola Pengguna</h1>
          <p className="text-xs sm:text-sm text-gray-500">Kelola admin, editor, dan penulis</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setFormError(null); setFormSuccess(null) }}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-500 transition-all shadow-sm"
        >
          {showForm ? '✕ Tutup' : '+ Tambah User'}
        </button>
      </div>

      {/* Alerts */}
      {formError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-[13px] text-red-700 flex items-start gap-2">
          <span>⚠️</span><span>{formError}</span>
          <button onClick={() => setFormError(null)} className="ml-auto text-red-400 hover:text-red-600">✕</button>
        </div>
      )}
      {formSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-[13px] text-green-700 flex items-start gap-2">
          <span>✅</span><span>{formSuccess}</span>
          <button onClick={() => setFormSuccess(null)} className="ml-auto text-green-400 hover:text-green-600">✕</button>
        </div>
      )}

      {/* Create Form */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white border rounded-xl p-5 space-y-4 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700">Buat User Baru</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-gray-500 mb-1">Nama</label>
              <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} required placeholder="Nama lengkap"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-gray-500 mb-1">Email</label>
              <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} required placeholder="email@domain.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-gray-500 mb-1">Password</label>
              <input type="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} required minLength={6} placeholder="Min 6 karakter"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-gray-500 mb-1">Role</label>
              <select value={formRole} onChange={(e) => setFormRole(e.target.value as Role)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 bg-white">
                <option value="WRITER">Penulis (Writer)</option>
                <option value="EDITOR">Editor</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={submitting}
              className="bg-emerald-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-emerald-500 transition-colors disabled:opacity-50">
              {submitting ? 'Membuat...' : 'Buat User'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-sm text-gray-400 hover:text-gray-600">Batal</button>
          </div>
        </form>
      )}

      {/* Users Table */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-3 border-b bg-gray-50/50">
          <h2 className="text-sm font-semibold text-gray-700">Daftar Pengguna ({users.length})</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-pulse space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-12 bg-gray-100 rounded-lg" />)}
            </div>
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">Belum ada pengguna.</div>
        ) : (
          <div className="divide-y">
            {users.map((u) => (
              <div key={u.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                {editId === u.id ? (
                  /* Edit Mode */
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-emerald-500" placeholder="Nama" />
                      <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-emerald-500" placeholder="Email" />
                      <select value={editRole} onChange={(e) => setEditRole(e.target.value as Role)}
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-emerald-500 bg-white">
                        <option value="WRITER">Writer</option>
                        <option value="EDITOR">Editor</option>
                        <option value="SUPER_ADMIN">Super Admin</option>
                      </select>
                    </div>
                    <input type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-emerald-500 w-full sm:w-1/3"
                      placeholder="Password baru (kosongkan jika tidak ubah)" />
                    <div className="flex gap-2">
                      <button onClick={() => handleUpdate(u.id)} disabled={submitting}
                        className="bg-emerald-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:bg-emerald-500 disabled:opacity-50">
                        {submitting ? 'Simpan...' : 'Simpan'}
                      </button>
                      <button onClick={() => setEditId(null)} className="text-xs text-gray-400 hover:text-gray-600 px-3">Batal</button>
                    </div>
                  </div>
                ) : (
                  /* Display Mode */
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-gray-800">{u.name}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ROLE_COLORS[u.role]}`}>
                          {ROLE_LABELS[u.role]}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{u.email}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400 hidden sm:inline">
                        {new Date(u.createdAt).toLocaleDateString('id-ID')}
                      </span>
                      <button onClick={() => startEdit(u)}
                        className="text-blue-500 hover:text-blue-700 font-medium">Edit</button>
                      {u.id !== me?.id && (
                        <>
                          <span className="text-gray-200">|</span>
                          <button onClick={() => handleDelete(u.id, u.name)}
                            className="text-red-500 hover:text-red-700 font-medium">Hapus</button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Role Info */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">ℹ️ Hak Akses Role</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px]">
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="font-bold text-purple-700 mb-1">Super Admin</p>
            <p className="text-purple-600">Full akses: kelola semua artikel, kategori, komentar, dan pengguna</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="font-bold text-blue-700 mb-1">Editor</p>
            <p className="text-blue-600">Buat, edit, dan hapus semua artikel. Kelola kategori dan komentar</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-bold text-gray-700 mb-1">Penulis (Writer)</p>
            <p className="text-gray-600">Buat artikel dan edit/hapus artikel sendiri saja</p>
          </div>
        </div>
      </div>
    </div>
  )
}
