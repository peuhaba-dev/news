import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getCategoryBySlug,
  getPostsByCategory,
  getMostReadPosts,
  getAllCategorySlugs,
} from '@/lib/queries'
import NewsCard from '@/components/NewsCard'
import BigCard from '@/components/BigCard'
import Sidebar from '@/components/Sidebar'
import AdSlot from '@/components/AdSlot'
import SectionHeader from '@/components/SectionHeader'

export const dynamic = 'force-dynamic'


/* ─── Static params ─────────────────────────────────── */
export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs()
  return slugs.map((slug) => ({ slug }))
}

/* ─── Dynamic metadata ──────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) return { title: 'Kategori Tidak Ditemukan' }

  return {
    title: `${category.name} – Berita Aceh Terkini`,
    description: `Kumpulan berita terbaru kategori ${category.name} dari Berita Meureno, portal berita Aceh terpercaya.`,
    openGraph: {
      title: `${category.name} | Berita Meureno`,
      description: `Berita terkini kategori ${category.name}`,
    },
    alternates: { canonical: `/category/${slug}` },
  }
}

/* ─── Page component ────────────────────────────────── */
const PER_PAGE = 12

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { slug } = await params
  const { page: pageStr = '1' } = await searchParams
  const page = Math.max(1, parseInt(pageStr) || 1)

  const [category, mostRead] = await Promise.all([
    getCategoryBySlug(slug),
    getMostReadPosts(5),
  ])

  if (!category) notFound()

  const allPosts = await getPostsByCategory(slug, 999)
  const totalPages = Math.ceil(allPosts.length / PER_PAGE)
  const posts = allPosts.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const [featuredPost, ...restPosts] = posts

  return (
    <div className="max-w-portal mx-auto px-4 sm:px-5 mt-5 sm:mt-6">
      {/* ── Category header band ── */}
      <div className="bg-aceh-green rounded-lg px-4 sm:px-5 py-3.5 mb-6 flex items-center gap-3">
        <h1 className="font-label text-[20px] sm:text-[24px] font-bold text-white tracking-[1px] uppercase truncate">
          {category.name}
        </h1>
        <span className="bg-white/20 text-white font-label text-[11px] tracking-[1px]
                         px-2.5 py-1 rounded-full shrink-0">
          {allPosts.length} Artikel
        </span>
      </div>

      {/* ── Top ad ── */}
      <AdSlot slot="top" className="mb-6" />

      {/* ── Main 2-col layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 lg:gap-7">
        {/* Left column */}
        <div>
          <SectionHeader
            title={`Berita ${category.name}`}
            href={`/category/${slug}`}
          />

          {/* Featured big card */}
          {featuredPost && (
            <BigCard
              post={featuredPost}
              gradient="from-[#1a4a2e] to-[#00703C]"
            />
          )}

          {/* Inline ad */}
          <AdSlot slot="inline" className="my-6" />

          {/* Rest as list cards */}
          <div>
            {restPosts.map((post, i) => (
              <NewsCard key={post.id} post={post} index={i} />
            ))}
          </div>

          {/* Empty state */}
          {posts.length === 0 && (
            <div className="text-center py-16 text-ink-soft">
              <div className="text-5xl mb-4">📰</div>
              <p className="font-head text-[20px] font-bold text-ink mb-2">
                Belum ada berita
              </p>
              <p className="text-[14px]">
                Kategori <strong>{category.name}</strong> belum memiliki artikel.
                Silakan kembali lagi nanti.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
              {page > 1 && (
                <Link href={`/category/${slug}?page=${page - 1}`}
                  className="px-4 py-2 border border-border rounded-lg text-sm font-semibold text-ink hover:bg-aceh-green hover:text-white hover:border-aceh-green transition-colors">
                  ← Sebelumnya
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <Link key={p} href={`/category/${slug}?page=${p}`}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${p === page ? 'bg-aceh-green text-white' : 'border border-border text-ink hover:bg-aceh-green hover:text-white hover:border-aceh-green'}`}>
                  {p}
                </Link>
              ))}
              {page < totalPages && (
                <Link href={`/category/${slug}?page=${page + 1}`}
                  className="px-4 py-2 border border-border rounded-lg text-sm font-semibold text-ink hover:bg-aceh-green hover:text-white hover:border-aceh-green transition-colors">
                  Selanjutnya →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <Sidebar mostReadPosts={mostRead} />
      </div>
    </div>
  )
}
