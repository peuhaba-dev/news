'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// ── Kota-kota Aceh ────────────────────────────
const CITIES = [
  { name: 'Banda Aceh', city: 'Banda Aceh' },
  { name: 'Lhokseumawe', city: 'Lhokseumawe' },
  { name: 'Langsa', city: 'Langsa' },
  { name: 'Sabang', city: 'Sabang' },
  { name: 'Meulaboh', city: 'Meulaboh' },
  { name: 'Takengon', city: 'Takengon' },
  { name: 'Bireuen', city: 'Bireuen' },
  { name: 'Sigli', city: 'Sigli' },
]

interface PrayerTimes {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

interface CityPrayer {
  name: string
  timings: PrayerTimes
}

const PRAYER_LABELS: { key: keyof PrayerTimes; label: string; icon: string }[] = [
  { key: 'Fajr', label: 'Subuh', icon: '🌅' },
  { key: 'Sunrise', label: 'Syuruq', icon: '☀️' },
  { key: 'Dhuhr', label: 'Dzuhur', icon: '🕛' },
  { key: 'Asr', label: 'Ashar', icon: '🌤️' },
  { key: 'Maghrib', label: 'Maghrib', icon: '🌇' },
  { key: 'Isha', label: 'Isya', icon: '🌙' },
]

// Clean time from API (removes timezone suffix like " (WIB)")
function cleanTime(time: string): string {
  return time.replace(/\s*\(.*\)/, '').trim()
}

export default function ShalatPage() {
  const [selected, setSelected] = useState(0) // index of selected city
  const [data, setData] = useState<CityPrayer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    const now = new Date()
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ]
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    setDateStr(`${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`)

    fetchAllPrayers()
  }, [])

  async function fetchAllPrayers() {
    setLoading(true)
    setError(null)

    try {
      const results: CityPrayer[] = []

      const promises = CITIES.map(async (city) => {
        const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city.city)}&country=Indonesia&method=20`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Gagal fetch ${city.name}`)
        const json = await res.json()

        return {
          name: city.name,
          timings: {
            Fajr: cleanTime(json.data.timings.Fajr),
            Sunrise: cleanTime(json.data.timings.Sunrise),
            Dhuhr: cleanTime(json.data.timings.Dhuhr),
            Asr: cleanTime(json.data.timings.Asr),
            Maghrib: cleanTime(json.data.timings.Maghrib),
            Isha: cleanTime(json.data.timings.Isha),
          } as PrayerTimes,
        }
      })

      const settled = await Promise.allSettled(promises)
      settled.forEach((result) => {
        if (result.status === 'fulfilled') {
          results.push(result.value)
        }
      })

      if (results.length === 0) {
        setError('Gagal mengambil data jadwal shalat.')
      } else {
        setData(results)
      }
    } catch {
      setError('Gagal mengambil data. Periksa koneksi internet.')
    } finally {
      setLoading(false)
    }
  }

  const current = data[selected]

  return (
    <div className="max-w-portal mx-auto px-4 sm:px-5 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="text-[12px] text-ink-soft mb-4 flex items-center gap-1.5">
        <Link href="/" className="hover:text-aceh-green">Beranda</Link>
        <span>›</span>
        <span className="text-ink">Jadwal Shalat</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a3a1a] to-[#004D2A] rounded-xl px-5 sm:px-6 py-5 sm:py-6 mb-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🕌</span>
              <h1 className="font-head text-xl sm:text-2xl font-bold">Jadwal Shalat Aceh</h1>
            </div>
            <p className="text-white/70 text-[13px]">
              {dateStr || '...'} — Metode Kemenag RI
            </p>
          </div>
          <button
            onClick={fetchAllPrayers}
            disabled={loading}
            className="bg-white/20 hover:bg-white/30 text-white text-[12px] font-semibold
                       px-4 py-2 rounded-lg transition-colors disabled:opacity-50 self-start"
          >
            {loading ? '⟳ Memuat...' : '⟳ Refresh'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-[13px] text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* City selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CITIES.map((city, i) => (
          <button
            key={city.name}
            onClick={() => setSelected(i)}
            className={`text-[12px] font-label font-semibold px-3.5 py-1.5 rounded-full
                        transition-all duration-150
                        ${selected === i
                          ? 'bg-aceh-green text-white shadow-sm'
                          : 'bg-gray-100 text-ink-mid hover:bg-gray-200'}`}
          >
            {city.name}
          </button>
        ))}
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-border rounded-xl p-5 animate-pulse text-center">
              <div className="h-4 bg-gray-200 rounded w-12 mx-auto mb-3" />
              <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2" />
              <div className="h-3 bg-gray-100 rounded w-10 mx-auto" />
            </div>
          ))}
        </div>
      )}

      {/* Prayer times */}
      {!loading && current && (
        <>
          {/* City title */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📍</span>
            <h2 className="font-head text-[18px] font-bold text-ink">{current.name}</h2>
            <span className="text-[11px] text-ink-soft bg-gray-100 px-2 py-0.5 rounded-full">WIB</span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {PRAYER_LABELS.map(({ key, label, icon }) => (
              <div
                key={key}
                className="bg-white border border-border rounded-xl p-4 sm:p-5 text-center
                           hover:shadow-md hover:border-aceh-green/30 transition-all duration-200 group"
              >
                <div className="text-2xl mb-2">{icon}</div>
                <p className="text-[11px] text-ink-soft font-semibold uppercase tracking-wider mb-1">
                  {label}
                </p>
                <p className="font-head text-[24px] sm:text-[28px] font-black text-ink group-hover:text-aceh-green transition-colors">
                  {current.timings[key]}
                </p>
              </div>
            ))}
          </div>

          {/* All cities table */}
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-gray-50">
              <h3 className="font-head text-[14px] font-bold text-ink">
                Perbandingan Seluruh Kota
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-ink-soft font-semibold text-left border-b border-border">
                    <th className="px-4 py-2.5 sticky left-0 bg-white">Kota</th>
                    {PRAYER_LABELS.map(({ key, label }) => (
                      <th key={key} className="px-3 py-2.5 text-center whitespace-nowrap">{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.map((city, i) => (
                    <tr
                      key={city.name}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer
                                  ${i === selected ? 'bg-aceh-green-light/30 font-semibold' : ''}`}
                      onClick={() => setSelected(i)}
                    >
                      <td className="px-4 py-2.5 font-semibold text-ink sticky left-0 bg-inherit whitespace-nowrap">
                        {city.name}
                      </td>
                      {PRAYER_LABELS.map(({ key }) => (
                        <td key={key} className="px-3 py-2.5 text-center text-ink-mid">
                          {city.timings[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-[11px] text-ink-soft">
        <p>
          Data jadwal shalat bersumber dari{' '}
          <a href="https://aladhan.com/prayer-times-api" target="_blank" rel="noopener noreferrer"
             className="text-aceh-green hover:underline">
            Aladhan API
          </a>
          {' '}— Metode Kemenag RI (method 20)
        </p>
      </div>
    </div>
  )
}
