import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { useWishlist } from '../context/WishlistContext'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'
import ProductCard from '../components/product/ProductCard'

export default function Wishlist() {
  const { ids, clear } = useWishlist()
  const products = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean)

  return (
    <div className="shell pb-14 sm:pb-20">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionHeading as="h1" className="text-[32px] sm:text-[40px]">Your wishlist</SectionHeading>
        {products.length > 0 && (
          <button type="button" onClick={clear} className="text-sm font-medium underline underline-offset-2">Clear all</button>
        )}
      </div>

      {products.length ? (
        <ul className="mt-6 grid grid-cols-2 gap-x-3.5 gap-y-6 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-4">
          {products.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
        </ul>
      ) : (
        <div className="mt-6 rounded-[20px] border border-black/10 px-6 py-16 text-center">
          <Heart className="mx-auto h-12 w-12 text-gold" />
          <p className="mt-4 text-2xl font-bold">Nothing saved yet</p>
          <p className="mt-2 text-black/70">Tap the heart on any product to keep it here for later.</p>
          <Link to="/shop" className="solid-btn mt-8">Browse products</Link>
        </div>
      )}
    </div>
  )
}
