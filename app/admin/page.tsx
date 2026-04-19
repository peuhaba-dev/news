import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'

async function getStats() {
  const supabase = await createServerSupabaseClient()

  const [posts, categories, comments] = await Promise.all([
    supabase.from('posts').select('id', { count: 'exact', head: true }),
    supabase.from('categories').select('id', { count: 'exact', head: true }),
    supabase.from('comments').select('id', { count: 'exact', head: true }).eq('approved', false),
  ])

  return {
    posts: posts.count ?? 0,
    categories: categories.count ?? 0,
    pendingComments: comments.count ?? 0,
  }
}

async function getRecentPosts() {
  const supabase = await createServerSupabaseClient()

  const { data } = await supabase
    .from('posts')
    .select('id, title, slug, created_at, views, published')
    .order('created_at', { ascending: false })
    .limit(5)

  return data ?? []
}

export default async function AdminDashboard() {
  const [stats, posts] = await Promise.all([
    getStats(),
    getRecentPosts(),
  ])

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Ringkasan aktivitas CMS kamu
        </p>
      </div>

      {/* QUICK ACTION */}
      <div className="flex gap-3 flex-wrap">
        <Link
          href="/admin/posts/new"
          className="bg-aceh-green text-white px-4 py-2 rounded text-sm font-semibold"
        >
          + Tulis Artikel
        </Link>

        <Link
          href="/admin/posts"
          className="border px-4 py-2 rounded text-sm"
        >
          Kelola Artikel
        </Link>

        <Link
          href="/admin/comments"
          className="border px-4 py-2 rounded text-sm"
        >
          Moderasi Komentar
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded border">
          <p className="text-xs text-gray-500">Total Artikel</p>
          <p className="text-xl font-bold">{stats.posts}</p>
        </div>

        <div className="bg-white p-4 rounded border">
          <p className="text-xs text-gray-500">Kategori</p>
          <p className="text-xl font-bold">{stats.categories}</p>
        </div>

        <div className="bg-white p-4 rounded border">
          <p className="text-xs text-gray-500">Komentar Pending</p>
          <p className="text-xl font-bold text-red-500">
            {stats.pendingComments}
          </p>
        </div>
      </div>

      {/* RECENT POSTS */}
      <div className="bg-white rounded border">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-sm font-semibold">Artikel Terbaru</h2>
          <Link href="/admin/posts" className="text-xs text-aceh-green">
            Lihat semua →
          </Link>
        </div>

        <div className="divide-y">
          {posts.map((post: any) => (
            <div
              key={post.id}
              className="flex items-center justify-between px-4 py-3 text-sm"
            >
              <div>
                <p className="font-medium text-gray-800 line-clamp-1">
                  {post.title}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(post.created_at).toLocaleDateString('id-ID')}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">
                  👁 {post.views}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    post.published
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {post.published ? 'Publish' : 'Draft'}
                </span>

                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-xs text-blue-500"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}