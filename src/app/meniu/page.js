'use client'
import { useState, useEffect, useMemo } from 'react'
import { Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ProductCard from '@/components/menu/ProductCard'
import Footer from '@/components/layout/Footer'

export default function MenuPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const [{ data: cats }, { data: prods }] = await Promise.all([
        supabase.from('categories').select('*').eq('active', true).order('sort_order'),
        supabase.from('menu_items').select('*').eq('active', true).order('sort_order'),
      ])
      setCategories(cats || [])
      setProducts((prods || []).map(p => ({
        ...p,
        category: p.category_id,
        promo: p.promo_price || null,
        badges: p.badges || [],
        ingredients: [],
        allergens: p.allergens || '',
        image: p.image_url || null,
      })))
      setLoading(false)
    }
    fetchData()
  }, [])

  const ALL_CATS = [{ id: 'all', name: 'Toate', icon: '🍽' }, ...categories]

  const filtered = useMemo(() => {
    let items = products
    if (activeCategory !== 'all') items = items.filter(p => p.category_id === activeCategory)
    if (search) items = items.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(search.toLowerCase())
    )
    if (sortBy === 'price-asc') items = [...items].sort((a, b) => (a.promo || a.price) - (b.promo || b.price))
    if (sortBy === 'price-desc') items = [...items].sort((a, b) => (b.promo || b.price) - (a.promo || a.price))
    return items
  }, [products, activeCategory, search, sortBy])

  return (
    <div className="page-enter pt-16 min-h-screen">
      <div className="bg-[#111] border-b border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#e74c3c] mb-2">Descopera</p>
          <h1 className="font-bebas text-4xl sm:text-6xl text-white">
            MENIU <span className="text-[#f39c12]">COMPLET</span>
          </h1>
          <p className="text-[#b8a99a] mt-1 text-sm">
            {products.length} produse · Personalizabile · Livrare in Gaesti
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a6e66]" />
            <input
              type="text"
              placeholder="Cauta in meniu..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/8 text-white placeholder-[#7a6e66] rounded-xl py-3 pl-9 pr-4 text-sm focus:outline-none focus:border-[#c0392b]/50"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-[#1a1a1a] border border-white/8 text-[#b8a99a] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#c0392b]/50 sm:w-44"
          >
            <option value="default">Sortare: Implicit</option>
            <option value="price-asc">Pret: Crescator</option>
            <option value="price-desc">Pret: Descrescator</option>
          </select>
        </div>

        {/* Mobile chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-5 lg:hidden" style={{scrollbarWidth:'none'}}>
          {ALL_CATS.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeCategory === cat.id ? 'bg-[#c0392b] border-[#c0392b] text-white' : 'bg-[#1a1a1a] border-white/8 text-[#b8a99a]'}`}>
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        <div className="flex gap-6 items-start">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-52 shrink-0 sticky top-20">
            <div className="bg-[#1a1a1a] border border-white/8 rounded-[18px] p-4">
              <p className="text-xs font-bold uppercase tracking-[2px] text-[#7a6e66] mb-3">Categorii</p>
              <div className="space-y-0.5">
                {ALL_CATS.map(cat => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${activeCategory === cat.id ? 'bg-[#c0392b]/15 text-[#e74c3c] border-l-2 border-[#c0392b]' : 'text-[#b8a99a] hover:bg-white/5'}`}>
                    <span className="text-base w-5 text-center">{cat.icon}</span>
                    <span className="font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-[#1a1a1a] rounded-[18px] h-64 skeleton" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-5xl mb-4">🔍</span>
                <p className="font-condensed text-xl font-bold text-[#7a6e66] uppercase">Niciun produs gasit</p>
                <button onClick={() => { setSearch(''); setActiveCategory('all') }}
                  className="mt-4 px-6 py-2 bg-[#c0392b]/20 border border-[#c0392b]/30 text-[#e74c3c] rounded-xl font-condensed font-bold text-sm uppercase">
                  Reseteaza
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-[#7a6e66] mb-4">{filtered.length} produse gasite</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}