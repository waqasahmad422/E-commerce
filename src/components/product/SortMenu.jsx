import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export const SORTS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
]

export default function SortMenu({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = SORTS.find((s) => s.value === value) || SORTS[0]

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1 text-base"
      >
        <span className="text-black/70">Sort by:</span>
        <span className="font-medium">{current.label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 top-full z-20 mt-2 w-52 rounded-[20px] border border-black/10 bg-white p-2 shadow-lg">
          {SORTS.map((s) => (
            <li key={s.value} role="option" aria-selected={s.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(s.value)
                  setOpen(false)
                }}
                className={`block w-full rounded-xl px-4 py-2.5 text-left text-sm hover:bg-surface ${
                  s.value === value ? 'font-bold' : ''
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
