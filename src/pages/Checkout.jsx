import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrdersContext'
import { money } from '../data/products'
import { uid } from '../lib/storage'
import { useCartLines, OrderSummary } from './Cart'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'
import Field from '../components/ui/Field'

const FIELDS = [
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', span: 2 },
  { name: 'first', label: 'First name', autoComplete: 'given-name' },
  { name: 'last', label: 'Last name', autoComplete: 'family-name' },
  { name: 'address', label: 'Address', autoComplete: 'street-address', span: 2 },
  { name: 'city', label: 'City', autoComplete: 'address-level2' },
  { name: 'zip', label: 'Postal code', autoComplete: 'postal-code' },
  { name: 'card', label: 'Card number', inputMode: 'numeric', autoComplete: 'cc-number', span: 2, placeholder: '1234 1234 1234 1234' },
  { name: 'exp', label: 'Expiry (MM/YY)', autoComplete: 'cc-exp', placeholder: 'MM/YY' },
  { name: 'cvc', label: 'CVC', inputMode: 'numeric', autoComplete: 'cc-csc' },
]

export default function Checkout() {
  const { clear } = useCart()
  const { user } = useAuth()
  const { place } = useOrders()
  const { lines, promo, totals } = useCartLines()

  // Prefill from the signed-in profile and its default address
  const initial = useMemo(() => {
    if (!user) return {}
    const [first, ...rest] = user.name.trim().split(/\s+/)
    const a = user.addresses.find((x) => x.isDefault) || user.addresses[0]
    return { email: user.email, first, last: rest.join(' '), ...(a ? { address: a.line1, city: a.city, zip: a.zip } : {}) }
  }, [user])

  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    FIELDS.forEach((f) => {
      if (!(values[f.name] || '').trim()) next[f.name] = `Enter your ${f.label.toLowerCase().replace(/ \(.*\)/, '')}.`
    })
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Enter a valid email address.'
    setErrors(next)
    if (Object.keys(next).length) return

    const placed = {
      id: uid().toUpperCase().slice(0, 6),
      userId: user?.id ?? null,
      date: new Date().toISOString(),
      totals,
      address: { name: `${values.first} ${values.last}`, line1: values.address, city: values.city, zip: values.zip },
      lines: lines.map((l) => ({
        id: l.product.id, name: l.product.name, image: l.product.images[0],
        size: l.size, color: l.color, qty: l.qty, price: l.product.price,
      })),
    }
    place(placed)
    setOrder(placed)
    clear()
  }

  if (order) {
    return (
      <div className="shell py-16 text-center sm:py-24">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
        <h1 className="display mt-6 text-[32px] sm:text-5xl">Order placed</h1>
        <p className="mx-auto mt-4 max-w-md text-black/70">
          Thanks for your order. Your reference is <span className="font-bold text-black">#{order.id}</span> and the
          total was {money(order.totals.total)}. This is a frontend demo, so no payment was taken.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {user ? (
            <Link to="/account/orders" className="solid-btn">Track my order</Link>
          ) : (
            <Link to="/login?mode=signup" className="solid-btn">Create an account to track orders</Link>
          )}
          <Link to="/shop" className="pill-btn">Continue shopping</Link>
        </div>
      </div>
    )
  }

  if (!lines.length) {
    return (
      <div className="shell py-16 text-center sm:py-24">
        <h1 className="display text-[32px] sm:text-5xl">Nothing to check out</h1>
        <p className="mt-4 text-black/70">Your cart is empty.</p>
        <Link to="/shop" className="solid-btn mt-8">Browse products</Link>
      </div>
    )
  }

  return (
    <div className="shell pb-14 sm:pb-20">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <SectionHeading as="h1" className="text-[32px] sm:text-[40px]">Checkout</SectionHeading>

      <div className="mt-5 grid items-start gap-5 sm:mt-6 lg:grid-cols-[1fr_505px]">
        <form onSubmit={submit} noValidate id="checkout-form" className="grid gap-4 rounded-[20px] border border-black/10 p-5 sm:grid-cols-2 sm:p-8">
          <p className="text-sm text-black/70 sm:col-span-2">
            {user ? `Signed in as ${user.email}. Your details are prefilled.` : <>Checking out as a guest. <Link to="/login" state={{ from: '/checkout' }} className="font-bold text-black underline underline-offset-2">Sign in</Link> to prefill and track this order.</>}
            {' '}Demo form: nothing is sent anywhere and no payment is taken.
          </p>
          {FIELDS.map((f) => (
            <Field
              key={f.name}
              id={f.name}
              label={f.label}
              type={f.type || 'text'}
              inputMode={f.inputMode}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              className={f.span === 2 ? 'sm:col-span-2' : ''}
              value={values[f.name] || ''}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              error={errors[f.name]}
            />
          ))}
        </form>

        <OrderSummary totals={totals} promo={promo}>
          <button type="submit" form="checkout-form" className="solid-btn mt-6 w-full py-[15px]">
            Place order · {money(totals.total)}
          </button>
        </OrderSummary>
      </div>
    </div>
  )
}
