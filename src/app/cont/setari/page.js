'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function SetariPage() {
  const [form, setForm] = useState({ prenume: 'Ion', nume: 'Popescu', email: 'ion.popescu@email.ro', telefon: '0721 234 567', dataNasterii: '1990-05-15' })
  const inputClass = 'w-full bg-white/5 border border-white/8 text-white placeholder-[#7a6e66] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#c0392b]/50'

  return (
    <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-7">
      <h2 className="font-condensed font-bold text-xl uppercase tracking-wide text-white mb-6 pb-4 border-b border-white/8">Setări Cont</h2>

      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'prenume', label: 'Prenume' },
            { key: 'nume', label: 'Nume' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">{f.label}</label>
              <input className={inputClass} value={form[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
            </div>
          ))}
        </div>
        {[
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'telefon', label: 'Telefon', type: 'tel' },
          { key: 'dataNasterii', label: 'Data Nașterii', type: 'date' },
        ].map(f => (
          <div key={f.key}>
            <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">{f.label}</label>
            <input type={f.type} className={inputClass} value={form[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} />
          </div>
        ))}
      </div>

      <div className="border-t border-white/8 pt-6 mb-6">
        <h3 className="font-condensed font-bold text-base uppercase tracking-wide text-white mb-4">Schimbare Parolă</h3>
        <div className="space-y-3">
          {['Parolă curentă', 'Parolă nouă', 'Confirmare parolă'].map(label => (
            <div key={label}>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">{label}</label>
              <input type="password" className={inputClass} placeholder="••••••••" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => toast.success('Setări salvate cu succes!')}
        className="bg-gradient-to-r from-[#c0392b] to-[#96251e] hover:from-[#e74c3c] hover:to-[#c0392b] text-white font-condensed font-bold text-base uppercase tracking-wide px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5"
      >
        Salvează Modificările
      </button>
    </div>
  )
}
