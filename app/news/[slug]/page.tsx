import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  getPostBySlug,
  getMostReadPosts,
  getAllPostSlugs,
  getRelatedPosts,
} from '@/lib/queries'
import Sidebar from '@/components/Sidebar'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import PromoAd from '@/components/PromoAd'
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

/* ─── Share URL builder ─────────────────────────────── */
function shareUrls(title: string, slug: string) {
  const url = `https://berita.meureno.com/news/${encodeURIComponent(slug)}`
  const text = encodeURIComponent(title)
  return {
    whatsapp: `https://wa.me/?text=${text}%20${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${text}`,
    twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
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

  // Fetch related articles (safe — server-side only, placed AFTER content)
  const related = await getRelatedPosts(post.category_id, post.id, 3)

  const authorSlug = post.author.toLowerCase().replace(/\s+/g, '-')
  const share = shareUrls(post.title, post.slug)

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

  /* Breadcrumb items */
  const breadcrumbItems = [
    { name: 'Beranda', href: '/' },
    ...(post.category
      ? [{ name: post.category.name, href: `/category/${post.category.slug}` }]
      : []),
    { name: post.title, href: `/news/${post.slug}` },
  ]

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="max-w-portal mx-auto px-4 sm:px-5 mt-4 sm:mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 lg:gap-8">

          {/* ── Main Article Column ── */}
          <article>

            {/* ── Breadcrumb ── */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[12px] text-ink-soft mb-4 flex-wrap"
            >
              <Link href="/" className="hover:text-aceh-green transition-colors">
                🏠 Beranda
              </Link>
              <span className="text-border">›</span>
              {post.category && (
                <>
                  <Link
                    href={`/category/${post.category.slug}`}
                    className="hover:text-aceh-green transition-colors"
                  >
                    {post.category.name}
                  </Link>
                  <span className="text-border">›</span>
                </>
              )}
              <span className="text-ink line-clamp-1 max-w-[200px] sm:max-w-xs">
                {post.title}
              </span>
            </nav>

            {/* ── Category badge ── */}
            {post.category && (
              <Link href={`/category/${post.category.slug}`}>
                <span
                  className="inline-block bg-aceh-green text-white font-label text-[11px]
                             tracking-[1.5px] px-3 py-1 rounded-[3px] mb-3 uppercase
                             hover:bg-aceh-green-dark transition-colors"
                >
                  {post.category.name}
                </span>
              </Link>
            )}

            {/* ── Title ── */}
            <h1 className="font-head text-[26px] sm:text-[32px] md:text-[36px] font-black text-ink leading-[1.2] mb-4">
              {post.title}
            </h1>

            {/* ── Excerpt / lead ── */}
            {post.excerpt && (
              <p className="text-[16px] text-ink-mid leading-[1.7] mb-5 font-body border-l-4 border-aceh-green pl-4 italic">
                {post.excerpt}
              </p>
            )}

            {/* ── Meta row ── */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12.5px] text-ink-soft mb-5 pb-5 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-aceh-green to-aceh-green-dark
                               flex items-center justify-center text-white font-label font-bold text-[13px] shrink-0">
                  {post.author.charAt(0)}
                </div>
                <Link
                  href={`/author/${authorSlug}`}
                  className="font-semibold text-ink-mid hover:text-aceh-green transition-colors"
                >
                  {post.author}
                </Link>
              </div>
              <span className="text-border">·</span>
              <span>{formatDateTime(post.created_at)}</span>
              <span className="text-border">·</span>
              <span>{post.views.toLocaleString('id-ID')} dibaca</span>
              <span className="text-border">·</span>
              <span>⏱ {readTime(post.content)}</span>
            </div>

            {/* ── Share buttons (top) ── */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-[12px] text-ink-soft font-semibold shrink-0">Bagikan:</span>
              <a
                href={share.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn bg-[#25D366]"
              >
                <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a
                href={share.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn bg-[#1877F2]"
              >
                <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
              <a
                href={share.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn bg-[#2CA5E0]"
              >
                <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Telegram
              </a>
              <a
                href={share.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn bg-[#111]"
              >
                <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.763l7.74-8.851L2.146 2.25h6.858l4.025 5.32 5.215-5.32Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X
              </a>
            </div>

            {/* ── Featured image ── */}
            {post.featured_image && (
              <figure className="mb-8 rounded-xl overflow-hidden shadow-md">
                <div className="relative h-[220px] sm:h-[360px] md:h-[420px] w-full">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 860px"
                  />
                </div>
                <figcaption className="text-[12px] text-ink-soft text-center py-2 px-4 italic bg-surface">
                  {post.title}
                </figcaption>
              </figure>
            )}

            {/* ── Article body — clean, no injection ── */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* ── Share buttons (bottom) ── */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-[13px] text-ink-soft font-semibold mb-3">Bagikan artikel ini:</p>
              <div className="flex flex-wrap gap-2">
                <a href={share.whatsapp} target="_blank" rel="noopener noreferrer" className="share-btn bg-[#25D366]">
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a href={share.facebook} target="_blank" rel="noopener noreferrer" className="share-btn bg-[#1877F2]">
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
                <a href={share.telegram} target="_blank" rel="noopener noreferrer" className="share-btn bg-[#2CA5E0]">
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  Telegram
                </a>
              </div>
            </div>

            {/* ── Tags ── */}
            <div className="mt-6 flex flex-wrap gap-1.5 items-center">
              <span className="text-[12px] text-ink-soft font-semibold mr-1">Tag:</span>
              {[post.category?.name, 'Aceh', 'Berita Terkini'].filter(Boolean).map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${tag!.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-surface border border-border text-ink-soft text-[11.5px]
                             px-2.5 py-0.5 rounded-full hover:bg-aceh-green-light hover:text-aceh-green
                             hover:border-aceh-green/30 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* ── Author card ── */}
            <Link
              href={`/author/${authorSlug}`}
              className="mt-8 bg-surface rounded-xl p-5 flex items-start gap-4 border border-border
                         hover:border-aceh-green/40 hover:shadow-md transition-all duration-200 block"
            >
              <div
                className="w-14 h-14 rounded-full bg-gradient-to-br from-aceh-green to-aceh-green-dark
                           flex items-center justify-center font-label text-[22px] text-white font-bold shrink-0"
              >
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-label text-[14px] font-bold text-ink">Ditulis oleh</div>
                <div className="font-head text-[18px] font-black text-aceh-green mb-0.5">{post.author}</div>
                <div className="text-[12px] text-ink-soft">Jurnalis — Berita Meureno</div>
                <p className="text-[13px] text-ink-soft mt-1.5 leading-relaxed">
                  Jurnalis berpengalaman yang meliput berita dari seluruh wilayah Aceh dan Nusantara.
                </p>
              </div>
            </Link>

            {/* ── Inline ad before related articles ── */}
            <PromoAd variant="inline" className="mt-10" />

            {/* ── Related Articles — placed AFTER content, no injection —— */}
            {related.length > 0 && (
              <div className="mt-10">
                <div className="sec-head-border flex items-center justify-between mb-6 pb-2.5">
                  <h2 className="font-label text-[16px] font-bold tracking-[0.8px] text-ink uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-aceh-green inline-block" />
                    Berita Terkait
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((relPost: any) => (
                    <Link
                      key={relPost.id}
                      href={`/news/${relPost.slug}`}
                      className="related-card card-lift group block"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-[150px] w-full overflow-hidden">
                        {relPost.featured_image ? (
                          <Image
                            src={relPost.featured_image}
                            alt={relPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0a4d2b] to-[#1a8a52]" />
                        )}
                      </div>
                      <div className="p-3.5">
                        {relPost.category && (
                          <span className="inline-block bg-aceh-green text-white font-label text-[9.5px]
                                           tracking-[1px] px-2 py-0.5 rounded-[3px] mb-2 uppercase">
                            {relPost.category.name}
                          </span>
                        )}
                        <h3 className="font-head text-[14px] font-bold text-ink leading-[1.35]
                                       line-clamp-2 group-hover:text-aceh-green transition-colors">
                          {relPost.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── Sidebar (hidden on mobile) ── */}
          <div className="hidden lg:block">
            <Sidebar mostReadPosts={mostRead} />
          </div>
        </div>
      </div>
    </>
  )
}
