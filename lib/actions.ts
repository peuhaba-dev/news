'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { slugify } from '@/lib/utils'

/* ─── Create Post ─────────────────────────────────── */
export async function createPost(formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title     = formData.get('title')     as string
  const content   = formData.get('content')   as string
  const excerpt   = formData.get('excerpt')   as string
  const categoryId = formData.get('category_id') as string
  const author    = formData.get('author')    as string
  const image     = formData.get('featured_image') as string
  const published = formData.get('published') === 'true'

  const slug = slugify(title) + '-' + Date.now()

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title,
      slug,
      content,
      excerpt,
      category_id: categoryId || null,
      author,
      featured_image: image || null,
      published,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/category/[slug]', 'page')
  redirect(`/admin/posts`)
}

/* ─── Update Post ─────────────────────────────────── */
export async function updatePost(id: string, formData: FormData) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title     = formData.get('title')     as string
  const content   = formData.get('content')   as string
  const excerpt   = formData.get('excerpt')   as string
  const categoryId = formData.get('category_id') as string
  const author    = formData.get('author')    as string
  const image     = formData.get('featured_image') as string
  const published = formData.get('published') === 'true'

  const { data: existing } = await supabase
    .from('posts')
    .select('slug')
    .eq('id', id)
    .single()

  const { error } = await supabase
    .from('posts')
    .update({
      title,
      content,
      excerpt,
      category_id: categoryId || null,
      author,
      featured_image: image || null,
      published,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/')
  if (existing?.slug) revalidatePath(`/news/${existing.slug}`)
  revalidatePath('/category/[slug]', 'page')
  redirect('/admin/posts')
}

/* ─── Delete Post ─────────────────────────────────── */
export async function deletePost(id: string) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { data: existing } = await supabase
    .from('posts')
    .select('slug')
    .eq('id', id)
    .single()

  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/')
  if (existing?.slug) revalidatePath(`/news/${existing.slug}`)
  revalidatePath('/category/[slug]', 'page')
}

/* ─── Approve Comment ──────────────────────────────── */
export async function approveComment(id: string) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  await supabase.from('comments').update({ approved: true }).eq('id', id)
  revalidatePath('/news/[slug]', 'page')
}

/* ─── Delete Comment ───────────────────────────────── */
export async function deleteComment(id: string) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  await supabase.from('comments').delete().eq('id', id)
  revalidatePath('/news/[slug]', 'page')
}

/* ─── Toggle Breaking News ─────────────────────────── */
export async function toggleBreakingNews(id: string, active: boolean) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  await supabase.from('breaking_news').update({ active }).eq('id', id)
  revalidatePath('/', 'layout')
}
