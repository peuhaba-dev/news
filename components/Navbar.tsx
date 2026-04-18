'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Category } from '@/types'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

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
  const router = useRouter()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  const supabase = createBrowserSupabaseClient()

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 🔐 Auth state listener (INI YANG PENTING)
  useEffect(() => {
    // get current user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // listen perubahan login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

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
                  ${scrolled
                    ? 'shadow-[0_4px_20px_rgba(0,0,0,0.12)]'
                    : 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]'}`}
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
                className={`font-label text-[13px] font-medium px-3 py-1.5 rounded
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

          {/* 🔍 Search */}
          <Link
            href="/search"
            className="p-1.5 text-ink-mid rounded hover:text-aceh-green hover:bg-aceh-green-light"
          >
            🔍
          </Link>

          {/* 🔐 AUTH BUTTON */}
          {!user ? (
            <Link
              href="/auth/login"
              className="font-label text-[12px] px-4 py-1.5 bg-aceh-green text-white rounded font-semibold"
            >
              Masuk
            </Link>
          ) : (
            <>
              <Link
                href="/admin"
                className="font-label text-[12px] px-4 py-1.5 bg-aceh-green text-white rounded font-semibold"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="font-label text-[12px] px-4 py-1.5 border border-border rounded"
              >
                Logout
              </button>
            </>
          )}

          {/* Mobile */}
          <button
            className="lg:hidden p-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t px-5 py-3">
          {navItems.map(({ label, href }: any) => (
            <Link key={href} href={href} className="block py-2">
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
