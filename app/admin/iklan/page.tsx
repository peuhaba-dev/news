'use client'

import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

interface Ad {
  id: string
  title: string
  imageUrl: string
  linkUrl?: string
  position: string
  active: boolean
  startDate?: string
  endDate?: string
  createdAt: string
}

const POSITIONS = [
  { value: 'sidebar', label: 'Sidebar' },
  { value: 'banner-top', label: 'Banner Atas' },
  { value: 'banner-bottom', label: 'Banner Bawah' },
  { value: 'inline', label: 'Inline Artikel' },
]

export default function AdminIklanPage() {
  const [items, setItems]     = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  const [title, setTitle]       = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [linkUrl, setLinkUrl]   = useState('')
  const [position, setPosition] = useState('sidebar')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate]     = useState('')

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    setLoading(true)
    const res  = await fetch(`${API}/api/berita/ads/all`)
    const data = await res.json()
    setItems(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !imageUrl.trim()) return
    setSaving(true)
    setError('')
    setSuccess('')

    const res = await fetch(`${API}/api/berita/ads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim(),
        imageUrl: imageUrl.trim(),
        linkUrl: linkUrl.trim() || null,
        position,
        startDate: startDate || null,
        endDate: endDate || null,
      }),
    })

    if (res.ok) {
      setSuccess('Iklan berhasil ditambahkan.')
      setTitle(''); setImageUrl(''); setLinkUrl('')
      setStartDate(''); setEndDate(''); setPosition('sidebar')
      fetchItems()
    } else {
      setError('Gagal menambahkan iklan.')
    }
    setSaving(false)
  }

  async function handleToggle(id: string, active: boolean) {
    await fetch(`${API}/api/berita/ads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !active }),
    })
    fetchItems()
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Hapus iklan "${title}"?`)) return
    await fetch(`${API}/api/berita/ads/${id}`, { method: 'DELETE' })
    fetchItems()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Kelola Iklan</h1>
        <p className="text-sm text-gray-500 mt-1">Tambah dan kelola iklan manual yang tampil di website</p>
      </div>

      {/* Form tambah */}
      <form onSubmit={handleAdd} className="bg-white border rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Tambah Iklan Baru</h2>

        {error   && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-[13px] text-red-700 mb-4">⚠️ {error}</div>}
        {success && <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-[13px] text-green-700 mb-4">✅ {success}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-[13px] font-semibold text-gray-600 mb-1">
              Nama Iklan <span className="text-red-500">*</span>
            </label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required
              placeholder="Contoh: Banner Toko Seulawah"
              className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-[14px] outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[13px] font-semibold text-gray-600 mb-1">
              URL Gambar <span className="text-red-500">*</span>
            </label>
            <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required
              placeholder="https://..."
              className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-[14px] outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
            {imageUrl && (
              <img src={imageUrl} alt="preview" className="mt-2 h-24 object-contain rounded border" />
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[13px] font-semibold text-gray-600 mb-1">
              URL Tujuan <span className="text-gray-400 font-normal">(opsional)</span>
            </label>
            <input type="url" value={linkUrl} onChange={e => setLinkUrl(e.target.value)}
              placeholder="https://..."
              className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-[14px] outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-600 mb-1">Posisi</label>
            <select value={position} onChange={e => setPosition(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-[14px] outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20">
              {POSITIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-600 mb-1">
              Tanggal Mulai <span className="text-gray-400 font-normal">(opsional)</span>
            </label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-[14px] outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-600 mb-1">
              Tanggal Berakhir <span className="text-gray-400 font-normal">(opsional)</span>
            </label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-[14px] outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
          </div>
        </div>

        <button type="submit" disabled={saving}
          className="mt-4 bg-aceh-green text-white font-semibold text-[13px] px-5 py-2.5 rounded-md hover:bg-aceh-green-dark transition-colors disabled:opacity-60">
          {saving ? 'Menyimpan...' : '+ Tambah Iklan'}
        </button>
      </form>

      {/* Daftar */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-700">
            Daftar Iklan ({items.filter(i => i.active).length} aktif dari {items.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-400 animate-pulse">Memuat...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">
            <div className="text-3xl mb-2">📢</div>
            Belum ada iklan. Tambahkan di atas.
          </div>
        ) : (
          <div className="divide-y">
            {items.map(item => (
              <div key={item.id}
                className={`px-5 py-4 flex flex-col sm:flex-row gap-4 hover:bg-gray-50 transition-colors ${!item.active ? 'opacity-50' : ''}`}>

                {/* Gambar */}
                <img src={item.imageUrl} alt={item.title}
                  className="w-full sm:w-32 h-20 object-contain rounded border bg-gray-50 shrink-0" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-label font-bold tracking-[0.5px] px-2 py-0.5 rounded-full ${item.active ? 'bg-aceh-green-light text-aceh-green-dark' : 'bg-gray-100 text-gray-400'}`}>
                      {item.active ? '● AKTIF' : '○ NONAKTIF'}
                    </span>
                    <span className="text-[10px] font-label font-bold tracking-[0.5px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                      {POSITIONS.find(p => p.value === item.position)?.label ?? item.position}
                    </span>
                  </div>
                  <p className="text-[14px] font-medium text-gray-800">{item.title}</p>
                  {item.linkUrl && (
                    <a href={item.linkUrl} target="_blank"
                      className="text-[11px] text-aceh-green hover:underline block truncate">{item.linkUrl}</a>
                  )}
                  {(item.startDate || item.endDate) && (
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {item.startDate ? new Date(item.startDate).toLocaleDateString('id-ID') : '?'}
                      {' → '}
                      {item.endDate ? new Date(item.endDate).toLocaleDateString('id-ID') : 'Selamanya'}
                    </p>
                  )}
                </div>

                {/* Aksi */}
                <div className="flex sm:flex-col items-center gap-2 shrink-0">
                  <button onClick={() => handleToggle(item.id, item.active)}
                    className={`text-[12px] font-semibold px-3 py-1.5 rounded-md transition-colors ${item.active ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-aceh-green-light text-aceh-green-dark hover:bg-aceh-green hover:text-white'}`}>
                    {item.active ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                  <button onClick={() => handleDelete(item.id, item.title)}
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
