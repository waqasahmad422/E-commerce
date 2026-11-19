/** Labelled text input with inline error — used by every form in the app. */
export default function Field({ label, id, error, hint, className = '', as: Tag = 'input', ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <Tag
        id={id}
        name={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className={`mt-1.5 w-full bg-surface px-5 py-3 outline-none placeholder:text-black/50 focus:ring-2 focus:ring-black aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-sale ${
          Tag === 'textarea' ? 'resize-none rounded-[20px]' : 'rounded-full'
        }`}
        {...props}
      />
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-xs text-black/70">{hint}</p>}
      {error && <p id={`${id}-err`} className="mt-1 text-sm text-sale">{error}</p>}
    </div>
  )
}
