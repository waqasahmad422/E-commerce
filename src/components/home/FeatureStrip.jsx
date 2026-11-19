import { Headphones, RotateCcw, ShieldCheck, Truck } from 'lucide-react'

const FEATURES = [
  { Icon: Truck, title: 'Free delivery', text: 'On every order over $200, shipped in 3-5 days.' },
  { Icon: RotateCcw, title: '30-day returns', text: 'Not the right fit? Send it back, no questions.' },
  { Icon: ShieldCheck, title: 'Secure payments', text: 'Your card details are encrypted end to end.' },
  { Icon: Headphones, title: 'Real human support', text: 'Talk to our style team, 7 days a week.' },
]

export default function FeatureStrip() {
  return (
    <section id="features" aria-label="Why shop with us" className="shell scroll-mt-4">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ Icon, title, text }) => (
          <li key={title} className="flex items-start gap-4 rounded-[20px] border border-black/10 p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-gold">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-black/70">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
