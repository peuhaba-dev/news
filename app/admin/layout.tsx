import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'

async function getUserRole(userId: string) {
  const supabase = await createServerSupabaseClient()

  const { data } = await supabase
    .from('berita.user_roles')
    .select('role')
    .eq('id', userId)
    .single()

  return (data as any)?.role
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 🔐 belum login
  if (!user) redirect('/auth/login')

  // 🔐 cek role
  const role = await getUserRole(user.id)

  if (role !== 'admin' && role !== 'editor') {
    redirect('/') // bukan admin → tendang keluar
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#111827] text-white shrink-0 flex flex-col">
        <div className="px-5 py-4 border-b border-white/10">
          <Link href="/" className="font-label text-[16px] font-bold text-aceh-green">
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
              className="block px-3 py-2 text-[13px] text-white/70 hover:text-white hover:bg-white/10 rounded"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-[11px] text-white/40 truncate mb-2">
            {user.email}
          </p>

          {/* 🔥 Logout pakai client */}
          <form action="/auth/login" method="GET">
            <button className="w-full text-left text-[12px] text-white/50 hover:text-aceh-red">
              Keluar →
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
