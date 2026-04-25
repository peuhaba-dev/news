import type { MetadataRoute } from 'next'
import { getAllPostSlugs, getAllCategorySlugs } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = 'https://berita.meureno.com'
  const now  = new Date()

  const [postSlugs, categorySlugs] = await Promise.all([
    getAllPostSlugs(),
    getAllCategorySlugs(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'hourly',  priority: 1.0 },
    { url: `${BASE}/tentang`,            lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/kontak`,             lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/kebijakan-privasi`,  lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE}/disclaimer`,         lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ]

  const postRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${BASE}/news/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${BASE}/category/${slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...postRoutes]
}
