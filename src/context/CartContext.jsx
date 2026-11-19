import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'was-shop-cart-v1'

export const PROMO_CODES = { SHOP20: 20 }
export const DELIVERY_FEE = 15

const initial = { items: [], promo: null }

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...initial, ...JSON.parse(raw) } : initial
  } catch {
    return initial
  }
}

const lineKey = (id, size, color) => `${id}|${size}|${color}`

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { id, size, color, qty } = action
      const key = lineKey(id, size, color)
      const exists = state.items.find((i) => i.key === key)
      const items = exists
        ? state.items.map((i) => (i.key === key ? { ...i, qty: Math.min(99, i.qty + qty) } : i))
        : [...state.items, { key, id, size, color, qty }]
      return { ...state, items }
    }
    case 'QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.key === action.key ? { ...i, qty: Math.max(1, Math.min(99, action.qty)) } : i
        ),
      }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.key !== action.key) }
    case 'PROMO':
      return { ...state, promo: action.code }
    case 'CLEAR':
      return initial
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable — cart still works for the session */
    }
  }, [state])

  const add = useCallback((product, { size, color, qty = 1 }) => {
    dispatch({ type: 'ADD', id: product.id, size, color, qty })
  }, [])
  const setQty = useCallback((key, qty) => dispatch({ type: 'QTY', key, qty }), [])
  const remove = useCallback((key) => dispatch({ type: 'REMOVE', key }), [])
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  /** Returns true when the code is valid. */
  const applyPromo = useCallback((raw) => {
    const code = raw.trim().toUpperCase()
    if (PROMO_CODES[code]) {
      dispatch({ type: 'PROMO', code })
      return true
    }
    return false
  }, [])

  const value = useMemo(
    () => ({ items: state.items, promo: state.promo, add, setQty, remove, clear, applyPromo }),
    [state, add, setQty, remove, clear, applyPromo]
  )
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}

/** Price maths for a list of { product, qty } lines. */
export function summarize(lines, promo) {
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0)
  const pct = promo ? PROMO_CODES[promo] || 0 : 0
  const discount = Math.round((subtotal * pct) / 100)
  const delivery = lines.length ? DELIVERY_FEE : 0
  return { subtotal, pct, discount, delivery, total: subtotal - discount + delivery }
}
