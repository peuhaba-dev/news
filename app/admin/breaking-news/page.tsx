'use client'

import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

interface BreakingNews {
  id: string
  title: string
  url?: string
  active: boolean
  createdAt: string
}

export default function AdminBreakingNewsPage() {
  const [items, setItems]     = useState<BreakingNews[]>([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle]     = useState('')
  const [url, setUrl]         = useState('')
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res  = await fetch(`${API}/api/berita/breaking-news`)
    const data = await res.json()
    setItems(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setSaving(true)
    setError('')
    setSuccess('')

    const res = await fetch(`${API}/api/berita/breaking-news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim(), url: url.trim() || null }),
    })

    if (res.ok) {
      setSuccess('Breaking news berhasil ditambahkan.')
      setTitle('')
      setUrl('')
      fetchItems()
    } else {
      setError('Gagal menambahkan.')
    }
    setSaving(false)
  }

  async function handleToggle(id: string, active: boolean) {
    await fetch(`${API}/api/berita/breaking-news/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !active }),
    })
    fetchItems()
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Hapus "${title}"?`)) return
    await fetch(`${API}/api/berita/breaking-news/${id}`, { method: 'DELETE' })
    fetchItems()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Breaking News</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola teks yang berjalan di ticker atas website</p>
      </div>

      {/* Form tambah */}
      <form onSubmit={handleAdd} className="bg-white border rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Tambah Breaking News</h2>

        {error   && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-[13px] text-red-700 mb-4">⚠️ {error}</div>}
        {success && <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-[13px] text-green-700 mb-4">✅ {success}</div>}

        <div className="space-y-3">
          <div>
            <label className="block text-[13px] font-semibold text-gray-600 mb-1">
              Teks Breaking News <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={200}
              placeholder="Contoh: Gubernur Aceh Resmikan Program Gampong Digital..."
              className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-[14px] outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20"
            />
            <p className="text-[11px] text-gray-400 mt-1 text-right">{title.length}/200</p>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-600 mb-1">
              URL Tautan <span className="text-gray-400 font-normal">(opsional)</span>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://berita.meureno.com/news/slug-artikel"
              className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-[14px] outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-aceh-green text-white font-semibold text-[13px] px-5 py-2.5 rounded-md hover:bg-aceh-green-dark transition-colors disabled:opacity-60"
          >
            {saving ? 'Menyimpan...' : '+ Tambah'}
          </button>
        </div>
      </form>

      {/* Daftar */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b bg-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">
            Daftar Breaking News ({items.filter(i => i.active).length} aktif)
          </h2>
          <span className="text-[11px] text-gray-400">Maks 8 tampil di ticker</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400 animate-pulse">Memuat...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">
            <div className="text-3xl mb-2">📢</div>
            Belum ada breaking news. Tambahkan di atas.
          </div>
        ) : (
          <div className="divide-y">
            {items.map((item) => (
              <div key={item.id}
                className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50 transition-colors ${!item.active ? 'opacity-50' : ''}`}>

                {/* Status badge */}
                <div className="shrink-0">
                  <span className={`inline-block text-[10px] font-label font-bold tracking-[0.5px] px-2 py-0.5 rounded-full ${item.active ? 'bg-aceh-green-light text-aceh-green-dark' : 'bg-gray-100 text-gray-400'}`}>
                    {item.active ? '● AKTIF' : '○ NONAKTIF'}
                  </span>
                </div>

                {/* Teks */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-gray-800 line-clamp-2">{item.title}</p>
                  {item.url && (
                    <a href={item.url} target="_blank"
                      className="text-[11px] text-aceh-green hover:underline mt-0.5 block truncate">
                      {item.url}
                    </a>
                  )}
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                {/* Aksi */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleToggle(item.id, item.active)}
                    className={`text-[12px] font-semibold px-3 py-1.5 rounded-md transition-colors ${item.active ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-aceh-green-light text-aceh-green-dark hover:bg-aceh-green hover:text-white'}`}>
                    {item.active ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="text-[12px] font-semibold text-red-500 hover:text-red-700 hover:underline">
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
