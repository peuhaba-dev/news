import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DMCA & Hak Cipta | Berita Meureno',
  description: 'Kebijakan hak cipta dan prosedur DMCA Berita Meureno.',
}

export default function DmcaPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-head text-3xl text-ink mb-2">DMCA & Hak Cipta</h1>
      <p className="text-xs text-ink-soft mb-8">Terakhir diperbarui: April 2026</p>

      <div className="space-y-6">
        <section>
          <h2 className="font-head text-xl text-ink mb-2">Perlindungan Hak Cipta</h2>
          <p className="text-ink-mid leading-relaxed">Berita Meureno menghormati hak kekayaan intelektual pihak lain dan mengharapkan pengguna kami melakukan hal yang sama. Seluruh konten yang diproduksi oleh tim redaksi Berita Meureno dilindungi oleh Undang-Undang Hak Cipta Republik Indonesia (UU No. 28 Tahun 2014).</p>
        </section>

        <section>
          <h2 className="font-head text-xl text-ink mb-2">Laporan Pelanggaran Hak Cipta</h2>
          <p className="text-ink-mid leading-relaxed mb-3">Jika Anda yakin bahwa konten di situs ini melanggar hak cipta Anda, silakan kirimkan laporan DMCA dengan informasi berikut:</p>
          <ul className="list-disc list-inside space-y-2 text-ink-mid text-sm">
            <li>Identitas lengkap dan informasi kontak Anda</li>
            <li>Deskripsi karya yang diklaim dilanggar hak ciptanya</li>
            <li>URL atau lokasi konten yang melanggar di situs kami</li>
            <li>Pernyataan bahwa Anda adalah pemilik hak cipta atau utusan resminya</li>
            <li>Tanda tangan elektronik atau fisik Anda</li>
          </ul>
        </section>

        <section>
          <h2 className="font-head text-xl text-ink mb-2">Cara Mengirim Laporan</h2>
          <p className="text-ink-mid leading-relaxed">Kirimkan laporan DMCA melalui email ke: <a href="mailto:dmca@meureno.com" className="text-aceh-green hover:underline font-semibold">dmca@meureno.com</a></p>
          <p className="text-ink-mid leading-relaxed mt-2">Kami berkomitmen menindaklanjuti setiap laporan yang valid dalam waktu <strong>3-5 hari kerja</strong>.</p>
        </section>

        <section>
          <h2 className="font-head text-xl text-ink mb-2">Konten Pihak Ketiga</h2>
          <p className="text-ink-mid leading-relaxed">Berita Meureno menggunakan gambar dan media dari sumber yang memiliki lisensi bebas pakai atau dengan atribusi. Jika terdapat konten yang tidak sesuai, kami akan segera menghapus atau memberikan atribusi yang tepat setelah menerima laporan.</p>
        </section>

        <div className="bg-aceh-green-light border border-aceh-green/20 rounded-xl p-5 mt-8">
          <p className="text-sm text-aceh-green-dark font-semibold">📧 Kontak DMCA</p>
          <p className="text-sm text-ink-mid mt-1">Email: dmca@meureno.com</p>
          <p className="text-sm text-ink-mid">Respons: 3-5 hari kerja</p>
        </div>
      </div>
    </main>
  )
}
