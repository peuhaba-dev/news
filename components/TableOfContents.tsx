'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  html: string
}

export default function TableOfContents({ html }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Parse H2/H3 from HTML
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const headings = doc.querySelectorAll('h2, h3')
    const tocItems: TocItem[] = []

    headings.forEach((heading, i) => {
      const id = heading.id || `heading-${i}`
      tocItems.push({
        id,
        text: heading.textContent || '',
        level: heading.tagName === 'H2' ? 2 : 3,
      })
    })

    setItems(tocItems)
  }, [html])

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length < 2) return null

  return (
    <nav className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="font-label text-[12px] tracking-[1px] uppercase text-ink-soft font-bold mb-3">
        Daftar Isi
      </div>
      <ol className="space-y-1.5">
        {items.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block text-[13px] leading-relaxed transition-colors hover:text-aceh-green
                ${level === 3 ? 'pl-4' : ''}
                ${activeId === id ? 'text-aceh-green font-semibold' : 'text-ink-mid'}`}
            >
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
