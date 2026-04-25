import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer dan ketentuan penggunaan konten Berita Meureno.',
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-10">
        <span className="inline-block bg-aceh-green text-white font-label text-[11px] tracking-[1.5px] px-3 py-1 rounded-[3px] uppercase mb-4">
          Legal
        </span>
        <h1 className="font-head text-[32px] sm:text-[40px] font-black text-ink leading-[1.2] mb-4">
          Disclaimer
        </h1>
        <p className="text-[14px] text-ink-soft">Terakhir diperbarui: 25 April 2026</p>
      </div>

      <div className="space-y-8 text-[15px] text-ink-mid leading-relaxed">
        {[
          {
            title: '1. Akurasi Informasi',
            content: `Berita Meureno berupaya menyajikan informasi yang akurat dan terkini. Namun, kami tidak menjamin keakuratan, kelengkapan, atau keandalan informasi yang disajikan. Informasi dapat berubah tanpa pemberitahuan sebelumnya. Pembaca disarankan untuk memverifikasi informasi penting dari sumber resmi sebelum mengambil keputusan.`,
          },
          {
            title: '2. Hak Cipta',
            content: `Seluruh konten di website ini, termasuk teks, foto, grafik, dan logo, dilindungi oleh hak cipta. Dilarang memperbanyak, mendistribusikan, atau menggunakan konten ini untuk keperluan komersial tanpa izin tertulis dari Berita Meureno. Pengutipan sebagian konten untuk keperluan non-komersial diperbolehkan dengan mencantumkan sumber yang jelas.`,
          },
          {
            title: '3. Konten Pihak Ketiga',
            content: `Website ini dapat menampilkan konten dari pihak ketiga termasuk artikel tamu, komentar pembaca, dan siaran pers. Berita Meureno tidak bertanggung jawab atas keakuratan atau opini yang disampaikan dalam konten pihak ketiga tersebut.`,
          },
          {
            title: '4. Opini dan Komentar',
            content: `Opini yang dinyatakan dalam artikel opini, kolom, dan komentar adalah milik penulis masing-masing dan tidak mencerminkan pandangan resmi Berita Meureno. Kami berhak untuk menolak, mengedit, atau menghapus komentar yang mengandung ujaran kebencian, fitnah, atau konten yang melanggar hukum.`,
          },
          {
            title: '5. Tautan Eksternal',
            content: `Berita Meureno tidak bertanggung jawab atas konten website yang ditautkan dari halaman kami. Tautan ke website eksternal disediakan sebagai referensi tambahan bagi pembaca. Keberadaan tautan tidak berarti kami mendukung konten website tersebut.`,
          },
          {
            title: '6. Iklan',
            content: `Website ini menampilkan iklan dari Google AdSense dan mungkin dari pengiklan lainnya. Berita Meureno tidak bertanggung jawab atas produk atau layanan yang diiklankan. Iklan yang ditampilkan bukan merupakan rekomendasi atau endorsement dari kami.`,
          },
          {
            title: '7. Pembatasan Tanggung Jawab',
            content: `Berita Meureno tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul dari penggunaan informasi yang disajikan di website ini. Pembaca menggunakan informasi ini atas risiko mereka sendiri.`,
          },
          {
            title: '8. Pedoman Pemberitaan',
            content: `Berita Meureno berkomitmen untuk mematuhi Kode Etik Jurnalistik yang ditetapkan oleh Dewan Pers Indonesia. Jika Anda menemukan berita yang tidak akurat atau melanggar etika jurnalistik, silakan hubungi kami melalui email redaksi@meureno.com untuk koreksi.`,
          },
          {
            title: '9. Hukum yang Berlaku',
            content: `Disclaimer ini tunduk pada hukum yang berlaku di Republik Indonesia. Segala sengketa yang timbul akan diselesaikan melalui jalur hukum yang berlaku di Indonesia.`,
          },
        ].map(({ title, content }) => (
          <section key={title}>
            <h2 className="font-head text-[18px] font-bold text-ink mb-3">{title}</h2>
            <p className="whitespace-pre-line">{content}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
