import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { PRODUCTS } from '../../data/products'

const CATEGORIES = [
  { type: 'T-shirts', image: 'black-striped-tshirt' },
  { type: 'Shirts', image: 'vertical-striped-shirt' },
  { type: 'Jeans', image: 'skinny-fit-jeans' },
  { type: 'Shorts', image: 'loose-fit-bermuda-shorts' },
]

export default function CategoryGrid() {
  return (
    <section className="shell" aria-labelledby="category-title">
      <SectionHeading as="h2" className="text-center" eyebrow="Find your fit"><span id="category-title">Shop by category</span></SectionHeading>
      <ul className="mt-8 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-4">
        {CATEGORIES.map(({ type, image }) => {
          const product = PRODUCTS.find((p) => p.id === image)
          const count = PRODUCTS.filter((p) => p.type === type).length
          return (
            <li key={type}>
              <Link
                to={`/shop?type=${encodeURIComponent(type)}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-tile"
              >
                <img src={product.images[0]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <span className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full bg-black px-4 py-3 text-white sm:inset-x-4 sm:bottom-4">
                  <span>
                    <span className="block text-base font-bold sm:text-lg">{type}</span>
                    <span className="block text-xs text-white/70">{count} item{count === 1 ? '' : 's'}</span>
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-black transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
