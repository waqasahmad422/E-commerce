export default function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div>
        <p className="font-medium">{label}</p>
        {description && <p className="text-sm text-black/70">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? 'bg-black' : 'bg-black/20'}`}
      >
        <span className={`absolute top-0.5 h-6 w-6 rounded-full transition-all ${checked ? 'left-[22px] bg-gold' : 'left-0.5 bg-white'}`} />
      </button>
    </div>
  )
}
