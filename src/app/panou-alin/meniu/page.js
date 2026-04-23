'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function AdminMeniuPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [catFilter, setCatFilter] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', promo_price: '', category_id: 'pui', description: '', weight: '', kcal: '', allergens: '', icon: '🌯', image_url: '' })

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
    toast.success(current ? 'Produs dezactivat' : 'Produs activat')
    fetchData()
  }

  const deleteProduct = async (id, name) => {
    if (!confirm('Stergi produsul "' + name + '"?')) return
    const { error } = await supabase.from('menu_items').delete().eq('id', id)
    if (!error) { toast.success('Produs sters!'); fetchData() }
    else toast.error('Eroare la stergere')
  }

  const addProduct = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('menu_items').insert({
      name: newProduct.name,
      price: Number(newProduct.price),
      promo_price: newProduct.promo_price ? Number(newProduct.promo_price) : null,
      category_id: newProduct.category_id,
      description: newProduct.description,
      weight: newProduct.weight,
      kcal: newProduct.kcal ? Number(newProduct.kcal) : null,
      allergens: newProduct.allergens,
      icon: newProduct.icon,
      image_url: newProduct.image_url || null,
      badges: [],
      active: true,
    })
    if (!error) {
      toast.success('Produs adaugat!')
      setShowAddForm(false)
      setNewProduct({ name: '', price: '', promo_price: '', category_id: 'pui', description: '', weight: '', kcal: '', allergens: '', icon: '🌯', image_url: '' })
      fetchData()
    } else toast.error('Eroare: ' + error.message)
  }

  const saveEdit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('menu_items').update({
      name: editProduct.name,
      price: Number(editProduct.price),
      promo_price: editProduct.promo_price ? Number(editProduct.promo_price) : null,
      category_id: editProduct.category_id,
      description: editProduct.description,
      weight: editProduct.weight,
      kcal: editProduct.kcal ? Number(editProduct.kcal) : null,
      allergens: editProduct.allergens,
      icon: editProduct.icon,
      image_url: editProduct.image_url || null,
    }).eq('id', editProduct.id)
    if (!error) {
      toast.success('Produs actualizat!')
      setEditProduct(null)
      fetchData()
    } else toast.error('Eroare: ' + error.message)
  }

  const inp = 'w-full bg-white/5 border border-white/8 text-white placeholder-[#7a6e66] rounded-xl py-2.5 px-3 text-sm focus:outline-none focus:border-[#c0392b]/50'

  const ProductForm = ({ data, setData, onSubmit, onCancel, title }) => (
    <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="bg-[#1a1a1a] border border-white/8 rounded-[24px] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <h2 className="font-bebas text-2xl text-white">{title}</h2>
          <button onClick={onCancel} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#7a6e66] hover:text-white">✕</button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Denumire Produs *</label>
              <input required className={inp} placeholder="Shaorma Mare Pui" value={data.name} onChange={e => setData(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Pret Normal (lei) *</label>
              <input required type="number" step="0.5" className={inp} placeholder="29" value={data.price} onChange={e => setData(p => ({ ...p, price: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Pret Promo (lei)</label>
              <input type="number" step="0.5" className={inp} placeholder="Lasat gol daca nu e promo" value={data.promo_price || ''} onChange={e => setData(p => ({ ...p, promo_price: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Categorie *</label>
              <select required className={inp} value={data.category_id} onChange={e => setData(p => ({ ...p, category_id: e.target.value }))}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Icon Emoji</label>
              <input className={inp} placeholder="🌯" value={data.icon} onChange={e => setData(p => ({ ...p, icon: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Descriere</label>
              <textarea rows={3} className={inp + ' resize-none'} placeholder="Descriere produs..." value={data.description} onChange={e => setData(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Gramaj</label>
              <input className={inp} placeholder="650g" value={data.weight || ''} onChange={e => setData(p => ({ ...p, weight: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Calorii (kcal)</label>
              <input type="number" className={inp} placeholder="520" value={data.kcal || ''} onChange={e => setData(p => ({ ...p, kcal: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">Alergeni</label>
              <input className={inp} placeholder="Gluten, Lactate, Oua..." value={data.allergens || ''} onChange={e => setData(p => ({ ...p, allergens: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wide text-[#7a6e66] mb-1.5">URL Imagine (din /public/)</label>
              <input className={inp} placeholder="/shaorma-farfurie-pui.png" value={data.image_url || ''} onChange={e => setData(p => ({ ...p, image_url: e.target.value }))} />
              {data.image_url && (
                <div className="mt-2 w-20 h-20 bg-[#111] rounded-xl flex items-center justify-center overflow-hidden">
                  <img src={data.image_url} alt="preview" className="h-full w-auto object-contain" onError={e => e.target.style.display='none'} />
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3 pt-2 border-t border-white/8">
            <button type="submit" className="flex-1 bg-gradient-to-r from-[#c0392b] to-[#96251e] hover:from-[#e74c3c] hover:to-[#c0392b] text-white font-condensed font-bold text-base uppercase tracking-wide py-3 rounded-xl transition-all">
              Salveaza
            </button>
            <button type="button" onClick={onCancel} className="px-6 border border-white/10 text-[#7a6e66] font-condensed font-bold text-sm uppercase rounded-xl hover:border-white/20 hover:text-white transition-all">
              Anuleaza
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div className="page-enter">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bebas text-4xl text-white">MENIU</h1>
        <button onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-[#c0392b] to-[#96251e] text-white font-condensed font-bold text-sm uppercase tracking-wide px-5 py-2.5 rounded-xl hover:from-[#e74c3c] hover:to-[#c0392b] transition-all">
          + Produs Nou
        </button>
      </div>

      {/* Category filter */}
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
            <tr><th>Produs</th><th>Categorie</th><th>Pret</th><th>Promo</th><th>Imagine</th><th>Status</th><th>Actiuni</th></tr>
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
                  {p.image_url
                    ? <div className="w-10 h-10 bg-[#111] rounded-lg overflow-hidden"><img src={p.image_url} alt="" className="w-full h-full object-contain" /></div>
                    : <span className="text-[#7a6e66] text-xs">Fara poza</span>
                  }
                </td>
                <td>
                  <button onClick={() => toggleActive(p.id, p.active)}
                    className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${p.active ? 'bg-green-900/20 text-green-400 border-green-800/30' : 'bg-red-900/20 text-red-400 border-red-800/30'}`}>
                    {p.active ? 'Activ' : 'Inactiv'}
                  </button>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditProduct({ ...p })}
                      className="text-xs bg-[#c0392b]/20 border border-[#c0392b]/30 text-[#e74c3c] px-3 py-1.5 rounded-lg hover:bg-[#c0392b]/30 transition-all">
                      Editeaza
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id, p.name)}
                      className="text-xs bg-red-900/10 border border-red-900/20 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-900/20 transition-all">
                      Sterge
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add modal */}
      {showAddForm && (
        <ProductForm
          data={newProduct}
          setData={setNewProduct}
          onSubmit={addProduct}
          onCancel={() => setShowAddForm(false)}
          title="PRODUS NOU"
        />
      )}

      {/* Edit modal */}
      {editProduct && (
        <ProductForm
          data={editProduct}
          setData={setEditProduct}
          onSubmit={saveEdit}
          onCancel={() => setEditProduct(null)}
          title="EDITEAZA PRODUS"
        />
      )}
    </div>
  )
}