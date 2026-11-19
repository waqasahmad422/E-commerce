export function Sparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 104 104" className={className} aria-hidden="true" fill="currentColor">
      <path d="M52 0C52 28.7 75.3 52 104 52C75.3 52 52 75.3 52 104C52 75.3 28.7 52 0 52C28.7 52 52 28.7 52 0Z" />
    </svg>
  )
}

export function Verified({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Verified buyer" role="img">
      <circle cx="12" cy="12" r="12" fill="#123D2B" />
      <path d="M7 12.4l3.3 3.3L17 9" fill="none" stroke="#D9A52E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const social = 'h-3.5 w-3.5'

export function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className={social} fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.2 8.2L23.3 22h-6.7l-5.2-6.8L5.4 22H2.3l7.7-8.8L1.9 2h6.8l4.7 6.2L18.9 2zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20z" />
    </svg>
  )
}
export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className={social} fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.5H7.5v3.3h2.8V22h3.2z" />
    </svg>
  )
}
export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className={social} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
export function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className={social} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 015 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0022 12.2C22 6.6 17.5 2 12 2z" />
    </svg>
  )
}
