import Link from 'next/link'
import AdSlot from './AdSlot'

interface RelatedPost {
  id: string
  title: string
  slug: string
  category?: { name: string } | null
}

interface ArticleContentProps {
  html: string
  relatedPosts: RelatedPost[]
}

/**
 * Adds IDs to H2/H3 headings for TOC linking.
 * Injects internal links after paragraph 2–3.
 * Injects AdSlot after paragraph 2 and at the middle.
 */
function processContent(html: string, relatedPosts: RelatedPost[]): string[] {
  // Split content into paragraphs/blocks
  const blocks = html.split(/(?=<(?:p|h[2-6]|blockquote|ul|ol|div|figure|table)[\s>])/i).filter(Boolean)

  // Add IDs to headings
  let headingIndex = 0
  const processed = blocks.map((block) => {
    const headingMatch = block.match(/^<(h[23])([\s>])/i)
    if (headingMatch) {
      const tag = headingMatch[1]
      const rest = block.slice(headingMatch[0].length)
      const id = `heading-${headingIndex++}`
      return `<${tag} id="${id}" ${rest.startsWith('>') ? rest : '>' + rest}`
    }
    return block
  })

  return processed
}

function buildInternalLinksHtml(posts: RelatedPost[]): string {
  if (posts.length === 0) return ''
  const links = posts
    .slice(0, 3)
    .map((p) => `<li><a href="/news/${p.slug}" style="color:#00703C;font-weight:600;text-decoration:underline;">${p.title}</a></li>`)
    .join('')

  return `<div style="background:#e8f5ee;border-left:4px solid #00703C;border-radius:0 6px 6px 0;padding:14px 20px;margin:1.5rem 0;">
    <div style="font-family:'Oswald',sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:700;color:#004D2A;margin-bottom:8px;">Baca Juga</div>
    <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;">${links}</ul>
  </div>`
}

export default function ArticleContent({ html, relatedPosts }: ArticleContentProps) {
  const blocks = processContent(html, relatedPosts)
  const internalLinksHtml = buildInternalLinksHtml(relatedPosts)

  // Count paragraphs to know where to inject
  let pCount = 0
  const totalParagraphs = blocks.filter((b) => b.trim().startsWith('<p')).length
  const midPoint = Math.floor(totalParagraphs / 2)

  let pSeen = 0
  let adAfter2Injected = false
  let internalLinksInjected = false
  let midAdInjected = false

  return (
    <div className="article-content">
      {blocks.map((block, i) => {
        const isParagraph = block.trim().startsWith('<p')
        if (isParagraph) {
          pCount++
          pSeen++
        }

        const elements: React.ReactNode[] = [
          <div key={`block-${i}`} dangerouslySetInnerHTML={{ __html: block }} />,
        ]

        // After paragraph 2: inject ad slot
        if (isParagraph && pCount === 2 && !adAfter2Injected) {
          adAfter2Injected = true
          elements.push(<AdSlot key="ad-after-p2" slot="inline" className="my-6" />)
        }

        // After paragraph 3: inject internal links
        if (isParagraph && pCount === 3 && !internalLinksInjected && internalLinksHtml) {
          internalLinksInjected = true
          elements.push(
            <div
              key="internal-links"
              dangerouslySetInnerHTML={{ __html: internalLinksHtml }}
            />
          )
        }

        // Middle of article: inject ad
        if (isParagraph && pSeen === midPoint && !midAdInjected && midPoint > 3) {
          midAdInjected = true
          elements.push(<AdSlot key="ad-mid" slot="inline" className="my-6" />)
        }

        return elements
      })}
    </div>
  )
}
