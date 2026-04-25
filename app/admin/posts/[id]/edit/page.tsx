'use client'

import { useState, useEffect, useTransition } from 'react'
import { useParams } from 'next/navigation'
import { updatePost } from '@/lib/actions'
import dynamic from 'next/dynamic'
import PostPreview from '@/components/admin/PostPreview'

const RichTextEditor = dynamic(
  () => import('@/components/admin/RichTextEditor'),
  { ssr: false, loading: () => <div className="h-[350px] border rounded-lg animate-pulse bg-gray-50" /> }
)

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

interface Category { id: string; name: string; slug: string }

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()

  const [loading, setLoading]         = useState(true)
  const [categories, setCategories]   = useState<Category[]>([])
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isPending, startTransition]  = useTransition()
  const [showPreview, setShowPreview] = useState(false)

  // Form fields
  const [title, setTitle]             = useState('')
  const [excerpt, setExcerpt]         = useState('')
  const [content, setContent]         = useState('')
  const [author, setAuthor]           = useState('')
  const [categoryId, setCategoryId]   = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [published, setPublished]     = useState(false)

  useEffect(() => {
    async function load() {
      const [postRes, catRes] = await Promise.all([
        fetch(`${API}/api/berita/posts/${id}`),
        fetch(`${API}/api/berita/categories`),
      ])
      const post = await postRes.json()
      const cats = await catRes.json()

      setTitle(post.title ?? '')
      setExcerpt(post.excerpt ?? '')
      setContent(post.content ?? '')
      setAuthor(post.author ?? '')
      setCategoryId(post.categoryId ?? '')
      setFeaturedImage(post.featuredImage ?? '')
      setPublished(post.published ?? false)
      setCategories(Array.isArray(cats) ? cats : [])
      setLoading(false)
    }
    load()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError(null)

    const formData = new FormData()
    formData.set('title', title)
    formData.set('excerpt', excerpt)
    formData.set('content', content)
    formData.set('author', author)
    formData.set('category_id', categoryId)
    formData.set('featured_image', featuredImage)
    formData.set('published', published ? 'true' : 'false')

    startTransition(async () => {
      try {
        const result = await updatePost(id, formData)
        if (result && !result.success) setSubmitError(result.error ?? 'Terjadi kesalahan.')
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        if (message.includes('NEXT_REDIRECT')) throw err
        setSubmitError('Terjadi kesalahan tidak terduga.')
      }
    })
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="h-64 bg-gray-100 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-head text-2xl sm:text-[28px] font-bold text-ink">Edit Artikel</h1>
        <a href="/admin/posts" className="text-sm text-ink-soft hover:text-ink">← Kembali</a>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5 text-[13px] text-red-700">
          ⚠️ {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-border rounded-xl p-5 sm:p-6 shadow-sm">
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Judul <span className="text-aceh-red">*</span>
          </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Kategori</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green bg-white">
              <option value="">Pilih kategori...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
              Penulis <span className="text-aceh-red">*</span>
            </label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required
              className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">URL Gambar Utama</label>
          <input type="url" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} placeholder="https://..."
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
          {featuredImage && (
            <img src={featuredImage} alt="preview" className="mt-2 h-32 w-full object-cover rounded-md border border-border" />
          )}
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Ringkasan <span className="text-aceh-red">*</span>
          </label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required rows={2} maxLength={300}
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green resize-none" />
        </div>

        {/* Rich Text Editor (TipTap) */}
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Konten <span className="text-aceh-red">*</span>
          </label>
          <RichTextEditor
            content={content}
            onChange={setContent}
          />
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="published" checked={published} onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 accent-aceh-green" />
          <label htmlFor="published" className="text-[13px] font-medium text-ink-mid cursor-pointer">
            Tayangkan artikel
          </label>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <button type="submit" disabled={isPending}
            className="bg-aceh-green text-white font-label font-semibold px-6 py-2.5 rounded hover:bg-aceh-green-dark transition-colors disabled:opacity-60">
            {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="bg-gray-100 text-ink-mid font-label font-semibold px-5 py-2.5 rounded hover:bg-gray-200 transition-colors text-[13px]"
          >
            👁 Preview
          </button>
          <a href="/admin/posts" className="text-ink-soft font-label text-[13px] hover:text-ink py-2 ml-auto">Batal</a>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <PostPreview
          title={title}
          content={content}
          excerpt={excerpt}
          author={author}
          featuredImage={featuredImage}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  )
}
