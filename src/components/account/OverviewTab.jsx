import { Link } from 'react-router-dom'
import { Heart, MapPin, Package, ShoppingBag } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useOrders } from '../../context/OrdersContext'
import { PRODUCTS, money } from '../../data/products'
import ProductCard from '../product/ProductCard'

export default function OverviewTab() {
  const { user } = useAuth()
  const { items } = useCart()
  const { count: wishCount } = useWishlist()
  const orders = useOrders().forUser(user.id)
  const cartCount = items.reduce((n, i) => n + i.qty, 0)
  const recommended = PRODUCTS.filter((p) => p.styles.includes('Casual')).sort((a, b) => b.sold - a.sold).slice(0, 3)
  const last = orders[0]
  const itemCount = last ? last.lines.reduce((n, l) => n + l.qty, 0) : 0

  const stats = [
    { Icon: Package, label: 'Orders', value: orders.length, to: '/account/orders' },
    { Icon: Heart, label: 'Wishlist', value: wishCount, to: '/wishlist' },
    { Icon: ShoppingBag, label: 'In your cart', value: cartCount, to: '/cart' },
    { Icon: MapPin, label: 'Addresses', value: user.addresses.length, to: '/account/addresses' },
  ]

  return (
    <div className="space-y-8">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map(({ Icon, label, value, to }) => (
          <li key={label}>
            <Link to={to} className="flex flex-col gap-3 rounded-[20px] border border-black/10 p-4 transition-colors hover:border-gold sm:p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-gold"><Icon className="h-5 w-5" /></span>
              <span className="text-3xl font-bold leading-none">{value}</span>
              <span className="text-sm text-black/70">{label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <section aria-labelledby="recent-title" className="rounded-[20px] border border-black/10 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 id="recent-title" className="text-xl font-bold">Latest order</h2>
          {last && <Link to="/account/orders" className="text-sm font-medium underline underline-offset-2">View all</Link>}
        </div>
        {last ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-bold">#{last.id}</p>
              <p className="text-sm text-black/70">
                {new Date(last.date).toLocaleDateString('en-US', { dateStyle: 'long' })} · {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
            <p className="text-xl font-bold">{money(last.totals.total)}</p>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl bg-surface px-5 py-8 text-center">
            <p className="font-bold">No orders yet</p>
            <p className="mt-1 text-sm text-black/70">When you place an order it will show up here.</p>
            <Link to="/shop" className="solid-btn mt-5">Start shopping</Link>
          </div>
        )}
      </section>

      <section aria-labelledby="rec-title">
        <h2 id="rec-title" className="text-xl font-bold">Picked for you</h2>
        <ul className="mt-4 grid grid-cols-2 gap-x-3.5 gap-y-6 sm:gap-x-5 lg:grid-cols-3">
          {recommended.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
        </ul>
      </section>
    </div>
  )
}
