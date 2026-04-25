import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Disclaimer – Meureno News',
  description: 'Disclaimer Meureno News mengenai batasan tanggung jawab, hak cipta, penggunaan informasi, dan standar pemberitaan media online Indonesia.',
  alternates: { canonical: '/disclaimer' },
}

const SECTIONS = [
  {
    num: '1',
    title: 'Akurasi Informasi',
    content: (
      <p>Meureno News berupaya menyajikan berita yang akurat, berimbang, dan terkini sesuai dengan Kode Etik Jurnalistik dan Pedoman Pemberitaan Media Siber yang diterbitkan oleh Dewan Pers Indonesia. Namun, kami tidak memberikan jaminan bahwa seluruh informasi di portal ini sepenuhnya bebas dari kesalahan. Informasi disediakan &ldquo;sebagaimana adanya&rdquo; (<em>as is</em>) tanpa jaminan tersurat maupun tersirat dalam bentuk apapun.</p>
    ),
  },
  {
    num: '2',
    title: 'Batasan Tanggung Jawab',
    content: (
      <>
        <p className="mb-3">Meureno News dan PT. Meureno Media Digital tidak bertanggung jawab atas:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan portal ini</li>
          <li>Keputusan yang diambil berdasarkan informasi yang dipublikasikan di portal</li>
          <li>Gangguan akses atau downtime layanan yang disebabkan oleh faktor teknis di luar kendali kami</li>
          <li>Konten yang dikirimkan oleh pengguna melalui fitur komentar atau kiriman berita</li>
          <li>Kerusakan perangkat atau kehilangan data yang terjadi saat mengakses portal ini</li>
        </ul>
      </>
    ),
  },
  {
    num: '3',
    title: 'Hak Cipta & Kekayaan Intelektual',
    content: (
      <>
        <p className="mb-3">Seluruh konten di Meureno News, termasuk namun tidak terbatas pada teks, gambar, grafis, logo, audio, video, desain antarmuka, dan tata letak, dilindungi oleh Undang-Undang No. 28 Tahun 2014 tentang Hak Cipta.</p>
        <p>Reproduksi, distribusi, penampilan ulang, modifikasi, atau penggunaan konten untuk tujuan komersial tanpa izin tertulis dari redaksi Meureno News dilarang keras. Pengutipan untuk tujuan pendidikan, penelitian, atau liputan berita diperkenankan dengan menyebutkan sumber secara jelas.</p>
      </>
    ),
  },
  {
    num: '4',
    title: 'Penggunaan Informasi',
    content: (
      <p>Informasi yang tersedia di portal ini bersifat umum dan untuk keperluan informasi semata. Konten berita tidak dimaksudkan sebagai nasihat hukum, medis, keuangan, atau profesional lainnya. Untuk kebutuhan spesifik tersebut, kami menyarankan Anda berkonsultasi dengan profesional yang berkualifikasi di bidangnya.</p>
    ),
  },
  {
    num: '5',
    title: 'Tautan Eksternal',
    content: (
      <p>Portal Meureno News dapat memuat tautan (<em>hyperlink</em>) ke situs web pihak ketiga sebagai referensi atau sumber tambahan. Kami tidak memiliki kendali atas konten, kebijakan privasi, atau praktik situs-situs tersebut. Pencantuman tautan eksternal tidak berarti endorsement atau afiliasi dengan situs yang bersangkutan.</p>
    ),
  },
  {
    num: '6',
    title: 'Konten Iklan',
    content: (
      <p>Iklan yang ditampilkan di Meureno News — termasuk melalui Google AdSense atau mitra pengiklan langsung — merupakan tanggung jawab sepenuhnya dari pengiklan masing-masing. Meureno News tidak menjamin, mendukung, atau bertanggung jawab atas produk, layanan, atau klaim yang diiklankan. Kami berhak menolak iklan yang bertentangan dengan nilai-nilai editorial atau melanggar hukum yang berlaku.</p>
    ),
  },
  {
    num: '7',
    title: 'Komentar & Konten Pengguna',
    content: (
      <p>Komentar dan konten yang dikirimkan oleh pengguna merupakan pendapat pribadi yang tidak mencerminkan pandangan atau posisi editorial Meureno News. Kami berhak — tetapi tidak berkewajiban — untuk memantau, mengedit, atau menghapus komentar yang mengandung ujaran kebencian, hoaks, konten pornografi, fitnah, atau melanggar norma hukum dan kesusilaan sesuai dengan UU ITE.</p>
    ),
  },
  {
    num: '8',
    title: 'Hak Ralat & Koreksi',
    content: (
      <p>Sesuai dengan Pedoman Pemberitaan Media Siber Dewan Pers, Meureno News berkomitmen untuk melakukan koreksi atas berita yang terbukti tidak akurat sesegera mungkin dengan mencantumkan keterangan ralat yang jelas. Jika Anda menemukan informasi yang tidak akurat, silakan laporkan melalui <a href="mailto:redaksi@meureno.com" className="text-aceh-green hover:underline font-semibold">redaksi@meureno.com</a>.</p>
    ),
  },
  {
    num: '9',
    title: 'Yurisdiksi Hukum',
    content: (
      <p>Disclaimer ini tunduk pada dan ditafsirkan sesuai dengan hukum Negara Kesatuan Republik Indonesia. Setiap sengketa yang timbul dari penggunaan portal ini diselesaikan melalui mekanisme yang berlaku di Indonesia, termasuk mediasi melalui Dewan Pers untuk sengketa jurnalistik.</p>
    ),
  },
  {
    num: '10',
    title: 'Perubahan Disclaimer',
    content: (
      <p>Meureno News berhak mengubah disclaimer ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Perubahan berlaku efektif sejak ditampilkan di portal. Penggunaan berkelanjutan atas layanan kami setelah perubahan berarti Anda menerima disclaimer yang telah diperbarui.</p>
    ),
  },
]

