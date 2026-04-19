'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// ── Kota-kota Aceh ────────────────────────────
const CITIES = [
  { name: 'Banda Aceh', lat: 5.5483, lon: 95.3238 },
  { name: 'Lhokseumawe', lat: 5.1801, lon: 97.1507 },
  { name: 'Langsa', lat: 4.4686, lon: 97.9681 },
  { name: 'Sabang', lat: 5.8933, lon: 95.3167 },
  { name: 'Meulaboh', lat: 4.1363, lon: 96.1285 },
  { name: 'Takengon', lat: 4.6286, lon: 96.8460 },
  { name: 'Bireuen', lat: 5.2030, lon: 96.7000 },
  { name: 'Sigli', lat: 5.3817, lon: 96.1000 },
  { name: 'Blangkejeren', lat: 3.9667, lon: 97.3833 },
  { name: 'Jantho', lat: 5.2833, lon: 95.6167 },
  { name: 'Calang', lat: 4.6200, lon: 95.6300 },
  { name: 'Sinabang', lat: 2.4833, lon: 96.3833 },
]

// ── WMO Weather Code mapping ──────────────────
function getWeatherInfo(code: number): { label: string; icon: string } {
  if (code === 0) return { label: 'Cerah', icon: '☀️' }
  if (code === 1) return { label: 'Cerah Berawan', icon: '🌤️' }
  if (code === 2) return { label: 'Berawan Sebagian', icon: '⛅' }
  if (code === 3) return { label: 'Berawan', icon: '☁️' }
  if (code >= 45 && code <= 48) return { label: 'Berkabut', icon: '🌫️' }
  if (code >= 51 && code <= 55) return { label: 'Gerimis', icon: '🌦️' }
  if (code >= 56 && code <= 57) return { label: 'Gerimis Beku', icon: '🌧️' }
  if (code >= 61 && code <= 65) return { label: 'Hujan', icon: '🌧️' }
  if (code >= 66 && code <= 67) return { label: 'Hujan Beku', icon: '🌨️' }
  if (code >= 71 && code <= 77) return { label: 'Salju', icon: '❄️' }
  if (code >= 80 && code <= 82) return { label: 'Hujan Lebat', icon: '⛈️' }
  if (code >= 85 && code <= 86) return { label: 'Hujan Salju', icon: '🌨️' }
  if (code >= 95) return { label: 'Badai Petir', icon: '⛈️' }
  return { label: 'Tidak Diketahui', icon: '🌡️' }
}

interface CityWeather {
  name: string
  temperature: number
  humidity: number
  windSpeed: number
  weatherCode: number
}

export default function CuacaPage() {
  const [weatherData, setWeatherData] = useState<CityWeather[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string>('')

  useEffect(() => {
    fetchWeather()
  }, [])

  async function fetchWeather() {
    setLoading(true)
    setError(null)

    try {
      // Build batch request — Open-Meteo supports multiple locations
      const results: CityWeather[] = []

      // Fetch all cities in parallel
      const promises = CITIES.map(async (city) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia/Jakarta`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Gagal mengambil data ${city.name}`)
        const data = await res.json()

        return {
          name: city.name,
          temperature: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
          windSpeed: data.current.wind_speed_10m,
          weatherCode: data.current.weather_code,
        }
      })

      const settled = await Promise.allSettled(promises)
      settled.forEach((result) => {
        if (result.status === 'fulfilled') {
          results.push(result.value)
        }
      })

      if (results.length === 0) {
        setError('Gagal mengambil data cuaca. Periksa koneksi internet Anda.')
      } else {
        setWeatherData(results)
        setLastUpdate(
          new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })
        )
      }
    } catch {
      setError('Gagal mengambil data cuaca. Coba lagi nanti.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-portal mx-auto px-4 sm:px-5 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="text-[12px] text-ink-soft mb-4 flex items-center gap-1.5">
        <Link href="/" className="hover:text-aceh-green">Beranda</Link>
        <span>›</span>
        <span className="text-ink">Cuaca Aceh</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#004D2A] to-[#00703C] rounded-xl px-5 sm:px-6 py-5 sm:py-6 mb-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🌤️</span>
              <h1 className="font-head text-xl sm:text-2xl font-bold">Cuaca Aceh Hari Ini</h1>
            </div>
            <p className="text-white/70 text-[13px]">
              Prakiraan cuaca realtime untuk seluruh wilayah Aceh
            </p>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdate && (
              <span className="text-[11px] text-white/60">
                Diperbarui: {lastUpdate} WIB
              </span>
            )}
            <button
              onClick={fetchWeather}
              disabled={loading}
              className="bg-white/20 hover:bg-white/30 text-white text-[12px] font-semibold
                         px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? '⟳ Memuat...' : '⟳ Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-[13px] text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white border border-border rounded-xl p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
              <div className="h-10 bg-gray-200 rounded w-16 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-32 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-28" />
            </div>
          ))}
        </div>
      )}

      {/* Weather Grid */}
      {!loading && weatherData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {weatherData.map((city) => {
            const weather = getWeatherInfo(city.weatherCode)
            return (
              <div
                key={city.name}
                className="bg-white border border-border rounded-xl p-5
                           hover:shadow-md hover:border-aceh-green/30 transition-all duration-200 group"
              >
                {/* City name */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-head text-[15px] font-bold text-ink group-hover:text-aceh-green transition-colors">
                    {city.name}
                  </h3>
                  <span className="text-2xl">{weather.icon}</span>
                </div>

                {/* Temperature */}
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-head text-[36px] font-black text-ink leading-none">
                    {Math.round(city.temperature)}
                  </span>
                  <span className="text-[16px] text-ink-soft font-semibold">°C</span>
                </div>

                {/* Weather label */}
                <p className="text-[13px] text-aceh-green font-semibold mb-3">
                  {weather.label}
                </p>

                {/* Details */}
                <div className="flex items-center gap-4 text-[11.5px] text-ink-soft pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <span>💧</span>
                    <span>{city.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💨</span>
                    <span>{city.windSpeed} km/j</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Empty state */}
      {!loading && weatherData.length === 0 && !error && (
        <div className="text-center py-16 text-ink-soft">
          <div className="text-5xl mb-4">🌡️</div>
          <p className="font-head text-[18px] font-bold text-ink mb-2">Data cuaca tidak tersedia</p>
          <p className="text-[13px]">Silakan coba refresh halaman.</p>
        </div>
      )}

      {/* Footer info */}
      <div className="mt-8 text-center text-[11px] text-ink-soft">
        <p>
          Data cuaca bersumber dari{' '}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-aceh-green hover:underline"
          >
            Open-Meteo API
          </a>
          {' '}— Gratis dan open-source
        </p>
      </div>
    </div>
  )
}
