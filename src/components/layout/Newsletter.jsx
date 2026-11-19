import { useState } from 'react'
import { Mail } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Newsletter() {
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | done
  const value = email || user?.email || ''

  const submit = (e) => {
    e.preventDefault()
    if (/^\S+@\S+\.\S+$/.test(value)) {
      setStatus('done')
      setEmail('')
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="bg-[linear-gradient(to_bottom,#fff_50%,#123D2B_50%)]">
      <div className="shell">
        <section
          aria-labelledby="newsletter-title"
          className="grid items-center gap-8 rounded-[20px] bg-gold px-6 py-8 text-black sm:px-16 sm:py-9 lg:grid-cols-2 lg:gap-12"
        >
          <div>
            <h2 id="newsletter-title" className="display text-[32px] leading-[1.1] sm:text-[40px] sm:leading-[1.1]">
              Stay upto date about our latest offers
            </h2>
            <p className="mt-3 text-sm text-black/80 sm:text-base">New drops, member-only sales and 20% off your first order.</p>
          </div>
          <form onSubmit={submit} noValidate className="flex flex-col gap-3.5 lg:ml-auto lg:w-full lg:max-w-[349px]">
            <label className="flex items-center gap-3 rounded-full bg-white px-4 text-black">
              <Mail className="h-6 w-6 text-black/50" aria-hidden="true" />
              <span className="sr-only">Email address</span>
              <input
                type="email"
                value={value}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status !== 'idle') setStatus('idle')
                }}
                placeholder="Enter your email address"
                aria-invalid={status === 'error'}
                aria-describedby="newsletter-msg"
                className="w-full bg-transparent py-3 text-base outline-none placeholder:text-black/50"
              />
            </label>
            <button type="submit" className="rounded-full bg-black py-3 text-base font-medium text-white transition-colors hover:bg-forest-900">
              Subscribe to Newsletter
            </button>
            <p id="newsletter-msg" role="status" className="min-h-[1.25rem] text-sm font-medium">
              {status === 'error' && <span className="text-[#7A1F14]">Enter a valid email address, like name@example.com.</span>}
              {status === 'done' && <span>Subscribed. Watch your inbox for offers.</span>}
            </p>
          </form>
        </section>
      </div>
    </div>
  )
}
