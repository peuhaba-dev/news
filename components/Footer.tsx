import Link from 'next/link'

const FOOTER_COLS = [
  {
    title: 'Berita Aceh',
    links: [
      { label: 'Aceh Terkini', href: '/category/aceh-terkini' },
      { label: 'Banda Aceh', href: '/category/banda-aceh' },
      { label: 'Kabupaten & Kota', href: '/category/kabupaten-kota' },
      { label: 'Gampong', href: '/category/gampong' },
      { label: 'Pemuda Kreatif', href: '/category/pemuda' },
      { label: 'Wisata Aceh', href: '/category/wisata' },
    ],
  },
  {
    title: 'Topik',
    links: [
      { label: 'Ekonomi & Bisnis', href: '/category/ekonomi' },
      { label: 'Hukum & Kriminal', href: '/category/hukum' },
      { label: 'Pendidikan', href: '/category/pendidikan' },
      { label: 'Religi & Budaya', href: '/category/religi' },
      { label: 'Teknologi', href: '/category/teknologi' },
      { label: 'Nasional', href: '/category/nasional' },
    ],
  },
  {
    title: 'Tentang Kami',
    links: [
      { label: 'Redaksi', href: '/tentang' },
      { label: 'Pedoman Media Siber', href: '/disclaimer' },
      { label: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
      { label: 'Pasang Iklan', href: '/iklan' },
      { label: 'Karier', href: '/karier' },
      { label: 'Hubungi Kami', href: '/kontak' },
    ],
  },
]

const SOCIALS = [
  { label: 'FB', href: 'https://facebook.com' },
  { label: 'IG', href: 'https://instagram.com' },
  { label: 'X',  href: 'https://x.com' },
  { label: 'YT', href: 'https://youtube.com' },
  { label: 'WA', href: 'https://wa.me' },
]

export default function Footer() {
  return (
    <>
      {/* Acehnese pattern strip */}
      <div className="aceh-pattern-strip" />

      <footer className="bg-[#111827] text-white">
        {/* Top grid */}
        <div className="max-w-portal mx-auto px-5 pt-10 pb-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand col */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-aceh-green rounded-md flex items-center justify-center shrink-0">
                <svg className="w-[22px] h-[22px] fill-white" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0
                           2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <span className="font-label text-[18px] font-bold tracking-[0.5px]">
                Berita Meureno
              </span>
            </div>

            <p className="text-[12.5px] text-white/60 leading-relaxed mb-4">
              Portal berita Aceh modern, cepat, akurat, dan terpercaya.
              Mewartakan Aceh untuk Indonesia dan dunia sejak 2024.
            </p>

            <address className="not-italic text-[12px] text-white/50 mb-4 space-y-0.5 leading-relaxed">
              <div>📍 Jl. T. Panglima Polem No. 44, Banda Aceh 23122</div>
              <div>📧 redaksi@berita.meureno.com</div>
              <div>📞 (0651) 123-4567</div>
            </address>

            {/* Social buttons */}
            <div className="flex gap-2">
              {SOCIALS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[34px] h-[34px] bg-white/10 rounded-md flex items-center
                             justify-center font-label text-[11px] font-bold
                             hover:bg-aceh-green transition-colors duration-150"
                  aria-label={label}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {FOOTER_COLS.map(({ title, links }) => (
            <div key={title}>
              <h4
                className="font-label text-[12px] tracking-[1.5px] uppercase font-bold
                           text-white pb-2 mb-3.5 border-b border-white/15"
              >
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[13px] text-white/70 hover:text-white
                                 flex items-center gap-1.5 transition-colors duration-150
                                 before:content-['›'] before:text-aceh-gold before:text-[15px]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div
            className="max-w-portal mx-auto px-5 py-4 flex flex-col items-center
                       gap-2 text-center text-[12px] text-white/50"
          >
            <p>
              © {new Date().getFullYear()}{' '}
              <strong className="text-white/80">Berita Meureno</strong>{' '}
              — berita.meureno.com. Seluruh hak cipta dilindungi undang-undang.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              {[
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
            <p className="text-[11px] text-white/30">
              PT. Meureno Media Digital · SIUP No: 123/DPMPTSP/2024 · Anggota Dewan Pers Indonesia
            </p>
          </div>
        </div>
      </footer>

      {/* Aceh pride bottom strip */}
      <div className="aceh-pride-strip" />
    </>
  )
}
