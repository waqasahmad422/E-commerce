/** localStorage helpers that never throw (private mode, quota, SSR). */
export function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — state still works for the session */
  }
}

export const uid = () => Math.random().toString(36).slice(2, 10)
