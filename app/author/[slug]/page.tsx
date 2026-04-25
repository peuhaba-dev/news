import type { Metadata } from 'next'
import Link from 'next/link'
import { getAuthorBySlug, getPostsByAuthor } from '@/lib/queries'
import NewsCard from '@/components/NewsCard'
import SectionHeader from '@/components/SectionHeader'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Penulis Tidak Ditemukan' }
  }

  return {
    title: `${author.name} — Jurnalis`,
    description: author.bio || `Artikel-artikel oleh ${author.name} di Meureno News.`,
    alternates: { canonical: `/author/${slug}` },
  }
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [author, posts] = await Promise.all([
    getAuthorBySlug(slug),
    getPostsByAuthor(slug),
  ])

  const authorName = author?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
  const authorBio = author?.bio || 'Jurnalis berpengalaman yang meliput berita dari seluruh wilayah Aceh.'
  const authorAvatar = author?.avatarUrl || author?.avatar_url || null

  return (
    <div className="max-w-portal mx-auto px-5 py-8">
      {/* Breadcrumb */}
      <nav className="text-[12px] text-ink-soft mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-aceh-green">Beranda</Link>
        <span>›</span>
        <span className="text-ink">Penulis</span>
        <span>›</span>
        <span className="text-ink">{authorName}</span>
      </nav>

      {/* Author card */}
      <div className="bg-gradient-to-br from-aceh-green to-aceh-green-dark rounded-xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {authorAvatar ? (
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-20 h-20 rounded-full border-3 border-white/30 object-cover shrink-0"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center font-label text-[32px] text-white font-bold shrink-0">
            {authorName.charAt(0)}
          </div>
        )}
        <div className="text-center sm:text-left">
          <h1 className="font-head text-[26px] sm:text-[32px] font-black text-white leading-tight">
            {authorName}
          </h1>
          <p className="font-label text-[12px] tracking-[1.5px] uppercase text-white/60 font-bold mt-1">
            Jurnalis — Meureno News
          </p>
          <p className="text-[14px] text-white/80 mt-3 max-w-xl leading-relaxed">
            {authorBio}
          </p>
          <div className="mt-3 text-[12px] text-white/50">
            {posts.length} artikel dipublikasikan
          </div>
        </div>
      </div>

      {/* Articles by author */}
      <SectionHeader title={`Artikel oleh ${authorName}`} />

      {posts.length === 0 ? (
        <div className="text-center py-16 text-ink-soft">
          <p className="text-[15px]">Belum ada artikel dari penulis ini.</p>
        </div>
      ) : (
        <div>
          {posts.map((post: any, i: number) => (
            <NewsCard key={post.id} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
