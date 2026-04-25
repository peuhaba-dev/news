import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description: 'Kebijakan privasi Berita Meureno tentang pengumpulan dan penggunaan data pengguna.',
}

export default function KebijakanPrivasiPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-10">
        <span className="inline-block bg-aceh-green text-white font-label text-[11px] tracking-[1.5px] px-3 py-1 rounded-[3px] uppercase mb-4">
          Legal
        </span>
        <h1 className="font-head text-[32px] sm:text-[40px] font-black text-ink leading-[1.2] mb-4">
          Kebijakan Privasi
        </h1>
        <p className="text-[14px] text-ink-soft">
          Terakhir diperbarui: 25 April 2026
        </p>
      </div>

      <div className="space-y-8 text-[15px] text-ink-mid leading-relaxed">
        {[
          {
            title: '1. Informasi yang Kami Kumpulkan',
            content: `Berita Meureno mengumpulkan informasi yang Anda berikan secara langsung, seperti nama dan alamat email ketika Anda mengirimkan komentar atau menghubungi kami. Kami juga mengumpulkan data penggunaan secara otomatis seperti alamat IP, jenis browser, halaman yang dikunjungi, dan durasi kunjungan melalui layanan analitik.`,
          },
          {
            title: '2. Penggunaan Informasi',
            content: `Informasi yang kami kumpulkan digunakan untuk: menyajikan dan meningkatkan konten website, merespons pertanyaan dan komentar Anda, menganalisis tren penggunaan untuk meningkatkan layanan, menampilkan iklan yang relevan melalui Google AdSense, dan mencegah aktivitas penipuan atau penyalahgunaan.`,
          },
          {
            title: '3. Cookies',
            content: `Kami menggunakan cookies untuk meningkatkan pengalaman pengguna. Cookies adalah file teks kecil yang disimpan di perangkat Anda. Anda dapat mengatur browser untuk menolak cookies, namun beberapa fitur website mungkin tidak berfungsi optimal. Google AdSense menggunakan cookies untuk menampilkan iklan berdasarkan kunjungan Anda sebelumnya.`,
          },
          {
            title: '4. Google AdSense dan Iklan Pihak Ketiga',
            content: `Website ini menggunakan Google AdSense untuk menampilkan iklan. Google menggunakan cookies DART untuk menampilkan iklan berdasarkan kunjungan Anda ke website ini dan website lain. Anda dapat menonaktifkan cookies DART dengan mengunjungi halaman kebijakan privasi Google Ads di https://policies.google.com/privacy.`,
          },
          {
            title: '5. Tautan ke Website Lain',
            content: `Website kami mungkin berisi tautan ke website pihak ketiga. Kami tidak bertanggung jawab atas praktik privasi website tersebut. Kami mendorong Anda untuk membaca kebijakan privasi setiap website yang Anda kunjungi.`,
          },
          {
            title: '6. Keamanan Data',
            content: `Kami mengambil langkah-langkah yang wajar untuk melindungi informasi Anda dari akses yang tidak sah, pengungkapan, perubahan, atau penghancuran. Namun, tidak ada metode transmisi melalui internet yang 100% aman.`,
          },
          {
            title: '7. Hak Pengguna',
            content: `Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi pribadi Anda. Untuk menggunakan hak ini, hubungi kami melalui email di redaksi@meureno.com. Kami akan merespons permintaan Anda dalam waktu 30 hari kerja.`,
          },
          {
            title: '8. Perubahan Kebijakan',
            content: `Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan akan diumumkan di halaman ini dengan memperbarui tanggal "Terakhir diperbarui". Penggunaan berkelanjutan atas layanan kami setelah perubahan berarti Anda menyetujui kebijakan yang diperbarui.`,
          },
          {
            title: '9. Hubungi Kami',
            content: `Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, hubungi kami di:\nBerita Meureno\nJl. T. Nyak Arief No. 1, Banda Aceh 23111\nEmail: redaksi@meureno.com`,
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
