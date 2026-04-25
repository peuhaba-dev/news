import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types'
import { formatDate } from '@/lib/utils'

// Gradient fallback colours for posts without featured_image
const GRADIENT_FALLBACKS = [
  'from-[#1a4a2e] to-[#00703C]',
  'from-[#1e3a5f] to-[#2d5986]',
  'from-[#4a1e1e] to-[#8b2020]',
]

interface HeroProps {
  mainPost: Post
  thumbPosts: Post[]
}

export default function Hero({ mainPost, thumbPosts }: HeroProps) {
  const [thumb1, thumb2] = thumbPosts

  return (
    <section className="py-5">
      {/* Mobile: stacked, Desktop: 2col grid */}
      <div
        className="grid gap-3 grid-cols-1 md:grid-cols-[2fr_1fr] md:grid-rows-[340px_180px]"
      >
        {/* ── Main hero ── */}
        <Link
          href={`/news/${mainPost.slug}`}
          className="relative rounded-lg overflow-hidden cursor-pointer
                     h-[280px] md:h-auto md:col-span-1 md:row-span-2"
        >
          {mainPost.featured_image ? (
            <Image
              src={mainPost.featured_image}
              alt={mainPost.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_FALLBACKS[0]}`} />
          )}
          {/* Decorative Acehnese rencong SVG */}
          <svg
            className="absolute top-5 right-5 opacity-[0.08] w-[120px] h-[120px]"
            viewBox="0 0 100 100" fill="white"
          >
            <polygon points="50,5 95,95 50,75 5,95"/>
          </svg>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <span
              className="inline-block bg-aceh-green text-white font-label text-[11px]
                         tracking-[1.5px] px-2.5 py-1 rounded-[3px] mb-2.5 uppercase"
            >
              {mainPost.category?.name ?? '🏛 Aceh Terkini'}
            </span>
            <h1
              className="font-head text-[28px] font-black text-white leading-[1.25]
                         mb-2.5 [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]"
            >
              {mainPost.title}
            </h1>
            <div className="flex items-center gap-3 text-white/80 text-[12.5px]">
              <span>{mainPost.author}</span>
              <span className="opacity-50">·</span>
              <span>{formatDate(mainPost.created_at)}</span>
              <span className="opacity-50">·</span>
              <span>{mainPost.views.toLocaleString('id-ID')} dibaca</span>
            </div>
          </div>
        </Link>

        {/* ── Thumb 1 ── */}
        {thumb1 && (
          <Link
            href={`/news/${thumb1.slug}`}
            className="relative rounded-lg overflow-hidden cursor-pointer
                       h-[180px] md:h-auto"
          >
            {thumb1.featured_image ? (
              <Image
                src={thumb1.featured_image}
                alt={thumb1.title}
                fill
                className="object-cover"
                sizes="33vw"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_FALLBACKS[1]}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10">
              <div className="font-label text-[10px] tracking-[1.2px] text-white/85 uppercase mb-1">
                {thumb1.category?.name ?? 'Berita'}
              </div>
              <h3 className="font-head text-[15px] font-bold text-white leading-[1.3]">
                {thumb1.title}
              </h3>
            </div>
          </Link>
        )}

        {/* ── Thumb 2 ── */}
        {thumb2 && (
          <Link
            href={`/news/${thumb2.slug}`}
            className="relative rounded-lg overflow-hidden cursor-pointer
                       h-[180px] md:h-auto"
          >
            {thumb2.featured_image ? (
              <Image
                src={thumb2.featured_image}
                alt={thumb2.title}
                fill
                className="object-cover"
                sizes="33vw"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_FALLBACKS[2]}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10">
              <div className="font-label text-[10px] tracking-[1.2px] text-white/85 uppercase mb-1">
                {thumb2.category?.name ?? 'Berita'}
              </div>
              <h3 className="font-head text-[15px] font-bold text-white leading-[1.3]">
                {thumb2.title}
              </h3>
            </div>
          </Link>
        )}
      </div>
    </section>
  )
}
