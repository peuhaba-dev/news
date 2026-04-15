import { createPost } from '@/lib/actions'
import { getAllCategories } from '@/lib/queries'

export default async function NewPostPage() {
  const categories = await getAllCategories()

  return (
    <div className="max-w-3xl">
      <h1 className="font-head text-[28px] font-bold text-ink mb-8">Tulis Artikel Baru</h1>

      <form action={createPost} className="space-y-6 bg-white border border-border rounded-xl p-6">

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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Kategori</label>
            <select
              name="category_id"
              className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                         outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20"
            >
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

        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">URL Gambar Utama</label>
          <input
            type="url"
            name="featured_image"
            placeholder="https://..."
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                       outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20"
          />
        </div>

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
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Konten Artikel <span className="text-aceh-red">*</span>
            <span className="text-ink-soft font-normal ml-2">(Mendukung HTML)</span>
          </label>
          <textarea
            name="content"
            required
            rows={16}
            placeholder="<p>Tulis konten artikel di sini...</p>"
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                       outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20
                       resize-y font-mono"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            name="published"
            value="true"
            defaultChecked
            className="w-4 h-4 accent-aceh-green"
          />
          <label htmlFor="published" className="text-[13px] font-semibold text-ink-mid cursor-pointer">
            Langsung tayangkan artikel
          </label>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <button
            type="submit"
            className="bg-aceh-green text-white font-label font-semibold tracking-[0.5px]
                       px-6 py-2.5 rounded hover:bg-aceh-green-dark transition-colors"
          >
            Simpan & Tayangkan
          </button>
          <a
            href="/admin/posts"
            className="text-ink-soft font-label text-[13px] hover:text-ink transition-colors"
          >
            Batal
          </a>
        </div>
      </form>
    </div>
  )
}
