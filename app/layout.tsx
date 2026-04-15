import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import Topbar from '@/components/Topbar'
import Navbar from '@/components/Navbar'
import Ticker from '@/components/Ticker'
import CategoryBar from '@/components/CategoryBar'
import Footer from '@/components/Footer'
import { getAllCategories } from '@/lib/queries'
import { getBreakingNews } from '@/lib/queries'

export const metadata: Metadata = {
  metadataBase: new URL('https://berita.meureno.com'),
  title: {
    default: 'Berita Meureno – Portal Berita Aceh Terkini',
    template: '%s | Berita Meureno',
  },
  description:
    'Portal berita Aceh modern, cepat, akurat, dan terpercaya. Liputan terkini dari Banda Aceh dan seluruh wilayah Aceh.',
  keywords: ['berita aceh', 'aceh terkini', 'banda aceh', 'gampong', 'kopi gayo'],
  authors: [{ name: 'Redaksi Berita Meureno' }],
  creator: 'PT. Meureno Media Digital',
  publisher: 'PT. Meureno Media Digital',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Berita Meureno',
    title: 'Berita Meureno – Portal Berita Aceh Terkini',
    description: 'Portal berita Aceh modern, cepat, akurat, dan terpercaya.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Berita Meureno – Portal Berita Aceh Terkini',
    description: 'Portal berita Aceh modern, cepat, akurat, dan terpercaya.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00703C',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch categories + breaking news in parallel (server-side)
  const [categories, breakingNews] = await Promise.all([
    getAllCategories(),
    getBreakingNews(),
  ])

  return (
    <html lang="id">
      <head>
        {/* Google AdSense — replace ca-pub-XXXXXXXXXXXXXXXX */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="antialiased">
        {/* ── Chrome above the fold ── */}
        <Topbar />
        <Ticker items={breakingNews} />
        <Navbar categories={categories} />
        <CategoryBar categories={categories} />

        {/* ── Page content ── */}
        <main>{children}</main>

        {/* ── Footer ── */}
        <Footer />
      </body>
    </html>
  )
}
