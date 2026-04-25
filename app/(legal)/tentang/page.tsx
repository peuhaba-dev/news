import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Meureno News adalah portal berita Aceh modern, cepat, akurat, dan terpercaya. Kenali lebih dekat redaksi dan visi kami.',
  alternates: { canonical: '/tentang' },
}

export default function TentangPage() {
  return (
    <article className="legal-page">
      {/* Breadcrumb */}
      <nav className="text-[12px] text-ink-soft mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-aceh-green">Beranda</Link>
        <span>›</span>
        <span className="text-ink">Tentang Kami</span>
      </nav>

      <h1 className="font-head text-[32px] md:text-[38px] font-black text-ink leading-[1.2] mb-6">
        Tentang Meureno News
      </h1>

      <div className="bg-aceh-green-light border-l-4 border-aceh-green rounded-r-lg p-4 mb-8">
        <p className="text-[15px] text-aceh-green-dark font-semibold">
          Meureno News – Portal Berita Aceh
        </p>
        <p className="text-[13px] text-aceh-green-dark/80 mt-1">
          Mewartakan Aceh untuk Indonesia dan dunia.
        </p>
      </div>

      <div className="space-y-6 text-[16px] leading-relaxed text-ink-mid">
        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Siapa Kami</h2>
          <p>
            <strong>Meureno News</strong> adalah portal berita digital yang berfokus pada pemberitaan
            Aceh secara komprehensif, akurat, dan berimbang. Didirikan dengan semangat jurnalisme
            modern, kami hadir untuk menjembatani kebutuhan informasi masyarakat Aceh di era digital.
          </p>
          <p className="mt-3">
            Nama &quot;Meureno&quot; berasal dari bahasa Aceh yang berarti &quot;terang&quot; atau
            &quot;jelas&quot;, mencerminkan komitmen kami untuk menyajikan berita yang transparan
            dan dapat dipercaya.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Visi</h2>
          <p>
            Menjadi portal berita Aceh terdepan yang mengedepankan kualitas jurnalisme,
            integritas editorial, dan inovasi teknologi untuk melayani masyarakat Aceh
            dan pembaca di seluruh dunia.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Misi</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Menyajikan berita Aceh yang akurat, cepat, dan berimbang</li>
            <li>Mengangkat potensi lokal Aceh ke kancah nasional dan internasional</li>
            <li>Mendorong literasi digital dan partisipasi masyarakat dalam isu publik</li>
            <li>Menerapkan standar jurnalisme yang sesuai dengan Pedoman Pemberitaan Media Siber</li>
            <li>Memanfaatkan teknologi modern untuk pengalaman membaca yang optimal</li>
          </ul>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Tim Redaksi</h2>
          <div className="bg-surface border border-border rounded-lg p-5">
            <div className="grid gap-3 text-[14px]">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-ink-soft">Pemimpin Redaksi</span>
                <span className="font-semibold text-ink">Redaksi Meureno News</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-ink-soft">Email Redaksi</span>
                <a href="mailto:redaksi@meureno.com" className="font-semibold text-aceh-green hover:underline">
                  redaksi@meureno.com
                </a>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-ink-soft">Alamat</span>
                <span className="font-semibold text-ink text-right">
                  Jl. T. Panglima Polem No. 44, Banda Aceh 23122
                </span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Penerbit</h2>
          <p>
            Meureno News diterbitkan oleh <strong>PT. Meureno Media Digital</strong>, perusahaan
            media digital yang berkedudukan di Banda Aceh, Provinsi Aceh, Indonesia.
          </p>
        </section>
      </div>
    </article>
  )
}
