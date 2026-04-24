const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

async function fetcher<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

// ─── TYPES ────────────────────────────────────────────
export type Category = {
  id: string
  name: string
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
}

export type Post = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage: string | null
  author: string
  views: number
  published: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  categoryId: string | null
  category: Category | null
  tags: string[]
}

export type Comment = {
  id: string
  postId: string
  name: string
  email?: string
  content: string
  approved: boolean
  createdAt: string
}

export type BreakingNews = {
  id: string
  title: string
  url?: string
  active: boolean
  createdAt: string
}

export type PostsResponse = {
  posts: Post[]
  total: number
  page: number
  limit: number
}

// ─── POSTS ────────────────────────────────────────────
export async function getPosts(params?: {
  page?: number
  limit?: number
  category?: string
}): Promise<PostsResponse> {
  const q = new URLSearchParams()
  if (params?.page)     q.set('page', String(params.page))
  if (params?.limit)    q.set('limit', String(params.limit))
  if (params?.category) q.set('category', params.category)
  return fetcher(`/api/berita/posts?${q}`)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await fetcher(`/api/berita/posts/${slug}`)
  } catch {
    return null
  }
}

export async function getMostReadPosts(limit = 5): Promise<Post[]> {
  return fetcher(`/api/berita/posts/most-read?limit=${limit}`)
}

export async function getPostsByCategory(slug: string, limit = 12): Promise<Post[]> {
  return fetcher(`/api/berita/posts/category/${slug}?limit=${limit}`)
}

export async function getAllPostSlugs(): Promise<string[]> {
  return fetcher('/api/berita/posts/slugs')
}

// ─── CATEGORIES ───────────────────────────────────────
export async function getAllCategories(): Promise<Category[]> {
  return fetcher('/api/berita/categories')
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    return await fetcher(`/api/berita/categories/${slug}`)
  } catch {
    return null
  }
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const categories = await getAllCategories()
  return categories.map((c) => c.slug)
}

// ─── COMMENTS ─────────────────────────────────────────
export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  return fetcher(`/api/berita/comments/${postId}`)
}

export async function createComment(data: {
  postId: string
  name: string
  email?: string
  content: string
}): Promise<Comment> {
  const res = await fetch(`${API_BASE}/api/berita/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Gagal mengirim komentar')
  return res.json()
}

// ─── BREAKING NEWS ────────────────────────────────────
export async function getBreakingNews(): Promise<BreakingNews[]> {
  return fetcher('/api/berita/breaking-news')
}
