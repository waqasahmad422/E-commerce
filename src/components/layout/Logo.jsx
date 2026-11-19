import { Link } from 'react-router-dom'

/** WAS Shop wordmark: gold "W" tile + heavy expanded type. */
export default function Logo({ className = 'text-[22px] sm:text-[28px]', dark = false }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="WAS Shop home">
      <span className="grid aspect-square h-[1.35em] place-items-center rounded-[0.35em] bg-gold font-display text-[0.8em] font-black leading-none text-forest" style={{ fontVariationSettings: "'wdth' 125" }} aria-hidden="true">
        W
      </span>
      <span className={`display normal-case tracking-tight ${dark ? 'text-white' : ''}`}>
        WAS <span className={dark ? 'text-gold' : 'text-forest-700'}>Shop</span>
      </span>
    </Link>
  )
}
