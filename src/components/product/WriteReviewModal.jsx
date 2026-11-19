import { useEffect, useRef, useState } from 'react'
import { Star, X } from 'lucide-react'

export default function WriteReviewModal({ onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const first = useRef(null)

  useEffect(() => {
    first.current?.focus()
    const esc = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [onClose])

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return setError('Enter your name.')
    if (!rating) return setError('Choose a star rating.')
    if (text.trim().length < 10) return setError('Write at least a sentence about the product.')
    onSubmit({ name: name.trim(), rating, text: text.trim() })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-labelledby="review-title">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form onSubmit={submit} noValidate className="relative w-full max-w-lg rounded-t-[24px] bg-white p-6 sm:rounded-[24px] sm:p-8">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-surface">
          <X className="h-4 w-4" />
        </button>
        <h2 id="review-title" className="text-2xl font-bold">Write a review</h2>

        <label className="mt-6 block text-sm font-medium" htmlFor="rv-name">Your name</label>
        <input
          id="rv-name"
          ref={first}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-full bg-surface px-5 py-3 outline-none focus:ring-2 focus:ring-black"
        />

        <fieldset className="mt-5">
          <legend className="text-sm font-medium">Rating</legend>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} star${n > 1 ? 's' : ''}`} aria-pressed={rating === n}>
                <Star className={`h-8 w-8 ${n <= rating ? 'text-star' : 'text-black/15'}`} fill="currentColor" strokeWidth={0} />
              </button>
            ))}
          </div>
        </fieldset>

        <label className="mt-5 block text-sm font-medium" htmlFor="rv-text">Your review</label>
        <textarea
          id="rv-text"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-2 w-full resize-none rounded-[20px] bg-surface px-5 py-3 outline-none focus:ring-2 focus:ring-black"
        />

        <p role="alert" className="mt-3 min-h-[1.25rem] text-sm text-sale">{error}</p>
        <button type="submit" className="solid-btn mt-2 w-full">Post review</button>
      </form>
    </div>
  )
}
