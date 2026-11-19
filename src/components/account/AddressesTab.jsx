import { useState } from 'react'
import { MapPin, Plus } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Field from '../ui/Field'

const EMPTY = { label: 'Home', name: '', line1: '', city: '', zip: '', country: '', phone: '' }
const REQUIRED = ['name', 'line1', 'city', 'zip', 'country']

function AddressForm({ initial, onCancel, onSave }) {
  const [v, setV] = useState(initial)
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    const next = {}
    REQUIRED.forEach((k) => !v[k].trim() && (next[k] = 'Required.'))
    setErrors(next)
    if (!Object.keys(next).length) onSave(v)
  }
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-[20px] border border-black/10 p-5 sm:grid-cols-2 sm:p-6">
      <h2 className="text-xl font-bold sm:col-span-2">{initial.id ? 'Edit address' : 'Add a new address'}</h2>
      <Field id="label" label="Label" value={v.label} onChange={set('label')} placeholder="Home, Work…" />
      <Field id="name" label="Full name" value={v.name} onChange={set('name')} error={errors.name} autoComplete="name" />
      <Field id="line1" label="Street address" className="sm:col-span-2" value={v.line1} onChange={set('line1')} error={errors.line1} autoComplete="street-address" />
      <Field id="city" label="City" value={v.city} onChange={set('city')} error={errors.city} autoComplete="address-level2" />
      <Field id="zip" label="Postal code" value={v.zip} onChange={set('zip')} error={errors.zip} autoComplete="postal-code" />
      <Field id="country" label="Country" value={v.country} onChange={set('country')} error={errors.country} autoComplete="country-name" />
      <Field id="phone" label="Phone (optional)" type="tel" value={v.phone} onChange={set('phone')} autoComplete="tel" />
      <div className="flex gap-3 sm:col-span-2">
        <button type="submit" className="solid-btn px-8 py-3">Save address</button>
        <button type="button" onClick={onCancel} className="pill-btn px-8 py-3">Cancel</button>
      </div>
    </form>
  )
}

export default function AddressesTab() {
  const { user, saveAddress, removeAddress, setDefaultAddress } = useAuth()
  const [editing, setEditing] = useState(null) // null | 'new' | address

  if (editing) {
    return (
      <AddressForm
        initial={editing === 'new' ? EMPTY : editing}
        onCancel={() => setEditing(null)}
        onSave={(a) => {
          saveAddress(a)
          setEditing(null)
        }}
      />
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-black/70">{user.addresses.length ? 'Your saved delivery addresses.' : 'No addresses saved yet.'}</p>
        <button type="button" onClick={() => setEditing('new')} className="solid-btn gap-2 px-6 py-2.5"><Plus className="h-4 w-4" /> Add address</button>
      </div>
      {user.addresses.length === 0 ? (
        <div className="rounded-[20px] border border-black/10 px-6 py-14 text-center">
          <MapPin className="mx-auto h-10 w-10 text-gold" />
          <p className="mt-3 text-xl font-bold">Save an address for faster checkout</p>
          <p className="mt-1 text-black/70">We’ll fill it in for you when you place an order.</p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {user.addresses.map((a) => (
            <li key={a.id} className={`flex flex-col rounded-[20px] border p-5 ${a.isDefault ? 'border-black' : 'border-black/10'}`}>
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{a.label || 'Address'}</h2>
                {a.isDefault && <span className="rounded-full bg-black px-3 py-0.5 text-xs font-medium text-gold">Default</span>}
              </div>
              <address className="mt-3 flex-1 text-sm not-italic leading-relaxed text-black/80">
                {a.name}<br />{a.line1}<br />{a.city}, {a.zip}<br />{a.country}
                {a.phone && <><br />{a.phone}</>}
              </address>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
                <button type="button" onClick={() => setEditing(a)} className="underline underline-offset-2">Edit</button>
                {!a.isDefault && <button type="button" onClick={() => setDefaultAddress(a.id)} className="underline underline-offset-2">Make default</button>}
                <button type="button" onClick={() => removeAddress(a.id)} className="text-sale underline underline-offset-2">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
