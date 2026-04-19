'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

interface CommentRow {
  id: string
  post_id: string
  name: string
  content: string
  approved: boolean
  created_at: string
  post?: { title: string; slug: string }
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'pending' | 'approved' | 'all'>('pending')
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    fetchComments()
  }, [filter])

  async function fetchComments() {
    setLoading(true)
    setError(null)

    let query = (supabase as any)
      .from('comments')
      .select('*, post:posts(title, slug)')
      .order('created_at', { ascending: false })
      .limit(50)

    if (filter === 'pending') query = query.eq('approved', false)
    if (filter === 'approved') query = query.eq('approved', true)

    const { data, error: fetchError } = await query

    if (fetchError) {
      setError('Gagal memuat komentar: ' + fetchError.message)
    } else {
      setComments((data ?? []) as CommentRow[])
    }
    setLoading(false)
  }

  async function handleApprove(id: string) {
    const { error } = await (supabase as any)
      .from('comments')
      .update({ approved: true })
      .eq('id', id)

    if (error) {
      setError('Gagal approve: ' + error.message)
    } else {
      fetchComments()
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus komentar ini?')) return

    const { error } = await (supabase as any)
      .from('comments')
      .delete()
      .eq('id', id)

    if (error) {
      setError('Gagal menghapus: ' + error.message)
    } else {
      fetchComments()
    }
  }

  function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Baru saja'
    if (mins < 60) return `${mins} menit lalu`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs} jam lalu`
    const days = Math.floor(hrs / 24)
    return `${days} hari lalu`
  }

  const pendingCount = comments.filter((c) => !c.approved).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Moderasi Komentar</h1>
          <p className="text-xs text-gray-500 mt-1">
            Kelola komentar dari pembaca
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-[13px] text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2">
        {([
          { key: 'pending', label: 'Menunggu' },
          { key: 'approved', label: 'Disetujui' },
          { key: 'all', label: 'Semua' },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`text-[12px] font-semibold px-4 py-1.5 rounded-full transition-all
                        ${filter === key
                          ? 'bg-aceh-green text-white'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            {label}
            {key === 'pending' && filter !== 'pending' && pendingCount > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-full mb-1" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {/* Comments list */}
      {!loading && comments.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">💬</div>
          <p className="font-semibold text-gray-600">Tidak ada komentar</p>
          <p className="text-sm mt-1">
            {filter === 'pending'
              ? 'Tidak ada komentar yang menunggu moderasi.'
              : 'Belum ada komentar.'}
          </p>
        </div>
      )}

      {!loading && comments.length > 0 && (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={`bg-white border rounded-xl p-4 transition-all hover:shadow-sm
                          ${!comment.approved ? 'border-l-4 border-l-amber-400' : ''}`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  {/* Avatar */}
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-aceh-green to-aceh-green-dark
                                  flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-sm text-gray-800">{comment.name}</span>
                  <span className="text-[11px] text-gray-400">{timeAgo(comment.created_at)}</span>
                  {!comment.approved && (
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">
                      Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{comment.content}</p>

              {/* Article reference */}
              {comment.post && (
                <div className="text-[11px] text-gray-400 mb-3">
                  Pada artikel:{' '}
                  <Link
                    href={`/news/${comment.post.slug}`}
                    target="_blank"
                    className="text-aceh-green hover:underline"
                  >
                    {comment.post.title}
                  </Link>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                {!comment.approved && (
                  <button
                    onClick={() => handleApprove(comment.id)}
                    className="text-xs text-aceh-green font-semibold hover:underline flex items-center gap-1"
                  >
                    ✅ Setujui
                  </button>
                )}
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-xs text-red-500 font-semibold hover:underline flex items-center gap-1"
                >
                  🗑 Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
