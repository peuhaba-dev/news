'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { slugify } from '@/lib/utils'
import type { Database } from '@/lib/database.types'

/** Structured result for server actions */
export type ActionResult = {
  success: boolean
  error?: string
}

// Helper type for typed inserts/updates
type PostInsert = Database['public']['Tables']['posts']['Insert']
type PostUpdate = Database['public']['Tables']['posts']['Update']

/* ─── Create Post ─────────────────────────────────── */
export async function createPost(formData: FormData): Promise<ActionResult> {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Sesi login tidak valid. Silakan login ulang.' }
  }

  const title      = (formData.get('title') as string)?.trim()
  const content    = (formData.get('content') as string)?.trim()
  const excerpt    = (formData.get('excerpt') as string)?.trim()
  const categoryId = (formData.get('category_id') as string)?.trim()
  const author     = (formData.get('author') as string)?.trim()
  const image      = (formData.get('featured_image') as string)?.trim()
  const published  = formData.get('published') === 'true'

  // Validate required fields
  if (!title || !content || !excerpt || !author) {
    return { success: false, error: 'Judul, konten, ringkasan, dan penulis wajib diisi.' }
  }

  const slug = slugify(title) + '-' + Date.now()

  const insertData: PostInsert = {
    title,
    slug,
    content,
    excerpt,
    category_id: categoryId || null,
    author,
    featured_image: image || null,
    published,
  }

  const { error: insertError } = await (supabase as any)
    .from('posts')
    .insert(insertData)

  if (insertError) {
    console.error('[createPost] Supabase insert error:', insertError)
    return {
      success: false,
      error: `Gagal menyimpan artikel: ${insertError.message}`,
    }
  }

  revalidatePath('/')
  revalidatePath('/category/[slug]', 'page')
  redirect('/admin/posts')
}

/* ─── Update Post ─────────────────────────────────── */
export async function updatePost(id: string, formData: FormData): Promise<ActionResult> {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Sesi login tidak valid. Silakan login ulang.' }
  }

  const title      = (formData.get('title') as string)?.trim()
  const content    = (formData.get('content') as string)?.trim()
  const excerpt    = (formData.get('excerpt') as string)?.trim()
  const categoryId = (formData.get('category_id') as string)?.trim()
  const author     = (formData.get('author') as string)?.trim()
  const image      = (formData.get('featured_image') as string)?.trim()
  const published  = formData.get('published') === 'true'

  if (!title || !content || !excerpt || !author) {
    return { success: false, error: 'Judul, konten, ringkasan, dan penulis wajib diisi.' }
  }

  const { data: existing } = await (supabase as any)
    .from('posts')
    .select('slug')
    .eq('id', id)
    .single()

  const updateData: PostUpdate = {
    title,
    content,
    excerpt,
    category_id: categoryId || null,
    author,
    featured_image: image || null,
    published,
  }

  const { error: updateError } = await (supabase as any)
    .from('posts')
    .update(updateData)
    .eq('id', id)

  if (updateError) {
    console.error('[updatePost] Supabase update error:', updateError)
    return {
      success: false,
      error: `Gagal memperbarui artikel: ${updateError.message}`,
    }
  }

  revalidatePath('/')
  if (existing?.slug) revalidatePath(`/news/${existing.slug}`)
  revalidatePath('/category/[slug]', 'page')
  redirect('/admin/posts')
}

/* ─── Delete Post ─────────────────────────────────── */
export async function deletePost(id: string): Promise<ActionResult> {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Sesi login tidak valid.' }
  }

  const { data: existing } = await (supabase as any)
    .from('posts')
    .select('slug')
    .eq('id', id)
    .single()

  const { error: deleteError } = await (supabase as any)
    .from('posts')
    .delete()
    .eq('id', id)

  if (deleteError) {
    console.error('[deletePost] Supabase delete error:', deleteError)
    return {
      success: false,
      error: `Gagal menghapus artikel: ${deleteError.message}`,
    }
  }

  revalidatePath('/')
  if (existing?.slug) revalidatePath(`/news/${existing.slug}`)
  revalidatePath('/category/[slug]', 'page')
  return { success: true }
}

/* ─── Approve Comment ──────────────────────────────── */
export async function approveComment(id: string): Promise<ActionResult> {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await (supabase as any)
    .from('comments')
    .update({ approved: true })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/news/[slug]', 'page')
  return { success: true }
}

/* ─── Delete Comment ───────────────────────────────── */
export async function deleteComment(id: string): Promise<ActionResult> {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await (supabase as any)
    .from('comments')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/news/[slug]', 'page')
  return { success: true }
}

/* ─── Toggle Breaking News ─────────────────────────── */
export async function toggleBreakingNews(id: string, active: boolean): Promise<ActionResult> {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await (supabase as any)
    .from('breaking_news')
    .update({ active })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}