import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Tentang Berita Meureno, portal berita Aceh terpercaya dan terkini.',
}

export default function TentangPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-10">
        <span className="inline-block bg-aceh-green text-white font-label text-[11px] tracking-[1.5px] px-3 py-1 rounded-[3px] uppercase mb-4">
          Tentang Kami
        </span>
        <h1 className="font-head text-[32px] sm:text-[40px] font-black text-ink leading-[1.2] mb-4">
          Berita Meureno
        </h1>
        <p className="text-[16px] text-ink-soft leading-relaxed">
          Portal informasi Aceh yang modern, cepat, akurat, dan terpercaya.
        </p>
      </div>

      <div className="prose prose-lg max-w-none space-y-8 text-ink-mid leading-relaxed">
        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Siapa Kami</h2>
          <p>
            Berita Meureno adalah portal informasi digital yang berfokus pada informasi terkini dari seluruh
            wilayah Aceh. Didirikan dengan semangat untuk menghadirkan informasi yang akurat, cepat,
            dan berimbang kepada masyarakat Aceh dan diaspora Aceh di seluruh dunia.
          </p>
          <p className="mt-3">
            Nama "Meureno" berasal dari bahasa Aceh yang berarti "belajar" — mencerminkan komitmen
            kami bahwa portal ini adalah tempat belajar dan menambah pengetahuan untuk masyarakat Aceh.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Visi</h2>
          <p>
            Menjadi portal digital terdepan di Aceh yang dipercaya oleh masyarakat sebagai
            sumber informasi yang akurat, independen, dan bertanggung jawab.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Misi</h2>
          <ul className="list-none space-y-2">
            {[
              'Menyajikan berita yang akurat, berimbang, dan dapat dipertanggungjawabkan',
              'Mengangkat isu-isu lokal Aceh ke panggung nasional dan internasional',
              'Mendukung transparansi dan akuntabilitas pemerintahan di Aceh',
              'Mempromosikan budaya, pariwisata, dan potensi ekonomi Aceh',
              'Memberikan platform bagi suara masyarakat Aceh dari berbagai lapisan',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 w-5 h-5 rounded-full bg-aceh-green-light text-aceh-green text-[11px] font-bold flex items-center justify-center shrink-0">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Akurasi', desc: 'Setiap berita diverifikasi sebelum dipublikasikan' },
              { title: 'Independen', desc: 'Bebas dari pengaruh politik dan kepentingan tertentu' },
              { title: 'Cepat', desc: 'Breaking news disajikan secepat mungkin dengan tetap akurat' },
              { title: 'Berimbang', desc: 'Setiap isu disajikan dari berbagai sudut pandang' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-surface border border-border rounded-lg p-4">
                <h3 className="font-label font-bold text-aceh-green text-[14px] tracking-[0.5px] uppercase mb-1">
                  {title}
                </h3>
                <p className="text-[13px] text-ink-soft">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Tim Redaksi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Meureno', role: 'Pemimpin Redaksi' },
              { name: 'Lowongan Terbuka', role: 'Redaktur Pelaksana' },
              { name: 'Lowongan Terbuka', role: 'Redaktur Senior' },
              { name: 'Lowongan Terbuka', role: 'Reporter' },
            ].map(({ name, role }) => (
              <div key={name} className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border">
                <div className="w-10 h-10 rounded-full bg-aceh-green flex items-center justify-center text-white font-bold text-[16px] shrink-0">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[14px] text-ink">{name}</p>
                  <p className="text-[12px] text-ink-soft">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-aceh-green rounded-xl p-6 text-white">
          <h2 className="font-head text-[20px] font-bold mb-2">Bergabung Bersama Kami</h2>
          <p className="text-[14px] text-white/80 mb-4">
            Kami selalu terbuka untuk jurnalis, kontributor, dan kolumnis yang ingin berbagi
            perspektif tentang Aceh.
          </p>
          <a href="/kontak"
            className="inline-block bg-white text-aceh-green font-label font-bold text-[13px] tracking-[0.5px] px-5 py-2 rounded hover:bg-aceh-green-light transition-colors">
            Hubungi Kami
          </a>
        </section>
      </div>
    </div>
  )
}
