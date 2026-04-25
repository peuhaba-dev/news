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
    <section className="py-4 sm:py-5">
      {/* Mobile: stack vertical | Desktop: 2fr 1fr grid */}
      <div className="flex flex-col md:grid md:gap-3"
        style={{ gridTemplateColumns: '2fr 1fr', gridTemplateRows: '340px 180px' }}>

        {/* ── Main hero ── */}
        <Link
          href={`/news/${mainPost.slug}`}
          className="relative rounded-lg overflow-hidden cursor-pointer
                     h-[220px] sm:h-[280px] md:h-auto md:row-span-2 mb-3 md:mb-0"
        >
          {mainPost.featured_image ? (
            <Image src={mainPost.featured_image} alt={mainPost.title}
              fill priority className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw" />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_FALLBACKS[0]}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
            <span className="inline-block bg-aceh-green text-white font-label text-[11px] tracking-[1.5px] px-2.5 py-1 rounded-[3px] mb-2 uppercase">
              {mainPost.category?.name ?? 'Aceh Terkini'}
            </span>
            <h2 className="font-head text-[18px] sm:text-[22px] md:text-[26px] font-black text-white leading-[1.25] line-clamp-3">
              {mainPost.title}
            </h2>
            <p className="text-[11px] sm:text-[12px] text-white/70 mt-2">
              {mainPost.author} · {formatDate(mainPost.created_at)}
            </p>
          </div>
        </Link>

        {/* ── Thumb 1 ── */}
        {thumb1 && (
          <Link href={`/news/${thumb1.slug}`}
            className="relative rounded-lg overflow-hidden cursor-pointer h-[140px] sm:h-[160px] md:h-auto mb-3 md:mb-0">
            {thumb1.featured_image ? (
              <Image src={thumb1.featured_image} alt={thumb1.title}
                fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_FALLBACKS[1]}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
              <span className="inline-block bg-aceh-green text-white font-label text-[10px] tracking-[1px] px-2 py-0.5 rounded-[3px] mb-1.5 uppercase">
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
            className="relative rounded-lg overflow-hidden cursor-pointer h-[140px] sm:h-[160px] md:h-auto">
            {thumb2.featured_image ? (
              <Image src={thumb2.featured_image} alt={thumb2.title}
                fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_FALLBACKS[2]}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
              <span className="inline-block bg-aceh-green text-white font-label text-[10px] tracking-[1px] px-2 py-0.5 rounded-[3px] mb-1.5 uppercase">
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
