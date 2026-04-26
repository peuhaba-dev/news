import type { MetadataRoute } from 'next'
import { getAllPostSlugs, getAllCategorySlugs } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = 'https://berita.meureno.com'

  const [posts, categories] = await Promise.all([
    getAllPostSlugs(), // pastikan include created_at / updated_at
    getAllCategorySlugs(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'hourly', priority: 1.0 },
    { url: `${BASE}/tentang`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/kontak`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/redaksi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/iklan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${BASE}/news/${post.slug}`,
    lastModified: new Date(post.updated_at || post.created_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((slug: string) => ({
    url: `${BASE}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.6,
  }))

  return [...staticRoutes, ...categoryRoutes, ...postRoutes]
}