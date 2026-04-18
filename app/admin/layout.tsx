import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'

async function getRole(userId: string) {
  const supabase = await createServerSupabaseClient()

  const { data } = await supabase
    .from('berita.user_roles')
    .select('role')
    .eq('id', userId)
    .single()

  return data?.role ?? null
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 🔐 BELUM LOGIN
  if (!user) {
    redirect('/auth/login?redirect=/admin')
  }

  // 🔐 CEK ROLE
  const role = await getRole(user.id)

  if (role !== 'admin') {
    redirect('/') // bukan admin
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#111827] text-white shrink-0 flex flex-col">
        <div className="px-5 py-4 border-b border-white/10">
          <Link href="/" className="font-label text-[16px] font-bold text-aceh-green">
            Berita Meureno
          </Link>
          <p className="text-[10px] text-white/40 mt-0.5 uppercase">Admin Panel</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link href="/admin">📊 Dashboard</Link>
          <Link href="/admin/posts">📰 Artikel</Link>
          <Link href="/admin/posts/new">➕ Tulis</Link>
          <Link href="/admin/categories">🏷 Kategori</Link>
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-[11px] text-white/40 truncate">{user.email}</p>
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}