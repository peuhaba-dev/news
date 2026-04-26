/**
 * ─────────────────────────────────────────────────────────
 *  FILE KONFIGURASI IKLAN — data/ads.ts
 *  Edit file ini untuk menambah / mengubah / menghapus iklan.
 *
 *  CARA PAKAI:
 *  1. Tambah objek baru ke dalam array ADS_CONFIG
 *  2. Tentukan `slot` sesuai posisi: 'top' | 'inline' | 'sidebar'
 *  3. `image` bersifat opsional; jika kosong, akan ditampilkan
 *     background gradient dari `brand.from` ke `brand.to`
 *  4. Untuk menonaktifkan iklan tertentu, ubah `active: false`
 * ─────────────────────────────────────────────────────────
 */

export type AdSlotType = 'top' | 'inline' | 'sidebar'

export interface AdConfig {
  /** ID unik untuk tracking / key React */
  id: string

  /** Posisi tampil di halaman */
  slot: AdSlotType

  /** URL tujuan saat iklan diklik */
  href: string

  /** Judul / nama produk yang diiklankan */
  title: string

  /** Tagline atau deskripsi singkat (1-2 kalimat) */
  tagline: string

  /** Label tombol CTA (misal: "Kunjungi", "Pelajari Lebih") */
  cta: string

  /** Warna brand untuk background gradient (jika `image` tidak ada) */
  brand: {
    /** Warna mulai gradient (hex/hsl/rgb) */
    from: string
    /** Warna akhir gradient */
    to: string
    /** Warna teks utama */
    text: string
    /** Warna tombol CTA */
    button: string
    /** Warna teks tombol */
    buttonText: string
  }

  /**
   * URL gambar banner (opsional).
   * Gunakan path lokal: '/ads/nama-gambar.jpg'
   * Atau URL eksternal: 'https://...'
   * Jika dikosongkan (''), akan pakai gradient brand.
   */
  image?: string

  /** Label kecil di pojok (misal: 'SPONSOR', 'IKLAN', 'PROMO') */
  badge?: string

  /** Aktifkan / nonaktifkan iklan ini */
  active: boolean
}

/**
 * ═══════════════════════════════════════════════════════
 *  DAFTAR IKLAN — Tambahkan iklan baru di sini ↓
 * ═══════════════════════════════════════════════════════
 */
export const ADS_CONFIG: AdConfig[] = [
  // ─── IKLAN 1: Wisata Meureno — Slot TOP (leaderboard) ───────────
  {
    id:      'wisata-meureno-top',
    slot:    'top',
    href:    'https://wisata.meureno.com/',
    title:   'Meureno Travel Guide',
    tagline: 'Panduan wisata Aceh terlengkap — destinasi, kuliner & penginapan terbaik Tanah Rencong.',
    cta:     'Jelajahi Sekarang →',
    badge:   'WISATA',
    brand: {
      from:       '#004D2A',
      to:         '#00703C',
      text:       '#ffffff',
      button:     '#C9941A',
      buttonText: '#111827',
    },
    image:  '',   // kosongkan untuk pakai gradient, atau isi dengan URL gambar
    active: true,
  },

  // ─── IKLAN 2: Wisata Meureno — Slot INLINE (di antara artikel) ──
  {
    id:      'wisata-meureno-inline',
    slot:    'inline',
    href:    'https://wisata.meureno.com/',
    title:   'Wisata Aceh Terbaik Ada di Sini',
    tagline: 'Temukan ratusan destinasi wisata, kuliner lokal, dan penginapan nyaman di seluruh Aceh.',
    cta:     'Lihat Destinasi',
    badge:   'PROMO',
    brand: {
      from:       '#1e3a5f',
      to:         '#00703C',
      text:       '#ffffff',
      button:     '#ffffff',
      buttonText: '#004D2A',
    },
    image:  '',
    active: true,
  },

  // ─── IKLAN 3: Wisata Meureno — Slot SIDEBAR ─────────────────────
  {
    id:      'wisata-meureno-sidebar',
    slot:    'sidebar',
    href:    'https://wisata.meureno.com/',
    title:   'Rencanakan Perjalanan ke Aceh',
    tagline: 'Panduan lokal terpercaya untuk wisatawan nusantara & mancanegara.',
    cta:     'Mulai Jelajahi',
    badge:   'SPONSOR',
    brand: {
      from:       '#004D2A',
      to:         '#1a6b3a',
      text:       '#ffffff',
      button:     '#C9941A',
      buttonText: '#111827',
    },
    image:  '',
    active: true,
  },

  // ─── TEMPLATE: Salin blok ini untuk iklan baru ──────────────────
  // {
  //   id:      'nama-brand-slot',       // ubah sesuai brand & slot
  //   slot:    'top',                   // 'top' | 'inline' | 'sidebar'
  //   href:    'https://...',
  //   title:   'Nama Brand / Produk',
  //   tagline: 'Deskripsi singkat produk atau layanan.',
  //   cta:     'Pelajari Lebih Lanjut',
  //   badge:   'IKLAN',
  //   brand: {
  //     from:       '#1a1a2e',
  //     to:         '#16213e',
  //     text:       '#ffffff',
  //     button:     '#e94560',
  //     buttonText: '#ffffff',
  //   },
  //   image:  '',                       // URL gambar atau kosongkan
  //   active: false,                    // ubah ke true untuk mengaktifkan
  // },
]

/** Helper: ambil satu iklan aktif untuk slot tertentu */
export function getAd(slot: AdSlotType): AdConfig | null {
  const ads = ADS_CONFIG.filter((a) => a.slot === slot && a.active)
  if (ads.length === 0) return null
  // Round-robin jika ada lebih dari satu iklan di slot yang sama
  // (untuk sekarang cukup ambil yang pertama / random)
  return ads[Math.floor(Math.random() * ads.length)]
}
