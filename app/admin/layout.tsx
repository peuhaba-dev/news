import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const ADMIN_EMAILS = [
  'admin@meureno.com', // ganti dengan email kamu
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 🔐 belum login
  if (!user) {
    redirect('/auth/login?redirect=/admin')
  }

  // 🔐 bukan admin
  if (!ADMIN_EMAILS.includes(user.email ?? '')) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#111827] text-white shrink-0 flex flex-col">
        <div className="px-5 py-4 border-b border-white/10">
          <Link href="/" className="font-label text-[16px] font-bold text-aceh-green">
            Berita Meureno
          </Link>
          <p className="text-[10px] text-white/40 mt-1 uppercase">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link href="/admin">📊 Dashboard</Link>
          <Link href="/admin/posts">📰 Artikel</Link>
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-xs text-white/40">{user.email}</p>

          <form action="/auth/signout" method="POST">
            <button className="text-red-400 text-sm mt-2">Keluar</button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}