'use client'
import { useState } from 'react'
import { PRODUCTS, CATEGORIES } from '@/lib/data'
import toast from 'react-hot-toast'

export default function AdminMeniuPage() {
  const [products, setProducts] = useState(PRODUCTS)
  const [catFilter, setCatFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'shaorma', description: '' })

  const filtered = catFilter === 'all' ? products : products.filter(p => p.category === catFilter)

  const toggleActive = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p))
    toast.success('Status produs actualizat')
  }

  const addProduct = (e) => {
    e.preventDefault()
    const p = { ...newProduct, id: Date.now(), price: Number(newProduct.price), promo: null, badges: [], ingredients: [], allergens: '', weight: '', kcal: null, icon: '🌯', active: true }
    setProducts(prev => [p, ...prev])
    setShowForm(false)
    setNewProduct({ name: '', price: '', category: 'shaorma', description: '' })
    toast.success('Produs adăugat cu succes!')
  }

  const inputClass = 'w-full bg-white/5 border border-white/8 text-white placeholder-[#7a6e66] rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#c0392b]/50'

  const BADGE_MAP = {
    bestseller: 'badge-gold',
    promo: 'badge-red',
    premium: 'badge-gold',
    nou: 'badge-green',
    recomandat: 'badge-green',
    picant: 'badge-red',
    family: 'badge-green',
  }

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bebas text-4xl text-white">MENIU</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-[#c0392b] to-[#96251e] text-white font-condensed font-bold text-sm uppercase tracking-wide px-5 py-2.5 rounded-xl hover:from-[#e74c3c] hover:to-[#c0392b] transition-all"
        >
          {showForm ? '✕ Anulează' : '+ Produs Nou'}
        </button>
      </div>

      {/* Add product form */}
      {showForm && (
        <div className="bg-[#1a1a1a] border border-[#c0392b]/20 rounded-[18px] p-6 mb-6">
          <h2 className="font-condensed font-bold text-lg uppercase tracking-wide text-white mb-5">Adaugă Produs Nou</h2>
          <form onSubmit={addProduct} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Denumire Produs</label>
              <input required className={inputClass} placeholder="Shaorma Pui Clasică" value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Preț (lei)</label>
              <input required type="number" className={inputClass} placeholder="29" value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Categorie</label>
              <select className={inputClass} value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Descriere</label>
              <input className={inputClass} placeholder="Descriere produs..." value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="col-span-2 flex gap-3">
              <button type="submit" className="bg-gradient-to-r from-[#c0392b] to-[#96251e] text-white font-condensed font-bold text-sm uppercase tracking-wide px-6 py-2.5 rounded-xl hover:from-[#e74c3c] hover:to-[#c0392b] transition-all">
                Salvează Produs
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="border border-white/10 text-[#b8a99a] font-condensed font-bold text-sm uppercase tracking-wide px-6 py-2.5 rounded-xl hover:border-white/20 transition-all">
                Anulează
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        <button onClick={() => setCatFilter('all')} className={`px-4 py-2 rounded-xl text-sm font-condensed font-bold uppercase border transition-all ${catFilter === 'all' ? 'bg-[#c0392b] border-[#c0392b] text-white' : 'bg-transparent border-white/10 text-[#b8a99a] hover:border-white/20'}`}>
          Toate ({products.length})
        </button>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setCatFilter(cat.id)} className={`px-4 py-2 rounded-xl text-sm font-condensed font-bold uppercase border transition-all ${catFilter === cat.id ? 'bg-[#c0392b] border-[#c0392b] text-white' : 'bg-transparent border-white/10 text-[#b8a99a] hover:border-white/20'}`}>
            {cat.icon} {cat.name} ({products.filter(p => p.category === cat.id).length})
          </button>
        ))}
      </div>

      <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] overflow-hidden">
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>Produs</th>
              <th>Categorie</th>
              <th>Preț Normal</th>
              <th>Preț Promo</th>
              <th>Badge-uri</th>
              <th>Status</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{p.icon}</span>
                    <span className="text-white text-sm font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="capitalize">{CATEGORIES.find(c => c.id === p.category)?.name || p.category}</td>
                <td className="text-white font-bold">{p.price} lei</td>
                <td>
                  {p.promo
                    ? <span className="text-green-400 font-bold">{p.promo} lei</span>
                    : <span className="text-[#7a6e66]">—</span>
                  }
                </td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {p.badges.map(b => (
                      <span key={b} className={BADGE_MAP[b] || 'badge-green'}>{b}</span>
                    ))}
                    {p.badges.length === 0 && <span className="text-[#7a6e66] text-xs">—</span>}
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => toggleActive(p.id)}
                    className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                      p.active !== false
                        ? 'bg-green-900/20 text-green-400 border-green-800/30 hover:bg-red-900/20 hover:text-red-400 hover:border-red-800/30'
                        : 'bg-red-900/20 text-red-400 border-red-800/30 hover:bg-green-900/20 hover:text-green-400 hover:border-green-800/30'
                    }`}
                  >
                    {p.active !== false ? '● Activ' : '○ Inactiv'}
                  </button>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toast.success(`Editare ${p.name} — conectează Supabase`)}
                      className="text-xs bg-white/5 border border-white/10 text-[#b8a99a] px-3 py-1.5 rounded-lg hover:text-white hover:border-white/20 transition-all"
                    >
                      Editează
                    </button>
                    <button
                      onClick={() => toast.success(`Promo aplicat pe ${p.name}`)}
                      className="text-xs bg-[#c0392b]/10 border border-[#c0392b]/20 text-[#e74c3c] px-3 py-1.5 rounded-lg hover:bg-[#c0392b]/20 transition-all"
                    >
                      Promo
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
