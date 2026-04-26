/**
 * AdSlot — Komponen iklan yang mendukung:
 *  1. Iklan custom (dari data/ads.ts) — gambar atau gradient
 *  2. Google AdSense (produksi) — via props adSlotId + adClient
 *  3. Placeholder (dev) — jika tidak ada iklan aktif & bukan produksi
 */

import Link from 'next/link'
import Image from 'next/image'
import { getAd } from '@/data/ads'
import type { AdSlotType } from '@/data/ads'

interface AdSlotProps {
  slot: AdSlotType
  /** Google AdSense data-ad-slot (opsional, untuk produksi AdSense) */
  adSlotId?: string
  /** Google AdSense data-ad-client (opsional) */
  adClient?: string
  className?: string
}

/* Dimensi tampilan per slot */
const SLOT_SIZES: Record<AdSlotType, { h: string; label: string }> = {
  top:     { h: 'h-[90px] sm:h-[100px]',  label: 'IKLAN — 970×90' },
  inline:  { h: 'h-[100px] sm:h-[120px]', label: 'IKLAN — 728×90' },
  sidebar: { h: 'h-[250px]',              label: 'IKLAN — 300×250' },
}

export default function AdSlot({
  slot,
  adSlotId,
  adClient,
  className = '',
}: AdSlotProps) {
  const { h, label } = SLOT_SIZES[slot]

  /* ── 1. Google AdSense (produksi resmi) ── */
  const isAdSense =
    process.env.NODE_ENV === 'production' && adSlotId && adClient

  if (isAdSense) {
    return (
      <div className={`${h} my-4 ${className}`}>
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={adSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  /* ── 2. Iklan custom dari data/ads.ts ── */
  const ad = getAd(slot)

  if (ad) {
    const isSidebar = slot === 'sidebar'

    return (
      <Link
        href={ad.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`relative block overflow-hidden rounded-xl group
                    ${h} ${isSidebar ? 'mb-6' : 'my-4'} ${className}`}
        aria-label={`Iklan: ${ad.title}`}
      >
        {/* Background: gambar atau gradient */}
        {ad.image ? (
          <Image
            src={ad.image}
            alt={ad.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 728px"
          />
        ) : (
          <div
            className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${ad.brand.from} 0%, ${ad.brand.to} 100%)`,
            }}
          />
        )}

        {/* Overlay pattern untuk estetika */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 10px)',
          }}
        />

        {/* Konten iklan */}
        <div
          className={`relative z-10 h-full flex items-center
            ${isSidebar ? 'flex-col justify-center text-center px-4 gap-2' : 'flex-row justify-between px-4 sm:px-6 gap-3'}`}
        >
          {/* Teks */}
          <div className={isSidebar ? '' : 'flex-1 min-w-0'}>
            <div
              className="font-head font-black leading-tight line-clamp-1"
              style={{
                color: ad.brand.text,
                fontSize: isSidebar ? '15px' : 'clamp(13px, 2vw, 16px)',
              }}
            >
              {ad.title}
            </div>
            <p
              className={`leading-snug mt-0.5 ${isSidebar ? 'line-clamp-3 text-[12px]' : 'line-clamp-1 text-[11px] sm:text-[12px] hidden xs:block'}`}
              style={{ color: ad.brand.text, opacity: 0.85 }}
            >
              {ad.tagline}
            </p>
          </div>

          {/* Tombol CTA */}
          <div className="shrink-0">
            <span
              className="inline-flex items-center font-label font-bold tracking-[0.5px] rounded-lg
                         transition-all duration-200 group-hover:brightness-110 group-hover:shadow-md
                         whitespace-nowrap"
              style={{
                background: ad.brand.button,
                color: ad.brand.buttonText,
                padding: isSidebar ? '8px 16px' : '6px 14px',
                fontSize: isSidebar ? '12px' : '11px',
              }}
            >
              {ad.cta}
            </span>
          </div>
        </div>

        {/* Badge label */}
        {ad.badge && (
          <div
            className="absolute top-2 right-2 z-20
                       font-label text-[9px] tracking-[1.2px] font-bold
                       px-1.5 py-0.5 rounded"
            style={{
              background: 'rgba(0,0,0,0.35)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {ad.badge}
          </div>
        )}

        {/* Label "Iklan" kecil di pojok kiri bawah */}
        <div
          className="absolute bottom-1.5 left-2 z-20
                     font-body text-[8px] tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          Iklan
        </div>
      </Link>
    )
  }

  /* ── 3. Placeholder (development — tidak ada iklan aktif) ── */
  return (
    <div
      className={`${h} my-4 ${className}
                  bg-gradient-to-br from-gray-100 to-gray-200
                  border border-dashed border-gray-300 rounded-xl
                  flex items-center justify-center
                  text-gray-400 text-[11px] font-body tracking-widest uppercase`}
    >
      {label}
    </div>
  )
}
