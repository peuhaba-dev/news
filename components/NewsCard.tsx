import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types'
import { formatDate, readTime } from '@/lib/utils'

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
  variant?: 'horizontal' | 'vertical'
}

export default function NewsCard({ post, index = 0, variant = 'horizontal' }: NewsCardProps) {
  const gradient = GRADIENT_FALLBACKS[index % GRADIENT_FALLBACKS.length]

  if (variant === 'vertical') {
    return (
      <Link
        href={`/news/${post.slug}`}
        className="related-card card-lift group block"
      >
        {/* Thumbnail */}
        <div className="relative h-[160px] w-full overflow-hidden">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          )}
        </div>
        {/* Body */}
        <div className="p-3.5">
          {post.category && (
            <span className="inline-block bg-aceh-green text-white font-label text-[9.5px]
                             tracking-[1px] px-2 py-0.5 rounded-[3px] mb-2 uppercase">
              {post.category.name}
            </span>
          )}
          <h3 className="font-head text-[14px] font-bold text-ink leading-[1.35]
                         line-clamp-2 group-hover:text-aceh-green transition-colors">
            {post.title}
          </h3>
          <div className="mt-2 text-[11px] text-ink-soft">
            {formatDate(post.created_at)}
          </div>
        </div>
      </Link>
    )
  }

  // Default: horizontal
  return (
    <Link
      href={`/news/${post.slug}`}
      className="grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-3.5
                 py-4 border-b border-border last:border-b-0
                 hover:opacity-90 transition-opacity duration-150 cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="h-[90px] sm:h-[100px] rounded-lg overflow-hidden shrink-0 relative bg-surface">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="140px"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <svg className="w-7 h-7 fill-white/40" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="min-w-0">
        {post.category && (
          <span className="inline-block font-label text-[9.5px] tracking-[1px]
                           text-aceh-green font-bold uppercase mb-1.5">
            {post.category.name}
          </span>
        )}
        <h3
          className="font-head text-[15px] sm:text-[16px] font-bold text-ink leading-[1.35]
                     mb-1.5 line-clamp-2 group-hover:text-aceh-green transition-colors duration-150"
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <div className="text-[12.5px] text-ink-soft leading-[1.5] mb-1.5 line-clamp-2 hidden sm:block">
            {post.excerpt}
          </div>
        )}
        <div className="flex items-center gap-2 text-[11px] text-ink-soft flex-wrap">
          <span className="font-semibold text-ink-mid">{post.author}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-border inline-block" />
          <span>{formatDate(post.created_at)}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-border inline-block" />
          <span>{post.views.toLocaleString('id-ID')} dibaca</span>
          {post.content && (
            <>
              <span className="w-[3px] h-[3px] rounded-full bg-border inline-block" />
              <span>{readTime(post.content)}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
