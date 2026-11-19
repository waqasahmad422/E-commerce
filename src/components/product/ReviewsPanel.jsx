import { useMemo, useState } from 'react'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import ReviewCard from './ReviewCard'
import WriteReviewModal from './WriteReviewModal'
import { FEATURED_REVIEWS, GENERIC_REVIEWS } from '../../data/reviews'

const ORDERS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'highest', label: 'Highest rated' },
  { value: 'lowest', label: 'Lowest rated' },
]

export default function ReviewsPanel({ product }) {
  const base = product.id === 'one-life-graphic-tshirt' ? FEATURED_REVIEWS : GENERIC_REVIEWS
  const [added, setAdded] = useState([])
  const [order, setOrder] = useState('latest')
  const [topOnly, setTopOnly] = useState(false)
  const [shown, setShown] = useState(6)
  const [writing, setWriting] = useState(false)

  const list = useMemo(() => {
    let l = [...added, ...base]
    if (topOnly) l = l.filter((r) => r.rating >= 4)
    const sorters = {
      latest: (a, b) => b.date.localeCompare(a.date),
      oldest: (a, b) => a.date.localeCompare(b.date),
      highest: (a, b) => b.rating - a.rating,
      lowest: (a, b) => a.rating - b.rating,
    }
    return l.sort(sorters[order])
  }, [added, base, order, topOnly])

  const total = (product.reviewCount || base.length) + added.length

  const post = ({ name, rating, text }) => {
    const date = new Date().toISOString().slice(0, 10)
    setAdded((a) => [{ id: `new-${Date.now()}`, name, rating, text, date }, ...a])
    setWriting(false)
  }

  return (
    <div className="pt-6 sm:pt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold sm:text-2xl">
          All Reviews <span className="text-base font-normal text-black/70">({total})</span>
        </h2>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setTopOnly((t) => !t)}
            aria-pressed={topOnly}
            aria-label="Show only reviews rated 4 stars and above"
            title="Show only 4 stars and above"
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors sm:h-12 sm:w-12 ${
              topOnly ? 'bg-black text-white' : 'bg-surface'
            }`}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
          <label className="relative">
            <span className="sr-only">Sort reviews</span>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="h-11 appearance-none rounded-full bg-surface pl-4 pr-9 text-sm sm:pl-5 sm:pr-11 sm:text-base font-medium outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-black sm:h-12"
            >
              {ORDERS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 sm:right-4 -translate-y-1/2" />
          </label>
          <button type="button" onClick={() => setWriting(true)} className="solid-btn h-11 whitespace-nowrap px-4 py-0 text-sm sm:h-12 sm:px-8 sm:text-base">
            Write a Review
          </button>
        </div>
      </div>

      {list.length ? (
        <ul className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 md:grid-cols-2">
          {list.slice(0, shown).map((r) => (
            <li key={r.id}>
              <ReviewCard review={r} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-[20px] border border-black/10 px-6 py-10 text-center text-black/70">
          No reviews at 4 stars or above yet.
        </p>
      )}

      {shown < list.length && (
        <div className="mt-6 text-center sm:mt-9">
          <button type="button" onClick={() => setShown((s) => s + 6)} className="pill-btn">
            Load More Reviews
          </button>
        </div>
      )}

      {writing && <WriteReviewModal onClose={() => setWriting(false)} onSubmit={post} />}
    </div>
  )
}
