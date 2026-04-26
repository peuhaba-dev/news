'use client'

import { useEffect, useRef } from 'react'
import type { BreakingNews } from '@/types'

const DEFAULT_TICKER: string[] = [
  'Gubernur Aceh Resmikan 12 Gampong Digital di Kabupaten Aceh Besar',
  'DPRK Banda Aceh Setujui APBK Perubahan 2026 Senilai Rp 1,2 Triliun',
  'Pemerintah Aceh Targetkan 500 Km Jalan Nasional Selesai Akhir Tahun',
  'Harga Kopi Gayo Melonjak di Pasar Internasional, Petani Aceh Tengah Bersyukur',
  'Tim SAR Berhasil Evakuasi Korban Banjir di Aceh Selatan, 47 Warga Mengungsi',
]

interface TickerProps {
  items?: BreakingNews[]
}

export default function Ticker({ items }: TickerProps) {
  const texts = items && items.length > 0
    ? items.map((i) => i.title)
    : DEFAULT_TICKER

  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    let pos = 0
    const speed = 0.5 // pixel per frame
    let raf: number

    function animate() {
      pos -= speed
      // Reset ketika sudah scroll setengah (karena konten diduplikasi)
      if (Math.abs(pos) >= el!.scrollWidth / 2) {
        pos = 0
      }
      el!.style.transform = `translateX(${pos}px)`
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [texts])

  const doubled = [...texts, ...texts]

  return (
    <div className="bg-aceh-red text-white flex items-center overflow-hidden" style={{ height: 36 }}>
      {/* Label */}
      <div className="bg-[#8b0c1e] font-label text-[12px] tracking-[1.5px] px-4 h-full flex items-center whitespace-nowrap shrink-0 gap-2">
        <span
          className="w-2 h-2 rounded-full bg-white inline-block"
          style={{ animation: 'blink 1s ease-in-out infinite' }}
        />
        BREAKING
      </div>

      {/* Scrolling track */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <div
          ref={trackRef}
          className="flex items-center whitespace-nowrap text-[13px] font-semibold gap-12"
          style={{ willChange: 'transform' }}
        >
          {doubled.map((text, i) => (
            <span key={i}>
              <span className="text-[8px] opacity-70 mr-2">◆</span>
              {text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
