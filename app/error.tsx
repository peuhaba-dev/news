'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[RootError]', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-5 text-center">
      <div className="text-[64px] mb-4">⚠️</div>
      <h2 className="font-head text-[24px] font-bold text-ink mb-3">
        Terjadi Kesalahan
      </h2>
      <p className="text-ink-soft text-[14px] max-w-md mb-2 leading-relaxed">
        Maaf, halaman ini mengalami masalah. Silakan coba lagi atau kembali ke beranda.
      </p>
      {error.digest && (
        <p className="text-[11px] text-ink-soft/60 font-mono mb-6">
          Error ID: {error.digest}
        </p>
      )}
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="bg-aceh-green text-white font-label px-6 py-2.5 rounded
                     font-semibold tracking-[0.5px] hover:bg-aceh-green-dark transition-colors"
        >
          Coba Lagi
        </button>
        <a
          href="/"
          className="border border-aceh-green text-aceh-green font-label px-6 py-2.5 rounded
                     font-semibold tracking-[0.5px] hover:bg-aceh-green-light transition-colors"
        >
          Ke Beranda
        </a>
      </div>
    </div>
  )
}
