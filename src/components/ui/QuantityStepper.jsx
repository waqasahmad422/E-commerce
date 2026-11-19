import { Minus, Plus } from 'lucide-react'

export default function QuantityStepper({ value, onChange, size = 'lg', min = 1, max = 99 }) {
  const sm = size === 'sm'
  return (
    <div
      className={`inline-flex items-center justify-between rounded-full bg-surface ${
        sm ? 'h-8 w-[105px] px-3 sm:h-11 sm:w-[126px] sm:px-5' : 'h-11 w-[120px] px-4 sm:h-[52px] sm:w-[170px] sm:px-5'
      }`}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="disabled:opacity-30"
      >
        <Minus className={sm ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-5 w-5 sm:h-6 sm:w-6'} />
      </button>
      <span className={`font-medium tabular-nums ${sm ? 'text-sm sm:text-base' : 'text-base'}`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="disabled:opacity-30"
      >
        <Plus className={sm ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-5 w-5 sm:h-6 sm:w-6'} />
      </button>
    </div>
  )
}
