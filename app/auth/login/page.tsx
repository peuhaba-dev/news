'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserSupabaseClient()

  // 🔁 AUTO REDIRECT kalau sudah login
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        const redirectTo = searchParams.get('redirect') || '/admin'
        router.replace(redirectTo)
      }
    })
  }, [router, searchParams, supabase])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // 🎯 Redirect sesuai middleware
    const redirectTo = searchParams.get('redirect') || '/admin'

    router.push(redirectTo)
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-5">
      <div className="w-full max-w-[420px]">

        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-aceh-green rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0
                         2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <span className="font-label text-[22px] font-bold text-aceh-green">
              Berita Meureno
            </span>
          </Link>
          <p className="text-ink-soft text-[14px] mt-2">
            Masuk ke akun Anda
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-8">
          <form onSubmit={handleLogin} className="space-y-4">

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3
                              text-[13px] text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
                Alamat Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="anda@email.com"
                className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px]
                           text-ink outline-none focus:border-aceh-green focus:ring-2
                           focus:ring-aceh-green/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">
                Kata Sandi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px]
                           text-ink outline-none focus:border-aceh-green focus:ring-2
                           focus:ring-aceh-green/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-aceh-green text-white font-label font-semibold
                         tracking-[0.5px] py-2.5 rounded-md hover:bg-aceh-green-dark
                         transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <p className="text-center text-[13px] text-ink-soft mt-5">
            Belum punya akun?{' '}
            <Link href="/auth/register" className="text-aceh-green font-semibold hover:underline">
              Daftar
            </Link>
          </p>
        </div>

        <p className="text-center text-[12px] text-ink-soft mt-4">
          <Link href="/" className="hover:text-aceh-green">
            ← Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  )
}
