import { Link } from 'react-router-dom'
import { ArrowRight, Star, Truck } from 'lucide-react'
import { Sparkle } from '../ui/Icons'

const STATS = [
  { value: '200+', label: 'International Brands' },
  { value: '2,000+', label: 'High-Quality Products' },
  { value: '30,000+', label: 'Happy Customers' },
] 

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero" aria-labelledby="hero-title">
      {/* decorative glows + rings */}
      <div className="pointer-events-none absolute -right-24 top-10 h-[520px] w-[520px] rounded-full bg-gold/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-forest/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[8%] top-[12%] hidden h-[480px] w-[480px] rounded-full border-2 border-forest/10 lg:block" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[14%] top-[22%] hidden h-[340px] w-[340px] rounded-full border-2 border-gold/50 lg:block" aria-hidden="true" />

      <div className="shell relative grid items-end lg:grid-cols-[1.02fr_1fr]">
        <div className="animate-fade-up pb-6 pt-10 lg:pb-[88px] lg:pt-[96px]">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gold shadow-glow sm:text-sm">
            <Sparkle className="h-3.5 w-3.5" /> New season · Up to 40% off
          </p>
          <h1 id="hero-title" className="display text-[36px] leading-[1.05] sm:text-6xl sm:leading-[1.05] xl:text-[64px]">
            Find clothes that matches{' '}
            <span className="relative inline-block">
              <span className="relative z-10">your style</span>
              <span className="absolute inset-x-0 bottom-1 z-0 h-[0.28em] rounded-full bg-gold" aria-hidden="true" />
            </span>
          </h1>
          <p className="mt-6 max-w-[545px] text-sm text-black/70 sm:mt-9 sm:text-base">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your
            individuality and cater to your sense of style.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Link to="/shop" className="solid-btn group gap-2 px-10 shadow-card">
              Shop Now <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/shop?sale=1" className="pill-btn border-black/30 px-10">View Deals</Link>
          </div>

          <dl className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:mt-12 sm:justify-start sm:gap-x-8">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col text-center sm:text-left ${i > 0 ? 'sm:border-l sm:border-black/15 sm:pl-8' : ''} ${i === 1 ? 'border-l border-black/15 pl-6 sm:pl-8' : ''}`}
              >
                <dt className="order-2 text-xs text-black/70 sm:text-base">{s.label}</dt>
                <dd className="text-[24px] font-bold leading-tight sm:text-[40px]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <Sparkle className="absolute right-[4%] top-[8%] z-10 h-14 w-14 animate-float text-gold sm:h-[104px] sm:w-[104px] lg:right-[3%] lg:top-[14%]" />
          <Sparkle className="absolute left-[2%] top-[42%] z-10 h-7 w-7 animate-float text-black sm:h-[56px] sm:w-[56px] lg:-left-[2%]" />
          <img
            src="/images/hero.webp"
            alt="Two models wearing black denim jackets over white hoodies"
            width="700"
            height="663"
            className="relative w-full max-w-[560px] object-contain object-bottom drop-shadow-[0_24px_30px_rgba(18,61,43,0.25)] lg:max-w-none"
          />

          {/* floating glass cards */}
          <div className="absolute left-0 top-6 z-20 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-card backdrop-blur-md sm:flex lg:left-[4%] lg:top-[12%]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-black"><Star className="h-5 w-5" fill="currentColor" /></span>
            <div>
              <p className="text-lg font-bold leading-none">4.9 / 5</p>
              <p className="text-xs text-black/70">from 12k+ reviews</p>
            </div>
          </div>
          <div className="absolute right-0 top-[52%] z-20 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-card backdrop-blur-md lg:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-gold"><Truck className="h-5 w-5" /></span>
            <div>
              <p className="text-sm font-bold leading-none">Free delivery</p>
              <p className="text-xs text-black/70">on orders over $200</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
