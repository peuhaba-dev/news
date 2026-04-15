import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types'
import { formatDate } from '@/lib/utils'

interface BigCardProps {
  post: Post
  gradient?: string
}

export default function BigCard({
  post,
  gradient = 'from-[#1a4a2e] to-[#00703C]',
}: BigCardProps) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="relative rounded-lg overflow-hidden h-[280px] mb-4
                 cursor-pointer block group"
    >
      {post.featured_image ? (
        <Image
          src={post.featured_image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 860px"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      )}
      <div
        className="absolute inset-0
                   bg-gradient-to-t from-black/90 via-black/10 to-transparent"
      />
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div
          className="font-label text-[10px] tracking-[1.5px] uppercase
                     text-aceh-gold mb-1.5 font-bold"
        >
          {post.category?.name ?? 'Berita'}
        </div>
        <h3
          className="font-head text-[20px] font-black text-white leading-[1.3]
                     mb-2 group-hover:text-aceh-gold/90 transition-colors"
        >
          {post.title}
        </h3>
        <div className="text-[11.5px] text-white/65">
          {post.author} · {formatDate(post.created_at)}
        </div>
      </div>
    </Link>
  )
}
