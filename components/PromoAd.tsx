/**
 * PromoAd — Iklan promosi internal untuk wisata.meureno.com
 * Tersedia dalam 3 varian:
 *   - 'banner'   : Full-width banner di atas halaman (970×90 style)
 *   - 'inline'   : Horizontal card di antara artikel
 *   - 'sidebar'  : Vertikal card di sidebar (300×250 style)
 */

import Link from 'next/link'

interface PromoAdProps {
  variant: 'banner' | 'inline' | 'sidebar'
  className?: string
}

const DESTINATIONS = ['Pantai Lampuuk', 'Sabang', 'Danau Laut Tawar', 'Masjid Baiturrahman']

export default function PromoAd({ variant, className = '' }: PromoAdProps) {

  // ── BANNER (top, full-width) ──────────────────────────────────────
  if (variant === 'banner') {
    return (
      <div className={`w-full ${className}`}>
        <Link
          href="https://wisata.meureno.com"
          target="_blank"
          rel="noopener sponsored"
          className="block relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #004D2A 0%, #00703C 40%, #1a8a52 70%, #C9941A 100%)',
          }}
        >
          <div className="max-w-portal mx-auto px-4 sm:px-5 flex items-center justify-between gap-4 py-2.5 sm:py-3">
            {/* Left: logo + tagline */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0 border border-white/25">
                <span className="text-[18px] sm:text-[20px]">🌴</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-label text-[13px] sm:text-[15px] font-bold text-white tracking-[0.5px] leading-none">
                    Wisata Meureno
                  </span>
                  <span className="bg-aceh-gold text-[#3a2200] font-label text-[9px] px-1.5 py-0.5 rounded font-bold tracking-[0.8px] uppercase shrink-0">
                    PROMO
                  </span>
                </div>
                <p className="text-[11px] sm:text-[12px] text-white/75 mt-0.5 truncate">
                  Panduan wisata terlengkap di Tanah Rencong
                </p>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="shrink-0 flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-white/80">
                {DESTINATIONS.slice(0, 3).map((d) => (
                  <span key={d} className="bg-white/10 px-2 py-0.5 rounded-full text-[10px]">{d}</span>
                ))}
              </div>
              <span
                className="bg-aceh-gold text-[#3a2200] font-label text-[11px] sm:text-[12px]
                           tracking-[0.8px] font-bold px-3 sm:px-4 py-1.5 rounded-lg
                           whitespace-nowrap hover:brightness-110 transition-all"
              >
                Jelajahi →
              </span>
            </div>
          </div>

          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
              backgroundSize: '8px 8px',
            }}
          />

          {/* IKLAN label */}
          <div className="absolute top-0.5 right-1 text-[8px] text-white/30 font-body uppercase tracking-widest">
            iklan
          </div>
        </Link>
      </div>
    )
  }

  // ── SIDEBAR (300×250 style) ───────────────────────────────────────
  if (variant === 'sidebar') {
    return (
      <div className={`rounded-xl overflow-hidden border border-aceh-green/20 ${className}`}>
        <Link
          href="https://wisata.meureno.com"
          target="_blank"
          rel="noopener sponsored"
          className="block group"
        >
          {/* Header */}
          <div
            className="relative px-4 pt-5 pb-4 text-center"
            style={{ background: 'linear-gradient(150deg, #004D2A 0%, #00703C 60%, #1a9a55 100%)' }}
          >
            {/* IKLAN label */}
            <div className="absolute top-1.5 right-2 text-[8px] text-white/30 font-body uppercase tracking-widest">
              iklan
            </div>

            <div className="text-[40px] mb-1">🌴</div>
            <div className="font-label text-[18px] font-bold text-white tracking-[0.5px] leading-none mb-0.5">
              Wisata Meureno
            </div>
            <div className="text-[11px] text-white/70">wisata.meureno.com</div>
          </div>

          {/* Body */}
          <div className="bg-aceh-green-light px-4 py-3.5">
            <p className="font-head text-[14px] font-bold text-aceh-green-dark leading-[1.35] mb-3 text-center">
              Panduan Wisata Aceh Terlengkap & Terpercaya
            </p>

            {/* Destination pills */}
            <div className="flex flex-wrap gap-1 justify-center mb-3.5">
              {DESTINATIONS.map((d) => (
                <span
                  key={d}
                  className="bg-white border border-aceh-green/20 text-aceh-green-dark
                             text-[10px] font-semibold px-2 py-0.5 rounded-full"
                >
                  📍 {d}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div
              className="w-full text-center bg-aceh-gold text-white font-label text-[13px]
                         tracking-[0.8px] font-bold py-2.5 rounded-lg
                         group-hover:bg-[#a87a15] transition-colors"
            >
              Lihat Destinasi Wisata →
            </div>

            <p className="text-[9.5px] text-ink-soft text-center mt-2">
              🏆 Destinasi pilihan · Kuliner · Penginapan
            </p>
          </div>
        </Link>
      </div>
    )
  }

  // ── INLINE (horizontal, di antara artikel) ────────────────────────
  return (
    <div className={`my-6 rounded-xl overflow-hidden border border-aceh-green/25 ${className}`}>
      <Link
        href="https://wisata.meureno.com"
        target="_blank"
        rel="noopener sponsored"
        className="flex items-stretch group"
        style={{ minHeight: 110 }}
      >
        {/* Left: colored panel */}
        <div
          className="flex-shrink-0 w-[110px] sm:w-[140px] flex flex-col items-center justify-center
                     px-3 py-4 text-center relative"
          style={{ background: 'linear-gradient(160deg, #004D2A 0%, #00703C 100%)' }}
        >
          <span className="text-[36px] sm:text-[42px] leading-none mb-1">🌴</span>
          <div className="font-label text-[11px] sm:text-[12px] font-bold text-white tracking-[0.5px] leading-tight">
            Wisata<br />Meureno
          </div>
          {/* IKLAN label */}
          <div className="absolute top-1 left-1 text-[7px] text-white/30 font-body uppercase">iklan</div>
        </div>

        {/* Right: content */}
        <div
          className="flex-1 px-4 sm:px-5 py-3.5 flex flex-col justify-center"
          style={{ background: 'linear-gradient(90deg, #f0faf4 0%, #fff 100%)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label text-[9.5px] tracking-[1.2px] uppercase text-aceh-green font-bold">
              Panduan Wisata Aceh
            </span>
            <span className="bg-aceh-gold text-white text-[8px] font-bold px-1.5 py-0.5 rounded font-label tracking-[0.5px]">
              PROMO
            </span>
          </div>
          <h3 className="font-head text-[15px] sm:text-[17px] font-bold text-ink leading-[1.3] mb-1.5
                         group-hover:text-aceh-green transition-colors">
            Temukan Destinasi Wisata Aceh Terbaik di Satu Platform
          </h3>
          <p className="text-[12px] text-ink-soft hidden sm:block mb-2.5">
            Kuliner khas, penginapan pilihan, dan aktivitas seru dari Sabang sampai Langsa. 🗺
          </p>
          <div className="flex items-center gap-3">
            <span
              className="bg-aceh-green text-white font-label text-[11px] tracking-[0.8px]
                         font-bold px-4 py-1.5 rounded-lg group-hover:bg-aceh-green-dark
                         transition-colors inline-block"
            >
              Jelajahi Sekarang →
            </span>
            <span className="text-[11px] text-ink-soft hidden sm:block">
              wisata.meureno.com
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
