import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, CircleUser, Heart, LogOut, Menu, Package, Search, ShoppingCart, User, X } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import { STYLES } from '../../data/products'

function SearchField({ className = '', autoFocus = false }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const submit = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
  }
  return (
    <form onSubmit={submit} role="search" className={`flex items-center gap-3 rounded-full bg-surface px-4 ${className}`}>
      <button type="submit" aria-label="Search" className="text-black/50">
        <Search className="h-6 w-6" />
      </button>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus={autoFocus}
        placeholder="Search for products..."
        aria-label="Search for products"
        className="w-full bg-transparent py-3 text-base outline-none placeholder:text-black/50"
      />
    </form>
  )
}

function useClickOutside(ref, close) {
  useEffect(() => {
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && close()
    const onKey = (e) => e.key === 'Escape' && close()
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [ref, close])
}

function Badge({ n }) {
  if (!n) return null
  return (
    <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold leading-none text-black">
      {n}
    </span>
  )
}

function AccountMenu() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()
  useClickOutside(ref, () => setOpen(false))

  if (!user) {
    return (
      <Link to="/login" aria-label="Sign in or create account" title="Sign in">
        <CircleUser className="h-6 w-6" />
      </Link>
    )
  }
  const initial = user.name.trim().charAt(0).toUpperCase() || 'U'
  const item = 'flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm hover:bg-surface'
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-gold"
      >
        {initial}
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-40 mt-3 w-60 rounded-[20px] border border-black/10 bg-white p-2 shadow-lg">
          <div className="border-b border-black/10 px-4 pb-3 pt-2">
            <p className="truncate font-bold">{user.name}</p>
            <p className="truncate text-sm text-black/70">{user.email}</p>
          </div>
          <Link role="menuitem" to="/account" onClick={() => setOpen(false)} className={`${item} mt-2`}><User className="h-4 w-4" /> My profile</Link>
          <Link role="menuitem" to="/account/orders" onClick={() => setOpen(false)} className={item}><Package className="h-4 w-4" /> My orders</Link>
          <Link role="menuitem" to="/wishlist" onClick={() => setOpen(false)} className={item}><Heart className="h-4 w-4" /> Wishlist</Link>
          <button
            role="menuitem"
            type="button"
            className={item}
            onClick={() => {
              logout()
              setOpen(false)
              navigate('/')
            }}
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { items } = useCart()
  const { count: wishCount } = useWishlist()
  const count = items.reduce((n, i) => n + i.qty, 0)
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const shopRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useClickOutside(shopRef, () => setShopOpen(false))

  useEffect(() => {
    setMenuOpen(false)
    setShopOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const linkCls = 'text-base hover:text-black/70'

  return (
    <header className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md transition-shadow duration-300 ${scrolled ? 'shadow-[0_10px_30px_-18px_rgba(18,61,43,0.55)]' : ''}`}>
      <div className="shell">
        <div className={`flex items-center gap-4 py-5 sm:py-6 lg:gap-10 ${pathname === '/' ? '' : 'border-b border-black/10'}`}>
          <button
            type="button"
            className="lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Logo />

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
            <div className="relative" ref={shopRef}>
              <button
                type="button"
                className={`flex items-center gap-1 ${linkCls}`}
                aria-expanded={shopOpen}
                aria-haspopup="true"
                onClick={() => setShopOpen((o) => !o)}
              >
                Shop <ChevronDown className={`h-4 w-4 transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
              </button>
              {shopOpen && (
                <ul className="absolute left-0 top-full z-30 mt-3 w-48 rounded-[20px] border border-black/10 bg-white p-2 shadow-lg">
                  <li><Link to="/shop" className="block rounded-xl px-4 py-2.5 hover:bg-surface">All products</Link></li>
                  {STYLES.map((s) => (
                    <li key={s}>
                      <Link to={`/shop?style=${s.toLowerCase()}`} className="block rounded-xl px-4 py-2.5 hover:bg-surface">{s}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link to="/shop?sale=1" className={linkCls}>On Sale</Link>
            <Link to="/shop?new=1" className={linkCls}>New Arrivals</Link>
            <Link to="/#brands" className={linkCls}>Brands</Link>
            <Link to="/about" className={linkCls}>About</Link>
            <Link to="/contact" className={linkCls}>Contact</Link>
          </nav>

          <SearchField className="hidden flex-1 lg:flex" />

          <div className="ml-auto flex items-center gap-3 sm:gap-[14px]">
            <button type="button" className="lg:hidden" aria-label="Search" aria-expanded={searchOpen} onClick={() => setSearchOpen((o) => !o)}>
              <Search className="h-6 w-6" />
            </button>
            <Link to="/wishlist" aria-label={`Wishlist, ${wishCount} item${wishCount === 1 ? '' : 's'}`} className="relative hidden sm:block">
              <Heart className="h-6 w-6" />
              <Badge n={wishCount} />
            </Link>
            <Link to="/cart" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`} className="relative">
              <ShoppingCart className="h-6 w-6" />
              <Badge n={count} />
            </Link>
            <AccountMenu />
          </div>
        </div>

        {searchOpen && <SearchField className="mb-4 lg:hidden" autoFocus />}

        {menuOpen && (
          <nav className="mb-4 flex flex-col rounded-[20px] border border-black/10 p-2 lg:hidden" aria-label="Main">
            <Link to="/shop" className="rounded-xl px-4 py-3 hover:bg-surface">Shop all</Link>
            {STYLES.map((s) => (
              <Link key={s} to={`/shop?style=${s.toLowerCase()}`} className="rounded-xl px-4 py-3 pl-8 text-black/70 hover:bg-surface">{s}</Link>
            ))}
            <Link to="/shop?sale=1" className="rounded-xl px-4 py-3 hover:bg-surface">On Sale</Link>
            <Link to="/shop?new=1" className="rounded-xl px-4 py-3 hover:bg-surface">New Arrivals</Link>
            <Link to="/#brands" className="rounded-xl px-4 py-3 hover:bg-surface">Brands</Link>
            <Link to="/wishlist" className="rounded-xl px-4 py-3 hover:bg-surface">Wishlist {wishCount ? `(${wishCount})` : ''}</Link>
            <Link to="/about" className="rounded-xl px-4 py-3 hover:bg-surface">About</Link>
            <Link to="/contact" className="rounded-xl px-4 py-3 hover:bg-surface">Contact</Link>
          </nav>
        )}
      </div>
    </header>
  )
}
