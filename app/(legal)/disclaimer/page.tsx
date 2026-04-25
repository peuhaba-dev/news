import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer Meureno News mengenai batasan tanggung jawab, hak cipta, dan penggunaan konten portal berita.',
  alternates: { canonical: '/disclaimer' },
}

export default function DisclaimerPage() {
  return (
    <article>
      <nav className="text-[12px] text-ink-soft mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-aceh-green">Beranda</Link>
        <span>›</span>
        <span className="text-ink">Disclaimer</span>
      </nav>

      <h1 className="font-head text-[32px] md:text-[38px] font-black text-ink leading-[1.2] mb-4">
        Disclaimer
      </h1>
      <p className="text-[13px] text-ink-soft mb-8">Terakhir diperbarui: 25 April 2026</p>

      <div className="bg-aceh-gold-light border-l-4 border-aceh-gold rounded-r-lg p-4 mb-8">
        <p className="text-[14px] text-ink-mid">
          Dengan mengakses dan menggunakan portal <strong>Meureno News</strong> (berita.meureno.com),
          Anda menyetujui ketentuan disclaimer berikut.
        </p>
      </div>

      <div className="space-y-6 text-[16px] leading-relaxed text-ink-mid">
        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">1. Akurasi Informasi</h2>
          <p>
            Meureno News berupaya menyajikan berita yang akurat dan terkini. Namun, kami tidak memberikan
            jaminan bahwa seluruh informasi di portal ini bebas dari kesalahan. Informasi disediakan
            &quot;sebagaimana adanya&quot; tanpa jaminan dalam bentuk apapun.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">2. Batasan Tanggung Jawab</h2>
          <p>
            Meureno News dan PT. Meureno Media Digital tidak bertanggung jawab atas kerugian yang timbul
            dari penggunaan atau ketidakmampuan menggunakan informasi di portal ini, termasuk keputusan
            yang diambil berdasarkan konten yang dipublikasikan.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">3. Hak Cipta</h2>
          <p>
            Seluruh konten di Meureno News, termasuk teks, gambar, grafis, logo, dan tata letak,
            dilindungi oleh hak cipta. Reproduksi, distribusi, atau penggunaan ulang tanpa izin tertulis
            dari redaksi dilarang keras.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">4. Tautan Eksternal</h2>
          <p>
            Portal kami mungkin memuat tautan ke situs web pihak ketiga. Kami tidak memiliki kendali atas
            konten situs-situs tersebut dan tidak bertanggung jawab atas isi atau kebijakan privasi mereka.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">5. Konten Iklan</h2>
          <p>
            Iklan yang ditampilkan di Meureno News, termasuk melalui Google AdSense, merupakan tanggung jawab
            pengiklan masing-masing. Meureno News tidak menjamin atau mendukung produk/layanan yang diiklankan.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">6. Komentar Pengguna</h2>
          <p>
            Komentar yang dikirim oleh pengguna merupakan pendapat pribadi dan tidak mencerminkan
            pandangan redaksi Meureno News. Kami berhak menghapus komentar yang melanggar norma.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">7. Perubahan Disclaimer</h2>
          <p>
            Kami berhak mengubah disclaimer ini sewaktu-waktu tanpa pemberitahuan sebelumnya.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">8. Hubungi Kami</h2>
          <div className="bg-surface border border-border rounded-lg p-4">
            <p className="font-semibold text-ink">Meureno News – Portal Berita Aceh</p>
            <p className="mt-1">Email: <a href="mailto:redaksi@meureno.com" className="text-aceh-green hover:underline font-semibold">redaksi@meureno.com</a></p>
          </div>
        </section>
      </div>
    </article>
  )
}
