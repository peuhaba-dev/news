import { createServerSupabaseClient } from './supabase'
import type { Post, Category, Comment, BreakingNews } from '@/types'

// ────────────────────────────────────────────
// POSTS
// ────────────────────────────────────────────

export async function getLatestPosts(limit = 10): Promise<Post[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('getLatestPosts error:', error.message)
    return []
  }
  return (data as Post[]) ?? []
}

export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .order('views', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('getFeaturedPosts error:', error.message)
    return []
  }
  return (data as Post[]) ?? []
}

export async function getMostReadPosts(limit = 5): Promise<Post[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .order('views', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('getMostReadPosts error:', error.message)
    return []
  }
  return (data as Post[]) ?? []
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('getPostBySlug error:', error.message)
    return null
  }

  // Increment views (fire-and-forget)
  supabase
    .from('posts')
    .update({ views: (data.views ?? 0) + 1 })
    .eq('slug', slug)
    .then(() => {})

  return data as Post
}

export async function getPostsByCategory(categorySlug: string, limit = 12): Promise<Post[]> {
  const supabase = await createServerSupabaseClient()

  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (!category) return []

  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('category_id', category.id)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('getPostsByCategory error:', error.message)
    return []
  }
  return (data as Post[]) ?? []
}

export async function getRelatedPosts(categoryId: string, excludeId: string, limit = 4): Promise<Post[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('category_id', categoryId)
    .neq('id', excludeId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data as Post[]) ?? []
}

export async function getAllPostSlugs(): Promise<string[]> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('posts').select('slug')
  return data?.map((p) => p.slug) ?? []
}

// ────────────────────────────────────────────
// CATEGORIES
// ────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('getAllCategories error:', error.message)
    return []
  }
  return data ?? []
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('categories').select('slug')
  return data?.map((c) => c.slug) ?? []
}

// ────────────────────────────────────────────
// COMMENTS
// ────────────────────────────────────────────

export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: false })

  if (error) return []
  return data ?? []
}

// ────────────────────────────────────────────
// BREAKING NEWS
// ────────────────────────────────────────────

export async function getBreakingNews(): Promise<BreakingNews[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('breaking_news')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(8)

  if (error) return []
  return data ?? []
}
