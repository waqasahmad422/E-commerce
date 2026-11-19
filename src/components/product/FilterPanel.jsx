import { useState } from 'react'
import { ChevronDown, ChevronRight, ChevronUp, SlidersHorizontal, X } from 'lucide-react'
import { FILTER_COLORS, SIZES, STYLES, TYPES } from '../../data/products'
import PriceRange from './PriceRange'
import ColorSwatch from '../ui/ColorSwatch'

export const PRICE_MIN = 50
export const PRICE_MAX = 300

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className="border-t border-black/10 py-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left text-xl font-bold"
      >
        {title}
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </section>
  )
}

function NavRow({ label, active, onClick }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`flex w-full items-center justify-between py-2.5 text-left text-base ${
          active ? 'font-bold text-black' : 'text-black/70 hover:text-black'
        }`}
      >
        {label}
        <ChevronRight className="h-4 w-4" />
      </button>
    </li>
  )
}

/**
 * draft/setDraft hold the staged price, colour and size choices (applied with the button).
 * type and style apply immediately, like category links.
 */
export default function FilterPanel({ draft, setDraft, activeType, activeStyle, onType, onStyle, onApply, onReset, onClose }) {
  const toggle = (key, value) =>
    setDraft((d) => ({
      ...d,
      [key]: d[key].includes(value) ? d[key].filter((v) => v !== value) : [...d[key], value],
    }))

  return (
    <div className="rounded-[20px] border border-black/10 px-5 py-5 sm:px-6">
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-xl font-bold">Filters</h2>
        {onClose ? (
          <button type="button" onClick={onClose} aria-label="Close filters" className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
            <X className="h-4 w-4" />
          </button>
        ) : (
          <SlidersHorizontal className="h-5 w-5 text-black/40" aria-hidden="true" />
        )}
      </div>

      <div className="border-t border-black/10 pt-3">
        <ul>
          {TYPES.map((t) => (
            <NavRow key={t} label={t} active={activeType === t} onClick={() => onType(activeType === t ? null : t)} />
          ))}
        </ul>
      </div>

      <Section title="Price">
        <PriceRange min={PRICE_MIN} max={PRICE_MAX} value={draft.price} onChange={(price) => setDraft((d) => ({ ...d, price }))} />
      </Section>

      <Section title="Colors">
        <div className="flex flex-wrap gap-3 sm:gap-x-[15px] sm:gap-y-4">
          {FILTER_COLORS.map((c) => (
            <ColorSwatch key={c} color={c} selected={draft.colors.includes(c)} onClick={() => toggle('colors', c)} />
          ))}
        </div>
      </Section>

      <Section title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => {
            const on = draft.sizes.includes(s)
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggle('sizes', s)}
                aria-pressed={on}
                className={`rounded-full px-5 py-2.5 text-sm transition-colors ${
                  on ? 'bg-black text-white' : 'bg-surface text-black/70 hover:bg-black/10'
                }`}
              >
                {s}
              </button>
            )
          })}
        </div>
      </Section>

      <Section title="Dress Style">
        <ul>
          {STYLES.map((s) => (
            <NavRow
              key={s}
              label={s}
              active={activeStyle === s.toLowerCase()}
              onClick={() => onStyle(activeStyle === s.toLowerCase() ? null : s.toLowerCase())}
            />
          ))}
        </ul>
      </Section>

      <div className="space-y-2 pt-2">
        <button type="button" onClick={onApply} className="solid-btn w-full py-3.5">
          Apply Filter
        </button>
        <button type="button" onClick={onReset} className="w-full py-2 text-sm text-black/70 underline underline-offset-2 hover:text-black">
          Clear all filters
        </button>
      </div>
    </div>
  )
}
