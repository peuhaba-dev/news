import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Redaksi | Berita Meureno',
  description: 'Mengenal tim redaksi Berita Meureno, portal berita Aceh terpercaya.',
}

const TEAM = [
  { name: 'Muhammad Nur', role: 'Pemimpin Redaksi', desc: 'Bertanggung jawab atas seluruh konten editorial dan arah pemberitaan Berita Meureno.' },
  { name: 'Tim Redaksi', role: 'Editor', desc: 'Memastikan setiap artikel yang dipublikasikan akurat, berimbang, dan sesuai kaidah jurnalistik.' },
  { name: 'Kontributor Daerah', role: 'Jurnalis Lapangan', desc: 'Meliput berita langsung dari berbagai kabupaten dan kota di seluruh Provinsi Aceh.' },
]

export default function RedaksiPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-head text-3xl text-ink mb-2">Redaksi</h1>
      <p className="text-xs text-ink-soft mb-8">Tim editorial Berita Meureno</p>

      <div className="space-y-6 mb-10">
        <p className="text-ink-mid leading-relaxed">
          Berita Meureno dikelola oleh tim jurnalis dan editor yang berdedikasi dalam menyajikan informasi akurat, berimbang, dan terpercaya tentang Aceh. Kami berkomitmen pada standar jurnalistik tertinggi dan kode etik pers Indonesia.
        </p>
      </div>

      <div className="space-y-4 mb-10">
        {TEAM.map(member => (
          <div key={member.name} className="border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-aceh-green flex items-center justify-center text-white font-bold text-lg shrink-0">
                {member.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-ink">{member.name}</p>
                <p className="text-xs text-aceh-green font-label font-bold tracking-wider">{member.role}</p>
              </div>
            </div>
            <p className="text-sm text-ink-mid leading-relaxed">{member.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-aceh-green-light border border-aceh-green/20 rounded-xl p-5">
        <p className="text-sm font-semibold text-aceh-green-dark mb-2">Pedoman Redaksi</p>
        <ul className="text-sm text-ink-mid space-y-1.5">
          <li>Mengutamakan akurasi dan verifikasi fakta</li>
          <li>Berimbang dan tidak memihak</li>
          <li>Menghormati privasi dan hak narasumber</li>
          <li>Mengikuti Kode Etik Jurnalistik Indonesia</li>
          <li>Terbuka terhadap koreksi dan klarifikasi</li>
        </ul>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-ink-soft mb-3">Ada pertanyaan atau pengaduan konten?</p>
        <a href="/kontak"
          className="inline-block bg-aceh-green text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-aceh-green-dark transition-colors">
          Hubungi Redaksi
        </a>
      </div>
    </main>
  )
}
