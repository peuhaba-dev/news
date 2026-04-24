'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const menu = [
    { label: 'Dashboard', href: '/admin', icon: '📊' },
    { label: 'Artikel', href: '/admin/posts', icon: '📰' },
    { label: 'Tulis', href: '/admin/posts/new', icon: '➕' },
    { label: 'Kategori', href: '/admin/categories', icon: '🏷' },
    { label: 'Komentar', href: '/admin/comments', icon: '💬' },
  ]

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static z-50
          top-0 left-0 h-full
          w-64 lg:w-56
          bg-[#111827] text-white
          transform transition-transform duration-200

          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* BRAND */}
        <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="font-bold text-sm text-aceh-green">
            Berita Meureno
          </Link>

          {/* CLOSE MOBILE */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-white/70"
          >
            ✕
          </button>
        </div>

        {/* MENU */}
        <nav className="p-2 space-y-1">
          {menu.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm
                  transition-all

                  ${active
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'}
                `}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* FOOTER */}
        <div className="mt-auto p-4 border-t border-white/10">
          <a href="/api/admin/logout" className="text-xs text-white/50 hover:text-red-400 block">
            Logout →
          </a>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* TOPBAR */}
        <header className="h-14 bg-white border-b flex items-center px-4 justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-gray-600"
            >
              ☰
            </button>

            <h1 className="text-sm font-semibold text-gray-700">
              Admin Panel
            </h1>
          </div>

          {/* RIGHT */}
          <div className="text-xs text-gray-400">
            CMS v1.0
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-4 sm:p-6">
          {children}
        </main>

      </div>
    </div>
  )
}