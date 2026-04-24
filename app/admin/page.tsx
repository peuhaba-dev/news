import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

async function getStats() {
  const [posts, categories] = await Promise.all([
    fetch(`${API}/api/berita/posts?limit=1`, { cache: 'no-store' }).then(r => r.json()),
    fetch(`${API}/api/berita/categories`, { cache: 'no-store' }).then(r => r.json()),
  ])
  return {
    posts: posts.total ?? 0,
    categories: Array.isArray(categories) ? categories.length : 0,
    pendingComments: 0,
  }
}

async function getRecentPosts() {
  const data = await fetch(`${API}/api/berita/posts?limit=5`, { cache: 'no-store' }).then(r => r.json())
  return data.posts ?? []
}

export default async function AdminDashboard() {
  const [stats, posts] = await Promise.all([getStats(), getRecentPosts()])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-500">Ringkasan aktivitas CMS</p>
        </div>
        <Link href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 bg-aceh-green text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-aceh-green-dark transition-all shadow-sm">
          + Tulis Artikel
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { href: '/admin/posts', label: '📰 Kelola Artikel' },
          { href: '/admin/comments', label: '💬 Moderasi' },
          { href: '/admin/categories', label: '🏷 Kategori' },
        ].map(({ href, label }) => (
          <Link key={href} href={href} className="bg-white border rounded-lg p-3 text-sm hover:border-aceh-green hover:shadow-sm transition-all">{label}</Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-4"><p className="text-xs text-gray-500">Total Artikel</p><p className="text-2xl font-bold mt-1">{stats.posts}</p></div>
        <div className="bg-white border rounded-xl p-4"><p className="text-xs text-gray-500">Kategori</p><p className="text-2xl font-bold mt-1">{stats.categories}</p></div>
        <div className="bg-white border rounded-xl p-4"><p className="text-xs text-gray-500">Komentar Pending</p><p className="text-2xl font-bold mt-1 text-red-500">{stats.pendingComments}</p></div>
      </div>
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-sm font-semibold text-gray-700">Artikel Terbaru</h2>
          <Link href="/admin/posts" className="text-xs text-aceh-green hover:underline">Lihat semua →</Link>
        </div>
        <div className="divide-y">
          {posts.map((post: any) => (
            <div key={post.id} className="p-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50 transition">
              <div className="min-w-0">
                <p className="font-medium text-gray-800 line-clamp-1">{post.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{new Date(post.createdAt).toLocaleDateString('id-ID')}</p>
              </div>
              <div className="flex items-center flex-wrap gap-2 text-xs">
                <span className="text-gray-400">👁 {post.views}</span>
                <span className={`px-2 py-0.5 rounded-full font-medium ${post.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  {post.published ? 'Publish' : 'Draft'}
                </span>
                <Link href={`/admin/posts/${post.id}/edit`} className="text-blue-500 hover:underline">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
