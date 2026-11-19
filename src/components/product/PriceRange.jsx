import { money } from '../../data/products'

/** Two-handle price slider built from two overlapping native range inputs. */
export default function PriceRange({ min, max, value, onChange }) {
  const [lo, hi] = value
  const pct = (v) => ((v - min) / (max - min)) * 100
  return (
    <div>
      <div className="dual-range relative mx-[10px] h-5">
        <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-surface" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-black"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={5}
          value={lo}
          aria-label="Minimum price"
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi - 5), hi])}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={5}
          value={hi}
          aria-label="Maximum price"
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo + 5)])}
        />
      </div>
      <div className="mt-2 flex justify-between text-sm font-medium">
        <span>{money(lo)}</span>
        <span>{money(hi)}</span>
      </div>
    </div>
  )
}
