'use client'

import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

interface Category { id: string; name: string; slug: string }

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading]       = useState(true)
  const [name, setName]             = useState('')
  const [slug, setSlug]             = useState('')
  const [editId, setEditId]         = useState<string | null>(null)
  const [editName, setEditName]     = useState('')
  const [error, setError]           = useState<string | null>(null)
  const [success, setSuccess]       = useState<string | null>(null)

  useEffect(() => { fetchCategories() }, [])
  useEffect(() => {
    if (!editId) setSlug(name.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').trim())
  }, [name, editId])

  async function fetchCategories() {
    setLoading(true)
    const res = await fetch(`${API}/api/berita/categories`)
    const data = await res.json()
    setCategories(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setError(null); setSuccess(null)
    const res = await fetch(`${API}/api/berita/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), slug: slug.trim() }),
    })
    if (!res.ok) { setError('Gagal menambah kategori.'); return }
    setSuccess(`Kategori "${name}" berhasil ditambahkan.`)
    setName(''); setSlug('')
    fetchCategories()
  }

  async function handleDelete(id: string, catName: string) {
    if (!confirm(`Hapus kategori "${catName}"?`)) return
    await fetch(`${API}/api/berita/categories/${id}`, { method: 'DELETE' })
    fetchCategories()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Kelola Kategori</h1>
      {error   && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-[13px] text-red-700">⚠️ {error}</div>}
      {success && <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-[13px] text-green-700">✅ {success}</div>}
      <form onSubmit={handleAdd} className="bg-white border rounded-xl p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Tambah Kategori Baru</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama kategori..." required
            className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-aceh-green" />
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug-kategori" required
            className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm font-mono outline-none focus:border-aceh-green" />
          <button type="submit" className="bg-aceh-green text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-aceh-green-dark">+ Tambah</button>
        </div>
      </form>
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-700">Daftar Kategori ({categories.length})</h2>
        </div>
        {loading ? <div className="p-8 text-center text-sm text-gray-400 animate-pulse">Memuat...</div> :
          categories.length === 0 ? <div className="p-8 text-center text-sm text-gray-400">Belum ada kategori.</div> :
          <div className="divide-y">
            {categories.map((cat) => (
              <div key={cat.id} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-gray-50">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-800">{cat.name}</p>
                  <p className="text-xs text-gray-400 font-mono">/category/{cat.slug}</p>
                </div>
                <button onClick={() => handleDelete(cat.id, cat.name)} className="text-xs text-red-500 hover:underline">Hapus</button>
              </div>
            ))}
          </div>}
      </div>
    </div>
  )
}
