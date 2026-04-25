import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types'
import { formatDate, readTime } from '@/lib/utils'

const GRADIENT_FALLBACKS = [
  'from-[#0a4d2b] via-[#1a7a4a] to-[#00703C]',
  'from-[#1e2d5a] via-[#2a4a8a] to-[#2a5298]',
  'from-[#4a2020] via-[#7a3030] to-[#8b3030]',
  'from-[#1a3a4a] via-[#2a5a6a] to-[#1a5a6a]',
]

interface BigCardProps {
  post: Post
  gradient?: string
  gradientIndex?: number
}

export default function BigCard({ post, gradient, gradientIndex = 0 }: BigCardProps) {
  const fallbackGradient = GRADIENT_FALLBACKS[gradientIndex % GRADIENT_FALLBACKS.length]
  const bg = gradient ?? fallbackGradient

  return (
    <Link
      href={`/news/${post.slug}`}
      className="relative rounded-xl overflow-hidden h-[280px] sm:h-[340px] mb-5
                 cursor-pointer block group card-lift"
    >
      {/* Image or gradient bg */}
      {post.featured_image ? (
        <Image
          src={post.featured_image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 1024px) 100vw, 860px"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${bg}`} />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0
                   bg-gradient-to-t from-black/95 via-black/30 to-transparent"
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
        {/* Category badge */}
        {post.category && (
          <span
            className="inline-block font-label text-[9.5px] tracking-[1.8px] uppercase
                       text-aceh-gold mb-2 font-bold border border-aceh-gold/40
                       px-2 py-0.5 rounded-sm"
          >
            {post.category.name}
          </span>
        )}

        {/* Title */}
        <h2
          className="font-head text-[20px] sm:text-[24px] font-black text-white leading-[1.25]
                     mb-2.5 group-hover:text-aceh-gold/90 transition-colors duration-200
                     drop-shadow-md"
        >
          {post.title}
        </h2>

        {/* Meta */}
        <div className="flex items-center gap-2.5 text-[11.5px] text-white/65">
          <span className="font-semibold text-white/80">{post.author}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-white/40 inline-block" />
          <span>{formatDate(post.created_at)}</span>
          {post.content && (
            <>
              <span className="w-[3px] h-[3px] rounded-full bg-white/40 inline-block" />
              <span>⏱ {readTime(post.content)}</span>
            </>
          )}
        </div>
      </div>

      {/* "BACA SELENGKAPNYA" pill */}
      <div
        className="absolute top-4 right-4 z-10 bg-white/15 backdrop-blur-sm
                   text-white font-label text-[9px] tracking-[1.5px] uppercase px-2.5 py-1
                   rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        Baca Selengkapnya →
      </div>
    </Link>
  )
}
