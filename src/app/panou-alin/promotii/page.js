'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'

const DEFAULT_COUPONS = [
  { code: 'METRO10', label: '10% reducere', discount: 10, uses: 0, active: true },
]

export default function AdminPromotiiPage() {
  const [coupons, setCoupons] = useState(DEFAULT_COUPONS)
  const [showForm, setShowForm] = useState(false)
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', label: '' })

  const toggleCoupon = (code) => {
    setCoupons(prev => prev.map(c => c.code === code ? { ...c, active: !c.active } : c))
    toast.success('Status cod actualizat')
  }

  const addCoupon = (e) => {
    e.preventDefault()
    setCoupons(prev => [...prev, { ...newCoupon, discount: Number(newCoupon.discount), uses: 0, active: true }])
    setNewCoupon({ code: '', discount: '', label: '' })
    setShowForm(false)
    toast.success('Cod promotional adaugat!')
  }

  const inputClass = 'w-full bg-white/5 border border-white/8 text-white placeholder-[#7a6e66] rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#c0392b]/50'

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bebas text-4xl text-white">PROMOTII & CODURI</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-[#c0392b] to-[#96251e] text-white font-condensed font-bold text-sm uppercase tracking-wide px-5 py-2.5 rounded-xl hover:from-[#e74c3c] hover:to-[#c0392b] transition-all">
          {showForm ? 'Anuleaza' : '+ Cod Nou'}
        </button>
      </div>

      {showForm && (
        <div className="bg-[#1a1a1a] border border-[#c0392b]/20 rounded-[18px] p-6 mb-6">
          <form onSubmit={addCoupon} className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Cod</label>
              <input required className={inputClass} placeholder="METRO10" value={newCoupon.code} onChange={e => setNewCoupon(c => ({ ...c, code: e.target.value.toUpperCase() }))} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Reducere (%)</label>
              <input required type="number" min="1" max="100" className={inputClass} placeholder="10" value={newCoupon.discount} onChange={e => setNewCoupon(c => ({ ...c, discount: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Descriere</label>
              <input required className={inputClass} placeholder="10% reducere..." value={newCoupon.label} onChange={e => setNewCoupon(c => ({ ...c, label: e.target.value }))} />
            </div>
            <div className="col-span-3">
              <button type="submit" className="bg-gradient-to-r from-[#c0392b] to-[#96251e] text-white font-condensed font-bold text-sm uppercase tracking-wide px-6 py-2.5 rounded-xl hover:from-[#e74c3c] hover:to-[#c0392b] transition-all">
                Adauga Cod
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] overflow-hidden">
        <table className="admin-table w-full">
          <thead>
            <tr><th>Cod</th><th>Descriere</th><th>Reducere</th><th>Utilizari</th><th>Status</th><th>Actiuni</th></tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.code}>
                <td>
                  <code className="font-mono text-base font-bold text-[#f39c12] bg-[#f39c12]/10 px-2 py-0.5 rounded">
                    {c.code}
                  </code>
                </td>
                <td>{c.label}</td>
                <td className="text-green-400 font-bold">{c.discount}%</td>
                <td>{c.uses} utilizari</td>
                <td>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${c.active ? 'bg-green-900/20 text-green-400 border-green-800/30' : 'bg-red-900/20 text-red-400 border-red-800/30'}`}>
                    {c.active ? 'Activ' : 'Inactiv'}
                  </span>
                </td>
                <td>
                  <button onClick={() => toggleCoupon(c.code)}
                    className="text-xs border border-white/10 text-[#7a6e66] px-3 py-1.5 rounded-lg hover:text-white hover:border-white/20 transition-all">
                    {c.active ? 'Dezactiveaza' : 'Activeaza'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}