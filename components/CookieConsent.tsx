'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookie_consent')
    if (!accepted) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-xl">
      <div className="max-w-portal mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-[13px] text-ink-mid leading-relaxed">
            🍪 Kami menggunakan cookie untuk meningkatkan pengalaman browsing dan menampilkan iklan yang relevan.
            Dengan melanjutkan, Anda menyetujui{' '}
            <Link href="/kebijakan-privasi" className="text-aceh-green hover:underline font-semibold">
              Kebijakan Privasi
            </Link>{' '}
            kami.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={accept}
            className="bg-aceh-green text-white font-semibold text-[13px] px-5 py-2 rounded-full hover:bg-aceh-green-dark transition-colors"
          >
            Setuju
          </button>
          <Link
            href="/kebijakan-privasi"
            className="border border-gray-300 text-ink-mid font-semibold text-[13px] px-5 py-2 rounded-full hover:bg-gray-50 transition-colors"
          >
            Pelajari
          </Link>
        </div>
      </div>
    </div>
  )
}
