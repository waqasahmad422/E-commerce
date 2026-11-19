import { Link } from 'react-router-dom'
import useCountdown from '../../hooks/useCountdown'
import { getProduct } from '../../data/products'
import PriceTag from '../ui/PriceTag'

const pad = (n) => String(n).padStart(2, '0')

function Unit({ value, label }) {
  return (
    <div className="flex w-[68px] flex-col items-center rounded-2xl bg-white/10 py-3 sm:w-[84px]">
      <span className="text-2xl font-bold tabular-nums text-gold sm:text-4xl">{pad(value)}</span>
      <span className="text-[11px] uppercase tracking-widest text-white/70 sm:text-xs">{label}</span>
    </div>
  )
}

export default function DealOfTheWeek() {
  const t = useCountdown()
  const product = getProduct('one-life-graphic-tshirt')
  return (
    <section className="shell" aria-labelledby="deal-title">
      <div className="relative grid items-center gap-8 overflow-hidden rounded-[28px] bg-black px-6 py-8 text-white sm:rounded-[40px] sm:px-14 sm:py-14 lg:grid-cols-2">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full border-2 border-gold/20" aria-hidden="true" />
        <div className="relative">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">Deal of the week</p>
          <h2 id="deal-title" className="display mt-3 text-[32px] leading-[1.1] sm:text-5xl sm:leading-[1.1]">
            {product.discount}% off the One Life tee
          </h2>
          <p className="mt-4 max-w-md text-white/75">
            Soft, breathable cotton with a graphic you won’t see on anyone else. This week only, while stock lasts.
          </p>
          <div className="mt-6 flex gap-2 sm:gap-3" role="timer" aria-label="Time left on this deal">
            <Unit value={t.days} label="Days" />
            <Unit value={t.hours} label="Hours" />
            <Unit value={t.minutes} label="Mins" />
            <Unit value={t.seconds} label="Secs" />
          </div>
          <Link to={`/product/${product.id}`} className="gold-btn mt-8 w-full sm:w-auto">Grab the deal</Link>
        </div>

        <Link to={`/product/${product.id}`} className="group relative mx-auto block w-full max-w-[420px] -rotate-2 transition-transform duration-500 hover:rotate-0">
          <div className="relative overflow-hidden rounded-[24px] bg-tile">
            <img src={product.images[0]} alt={product.name} loading="lazy" className="aspect-[444/530] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            <span className="absolute left-4 top-4 rounded-full bg-gold px-4 py-1.5 text-sm font-bold text-black">-{product.discount}%</span>
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-black">
              <span className="font-bold">{product.name}</span>
              <PriceTag product={{ ...product, oldPrice: null }} />
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
