import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi Meureno News menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi pengunjung.',
  alternates: { canonical: '/kebijakan-privasi' },
}

export default function KebijakanPrivasiPage() {
  return (
    <article>
      <nav className="text-[12px] text-ink-soft mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-aceh-green">Beranda</Link>
        <span>›</span>
        <span className="text-ink">Kebijakan Privasi</span>
      </nav>

      <h1 className="font-head text-[32px] md:text-[38px] font-black text-ink leading-[1.2] mb-4">
        Kebijakan Privasi
      </h1>
      <p className="text-[13px] text-ink-soft mb-8">Terakhir diperbarui: 25 April 2026</p>

      <div className="bg-aceh-green-light border-l-4 border-aceh-green rounded-r-lg p-4 mb-8">
        <p className="text-[14px] text-aceh-green-dark">
          Kebijakan privasi ini menjelaskan bagaimana <strong>Meureno News</strong> (berita.meureno.com)
          mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
        </p>
      </div>

      <div className="space-y-6 text-[16px] leading-relaxed text-ink-mid">
        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">1. Informasi yang Kami Kumpulkan</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Informasi sukarela:</strong> Nama dan email saat mengirim komentar atau menghubungi kami.</li>
            <li><strong>Informasi otomatis:</strong> Alamat IP, jenis browser, halaman yang dikunjungi melalui cookies.</li>
            <li><strong>Cookies pihak ketiga:</strong> Google Analytics dan Google AdSense mungkin menempatkan cookies.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">2. Penggunaan Informasi</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Menyediakan dan meningkatkan layanan portal berita</li>
            <li>Menganalisis trafik pengunjung untuk peningkatan konten</li>
            <li>Menampilkan iklan relevan melalui Google AdSense</li>
            <li>Menanggapi pertanyaan atau pengaduan yang Anda kirimkan</li>
          </ul>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">3. Google AdSense & Cookies</h2>
          <p>
            Meureno News menggunakan Google AdSense untuk menampilkan iklan. Google menggunakan cookies
            untuk menayangkan iklan berdasarkan kunjungan Anda. Anda dapat menonaktifkan cookie melalui{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-aceh-green hover:underline">
              Pengaturan Iklan Google
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">4. Keamanan Data</h2>
          <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk melindungi informasi pribadi Anda.</p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">5. Hak Pengguna</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mengakses data pribadi yang kami simpan</li>
            <li>Meminta koreksi atau penghapusan data pribadi</li>
            <li>Menolak pemrosesan data untuk tujuan pemasaran</li>
            <li>Menarik persetujuan atas cookies kapan saja</li>
          </ul>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">6. Hubungi Kami</h2>
          <div className="bg-surface border border-border rounded-lg p-4">
            <p className="font-semibold text-ink">Meureno News – Portal Berita Aceh</p>
            <p className="mt-1">Email: <a href="mailto:redaksi@meureno.com" className="text-aceh-green hover:underline font-semibold">redaksi@meureno.com</a></p>
            <p>Alamat: Jl. T. Panglima Polem No. 44, Banda Aceh 23122</p>
          </div>
        </section>
      </div>
    </article>
  )
}
