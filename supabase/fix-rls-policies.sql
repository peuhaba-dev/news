-- ============================================================
--  FIX RLS POLICIES — Run this in Supabase SQL Editor
--  Fixes: category dropdown empty + post insert blocked
-- ============================================================

-- ── CATEGORIES ──────────────────────────────────────────────

-- Drop conflicting policies
DROP POLICY IF EXISTS "Public read categories" ON public.categories;
DROP POLICY IF EXISTS "Admin manage categories" ON public.categories;

-- Recreate: anyone can SELECT
CREATE POLICY "categories_select"
  ON public.categories FOR SELECT
  USING (true);

-- Authenticated users can INSERT
CREATE POLICY "categories_insert"
  ON public.categories FOR INSERT TO authenticated
  WITH CHECK (true);

-- Authenticated users can UPDATE
CREATE POLICY "categories_update"
  ON public.categories FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- Authenticated users can DELETE
CREATE POLICY "categories_delete"
  ON public.categories FOR DELETE TO authenticated
  USING (true);

-- ── POSTS ───────────────────────────────────────────────────

-- Drop conflicting policies
DROP POLICY IF EXISTS "Public read published posts" ON public.posts;
DROP POLICY IF EXISTS "Admin manage posts" ON public.posts;

-- Anyone can SELECT published posts
CREATE POLICY "posts_select_published"
  ON public.posts FOR SELECT
  USING (published = true);

-- Authenticated users can SELECT ALL posts (including drafts)
CREATE POLICY "posts_select_all"
  ON public.posts FOR SELECT TO authenticated
  USING (true);

-- Authenticated users can INSERT
CREATE POLICY "posts_insert"
  ON public.posts FOR INSERT TO authenticated
  WITH CHECK (true);

-- Authenticated users can UPDATE
CREATE POLICY "posts_update"
  ON public.posts FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- Authenticated users can DELETE
CREATE POLICY "posts_delete"
  ON public.posts FOR DELETE TO authenticated
  USING (true);

-- ── COMMENTS ────────────────────────────────────────────────

-- Drop conflicting policies
DROP POLICY IF EXISTS "Public read approved comments" ON public.comments;
DROP POLICY IF EXISTS "Anyone can insert comment" ON public.comments;
DROP POLICY IF EXISTS "Admin manage comments" ON public.comments;

-- Anyone can SELECT approved comments
CREATE POLICY "comments_select_approved"
  ON public.comments FOR SELECT
  USING (approved = true);

-- Authenticated can SELECT ALL comments
CREATE POLICY "comments_select_all"
  ON public.comments FOR SELECT TO authenticated
  USING (true);

-- Anyone can INSERT a comment
CREATE POLICY "comments_insert"
  ON public.comments FOR INSERT
  WITH CHECK (true);

-- Authenticated can UPDATE (approve/reject)
CREATE POLICY "comments_update"
  ON public.comments FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- Authenticated can DELETE
CREATE POLICY "comments_delete"
  ON public.comments FOR DELETE TO authenticated
  USING (true);

-- ── BREAKING NEWS ───────────────────────────────────────────

-- Drop conflicting policies
DROP POLICY IF EXISTS "Public read active breaking news" ON public.breaking_news;
DROP POLICY IF EXISTS "Admin manage breaking news" ON public.breaking_news;

-- Anyone can SELECT active breaking news
CREATE POLICY "breaking_news_select_active"
  ON public.breaking_news FOR SELECT
  USING (active = true);

-- Authenticated can SELECT ALL
CREATE POLICY "breaking_news_select_all"
  ON public.breaking_news FOR SELECT TO authenticated
  USING (true);

-- Authenticated can INSERT
CREATE POLICY "breaking_news_insert"
  ON public.breaking_news FOR INSERT TO authenticated
  WITH CHECK (true);

-- Authenticated can UPDATE
CREATE POLICY "breaking_news_update"
  ON public.breaking_news FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- Authenticated can DELETE
CREATE POLICY "breaking_news_delete"
  ON public.breaking_news FOR DELETE TO authenticated
  USING (true);

-- ============================================================
-- DONE ✓ — All policies are now non-overlapping
-- ============================================================
