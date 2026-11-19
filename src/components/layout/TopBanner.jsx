import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function TopBanner() {
  const [open, setOpen] = useState(true)
  const { user } = useAuth()
  if (!open) return null
  return (
    <div className="relative bg-black px-4 py-2 text-center text-xs text-white sm:px-10 sm:py-[9px] sm:text-sm">
      {user ? (
        <p>
          Welcome back, {user.name.split(' ')[0]}. Use code <strong className="text-gold">SHOP20</strong> for 20% off.{' '}
          <Link to="/shop" className="font-medium text-gold underline underline-offset-2">Shop now</Link>
        </p>
      ) : (
        <p>
          Sign up and get 20% off to your first order.{' '}
          <Link to="/login?mode=signup" className="font-medium text-gold underline underline-offset-2">Sign Up Now</Link>
        </p>
      )}
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 sm:right-[100px] sm:block"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}
