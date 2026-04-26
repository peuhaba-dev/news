import type { MetadataRoute } from 'next'
import { getAllPostSlugs, getAllCategorySlugs } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = 'https://berita.meureno.com'
  const now = new Date()

  let posts: any[] = []
  let categories: string[] = []

  try {
    ;[posts, categories] = await Promise.all([
      getAllPostSlugs(),
      getAllCategorySlugs(),
    ])
  } catch {}

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'hourly', priority: 1.0 },
    { url: `${BASE}/tentang`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/kontak`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/redaksi`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/iklan`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post: any) => {
    const raw = post.updated_at || post.created_at
    const date = raw ? new Date(raw) : now
    return {
      url: `${BASE}/news/${post.slug}`,
      lastModified: isNaN(date.getTime()) ? now : date,
      changeFrequency: 'weekly',
      priority: 0.7,
    }
  })

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((slug: string) => ({
    url: `${BASE}/category/${slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...postRoutes]
}
