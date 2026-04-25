import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tentang Kami – Meureno News',
  description:
    'Meureno News adalah portal berita Aceh modern, cepat, akurat, dan terpercaya. Kenali lebih dekat redaksi, visi, misi, dan nilai-nilai kami.',
  alternates: { canonical: '/tentang' },
}

const VALUES = [
  {
    icon: '⚖️',
    title: 'Integritas',
    desc: 'Kami memegang teguh kode etik jurnalistik dan standar Dewan Pers Indonesia dalam setiap pemberitaan.',
  },
  {
    icon: '⚡',
    title: 'Kecepatan',
    desc: 'Informasi terkini disampaikan secepatnya tanpa mengorbankan akurasi dan verifikasi fakta.',
  },
  {
    icon: '🤝',
    title: 'Berimbang',
    desc: 'Setiap isu diliput dari berbagai sisi dengan memberikan ruang yang adil bagi semua pihak.',
  },
  {
    icon: '🌿',
    title: 'Lokal & Bangga',
    desc: 'Kami merayakan keunikan budaya, bahasa, dan kearifan lokal Aceh dalam setiap karya jurnalistik.',
  },
]

const TIMELINE = [
  { year: '2023', event: 'Meureno News didirikan sebagai startup media digital berbasis Banda Aceh.' },
  { year: '2024', event: 'Peluncuran versi pertama portal dengan ruang redaksi penuh dan tim jurnalis berpengalaman.' },
  { year: '2025', event: 'Ekspansi liputan ke seluruh 23 kabupaten/kota di Provinsi Aceh.' },
  { year: '2026', event: 'Peluncuran platform baru Next.js 15 dengan kecepatan loading dan SEO yang optimal.' },
]

const TEAM = [
  { role: 'Pemimpin Redaksi', name: 'Redaksi Meureno News' },
  { role: 'Redaktur Senior', name: 'Tim Redaksi Aceh' },
  { role: 'Jurnalis Lapangan', name: 'Koresponden 23 Kabupaten/Kota' },
  { role: 'Editor Digital', name: 'Tim Konten Digital' },
  { role: 'Fotografer', name: 'Tim Fotografi Meureno' },
]

