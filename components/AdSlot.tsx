interface AdSlotProps {
  slot: 'top' | 'sidebar' | 'inline'
  adSlotId?: string          // Google AdSense data-ad-slot value
  className?: string
}

const SLOT_CONFIG: Record<AdSlotProps['slot'], { label: string; className: string }> = {
  top:     { label: 'IKLAN — 970×90',  className: 'h-[90px]'  },
  sidebar: { label: 'IKLAN — 300×250', className: 'h-[250px] mb-6' },
  inline:  { label: 'IKLAN — 728×90',  className: 'h-[100px] my-6' },
}

export default function AdSlot({ slot, adSlotId, className = '' }: AdSlotProps) {
  const { label, className: defaultClass } = SLOT_CONFIG[slot]
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  const isProd = process.env.NODE_ENV === 'production' && adSlotId && adClient

  // In production with valid AdSense IDs — render real ad
  if (isProd) {
    return (
      <div className={`${defaultClass} ${className}`}>
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={adSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  // Development / placeholder
  return (
    <div
      className={`${defaultClass} ${className}
                  bg-gradient-to-br from-gray-100 to-gray-200
                  border border-dashed border-gray-300 rounded-md
                  flex items-center justify-center
                  text-gray-400 text-[11px] font-body tracking-widest uppercase`}
    >
      {label}
    </div>
  )
}
