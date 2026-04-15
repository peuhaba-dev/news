import Link from 'next/link'

interface SectionHeaderProps {
  title: string
  emoji?: string
  href?: string
  linkLabel?: string
}

export default function SectionHeader({
  title,
  emoji,
  href,
  linkLabel = 'Lihat semua ›',
}: SectionHeaderProps) {
  return (
    <div className="sec-head-border flex items-center justify-between mb-5 pb-2.5">
      <h2 className="font-label text-[17px] font-bold tracking-[0.8px] text-ink uppercase flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-aceh-green inline-block" />
        {emoji && <span>{emoji}</span>}
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="font-label text-[11.5px] tracking-[0.5px] text-aceh-green font-semibold
                     hover:underline flex items-center gap-1"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  )
}
