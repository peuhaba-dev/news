'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Category } from '@/types'

const STATIC_PILLS = [
  { label: '🏠 Semua', slug: '' },
  { label: 'Berita Utama', slug: 'berita-utama' },
  { label: 'Banda Aceh', slug: 'banda-aceh' },
  { label: 'Aceh Besar', slug: 'aceh-besar' },
  { label: 'Pidie', slug: 'pidie' },
  { label: 'Lhokseumawe', slug: 'lhokseumawe' },
  { label: 'Langsa', slug: 'langsa' },
  { label: 'Aceh Tengah', slug: 'aceh-tengah' },
  { label: 'Gampong', slug: 'gampong' },
  { label: 'Pemuda', slug: 'pemuda' },
  { label: 'Teknologi', slug: 'teknologi' },
]

interface CategoryBarProps {
  categories?: Category[]
}

export default function CategoryBar({ categories }: CategoryBarProps) {
  const pathname = usePathname()

  const pills =
    categories && categories.length > 0
      ? [
          { label: '🏠 Semua', slug: '' },
          ...categories.map((c) => ({ label: c.name, slug: c.slug })),
        ]
      : STATIC_PILLS

  return (
    <div className="bg-surface border-b border-border">
      <div
        className="max-w-portal mx-auto px-5 flex gap-1
                   overflow-x-auto no-scrollbar"
      >
        {pills.map(({ label, slug }) => {
          const href = slug ? `/category/${slug}` : '/'
          const isActive =
            slug === ''
              ? pathname === '/'
              : pathname === `/category/${slug}`

          return (
            <Link
              key={slug}
              href={href}
              className={`font-label text-[11.5px] tracking-[0.8px] px-3.5 py-2
                          whitespace-nowrap border-b-[3px] transition-all duration-150
                          ${isActive
                            ? 'text-aceh-green border-aceh-green font-bold'
                            : 'text-ink-soft border-transparent hover:text-aceh-green hover:border-aceh-green'}`}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
