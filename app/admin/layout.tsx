import { redirect } from 'next/navigation'
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

  // 🔐 belum login
  if (!user) {
    redirect('/auth/login?redirect=/admin')
  }

  const role = user.user_metadata?.role

  // 🔐 bukan admin
  if (role !== 'admin') {
    redirect('/')
  }

  return <div>{children}</div>
}