# 🕌 Berita Meureno — Portal Berita Aceh

> Portal berita Aceh modern dibangun dengan Next.js 16, TypeScript, TailwindCSS, dan Supabase.

![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3+-38bdf8?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-2+-3ecf8e?logo=supabase)

---

## 📁 Struktur Proyek

```
berita-meureno/
├── app/
│   ├── layout.tsx              ← Root layout (Topbar, Navbar, Ticker, Footer)
│   ├── page.tsx                ← Homepage
│   ├── not-found.tsx           ← Custom 404
│   ├── sitemap.ts              ← Dynamic XML sitemap
│   ├── robots.ts               ← robots.txt
│   ├── auth/
│   │   └── login/page.tsx      ← Supabase auth login
│   ├── news/
│   │   └── [slug]/page.tsx     ← Article detail + SEO
│   └── category/
│       └── [slug]/page.tsx     ← Category listing
├── components/
│   ├── Topbar.tsx              ← Live date/time bar
│   ├── Ticker.tsx              ← Breaking news ticker
│   ├── Navbar.tsx              ← Sticky responsive navbar
│   ├── CategoryBar.tsx         ← Scrollable category pills
│   ├── Hero.tsx                ← 3-slot hero grid
│   ├── NewsCard.tsx            ← Horizontal article card
│   ├── BigCard.tsx             ← Large image overlay card
│   ├── Sidebar.tsx             ← Most read, regions, tags, gampong
│   ├── Footer.tsx              ← Full footer with links
│   ├── AdSlot.tsx              ← AdSense-ready ad placeholder
│   └── SectionHeader.tsx       ← Reusable section heading
├── lib/
│   ├── supabase.ts             ← Browser + Server Supabase clients
│   ├── queries.ts              ← All DB query functions
│   ├── utils.ts                ← Date formatting, slugify, readTime
│   └── database.types.ts       ← TypeScript DB types (auto-gen)
├── types/
│   └── index.ts                ← Shared TypeScript interfaces
├── styles/
│   └── globals.css             ← Tailwind + Acehnese design tokens
├── supabase/
│   └── schema.sql              ← Complete DB schema + seed data
├── middleware.ts               ← Auth session refresh + route guard
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── .env.example
```

---

## 🚀 Cara Menjalankan

### 1. Clone & Install

```bash
git clone https://github.com/your-org/berita-meureno.git
cd berita-meureno
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env.local
# Edit .env.local dan isi nilai berikut:
```

| Variable | Keterangan |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase Anda |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key Supabase |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | ID klien Google AdSense (opsional) |
| `NEXT_PUBLIC_SITE_URL` | URL produksi situs |
| `REVALIDATION_SECRET` | Secret untuk on-demand ISR |

### 3. Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com)
2. Buka **SQL Editor** → **New Query**
3. Paste dan jalankan isi `supabase/schema.sql`
4. *(Opsional)* Buat storage bucket untuk gambar artikel

```sql
-- Di SQL Editor Supabase
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true);
```

### 4. Generate TypeScript Types (Opsional tapi Direkomendasikan)

```bash
npx supabase login
npx supabase gen types typescript \
  --project-id YOUR_PROJECT_ID \
  > lib/database.types.ts
```

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 🏗️ Build & Deploy

```bash
# Type check
npm run type-check

# Build production
npm run build

# Jalankan production
npm start
```

### Deploy ke Vercel (Direkomendasikan)

```bash
npx vercel --prod
```

Tambahkan environment variables di dashboard Vercel.

---

## 🗄️ Database Schema

### Tabel `categories`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | TEXT | Nama kategori |
| `slug` | TEXT | URL-friendly slug (unique) |
| `created_at` | TIMESTAMPTZ | Waktu dibuat |

### Tabel `posts`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID | Primary key |
| `title` | TEXT | Judul artikel |
| `slug` | TEXT | URL slug (unique) |
| `content` | TEXT | Konten HTML artikel |
| `excerpt` | TEXT | Ringkasan artikel |
| `featured_image` | TEXT | URL gambar utama |
| `category_id` | UUID | FK → categories |
| `author` | TEXT | Nama penulis |
| `created_at` | TIMESTAMPTZ | Tanggal publikasi |
| `views` | INTEGER | Jumlah tayangan |
| `published` | BOOLEAN | Status publikasi |

### Tabel `comments`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID | Primary key |
| `post_id` | UUID | FK → posts |
| `name` | TEXT | Nama komentator |
| `content` | TEXT | Isi komentar |
| `approved` | BOOLEAN | Status moderasi |

### Tabel `breaking_news`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID | Primary key |
| `text` | TEXT | Teks breaking news |
| `active` | BOOLEAN | Status aktif |

---

## 💰 Integrasi Google AdSense

1. Daftar di [adsense.google.com](https://adsense.google.com)
2. Dapatkan `ca-pub-XXXXXXXXXXXXXXXX` (Client ID)
3. Set `NEXT_PUBLIC_ADSENSE_CLIENT` di `.env.local`
4. Di komponen `AdSlot`, tambahkan `adSlotId` dan `adClient`:

```tsx
<AdSlot
  slot="sidebar"
  adClient="ca-pub-XXXXXXXXXXXXXXXX"
  adSlotId="1234567890"
/>
```

Posisi iklan yang tersedia:
- `top` — Banner 970×90 di atas hero
- `sidebar` — Rectangle 300×250 di sidebar
- `inline` — Banner 728×90 di dalam artikel

---

## 🔐 Autentikasi Admin

Login tersedia di `/auth/login`. Setelah login, rute `/admin/*` terproteksi via middleware.

Untuk membuat admin pertama:
1. Buka Supabase Dashboard → Authentication → Users
2. Klik "Add User" dan buat akun baru

---

## 🎨 Design System

| Token | Nilai |
|---|---|
| `aceh-green` | `#00703C` |
| `aceh-green-dark` | `#004D2A` |
| `aceh-red` | `#C8102E` |
| `aceh-gold` | `#C9941A` |
| `font-head` | Playfair Display |
| `font-label` | Oswald |
| `font-body` | Source Sans 3 |

---

## 📈 SEO Features

- ✅ Dynamic `generateMetadata()` per halaman
- ✅ OpenGraph & Twitter Card
- ✅ JSON-LD structured data (NewsArticle schema)
- ✅ Dynamic `sitemap.xml`
- ✅ Custom `robots.txt`
- ✅ Canonical URLs
- ✅ `next/image` untuk optimasi gambar otomatis

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | TailwindCSS 3 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Images | next/image |
| Fonts | Google Fonts |
| Deploy | Vercel |

---

*Dibuat dengan ❤️ untuk Aceh — Meureno, artinya "tahu" dalam bahasa Aceh.*
