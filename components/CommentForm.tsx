'use client'

import { useState } from 'react'

interface CommentFormProps {
  postId: string
}

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

export default function CommentForm({ postId }: CommentFormProps) {
  const [name, setName]       = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    setStatus('loading')
    const res = await fetch(`${API}/api/berita/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, name: name.trim(), content: content.trim() }),
    })
    if (!res.ok) { setStatus('error'); return }
    setStatus('success')
    setName('')
    setContent('')
  }

  return (
    <div className="mt-10 pt-8 border-t border-border">
      <h3 className="font-head text-[20px] font-bold text-ink mb-5">Tinggalkan Komentar</h3>
      {status === 'success' && (
        <div className="bg-aceh-green-light border border-aceh-green/30 rounded-md px-4 py-3 text-[13px] text-aceh-green-dark font-semibold mb-5">
          ✓ Komentar Anda telah dikirim dan menunggu moderasi. Terima kasih!
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 text-[13px] text-red-700 mb-5">
          Gagal mengirim komentar. Silakan coba lagi.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Nama <span className="text-aceh-red">*</span>
          </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            required maxLength={100} placeholder="Nama lengkap Anda"
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20 transition-all" />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
            Komentar <span className="text-aceh-red">*</span>
          </label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}
            required maxLength={1000} rows={4} placeholder="Tulis komentar Anda di sini..."
            className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20 transition-all resize-none" />
          <p className="text-[11px] text-ink-soft mt-1 text-right">{content.length}/1000</p>
        </div>
        <p className="text-[12px] text-ink-soft">Komentar akan ditampilkan setelah melewati proses moderasi.</p>
        <button type="submit" disabled={status === 'loading'}
          className="bg-aceh-green text-white font-label font-semibold tracking-[0.5px] px-6 py-3 rounded hover:bg-aceh-green-dark active:bg-aceh-green-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px] w-full sm:w-auto">
          {status === 'loading' ? 'Mengirim...' : 'Kirim Komentar'}
        </button>
      </form>
    </div>
  )
}
