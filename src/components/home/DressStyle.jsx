import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'

function StyleCard({ name, className = '', shift = false }) {
  const slug = name.toLowerCase()
  return (
    <Link
      to={`/shop?style=${slug}`}
      className={`group relative block h-[190px] overflow-hidden rounded-[20px] bg-white sm:h-[289px] ${className}`}
    >
      <img
        src={`/images/style/${slug}.jpg`}
        alt=""
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover object-right-top transition-transform duration-300 group-hover:scale-[1.03] ${shift ? 'max-sm:translate-x-[18%]' : ''}`}
      />
      <span className="absolute left-6 top-4 text-2xl font-bold sm:left-9 sm:top-[25px] sm:text-4xl">{name}</span>
    </Link>
  )
}

export default function DressStyle() {
  return (
    <section className="shell" aria-labelledby="dress-style-title">
      <div className="rounded-[40px] bg-surface px-6 pb-7 pt-10 sm:px-16 sm:pb-[70px] sm:pt-[70px]">
        <SectionHeading as="h2" className="text-center" eyebrow="Your vibe">
          <span id="dress-style-title">Browse by dress style</span>
        </SectionHeading>
        <div className="mt-8 grid gap-4 sm:mt-16 sm:gap-5">
          <div className="grid gap-4 sm:grid-cols-[407fr_685fr] sm:gap-5">
            <StyleCard name="Casual" />
            <StyleCard name="Formal" shift />
          </div>
          <div className="grid gap-4 sm:grid-cols-[685fr_407fr] sm:gap-5">
            <StyleCard name="Party" />
            <StyleCard name="Gym" />
          </div>
        </div>
      </div>
    </section>
  )
}
