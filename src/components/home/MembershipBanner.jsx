import { Link } from 'react-router-dom'
import { Gift, PackageCheck, Sparkles } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const PERKS = [
  { Icon: Gift, text: '20% off your first order' },
  { Icon: Sparkles, text: 'Early access to new drops' },
  { Icon: PackageCheck, text: 'Track orders & save favourites' },
]

export default function MembershipBanner() {
  const { user } = useAuth()
  return (
    <section className="shell" aria-labelledby="member-title">
      <div className="rounded-[28px] bg-gold-light px-6 py-10 sm:rounded-[40px] sm:px-14 sm:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 id="member-title" className="display text-[30px] leading-[1.1] sm:text-[44px] sm:leading-[1.1]">
              {user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Join the WAS Shop club'}
            </h2>
            <ul className="mt-5 space-y-3">
              {PERKS.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-base font-medium sm:text-lg">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-gold"><Icon className="h-[18px] w-[18px]" /></span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start xl:flex-row">
            {user ? (
              <>
                <Link to="/account" className="solid-btn">Go to my profile</Link>
                <Link to="/wishlist" className="pill-btn border-black/30 bg-transparent px-10">My wishlist</Link>
              </>
            ) : (
              <>
                <Link to="/login?mode=signup" className="solid-btn">Create free account</Link>
                <Link to="/login" className="pill-btn border-black/30 bg-transparent px-10">Sign in</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
