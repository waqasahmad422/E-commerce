import { Heart } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'

/** Heart toggle. `floating` pins it to the top-right of a (relative) product tile. */
export default function WishlistButton({ id, name, floating = false, className = '' }) {
  const { has, toggle } = useWishlist()
  const on = has(id)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(id)
      }}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
      className={`flex items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-gold-light ${
        floating ? 'absolute right-3 top-3 z-10 h-9 w-9' : 'h-11 w-11 border border-black/10 sm:h-[52px] sm:w-[52px]'
      } ${className}`}
    >
      <Heart className="h-5 w-5" strokeWidth={2} fill={on ? '#D9A52E' : 'none'} stroke={on ? '#9A6F0E' : '#123D2B'} />
    </button>
  )
}
