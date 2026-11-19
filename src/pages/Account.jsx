import { Link, Navigate, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Heart, LayoutDashboard, LogOut, MapPin, Package, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Breadcrumb from '../components/ui/Breadcrumb'
import OverviewTab from '../components/account/OverviewTab'
import OrdersTab from '../components/account/OrdersTab'
import AddressesTab from '../components/account/AddressesTab'
import SettingsTab from '../components/account/SettingsTab'

const TABS = [
  { id: undefined, to: '/account', label: 'Overview', Icon: LayoutDashboard, View: OverviewTab, title: 'Overview' },
  { id: 'orders', to: '/account/orders', label: 'Orders', Icon: Package, View: OrdersTab, title: 'My orders' },
  { id: 'addresses', to: '/account/addresses', label: 'Addresses', Icon: MapPin, View: AddressesTab, title: 'Addresses' },
  { id: 'settings', to: '/account/settings', label: 'Settings', Icon: Settings, View: SettingsTab, title: 'Account settings' },
]

export default function Account() {
  const { user, logout } = useAuth()
  const { tab } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  const active = TABS.find((t) => t.id === tab)
  if (!active) return <Navigate to="/account" replace />
  const { View } = active

  const joined = new Date(user.joined).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const initial = user.name.trim().charAt(0).toUpperCase() || 'U'
  const link = ({ isActive }) =>
    `flex shrink-0 items-center gap-3 rounded-full px-5 py-3 text-base transition-colors lg:rounded-xl ${
      isActive ? 'bg-black font-medium text-white' : 'text-black/80 hover:bg-surface'
    }`

  return (
    <div className="shell pb-14 sm:pb-20">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'My account', to: '/account' }, ...(tab ? [{ label: active.label }] : [])]} />

      <header className="flex flex-wrap items-center gap-4 rounded-[28px] bg-black p-5 text-white sm:gap-6 sm:p-8">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold text-3xl font-bold text-black ring-4 ring-white/15 sm:h-20 sm:w-20 sm:text-4xl" aria-hidden="true">
          {initial}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="display truncate text-2xl leading-tight sm:text-4xl sm:leading-tight">{user.name}</h1>
          <p className="truncate text-sm text-white/75 sm:text-base">{user.email} · Member since {joined}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            logout()
            navigate('/')
          }}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium hover:border-gold hover:text-gold"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </header>

      <div className="mt-5 grid gap-5 lg:mt-6 lg:grid-cols-[250px_1fr] lg:gap-8">
        <nav aria-label="Account sections" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-1 lg:self-start lg:rounded-[20px] lg:border lg:border-black/10 lg:p-3">
          {TABS.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} end className={link}>
              <Icon className="h-5 w-5" /> {label}
            </NavLink>
          ))}
          <Link to="/wishlist" className="flex shrink-0 items-center gap-3 rounded-full px-5 py-3 text-black/80 hover:bg-surface lg:rounded-xl">
            <Heart className="h-5 w-5" /> Wishlist
          </Link>
        </nav>

        <section aria-labelledby="tab-title" className="min-w-0">
          <h2 id="tab-title" className="mb-4 text-2xl font-bold sm:text-[32px]">{active.title}</h2>
          <View />
        </section>
      </div>
    </div>
  )
}
