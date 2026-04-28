import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ketentuan Penggunaan | Berita Meureno',
  description: 'Ketentuan penggunaan layanan Berita Meureno.',
}

export default function KetentuanPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-head text-3xl text-ink mb-2">Ketentuan Penggunaan</h1>
      <p className="text-xs text-ink-soft mb-8">Terakhir diperbarui: April 2026</p>

      <div className="prose prose-sm max-w-none text-ink space-y-6">
        <section>
          <h2 className="font-head text-xl text-ink mb-2">1. Penerimaan Ketentuan</h2>
          <p className="text-ink-mid leading-relaxed">Dengan mengakses dan menggunakan situs berita.meureno.com, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan penggunaan ini. Jika Anda tidak menyetujui ketentuan ini, harap hentikan penggunaan situs kami.</p>
        </section>

        <section>
          <h2 className="font-head text-xl text-ink mb-2">2. Penggunaan Konten</h2>
          <p className="text-ink-mid leading-relaxed">Seluruh konten yang tersedia di Berita Meureno, termasuk teks, gambar, grafis, dan multimedia, dilindungi oleh hak cipta. Pengguna diperbolehkan membaca dan berbagi tautan artikel, namun dilarang menyalin, mendistribusikan, atau mempublikasikan ulang konten tanpa izin tertulis dari redaksi.</p>
        </section>

        <section>
          <h2 className="font-head text-xl text-ink mb-2">3. Komentar dan Interaksi</h2>
          <p className="text-ink-mid leading-relaxed">Pengguna yang memberikan komentar bertanggung jawab penuh atas isi komentar tersebut. Berita Meureno berhak menghapus komentar yang mengandung ujaran kebencian, SARA, hoaks, atau melanggar hukum yang berlaku di Indonesia.</p>
        </section>

        <section>
          <h2 className="font-head text-xl text-ink mb-2">4. Tautan Pihak Ketiga</h2>
          <p className="text-ink-mid leading-relaxed">Situs ini mungkin memuat tautan ke situs pihak ketiga. Berita Meureno tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik situs pihak ketiga tersebut.</p>
        </section>

        <section>
          <h2 className="font-head text-xl text-ink mb-2">5. Penafian Konten</h2>
          <p className="text-ink-mid leading-relaxed">Berita Meureno berusaha menyajikan informasi yang akurat dan terkini. Namun kami tidak menjamin keakuratan, kelengkapan, atau kesesuaian informasi untuk tujuan tertentu. Konten disediakan "sebagaimana adanya" tanpa jaminan apa pun.</p>
        </section>

        <section>
          <h2 className="font-head text-xl text-ink mb-2">6. Iklan</h2>
          <p className="text-ink-mid leading-relaxed">Berita Meureno menampilkan iklan dari pihak ketiga termasuk Google AdSense. Kami tidak bertanggung jawab atas konten iklan yang ditampilkan. Iklan yang muncul tidak berarti kami mendukung produk atau layanan tersebut.</p>
        </section>

        <section>
          <h2 className="font-head text-xl text-ink mb-2">7. Perubahan Ketentuan</h2>
          <p className="text-ink-mid leading-relaxed">Berita Meureno berhak mengubah ketentuan penggunaan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Perubahan berlaku segera setelah dipublikasikan di halaman ini.</p>
        </section>

        <section>
          <h2 className="font-head text-xl text-ink mb-2">8. Hukum yang Berlaku</h2>
          <p className="text-ink-mid leading-relaxed">Ketentuan ini diatur oleh hukum Republik Indonesia. Segala sengketa yang timbul akan diselesaikan melalui jalur hukum yang berlaku di Indonesia.</p>
        </section>

        <section>
          <h2 className="font-head text-xl text-ink mb-2">9. Kontak</h2>
          <p className="text-ink-mid leading-relaxed">Jika Anda memiliki pertanyaan mengenai ketentuan penggunaan ini, silakan hubungi kami melalui halaman <a href="/kontak" className="text-aceh-green hover:underline">Kontak</a>.</p>
        </section>
      </div>
    </main>
  )
}
