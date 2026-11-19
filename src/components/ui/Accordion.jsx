import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-black/10 rounded-[20px] border border-black/10">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.q} className="px-6 py-4 sm:px-8">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-1 text-left text-base font-bold sm:text-lg"
              >
                {it.q}
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </h3>
            {isOpen && <p className="pb-2 pt-2 text-black/70">{it.a}</p>}
          </div>
        )
      })}
    </div>
  )
}
