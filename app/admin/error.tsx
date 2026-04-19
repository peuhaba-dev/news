'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[AdminError]', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-[48px] mb-4">⚠️</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Terjadi Kesalahan
      </h2>
      <p className="text-sm text-gray-500 max-w-md mb-2">
        Halaman admin mengalami masalah. Silakan coba lagi.
      </p>
      {error.digest && (
        <p className="text-[11px] text-gray-400 font-mono mb-4">
          Error ID: {error.digest}
        </p>
      )}
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="bg-aceh-green text-white text-sm font-semibold
                     px-5 py-2 rounded-md hover:bg-aceh-green-dark transition-colors"
        >
          Coba Lagi
        </button>
        <Link
          href="/admin"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  )
}
