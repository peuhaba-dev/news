import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types'
import { formatDate } from '@/lib/utils'

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
    <section className="py-3 sm:py-4">
      {/*
        Mobile  : single column, stacked vertically
        Desktop : 2-col grid (2fr | 1fr), right col splits into 2 rows
      */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] md:grid-rows-2 gap-2.5 md:gap-3 md:h-[520px]">

        {/* ── Main hero — spans 2 rows on desktop ── */}
        <Link
          href={`/news/${mainPost.slug}`}
          className="relative rounded-xl overflow-hidden cursor-pointer block
                     h-[220px] xs:h-[260px] sm:h-[300px] md:h-auto md:row-span-2"
        >
          {mainPost.featured_image ? (
            <Image src={mainPost.featured_image} alt={mainPost.title}
              fill priority className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw" />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_FALLBACKS[0]}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 z-10">
            <span className="inline-block bg-aceh-green text-white font-label text-[10px] sm:text-[11px] tracking-[1.5px] px-2.5 py-1 rounded-[3px] mb-2 uppercase">
              {mainPost.category?.name ?? 'Aceh Terkini'}
            </span>
            <h2 className="font-head text-[17px] sm:text-[22px] md:text-[26px] font-black text-white leading-[1.25] line-clamp-3">
              {mainPost.title}
            </h2>
            <p className="text-[11px] sm:text-[12px] text-white/70 mt-1.5">
              {mainPost.author} · {formatDate(mainPost.created_at)}
            </p>
          </div>
        </Link>

        {/* ── Thumb 1 ── */}
        {thumb1 && (
          <Link href={`/news/${thumb1.slug}`}
            className="relative rounded-xl overflow-hidden cursor-pointer block
                       h-[140px] xs:h-[160px] sm:h-[180px] md:h-auto">
            {thumb1.featured_image ? (
              <Image src={thumb1.featured_image} alt={thumb1.title}
                fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_FALLBACKS[1]}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
              <span className="inline-block bg-aceh-green text-white font-label text-[10px] tracking-[1px] px-2 py-0.5 rounded-[3px] mb-1 uppercase">
                {thumb1.category?.name ?? 'Berita'}
              </span>
              <h3 className="font-head text-[13px] sm:text-[14px] font-bold text-white leading-[1.3] line-clamp-2">
                {thumb1.title}
              </h3>
            </div>
          </Link>
        )}

        {/* ── Thumb 2 ── */}
        {thumb2 && (
          <Link href={`/news/${thumb2.slug}`}
            className="relative rounded-xl overflow-hidden cursor-pointer block
                       h-[140px] xs:h-[160px] sm:h-[180px] md:h-auto">
            {thumb2.featured_image ? (
              <Image src={thumb2.featured_image} alt={thumb2.title}
                fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_FALLBACKS[2]}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
              <span className="inline-block bg-aceh-green text-white font-label text-[10px] tracking-[1px] px-2 py-0.5 rounded-[3px] mb-1 uppercase">
                {thumb2.category?.name ?? 'Berita'}
              </span>
              <h3 className="font-head text-[13px] sm:text-[14px] font-bold text-white leading-[1.3] line-clamp-2">
                {thumb2.title}
              </h3>
            </div>
          </Link>
        )}
      </div>
    </section>
  )
}
