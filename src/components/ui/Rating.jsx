import { Star } from 'lucide-react'

function Row({ className }) {
  return (
    <span className="flex w-max gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={className} fill="currentColor" strokeWidth={0} />
      ))}
    </span>  
  )
}

/** Five stars, filled to `value` (supports halves). */
export default function Rating({ value, size = 'md', showValue = true }) {
  const star = size === 'lg' ? 'h-[23px] w-[23px]' : size === 'sm' ? 'h-4 w-4' : 'h-[19px] w-[19px]'
  const pct = Math.max(0, Math.min(5, value)) * 20
  return (
    <span className="inline-flex items-center gap-3">
      <span
        className="relative inline-flex"
        role="img"
        aria-label={`Rated ${value} out of 5`}
      >
        <span className="text-black/10"><Row className={star} /></span>
        <span className="absolute inset-y-0 left-0 overflow-hidden text-star" style={{ width: `${pct}%` }}>
          <Row className={star} />
        </span>
      </span>
      {showValue && (
        <span className="text-sm leading-none sm:text-base">
          {value.toFixed(1)}
          <span className="text-black/70">/5</span>
        </span>
      )}
    </span>
  )
}
