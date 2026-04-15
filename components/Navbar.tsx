'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
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

  // Build nav items from DB categories if provided, fallback to static
  const navItems =
    categories && categories.length > 0
      ? [
          { label: 'Beranda', href: '/' },
          ...categories.map((c) => ({
            label: c.name,
            href: `/category/${c.slug}`,
          })),
        ]
      : NAV_ITEMS

  return (
    <nav
      className={`sticky top-0 z-50 bg-white border-b-[3px] border-aceh-green
                  transition-shadow duration-200
                  ${scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.12)]' : 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]'}`}
    >
      <div className="max-w-portal mx-auto px-5 flex items-center h-14 gap-8">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 bg-aceh-green rounded-md flex items-center justify-center">
            <svg className="w-[22px] h-[22px] fill-white" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9
                       2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-label text-[20px] font-bold text-aceh-green tracking-[0.5px]">
              Berita Meureno
            </div>
            <div className="hidden sm:block text-[9.5px] text-ink-soft tracking-[1px] uppercase font-semibold">
              Portal Berita Aceh
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1">
          {navItems.map(({ label, href, accent, hot }: any) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`font-label text-[13px] font-medium tracking-[0.5px] px-3 py-1.5
                            rounded whitespace-nowrap transition-all duration-150
                            ${hot
                              ? 'text-aceh-red'
                              : active || accent
                                ? 'text-aceh-green font-bold'
                                : 'text-ink-mid hover:text-aceh-green hover:bg-aceh-green-light'}`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 ml-auto shrink-0">
          <Link
            href="/search"
            className="p-1.5 text-ink-mid rounded hover:text-aceh-green
                       hover:bg-aceh-green-light transition-all duration-150"
            aria-label="Cari berita"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </Link>

          <Link
            href="/auth/login"
            className="font-label text-[12px] tracking-[0.5px] px-4 py-1.5
                       bg-aceh-green text-white rounded font-semibold
                       hover:bg-aceh-green-dark transition-colors duration-150"
          >
            Masuk
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1.5 text-ink-mid"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileOpen
                ? <path d="M6 18L18 6M6 6l12 12"/>
                : <path d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border px-5 py-3">
          {navItems.map(({ label, href, hot }: any) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block font-label text-[14px] py-2 border-b border-border/50
                          ${hot ? 'text-aceh-red' : 'text-ink-mid hover:text-aceh-green'}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
