import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { read, write } from '../lib/storage'

const OrdersContext = createContext(null)
const KEY = 'was-shop-orders-v1'

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => read(KEY, []))
  useEffect(() => write(KEY, orders), [orders])

  /** order: { id, userId, date, lines[], totals, address } */
  const place = useCallback((order) => setOrders((o) => [order, ...o]), [])
  const forUser = useCallback((userId) => orders.filter((o) => o.userId === userId), [orders])

  const value = useMemo(() => ({ orders, place, forUser }), [orders, place, forUser])
  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

export function useOrders() {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error('useOrders must be used inside <OrdersProvider>')
  return ctx
}
