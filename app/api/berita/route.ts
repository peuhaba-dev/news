import { NextRequest, NextResponse } from 'next/server'
import { slugify } from '@/lib/utils'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.meureno.com'

/**
 * POST /api/berita — Create article (for n8n automation)
 *
 * Accepts JSON body:
 *   - title (required)
 *   - content (required)
 *   - excerpt (required)
 *   - author (required)
 *   - categoryId (optional)
 *   - featuredImage (optional)
 *   - status: 'draft' | 'published' (default: 'draft')
 *
 * Safe Mode: defaults to draft, never auto-publishes.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, author, categoryId, featuredImage, status } = body

    // Validate required fields
    if (!title || !content || !excerpt || !author) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, excerpt, author' },
        { status: 400 }
      )
    }

    const slug = slugify(title) + '-' + Date.now()
    const published = status === 'published' // Default is draft (false)

    const res = await fetch(`${API}/api/berita/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug,
        content,
        excerpt,
        author,
        featuredImage: featuredImage || null,
        categoryId: categoryId || null,
        published,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return NextResponse.json(
        { error: err.message || 'Failed to create post via backend API' },
        { status: res.status }
      )
    }

    const created = await res.json()

    return NextResponse.json(
      {
        success: true,
        message: published ? 'Post published' : 'Post saved as draft',
        post: created,
      },
      { status: 201 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
