import { Link } from 'react-router-dom'
import { Gem, Leaf, Scale } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'

const VALUES = [
  { Icon: Gem, title: 'Quality first', text: 'We test fabrics, stitching and fit before anything reaches the shop floor.' },
  { Icon: Scale, title: 'Fair prices', text: 'Working directly with makers keeps prices honest, with no inflated markups.' },
  { Icon: Leaf, title: 'Made to last', text: 'Pieces designed to be worn for years, not weeks, which is better for your wardrobe and the planet.' },
]

const STEPS = [
  ['Find your fit', 'Filter by style, size and colour, or browse by dress style.'],
  ['Order in minutes', 'Save favourites, check out as a guest or as a member.'],
  ['Wear it, or send it back', 'Free returns within 30 days if it isn’t quite right.'],
]

export default function About() {
  return (
    <div>
      <section className="bg-hero">
        <div className="shell pb-10 sm:pb-16">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
          <h1 className="display max-w-3xl text-[34px] leading-[1.1] sm:text-6xl sm:leading-[1.1]">
            Clothes you’re <span className="underline decoration-gold decoration-[6px] underline-offset-[10px]">proud</span> to wear
          </h1>
          <p className="mt-6 max-w-2xl text-black/70 sm:text-lg">
            WAS Shop started with a simple idea: great-looking clothes shouldn’t be hard to find or hard to afford.
            Today we bring together over 200 international brands in one place.
          </p>
        </div>
      </section>

      <div className="space-y-14 py-12 sm:space-y-24 sm:py-20">
        <section id="story" className="shell scroll-mt-4 grid items-center gap-8 lg:grid-cols-2 lg:gap-16" aria-labelledby="story-title">
          <div>
            <SectionHeading as="h2"><span id="story-title">Our story</span></SectionHeading>
            <div className="mt-5 space-y-4 text-black/70 sm:text-lg">
              <p>We began as a small team frustrated by shopping that felt like work: endless tabs, unclear sizing and returns that were a hassle.</p>
              <p>So we built the store we wanted to use: clear filters, honest photos, fast delivery and a team that actually answers when you write in.</p>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-3 sm:gap-5">
            {[['200+', 'Brands'], ['2,000+', 'Products'], ['30,000+', 'Customers']].map(([v, l]) => (
              <div key={l} className="rounded-[20px] bg-black p-4 text-center text-white sm:p-7">
                <dd className="text-2xl font-bold text-gold sm:text-4xl">{v}</dd>
                <dt className="mt-1 text-xs text-white/75 sm:text-base">{l}</dt>
              </div>
            ))}
          </dl>
        </section>

        <section id="values" className="shell scroll-mt-4" aria-labelledby="values-title">
          <SectionHeading as="h2" className="text-center"><span id="values-title">What we stand for</span></SectionHeading>
          <ul className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3">
            {VALUES.map(({ Icon, title, text }) => (
              <li key={title} className="rounded-[20px] border border-black/10 p-6 sm:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-gold"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-black/70">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="how-it-works" className="shell scroll-mt-4" aria-labelledby="how-title">
          <div className="rounded-[28px] bg-surface px-6 py-10 sm:rounded-[40px] sm:px-14 sm:py-16">
            <SectionHeading as="h2" className="text-center"><span id="how-title">How it works</span></SectionHeading>
            <ol className="mt-8 grid gap-6 sm:mt-12 md:grid-cols-3">
              {STEPS.map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-lg font-bold text-black">{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-bold">{t}</h3>
                    <p className="mt-1 text-black/70">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="careers" className="shell scroll-mt-4" aria-labelledby="careers-title">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] bg-gold-light px-6 py-10 sm:flex-row sm:items-center sm:rounded-[40px] sm:px-14 sm:py-12">
            <div>
              <h2 id="careers-title" className="display text-[28px] leading-[1.1] sm:text-4xl sm:leading-[1.1]">Want to join the team?</h2>
              <p className="mt-3 max-w-lg text-black/80">We’re always happy to hear from designers, developers and style-obsessed people.</p>
            </div>
            <Link to="/contact" className="solid-btn shrink-0">Get in touch</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
