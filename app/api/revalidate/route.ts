import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * On-demand revalidation endpoint.
 * Call this from Supabase Webhooks or a CMS to bust ISR cache.
 *
 * POST /api/revalidate
 * Headers: { Authorization: Bearer <REVALIDATION_SECRET> }
 * Body:    { path?: string, tag?: string }
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATION_SECRET
  const authHeader = req.headers.get('authorization')

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const { path, tag } = body as { path?: string; tag?: string }

    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({ revalidated: true, tag })
    }

    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, path })
    }

    // Full revalidation
    revalidatePath('/', 'layout')
    return NextResponse.json({ revalidated: true, full: true })

  } catch (err) {
    return NextResponse.json(
      { error: 'Revalidation failed', detail: String(err) },
      { status: 500 },
    )
  }
}
