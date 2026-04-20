'use client'
import { useState } from 'react'
import { DELIVERY_ZONES } from '@/lib/data'
import toast from 'react-hot-toast'

export default function AdminLivrarePage() {
  const [zones, setZones] = useState(DELIVERY_ZONES)

  const update = (i, field, val) => {
    setZones(prev => prev.map((z, idx) => idx === i ? { ...z, [field]: Number(val) || val } : z))
  }

  const inputClass = 'bg-white/5 border border-white/8 text-white rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#c0392b]/50 w-24'

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bebas text-4xl text-white">CONFIGURARE LIVRARE</h1>
        <button onClick={() => toast.success('Tarife de livrare salvate!')} className="bg-gradient-to-r from-[#c0392b] to-[#96251e] text-white font-condensed font-bold text-sm uppercase tracking-wide px-5 py-2.5 rounded-xl hover:from-[#e74c3c] hover:to-[#c0392b] transition-all">
          Salvează Tarife
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Tarif minim', value: `${Math.min(...zones.map(z => z.fee))} lei` },
          { label: 'Livrare gratuită de la', value: `${Math.min(...zones.map(z => z.freeOver))} lei` },
          { label: 'Zone active', value: zones.length },
        ].map(s => (
          <div key={s.label} className="bg-[#1a1a1a] border border-white/8 rounded-[14px] p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-2">{s.label}</p>
            <p className="font-bebas text-3xl text-[#f39c12]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] overflow-hidden">
        <div className="px-6 py-4 border-b border-white/8">
          <h2 className="font-condensed font-bold text-base uppercase tracking-wide text-white">Zone & Tarife Livrare</h2>
          <p className="text-xs text-[#7a6e66] mt-1">Editează tarifele direct în tabel și salvează modificările</p>
        </div>
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>Zonă Livrare</th>
              <th>Tarif (lei)</th>
              <th>Timp Estimat</th>
              <th>Comandă Minimă (lei)</th>
              <th>Gratuit Peste (lei)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((zone, i) => (
              <tr key={zone.zone}>
                <td className="text-white font-medium">{zone.zone}</td>
                <td>
                  <input
                    type="number"
                    className={inputClass}
                    value={zone.fee}
                    onChange={e => update(i, 'fee', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className={inputClass + ' w-28'}
                    value={zone.eta}
                    onChange={e => update(i, 'eta', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className={inputClass}
                    value={zone.minOrder}
                    onChange={e => update(i, 'minOrder', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className={inputClass}
                    value={zone.freeOver}
                    onChange={e => update(i, 'freeOver', e.target.value)}
                  />
                </td>
                <td>
                  <span className="badge-green">● Activ</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
