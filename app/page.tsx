import Link from 'next/link'
import Image from 'next/image'
import { getLatestPosts, getFeaturedPosts, getMostReadPosts } from '@/lib/queries'
import Hero from '@/components/Hero'
import NewsCard from '@/components/NewsCard'
import BigCard from '@/components/BigCard'
import Sidebar from '@/components/Sidebar'
import AdSlot from '@/components/AdSlot'
import SectionHeader from '@/components/SectionHeader'
import { formatDate } from '@/lib/utils'

// Seed data shown when DB is empty (development / demo)
const SEED_POSTS = Array.from({ length: 8 }, (_, i) => ({
  id: `seed-${i}`,
  title: [
    'Gubernur Aceh Luncurkan Program "Gampong Digital" untuk 6.497 Desa di Seluruh Aceh',
    'Harga Kopi Gayo Tembus Rp 120.000/Kg di Pasar Eropa, Petani Rayakan',
    'Unsyiah Raih Akreditasi A untuk 3 Prodi Baru, Rektor Ucapkan Terima Kasih',
    'DPRK Banda Aceh Setujui APBK Perubahan 2026 Senilai Rp 1,2 Triliun',
    'Tim SAR Berhasil Evakuasi Korban Banjir di Aceh Selatan, 47 Warga Mengungsi',
    'Masjid Raya Baiturrahman Tambah Kapasitas Jadi 80.000 Jamaah',
    'Festival Saman Internasional 2026 Diikuti 40 Tim dari 15 Negara',
    'Pesantren Terpadu di Lhokseumawe Luluskan 500 Hafiz Tahun Ini',
  ][i],
  slug: `berita-${i + 1}`,
  content: 'Konten berita tersedia setelah koneksi database aktif.',
  excerpt: 'Liputan terbaru dari seluruh wilayah Aceh. Berita ini akan diperbarui secara real-time melalui database Supabase.',
  featured_image: null,
  category_id: 'cat-1',
  category: { id: 'cat-1', name: ['Aceh Terkini','Ekonomi','Pendidikan','Politik','Sosial','Religi','Budaya','Hukum'][i], slug: 'aceh-terkini', created_at: '' },
  author: ['Ahmad Fauzan','Siti Rahma','Rizki Maulana','Nurul Hidayah','Teuku Arif','Fauziah','Zulkifli','Marlina'][i],
  created_at: new Date(Date.now() - i * 3_600_000).toISOString(),
  views: Math.floor(Math.random() * 2000) + 200,
}))

const WISATA = [
  { name: 'Pantai Lampuuk', loc: 'Aceh Besar', gradient: 'from-[#0d4f3c] to-[#1a8f6e]' },
  { name: 'Danau Laut Tawar', loc: 'Aceh Tengah', gradient: 'from-[#2a4a1a] to-[#4a8a2a]' },
  { name: 'Sabang / Pulau Weh', loc: 'Kota Sabang', gradient: 'from-[#1a3a4f] to-[#2a6a8f]' },
]

