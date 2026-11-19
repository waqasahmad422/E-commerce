const BRANDS = [
  { name: 'Versace', src: '/images/brands/versace.png', w: 167, h: 33 },
  { name: 'Zara', src: '/images/brands/zara.png', w: 86, h: 38 },
  { name: 'Gucci', src: '/images/brands/gucci.png', w: 156, h: 32 },
  { name: 'Prada', src: '/images/brands/prada.png', w: 195, h: 32 },
  { name: 'Calvin Klein', src: '/images/brands/calvin-klein.png', w: 208, h: 34 },
]

export default function BrandStrip() {
  return (
    <section id="brands" aria-label="Brands we carry" className="scroll-mt-4 bg-black py-8 sm:py-11">
      <ul className="shell flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-10 lg:justify-between">
        {BRANDS.map((b) => (
          <li key={b.name} className="flex items-center">
            <img
              src={b.src}
              alt={b.name}
              width={b.w}
              height={b.h}
              style={{ '--w': `${b.w}px` }}
              className="h-auto w-[calc(var(--w)*0.62)] sm:w-[calc(var(--w)*0.8)] lg:w-[var(--w)]"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
