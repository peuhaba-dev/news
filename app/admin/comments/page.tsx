'use client'

import { useEffect, useState } from 'react'
import { approveComment, deleteComment } from '@/lib/actions'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

interface CommentRow {
  id: string; postId: string; name: string
  content: string; approved: boolean; createdAt: string
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentRow[]>([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState<'pending' | 'approved' | 'all'>('pending')

  useEffect(() => { fetchComments() }, [filter])

  async function fetchComments() {
    setLoading(true)
    const res  = await fetch(`${API}/api/berita/comments/all?filter=${filter}`)
    const data = res.ok ? await res.json() : []
    setComments(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  async function handleApprove(id: string) {
    await approveComment(id)
    fetchComments()
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus komentar ini?')) return
    await deleteComment(id)
    fetchComments()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Moderasi Komentar</h1>
      <div className="flex gap-2">
        {(['pending','approved','all'] as const).map((key) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`text-[12px] font-semibold px-4 py-1.5 rounded-full transition-all ${filter === key ? 'bg-aceh-green text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
            {key === 'pending' ? 'Menunggu' : key === 'approved' ? 'Disetujui' : 'Semua'}
          </button>
        ))}
      </div>
      {loading ? <div className="p-8 text-center text-sm text-gray-400 animate-pulse">Memuat...</div> :
        comments.length === 0 ? <div className="text-center py-16 text-gray-400"><div className="text-4xl mb-3">💬</div><p>Tidak ada komentar</p></div> :
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className={`bg-white border rounded-xl p-4 ${!c.approved ? 'border-l-4 border-l-amber-400' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-sm text-gray-800">{c.name}</span>
                {!c.approved && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Pending</span>}
              </div>
              <p className="text-sm text-gray-600 mb-3">{c.content}</p>
              <div className="flex gap-3">
                {!c.approved && <button onClick={() => handleApprove(c.id)} className="text-xs text-aceh-green font-semibold hover:underline">✅ Setujui</button>}
                <button onClick={() => handleDelete(c.id)} className="text-xs text-red-500 font-semibold hover:underline">🗑 Hapus</button>
              </div>
            </div>
          ))}
        </div>}
    </div>
  )
}
