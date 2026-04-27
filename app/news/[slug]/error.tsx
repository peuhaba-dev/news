'use client'

import { useEffect, useState } from 'react'

export default function ArticleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (countdown <= 0) {
      reset()
      return
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, reset])

  return (
    <div className="max-w-portal mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="font-head text-2xl text-ink mb-2">Gagal Memuat Artikel</h2>
      <p className="text-ink-soft text-sm mb-6">
        Koneksi bermasalah. Mencoba ulang dalam{' '}
        <span className="font-bold text-aceh-green">{countdown}</span> detik...
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => { setCountdown(5); reset() }}
          className="bg-aceh-green text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-aceh-green-dark transition-colors"
        >
          Coba Sekarang
        </button>
        <a
          href="/"
          className="border border-gray-300 text-ink font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
        >
          Ke Beranda
        </a>
      </div>
    </div>
  )
}
