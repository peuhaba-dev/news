'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { Category } from '@/types'

const NAV_ITEMS = [
  { label: 'Beranda', href: '/' },
  { label: '🏛 Aceh Terkini', href: '/category/aceh-terkini', accent: true },
  { label: 'Nasional', href: '/category/nasional' },
  { label: 'Ekonomi', href: '/category/ekonomi' },
  { label: 'Hukum', href: '/category/hukum' },
  { label: 'Pendidikan', href: '/category/pendidikan' },
  { label: 'Religi', href: '/category/religi' },
  { label: 'Wisata', href: '/category/wisata' },
  { label: '🔥 Opini', href: '/category/opini', hot: true },
]

interface NavbarProps {
  categories?: Category[]
}

export default function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open (iOS fix)
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navItems = categories && categories.length > 0
    ? [{ label: 'Beranda', href: '/' }, ...categories.map((c) => ({ label: c.name, href: `/category/${c.slug}` }))]
    : NAV_ITEMS

  return (
    <nav className={`sticky-header z-50 bg-white border-b-[3px] border-aceh-green transition-shadow duration-200 ${scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.12)]' : 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]'}`}>
      <div className="max-w-portal mx-auto px-4 sm:px-5 flex items-center h-14 gap-3 sm:gap-8">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-aceh-green rounded-md flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 sm:w-[22px] sm:h-[22px] fill-white" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-label text-[16px] xs:text-[18px] sm:text-[20px] font-bold text-aceh-green tracking-[0.5px] whitespace-nowrap">Berita Meureno</div>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-0.5 flex-1">
          {navItems.map(({ label, href, accent, hot }: any) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className={`font-label text-[13px] font-medium px-3 py-1.5 rounded ${hot ? 'text-aceh-red' : active || accent ? 'text-aceh-green font-bold' : 'text-ink-mid hover:text-aceh-green hover:bg-aceh-green-light'}`}>
                {label}
              </Link>
            )
          })}
        </div>
        <div className="flex items-center gap-1.5 ml-auto shrink-0">
          <Link href="/search"
            className="p-2 text-ink-mid rounded-lg hover:text-aceh-green hover:bg-aceh-green-light active:bg-aceh-green-light touch-action-manipulation"
            aria-label="Cari berita">
            🔍
          </Link>
          <button
            className="lg:hidden p-2 text-ink-mid text-xl rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-14 left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-50 max-h-[calc(100dvh-56px)] overflow-y-auto overscroll-contain">
          <div className="px-4 py-2">
            {navItems.map(({ label, href }: any) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                className={`flex items-center py-3.5 border-b border-gray-50 text-[15px] active:bg-gray-50 rounded px-2 transition-colors
                  ${pathname === href ? 'text-aceh-green font-bold' : 'text-ink-mid'}`}>
                {label}
              </Link>
            ))}
            <div className="h-4" />
          </div>
        </div>
      )}
    </nav>
  )
}
