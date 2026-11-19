export default function SectionHeading({ children, as: Tag = 'h2', className = '', eyebrow, bar = true }) {
  const center = className.includes('text-center')
  return (
    <div className={center ? 'text-center' : ''}>
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-gold-dark sm:text-sm">{eyebrow}</p>}
      <Tag className={`display text-[32px] leading-[1.1] sm:text-5xl sm:leading-[1.1] ${className}`}>{children}</Tag>
      {bar && <span className={`mt-4 block h-1.5 w-20 rounded-full bg-gold ${center ? 'mx-auto' : ''}`} aria-hidden="true" />}
    </div>
  )
}
