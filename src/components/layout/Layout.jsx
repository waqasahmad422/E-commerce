import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopBanner from './TopBanner'
import Navbar from './Navbar'
import Newsletter from './Newsletter'
import Footer from './Footer'

/** Scroll to top on route change, or to #hash targets (e.g. /#brands). */
function ScrollManager() {
  const { pathname, hash, search } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, search])
  return null
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <TopBanner />
      <Navbar />
      <main key={useLocation().pathname} className="animate-fade-up">
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
    </>
  )
}
