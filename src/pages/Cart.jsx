import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Tag, Trash2 } from 'lucide-react'
import { getProduct, money, COLORS } from '../data/products'
import { PROMO_CODES, summarize, useCart } from '../context/CartContext'
import Breadcrumb from '../components/ui/Breadcrumb'
import QuantityStepper from '../components/ui/QuantityStepper'
import SectionHeading from '../components/ui/SectionHeading'

export function useCartLines() {
  const { items, promo } = useCart()
  const lines = useMemo(
    () => items.map((i) => ({ ...i, product: getProduct(i.id) })).filter((l) => l.product),
    [items]
  )
  return { lines, promo, totals: summarize(lines, promo) }
}

export function OrderSummary({ children, totals, promo }) {
  return (
    <div className="rounded-[20px] border border-black/10 px-5 py-5 sm:px-6 sm:py-6">
      <h2 className="text-xl font-bold sm:text-2xl">Order Summary</h2>
      <dl className="mt-5 space-y-4 text-base sm:mt-6 sm:space-y-5 sm:text-xl">
        <div className="flex justify-between">
          <dt className="text-black/70">Subtotal</dt>
          <dd className="font-bold">{money(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-black/70">Discount{promo ? ` (-${totals.pct}%)` : ''}</dt>
          <dd className={`font-bold ${totals.discount ? 'text-gold-dark' : ''}`}>{totals.discount ? `-${money(totals.discount)}` : money(0)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-black/70">Delivery Fee</dt>
          <dd className="font-bold">{money(totals.delivery)}</dd>
        </div>
        <hr className="border-black/10" />
        <div className="flex justify-between">
          <dt>Total</dt>
          <dd className="text-xl font-bold sm:text-2xl">{money(totals.total)}</dd>
        </div>
      </dl>
      {children}
    </div>
  )
}

export default function Cart() {
  const { setQty, remove, applyPromo } = useCart()
  const { lines, promo, totals } = useCartLines()
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState(null)
  const navigate = useNavigate()

  const apply = (e) => {
    e.preventDefault()
    if (!code.trim()) return setMsg({ ok: false, text: 'Enter a promo code first.' })
    if (applyPromo(code)) {
      setMsg({ ok: true, text: `Code ${code.trim().toUpperCase()} applied.` })
      setCode('')
    } else {
      setMsg({ ok: false, text: 'That code isn’t valid. Try SHOP20.' })
    }
  }

  return (
    <div className="shell pb-14 sm:pb-20">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
      <SectionHeading as="h1" className="text-[32px] sm:text-[40px]">Your cart</SectionHeading>

      {lines.length === 0 ? (
        <div className="mt-6 rounded-[20px] border border-black/10 px-6 py-16 text-center sm:mt-8">
          <p className="text-2xl font-bold">Your cart is empty</p>
          <p className="mt-2 text-black/70">Add something you like and it will show up here.</p>
          <Link to="/shop" className="solid-btn mt-8">Browse products</Link>
        </div>
      ) : (
        <div className="mt-5 grid items-start gap-5 sm:mt-6 lg:grid-cols-[1fr_505px]">
          <ul className="divide-y divide-black/10 rounded-[20px] border border-black/10 px-4 sm:px-6">
            {lines.map((l) => (
              <li key={l.key} className="flex gap-3 py-4 sm:gap-4 sm:py-5">
                <Link
                  to={`/product/${l.product.id}`}
                  className="h-[99px] w-[99px] shrink-0 overflow-hidden rounded-lg bg-tile sm:h-[124px] sm:w-[124px] sm:rounded-[8.6px]"
                >
                  <img src={l.product.images[0]} alt={l.product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold sm:text-xl">
                        <Link to={`/product/${l.product.id}`}>{l.product.name}</Link>
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm">
                        Size: <span className="text-black/70">{l.size}</span>
                      </p>
                      <p className="text-xs sm:text-sm">
                        Color: <span className="text-black/70">{COLORS[l.color]?.label ?? l.color}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(l.key)}
                      aria-label={`Remove ${l.product.name}`}
                      className="text-[#FF3333] hover:text-[#cc2020]"
                    >
                      <Trash2 className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold sm:text-2xl">{money(l.product.price)}</span>
                    <QuantityStepper size="sm" value={l.qty} onChange={(q) => setQty(l.key, q)} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <OrderSummary totals={totals} promo={promo}>
            <form onSubmit={apply} className="mt-5 flex gap-3" noValidate>
              <label className="flex min-w-0 flex-1 items-center gap-3 rounded-full bg-surface px-4 focus-within:outline focus-within:outline-2 focus-within:outline-black">
                <Tag className="h-5 w-5 shrink-0 -scale-x-100 text-black/40" aria-hidden="true" />
                <span className="sr-only">Promo code</span>
                <input
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                    setMsg(null)
                  }}
                  placeholder="Add promo code"
                  className="w-full bg-transparent py-3 outline-none placeholder:text-black/50"
                />
              </label>
              <button type="submit" className="solid-btn px-8 py-3 sm:px-10">Apply</button>
            </form>
            <p role="status" className={`mt-2 min-h-[1.25rem] text-sm ${msg?.ok ? 'text-verified' : 'text-sale'}`}>
              {msg?.text}
            </p>
            {promo && !msg && (
              <p className="mt-2 text-sm text-black/70">Promo {promo} is applied ({PROMO_CODES[promo]}% off).</p>
            )}
            <button type="button" onClick={() => navigate('/checkout')} className="solid-btn mt-3 w-full gap-3 py-[15px]">
              Go to Checkout <ArrowRight className="h-5 w-5" />
            </button>
          </OrderSummary>
        </div>
      )}
    </div>
  )
}
