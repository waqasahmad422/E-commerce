import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import Breadcrumb from '../components/ui/Breadcrumb'
import ProductCard from '../components/product/ProductCard'
import FilterPanel, { PRICE_MAX, PRICE_MIN } from '../components/product/FilterPanel'
import Pagination from '../components/product/Pagination'
import SortMenu from '../components/product/SortMenu'

const PAGE_SIZE = 9
const EMPTY_DRAFT = { price: [PRICE_MIN, PRICE_MAX], colors: [], sizes: [] }
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const style = params.get('style')
  const type = params.get('type')
  const q = (params.get('q') || '').trim()
  const onSale = params.get('sale') === '1'
  const onlyNew = params.get('new') === '1'
  const sort = params.get('sort') || 'popular'
  const page = Math.max(1, Number(params.get('page')) || 1)

  const [draft, setDraft] = useState(EMPTY_DRAFT)
  const [applied, setApplied] = useState(EMPTY_DRAFT)
  const [drawer, setDrawer] = useState(false)

  const update = (changes, { keepPage = false } = {}) => {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([k, v]) => (v == null || v === '' ? next.delete(k) : next.set(k, v)))
    if (!keepPage) next.delete('page')
    setParams(next)
  }

  const results = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false
      if (onSale && !p.discount) return false
      if (onlyNew && !p.isNew) return false
      if (type && p.type !== type) return false
      if (style && !p.styles.map((s) => s.toLowerCase()).includes(style)) return false
      if (p.price < applied.price[0] || p.price > applied.price[1]) return false
      if (applied.colors.length && !p.colors.some((c) => applied.colors.includes(c))) return false
      if (applied.sizes.length && !p.sizes.some((s) => applied.sizes.includes(s))) return false
      return true
    })
    const by = {
      popular: (a, b) => b.sold - a.sold,
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      newest: (a, b) => Number(!!b.isNew) - Number(!!a.isNew) || b.sold - a.sold,
    }
    return list.sort(by[sort] || by.popular)
  }, [q, onSale, onlyNew, type, style, applied, sort])

  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const visible = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const from = results.length ? (current - 1) * PAGE_SIZE + 1 : 0
  const to = Math.min(current * PAGE_SIZE, results.length)

  const title = q
    ? `Results for “${q}”`
    : onSale
    ? 'On Sale'
    : onlyNew
    ? 'New Arrivals'
    : style
    ? cap(style)
    : type || 'All Products'

  const apply = () => {
    setApplied(draft)
    update({ page: null })
    setDrawer(false)
  }
  const reset = () => {
    setDraft(EMPTY_DRAFT)
    setApplied(EMPTY_DRAFT)
    setParams(new URLSearchParams())
    setDrawer(false)
  }

  // lock page scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawer])

  const renderPanel = (onClose) => (
    <FilterPanel
      draft={draft}
      setDraft={setDraft}
      activeType={type}
      activeStyle={style}
      onType={(t) => update({ type: t })}
      onStyle={(s) => update({ style: s })}
      onApply={apply}
      onReset={reset}
      onClose={onClose}
    />
  )

  return (
    <div className="shell pb-14 sm:pb-20">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: title }]} />

      <div className="grid gap-5 lg:grid-cols-[295px_1fr] lg:gap-5">
        <aside className="hidden lg:block" aria-label="Filters">
          {renderPanel()}
        </aside>

        <section aria-labelledby="shop-title">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <h1 id="shop-title" className="text-2xl font-bold sm:text-[32px]">{title}</h1>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              aria-label="Open filters"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface lg:hidden"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
            <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 text-base lg:w-auto">
              <p className="text-black/70" role="status">
                Showing {from}-{to} of {results.length} Product{results.length === 1 ? '' : 's'}
              </p>
              <SortMenu value={sort} onChange={(v) => update({ sort: v })} />
            </div>
          </div>

          {visible.length ? (
            <ul className="mt-5 grid grid-cols-2 gap-x-3.5 gap-y-6 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-3">
              {visible.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-[20px] border border-black/10 px-6 py-14 text-center">
              <p className="text-xl font-bold">No products match these filters</p>
              <p className="mt-2 text-black/70">Try widening the price range or removing a colour or size.</p>
              <button type="button" onClick={reset} className="solid-btn mt-6">
                Clear all filters
              </button>
            </div>
          )}

          <Pagination page={current} pages={pages} onChange={(p) => update({ page: p === 1 ? null : p }, { keepPage: true })} />
        </section>
      </div>

      {/* Mobile filter drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[24px] bg-white p-4 pb-8">
            {renderPanel(() => setDrawer(false))}
          </div>
        </div>
      )}
    </div>
  )
}
