'use client'

import { useEffect, useState, useTransition } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'
import type { Category } from '@/types'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    fetchCategories()
  }, [])

  // Auto-generate slug from name
  useEffect(() => {
    if (!editId) {
      setSlug(
        name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
      )
    }
  }, [name, editId])

  async function fetchCategories() {
    setLoading(true)
    const { data, error } = await (supabase as any)
      .from('categories')
      .select('*')
      .order('name')
    if (error) {
      setError('Gagal memuat kategori: ' + error.message)
    } else {
      setCategories((data ?? []) as Category[])
    }
    setLoading(false)
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !slug.trim()) return

    setError(null)
    setSuccess(null)

    const { error } = await (supabase as any)
      .from('categories')
      .insert({ name: name.trim(), slug: slug.trim() })

    if (error) {
      setError('Gagal menambah kategori: ' + error.message)
    } else {
      setSuccess(`Kategori "${name}" berhasil ditambahkan.`)
      setName('')
      setSlug('')
      fetchCategories()
    }
  }

  async function handleUpdate(id: string) {
    if (!editName.trim()) return

    const newSlug = editName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const { error } = await (supabase as any)
      .from('categories')
      .update({ name: editName.trim(), slug: newSlug })
      .eq('id', id)

    if (error) {
      setError('Gagal update: ' + error.message)
    } else {
      setEditId(null)
      setEditName('')
      fetchCategories()
    }
  }

  async function handleDelete(id: string, catName: string) {
    if (!confirm(`Hapus kategori "${catName}"? Artikel terkait tidak akan dihapus.`)) return

    const { error } = await (supabase as any)
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) {
      setError('Gagal menghapus: ' + error.message)
    } else {
      fetchCategories()
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Kelola Kategori</h1>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-[13px] text-red-700">
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-[13px] text-green-700">
          ✅ {success}
        </div>
      )}

      {/* Add form */}
      <form onSubmit={handleAdd} className="bg-white border rounded-xl p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Tambah Kategori Baru</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama kategori..."
              required
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm
                         outline-none focus:border-aceh-green focus:ring-1 focus:ring-aceh-green/20"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="slug-kategori"
              required
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm font-mono
                         outline-none focus:border-aceh-green focus:ring-1 focus:ring-aceh-green/20"
            />
          </div>
          <button
            type="submit"
            className="bg-aceh-green text-white text-sm font-semibold px-5 py-2 rounded-md
                       hover:bg-aceh-green-dark transition-colors shrink-0"
          >
            + Tambah
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-700">
            Daftar Kategori ({categories.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400 animate-pulse">Memuat...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">
            Belum ada kategori. Tambahkan di atas.
          </div>
        ) : (
          <div className="divide-y">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4
                           hover:bg-gray-50 transition-colors"
              >
                {editId === cat.id ? (
                  /* Edit mode */
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 border border-gray-200 rounded px-3 py-1.5 text-sm
                                 outline-none focus:border-aceh-green"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleUpdate(cat.id)
                        if (e.key === 'Escape') setEditId(null)
                      }}
                    />
                    <button
                      onClick={() => handleUpdate(cat.id)}
                      className="text-xs text-aceh-green font-semibold hover:underline"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="text-xs text-gray-400 hover:underline"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  /* View mode */
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800">{cat.name}</p>
                      <p className="text-xs text-gray-400 font-mono">/category/{cat.slug}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs shrink-0">
                      <button
                        onClick={() => {
                          setEditId(cat.id)
                          setEditName(cat.name)
                        }}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="text-red-500 hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
