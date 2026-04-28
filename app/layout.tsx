import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Playfair_Display, Oswald, Source_Sans_3 } from 'next/font/google'
import '@/styles/globals.css'
import Topbar from '@/components/Topbar'
import Navbar from '@/components/Navbar'
import Ticker from '@/components/Ticker'
import CategoryBar from '@/components/CategoryBar'
import Footer from '@/components/Footer'
import { getAllCategories, getBreakingNews } from '@/lib/queries'
import CookieConsent from '@/components/CookieConsent'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-head',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-label',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://berita.meureno.com'),
  title: {
    default: 'Berita Meureno – Portal Berita Aceh Terkini',
    template: '%s | Berita Meureno',
  },
  description: 'Portal berita Aceh modern, cepat, akurat, dan terpercaya. Liputan terkini dari Banda Aceh dan seluruh wilayah Aceh.',
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
  minimumScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00703C' },
    { media: '(prefers-color-scheme: dark)',  color: '#004D2A' },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [categories, breakingNews] = await Promise.all([
    getAllCategories(),
    getBreakingNews(),
  ])

  return (
    <html lang="id" className={`${playfair.variable} ${oswald.variable} ${sourceSans.variable}`}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1150834306562665"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased font-body">
        <Topbar />
        <Ticker items={breakingNews} />
        <Navbar categories={categories} />
        <CategoryBar categories={categories} />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
