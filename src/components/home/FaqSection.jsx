import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading'
import Accordion from '../ui/Accordion'
import { FAQS } from '../../data/reviews'

export default function FaqSection() {
  return (
    <section id="faq" className="shell scroll-mt-4" aria-labelledby="faq-title">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <SectionHeading as="h2" eyebrow="Help centre"><span id="faq-title">Questions? Answered</span></SectionHeading>
          <p className="mt-4 text-black/70">Can’t find what you need? Our team replies within one working day.</p>
          <Link to="/contact" className="solid-btn mt-6">Contact support</Link>
        </div>
        <Accordion items={FAQS} />
      </div>
    </section>
  )
}
