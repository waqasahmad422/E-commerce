import { MoreHorizontal } from 'lucide-react'
import Rating from '../ui/Rating'
import { Verified } from '../ui/Icons'

export const formatDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function ReviewCard({ review }) {
  return (
    <article className="rounded-[20px] border border-black/10 px-6 py-6 sm:px-8 sm:py-7">
      <div className="flex items-start justify-between">
        <Rating value={review.rating} showValue={false} size="md" />
        <button type="button" aria-label="More options" className="text-black/40 hover:text-black">
          <MoreHorizontal className="h-6 w-6" />
        </button>
      </div>
      <h3 className="mt-3 flex items-center gap-1.5 text-lg font-bold sm:mt-4 sm:text-xl">
        {review.name} <Verified className="h-5 w-5 sm:h-6 sm:w-6" />
      </h3>
      <p className="mt-2 text-sm leading-[1.5] text-black/70 sm:mt-3 sm:text-base">“{review.text}”</p>
      <p className="mt-4 text-sm font-medium text-black/70 sm:mt-6 sm:text-base">Posted on {formatDate(review.date)}</p>
    </article>
  )
}