export default function TentangPage() {
  return (
    <article>
      {/* Breadcrumb */}
      <nav className="text-[12px] text-ink-soft mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-aceh-green">Beranda</Link>
        <span>›</span>
        <span className="text-ink">Tentang Kami</span>
      </nav>

      {/* Hero Banner */}
      <div className="relative rounded-xl overflow-hidden mb-10 bg-aceh-green">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 12px)',
          }}
        />
        <div className="relative p-8 md:p-12">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-[11px] font-label tracking-[1.5px] px-3 py-1.5 rounded-full mb-4">
            🏛 PORTAL BERITA ACEH
          </div>
          <h1 className="font-head text-[34px] md:text-[42px] font-black text-white leading-[1.2] mb-3">
            Tentang Meureno News
          </h1>
          <p className="text-white/85 text-[16px] max-w-xl leading-relaxed">
            Mewartakan Aceh untuk Indonesia dan dunia — dengan kejujuran, kecepatan, dan semangat jurnalisme modern.
          </p>
        </div>
      </div>

      <div className="space-y-10 text-[16px] leading-relaxed text-ink-mid">

        {/* Siapa Kami */}
        <section>
          <h2 className="font-head text-[24px] font-bold text-ink mb-4 pb-2 sec-head-border">Siapa Kami</h2>
          <p className="mb-3">
            <strong className="text-ink">Meureno News</strong> adalah portal berita digital yang berfokus pada pemberitaan
            Aceh secara komprehensif, akurat, dan berimbang. Didirikan dengan semangat jurnalisme
            modern, kami hadir untuk menjembatani kebutuhan informasi masyarakat Aceh di era digital.
          </p>
          <p>
            Nama <strong className="text-aceh-green">&ldquo;Meureno&rdquo;</strong> berasal dari bahasa Aceh yang berarti{' '}
            &ldquo;terang&rdquo; atau &ldquo;jelas&rdquo;, mencerminkan komitmen kami untuk menyajikan berita yang transparan
            dan dapat dipercaya. Seperti cahaya yang menerangi, kami berusaha menerangi setiap sudut
            berita dengan fakta yang jernih dan analisis yang mendalam.
          </p>
        </section>

        {/* Visi & Misi */}
        <section>
          <h2 className="font-head text-[24px] font-bold text-ink mb-4 pb-2 sec-head-border">Visi &amp; Misi</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-aceh-green-light border-l-4 border-aceh-green rounded-r-xl p-5">
              <div className="font-label text-[11px] tracking-[1.5px] text-aceh-green font-bold mb-2">✦ VISI</div>
              <p className="text-ink text-[15px] font-semibold leading-relaxed">
                Menjadi portal berita Aceh terdepan yang mengedepankan kualitas jurnalisme,
                integritas editorial, dan inovasi teknologi untuk melayani masyarakat Aceh
                dan pembaca di seluruh dunia.
              </p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="font-label text-[11px] tracking-[1.5px] text-aceh-green font-bold mb-3">✦ MISI</div>
              <ul className="space-y-2.5 text-[14px]">
                {[
                  'Menyajikan berita Aceh yang akurat, cepat, dan berimbang',
                  'Mengangkat potensi lokal Aceh ke kancah nasional dan internasional',
                  'Mendorong literasi digital dan partisipasi masyarakat dalam isu publik',
                  'Menerapkan standar jurnalisme sesuai Pedoman Pemberitaan Media Siber',
                  'Memanfaatkan teknologi modern untuk pengalaman membaca yang optimal',
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-aceh-green mt-0.5">◆</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Sejarah */}
        <section>
          <h2 className="font-head text-[24px] font-bold text-ink mb-4 pb-2 sec-head-border">Sejarah Singkat</h2>
          <div className="space-y-0">
            {TIMELINE.map(({ year, event }, i) => (
              <div key={year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-aceh-green text-white flex items-center justify-center font-label text-[11px] font-bold shrink-0">
                    {year}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border my-1" />
                  )}
                </div>
                <div className="pb-6 pt-2 flex-1">
                  <p className="text-[15px]">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nilai-Nilai */}
        <section>
          <h2 className="font-head text-[24px] font-bold text-ink mb-4 pb-2 sec-head-border">Nilai-Nilai Redaksi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="bg-surface border border-border rounded-xl p-5 hover:border-aceh-green/40 hover:shadow-sm transition-all">
                <div className="text-[26px] mb-2">{icon}</div>
                <h3 className="font-label text-[14px] tracking-[1px] font-bold text-ink mb-1">{title.toUpperCase()}</h3>
                <p className="text-[13px] text-ink-mid leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tim Redaksi */}
        <section>
          <h2 className="font-head text-[24px] font-bold text-ink mb-4 pb-2 sec-head-border">Tim Redaksi</h2>
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            {TEAM.map(({ role, name }, i) => (
              <div key={role} className={`flex justify-between items-center px-5 py-3.5 text-[14px] ${i < TEAM.length - 1 ? 'border-b border-border' : ''}`}>
                <span className="text-ink-soft">{role}</span>
                <span className="font-semibold text-ink text-right">{name}</span>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-ink-soft mt-3">
            * Untuk informasi lebih lanjut mengenai tim redaksi, silakan hubungi{' '}
            <a href="mailto:redaksi@meureno.com" className="text-aceh-green hover:underline">redaksi@meureno.com</a>
          </p>
        </section>

        {/* Penerbit */}
        <section>
          <h2 className="font-head text-[24px] font-bold text-ink mb-4 pb-2 sec-head-border">Informasi Penerbit</h2>
          <div className="bg-aceh-green-light border-l-4 border-aceh-green rounded-r-xl p-5 text-[15px]">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: 'Nama Perusahaan', value: 'PT. Meureno Media Digital' },
                { label: 'Domisili', value: 'Banda Aceh, Provinsi Aceh, Indonesia' },
                { label: 'Website', value: 'berita.meureno.com' },
                { label: 'Email', value: 'redaksi@meureno.com' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-[11px] font-label tracking-[1px] text-aceh-green font-bold mb-0.5">{label.toUpperCase()}</div>
                  <div className="text-ink font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </article>
  )
}
