import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pasang Iklan | Berita Meureno',
  description: 'Jangkau pembaca berita Aceh dengan iklan di Berita Meureno.',
}

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

interface Ad {
  id: string
  title: string
  imageUrl: string
  linkUrl?: string
  position: string
}

async function getAds(): Promise<Ad[]> {
  try {
    const res = await fetch(`${API}/api/berita/ads`, { next: { revalidate: 300 } })
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch { return [] }
}

const POSITION_LABEL: Record<string, string> = {
  'sidebar': 'Sidebar',
  'banner-top': 'Banner Atas',
  'banner-bottom': 'Banner Bawah',
  'inline': 'Inline Artikel',
}

export default async function IklanPage() {
  const ads = await getAds()

  return (
    <main className="max-w-portal mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-head text-3xl sm:text-4xl text-ink mb-3">Pasang Iklan</h1>
        <p className="text-ink-mid max-w-xl mx-auto text-sm leading-relaxed">
          Jangkau ribuan pembaca berita Aceh setiap harinya. Kami menyediakan berbagai
          pilihan penempatan iklan yang efektif dan terjangkau.
        </p>
        <a href="mailto:iklan@meureno.com"
          className="inline-block mt-4 bg-aceh-green text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-aceh-green-dark transition-colors">
          Hubungi Kami
        </a>
      </div>

      {/* Paket iklan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {Object.entries(POSITION_LABEL).map(([key, label]) => (
          <div key={key} className="border rounded-xl p-5 text-center surface">
            <p className="font-label text-xs tracking-widest text-aceh-green mb-2">PAKET</p>
            <p className="font-head text-lg text-ink mb-1">{label}</p>
            <p className="text-xs text-ink-soft">Hubungi kami untuk info harga</p>
          </div>
        ))}
      </div>

      {/* Iklan aktif saat ini */}
      {ads.length > 0 && (
        <div>
          <h2 className="font-head text-2xl text-ink mb-6">Iklan Saat Ini</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map(ad => (
              <div key={ad.id} className="border rounded-xl overflow-hidden surface">
                <img src={ad.imageUrl} alt={ad.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="font-semibold text-sm text-ink">{ad.title}</p>
                  <p className="text-xs text-ink-soft mt-1">
                    {POSITION_LABEL[ad.position] ?? ad.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
