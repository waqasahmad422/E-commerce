import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { read, write } from '../lib/storage'

const WishlistContext = createContext(null)
const KEY = 'was-shop-wishlist-v1'

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => read(KEY, []))
  useEffect(() => write(KEY, ids), [ids])

  const toggle = useCallback((id) => setIds((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id])), [])
  const has = useCallback((id) => ids.includes(id), [ids])
  const clear = useCallback(() => setIds([]), [])

  const value = useMemo(() => ({ ids, toggle, has, clear, count: ids.length }), [ids, toggle, has, clear])
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside <WishlistProvider>')
  return ctx
}
