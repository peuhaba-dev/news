import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description:
    'Hubungi redaksi Meureno News untuk pertanyaan, saran, kerja sama, atau pengaduan. Portal Berita Aceh terpercaya.',
  alternates: { canonical: '/kontak' },
}

const CONTACTS = [
  {
    icon: '📧',
    label: 'Email Redaksi',
    value: 'redaksi@meureno.com',
    href: 'mailto:redaksi@meureno.com',
  },
  {
    icon: '📞',
    label: 'Telepon',
    value: '(0651) 123-4567',
    href: 'tel:+62651234567',
  },
  {
    icon: '📍',
    label: 'Alamat Kantor',
    value: 'Jl. T. Panglima Polem No. 44, Banda Aceh 23122',
    href: null,
  },
  {
    icon: '🕐',
    label: 'Jam Operasional',
    value: 'Senin – Jumat, 08:00 – 17:00 WIB',
    href: null,
  },
]

export default function KontakPage() {
  return (
    <article className="legal-page">
      {/* Breadcrumb */}
      <nav className="text-[12px] text-ink-soft mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-aceh-green">Beranda</Link>
        <span>›</span>
        <span className="text-ink">Hubungi Kami</span>
      </nav>

      <h1 className="font-head text-[32px] md:text-[38px] font-black text-ink leading-[1.2] mb-6">
        Hubungi Kami
      </h1>

      <div className="bg-aceh-green-light border-l-4 border-aceh-green rounded-r-lg p-4 mb-8">
        <p className="text-[15px] text-aceh-green-dark font-semibold">
          Meureno News – Portal Berita Aceh
        </p>
        <p className="text-[13px] text-aceh-green-dark/80 mt-1">
          Kami senang mendengar dari Anda. Silakan hubungi kami untuk pertanyaan,
          saran, kerja sama media, atau pengaduan konten.
        </p>
      </div>

      <div className="space-y-6 text-[16px] leading-relaxed text-ink-mid">
        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CONTACTS.map(({ icon, label, value, href }) => (
            <div
              key={label}
              className="bg-surface border border-border rounded-lg p-4 hover:border-aceh-green/30 transition-colors"
            >
              <div className="text-[22px] mb-2">{icon}</div>
              <div className="font-label text-[12px] tracking-[1px] uppercase text-ink-soft font-bold mb-1">
                {label}
              </div>
              {href ? (
                <a
                  href={href}
                  className="text-[14px] font-semibold text-aceh-green hover:underline break-words"
                >
                  {value}
                </a>
              ) : (
                <p className="text-[14px] font-semibold text-ink">{value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Sections */}
        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Kerja Sama & Iklan</h2>
          <p>
            Untuk kerja sama media, pemasangan iklan, atau partnership, silakan hubungi kami melalui
            email{' '}
            <a href="mailto:redaksi@meureno.com" className="text-aceh-green hover:underline font-semibold">
              redaksi@meureno.com
            </a>{' '}
            dengan subjek &quot;Kerja Sama&quot;.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Pengaduan Konten</h2>
          <p>
            Jika Anda menemukan konten yang tidak akurat, melanggar hak cipta, atau bermasalah,
            silakan laporkan melalui email kami. Tim redaksi akan meninjau pengaduan Anda dalam
            waktu 1×24 jam hari kerja.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Kirim Berita</h2>
          <p>
            Punya informasi atau liputan menarik dari daerah Anda? Kirimkan kepada kami melalui
            email{' '}
            <a href="mailto:redaksi@meureno.com" className="text-aceh-green hover:underline font-semibold">
              redaksi@meureno.com
            </a>{' '}
            dengan menyertakan nama lengkap, nomor telepon, dan dokumentasi pendukung.
          </p>
        </section>

        <section>
          <h2 className="font-head text-[22px] font-bold text-ink mb-3">Media Sosial</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Facebook', href: 'https://facebook.com', color: 'bg-[#1877F2]' },
              { label: 'Instagram', href: 'https://instagram.com', color: 'bg-[#E4405F]' },
              { label: 'Twitter/X', href: 'https://x.com', color: 'bg-[#000]' },
              { label: 'YouTube', href: 'https://youtube.com', color: 'bg-[#FF0000]' },
            ].map(({ label, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${color} text-white text-[12px] font-label font-semibold px-4 py-2 rounded-md
                           hover:opacity-85 transition-opacity tracking-[0.5px]`}
              >
                {label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}
