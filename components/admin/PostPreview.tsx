'use client'

interface PostPreviewProps {
  title: string
  content: string
  excerpt: string
  author: string
  featuredImage: string
  onClose: () => void
}

export default function PostPreview({
  title,
  content,
  excerpt,
  author,
  featuredImage,
  onClose,
}: PostPreviewProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <div className="font-label text-[13px] font-bold text-ink-mid tracking-[0.5px]">
            👁 Preview Artikel
          </div>
          <button
            onClick={onClose}
            className="text-ink-soft hover:text-ink text-[18px] font-bold"
          >
            ✕
          </button>
        </div>

        {/* Preview content */}
        <div className="p-6">
          {/* Category placeholder */}
          <span className="inline-block bg-aceh-green text-white font-label text-[11px] tracking-[1.5px] px-2.5 py-1 rounded-[3px] mb-3 uppercase">
            Kategori
          </span>

          {/* Title */}
          <h1 className="font-head text-[28px] font-black text-ink leading-[1.2] mb-4">
            {title || 'Judul Artikel'}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-2 text-[12px] text-ink-soft mb-5 pb-4 border-b border-border">
            <span className="font-semibold text-ink-mid">{author || 'Penulis'}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>

          {/* Featured image */}
          {featuredImage && (
            <div className="mb-5 rounded-lg overflow-hidden">
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-auto max-h-[300px] object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          {excerpt && (
            <p className="text-[15px] text-ink-mid italic border-l-4 border-aceh-green bg-aceh-green-light px-4 py-3 rounded-r-md mb-5">
              {excerpt}
            </p>
          )}

          {/* Content */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: content || '<p>Konten artikel akan muncul di sini...</p>' }}
          />
        </div>
      </div>
    </div>
  )
}
