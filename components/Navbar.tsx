'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'Beranda', href: '/' },

  { label: '🏛 Aceh Terkini', href: '/category/aceh-terkini', accent: true },

  { label: '🏦 BI Aceh', href: '/category/bi-aceh' },
  { label: '💼 OJK Aceh', href: '/category/ojk-aceh' },

  { label: 'Nasional', href: '/category/nasional' },
  { label: 'Ekonomi', href: '/category/ekonomi' },
  { label: 'Hukum', href: '/category/hukum' },
  { label: 'Pendidikan', href: '/category/pendidikan' },
  { label: 'Religi', href: '/category/religi' },
  { label: 'Wisata', href: '/category/wisata' },
  { label: 'Teknologi', href: '/category/teknologi' },

  { label: 'Aktivitas', href: '/category/aktivitas-komunitas' },

  { label: '🔥 Opini', href: '/category/opini', hot: true },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <nav className={`sticky-header z-50 bg-white border-b-[3px] border-aceh-green transition-shadow duration-200 ${scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.12)]' : 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]'}`}>
      
      <div className="max-w-portal mx-auto px-4 sm:px-5 flex items-center h-14 gap-3 sm:gap-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-aceh-green rounded-md flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px] fill-white" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div className="font-label text-[18px] sm:text-[20px] font-bold text-aceh-green tracking-[0.5px]">
            Berita Meureno
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1">
          {NAV_ITEMS.map(({ label, href, accent, hot }: any) => {
            const active = pathname === href

            return (
              <Link
                key={href}
                href={href}
                className={`font-label text-[13px] px-3 py-1.5 rounded transition
                  ${hot
                    ? 'text-aceh-red'
                    : active || accent
                    ? 'text-aceh-green font-bold'
                    : 'text-ink-mid hover:text-aceh-green hover:bg-aceh-green-light'
                  }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5 ml-auto">
          <Link href="/search"
            className="p-2 text-ink-mid rounded-lg hover:text-aceh-green hover:bg-aceh-green-light">
            🔍
          </Link>

          <button
            className="lg:hidden p-2 text-xl rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-14 left-0 right-0 bg-white shadow-xl z-50 max-h-[calc(100vh-56px)] overflow-y-auto">
          <div className="px-4 py-2">
            {NAV_ITEMS.map(({ label, href }: any) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 border-b text-[15px]
                  ${pathname === href ? 'text-aceh-green font-bold' : 'text-ink-mid'}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}