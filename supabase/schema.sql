-- ============================================================
--  BERITA MEURENO — Supabase SQL Schema
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── Enable UUID extension ────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: categories
-- ============================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories"
  ON public.categories FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admin manage categories"
  ON public.categories FOR ALL TO authenticated
  USING (auth.role() = 'authenticated');

-- ── Seed categories ──────────────────────────────────────────
INSERT INTO public.categories (name, slug) VALUES
  ('Aceh Terkini',   'aceh-terkini'),
  ('Nasional',       'nasional'),
  ('Ekonomi',        'ekonomi'),
  ('Hukum',          'hukum'),
  ('Pendidikan',     'pendidikan'),
  ('Religi',         'religi'),
  ('Wisata',         'wisata'),
  ('Opini',          'opini'),
  ('Teknologi',      'teknologi'),
  ('Gampong',        'gampong'),
  ('Banda Aceh',     'banda-aceh'),
  ('Aceh Besar',     'aceh-besar'),
  ('Pidie',          'pidie'),
  ('Lhokseumawe',    'lhokseumawe'),
  ('Aceh Tengah',    'aceh-tengah')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- TABLE: posts
-- ============================================================
CREATE TABLE IF NOT EXISTS public.posts (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title          TEXT NOT NULL,
  slug           TEXT NOT NULL UNIQUE,
  content        TEXT NOT NULL DEFAULT '',
  excerpt        TEXT NOT NULL DEFAULT '',
  featured_image TEXT,
  category_id    UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  author         TEXT NOT NULL DEFAULT 'Redaksi',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  views          INTEGER NOT NULL DEFAULT 0,
  published      BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS posts_slug_idx        ON public.posts(slug);
CREATE INDEX IF NOT EXISTS posts_category_idx    ON public.posts(category_id);
CREATE INDEX IF NOT EXISTS posts_created_at_idx  ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS posts_views_idx       ON public.posts(views DESC);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published posts"
  ON public.posts FOR SELECT TO anon, authenticated
  USING (published = true);

CREATE POLICY "Admin manage posts"
  ON public.posts FOR ALL TO authenticated
  USING (auth.role() = 'authenticated');

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── Seed posts ───────────────────────────────────────────────
INSERT INTO public.posts (title, slug, excerpt, content, author, views, category_id)
SELECT
  'Gubernur Aceh Luncurkan Program "Gampong Digital" untuk 6.497 Desa di Seluruh Aceh',
  'gubernur-aceh-gampong-digital-6497-desa',
  'Program Gampong Digital ditargetkan menjangkau seluruh desa di Aceh sebelum akhir 2026, memberikan akses internet dan layanan digital bagi masyarakat pedesaan.',
  '<p>Gubernur Aceh hari ini secara resmi meluncurkan program ambisius "Gampong Digital" yang akan menjangkau 6.497 gampong (desa) di seluruh wilayah Aceh. Program ini merupakan bagian dari visi besar transformasi digital provinsi Aceh menuju era modern.</p><p>Dalam sambutannya di Pendopo Gubernuran Banda Aceh, Gubernur menyatakan bahwa program ini akan memberikan akses internet berkecepatan tinggi, layanan administrasi online, dan pelatihan digital bagi seluruh masyarakat desa.</p><h2>Target dan Implementasi</h2><p>Program akan dilaksanakan secara bertahap. Pada fase pertama, 500 gampong di Kabupaten Aceh Besar dan Pidie akan mendapatkan infrastruktur internet fiber optik.</p>',
  'Ahmad Fauzan',
  1204,
  (SELECT id FROM public.categories WHERE slug = 'aceh-terkini')
WHERE NOT EXISTS (SELECT 1 FROM public.posts WHERE slug = 'gubernur-aceh-gampong-digital-6497-desa');

INSERT INTO public.posts (title, slug, excerpt, content, author, views, category_id)
SELECT
  'Harga Kopi Gayo Tembus Rp 120.000/Kg di Pasar Eropa, Petani Rayakan',
  'harga-kopi-gayo-rp-120000-per-kg-pasar-eropa',
  'Para petani kopi di dataran tinggi Gayo, Kabupaten Aceh Tengah, merayakan kenaikan harga kopi arabika Gayo yang kini menembus Rp 120.000 per kilogram di pasar internasional.',
  '<p>Harga kopi Gayo di pasar internasional terus menunjukkan tren positif. Kopi arabika dari dataran tinggi Gayo, Aceh Tengah, kini diperdagangkan seharga Rp 120.000 per kilogram di beberapa pasar Eropa.</p><p>Kenaikan ini dipicu oleh meningkatnya permintaan kopi specialty dari konsumen Eropa yang semakin menghargai kualitas dan asal-usul kopi.</p>',
  'Siti Rahma',
  876,
  (SELECT id FROM public.categories WHERE slug = 'ekonomi')
WHERE NOT EXISTS (SELECT 1 FROM public.posts WHERE slug = 'harga-kopi-gayo-rp-120000-per-kg-pasar-eropa');

INSERT INTO public.posts (title, slug, excerpt, content, author, views, category_id)
SELECT
  'Masjid Raya Baiturrahman Tambah Kapasitas Jadi 80.000 Jamaah',
  'masjid-raya-baiturrahman-kapasitas-80000-jamaah',
  'Renovasi besar-besaran Masjid Raya Baiturrahman Banda Aceh telah selesai, meningkatkan kapasitas masjid kebanggaan masyarakat Aceh menjadi 80.000 jamaah.',
  '<p>Masjid Raya Baiturrahman, ikon kebanggaan masyarakat Aceh, kini mampu menampung hingga 80.000 jamaah setelah selesainya renovasi besar-besaran yang berlangsung selama dua tahun.</p><p>Renovasi ini meliputi perluasan area salat, penambahan menara baru, serta pemasangan sistem pendingin udara modern yang ramah lingkungan.</p>',
  'Teuku Arif',
  2341,
  (SELECT id FROM public.categories WHERE slug = 'religi')
WHERE NOT EXISTS (SELECT 1 FROM public.posts WHERE slug = 'masjid-raya-baiturrahman-kapasitas-80000-jamaah');

-- ============================================================
-- TABLE: comments
-- ============================================================
CREATE TABLE IF NOT EXISTS public.comments (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id    UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  content    TEXT NOT NULL,
  approved   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS comments_post_idx ON public.comments(post_id);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read approved comments"
  ON public.comments FOR SELECT TO anon, authenticated
  USING (approved = true);

CREATE POLICY "Anyone can insert comment"
  ON public.comments FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin manage comments"
  ON public.comments FOR ALL TO authenticated
  USING (auth.role() = 'authenticated');

-- ============================================================
-- TABLE: breaking_news
-- ============================================================
CREATE TABLE IF NOT EXISTS public.breaking_news (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text       TEXT NOT NULL,
  active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.breaking_news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active breaking news"
  ON public.breaking_news FOR SELECT TO anon, authenticated
  USING (active = true);

CREATE POLICY "Admin manage breaking news"
  ON public.breaking_news FOR ALL TO authenticated
  USING (auth.role() = 'authenticated');

-- ── Seed breaking news ───────────────────────────────────────
INSERT INTO public.breaking_news (text) VALUES
  ('Gubernur Aceh Resmikan 12 Gampong Digital di Kabupaten Aceh Besar'),
  ('DPRK Banda Aceh Setujui APBK Perubahan 2026 Senilai Rp 1,2 Triliun'),
  ('Pemerintah Aceh Targetkan 500 Km Jalan Nasional Selesai Akhir Tahun'),
  ('Harga Kopi Gayo Melonjak di Pasar Internasional, Petani Aceh Tengah Bersyukur'),
  ('Tim SAR Berhasil Evakuasi Korban Banjir di Aceh Selatan, 47 Warga Mengungsi');

-- ============================================================
-- Supabase Storage Bucket for images
-- ============================================================
-- Run this separately in Supabase SQL Editor:
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('post-images', 'post-images', true)
-- ON CONFLICT (id) DO NOTHING;
--
-- CREATE POLICY "Public read images"
--   ON storage.objects FOR SELECT TO anon
--   USING (bucket_id = 'post-images');
--
-- CREATE POLICY "Auth upload images"
--   ON storage.objects FOR INSERT TO authenticated
--   WITH CHECK (bucket_id = 'post-images');

-- ============================================================
-- DONE ✓
-- ============================================================
