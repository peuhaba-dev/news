'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth, ROLE_LABELS } from '@/components/admin/AuthProvider'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

interface Post {
  id: string
  title: string
  slug: string
  views: number
  published: boolean
  author: string
  createdAt: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ posts: 0, categories: 0, pendingComments: 0 })
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [postsRes, catsRes] = await Promise.all([
          fetch(`${API}/api/berita/posts?limit=5`, { cache: 'no-store' }),
          fetch(`${API}/api/berita/categories`, { cache: 'no-store' }),
        ])
        const postsData = await postsRes.json()
        const catsData = await catsRes.json()

        setStats({
          posts: postsData.total ?? 0,
          categories: Array.isArray(catsData) ? catsData.length : 0,
          pendingComments: 0,
        })
        setPosts(postsData.posts ?? [])
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Selamat Pagi'
    if (hour < 17) return 'Selamat Siang'
    return 'Selamat Malam'
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {greeting()}, {user?.name?.split(' ')[0] || 'Admin'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            {ROLE_LABELS[user?.role || 'WRITER']} — Dashboard CMS
          </p>
        </div>
        <Link href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-500 transition-all shadow-sm">
          ✏️ Tulis Artikel
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: '/admin/posts', label: 'Kelola Artikel', icon: '📰' },
          { href: '/admin/posts/new', label: 'Tulis Baru', icon: '✏️' },
          { href: '/admin/categories', label: 'Kategori', icon: '🏷' },
          ...(user?.role === 'SUPER_ADMIN' ? [{ href: '/admin/users', label: 'Pengguna', icon: '👥' }] : [{ href: '/admin/comments', label: 'Komentar', icon: '💬' }]),
        ].map(({ href, label, icon }) => (
          <Link key={href} href={href}
            className="bg-white border rounded-xl p-3 text-sm hover:border-emerald-400 hover:shadow-sm transition-all group">
            <span className="text-lg group-hover:scale-110 inline-block transition-transform">{icon}</span>
            <p className="mt-1 text-[13px] font-medium text-gray-700">{label}</p>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-4 hover:shadow-sm transition-shadow">
          <p className="text-xs text-gray-500">Total Artikel</p>
          <p className="text-2xl font-bold mt-1 text-gray-800">
            {loading ? <span className="animate-pulse bg-gray-200 rounded w-12 h-7 inline-block" /> : stats.posts}
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4 hover:shadow-sm transition-shadow">
          <p className="text-xs text-gray-500">Kategori</p>
          <p className="text-2xl font-bold mt-1 text-gray-800">
            {loading ? <span className="animate-pulse bg-gray-200 rounded w-8 h-7 inline-block" /> : stats.categories}
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4 hover:shadow-sm transition-shadow">
          <p className="text-xs text-gray-500">Komentar Pending</p>
          <p className="text-2xl font-bold mt-1 text-red-500">
            {loading ? <span className="animate-pulse bg-gray-200 rounded w-8 h-7 inline-block" /> : stats.pendingComments}
          </p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-sm font-semibold text-gray-700">Artikel Terbaru</h2>
          <Link href="/admin/posts" className="text-xs text-emerald-600 hover:underline">Lihat semua →</Link>
        </div>
        {loading ? (
          <div className="p-4 space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-14 bg-gray-50 rounded-lg animate-pulse" />)}
          </div>
        ) : (
          <div className="divide-y">
            {posts.map((post) => (
              <div key={post.id} className="p-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50/50 transition">
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 line-clamp-1">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {post.author} · {new Date(post.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div className="flex items-center flex-wrap gap-2 text-xs">
                  <span className="text-gray-400">👁 {post.views}</span>
                  <span className={`px-2 py-0.5 rounded-full font-medium ${post.published ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                    {post.published ? 'Tayang' : 'Draft'}
                  </span>
                  <Link href={`/admin/posts/${post.id}/edit`} className="text-blue-500 hover:underline">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
