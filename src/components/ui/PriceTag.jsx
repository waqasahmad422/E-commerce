import { money } from '../../data/products'

export default function PriceTag({ product, size = 'md' }) {
  const big = size === 'lg'
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 sm:gap-x-3">
      <span className={`font-bold ${big ? 'text-[32px] leading-none' : 'text-xl sm:text-2xl'}`}>
        {money(product.price)} 
      </span>
      {product.oldPrice && (
        <>
          <span className={`font-bold text-black/40 line-through ${big ? 'text-[32px] leading-none' : 'text-xl sm:text-2xl'}`}>
            {money(product.oldPrice)}
          </span>
          <span className={`rounded-full bg-gold-light font-bold text-gold-dark ${big ? 'px-3.5 py-1.5 text-base' : 'px-3 py-1 text-xs'}`}>
            -{product.discount}%
          </span>
        </>
      )}
    </div>
  )
}
