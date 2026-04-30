import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Karier | Berita Meureno',
  description: 'Bergabunglah bersama tim Berita Meureno.',
}

export default function KarierPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-head text-3xl text-ink mb-2">Karier</h1>
      <p className="text-xs text-ink-soft mb-8">Bergabung bersama kami</p>

      <div className="space-y-6">
        <section>
          <p className="text-ink-mid leading-relaxed">
            Berita Meureno membuka kesempatan bagi talenta muda Aceh yang bersemangat 
            dalam dunia jurnalistik dan media digital. Kami percaya bahwa cerita terbaik 
            tentang Aceh harus diceritakan oleh orang Aceh sendiri.
          </p>
        </section>

        <section>
          <h2 className="font-head text-xl text-ink mb-3">Posisi Terbuka</h2>
          <div className="space-y-3">
            {[
              { title: 'Jurnalis Lapangan', loc: 'Banda Aceh', type: 'Full-time' },
              { title: 'Editor Konten', loc: 'Remote', type: 'Full-time' },
              { title: 'Kontributor Daerah', loc: 'Seluruh Aceh', type: 'Freelance' },
              { title: 'Fotografer', loc: 'Banda Aceh', type: 'Part-time' },
            ].map(p => (
              <div key={p.title} className="border rounded-xl p-4 surface flex items-center justify-between">
                <div>
                  <p className="font-semibold text-ink">{p.title}</p>
                  <p className="text-xs text-ink-soft mt-0.5">{p.loc} · {p.type}</p>
                </div>
                <a href="/kontak"
                  className="text-[12px] font-semibold text-aceh-green hover:underline">
                  Lamar →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-aceh-green-light border border-aceh-green/20 rounded-xl p-5">
          <p className="text-sm font-semibold text-aceh-green-dark mb-1">📧 Kirim Lamaran</p>
          <p className="text-sm text-ink-mid">redaksi@berita.meureno.com</p>
          <p className="text-xs text-ink-soft mt-1">Sertakan CV dan portofolio tulisan</p>
        </section>
      </div>
    </main>
  )
}
