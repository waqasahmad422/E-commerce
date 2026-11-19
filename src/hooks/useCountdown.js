import { useEffect, useState } from 'react'

/** End of the coming Sunday (23:59:59 local) — so the "weekly deal" always has a live countdown. */
export function endOfWeek(now = new Date()) {
  const d = new Date(now)
  const daysToSunday = (7 - d.getDay()) % 7
  d.setDate(d.getDate() + daysToSunday)
  d.setHours(23, 59, 59, 999)
  return d
}

export default function useCountdown(target = endOfWeek()) {
  const calc = () => Math.max(0, target.getTime() - Date.now())
  const [ms, setMs] = useState(calc)
  useEffect(() => {
    const t = setInterval(() => setMs(calc()), 1000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.getTime()])
  const s = Math.floor(ms / 1000)
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 }
}
