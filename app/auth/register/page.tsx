'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createBrowserSupabaseClient } from '@/lib/supabase'

export default function RegisterPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [status, setStatus]     = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError]       = useState<string | null>(null)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createBrowserSupabaseClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    setStatus('success')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-5">
      <div className="w-full max-w-[420px]">

        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-aceh-green rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0
                         2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <span className="font-label text-[22px] font-bold text-aceh-green">Berita Meureno</span>
          </Link>
          <p className="text-ink-soft text-[14px] mt-2">Buat akun baru</p>
        </div>

        <div className="bg-white rounded-xl border border-border shadow-sm p-8">
          {status === 'success' ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-3">✅</div>
              <h2 className="font-head text-[20px] font-bold text-ink mb-2">Pendaftaran Berhasil!</h2>
              <p className="text-[13px] text-ink-soft mb-4">
                Cek email Anda untuk konfirmasi akun sebelum masuk.
              </p>
              <Link href="/auth/login" className="text-aceh-green font-semibold hover:underline text-[14px]">
                Kembali ke Halaman Masuk
              </Link>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 text-[13px] text-red-700">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Nama Lengkap</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required
                  placeholder="Nama Anda"
                  className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                             outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="anda@email.com"
                  className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                             outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Kata Sandi</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  minLength={6} placeholder="Min. 6 karakter"
                  className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] text-ink
                             outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-aceh-green text-white font-label font-semibold
                           tracking-[0.5px] py-2.5 rounded-md hover:bg-aceh-green-dark
                           transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? 'Memproses...' : 'Daftar'}
              </button>
            </form>
          )}

          {status !== 'success' && (
            <p className="text-center text-[13px] text-ink-soft mt-5">
              Sudah punya akun?{' '}
              <Link href="/auth/login" className="text-aceh-green font-semibold hover:underline">Masuk</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
