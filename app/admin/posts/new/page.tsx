'use client'

import { useState, useEffect, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'
import { createPost } from '@/lib/actions'
import type { Category } from '@/types'

export default function NewPostPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCats, setLoadingCats] = useState(true)
  const [catError, setCatError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Fetch categories on client-side (avoids SSR cookie context issues)
  useEffect(() => {
    const supabase = createBrowserSupabaseClient()
    supabase
      .from('categories')
      .select('*')
      .order('name')
      .then(({ data, error }) => {
        if (error) {
          console.error('[NewPostPage] categories fetch error:', error.message)
          setCatError('Gagal memuat kategori. Coba refresh halaman.')
        } else {
          setCategories((data ?? []) as Category[])
        }
        setLoadingCats(false)
      })
  }, [])

  async function handleSubmit(formData: FormData) {
    setSubmitError(null)
    startTransition(async () => {
      try {
        const result = await createPost(formData)
        // If we get here (no redirect), there was an error
        if (result && !result.success) {
          setSubmitError(result.error ?? 'Terjadi kesalahan saat menyimpan artikel.')
        }
      } catch (err) {
        // redirect() throws NEXT_REDIRECT — let it propagate
        // Other errors are caught here
        const message = err instanceof Error ? err.message : String(err)
        if (message.includes('NEXT_REDIRECT')) {
          throw err
        }
        setSubmitError('Terjadi kesalahan tidak terduga. Silakan coba lagi.')
        console.error('[NewPostPage] submit error:', err)
      }
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="font-head text-2xl sm:text-[28px] font-bold text-ink mb-6 sm:mb-8">
        Tulis Artikel Baru
      </h1>

      {/* Error banner */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5
                        text-[13px] text-red-700 flex items-start gap-2">
          <span className="text-red-500 mt-0.5">⚠</span>
          <div>
            <p className="font-semibold">Gagal menyimpan artikel</p>
            <p className="mt-0.5">{submitError}</p>
          </div>
        </div>
      )}

      <form action={handleSubmit} className="space-y-5 sm:space-y-6 bg-white border border-border rounded-xl p-5 sm:p-6 shadow-sm">
        {/* Judul */}
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Judul <span className="text-aceh-red">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="Judul artikel yang menarik..."
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[15px] text-ink
                       outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20"
          />
        </div>

        {/* Kategori & Penulis - Mobile: stack, Desktop: grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Kategori</label>
            {loadingCats ? (
              <div className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px]
                              text-ink-soft bg-gray-50 animate-pulse">
                Memuat kategori...
              </div>
            ) : catError ? (
              <div className="w-full border border-red-200 rounded-md px-3.5 py-2.5 text-[13px]
                              text-red-600 bg-red-50">
                {catError}
              </div>
            ) : (
              <select
                name="category_id"
                className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                           outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20 bg-white"
              >
                <option value="">Pilih kategori...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            )}
            {!loadingCats && !catError && categories.length === 0 && (
              <p className="text-[11px] text-amber-600 mt-1">
                Belum ada kategori. Tambahkan di menu Kategori terlebih dahulu.
              </p>
            )}
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
              Penulis <span className="text-aceh-red">*</span>
            </label>
            <input
              type="text"
              name="author"
              required
              placeholder="Nama penulis"
              className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                         outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20"
            />
          </div>
        </div>

        {/* URL Gambar Utama */}
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            URL Gambar Utama
          </label>
          <input
            type="url"
            name="featured_image"
            placeholder="https://..."
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                       outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20"
          />
          <p className="text-[11px] text-ink-soft mt-1">
            Masukkan URL gambar (opsional)
          </p>
        </div>

        {/* Ringkasan */}
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Ringkasan <span className="text-aceh-red">*</span>
          </label>
          <textarea
            name="excerpt"
            required
            rows={2}
            maxLength={300}
            placeholder="Ringkasan singkat artikel (maks 300 karakter)..."
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                       outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20 resize-none"
          />
          <p className="text-[11px] text-ink-soft text-right mt-1">
            Maksimal 300 karakter
          </p>
        </div>

        {/* Konten Artikel */}
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Konten Artikel <span className="text-aceh-red">*</span>
            <span className="text-ink-soft font-normal ml-2 text-xs">(Mendukung HTML)</span>
          </label>
          <textarea
            name="content"
            required
            rows={14}
            placeholder="<p>Tulis konten artikel di sini...</p>"
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                       outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20
                       resize-y font-mono text-sm"
          />
        </div>

        {/* Published Checkbox */}
        <div className="flex items-center gap-3 pt-1">
          <input
            type="checkbox"
            id="published"
            name="published"
            value="true"
            defaultChecked
            className="w-4 h-4 accent-aceh-green rounded border-border"
          />
          <label htmlFor="published" className="text-[13px] font-medium text-ink-mid cursor-pointer">
            Langsung tayangkan artikel
          </label>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-border">
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto bg-aceh-green text-white font-label font-semibold tracking-[0.5px]
                       px-6 py-2.5 rounded hover:bg-aceh-green-dark transition-colors text-center
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? 'Menyimpan...' : 'Simpan & Tayangkan'}
          </button>
          <a
            href="/admin/posts"
            className="w-full sm:w-auto text-center text-ink-soft font-label text-[13px] hover:text-ink transition-colors py-2"
          >
            Batal
          </a>
        </div>
      </form>
    </div>
  )
}