import { useRef } from 'react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Rating from '../ui/Rating'
import { Verified } from '../ui/Icons'
import { TESTIMONIALS } from '../../data/reviews'

export default function Testimonials() {
  const track = useRef(null)
  const scroll = (dir) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * ((el.firstElementChild?.offsetWidth ?? 400) + 20), behavior: "smooth" })
  }

  return (
    <section aria-labelledby="happy-title" className="overflow-hidden">
      <div className="shell flex items-end justify-between">
        <SectionHeading as="h2" eyebrow="Loved by thousands">
          <span id="happy-title">Our happy customers</span>
        </SectionHeading>
        <div className="flex gap-4 pb-1 sm:gap-6">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous testimonials">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next testimonials">
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div
        className="mt-6 sm:mt-10"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)',
        }}
      >
        <ul
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth sm:gap-5"
          style={{ paddingInline: 'max(1rem, calc((100vw - 1240px) / 2))', scrollPaddingInline: 'max(1rem, calc((100vw - 1240px) / 2))' }}
          tabIndex={0}
          aria-label="Customer testimonials"
        >
          {TESTIMONIALS.map((t) => (
            <li
              key={t.id}
              className="relative min-h-[190px] w-[310px] shrink-0 snap-start rounded-[20px] border border-black/10 bg-white px-6 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card sm:min-h-[240px] sm:w-[400px] sm:px-8 sm:py-7"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-gold/40" aria-hidden="true" />
              <Rating value={5} showValue={false} size="md" />
              <p className="mt-3 flex items-center gap-1.5 text-lg font-bold sm:mt-4 sm:text-xl">
                {t.name} <Verified className="h-5 w-5 sm:h-6 sm:w-6" />
              </p>
              <p className="mt-2 text-sm leading-[1.5] text-black/70 sm:mt-3 sm:text-base">“{t.text}”</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
