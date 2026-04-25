import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi – Meureno News',
  description: 'Kebijakan privasi Meureno News menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi pengunjung sesuai UU ITE dan regulasi Dewan Pers.',
  alternates: { canonical: '/kebijakan-privasi' },
}

const SECTIONS = [
  {
    num: '1',
    title: 'Informasi yang Kami Kumpulkan',
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Informasi sukarela:</strong> Nama dan alamat email saat Anda mengirim komentar, menghubungi redaksi, atau mendaftar sebagai kontributor.</li>
        <li><strong>Informasi otomatis:</strong> Alamat IP, jenis perangkat, browser yang digunakan, halaman yang dikunjungi, dan durasi kunjungan melalui cookies dan log server.</li>
        <li><strong>Cookies pihak ketiga:</strong> Google Analytics (analisis trafik) dan Google AdSense (penayangan iklan relevan) dapat menempatkan cookies pada perangkat Anda.</li>
        <li><strong>Data formulir:</strong> Informasi yang Anda masukkan pada formulir kontak atau komentar disimpan untuk tujuan komunikasi internal.</li>
      </ul>
    ),
  },
  {
    num: '2',
    title: 'Dasar Hukum Pemrosesan Data',
    content: (
      <p>Kami memproses data pribadi Anda berdasarkan: <strong>(a)</strong> persetujuan eksplisit yang Anda berikan, <strong>(b)</strong> kepentingan sah dalam mengelola layanan berita digital, dan <strong>(c)</strong> kewajiban hukum sesuai Undang-Undang No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik (UU ITE) beserta perubahannya (UU No. 19 Tahun 2016), serta Peraturan Pemerintah No. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik.</p>
    ),
  },
  {
    num: '3',
    title: 'Penggunaan Informasi',
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Menyediakan dan meningkatkan layanan portal berita Meureno News</li>
        <li>Menganalisis trafik dan perilaku pengunjung untuk peningkatan konten</li>
        <li>Menampilkan iklan yang relevan melalui Google AdSense</li>
        <li>Menanggapi pertanyaan, pengaduan, atau korespondensi yang Anda kirimkan</li>
        <li>Mencegah penipuan, penyalahgunaan, dan aktivitas ilegal</li>
        <li>Mematuhi kewajiban hukum yang berlaku di Indonesia</li>
      </ul>
    ),
  },
  {
    num: '4',
    title: 'Google AdSense & Cookies',
    content: (
      <>
        <p className="mb-3">Meureno News menggunakan Google AdSense untuk menampilkan iklan yang relevan. Google menggunakan cookies DART untuk menayangkan iklan berdasarkan kunjungan Anda ke situs ini dan situs lain. Anda dapat menonaktifkan penggunaan cookie DART melalui <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-aceh-green hover:underline">Pengaturan Iklan Google</a>.</p>
        <p>Untuk informasi lebih lanjut tentang kebijakan privasi Google, kunjungi <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-aceh-green hover:underline">policies.google.com/privacy</a>.</p>
      </>
    ),
  },
  {
    num: '5',
    title: 'Keamanan Data',
    content: (
      <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar, termasuk enkripsi SSL/TLS, akses terbatas pada basis data, dan pemantauan keamanan rutin, untuk melindungi informasi pribadi Anda dari akses, pengungkapan, perubahan, atau penghancuran yang tidak sah.</p>
    ),
  },
  {
    num: '6',
    title: 'Retensi Data',
    content: (
      <p>Kami menyimpan data pribadi selama diperlukan untuk tujuan yang dinyatakan dalam kebijakan ini, atau sesuai ketentuan hukum yang berlaku. Data komentar disimpan selama konten artikel aktif. Data log server dihapus setelah 90 hari.</p>
    ),
  },
  {
    num: '7',
    title: 'Hak-Hak Pengguna',
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Hak akses:</strong> Meminta informasi tentang data pribadi yang kami simpan tentang Anda</li>
        <li><strong>Hak koreksi:</strong> Meminta perbaikan data yang tidak akurat atau tidak lengkap</li>
        <li><strong>Hak penghapusan:</strong> Meminta penghapusan data pribadi Anda dalam kondisi tertentu</li>
        <li><strong>Hak portabilitas:</strong> Meminta salinan data Anda dalam format yang dapat dibaca mesin</li>
        <li><strong>Hak keberatan:</strong> Menolak pemrosesan data untuk tujuan pemasaran langsung</li>
        <li><strong>Hak penarikan persetujuan:</strong> Menarik persetujuan atas cookies kapan saja</li>
      </ul>
    ),
  },
  {
    num: '8',
    title: 'Tautan ke Situs Pihak Ketiga',
    content: (
      <p>Portal kami dapat memuat tautan ke situs web eksternal. Kebijakan privasi ini hanya berlaku untuk berita.meureno.com. Kami tidak bertanggung jawab atas praktik privasi situs pihak ketiga yang Anda kunjungi melalui tautan di portal kami.</p>
    ),
  },
  {
    num: '9',
    title: 'Perubahan Kebijakan Privasi',
    content: (
      <p>Kami berhak memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan signifikan akan diberitahukan melalui pengumuman di portal atau melalui email jika Anda telah mendaftar. Tanggal pembaruan terakhir tercantum di bagian atas halaman ini.</p>
    ),
  },
  {
    num: '10',
    title: 'Hubungi Kami',
    content: (
      <div className="bg-surface border border-border rounded-xl p-5">
        <p className="font-semibold text-ink mb-2">Meureno News – Portal Berita Aceh</p>
        <p className="text-[14px]">Email: <a href="mailto:redaksi@meureno.com" className="text-aceh-green hover:underline font-semibold">redaksi@meureno.com</a></p>
        <p className="text-[14px]">Alamat: Jl. T. Panglima Polem No. 44, Banda Aceh 23122</p>
        <p className="text-[14px] mt-2 text-ink-soft">Untuk permintaan terkait data pribadi, sertakan subjek: &ldquo;Permintaan Data Pribadi&rdquo;.</p>
      </div>
    ),
  },
]