export default function DisclaimerPage() {
  return (
    <article>
      <nav className="text-[12px] text-ink-soft mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-aceh-green">Beranda</Link>
        <span>›</span>
        <span className="text-ink">Disclaimer</span>
      </nav>

      <h1 className="font-head text-[32px] md:text-[38px] font-black text-ink leading-[1.2] mb-2">Disclaimer</h1>
      <p className="text-[13px] text-ink-soft mb-8">Terakhir diperbarui: 25 April 2026</p>

      <div className="bg-aceh-gold-light border-l-4 border-aceh-gold rounded-r-xl p-5 mb-8">
        <p className="text-[14px] text-ink-mid leading-relaxed">
          Dengan mengakses dan menggunakan portal <strong>Meureno News</strong> (berita.meureno.com), Anda menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan disclaimer berikut. Jika Anda tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan layanan kami.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-surface border border-border rounded-xl p-5 mb-8">
        <p className="font-label text-[11px] tracking-[1.5px] text-aceh-gold font-bold mb-3">DAFTAR ISI</p>
        <ol className="space-y-1.5 text-[13px] text-ink-mid">
          {SECTIONS.map(({ num, title }) => (
            <li key={num}>
              <a href={`#disc-${num}`} className="hover:text-aceh-green">{num}. {title}</a>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-8 text-[15px] leading-relaxed text-ink-mid">
        {SECTIONS.map(({ num, title, content }) => (
          <section key={num} id={`disc-${num}`}>
            <h2 className="font-head text-[21px] font-bold text-ink mb-3 pb-2 sec-head-border">
              {num}. {title}
            </h2>
            {content}
          </section>
        ))}
      </div>

      <div className="mt-10 bg-surface border border-border rounded-xl p-5">
        <p className="font-semibold text-ink mb-1">Meureno News – Portal Berita Aceh</p>
        <p className="text-[14px] text-ink-mid">Email: <a href="mailto:redaksi@meureno.com" className="text-aceh-green hover:underline font-semibold">redaksi@meureno.com</a></p>
        <p className="text-[14px] text-ink-mid">Alamat: Jl. T. Panglima Polem No. 44, Banda Aceh 23122</p>
      </div>
    </article>
  )
}
