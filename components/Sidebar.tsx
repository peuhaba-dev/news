import Link from 'next/link'
import type { Post } from '@/types'
import SectionHeader from './SectionHeader'
import PromoAd from './PromoAd'
import { formatDate } from '@/lib/utils'

const REGIONS = [
  'Banda Aceh', 'Aceh Besar', 'Pidie', 'Bireuen',
  'Lhokseumawe', 'Aceh Utara', 'Langsa', 'Aceh Timur',
  'Aceh Tengah', 'Aceh Barat', 'Sabang', 'Subulussalam',
]

const TAGS = [
  { label: 'Aceh', aceh: true }, { label: 'Banda Aceh', aceh: true },
  { label: 'Gayo', aceh: true }, { label: 'Gampong', aceh: true },
  { label: 'Dayah', aceh: true }, { label: 'Otonomi Khusus', aceh: false },
  { label: 'Kopi', aceh: false }, { label: 'Tsunami', aceh: false },
  { label: 'Sabang', aceh: false }, { label: 'Leuser', aceh: false },
  { label: 'Syariat', aceh: false }, { label: 'UMKM', aceh: false },
]

const CATEGORIES = [
  { label: '🏛 Aceh Terkini', slug: 'aceh-terkini', hot: true },
  { label: '📰 Nasional', slug: 'nasional' },
  { label: '💼 Ekonomi', slug: 'ekonomi' },
  { label: '⚖️ Hukum', slug: 'hukum' },
  { label: '🎓 Pendidikan', slug: 'pendidikan' },
  { label: '🕌 Religi', slug: 'religi' },
  { label: '🌿 Wisata', slug: 'wisata' },
  { label: '✍️ Opini', slug: 'opini' },
]

interface SidebarProps {
  mostReadPosts: Post[]
}

export default function Sidebar({ mostReadPosts }: SidebarProps) {
  return (
    <aside className="space-y-7">

      {/* ── Promo Ad: wisata.meureno.com ── */}
      <PromoAd variant="sidebar" />

      {/* ── Most Read ── */}
      <div>
        <SectionHeader title="Paling Banyak Dibaca" emoji="🔥" />
        <ol className="space-y-0">
          {mostReadPosts.map((post, i) => (
            <li key={post.id}>
              <Link
                href={`/news/${post.slug}`}
                className="flex items-start gap-3 py-3.5 border-b border-border
                           last:border-b-0 group cursor-pointer hover:bg-surface
                           rounded-lg px-1 -mx-1 transition-colors"
              >
                <span
                  className="font-label text-[28px] font-bold leading-none shrink-0 w-8 text-center
                             text-border group-hover:text-aceh-green transition-colors mt-0.5"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h4
                    className="font-head text-[14px] font-bold text-ink leading-[1.35]
                               line-clamp-2 group-hover:text-aceh-green transition-colors"
                  >
                    {post.title}
                  </h4>
                  <div className="text-[11px] text-ink-soft mt-0.5 flex items-center gap-1.5">
                    <span>{formatDate(post.created_at)}</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-border inline-block" />
                    <span>{post.views.toLocaleString('id-ID')} dibaca</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Categories ── */}
      <div>
        <SectionHeader title="Kategori Berita" emoji="📂" />
        <div className="space-y-1">
          {CATEGORIES.map(({ label, slug, hot }) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg
                          font-body text-[13.5px] transition-all duration-150
                          ${hot
                  ? 'bg-aceh-green text-white hover:bg-aceh-green-dark'
                  : 'bg-surface text-ink-mid hover:bg-aceh-green-light hover:text-aceh-green border border-border'
                }`}
            >
              <span>{label}</span>
              <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Newsletter widget ── */}
      <div className="newsletter-widget">
        <div className="font-label text-[11px] tracking-[2px] uppercase text-white/70 mb-1">
          Newsletter
        </div>
        <h3 className="font-head text-[18px] font-bold text-white mb-2 leading-[1.3]">
          Dapatkan Berita Aceh Terkini
        </h3>
        <p className="text-[12.5px] text-white/75 mb-4 leading-relaxed">
          Langganan dan terima ringkasan berita terpilih langsung ke email Anda setiap hari.
        </p>
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email Anda..."
            className="w-full px-3.5 py-2.5 rounded-lg text-[13px] text-ink
                       focus:outline-none focus:ring-2 focus:ring-aceh-gold"
            readOnly
          />
          <button
            className="w-full bg-aceh-gold text-white font-label text-[13px] tracking-[0.8px]
                       font-bold py-2.5 rounded-lg hover:bg-[#a87a15] transition-colors"
          >
            Langganan Gratis
          </button>
        </div>
        <p className="text-[10.5px] text-white/50 mt-2 text-center">
          Kami tidak akan mengirim spam. Berhenti kapan saja.
        </p>
      </div>

      {/* ── Aceh Stats ── */}
      <div className="bg-aceh-green rounded-xl p-4 grid grid-cols-3 gap-3 text-center">
        {[
          { val: '6.497', lbl: 'Gampong' },
          { val: '23', lbl: 'Kab/Kota' },
          { val: '5,6 Jt', lbl: 'Penduduk' },
        ].map(({ val, lbl }) => (
          <div key={lbl}>
            <div className="font-label text-[22px] font-bold text-white">{val}</div>
            <div className="text-[9.5px] text-white/70 uppercase tracking-[0.8px] mt-0.5 leading-tight">{lbl}</div>
          </div>
        ))}
      </div>

      {/* ── Kabupaten & Kota ── */}
      <div>
        <SectionHeader title="Kabupaten & Kota" emoji="🗺" />
        <div className="grid grid-cols-2 gap-1.5">
          {REGIONS.map((name) => (
            <Link
              key={name}
              href={`/category/${name.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-aceh-green-light border border-aceh-green/15 rounded-lg
                         px-2.5 py-[7px] font-label text-[11px] text-aceh-green-dark
                         font-semibold flex items-center gap-1.5
                         hover:bg-aceh-green hover:text-white transition-all duration-150 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-aceh-green group-hover:bg-white shrink-0 transition-colors" />
              {name}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Tag Cloud ── */}
      <div>
        <SectionHeader title="Kata Kunci" />
        <div className="flex flex-wrap gap-1.5">
          {TAGS.map(({ label, aceh }) => (
            <Link
              key={label}
              href={`/tag/${label.toLowerCase().replace(/\s+/g, '-')}`}
              className={`text-[11.5px] px-3 py-1 rounded-full border font-body
                         transition-colors duration-150 cursor-pointer
                         ${aceh
                ? 'bg-aceh-green-light border-aceh-green/30 text-aceh-green-dark hover:bg-aceh-green hover:text-white'
                : 'bg-surface border-border text-ink-soft hover:bg-gray-200'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

    </aside>
  )
}
