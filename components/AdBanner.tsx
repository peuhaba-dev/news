'use client'

import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

interface Ad {
  id: string
  title: string
  imageUrl: string
  linkUrl?: string
  position: string
}

interface Props {
  position: 'sidebar' | 'banner-top' | 'banner-bottom' | 'inline'
  className?: string
}

export default function AdBanner({ position, className = '' }: Props) {
  const [ads, setAds] = useState<Ad[]>([])

  useEffect(() => {
    fetch(`${API}/api/berita/ads?position=${position}`)
      .then(r => r.json())
      .then(d => setAds(Array.isArray(d) ? d : []))
      .catch(() => {})
  }, [position])

  if (ads.length === 0) return null

  return (
    <div className={`space-y-3 ${className}`}>
      {ads.map(ad => (
        <div key={ad.id} className="overflow-hidden rounded-lg border border-gray-100">
          <p className="text-[9px] font-label tracking-widest text-gray-400 text-center py-1 bg-gray-50 border-b">
            IKLAN
          </p>
          {ad.linkUrl ? (
            <a href={ad.linkUrl} target="_blank" rel="noopener noreferrer sponsored">
              <img src={ad.imageUrl} alt={ad.title}
                className="w-full object-cover hover:opacity-95 transition-opacity" />
            </a>
          ) : (
            <img src={ad.imageUrl} alt={ad.title} className="w-full object-cover" />
          )}
        </div>
      ))}
    </div>
  )
}
