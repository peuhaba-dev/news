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

  if (!user) redirect('/auth/login')

  const role = user.user_metadata?.role
  if (role !== 'admin') redirect('/')

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0f172a] text-white flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <h1 className="text-lg font-bold text-aceh-green">
            CMS Meureno
          </h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          <Link href="/admin" className="block px-3 py-2 rounded hover:bg-white/10">📊 Dashboard</Link>
          <Link href="/admin/posts" className="block px-3 py-2 rounded hover:bg-white/10">📰 Artikel</Link>
          <Link href="/admin/posts/new" className="block px-3 py-2 rounded hover:bg-white/10">➕ Tulis Artikel</Link>
          <Link href="/admin/categories" className="block px-3 py-2 rounded hover:bg-white/10">🏷 Kategori</Link>
          <Link href="/admin/comments" className="block px-3 py-2 rounded hover:bg-white/10">💬 Komentar</Link>
          <Link href="/admin/breaking" className="block px-3 py-2 rounded hover:bg-white/10">📢 Breaking</Link>
        </nav>

        <div className="p-4 border-t border-white/10 text-xs text-white/50">
          {user.email}
          <form action="/auth/signout" method="POST">
            <button className="block mt-2 text-red-400 hover:underline">
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
          <h2 className="font-semibold text-gray-700">Admin Panel</h2>
        </header>

        {/* CONTENT */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}