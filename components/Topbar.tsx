'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const DAYS_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

function formatDate(date: Date) {
  return `${DAYS_ID[date.getDay()]}, ${date.getDate()} ${MONTHS_ID[date.getMonth()]} ${date.getFullYear()} · Banda Aceh`
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export default function Topbar() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-[#004D2A] text-white/75 text-[11.5px] font-body py-[5px]">
      <div className="max-w-portal mx-auto px-5 flex items-center justify-between w-full">

        {/* Left — Date + Time */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            {/* Calendar icon */}
            <svg className="w-3 h-3 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>{now ? formatDate(now) : '...'}</span>
          </div>
          <span className="opacity-40">|</span>
          <span className="font-semibold text-[#a8d8bc]">
            {now ? formatTime(now) : '--:--:--'}
          </span>
          <span className="opacity-40">WIB</span>
        </div>

        {/* Right — Quick links */}
        <div className="hidden sm:flex items-center gap-3.5">
          {[
            { label: 'Cuaca Aceh', href: '/cuaca' },
            { label: 'Jadwal Shalat', href: '/shalat' },
            { label: 'Tentang Kami', href: '/tentang' },
            { label: 'Iklan', href: '/iklan' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="hover:text-aceh-gold transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
