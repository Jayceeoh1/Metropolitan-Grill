'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ZONES = [
  { zone: 'Gaesti', fee: 0, minOrder: 30, freeOver: 0, eta: '20-30 min' },
  { zone: 'Imprejurimi Gaesti', fee: 10, minOrder: 50, freeOver: 100, eta: '30-45 min' },
]

export default function AdminLivrarePage() {
  const [zones, setZones] = useState(ZONES)

  const update = (i, field, val) => {
    setZones(prev => prev.map((z, idx) => idx === i ? { ...z, [field]: val } : z))
  }

  const inputClass = 'bg-white/5 border border-white/8 text-white rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#c0392b]/50 w-28'

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bebas text-4xl text-white">CONFIGURARE LIVRARE</h1>
        <button onClick={() => toast.success('Tarife salvate!')}
          className="bg-gradient-to-r from-[#c0392b] to-[#96251e] text-white font-condensed font-bold text-sm uppercase tracking-wide px-5 py-2.5 rounded-xl hover:from-[#e74c3c] hover:to-[#c0392b] transition-all">
          Salveaza Tarife
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Tarif minim', value: '0 lei' },
          { label: 'Zone active', value: zones.length },
          { label: 'Livrare gratuita', value: 'Da' },
        ].map(s => (
          <div key={s.label} className="bg-[#1a1a1a] border border-white/8 rounded-[14px] p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-2">{s.label}</p>
            <p className="font-bebas text-3xl text-[#f39c12]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] overflow-hidden">
        <table className="admin-table w-full">
          <thead>
            <tr><th>Zona Livrare</th><th>Tarif (lei)</th><th>Timp Estimat</th><th>Comanda Minima</th><th>Gratuit Peste</th></tr>
          </thead>
          <tbody>
            {zones.map((zone, i) => (
              <tr key={zone.zone}>
                <td className="text-white font-medium">{zone.zone}</td>
                <td><input type="number" className={inputClass} value={zone.fee} onChange={e => update(i, 'fee', e.target.value)} /></td>
                <td><input type="text" className={inputClass} value={zone.eta} onChange={e => update(i, 'eta', e.target.value)} /></td>
                <td><input type="number" className={inputClass} value={zone.minOrder} onChange={e => update(i, 'minOrder', e.target.value)} /></td>
                <td><input type="number" className={inputClass} value={zone.freeOver} onChange={e => update(i, 'freeOver', e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}