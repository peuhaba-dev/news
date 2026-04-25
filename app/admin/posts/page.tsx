'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/admin/AuthProvider'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

interface Post {
  id: string
  title: string
  slug: string
  author: string
  authorId?: string
  views: number
  published: boolean
  createdAt: string
  category?: { name: string }
}

export default function AdminPostsPage() {
  const { user } = useAuth()
  const [posts, setPosts]     = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => { fetchPosts() }, [])

  async function fetchPosts() {
    setLoading(true)
    const res  = await fetch(`${API}/api/berita/posts?limit=100&published=all`, { cache: 'no-store' })
    const data = await res.json()
    let allPosts = data.posts ?? []

    // WRITER can only see own posts
    if (user?.role === 'WRITER') {
      allPosts = allPosts.filter((p: Post) =>
        p.authorId === user.id || p.author === user.name
      )
    }

    setPosts(allPosts)
    setLoading(false)
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Hapus artikel "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return
    setDeleting(id)
    await fetch(`${API}/api/berita/posts/${id}`, { method: 'DELETE' })
    setDeleting(null)
    fetchPosts()
  }

  async function handleTogglePublish(id: string, published: boolean) {
    await fetch(`${API}/api/berita/posts/${id}/publish`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !published }),
    })
    fetchPosts()
  }

  function canEditPost(post: Post): boolean {
    if (!user) return false
    if (user.role === 'SUPER_ADMIN' || user.role === 'EDITOR') return true
    // WRITER can only edit own posts
    return post.authorId === user.id || post.author === user.name
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Daftar Artikel</h1>
          {user?.role === 'WRITER' && (
            <p className="text-xs text-gray-400 mt-0.5">Menampilkan artikel Anda saja</p>
          )}
        </div>
        <Link href="/admin/posts/new"
          className="bg-emerald-600 text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-500 transition-colors shadow-sm">
          ✏️ Tulis Artikel
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white border rounded-xl p-4 animate-pulse h-16" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-[15px]">Belum ada artikel.</p>
          <Link href="/admin/posts/new" className="mt-4 inline-block bg-emerald-600 text-white text-[13px] px-5 py-2 rounded-lg hover:bg-emerald-500">
            ✏️ Tulis Artikel
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-gray-500 font-semibold text-left border-b bg-gray-50/50">
                  <th className="px-6 py-3">Judul</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Penulis</th>
                  <th className="px-4 py-3">Tayangan</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5">
                      <p className="font-semibold text-gray-800 line-clamp-1 max-w-[260px]">{post.title}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 font-mono">/news/{post.slug}</p>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">{post.category?.name ?? '—'}</td>
                    <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">{post.author}</td>
                    <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">👁 {post.views.toLocaleString('id-ID')}</td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => canEditPost(post) && handleTogglePublish(post.id, post.published)}
                        disabled={!canEditPost(post)}
                        className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                          post.published
                            ? 'bg-emerald-100 text-emerald-600 hover:bg-red-100 hover:text-red-600'
                            : 'bg-gray-100 text-gray-500 hover:bg-emerald-100 hover:text-emerald-600'
                        } ${!canEditPost(post) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                        {post.published ? 'Tayang' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Link href={`/news/${post.slug}`} target="_blank" className="text-emerald-600 hover:underline">Lihat</Link>
                        {canEditPost(post) && (
                          <>
                            <span className="text-gray-200">|</span>
                            <Link href={`/admin/posts/${post.id}/edit`} className="text-blue-500 hover:underline">Edit</Link>
                            <span className="text-gray-200">|</span>
                            <button onClick={() => handleDelete(post.id, post.title)}
                              disabled={deleting === post.id}
                              className="text-red-500 hover:underline disabled:opacity-50">
                              {deleting === post.id ? '...' : 'Hapus'}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
