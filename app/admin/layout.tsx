'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AuthProvider, useAuth, ROLE_LABELS, ROLE_COLORS } from '@/components/admin/AuthProvider'

function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const menu = [
    { label: 'Dashboard', href: '/admin', icon: '📊', minRole: 'WRITER' },
    { label: 'Artikel', href: '/admin/posts', icon: '📰', minRole: 'WRITER' },
    { label: 'Tulis', href: '/admin/posts/new', icon: '✏️', minRole: 'WRITER' },
    { label: 'Kategori', href: '/admin/categories', icon: '🏷', minRole: 'EDITOR' },
    { label: 'Komentar', href: '/admin/comments', icon: '💬', minRole: 'EDITOR' },
    { label: 'Pengguna', href: '/admin/users', icon: '👥', minRole: 'SUPER_ADMIN' },
  ]

  const WEIGHTS: Record<string, number> = { SUPER_ADMIN: 3, EDITOR: 2, WRITER: 1 }
  const userWeight = user ? WEIGHTS[user.role] || 0 : 0

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40 lg:hidden" />
      )}

      <aside className={`
        fixed lg:static z-50 top-0 left-0 h-full
        w-64 lg:w-56
        bg-[#0f172a] text-white
        transform transition-transform duration-200 ease-out
        flex flex-col
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Brand */}
        <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="font-bold text-sm text-emerald-400 flex items-center gap-2">
            <span className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center text-xs">📰</span>
            Berita Meureno
          </Link>
          <button onClick={onClose} className="lg:hidden text-white/70 hover:text-white">✕</button>
        </div>

        {/* Menu */}
        <nav className="p-2 space-y-0.5 flex-1 overflow-y-auto">
          {menu.filter(item => userWeight >= (WEIGHTS[item.minRole] || 0)).map((item) => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium
                  transition-all duration-150
                  ${active
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'text-white/50 hover:text-white hover:bg-white/5'}
                `}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User info + logout */}
        <div className="p-3 border-t border-white/10">
          {user && (
            <div className="mb-3 px-2">
              <p className="text-[13px] font-medium text-white/90 truncate">{user.name}</p>
              <p className="text-[11px] text-white/40 truncate">{user.email}</p>
              <span className={`inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${ROLE_COLORS[user.role]}`}>
                {ROLE_LABELS[user.role]}
              </span>
            </div>
          )}
          <button
            onClick={logout}
            className="w-full text-left px-2 py-1.5 text-[12px] text-white/40 hover:text-red-400 transition-colors rounded hover:bg-white/5"
          >
            ← Logout
          </button>
        </div>
      </aside>
    </>
  )
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-emerald-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-gray-400">Memuat...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-white border-b flex items-center px-4 justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-sm font-semibold text-gray-700">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ROLE_COLORS[user.role]}`}>
                {ROLE_LABELS[user.role]}
              </span>
            )}
            <span className="text-[11px] text-gray-400">CMS v2.0</span>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  )
}