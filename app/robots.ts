import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const BASE = 'https://berita.meureno.com'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/auth/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/auth/'],
        crawlDelay: 1,
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
