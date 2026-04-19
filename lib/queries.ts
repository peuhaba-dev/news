import { createStaticSupabaseClient } from './supabase-static'
import { createServerSupabaseClient } from './supabase-server'
import type { Post, Category, Comment, BreakingNews } from '@/types'

// ────────────────────────────────────────────
// POSTS
// ────────────────────────────────────────────

export async function getLatestPosts(limit = 10): Promise<Post[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await (supabase as any)
    .from('posts')
    .select('*, category:categories(*)')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[getLatestPosts]', error.message)
    return []
  }
  return (data as Post[]) ?? []
}

export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await (supabase as any)
    .from('posts')
    .select('*, category:categories(*)')
    .eq('published', true)
    .order('views', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[getFeaturedPosts]', error.message)
    return []
  }
  return (data as Post[]) ?? []
}

export async function getMostReadPosts(limit = 5): Promise<Post[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await (supabase as any)
    .from('posts')
    .select('*, category:categories(*)')
    .eq('published', true)
    .order('views', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[getMostReadPosts]', error.message)
    return []
  }
  return (data as Post[]) ?? []
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await (supabase as any)
    .from('posts')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('[getPostBySlug]', error.message)
    return null
  }

  // Increment views (fire-and-forget, don't block render)
  ;(supabase as any)
    .from('posts')
    .update({ views: ((data as Post).views ?? 0) + 1 })
    .eq('slug', slug)
    .then(() => {})

  return data as Post
}

export async function getPostsByCategory(categorySlug: string, limit = 12): Promise<Post[]> {
  const supabase = await createServerSupabaseClient()

  const { data: category } = await (supabase as any)
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (!category) return []

  const { data, error } = await (supabase as any)
    .from('posts')
    .select('*, category:categories(*)')
    .eq('category_id', category.id)
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[getPostsByCategory]', error.message)
    return []
  }
  return (data as Post[]) ?? []
}

export async function getRelatedPosts(categoryId: string | null, excludeId: string, limit = 4): Promise<Post[]> {
  if (!categoryId) return []

  const supabase = await createServerSupabaseClient()
  const { data, error } = await (supabase as any)
    .from('posts')
    .select('*, category:categories(*)')
    .eq('category_id', categoryId)
    .neq('id', excludeId)
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data as Post[]) ?? []
}

export async function getAllPostSlugs(): Promise<string[]> {
  const supabase = createStaticSupabaseClient()
  if (!supabase) return []
  const { data } = await (supabase as any)
    .from('posts')
    .select('slug')
    .eq('published', true)
  return data?.map((p: any) => p.slug) ?? []
}

// ────────────────────────────────────────────
// CATEGORIES
// ────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await (supabase as any)
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('[getAllCategories]', error.message)
    return []
  }
  return (data ?? []) as Category[]
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await (supabase as any)
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data as Category
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const supabase = createStaticSupabaseClient()
  if (!supabase) return []
  const { data } = await (supabase as any).from('categories').select('slug')
  return data?.map((c: any) => c.slug) ?? []
}

// ────────────────────────────────────────────
// COMMENTS
// ────────────────────────────────────────────

export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await (supabase as any)
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .eq('approved', true)
    .order('created_at', { ascending: false })

  if (error) return []
  return (data ?? []) as Comment[]
}

// ────────────────────────────────────────────
// BREAKING NEWS
// ────────────────────────────────────────────

export async function getBreakingNews(): Promise<BreakingNews[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await (supabase as any)
    .from('breaking_news')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(8)

  if (error) return []
  return (data ?? []) as BreakingNews[]
}