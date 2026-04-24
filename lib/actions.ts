'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { slugify } from '@/lib/utils'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

export type ActionResult = {
  success: boolean
  error?: string
}

export async function createPost(formData: FormData): Promise<ActionResult> {
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

  const slug = slugify(title) + '-' + Date.now()

  const res = await fetch(`${API}/api/berita/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title, slug, content, excerpt, author,
      featuredImage: image || null,
      categoryId: categoryId || null,
      published,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    return { success: false, error: err.message || 'Gagal menyimpan artikel.' }
  }

  revalidatePath('/')
  revalidatePath('/category/[slug]', 'page')
  redirect('/admin/posts')
}

export async function updatePost(id: string, formData: FormData): Promise<ActionResult> {
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

  const res = await fetch(`${API}/api/berita/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title, content, excerpt, author,
      featuredImage: image || null,
      categoryId: categoryId || null,
      published,
    }),
  })

  if (!res.ok) {
    return { success: false, error: 'Gagal memperbarui artikel.' }
  }

  revalidatePath('/')
  revalidatePath('/news/[slug]', 'page')
  revalidatePath('/category/[slug]', 'page')
  redirect('/admin/posts')
}

export async function deletePost(id: string): Promise<ActionResult> {
  const res = await fetch(`${API}/api/berita/posts/${id}`, { method: 'DELETE' })
  if (!res.ok) return { success: false, error: 'Gagal menghapus artikel.' }
  revalidatePath('/')
  return { success: true }
}

export async function approveComment(id: string): Promise<ActionResult> {
  const res = await fetch(`${API}/api/berita/comments/${id}/approve`, { method: 'PATCH' })
  if (!res.ok) return { success: false, error: 'Gagal approve komentar.' }
  revalidatePath('/news/[slug]', 'page')
  return { success: true }
}

export async function deleteComment(id: string): Promise<ActionResult> {
  const res = await fetch(`${API}/api/berita/comments/${id}`, { method: 'DELETE' })
  if (!res.ok) return { success: false, error: 'Gagal menghapus komentar.' }
  revalidatePath('/news/[slug]', 'page')
  return { success: true }
}

export async function toggleBreakingNews(id: string, active: boolean): Promise<ActionResult> {
  const res = await fetch(`${API}/api/berita/breaking-news/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ active }),
  })
  if (!res.ok) return { success: false, error: 'Gagal update breaking news.' }
  revalidatePath('/', 'layout')
  return { success: true }
}
