import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="shell py-24 text-center">
      <h1 className="display text-4xl sm:text-5xl">Page not found</h1>
      <p className="mt-4 text-black/70">That page doesn’t exist. Head back to the shop to keep browsing.</p>
      <Link to="/" className="solid-btn mt-8">Back to home</Link>
    </div>
  )
}
