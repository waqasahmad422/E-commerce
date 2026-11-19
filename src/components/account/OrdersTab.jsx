import { Link, useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useOrders } from '../../context/OrdersContext'
import { COLORS, money } from '../../data/products'

const STEPS = ['Placed', 'Packed', 'Shipped', 'Delivered']

/** Demo tracking: progress is derived from how old the order is. */
function stepFor(iso) {
  const days = (Date.now() - new Date(iso).getTime()) / 86400000
  return days >= 5 ? 3 : days >= 3 ? 2 : days >= 1 ? 1 : 0
}

function Tracker({ step }) {
  return (
    <ol className="mt-5 grid grid-cols-4 gap-1" aria-label="Order progress">
      {STEPS.map((s, i) => {
        const done = i <= step
        return (
          <li key={s} className="text-center" aria-current={i === step ? 'step' : undefined}>
            <div className="relative flex items-center justify-center">
              <span className={`absolute left-0 right-1/2 h-0.5 ${i === 0 ? 'hidden' : done ? 'bg-black' : 'bg-black/15'}`} />
              <span className={`absolute left-1/2 right-0 h-0.5 ${i === STEPS.length - 1 ? 'hidden' : i < step ? 'bg-black' : 'bg-black/15'}`} />
              <span className={`relative flex h-7 w-7 items-center justify-center rounded-full ${done ? 'bg-black text-gold' : 'bg-surface text-black/50'}`}>
                {done ? <Check className="h-4 w-4" strokeWidth={3} /> : <span className="text-xs">{i + 1}</span>}
              </span>
            </div>
            <p className={`mt-1.5 text-xs sm:text-sm ${done ? 'font-bold' : 'text-black/70'}`}>{s}</p>
          </li>
        )
      })}
    </ol>
  )
}

export default function OrdersTab() {
  const { user } = useAuth()
  const { add } = useCart()
  const navigate = useNavigate()
  const orders = useOrders().forUser(user.id)

  if (!orders.length) {
    return (
      <div className="rounded-[20px] border border-black/10 px-6 py-16 text-center">
        <p className="text-2xl font-bold">No orders yet</p>
        <p className="mt-2 text-black/70">Orders you place while signed in will appear here with live progress.</p>
        <Link to="/shop" className="solid-btn mt-8">Browse products</Link>
      </div>
    )
  }

  const buyAgain = (o) => {
    o.lines.forEach((l) => add({ id: l.id }, { size: l.size, color: l.color, qty: l.qty }))
    navigate('/cart')
  }

  return (
    <ul className="space-y-5">
      {orders.map((o) => {
        const step = stepFor(o.date)
        return (
          <li key={o.id} className="rounded-[20px] border border-black/10 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold sm:text-xl">Order #{o.id}</h2>
                <p className="text-sm text-black/70">Placed {new Date(o.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
              </div>
              <span className="rounded-full bg-gold-light px-3 py-1 text-sm font-bold text-gold-dark">
                {step === 3 ? 'Delivered' : step === 2 ? 'Shipped' : step === 1 ? 'Packed' : 'Processing'}
              </span>
            </div>

            <Tracker step={step} />

            <ul className="mt-5 divide-y divide-black/10 border-t border-black/10">
              {o.lines.map((l) => (
                <li key={`${l.id}-${l.size}-${l.color}`} className="flex items-center gap-4 py-3">
                  <img src={l.image} alt="" className="h-16 w-16 rounded-lg bg-tile object-cover" />
                  <div className="min-w-0 flex-1">
                    <Link to={`/product/${l.id}`} className="block truncate font-bold hover:underline">{l.name}</Link>
                    <p className="text-sm text-black/70">{l.size} · {COLORS[l.color]?.label ?? l.color} · Qty {l.qty}</p>
                  </div>
                  <p className="font-bold">{money(l.price * l.qty)}</p>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4">
              <p className="text-lg">Total <span className="font-bold">{money(o.totals.total)}</span></p>
              <button type="button" onClick={() => buyAgain(o)} className="pill-btn px-8 py-2.5">Buy again</button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
