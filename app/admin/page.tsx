import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'

async function getStats() {
  const supabase = await createServerSupabaseClient()
  const [posts, categories, comments, breaking] = await Promise.all([
    supabase.from('berita.posts').select('id', { count: 'exact', head: true }),
    supabase.from('berita.categories').select('id', { count: 'exact', head: true }),
    supabase.from('berita.comments').select('id', { count: 'exact', head: true }).eq('approved', false),
    supabase.from('berita.breaking_news').select('id', { count: 'exact', head: true }).eq('active', true),
  ])
  return {
    posts:      posts.count ?? 0,
    categories: categories.count ?? 0,
    pendingComments: comments.count ?? 0,
    activeBreaking:  breaking.count ?? 0,
  }
}

async function getRecentPosts() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('berita.posts')
    .select('id, title, slug, author, created_at, views, published')
    .order('created_at', { ascending: false })
    .limit(8)
  return data ?? []
}

export default async function AdminDashboard() {
  const [stats, recentPosts] = await Promise.all([getStats(), getRecentPosts()])

  const STAT_CARDS = [
    { label: 'Total Artikel',       value: stats.posts,           color: 'bg-aceh-green',  icon: '📰', href: '/admin/posts' },
    { label: 'Kategori',            value: stats.categories,      color: 'bg-[#1e3a5f]',   icon: '🏷', href: '/admin/categories' },
    { label: 'Komentar Pending',    value: stats.pendingComments, color: 'bg-aceh-red',     icon: '💬', href: '/admin/comments' },
    { label: 'Breaking News Aktif', value: stats.activeBreaking,  color: 'bg-aceh-gold',    icon: '📢', href: '/admin/breaking' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-head text-[28px] font-bold text-ink">Dashboard</h1>
          <p className="text-ink-soft text-[14px] mt-0.5">Selamat datang di panel admin Berita Meureno</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-aceh-green text-white font-label text-[13px] font-semibold
                     tracking-[0.5px] px-5 py-2.5 rounded hover:bg-aceh-green-dark transition-colors"
        >
          + Tulis Artikel
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STAT_CARDS.map(({ label, value, color, icon, href }) => (
          <Link
            key={label}
            href={href}
            className={`${color} rounded-xl p-5 text-white hover:brightness-110 transition-all`}
          >
            <div className="text-3xl mb-2">{icon}</div>
            <div className="font-label text-[32px] font-bold leading-none">{value}</div>
            <div className="text-[12px] text-white/75 mt-1 uppercase tracking-wider">{label}</div>
          </Link>
        ))}
      </div>

      {/* Recent posts table */}
      <div className="bg-white rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-label text-[16px] font-bold text-ink tracking-[0.5px]">
            Artikel Terbaru
          </h2>
          <Link href="/admin/posts" className="text-[12px] text-aceh-green hover:underline font-semibold">
            Lihat semua →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-ink-soft font-semibold text-left border-b border-border">
                <th className="px-6 py-3">Judul</th>
                <th className="px-4 py-3">Penulis</th>
                <th className="px-4 py-3">Tayangan</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentPosts.map((post: any) => (
                <tr key={post.id} className="hover:bg-surface transition-colors">
                  <td className="px-6 py-3.5">
                    <p className="font-head font-bold text-ink line-clamp-1 max-w-xs">
                      {post.title}
                    </p>
                  </td>
                  <td className="px-4 py-3.5 text-ink-soft whitespace-nowrap">{post.author}</td>
                  <td className="px-4 py-3.5 text-ink-soft whitespace-nowrap">
                    {post.views.toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-block text-[11px] font-label font-bold tracking-[0.5px]
                                  px-2 py-0.5 rounded-full
                                  ${post.published
                                    ? 'bg-aceh-green-light text-aceh-green-dark'
                                    : 'bg-gray-100 text-ink-soft'}`}
                    >
                      {post.published ? 'Tayang' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/news/${post.slug}`}
                        target="_blank"
                        className="text-aceh-green hover:underline text-[12px]"
                      >
                        Lihat
                      </Link>
                      <span className="text-border">|</span>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-ink-mid hover:underline text-[12px]"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
