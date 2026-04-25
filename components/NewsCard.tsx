import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types'
import { formatDate } from '@/lib/utils'

const GRADIENT_FALLBACKS = [
  'from-[#0a4d2b] to-[#1a8a52]',
  'from-[#1e2d5a] to-[#2a5298]',
  'from-[#4a2020] to-[#8b3030]',
  'from-[#2d4a1e] to-[#558b2f]',
  'from-[#3d2a0a] to-[#8b6914]',
  'from-[#1a1a3e] to-[#3a3a8b]',
]

interface NewsCardProps {
  post: Post
  index?: number
}

export default function NewsCard({ post, index = 0 }: NewsCardProps) {
  const gradient = GRADIENT_FALLBACKS[index % GRADIENT_FALLBACKS.length]

  return (
    <Link
      href={`/news/${post.slug}`}
      className="grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-3.5 py-4 border-b border-border last:border-b-0
                 hover:opacity-80 transition-opacity duration-150 cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="h-[95px] rounded-md overflow-hidden shrink-0 relative">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="140px"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        )}
      </div>

      {/* Body */}
      <div>
        <div
          className="font-label text-[10.5px] tracking-[0.8px] text-aceh-green
                     font-bold uppercase mb-1.5 flex items-center gap-1.5"
        >
          {post.category?.name ?? 'Berita'}
        </div>
        <h3
          className="font-head text-[16px] font-bold text-ink leading-[1.35]
                     mb-1.5 group-hover:text-aceh-green transition-colors duration-150"
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p
            className="text-[13px] text-ink-soft leading-[1.5] mb-1.5
                       line-clamp-2"
          >
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-2.5 text-[11.5px] text-ink-soft">
          <span className="font-semibold text-ink-mid">{post.author}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-border inline-block" />
          <span>{formatDate(post.created_at)}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-border inline-block" />
          <span>{post.views.toLocaleString('id-ID')} dibaca</span>
        </div>
      </div>
    </Link>
  )
}
