import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 🔐 Belum login → paksa ke login
  if (!user) {
    redirect('/auth/login?redirect=/admin')
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#111827] text-white shrink-0 flex flex-col">
        <div className="px-5 py-4 border-b border-white/10">
          <Link
            href="/"
            className="font-label text-[16px] font-bold text-aceh-green tracking-[0.5px]"
          >
            Berita Meureno
          </Link>
          <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wider">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {[
            { label: '📊 Dashboard', href: '/admin' },
            { label: '📰 Artikel', href: '/admin/posts' },
            { label: '➕ Tulis Artikel', href: '/admin/posts/new' },
            { label: '🏷 Kategori', href: '/admin/categories' },
            { label: '💬 Komentar', href: '/admin/comments' },
            { label: '📢 Breaking News', href: '/admin/breaking' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-3 py-2 rounded text-[13px]
                         text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-[11px] text-white/40 truncate mb-2">
            {user.email}
          </p>

          {/* Logout */}
          <form action="/auth/signout" method="POST">
            <button
              className="w-full text-left text-[12px] text-white/50
                         hover:text-aceh-red transition-colors"
            >
              Keluar →
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}