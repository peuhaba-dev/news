import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-5 text-center">
      {/* Decorative Acehnese ornament */}
      <div className="text-[80px] mb-4">🏛</div>

      <h1 className="font-head text-[64px] font-black text-aceh-green leading-none mb-2">
        404
      </h1>
      <h2 className="font-head text-[24px] font-bold text-ink mb-3">
        Berita Tidak Ditemukan
      </h2>
      <p className="text-ink-soft text-[15px] max-w-md mb-8 leading-relaxed">
        Halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau tidak pernah ada.
        Silakan kembali ke beranda.
      </p>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="bg-aceh-green text-white font-label px-6 py-2.5 rounded
                     font-semibold tracking-[0.5px] hover:bg-aceh-green-dark transition-colors"
        >
          ← Kembali ke Beranda
        </Link>
        <Link
          href="/search"
          className="border border-aceh-green text-aceh-green font-label px-6 py-2.5 rounded
                     font-semibold tracking-[0.5px] hover:bg-aceh-green-light transition-colors"
        >
          Cari Berita
        </Link>
      </div>
    </div>
  )
}
