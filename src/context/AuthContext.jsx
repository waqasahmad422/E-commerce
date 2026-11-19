import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { read, uid, write } from '../lib/storage'

/**
 * FRONTEND DEMO AUTH — accounts live in this browser's localStorage only.
 * Passwords are hashed (SHA-256) so they aren't stored in plain text, but this is NOT
 * real security. Replace the functions below with calls to your API.
 */
const AuthContext = createContext(null)
const USERS_KEY = 'was-shop-users-v1'
const SESSION_KEY = 'was-shop-session-v1'

async function hash(email, password) {
  const data = new TextEncoder().encode(`${email.toLowerCase()}::${password}`)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}   

const strip = ({ passHash, ...user }) => user // never expose the hash to the UI

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => read(USERS_KEY, []))
  const [sessionId, setSessionId] = useState(() => read(SESSION_KEY, null))

  useEffect(() => write(USERS_KEY, users), [users])
  useEffect(() => write(SESSION_KEY, sessionId), [sessionId])

  const current = users.find((u) => u.id === sessionId)
  const user = current ? strip(current) : null

  const signup = useCallback(
    async ({ name, email, password }) => {
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        return { ok: false, error: 'An account with this email already exists. Try signing in.' }
      }
      const created = {
        id: uid(),
        name: name.trim(),
        email: email.trim(),
        phone: '',
        joined: new Date().toISOString(),
        addresses: [],
        prefs: { offers: true, orderUpdates: true, sms: false },
        passHash: await hash(email, password),
      }
      setUsers((u) => [...u, created])
      setSessionId(created.id)
      return { ok: true }
    },
    [users]
  )

  const login = useCallback(
    async ({ email, password }) => {
      const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
      if (!found || found.passHash !== (await hash(email.trim(), password))) {
        return { ok: false, error: 'Email or password is incorrect.' }
      }
      setSessionId(found.id)
      return { ok: true }
    },
    [users]
  )

  const logout = useCallback(() => setSessionId(null), [])

  const patchUser = useCallback(
    (fn) => setUsers((all) => all.map((u) => (u.id === sessionId ? fn(u) : u))),
    [sessionId]
  )

  const updateProfile = useCallback((patch) => patchUser((u) => ({ ...u, ...patch })), [patchUser])
  const updatePrefs = useCallback((patch) => patchUser((u) => ({ ...u, prefs: { ...u.prefs, ...patch } })), [patchUser])

  const saveAddress = useCallback(
    (addr) =>
      patchUser((u) => {
        const isFirst = u.addresses.length === 0
        const exists = addr.id && u.addresses.some((a) => a.id === addr.id)
        const list = exists
          ? u.addresses.map((a) => (a.id === addr.id ? { ...a, ...addr } : a))
          : [...u.addresses, { ...addr, id: uid(), isDefault: isFirst }]
        return { ...u, addresses: list }
      }),
    [patchUser]
  )
  const removeAddress = useCallback(
    (id) =>
      patchUser((u) => {
        const list = u.addresses.filter((a) => a.id !== id)
        if (list.length && !list.some((a) => a.isDefault)) list[0] = { ...list[0], isDefault: true }
        return { ...u, addresses: list }
      }),
    [patchUser]
  )
  const setDefaultAddress = useCallback(
    (id) => patchUser((u) => ({ ...u, addresses: u.addresses.map((a) => ({ ...a, isDefault: a.id === id })) })),
    [patchUser]
  )

  const changePassword = useCallback(
    async (oldPw, newPw) => {
      if (!current) return { ok: false, error: 'Not signed in.' }
      if (current.passHash !== (await hash(current.email, oldPw))) return { ok: false, error: 'Current password is incorrect.' }
      const passHash = await hash(current.email, newPw)
      patchUser((u) => ({ ...u, passHash }))
      return { ok: true }
    },
    [current, patchUser]
  )

  const deleteAccount = useCallback(() => {
    setUsers((all) => all.filter((u) => u.id !== sessionId))
    setSessionId(null)
  }, [sessionId])

  const value = useMemo(
    () => ({
      user, signup, login, logout, updateProfile, updatePrefs,
      saveAddress, removeAddress, setDefaultAddress, changePassword, deleteAccount,
    }),
    [user, signup, login, logout, updateProfile, updatePrefs, saveAddress, removeAddress, setDefaultAddress, changePassword, deleteAccount]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
