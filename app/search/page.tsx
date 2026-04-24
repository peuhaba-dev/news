import type { Metadata } from 'next'
import Link from 'next/link'
import NewsCard from '@/components/NewsCard'
import AdSlot from '@/components/AdSlot'

export const metadata: Metadata = {
  title: 'Cari Berita',
  description: 'Cari berita terkini dari seluruh wilayah Aceh di Berita Meureno.',
  robots: { index: false, follow: false },
}

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

async function searchPosts(query: string) {
  if (!query || query.trim().length < 2) return []
  const data = await fetch(`${API}/api/berita/posts?limit=50`, { cache: 'no-store' }).then(r => r.json())
  const posts = data.posts ?? []
  const q = query.toLowerCase()
  return posts.filter((p: any) =>
    p.title?.toLowerCase().includes(q) ||
    p.excerpt?.toLowerCase().includes(q)
  )
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams
  const query   = q.trim()
  const results = await searchPosts(query)

  return (
    <div className="max-w-portal mx-auto px-5 mt-8 mb-16">
      <div className="bg-aceh-green rounded-xl px-8 py-10 mb-8 text-center">
        <h1 className="font-head text-[28px] font-black text-white mb-4">Cari Berita Aceh</h1>
        <form method="GET" action="/search" className="flex gap-2 max-w-xl mx-auto">
          <input type="search" name="q" defaultValue={query} placeholder="Ketik kata kunci..." autoFocus
            className="flex-1 px-4 py-3 rounded-lg text-[15px] text-ink outline-none focus:ring-2 focus:ring-aceh-gold" />
          <button type="submit"
            className="bg-aceh-gold text-ink font-label font-bold tracking-[0.5px] px-6 py-3 rounded-lg hover:brightness-95 transition-all">
            Cari
          </button>
        </form>
      </div>
      <AdSlot slot="top" className="mb-8" />
      {query && (
        <p className="text-[13px] text-ink-soft mb-5">
          {results.length > 0
            ? <><strong className="text-ink">{results.length} artikel</strong> ditemukan untuk "<strong className="text-aceh-green">{query}</strong>"</>
            : <>Tidak ada hasil untuk "<strong className="text-aceh-green">{query}</strong>"</>}
        </p>
      )}
      {results.length > 0 && (
        <div className="max-w-3xl">
          {results.map((post: any, i: number) => <NewsCard key={post.id} post={post} index={i} />)}
        </div>
      )}
      {query && results.length === 0 && (
        <div className="text-center py-16 text-ink-soft max-w-md mx-auto">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-head text-[20px] font-bold text-ink mb-2">Berita tidak ditemukan</p>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {['Aceh Terkini', 'Ekonomi', 'Religi', 'Wisata'].map((cat) => (
              <Link key={cat} href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-aceh-green-light border border-aceh-green/20 text-aceh-green-dark font-label text-[12px] px-3 py-1.5 rounded-full hover:bg-aceh-green hover:text-white transition-colors">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
      {!query && (
        <div className="text-center py-8 text-ink-soft">
          <div className="text-5xl mb-4">📰</div>
          <p className="font-head text-[20px] font-bold text-ink mb-2">Temukan Berita Aceh</p>
          <p className="text-[14px]">Masukkan kata kunci untuk mencari berita.</p>
        </div>
      )}
    </div>
  )
}
