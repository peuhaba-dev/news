'use client'

import { useState, useEffect, useTransition } from 'react'
import { createPost } from '@/lib/actions'
import dynamic from 'next/dynamic'
import PostPreview from '@/components/admin/PostPreview'

const RichTextEditor = dynamic(
  () => import('@/components/admin/RichTextEditor'),
  { ssr: false, loading: () => <div className="h-[350px] border rounded-lg animate-pulse bg-gray-50" /> }
)

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

interface Category { id: string; name: string; slug: string }

export default function NewPostPage() {
  const [categories, setCategories]   = useState<Category[]>([])
  const [loadingCats, setLoadingCats] = useState(true)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isPending, startTransition]  = useTransition()

  // Form state for preview
  const [title, setTitle]             = useState('')
  const [content, setContent]         = useState('')
  const [excerpt, setExcerpt]         = useState('')
  const [author, setAuthor]           = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/berita/categories`)
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .finally(() => setLoadingCats(false))
  }, [])

  async function handleSubmit(formData: FormData) {
    // Inject rich text content
    formData.set('content', content)
    setSubmitError(null)
    startTransition(async () => {
      try {
        const result = await createPost(formData)
        if (result && !result.success) setSubmitError(result.error ?? 'Terjadi kesalahan.')
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        if (message.includes('NEXT_REDIRECT')) throw err
        setSubmitError('Terjadi kesalahan tidak terduga.')
      }
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="font-head text-2xl sm:text-[28px] font-bold text-ink mb-6">Tulis Artikel Baru</h1>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5 text-[13px] text-red-700">
          ⚠️ {submitError}
        </div>
      )}

      <form action={handleSubmit} className="space-y-5 bg-white border border-border rounded-xl p-5 sm:p-6 shadow-sm">
        {/* Title */}
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Judul <span className="text-aceh-red">*</span></label>
          <input type="text" name="title" required placeholder="Judul artikel..."
            value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
        </div>

        {/* Category + Author */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Kategori</label>
            {loadingCats ? (
              <div className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink-soft bg-gray-50 animate-pulse">Memuat...</div>
            ) : (
              <select name="category_id" className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green bg-white">
                <option value="">Pilih kategori...</option>
                {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            )}
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Penulis <span className="text-aceh-red">*</span></label>
            <input type="text" name="author" required placeholder="Nama penulis"
              value={author} onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
          </div>
        </div>

        {/* Featured image URL */}
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">URL Gambar Utama</label>
          <input type="url" name="featured_image" placeholder="https://..."
            value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)}
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
          {featuredImage && (
            <div className="mt-2 rounded-md overflow-hidden border border-border">
              <img src={featuredImage} alt="Preview" className="w-full h-auto max-h-[200px] object-cover" />
            </div>
          )}
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Ringkasan <span className="text-aceh-red">*</span></label>
          <textarea name="excerpt" required rows={2} maxLength={300} placeholder="Ringkasan singkat..."
            value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green resize-none" />
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Konten <span className="text-aceh-red">*</span></label>
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Tulis konten artikel di sini..."
          />
        </div>

        {/* Publish checkbox */}
        <div className="flex items-center gap-3">
          <input type="checkbox" id="published" name="published" value="true" defaultChecked className="w-4 h-4 accent-aceh-green" />
          <label htmlFor="published" className="text-[13px] font-medium text-ink-mid cursor-pointer">Langsung tayangkan artikel</label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <button type="submit" disabled={isPending}
            className="bg-aceh-green text-white font-label font-semibold px-6 py-2.5 rounded hover:bg-aceh-green-dark transition-colors disabled:opacity-60">
            {isPending ? 'Menyimpan...' : 'Simpan & Tayangkan'}
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
