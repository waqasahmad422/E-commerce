import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ShoppingBag } from 'lucide-react'
import Rating from '../ui/Rating'
import PriceTag from '../ui/PriceTag'
import WishlistButton from '../ui/WishlistButton'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product, className = '' }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const href = `/product/${product.id}`

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1600)
    return () => clearTimeout(t)
  }, [added])

  const quickAdd = () => {
    add(product, { size: product.sizes.includes('Large') ? 'Large' : product.sizes[0], color: product.colors[0], qty: 1 })
    setAdded(true)
  }

  return (
    <div className={`group transition-transform duration-300 hover:-translate-y-1 ${className}`}>
      <div className="relative">
        <Link to={href} className="block" tabIndex={-1} aria-hidden="true">
          <div className="aspect-[295/298] overflow-hidden rounded-[20px] bg-tile transition-shadow duration-300 group-hover:shadow-card">
            <img
              src={product.images[0]}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
          </div>
        </Link>
        {product.isNew && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-medium text-gold">New</span>
        )}
        <WishlistButton id={product.id} name={product.name} floating />
        <button
          type="button"
          onClick={quickAdd}
          className="absolute inset-x-3 bottom-3 hidden translate-y-2 items-center justify-center gap-2 rounded-full bg-black py-2.5 text-sm font-medium text-white opacity-0 shadow-card transition-all duration-300 hover:bg-gold hover:text-black focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
        >
          {added ? (
            <><Check className="h-4 w-4" /> Added to cart</>
          ) : (
            <><ShoppingBag className="h-4 w-4" /> Quick add<span className="sr-only">: {product.name}</span></>
          )}
        </button>
      </div>
      <Link to={href} className="block">
        <h3 className="mt-3 text-base font-bold sm:mt-4 sm:text-xl">{product.name}</h3>
        <div className="mt-1 sm:mt-2"><Rating value={product.rating} size="sm" /></div>
        <div className="mt-1 sm:mt-2"><PriceTag product={product} /></div>
      </Link>
    </div>
  )
}
