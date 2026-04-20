'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ADDRESSES = [
  { id: 1, label: '🏠 Acasă', primary: true, street: 'Str. Mihai Eminescu 42, Bl A2, Sc 1, Ap 14', city: 'București, Sector 2' },
  { id: 2, label: '🏢 Birou', primary: false, street: 'Bd. Magheru 20, Et 4', city: 'București, Sector 1' },
]

export default function AdresePage() {
  const [addresses, setAddresses] = useState(ADDRESSES)

  return (
    <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-7">
      <h2 className="font-condensed font-bold text-xl uppercase tracking-wide text-white mb-6 pb-4 border-b border-white/8">Adresele Mele Salvate</h2>
      <div className="space-y-3 mb-6">
        {addresses.map(addr => (
          <div key={addr.id} className="flex items-center justify-between bg-white/[0.03] border border-white/8 rounded-[14px] p-5">
            <div>
              <p className={`text-sm font-bold mb-1 ${addr.primary ? 'text-[#f39c12]' : 'text-[#b8a99a]'}`}>
                {addr.label} {addr.primary && '· Principală'}
              </p>
              <p className="text-sm text-white">{addr.street}</p>
              <p className="text-xs text-[#7a6e66] mt-0.5">{addr.city}</p>
            </div>
            <button
              onClick={() => toast.success('Funcționalitate de editare disponibilă cu Supabase')}
              className="text-xs border border-white/10 text-[#7a6e66] hover:text-white hover:border-white/20 px-4 py-2 rounded-lg transition-all"
            >
              Editează
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => toast.success('Formular adresă nouă')}
        className="border border-white/15 hover:border-[#f39c12] text-[#b8a99a] hover:text-[#f39c12] font-condensed font-bold text-sm uppercase tracking-wide px-6 py-3 rounded-xl transition-all"
      >
        + Adaugă Adresă Nouă
      </button>
    </div>
  )
}
