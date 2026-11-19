import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Field from '../ui/Field'
import Toggle from '../ui/Toggle'

function Card({ title, children, danger }) {
  return (
    <section className={`rounded-[20px] border p-5 sm:p-6 ${danger ? 'border-sale/40' : 'border-black/10'}`}>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default function SettingsTab() {
  const { user, updateProfile, updatePrefs, changePassword, deleteAccount } = useAuth()
  const navigate = useNavigate()

  const [profile, setProfile] = useState({ name: user.name, phone: user.phone || '' })
  const [profileMsg, setProfileMsg] = useState('')
  const [pw, setPw] = useState({ old: '', next: '' })
  const [pwMsg, setPwMsg] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const saveProfile = (e) => {
    e.preventDefault()
    if (profile.name.trim().length < 2) return setProfileMsg('error:Enter your full name.')
    updateProfile({ name: profile.name.trim(), phone: profile.phone.trim() })
    setProfileMsg('ok:Profile saved.')
  }

  const savePassword = async (e) => {
    e.preventDefault()
    if (pw.next.length < 8) return setPwMsg({ ok: false, text: 'New password must be at least 8 characters.' })
    const res = await changePassword(pw.old, pw.next)
    setPwMsg({ ok: res.ok, text: res.ok ? 'Password updated.' : res.error })
    if (res.ok) setPw({ old: '', next: '' })
  }

  const [kind, text] = profileMsg ? [profileMsg.split(':')[0], profileMsg.split(':').slice(1).join(':')] : []

  return (
    <div className="space-y-6">
      <Card title="Personal details">
        <form onSubmit={saveProfile} noValidate className="grid gap-4 sm:grid-cols-2">
          <Field id="pf-name" label="Full name" value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} autoComplete="name" />
          <Field id="pf-phone" label="Phone" type="tel" value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} autoComplete="tel" />
          <Field id="pf-email" label="Email" value={user.email} readOnly hint="Your email is your sign-in and can’t be changed in this demo." className="sm:col-span-2 [&_input]:cursor-not-allowed [&_input]:text-black/60" />
          <div className="flex items-center gap-4 sm:col-span-2">
            <button type="submit" className="solid-btn px-8 py-3">Save changes</button>
            <p role="status" className={`text-sm ${kind === 'error' ? 'text-sale' : 'font-medium'}`}>{text}</p>
          </div>
        </form>
      </Card>

      <Card title="Notifications">
        <div className="divide-y divide-black/10">
          <Toggle checked={user.prefs.offers} onChange={(v) => updatePrefs({ offers: v })} label="Offers & new arrivals" description="Email me about sales and new drops." />
          <Toggle checked={user.prefs.orderUpdates} onChange={(v) => updatePrefs({ orderUpdates: v })} label="Order updates" description="Email me when my order ships." />
          <Toggle checked={user.prefs.sms} onChange={(v) => updatePrefs({ sms: v })} label="Text messages" description="Delivery alerts by SMS." />
        </div>
      </Card>

      <Card title="Change password">
        <form onSubmit={savePassword} noValidate className="grid gap-4 sm:grid-cols-2">
          <Field id="pw-old" label="Current password" type="password" autoComplete="current-password" value={pw.old} onChange={(e) => setPw((p) => ({ ...p, old: e.target.value }))} />
          <Field id="pw-new" label="New password" type="password" autoComplete="new-password" value={pw.next} onChange={(e) => setPw((p) => ({ ...p, next: e.target.value }))} />
          <div className="flex items-center gap-4 sm:col-span-2">
            <button type="submit" className="solid-btn px-8 py-3">Update password</button>
            <p role="status" className={`text-sm ${pwMsg && !pwMsg.ok ? 'text-sale' : 'font-medium'}`}>{pwMsg?.text}</p>
          </div>
        </form>
      </Card>

      <Card title="Delete account" danger>
        <p className="text-sm text-black/70">This removes your profile and saved addresses from this browser. This can’t be undone.</p>
        {confirmDelete ? (
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                deleteAccount()
                navigate('/')
              }}
              className="rounded-full bg-sale px-8 py-3 font-medium text-white hover:opacity-90"
            >
              Yes, delete my account
            </button>
            <button type="button" onClick={() => setConfirmDelete(false)} className="pill-btn px-8 py-3">Keep my account</button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirmDelete(true)} className="mt-4 rounded-full border border-sale px-8 py-3 font-medium text-sale hover:bg-sale hover:text-white">
            Delete account
          </button>
        )}
      </Card>
    </div>
  )
}
