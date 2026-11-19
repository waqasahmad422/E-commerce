import { PRODUCTS } from '../data/products'
import Hero from '../components/home/Hero'
import BrandStrip from '../components/home/BrandStrip'
import FeatureStrip from '../components/home/FeatureStrip'
import CategoryGrid from '../components/home/CategoryGrid'
import DealOfTheWeek from '../components/home/DealOfTheWeek'
import DressStyle from '../components/home/DressStyle'
import Testimonials from '../components/home/Testimonials'
import MembershipBanner from '../components/home/MembershipBanner'
import FaqSection from '../components/home/FaqSection'
import ProductSection from '../components/product/ProductSection'
import Marquee from '../components/home/Marquee' 
import Reveal from '../components/ui/Reveal'

const newArrivals = PRODUCTS.filter((p) => p.isNew && p.id !== 'one-life-graphic-tshirt').slice(0, 4)
const topFour = ['vertical-striped-shirt', 'courage-graphic-tshirt', 'loose-fit-bermuda-shorts', 'faded-skinny-jeans']
  .map((id) => PRODUCTS.find((p) => p.id === id))
  .filter(Boolean)

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <BrandStrip />
      <div className="space-y-12 py-10 sm:space-y-[72px] sm:py-[72px]">
        <Reveal><FeatureStrip /></Reveal>
        <Reveal><ProductSection id="new-arrivals" eyebrow="Just landed" title="New Arrivals" products={newArrivals} viewAllTo="/shop?new=1" /></Reveal>
        <div className="shell"><hr className="border-black/10" /></div>
        <Reveal><CategoryGrid /></Reveal>
        <Reveal><DealOfTheWeek /></Reveal>
        <Reveal><ProductSection id="top-selling" eyebrow="Customer favourites" title="Top Selling" products={topFour} viewAllTo="/shop?sort=popular" /></Reveal>
        <Reveal><DressStyle /></Reveal>
        <Reveal><Testimonials /></Reveal>
        <Reveal><MembershipBanner /></Reveal>
        <Reveal><FaqSection /></Reveal>
      </div>
    </>
  )
}
