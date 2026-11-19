import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/** items: [{ label, to? }] — the last item is the current page. */
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="py-5 text-base text-black/70 sm:py-6">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-3">
              {last || !item.to ? (
                <span className={last ? 'text-black' : ''} aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="hover:text-black">{item.label}</Link>
              )}
              {!last && <ChevronRight className="h-4 w-4" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
