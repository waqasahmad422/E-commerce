import { Check } from 'lucide-react'
import { COLORS } from '../../data/products'

export default function ColorSwatch({ color, selected, onClick, size = 'md' }) {
  const { hex, label } = COLORS[color]
  const light = color === 'white' || color === 'yellow' || color === 'cyan'
  const dim = size === 'lg' ? 'h-[37px] w-[37px]' : 'h-9 w-9 sm:h-[37px] sm:w-[37px]'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={selected}
      title={label}
      className={`flex items-center justify-center rounded-full ${dim} ${
        color === 'white' ? 'border border-black/20' : 'border border-black/10'
      }`}
      style={{ backgroundColor: hex }}
    >
      {selected && <Check className={`h-4 w-4 ${light ? 'text-black' : 'text-white'}`} strokeWidth={2.5} />}
    </button>
  )
}
