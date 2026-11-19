import { Link } from 'react-router-dom'
import Logo from './Logo'
import { FacebookIcon, GithubIcon, InstagramIcon, TwitterIcon } from '../ui/Icons'

const COLUMNS = [
  { title: 'Company', links: [['About', '/about'], ['Features', '/#features'], ['Works', '/about#how-it-works'], ['Career', '/about#careers']] },
  { title: 'Help', links: [['Customer Support', '/contact'], ['Delivery Details', '/contact#delivery'], ['Terms & Conditions', '/contact#policies'], ['Privacy Policy', '/contact#policies']] },
  { title: 'Account', links: [['My Profile', '/account'], ['Manage Deliveries', '/account/orders'], ['Orders', '/account/orders'], ['Wishlist', '/wishlist']] },
  { title: 'Resources', links: [['Size Guide', '/contact#faq'], ['Gift Cards', '/shop'], ['Style Journal', '/about#story'], ['FAQs', '/contact#faq']] },
]

const SOCIALS = [
  { label: 'Twitter', Icon: TwitterIcon },
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'GitHub', Icon: GithubIcon },
]

function PaymentBadge({ children, label }) {
  return (
    <span role="img" aria-label={label} className="flex h-[30px] w-[46px] items-center justify-center rounded-md bg-white sm:w-[48px]">
      {children}
    </span>
  )
}

export default function Footer() {
  return (
    <footer className="bg-black pb-12 pt-10 text-white sm:pb-14 sm:pt-12">
      <div className="shell">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))] lg:gap-6">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo dark className="text-[24px] sm:text-[30px]" />
            <p className="mt-6 max-w-[248px] text-sm leading-[1.6] text-white/70">
              We have clothes that suits your style and which you’re proud to wear. From women to men.
            </p>
            <ul className="mt-8 flex gap-3">
              {SOCIALS.map(({ label, Icon }) => (
                <li key={label}>
                  <a
                    href="#"
                    aria-label={label}
                    onClick={(e) => e.preventDefault()}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-gold hover:bg-gold hover:text-black"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-base font-medium uppercase tracking-[0.2em] text-gold">{col.title}</h3>
              <ul className="mt-6 space-y-3.5">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-base text-white/70 transition-colors hover:text-gold">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-5 sm:flex-row">
          <p className="text-sm text-white/70">© {new Date().getFullYear()} WAS Shop. All rights reserved.</p>
          <div className="flex gap-3">
            <PaymentBadge label="Visa"><span className="text-[11px] font-black italic tracking-tight text-[#1A1F71]">VISA</span></PaymentBadge>
            <PaymentBadge label="Mastercard">
              <span className="relative flex h-4 w-6 items-center">
                <span className="absolute left-0 h-4 w-4 rounded-full bg-[#EB001B]" />
                <span className="absolute right-0 h-4 w-4 rounded-full bg-[#F79E1B]/90" />
              </span>
            </PaymentBadge>
            <PaymentBadge label="PayPal"><span className="text-[10px] font-extrabold italic text-[#253B80]">Pay<span className="text-[#179BD7]">Pal</span></span></PaymentBadge>
            <PaymentBadge label="Apple Pay"><span className="text-[10px] font-bold text-black"> Pay</span></PaymentBadge>
            <PaymentBadge label="Google Pay"><span className="text-[10px] font-bold text-black"><span className="text-[#4285F4]">G</span> Pay</span></PaymentBadge>
          </div>
        </div>
      </div>
    </footer>
  )
}
