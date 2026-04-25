import Link from 'next/link'
import type { Post } from '@/types'
// import AdSlot from './AdSlot' // DISABLED — stabilizing layout
import SectionHeader from './SectionHeader'
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
  { label: 'Tol Aceh', aceh: false }, { label: 'Ekonomi Aceh', aceh: false },
]

const GAMPONG_ITEMS = [
  {
    label: 'Gampong Inspiratif',
    title: 'Gampong Lamreung: Dari Sawah Konvensional ke BUMDes Organik Rp 80 Juta/Bulan',
  },
  {
    label: 'Gampong Digital',
    title: 'Gampong Lambaro Angan Kini Punya WiFi Gratis dan Loket Pelayanan Online',
  },
]

interface SidebarProps {
  mostReadPosts: Post[]
}

export default function Sidebar({ mostReadPosts }: SidebarProps) {
  return (
    <aside className="space-y-7">

      {/* ── AdSense Sidebar — DISABLED for stability ── */}

      {/* ── Most Read ── */}
      <div>
        <SectionHeader title="Paling Banyak Dibaca" emoji="🔥" />
        <ol>
          {mostReadPosts.map((post, i) => (
            <li key={post.id}>
              <Link
                href={`/news/${post.slug}`}
                className="flex items-start gap-3 py-3 border-b border-border
                           last:border-b-0 group cursor-pointer"
              >
                <span
                  className="font-label text-[26px] font-bold text-border
                             leading-none shrink-0 w-7 text-center
                             group-hover:text-aceh-green transition-colors"
                >
                  {i + 1}
                </span>
                <div>
                  <h4
                    className="font-head text-[14px] font-bold text-ink leading-[1.35]
                               group-hover:text-aceh-green transition-colors"
                  >
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-ink-soft mt-0.5">
                    {formatDate(post.created_at)} · {post.views.toLocaleString('id-ID')} dibaca
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Aceh Stats ── */}
      <div className="bg-aceh-green rounded-lg p-4 grid grid-cols-3 gap-3 text-center">
        {[
          { val: '6.497', lbl: 'Gampong' },
          { val: '23', lbl: 'Kabupaten/Kota' },
          { val: '5,6 Jt', lbl: 'Penduduk' },
        ].map(({ val, lbl }) => (
          <div key={lbl}>
            <div className="font-label text-[22px] font-bold text-white">{val}</div>
            <div className="text-[10px] text-white/75 uppercase tracking-[0.8px] mt-0.5">{lbl}</div>
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
              className="bg-aceh-green-light border border-aceh-green/15 rounded
                         px-2.5 py-[7px] font-label text-[11.5px] text-aceh-green-dark
                         font-semibold flex items-center gap-1.5
                         hover:bg-aceh-green hover:text-white transition-all duration-150 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-aceh-green group-hover:bg-white shrink-0 transition-colors" />
              {name}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Gampong Focus ── */}
      <div>
        <SectionHeader title="Gampong" emoji="🏡" />
        {GAMPONG_ITEMS.map(({ label, title }) => (
          <div
            key={label}
            className="bg-aceh-gold-light border border-aceh-gold/25 border-l-4 border-l-aceh-gold
                       rounded-md rounded-l-none px-3.5 py-3.5 mb-2 cursor-pointer
                       hover:bg-[#fff3cc] transition-colors duration-150"
          >
            <div className="font-label text-[10px] tracking-[1px] uppercase text-aceh-gold font-bold mb-1">
              {label}
            </div>
            <p className="font-head text-[14px] font-bold text-ink leading-[1.35]">{title}</p>
          </div>
        ))}
      </div>

      {/* ── Tag Cloud ── */}
      <div>
        <SectionHeader title="Kata Kunci" />
        <div className="flex flex-wrap gap-1.5">
          {TAGS.map(({ label, aceh }) => (
            <Link
              key={label}
              href={`/tag/${label.toLowerCase().replace(/\s+/g, '-')}`}
              className={`text-[11.5px] px-2.5 py-1 rounded-full border font-body
                         transition-colors duration-150 cursor-pointer
                         ${aceh
                           ? 'bg-aceh-green-light border-aceh-green/30 text-aceh-green-dark hover:bg-aceh-green hover:text-white'
                           : 'bg-surface border-border text-ink-soft hover:bg-gray-200'}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

    </aside>
  )
}
