import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, RotateCcw, Truck } from 'lucide-react'
import { COLORS, getProduct, getRelated } from '../data/products'
import { FAQS } from '../data/reviews'
import { useCart } from '../context/CartContext'
import Breadcrumb from '../components/ui/Breadcrumb'
import Rating from '../components/ui/Rating'
import PriceTag from '../components/ui/PriceTag'
import ColorSwatch from '../components/ui/ColorSwatch'
import QuantityStepper from '../components/ui/QuantityStepper'
import ReviewsPanel from '../components/product/ReviewsPanel'
import WishlistButton from '../components/ui/WishlistButton'
import Accordion from '../components/ui/Accordion'
import ProductSection from '../components/product/ProductSection'

const TABS = [
  { id: 'details', label: 'Product Details' },
  { id: 'reviews', label: 'Rating & Reviews' },
  { id: 'faqs', label: 'FAQs' },
]

function Gallery({ product }) {
  const [active, setActive] = useState(0)
  useEffect(() => setActive(0), [product.id])
  const imgs = product.images
  const multi = imgs.length > 1
  return (
    <div className={`flex flex-col gap-3 lg:gap-3.5 ${multi ? 'lg:flex-row-reverse' : ''}`}>
      <div className="aspect-[358/290] flex-1 overflow-hidden rounded-[20px] bg-tile sm:aspect-[444/530] lg:aspect-auto lg:min-h-[530px]">
        <img src={imgs[active]} alt={product.name} className="h-full w-full object-cover" />
      </div>
      {multi && (
        <ul className="grid grid-cols-3 gap-3 lg:w-[152px] lg:grid-cols-1 lg:gap-3.5">
          {imgs.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1} of ${imgs.length}`}
                aria-current={i === active}
                className={`block aspect-square w-full overflow-hidden rounded-[20px] bg-tile ring-1 transition-shadow ${
                  i === active ? 'ring-2 ring-black' : 'ring-transparent hover:ring-black/30'
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  const { add } = useCart()
  const [color, setColor] = useState(null)
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('reviews')
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!product) return
    setColor(product.colors[0])
    setSize(product.sizes.includes('Large') ? 'Large' : product.sizes[0])
    setQty(1)
    setJustAdded(false)
  }, [product?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!justAdded) return
    const t = setTimeout(() => setJustAdded(false), 1800)
    return () => clearTimeout(t)
  }, [justAdded])

  if (!product) {
    return (
      <div className="shell py-24 text-center">
        <h1 className="display text-4xl">Product not found</h1>
        <p className="mt-4 text-black/70">This item may have been removed or the link is wrong.</p>
        <Link to="/shop" className="solid-btn mt-8">Browse all products</Link>
      </div>
    )
  }

  const addToCart = () => {
    add(product, { size, color, qty })
    setJustAdded(true)
  }

  return (
    <div className="shell pb-14 sm:pb-20">
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Shop', to: '/shop' },
          { label: product.styles[0], to: `/shop?style=${product.styles[0].toLowerCase()}` },
          { label: product.type },
        ]}
      />

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-10">
        <Gallery product={product} />

        <div>
          <h1 className="display text-[32px] leading-[1.05] sm:text-[40px] sm:leading-[1.05]">{product.name}</h1>
          <div className="mt-3 sm:mt-3.5">
            <Rating value={product.rating} size="lg" />
          </div>
          <div className="mt-3 sm:mt-4">
            <PriceTag product={product} size="lg" />
          </div>
          <p className="mt-4 text-sm text-black/70 sm:mt-5 sm:text-base">{product.description}</p>

          <hr className="my-5 border-black/10" />
          <fieldset>
            <legend className="text-base text-black/70">Select Colors</legend>
            <div className="mt-4 flex flex-wrap gap-3 sm:gap-4">
              {product.colors.map((c) => (
                <ColorSwatch key={c} color={c} size="lg" selected={color === c} onClick={() => setColor(c)} />
              ))}
            </div>
            <p className="sr-only" aria-live="polite">Selected colour: {color && COLORS[color].label}</p>
          </fieldset>

          <hr className="my-5 border-black/10" />
          <fieldset>
            <legend className="text-base text-black/70">Choose Size</legend>
            <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`rounded-full px-5 py-3 text-sm transition-colors sm:px-6 sm:py-3 sm:text-base ${
                    size === s ? 'bg-black text-white' : 'bg-surface text-black/70 hover:bg-black/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <hr className="my-5 border-black/10" />
          <div className="flex gap-3 sm:gap-5">
            <QuantityStepper value={qty} onChange={setQty} />
            <button type="button" onClick={addToCart} className="solid-btn h-11 flex-1 gap-2 py-0 sm:h-[52px]">
              {justAdded ? (
                <>
                  <Check className="h-5 w-5" /> Added to Cart
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
            <WishlistButton id={product.id} name={product.name} />
          </div>
          <ul className="mt-5 grid gap-2 rounded-[20px] bg-surface p-4 text-sm sm:grid-cols-2">
            <li className="flex items-center gap-3"><Truck className="h-5 w-5 shrink-0 text-gold-dark" /> Free delivery over $200</li>
            <li className="flex items-center gap-3"><RotateCcw className="h-5 w-5 shrink-0 text-gold-dark" /> 30-day free returns</li>
          </ul>
          <p role="status" className="sr-only">{justAdded ? `${product.name} added to cart` : ''}</p>
          {justAdded && (
            <p className="mt-3 text-sm text-black/70">
              <Link to="/cart" className="font-medium text-black underline underline-offset-2">View cart</Link> or keep shopping.
            </p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 sm:mt-[50px]">
        <div role="tablist" aria-label="Product information" className="grid grid-cols-3 border-b border-black/10">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`-mb-px border-b-2 px-1 py-4 text-sm sm:py-5 sm:text-xl ${
                tab === t.id ? 'border-black font-medium text-black' : 'border-transparent text-black/70 hover:text-black'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          {tab === 'details' && (
            <div className="grid gap-6 pt-6 sm:pt-8 md:grid-cols-2">
              <p className="text-black/70">{product.description}</p>
              <dl className="divide-y divide-black/10 rounded-[20px] border border-black/10 text-base">
                {[
                  ['Type', product.type],
                  ['Dress style', product.styles.join(', ')],
                  ['Colours', product.colors.map((c) => COLORS[c].label).join(', ')],
                  ['Sizes', product.sizes.join(', ')],
                  ['Care', 'Machine wash cold, tumble dry low'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 px-6 py-3.5">
                    <dt className="text-black/70">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          {tab === 'reviews' && <ReviewsPanel key={product.id} product={product} />}
          {tab === 'faqs' && (
            <div className="pt-6 sm:pt-8">
              <Accordion items={FAQS} />
            </div>
          )}
        </div>
      </div>

      <div className="-mx-4 mt-14 sm:mx-0 sm:mt-20">
        <ProductSection id="related" title="You might also like" products={getRelated(product)} />
      </div>
    </div>
  )
}
