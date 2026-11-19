import { Sparkle } from '../ui/Icons'

const ITEMS = ['Free delivery over $200', 'New season arrivals', '30-day free returns', 'Up to 40% off', 'Secure checkout', 'Join & get 20% off']

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="overflow-hidden bg-gold py-3 text-forest" aria-label="Store highlights">
      <ul className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {[...row, ...row].map((t, i) => (
          <li key={i} className="flex items-center gap-10 text-sm font-bold uppercase tracking-[0.2em] sm:text-base" aria-hidden={i >= ITEMS.length}>
            {t}
            <Sparkle className="h-4 w-4" />
          </li>
        ))}
      </ul>
    </div>
  )
}
