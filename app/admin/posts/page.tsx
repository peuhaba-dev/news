'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

interface Post {
  id: string
  title: string
  slug: string
  author: string
  views: number
  published: boolean
  createdAt: string
  category?: { name: string }
}

export default function AdminPostsPage() {
  const [posts, setPosts]     = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => { fetchPosts() }, [])

  async function fetchPosts() {
    setLoading(true)
    const res  = await fetch(`${API}/api/berita/posts?limit=100&published=all`, { cache: 'no-store' })
    const data = await res.json()
    setPosts(data.posts ?? [])
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-head text-[28px] font-bold text-ink">Daftar Artikel</h1>
        <Link href="/admin/posts/new"
          className="bg-aceh-green text-white font-label text-[13px] font-semibold tracking-[0.5px] px-5 py-2.5 rounded hover:bg-aceh-green-dark transition-colors">
          + Tulis Artikel
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white border rounded-xl p-4 animate-pulse h-16" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-ink-soft">
          <p className="text-[15px]">Belum ada artikel.</p>
          <Link href="/admin/posts/new" className="mt-4 inline-block bg-aceh-green text-white font-label text-[13px] px-5 py-2 rounded hover:bg-aceh-green-dark">
            + Tulis Artikel
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-ink-soft font-semibold text-left border-b border-border bg-surface">
                  <th className="px-6 py-3">Judul</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Penulis</th>
                  <th className="px-4 py-3">Tayangan</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface transition-colors">
                    <td className="px-6 py-3.5">
                      <p className="font-head font-bold text-ink line-clamp-1 max-w-[260px]">{post.title}</p>
                      <p className="text-[11px] text-ink-soft mt-0.5 font-mono">/news/{post.slug}</p>
                    </td>
                    <td className="px-4 py-3.5 text-ink-soft whitespace-nowrap">{post.category?.name ?? '—'}</td>
                    <td className="px-4 py-3.5 text-ink-soft whitespace-nowrap">{post.author}</td>
                    <td className="px-4 py-3.5 text-ink-soft whitespace-nowrap">👁 {post.views.toLocaleString('id-ID')}</td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => handleTogglePublish(post.id, post.published)}
                        className={`inline-block text-[11px] font-label font-bold tracking-[0.5px] px-2 py-0.5 rounded-full cursor-pointer transition-colors ${post.published ? 'bg-aceh-green-light text-aceh-green-dark hover:bg-red-100 hover:text-red-600' : 'bg-gray-100 text-ink-soft hover:bg-aceh-green-light hover:text-aceh-green-dark'}`}>
                        {post.published ? 'Tayang' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Link href={`/news/${post.slug}`} target="_blank" className="text-aceh-green hover:underline">Lihat</Link>
                        <span className="text-border">|</span>
                        <Link href={`/admin/posts/${post.id}/edit`} className="text-blue-500 hover:underline">Edit</Link>
                        <span className="text-border">|</span>
                        <button onClick={() => handleDelete(post.id, post.title)}
                          disabled={deleting === post.id}
                          className="text-red-500 hover:underline disabled:opacity-50">
                          {deleting === post.id ? '...' : 'Hapus'}
                        </button>
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
