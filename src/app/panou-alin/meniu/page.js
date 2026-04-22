'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function AdminMeniuPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [catFilter, setCatFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category_id: 'pui', description: '' })

  const supabase = createClient()

  const fetchData = async () => {
    const [{ data: cats }, { data: prods }] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order'),
      supabase.from('menu_items').select('*').order('sort_order'),
    ])
    setCategories(cats || [])
    setProducts(prods || [])
  }

  useEffect(() => { fetchData() }, [])

  const filtered = catFilter === 'all' ? products : products.filter(p => p.category_id === catFilter)

  const toggleActive = async (id, current) => {
    await supabase.from('menu_items').update({ active: !current }).eq('id', id)
    toast.success('Status actualizat')
    fetchData()
  }

  const addProduct = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('menu_items').insert({
      name: newProduct.name,
      price: Number(newProduct.price),
      category_id: newProduct.category_id,
      description: newProduct.description,
      icon: '🌯',
      badges: [],
      active: true,
    })
    if (!error) {
      toast.success('Produs adaugat!')
      setShowForm(false)
      setNewProduct({ name: '', price: '', category_id: 'pui', description: '' })
      fetchData()
    } else {
      toast.error('Eroare la adaugare')
    }
  }

  const inputClass = 'w-full bg-white/5 border border-white/8 text-white placeholder-[#7a6e66] rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#c0392b]/50'

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bebas text-4xl text-white">MENIU</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-[#c0392b] to-[#96251e] text-white font-condensed font-bold text-sm uppercase tracking-wide px-5 py-2.5 rounded-xl hover:from-[#e74c3c] hover:to-[#c0392b] transition-all">
          {showForm ? 'Anuleaza' : '+ Produs Nou'}
        </button>
      </div>

      {showForm && (
        <div className="bg-[#1a1a1a] border border-[#c0392b]/20 rounded-[18px] p-6 mb-6">
          <h2 className="font-condensed font-bold text-base uppercase tracking-wide text-white mb-4">Produs Nou</h2>
          <form onSubmit={addProduct} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Denumire</label>
              <input required className={inputClass} placeholder="Shaorma Mare Pui" value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Pret (lei)</label>
              <input required type="number" className={inputClass} placeholder="29" value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Categorie</label>
              <select className={inputClass} value={newProduct.category_id} onChange={e => setNewProduct(p => ({ ...p, category_id: e.target.value }))}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Descriere</label>
              <input className={inputClass} placeholder="Descriere..." value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <button type="submit" className="bg-gradient-to-r from-[#c0392b] to-[#96251e] text-white font-condensed font-bold text-sm uppercase tracking-wide px-6 py-2.5 rounded-xl hover:from-[#e74c3c] hover:to-[#c0392b] transition-all">
                Salveaza Produs
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex gap-2 flex-wrap mb-5">
        <button onClick={() => setCatFilter('all')} className={`px-4 py-2 rounded-xl text-sm font-condensed font-bold uppercase border transition-all ${catFilter === 'all' ? 'bg-[#c0392b] border-[#c0392b] text-white' : 'bg-transparent border-white/10 text-[#b8a99a]'}`}>
          Toate ({products.length})
        </button>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setCatFilter(cat.id)} className={`px-4 py-2 rounded-xl text-sm font-condensed font-bold uppercase border transition-all ${catFilter === cat.id ? 'bg-[#c0392b] border-[#c0392b] text-white' : 'bg-transparent border-white/10 text-[#b8a99a]'}`}>
            {cat.icon} {cat.name} ({products.filter(p => p.category_id === cat.id).length})
          </button>
        ))}
      </div>

      <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] overflow-hidden">
        <table className="admin-table w-full">
          <thead>
            <tr><th>Produs</th><th>Categorie</th><th>Pret Normal</th><th>Pret Promo</th><th>Status</th><th>Actiuni</th></tr>
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
                <td>{categories.find(c => c.id === p.category_id)?.name || p.category_id}</td>
                <td className="text-white font-bold">{p.price} lei</td>
                <td>{p.promo_price ? <span className="text-green-400 font-bold">{p.promo_price} lei</span> : <span className="text-[#7a6e66]">—</span>}</td>
                <td>
                  <button onClick={() => toggleActive(p.id, p.active)}
                    className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${p.active ? 'bg-green-900/20 text-green-400 border-green-800/30' : 'bg-red-900/20 text-red-400 border-red-800/30'}`}>
                    {p.active ? 'Activ' : 'Inactiv'}
                  </button>
                </td>
                <td>
                  <button onClick={() => toast.success('Editeaza din Supabase Table Editor')}
                    className="text-xs bg-white/5 border border-white/10 text-[#b8a99a] px-3 py-1.5 rounded-lg hover:text-white transition-all">
                    Editeaza
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