export default async function HomePage() {
  const [latestRaw, featuredRaw, mostRead] = await Promise.all([
    getLatestPosts(10),
    getFeaturedPosts(3),
    getMostReadPosts(5),
  ])

  // Fall back to seed data in development / when DB is empty
  const latest   = latestRaw.length   ? latestRaw   : (SEED_POSTS as any[])
  const featured = featuredRaw.length ? featuredRaw : (SEED_POSTS.slice(0, 3) as any[])
  const popular  = mostRead.length    ? mostRead    : (SEED_POSTS.slice(0, 5) as any[])

  const [heroMain, ...heroThumbs] = featured
  const articleList = latest.slice(3)     // remaining after hero
  const bigCard     = latest[3] ?? latest[0]

  return (
    <div className="overflow-x-hidden">
      {/* ── Top ad banner ── */}
      <div className="max-w-portal mx-auto px-4 sm:px-5 mt-3 sm:mt-4">
        <AdSlot slot="top" />
      </div>

      {/* ── Hero ── */}
      <div className="max-w-portal mx-auto px-4 sm:px-5">
        <Hero mainPost={heroMain} thumbPosts={heroThumbs} />
      </div>

      {/* ── Acehnese pattern strip ── */}
      <div className="aceh-pattern-strip my-2" />

      {/* ── Aceh Terkini Featured Banner ── */}
      <div className="max-w-portal mx-auto px-4 sm:px-5 mb-6">
        <div className="bg-aceh-green rounded-lg overflow-hidden">
          <div className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 border-b border-white/20">
            <div className="font-label text-sm sm:text-[15px] tracking-[1px] text-white font-bold uppercase">
              🏛 Aceh Terkini
            </div>
            <span className="bg-aceh-gold text-ink font-label text-[10px] tracking-[1px] px-2 py-0.5 rounded-[3px] font-bold">
              LIVE UPDATE
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {featured.map((post: any) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="px-4 py-3.5 bg-black/25 hover:bg-black/40 transition-colors cursor-pointer block"
              >
                <div className="font-label text-[10px] tracking-[1px] text-aceh-gold uppercase font-semibold mb-1">
                  {post.category?.name ?? 'Aceh'}
                </div>
                <h3 className="font-head text-sm sm:text-[14px] font-bold text-white leading-[1.35] mb-1.5">
                  {post.title}
                </h3>
                <p className="text-[11px] text-white/60">{formatDate(post.created_at)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content + Sidebar ── */}
      <div className="max-w-portal mx-auto px-4 sm:px-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 lg:gap-7">
        {/* LEFT COLUMN */}
        <div>
          {/* Section: Berita Terbaru */}
          <div className="mt-6 sm:mt-8">
            <SectionHeader title="Berita Terbaru" href="/category/semua" />

            {/* Big feature card */}
            <BigCard post={bigCard} />

            {/* Inline ad */}
            <AdSlot slot="inline" />

            {/* Article list */}
            <div>
              {articleList.map((post: any, i: number) => (
                <NewsCard key={post.id} post={post} index={i} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-border my-6 sm:my-7" />

          {/* Section: Wisata Aceh */}
          <div className="mb-8">
            <SectionHeader title="Wisata Aceh" emoji="🌿" href="/category/wisata" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {WISATA.map(({ name, loc, gradient }) => (
                <Link
                  key={name}
                  href={`/tag/${name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="relative rounded-lg overflow-hidden h-36 sm:h-40 cursor-pointer block group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                    <p className="font-head text-xs sm:text-[13px] font-bold text-white leading-[1.25]
                                  group-hover:text-aceh-gold transition-colors">
                      {name}
                    </p>
                    <p className="text-[10px] sm:text-[10.5px] text-white/75 mt-0.5">{loc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Section: Religi & Budaya */}
          <div>
            <SectionHeader title="Religi & Budaya Aceh" emoji="☪" href="/category/religi" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {latest.slice(4, 8).map((post: any, i: number) => (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="group cursor-pointer block"
                >
                  <div className="h-[120px] sm:h-[140px] rounded-md overflow-hidden relative mb-2">
                    {post.featured_image ? (
                      <Image src={post.featured_image} alt={post.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${
                        ['from-[#1a4a0a] to-[#2e8b2e]','from-[#2a1a3e] to-[#4a3a7e]',
                         'from-[#3a2a0a] to-[#7a5a1a]','from-[#0a2a3a] to-[#1a5a6a]'][i % 4]
                      }`} />
                    )}
                  </div>
                  <p className="font-label text-[10px] tracking-[0.8px] text-aceh-green uppercase font-bold mb-1">
                    {post.category?.name ?? 'Religi'} · Banda Aceh
                  </p>
                  <h4 className="font-head text-[13px] sm:text-[14px] font-bold text-ink leading-[1.3]
                                 group-hover:text-aceh-green transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-ink-soft mt-1">{formatDate(post.created_at)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Sidebar */}
        <Sidebar mostReadPosts={popular} />
      </div>
    </div>
  )
}