/**
 * queries.ts — wrapper API Meureno
 * Mapping camelCase (API) → snake_case (komponen lama)
 */

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { next: { revalidate: 60 } })
  if (!res.ok) return [] as unknown as T
  return res.json()
}

// ─── MAPPER ───────────────────────────────────────────
function mapPost(p: any) {
  return {
    ...p,
    featured_image: p.featuredImage ?? null,
    created_at:     p.createdAt,
    updated_at:     p.updatedAt,
    category_id:    p.categoryId ?? null,
    category: p.category ? {
      ...p.category,
      created_at: p.category.createdAt,
    } : null,
  }
}

function mapCategory(c: any) {
  return { ...c, created_at: c.createdAt }
}

// ─── POSTS ────────────────────────────────────────────
export async function getLatestPosts(limit = 10) {
  const data = await get<any>(`/api/berita/posts?limit=${limit}`)
  return (data.posts ?? []).map(mapPost)
}

export async function getFeaturedPosts(limit = 3) {
  const data = await get<any>(`/api/berita/posts?limit=${limit}`)
  return (data.posts ?? []).map(mapPost)
}

export async function getMostReadPosts(limit = 5) {
  const data = await get<any[]>(`/api/berita/posts/most-read?limit=${limit}`)
  return (Array.isArray(data) ? data : []).map(mapPost)
}

export async function getPostBySlug(slug: string) {
  const data = await get<any>(`/api/berita/posts/${slug}`)
  if (!data || data.error) return null
  return mapPost(data)
}

export async function getRelatedPosts(
  categoryId: string | null,
  excludeId: string,
  limit = 4
) {
  if (!categoryId) return []
  const data = await get<any>(`/api/berita/posts?limit=20`)
  const posts = (data.posts ?? [])
    .filter((p: any) => p.categoryId === categoryId && p.id !== excludeId)
    .slice(0, limit)
  return posts.map(mapPost)
}

export async function getAllPostSlugs(): Promise<string[]> {
  const data = await get<string[]>('/api/berita/posts/slugs')
  return Array.isArray(data) ? data : []
}

export async function getPostsByCategory(slug: string, limit = 12) {
  const data = await get<any[]>(`/api/berita/posts/category/${slug}?limit=${limit}`)
  return (Array.isArray(data) ? data : []).map(mapPost)
}

// ─── CATEGORIES ───────────────────────────────────────
export async function getAllCategories() {
  const data = await get<any[]>('/api/berita/categories')
  return (Array.isArray(data) ? data : []).map(mapCategory)
}

export async function getCategoryBySlug(slug: string) {
  const data = await get<any>(`/api/berita/categories/${slug}`)
  if (!data || data.error) return null
  return mapCategory(data)
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const data = await get<any[]>('/api/berita/categories')
  return (Array.isArray(data) ? data : []).map((c: any) => c.slug)
}

// ─── COMMENTS ─────────────────────────────────────────
export async function getCommentsByPost(postId: string) {
  const data = await get<any[]>(`/api/berita/comments/${postId}`)
  return Array.isArray(data) ? data : []
}

// ─── BREAKING NEWS ────────────────────────────────────
export async function getBreakingNews() {
  const data = await get<any[]>('/api/berita/breaking-news')
  return Array.isArray(data) ? data : []
}

// ─── AUTHORS ──────────────────────────────────────────
export async function getAuthorBySlug(slug: string) {
  const data = await get<any>(`/api/berita/authors/${slug}`)
  if (!data || data.error) return null
  return data
}

export async function getPostsByAuthor(authorSlug: string, limit = 20) {
  const data = await get<any>(`/api/berita/posts?limit=${limit}`)
  const posts = (data.posts ?? []).filter(
    (p: any) => p.authorDetail?.slug === authorSlug || p.author?.toLowerCase().replace(/\s+/g, '-') === authorSlug
  )
  return posts.map(mapPost)
}
