'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

interface Category { id: string; name: string; slug: string }

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function NewPostPage() {
  const router = useRouter()
  const [categories, setCategories]   = useState<Category[]>([])
  const [loadingCats, setLoadingCats] = useState(true)
  const [saving, setSaving]           = useState(false)
  const [error, setError]             = useState('')

  const [title, setTitle]             = useState('')
  const [excerpt, setExcerpt]         = useState('')
  const [content, setContent]         = useState('')
  const [author, setAuthor]           = useState('')
  const [categoryId, setCategoryId]   = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [published, setPublished]     = useState(true)

  useEffect(() => {
    fetch(`${API}/api/berita/categories`)
      .then(r => r.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .finally(() => setLoadingCats(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !content || !excerpt || !author) {
      setError('Judul, konten, ringkasan, dan penulis wajib diisi.')
      return
    }
    setSaving(true)
    setError('')

    const slug = slugify(title) + '-' + Date.now()

    const res = await fetch(`${API}/api/berita/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title, slug, content, excerpt, author,
        featuredImage: featuredImage || null,
        categoryId: categoryId || null,
        published,
        publishedAt: published ? new Date().toISOString() : null,
      }),
    })

    if (res.ok) {
      router.push('/admin/posts')
      router.refresh()
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.message || 'Gagal menyimpan artikel.')
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-head text-2xl sm:text-[28px] font-bold text-ink">Tulis Artikel Baru</h1>
        <a href="/admin/posts" className="text-sm text-ink-soft hover:text-ink">← Kembali</a>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5 text-[13px] text-red-700">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-border rounded-xl p-5 sm:p-6 shadow-sm">
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Judul <span className="text-red-500">*</span>
          </label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required
            placeholder="Judul artikel yang menarik..."
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Kategori</label>
            {loadingCats ? (
              <div className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink-soft bg-gray-50 animate-pulse">Memuat...</div>
            ) : (
              <select value={categoryId} onChange={e => setCategoryId(e.target.value)}
                className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green bg-white">
                <option value="">Pilih kategori...</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            )}
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
              Penulis <span className="text-red-500">*</span>
            </label>
            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required
              placeholder="Nama penulis"
              className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">URL Gambar Utama</label>
          <input type="url" value={featuredImage} onChange={e => setFeaturedImage(e.target.value)}
            placeholder="https://..."
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
          {featuredImage && (
            <img src={featuredImage} alt="preview" className="mt-2 h-32 w-full object-cover rounded-md border" />
          )}
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Ringkasan <span className="text-red-500">*</span>
          </label>
          <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} required
            rows={2} maxLength={300} placeholder="Ringkasan singkat artikel..."
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green resize-none" />
          <p className="text-[11px] text-ink-soft text-right mt-1">{excerpt.length}/300</p>
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Konten <span className="text-red-500">*</span>
            <span className="text-ink-soft font-normal ml-2 text-xs">(Mendukung HTML)</span>
          </label>
          <textarea value={content} onChange={e => setContent(e.target.value)} required
            rows={16} placeholder="<p>Tulis konten artikel di sini...</p>"
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green resize-y font-mono text-sm" />
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="published" checked={published}
            onChange={e => setPublished(e.target.checked)}
            className="w-4 h-4 accent-aceh-green" />
          <label htmlFor="published" className="text-[13px] font-medium text-ink-mid cursor-pointer">
            Langsung tayangkan artikel
          </label>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <button type="submit" disabled={saving}
            className="bg-aceh-green text-white font-label font-semibold px-6 py-2.5 rounded hover:bg-aceh-green-dark transition-colors disabled:opacity-60">
            {saving ? 'Menyimpan...' : 'Simpan & Tayangkan'}
          </button>
          <a href="/admin/posts" className="text-ink-soft font-label text-[13px] hover:text-ink py-2">Batal</a>
        </div>
      </form>
    </div>
  )
}
