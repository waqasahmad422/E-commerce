import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Gift, PackageCheck, Heart } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Field from '../components/ui/Field'
import Breadcrumb from '../components/ui/Breadcrumb'

const EMAIL = /^\S+@\S+\.\S+$/

export default function Login() {
  const { user, login, signup } = useAuth()
  const [params, setParams] = useSearchParams()
  const mode = params.get('mode') === 'signup' ? 'signup' : 'signin'
  const navigate = useNavigate()
  const from = useLocation().state?.from || '/account'

  const [v, setV] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to={from} replace />

  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))
  const switchMode = (m) => {
    setErrors({})
    setFormError('')
    setParams(m === 'signup' ? { mode: 'signup' } : {})
  }

  const submit = async (e) => {
    e.preventDefault()
    const next = {}
    if (mode === 'signup' && v.name.trim().length < 2) next.name = 'Enter your full name.'
    if (!EMAIL.test(v.email)) next.email = 'Enter a valid email address.'
    if (mode === 'signup' ? v.password.length < 8 : !v.password) {
      next.password = mode === 'signup' ? 'Use at least 8 characters.' : 'Enter your password.'
    }
    setErrors(next)
    setFormError('')
    if (Object.keys(next).length) return
    setBusy(true)
    const res = mode === 'signup' ? await signup(v) : await login(v)
    setBusy(false)
    if (!res.ok) return setFormError(res.error)
    navigate(from, { replace: true })
  }

  const tab = (m, label) => (
    <button
      type="button"
      role="tab"
      aria-selected={mode === m}
      onClick={() => switchMode(m)}
      className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-colors sm:text-base ${mode === m ? 'bg-black text-white' : 'text-black/70 hover:text-black'}`}
    >
      {label}
    </button>
  )

  return (
    <div className="shell pb-14 sm:pb-20">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: mode === 'signup' ? 'Create account' : 'Sign in' }]} />
      <div className="grid overflow-hidden rounded-[28px] border border-black/10 lg:grid-cols-2">
        <div className="p-6 sm:p-12">
          <h1 className="display text-[30px] leading-[1.1] sm:text-4xl sm:leading-[1.1]">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mt-3 text-black/70">
            {mode === 'signup' ? 'Join for 20% off your first order, order tracking and a saved wishlist.' : 'Sign in to see your orders, wishlist and saved addresses.'}
          </p>

          <div role="tablist" aria-label="Sign in or create account" className="mt-6 flex rounded-full bg-surface p-1">
            {tab('signin', 'Sign in')}
            {tab('signup', 'Create account')}
          </div>

          <form onSubmit={submit} noValidate className="mt-6 space-y-4">
            {mode === 'signup' && <Field id="name" label="Full name" autoComplete="name" value={v.name} onChange={set('name')} error={errors.name} />}
            <Field id="email" label="Email" type="email" autoComplete="email" value={v.email} onChange={set('email')} error={errors.email} />
            <div className="relative">
              <Field
                id="password"
                label="Password"
                type={show ? 'text' : 'password'}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                value={v.password}
                onChange={set('password')}
                error={errors.password}
                hint={mode === 'signup' ? 'At least 8 characters.' : undefined}
                className="[&_input]:pr-12"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="absolute right-4 top-[38px] text-black/60 hover:text-black"
              >
                {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p role="alert" className="min-h-[1.25rem] text-sm text-sale">{formError}</p>
            <button type="submit" disabled={busy} className="solid-btn w-full">
              {busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-sm text-black/70">
            {mode === 'signup' ? 'Already a member? ' : 'New to WAS Shop? '}
            <button type="button" onClick={() => switchMode(mode === 'signup' ? 'signin' : 'signup')} className="font-bold text-black underline underline-offset-2">
              {mode === 'signup' ? 'Sign in' : 'Create an account'}
            </button>
          </p>
          <p className="mt-6 rounded-2xl bg-gold-light px-4 py-3 text-xs text-black/80">
            Demo mode: accounts are saved only in this browser. No data is sent to a server.
          </p>
        </div>

        <aside className="hidden flex-col justify-between bg-black p-12 text-white lg:flex" aria-label="Member benefits">
          <div>
            <p className="display text-4xl leading-[1.1]">Dress better.<br /><span className="text-gold">Shop smarter.</span></p>
            <ul className="mt-8 space-y-5">
              {[[Gift, '20% off your first order'], [PackageCheck, 'Track every delivery in one place'], [Heart, 'Save favourites to your wishlist']].map(([Icon, t]) => (
                <li key={t} className="flex items-center gap-4 text-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-black"><Icon className="h-5 w-5" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <img src="/images/hero.webp" alt="" className="mt-8 w-full max-w-[380px] self-end" />
        </aside>
      </div>
      <p className="mt-6 text-center text-sm text-black/70">
        Just browsing? <Link to="/shop" className="font-bold text-black underline underline-offset-2">Continue as guest</Link>
      </p>
    </div>
  )
}
