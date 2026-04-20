'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function AdminSetariPage() {
  const [settings, setSettings] = useState({
    name: 'Metropolitan Shaorma & Grill',
    phone: '0758-793-231',
    address: 'Str. 13 Decembrie nr. 69, Gaesti',
    weekdayHours: '10:00 - 22:00',
    weekendHours: '10:00 - 23:00',
    status: 'open',
    preparationTime: 20,
  })

  const inputClass = 'w-full bg-white/5 border border-white/8 text-white placeholder-[#7a6e66] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#c0392b]/50'

  return (
    <div className="page-enter">
      <h1 className="font-bebas text-4xl text-white mb-6">SETARI RESTAURANT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-6">
          <h2 className="font-condensed font-bold text-lg uppercase tracking-wide text-white mb-5 pb-3 border-b border-white/8">Date Restaurant</h2>
          <div className="space-y-4">
            {[
              { key: 'name', label: 'Denumire' },
              { key: 'phone', label: 'Telefon' },
              { key: 'address', label: 'Adresa' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">{f.label}</label>
                <input className={inputClass} value={settings[f.key]} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))} />
              </div>
            ))}
            <button onClick={() => toast.success('Setari salvate!')}
              className="w-full bg-gradient-to-r from-[#c0392b] to-[#96251e] hover:from-[#e74c3c] hover:to-[#c0392b] text-white font-condensed font-bold text-sm uppercase tracking-wide py-3 rounded-xl transition-all mt-2">
              Salveaza Date
            </button>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-6">
          <h2 className="font-condensed font-bold text-lg uppercase tracking-wide text-white mb-5 pb-3 border-b border-white/8">Program & Status</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Luni - Vineri</label>
              <input className={inputClass} value={settings.weekdayHours} onChange={e => setSettings(s => ({ ...s, weekdayHours: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Sambata - Duminica</label>
              <input className={inputClass} value={settings.weekendHours} onChange={e => setSettings(s => ({ ...s, weekendHours: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Status Restaurant</label>
              <select className={inputClass} value={settings.status} onChange={e => setSettings(s => ({ ...s, status: e.target.value }))}>
                <option value="open">Deschis</option>
                <option value="busy">Aglomerat</option>
                <option value="closed">Inchis Temporar</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Timp Preparare (min)</label>
              <input type="number" className={inputClass} value={settings.preparationTime} onChange={e => setSettings(s => ({ ...s, preparationTime: e.target.value }))} />
            </div>
            <button onClick={() => toast.success('Program salvat!')}
              className="w-full bg-gradient-to-r from-[#c0392b] to-[#96251e] hover:from-[#e74c3c] hover:to-[#c0392b] text-white font-condensed font-bold text-sm uppercase tracking-wide py-3 rounded-xl transition-all mt-2">
              Salveaza Program
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}