export default function KebijakanPrivasiPage() {
  return (
    <article>
      <nav className="text-[12px] text-ink-soft mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-aceh-green">Beranda</Link>
        <span>›</span>
        <span className="text-ink">Kebijakan Privasi</span>
      </nav>

      <h1 className="font-head text-[32px] md:text-[38px] font-black text-ink leading-[1.2] mb-2">Kebijakan Privasi</h1>
      <p className="text-[13px] text-ink-soft mb-8">Terakhir diperbarui: 25 April 2026</p>

      <div className="bg-aceh-green-light border-l-4 border-aceh-green rounded-r-xl p-5 mb-8">
        <p className="text-[14px] text-aceh-green-dark leading-relaxed">
          Kebijakan privasi ini menjelaskan bagaimana <strong>Meureno News</strong> (berita.meureno.com), yang dioperasikan oleh PT. Meureno Media Digital, mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda. Dengan menggunakan layanan kami, Anda menyetujui ketentuan dalam kebijakan ini.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-surface border border-border rounded-xl p-5 mb-8">
        <p className="font-label text-[11px] tracking-[1.5px] text-aceh-green font-bold mb-3">DAFTAR ISI</p>
        <ol className="space-y-1.5 text-[13px] text-ink-mid">
          {SECTIONS.map(({ num, title }) => (
            <li key={num}>
              <a href={`#section-${num}`} className="hover:text-aceh-green">{num}. {title}</a>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-8 text-[15px] leading-relaxed text-ink-mid">
        {SECTIONS.map(({ num, title, content }) => (
          <section key={num} id={`section-${num}`}>
            <h2 className="font-head text-[21px] font-bold text-ink mb-3 pb-2 sec-head-border">
              {num}. {title}
            </h2>
            {content}
          </section>
        ))}
      </div>
    </article>
  )
}
