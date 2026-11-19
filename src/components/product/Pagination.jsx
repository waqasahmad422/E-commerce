import { ArrowLeft, ArrowRight } from 'lucide-react'

function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, 2, 3, total - 2, total - 1, total, current - 1, current, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const out = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push('gap-' + p)
    out.push(p)
  })
  return out
}

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null
  const btn =
    'inline-flex items-center gap-2 rounded-lg border border-black/10 px-3.5 py-2 text-sm font-medium transition-colors hover:bg-surface disabled:pointer-events-none disabled:opacity-40'
  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-2 border-t border-black/10 pt-5 sm:mt-8">
      <button type="button" className={btn} disabled={page === 1} onClick={() => onChange(page - 1)}>
        <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Previous</span>
        <span className="sr-only sm:hidden">Previous</span>
      </button>
      <ul className="flex items-center gap-0.5 sm:gap-1">
        {pageList(page, pages).map((p) =>
          typeof p === 'string' ? (
            <li key={p} className="w-8 text-center text-sm text-black/50 sm:w-10" aria-hidden="true">…</li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => onChange(p)}
                aria-current={p === page ? 'page' : undefined}
                className={`h-9 w-8 rounded-lg text-sm font-medium sm:h-10 sm:w-10 ${
                  p === page ? 'bg-surface text-black' : 'text-black/50 hover:bg-surface'
                }`}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>
      <button type="button" className={btn} disabled={page === pages} onClick={() => onChange(page + 1)}>
        <span className="hidden sm:inline">Next</span>
        <span className="sr-only sm:hidden">Next</span> <ArrowRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
