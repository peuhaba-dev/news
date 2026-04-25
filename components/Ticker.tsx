import type { BreakingNews } from '@/types'

const DEFAULT_TICKER: string[] = [
  'Gubernur Aceh Resmikan 12 Gampong Digital di Kabupaten Aceh Besar',
  'DPRK Banda Aceh Setujui APBK Perubahan 2026 Senilai Rp 1,2 Triliun',
  'Pemerintah Aceh Targetkan 500 Km Jalan Nasional Selesai Akhir Tahun',
  'Harga Kopi Gayo Melonjak di Pasar Internasional, Petani Aceh Tengah Bersyukur',
  'Tim SAR Berhasil Evakuasi Korban Banjir di Aceh Selatan, 47 Warga Mengungsi',
]

interface TickerProps {
  items?: BreakingNews[]
}

export default function Ticker({ items }: TickerProps) {
  const texts =
    items && items.length > 0 ? items.map((i) => i.title) : DEFAULT_TICKER

  // Duplikasi untuk loop mulus
  const doubled = [...texts, ...texts]

  return (
    <div
      className="bg-aceh-red text-white flex items-center overflow-hidden"
      style={{ height: 36 }}
    >
      {/* Label */}
      <div
        className="bg-[#8b0c1e] font-label text-[12px] tracking-[1.5px] px-4 h-full
                   flex items-center whitespace-nowrap shrink-0 gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-white blink inline-block" />
        BREAKING
      </div>

      {/* Scrolling track */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <div className="ticker-animate flex items-center whitespace-nowrap text-[13px] font-semibold gap-12">
          {doubled.map((text, i) => (
            <span key={i} className="before:content-['◆_'] before:text-[8px] before:mr-2 before:opacity-70">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
