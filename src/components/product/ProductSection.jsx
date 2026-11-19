import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'
import ProductCard from './ProductCard'

/** Heading + product grid (horizontal scroller on phones) + optional "View All". */
export default function ProductSection({ title, products, viewAllTo, id, eyebrow }) {
  return (
    <section className="shell" aria-labelledby={id}>
      <SectionHeading as="h2" className="text-center" eyebrow={eyebrow}>
        <span id={id}>{title}</span>
      </SectionHeading>
      <ul className="no-scrollbar -mx-4 mt-8 flex scroll-px-4 snap-x gap-4 overflow-x-auto px-4 sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:scroll-px-0 sm:px-0 lg:grid-cols-4">
        {products.map((p) => (
          <li key={p.id} className="w-[198px] shrink-0 snap-start sm:w-auto">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
      {viewAllTo && (
        <div className="mt-6 text-center sm:mt-9">
          <Link to={viewAllTo} className="pill-btn w-full sm:w-auto">
            View All
          </Link>
        </div>
      )}
    </section>
  )
}
