import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  getPostBySlug,
  getRelatedPosts,
  getMostReadPosts,
  getAllPostSlugs,
} from '@/lib/queries'
import Sidebar from '@/components/Sidebar'
import NewsCard from '@/components/NewsCard'
import AdSlot from '@/components/AdSlot'
import SectionHeader from '@/components/SectionHeader'
import CommentForm from '@/components/CommentForm'
import { formatDateTime, readTime } from '@/lib/utils'

/* ─── Static params for ISR ────────────────────────── */
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

/* ─── Dynamic metadata ─────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Berita Tidak Ditemukan' }
  }

  const ogImage = post.featured_image ?? '/og-default.jpg'

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      publishedTime: post.created_at,
      authors: [post.author],
      section: post.category?.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: `/news/${post.slug}`,
    },
  }
}

/* ─── Page component ────────────────────────────────── */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, mostRead] = await Promise.all([
    getPostBySlug(slug),
    getMostReadPosts(5),
  ])

  if (!post) notFound()

  const related = await getRelatedPosts(post.category_id, post.id, 4)

  /* JSON-LD structured data */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image ?? undefined,
    datePublished: post.created_at,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Berita Meureno',
      logo: { '@type': 'ImageObject', url: 'https://berita.meureno.com/logo.png' },
    },
    mainEntityOfPage: `https://berita.meureno.com/news/${post.slug}`,
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-portal mx-auto px-4 sm:px-5 mt-5 sm:mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 lg:gap-7">
          {/* ── Article ── */}
          <article>
            {/* Breadcrumb */}
            <nav className="text-[12px] text-ink-soft mb-4 flex items-center gap-1.5">
              <Link href="/" className="hover:text-aceh-green">Beranda</Link>
              <span>›</span>
              {post.category && (
                <>
                  <Link href={`/category/${post.category.slug}`} className="hover:text-aceh-green">
                    {post.category.name}
                  </Link>
                  <span>›</span>
                </>
              )}
              <span className="text-ink line-clamp-1">{post.title}</span>
            </nav>

            {/* Category badge */}
            {post.category && (
              <Link href={`/category/${post.category.slug}`}>
                <span
                  className="inline-block bg-aceh-green text-white font-label text-[11px]
                             tracking-[1.5px] px-2.5 py-1 rounded-[3px] mb-3 uppercase
                             hover:bg-aceh-green-dark transition-colors"
                >
                  {post.category.name}
                </span>
              </Link>
            )}

            {/* Title */}
            <h1 className="font-head text-[24px] sm:text-[30px] md:text-[38px] font-black text-ink
                           leading-[1.2] mb-4">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2.5 text-[12.5px] text-ink-soft mb-5 pb-5 border-b border-border">
              <span className="font-semibold text-ink-mid">{post.author}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{formatDateTime(post.created_at)}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{post.views.toLocaleString('id-ID')} dibaca</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{readTime(post.content)}</span>
            </div>

            {/* Share row */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-[12px] text-ink-soft font-semibold">Bagikan:</span>
              {[
                { label: 'Facebook', color: 'bg-[#1877F2]' },
                { label: 'Twitter/X', color: 'bg-[#000]' },
                { label: 'WhatsApp', color: 'bg-[#25D366]' },
                { label: 'Telegram', color: 'bg-[#2CA5E0]' },
              ].map(({ label, color }) => (
                <button
                  key={label}
                  className={`${color} text-white text-[11px] font-label px-3 py-1.5
                              rounded font-semibold tracking-[0.5px] active:opacity-75
                              hover:opacity-85 transition-opacity min-h-[36px]`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Featured image */}
            {post.featured_image && (
              <figure className="mb-6 rounded-xl overflow-hidden">
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 860px"
                  />
                </div>
                <figcaption className="text-[12px] text-ink-soft text-center mt-2 italic px-2">
                  {post.title}
                </figcaption>
              </figure>
            )}

            {/* Inline ad above content */}
            <AdSlot slot="inline" className="mb-6" />

            {/* Article body */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-1.5">
              <span className="text-[12px] text-ink-soft font-semibold mr-1">Tag:</span>
              {[post.category?.name, 'Aceh', 'Berita Terkini'].filter(Boolean).map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${tag!.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-surface border border-border text-ink-soft text-[11.5px]
                             px-2.5 py-0.5 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Author card */}
            <div className="mt-6 bg-surface rounded-lg p-4 flex items-start gap-3 border border-border">
              <div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-aceh-green to-aceh-green-dark
                           flex items-center justify-center font-label text-[18px] text-white font-bold shrink-0"
              >
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-label text-[14px] font-bold text-ink">{post.author}</div>
                <div className="text-[11px] text-ink-soft mb-1">Berita Meureno</div>
                <p className="text-[12.5px] text-ink-soft">
                  Admin Penulis Meureno Platform.
                </p>
              </div>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div className="mt-8">
                <SectionHeader title="Berita Terkait" />
                {related.map((p: any, i: number) => (
                  <NewsCard key={p.id} post={p} index={i} />
                ))}
              </div>
            )}

            {/* Comment form */}
            <CommentForm postId={post.id} />
          </article>

          {/* ── Sidebar ── */}
          <Sidebar mostReadPosts={mostRead} />
        </div>
      </div>
    </>
  )
}
