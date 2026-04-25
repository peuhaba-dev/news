import type { Metadata } from 'next'
import KontakClient from './KontakClient'

export const metadata: Metadata = {
  title: 'Hubungi Kami – Meureno News',
  description:
    'Hubungi redaksi Meureno News untuk pertanyaan, saran, kerja sama, atau pengaduan. Portal Berita Aceh terpercaya.',
  alternates: { canonical: '/kontak' },
}

export default function KontakPage() {
  return <KontakClient />
}
