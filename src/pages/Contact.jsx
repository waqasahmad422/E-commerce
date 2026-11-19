import { useState } from 'react'
import { Clock, Mail, MapPin, Phone, RotateCcw, Truck, Zap } from 'lucide-react'
import Breadcrumb from '../components/ui/Breadcrumb'
import SectionHeading from '../components/ui/SectionHeading'
import Field from '../components/ui/Field'
import Accordion from '../components/ui/Accordion'
import { FAQS } from '../data/reviews'
import { useAuth } from '../context/AuthContext'

const INFO = [
  { Icon: Mail, title: 'Email', lines: ['support@wasshop.example'] },
  { Icon: Phone, title: 'Phone', lines: ['+1 (555) 010-2030'] },
  { Icon: Clock, title: 'Hours', lines: ['Mon–Sun, 9am–8pm'] },
  { Icon: MapPin, title: 'Studio', lines: ['12 Market Street', 'London, UK'] },
]

const DELIVERY = [
  { Icon: Truck, title: 'Standard · 3-5 days', text: '$15, or free on orders over $200.' },
  { Icon: Zap, title: 'Express · 1-2 days', text: '$25, order before 2pm for dispatch the same day.' },
  { Icon: RotateCcw, title: 'Returns · 30 days', text: 'Free returns on unworn items with tags attached.' },
]

const POLICIES = [
  { q: 'Terms & conditions', a: 'By placing an order you agree to pay the listed price and delivery fee. Orders are confirmed by email and may be cancelled before dispatch. Prices may change without notice.' },
  { q: 'Privacy policy', a: 'We only collect the details needed to process your order and improve your experience. We never sell your personal data, and you can ask us to delete it at any time.' },
]

export default function Contact() {
  const { user } = useAuth()
  const [v, setV] = useState({ name: '', email: '', topic: 'Order help', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const val = (k) => v[k] || (k === 'name' ? user?.name : k === 'email' ? user?.email : '') || ''
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (val('name').trim().length < 2) next.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(val('email'))) next.email = 'Enter a valid email address.'
    if (v.message.trim().length < 10) next.message = 'Tell us a little more (at least 10 characters).'
    setErrors(next)
    if (!Object.keys(next).length) setSent(true)
  }

  return (
    <div className="shell pb-14 sm:pb-20">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
      <SectionHeading as="h1" className="text-[32px] sm:text-[44px]">Get in touch</SectionHeading>
      <p className="mt-3 max-w-xl text-black/70">Questions about an order, sizing or anything else? Send us a message and we’ll reply within one working day.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="rounded-[20px] border border-black/10 p-5 sm:p-8">
          {sent ? (
            <div className="py-10 text-center" role="status">
              <p className="text-2xl font-bold">Message ready to send</p>
              <p className="mx-auto mt-2 max-w-md text-black/70">Thanks, {val('name').split(' ')[0]}. This is a frontend demo so nothing was actually sent; connect the form to your backend or email service.</p>
              <button type="button" onClick={() => { setSent(false); setV({ name: '', email: '', topic: 'Order help', message: '' }) }} className="pill-btn mt-6">Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
              <Field id="c-name" label="Name" value={val('name')} onChange={set('name')} error={errors.name} autoComplete="name" />
              <Field id="c-email" label="Email" type="email" value={val('email')} onChange={set('email')} error={errors.email} autoComplete="email" />
              <div className="sm:col-span-2">
                <label htmlFor="c-topic" className="text-sm font-medium">Topic</label>
                <select id="c-topic" value={v.topic} onChange={set('topic')} className="mt-1.5 w-full rounded-full bg-surface px-5 py-3 outline-none focus:ring-2 focus:ring-black">
                  {['Order help', 'Sizing & fit', 'Returns', 'Something else'].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <Field as="textarea" rows={5} id="c-message" label="Message" className="sm:col-span-2" value={v.message} onChange={set('message')} error={errors.message} />
              <button type="submit" className="solid-btn sm:col-span-2 sm:w-fit sm:px-12">Send message</button>
            </form>
          )}
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {INFO.map(({ Icon, title, lines }) => (
            <li key={title} className="flex items-center gap-4 rounded-[20px] border border-black/10 p-4 sm:p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-gold"><Icon className="h-5 w-5" /></span>
              <div>
                <p className="font-bold">{title}</p>
                {lines.map((l) => <p key={l} className="text-sm text-black/70">{l}</p>)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <section id="delivery" className="mt-14 scroll-mt-4 sm:mt-20" aria-labelledby="delivery-title">
        <SectionHeading as="h2" className="text-[28px] sm:text-4xl"><span id="delivery-title">Delivery & returns</span></SectionHeading>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {DELIVERY.map(({ Icon, title, text }) => (
            <li key={title} className="rounded-[20px] bg-surface p-6">
              <Icon className="h-7 w-7 text-gold-dark" />
              <h3 className="mt-3 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-black/70">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="faq" className="mt-14 scroll-mt-4 sm:mt-20" aria-labelledby="faq-title">
        <SectionHeading as="h2" className="text-[28px] sm:text-4xl"><span id="faq-title">Frequently asked questions</span></SectionHeading>
        <div className="mt-6"><Accordion items={FAQS} /></div>
      </section>

      <section id="policies" className="mt-14 scroll-mt-4 sm:mt-20" aria-labelledby="policies-title">
        <SectionHeading as="h2" className="text-[28px] sm:text-4xl"><span id="policies-title">Policies</span></SectionHeading>
        <p className="mt-2 text-sm text-black/70">Sample text for this template. Replace it with your own legal copy before launch.</p>
        <div className="mt-6"><Accordion items={POLICIES} /></div>
      </section>
    </div>
  )
}
